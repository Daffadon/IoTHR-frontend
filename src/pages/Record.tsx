
import { useState, FormEvent } from 'react';
import UserLayout from '../components/layout/UserLayout';
import { axiosClient } from '../lib/axios-client';
import { ToastContainer } from 'react-toastify';
import { errorNotification, successNotification } from '../components/toast/notification';

// Define types
type DeviceType = "Sense" | "H10";

interface Device {
  type?: DeviceType;
  name?: string;
  output: string[];
  device?: BluetoothDevice;
  server?: BluetoothRemoteGATTServer;
  service?: BluetoothRemoteGATTService;
  character?: BluetoothRemoteGATTCharacteristic;
  data?: BluetoothRemoteGATTCharacteristic;
}

const devices: Record<DeviceType, Device> = {
  Sense: { type: "Sense", output: ["SDK", "PPG", "ACC_Sense"] },
  H10: { name: "H10", output: ["ECG", "ACC_H10"] },
};

const Record = () => {
  const [form, setForm] = useState({
    topicName: "",
    status: false,
    topicId: ""
  })
  const [device, setDevice] = useState<Device>();
  const [record, setRecord] = useState<boolean | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const sendECGData = async (data: unknown[]) => {
    try {
      await axiosClient.patch('/topic/ecg', {
        topicId: form.topicId,
        ECGplot: data,
      })
    }
    catch (error) {
      errorNotification("Failed to Send ECG Data")
    }
  }

  const createTopic = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axiosClient.post('/topic/create', { name: form.topicName })
      if (response.status === 200) {
        setForm((prev) => ({ ...prev, status: true, topicId: response.data.topicId }))
      }
      successNotification("Topic Created Successfully")
    } catch (error) {
      errorNotification("Failed to Create Topic or Topic Already Exist")
    }
    finally {
      setLoading(false)
    }
  }

  const startRecording = async (device: Device | undefined, stream: any) => {
    if (device?.character) {
      var Init = [0x02, stream.id];
      const BytesToSend = Init.concat(stream.code_start);
      await device.character.writeValue(new Uint8Array(BytesToSend));
    }
    successNotification("Recording Started")
  }

  const stopRecording = async (device: Device | undefined, stream: any) => {
    const off = new Uint8Array([0x03, stream.id]);
    if (device?.character) {
      await device?.character.writeValue(off);
    }
    errorNotification("Recording Stopped")
  }

  const onDisconnected = () => {
    errorNotification("Device Disconnected")
  };

  function WordstoSignedInteger(words: any, BitsPerWord: any) {
    let val = 0;
    const word_val = 2 ** BitsPerWord;
    for (let i = 0; i < words.length; i += 1) {
      val += words[i] * word_val ** i;
    }
    const bits = words.length * BitsPerWord;
    if (val > 2 ** (bits - 1)) {
      val = val - 2 ** bits;
    }
    return val;
  }

  function createArray<T>(length: number): T[] {
    return new Array(length);
  }

  const printHeartRate = async (event: any) => {
    var data = event.target.value.buffer;
    const samples = new Uint8Array(data.slice(10));
    const npoints = samples.byteLength / 3;
    const ECGdata = createArray(npoints);
    for (let offset = 0; offset < samples.byteLength; offset += 3) {
      let i = offset / 3;
      ECGdata[i] = WordstoSignedInteger(samples.slice(offset, offset + 2), 8);
    }
    await sendECGData(ECGdata)
  }

  const stream = {
    ECG: {
      name: "ECG",
      id: 0,
      type: "Electrocardiogram",
      code_start: [0x00, 0x01, 0x82, 0x00, 0x01, 0x01, 0x0e, 0x00],
    },
  };

  const addDevice = async () => {
    try {
      setLoading(true)
      let obj: any = [];

      const num = Object.keys(obj).length + 1;
      const newdevice = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: "Polar" }],
        acceptAllDevices: false,
        optionalServices: [import.meta.env.VITE_APP_PMD_SERVICE],
      });

      const name = newdevice.name || "";
      const devicetype = name.split(" ")[1] as DeviceType;
      obj[num] = structuredClone(devices[devicetype]);
      obj[num]['device'] = newdevice;

      obj[num].device.addEventListener("gattserverdisconnected", onDisconnected);
      obj[num].server = await obj[num].device.gatt?.connect();
      obj[num].service = await obj[num].server.getPrimaryService(import.meta.env.VITE_APP_PMD_SERVICE);
      obj[num].character = await obj[num].service.getCharacteristic(import.meta.env.VITE_APP_PMD_CONTROL);

      // obj[num].character.addEventListener("characteristicvaluechanged", printcontrolvalue);
      await obj[num].character.startNotifications();

      obj[num].data = await obj[num].service.getCharacteristic(import.meta.env.VITE_APP_PMD_DATA);
      await obj[num].data.startNotifications();
      obj[num].data.addEventListener("characteristicvaluechanged", printHeartRate);

      const descriptor = Object.getOwnPropertyDescriptor(obj, num.toString());
      if (descriptor) {
        Object.defineProperty(obj, name, descriptor);
        delete obj[num.toString()];
      }
      for (const [_, value] of Object.entries(obj)) {
        setDevice(value as Device)
      }
      successNotification("Device Connected Successfully")
    } catch (error) {
      errorNotification("Failed to Connect Device")
      setDevice(undefined)
    } finally {
      setLoading(false)
    }
  };

  return (
    <UserLayout>
      {form.status ?
        (loading ?
          (<div className='flex h-screen justify-center items-center'>
            <p className='font-bold text-xl'>Connecting...</p >
          </div>)
          :
          (<div className='flex justify-center items-center h-screen flex-col'>
            <p className='font-bold text-xl mb-3'>{form.topicName}</p >
            {!device && (
              <button onClick={addDevice} className='bg-blue-600 px-4 py-2 text-white font-bold rounded-lg'>Add Device</button>
            )}
            {device && (
              <div className='flex flex-col justify-center items-center'>
                <p className='font-semibold text-xl'>Sensor {device?.device?.name}</p>
                <div className='flex gap-3 mt-4'>
                  <button
                    disabled={record}
                    className='bg-blue-600 px-4 py-2 text-white font-bold rounded-lg' onClick={() => {
                      setRecord(true)
                      startRecording(device, stream.ECG)
                    }}> Record ECG
                  </button>
                  <button
                    disabled={!record}
                    className='bg-red-600  px-4 py-2 text-white font-bold rounded-lg' onClick={() => {
                      setRecord(false)
                      stopRecording(device, stream.ECG)
                    }}>Stop Record
                  </button>
                </div>
              </div>
            )}
          </div>)
        ) :
        <form onSubmit={createTopic} className='flex flex-col justify-center items-center h-screen' >
          <label htmlFor="username" className="text-lg">
            Topic Name
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={form.topicName}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, topicName: e.target.value }));
            }}
            className="rounded text-black mt-2 focus:outline-none px-2 py-1"
          />
          <button
            type="submit"
            className="bg-black mt-5 px-9 py-1 rounded hover:bg-white hover:text-black duration-300 text-white">
            Create
          </button>
        </form>}
      <ToastContainer />
    </UserLayout >
  );
};

export default Record;
