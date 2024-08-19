
import { useState, FormEvent, useEffect, } from 'react';
import UserLayout from '../../components/layout/UserLayout';
import { axiosClient } from '../../lib/axios-client';
import { errorNotification, successNotification } from '../../components/toast/notification';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { SelectTimerProps, timerList } from '../../feature/Record/timer-list';
import TimerList from '../../feature/Record/TimerList';
import { createArray } from '../../utils/create-array';
import { WordstoSignedInteger } from '../../utils/words-to-integer';
import { stream } from '../../feature/Record/stream';
import { Device, devices, DeviceType } from '../../data/dto/record';
import { useNavigate } from 'react-router-dom';
import { connectWebSocket, disconnectWebSocket, sendECGData } from '../../utils/socket-connection';
import { useUserContext } from '../../context/userContext';

interface FormRecordProps {
  topicName?: string,
  status?: boolean,
  topicId?: string
}
const Record = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState<null | FormRecordProps>(
    {
      topicName: '',
      status: false,
      topicId: ''
    }
  )
  const { token } = useUserContext()
  const [device, setDevice] = useState<Device | null>();
  const [loading, setLoading] = useState<boolean>(false)
  const [onRecord, setOnRecord] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [firstTime, setFirstTime] = useState<boolean>(true)
  const [timer, setTimer] = useState<SelectTimerProps>(timerList[0])

  const sendData = async (data: any) => {
    try {
      if (firstTime) {
        setOnRecord(true)
        setFirstTime(false)
      }
      sendECGData(data, form?.topicId || '')
    }
    catch (error) {
      errorNotification("Failed to Send ECG Data")
    }
  }

  const updateRecordTimeTopic = async (time: string) => {
    try {
      await axiosClient.patch('/topic/record-time', {
        topicId: form?.topicId,
        recordTime: time
      })
    }
    catch (error) {
      errorNotification("Failed to Update Record Time")
    }
  }

  const createTopic = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axiosClient.post('/topic/create', { name: form?.topicName })
      if (response.status === 200) {
        const formObject: FormRecordProps = {
          topicName: form?.topicName,
          status: true,
          topicId: response.data.topicId
        }
        setForm(formObject)
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
    await updateRecordTimeTopic(timer.title)
    connectWebSocket()
    if (device?.character) {
      const Init = [0x02, stream.id];
      const BytesToSend = Init.concat(stream.code_start);
      await device.character.writeValue(new Uint8Array(BytesToSend));
    }
    successNotification("Recording Started")
  }

  const stopRecording = async (device: Device | undefined | null, stream: any) => {
    const off = new Uint8Array([0x03, stream.id]);
    if (device?.character) {
      await device?.character.writeValue(off);
    }
    disconnectWebSocket(form?.topicId || '', token)
    setOnRecord(false)
    errorNotification("Recording Stopped")
    setIsComplete(false)
    setForm(null)
    setDevice(null)
    navigate('/history')
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  const onDisconnected = () => {
    errorNotification("Device Disconnected")
  };

  const printHeartRate = async (event: any) => {
    const data = event.target.value.buffer;
    const samples = new Uint8Array(data.slice(10));
    const npoints = samples.byteLength / 3;
    const ECGdata = createArray(npoints);
    for (let offset = 0; offset < samples.byteLength; offset += 3) {
      const i = offset / 3;
      ECGdata[i] = WordstoSignedInteger(samples.slice(offset, offset + 2), 8);
    }
    try {
      sendData(ECGdata)
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  const addDevice = async () => {
    try {
      setLoading(true)
      const devicesMap: Record<string, Device> = {};

      const newDevice = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: "Polar" }],
        acceptAllDevices: false,
        optionalServices: [import.meta.env.VITE_APP_PMD_SERVICE],
      });

      const name = newDevice.name || "";
      const deviceType = name.split(" ")[1] as DeviceType;
      const deviceData: any = structuredClone(devices[deviceType]);

      deviceData.device = newDevice;
      deviceData.device.addEventListener("gattserverdisconnected", onDisconnected)


      deviceData.server = await deviceData.device.gatt?.connect();
      deviceData.service = await deviceData.server.getPrimaryService(import.meta.env.VITE_APP_PMD_SERVICE);
      deviceData.character = await deviceData.service.getCharacteristic(import.meta.env.VITE_APP_PMD_CONTROL);
      await deviceData.character.startNotifications();

      deviceData.data = await deviceData.service.getCharacteristic(import.meta.env.VITE_APP_PMD_DATA);
      await deviceData.data.startNotifications();
      deviceData.data.addEventListener("characteristicvaluechanged", printHeartRate);

      devicesMap[name] = deviceData;

      for (const value of Object.values(devicesMap)) {
        setDevice(value as Device);
      }
      successNotification("Device Connected Successfully")
    } catch (error) {
      errorNotification("Failed to Connect Device")
      setDevice(undefined)
    } finally {
      setLoading(false)
    }
  };

  const countDownRenderer = ({ hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      setIsComplete(true)
      return <div className='text-white text-4xl'>Recording Completed!</div>;
    } else {
      return (
        <div className='text-white text-4xl'>
          <span>{hours.toString().padStart(2, '0')}</span>:
          <span>{minutes.toString().padStart(2, '0')}</span>:
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
      );
    }
  };

  useEffect(() => {
    if (isComplete) {
      const stop = async () => {
        await stopRecording(device, stream.ECG)
      }
      stop()
    }
  }, [isComplete])
  return (
    <>
      {onRecord && (
        <div className='absolute h-screen w-full bg-black z-10 opacity-95 flex justify-center items-center'>
          <Countdown className='z-10'
            date={Date.now() + timer.time * 60000}
            renderer={countDownRenderer}>
          </Countdown>
        </div >
      )}
      <UserLayout record={onRecord}>
        {form?.status ?
          (loading ?
            (<div className='flex h-screen justify-center items-center'>
              <p className='font-bold text-xl'>Connecting...</p >
            </div>)
            :
            (<div className='flex justify-center items-center h-screen flex-col'>
              <p className='font-bold text-xl mb-3'>{form?.topicName}</p >
              {!device && (
                <button onClick={addDevice} className='bg-blue-600 px-4 py-2 text-white font-bold rounded-lg'>Add Device</button>
              )}
              {device && (
                <div className='flex flex-col justify-center items-center'>
                  <p className='font-semibold text-xl'>Sensor {device?.device?.name}</p>
                  <div className='flex flex-col gap-3 mt-4'>
                    <div>
                      <TimerList timerState={timer} setTimer={setTimer} />
                    </div>
                    <button
                      className='bg-blue-600 px-4 py-2 text-white font-bold rounded-lg hover:bg-blue-700  ' onClick={() => {
                        startRecording(device, stream.ECG)
                      }}> Record ECG
                    </button>
                  </div>
                </div>
              )}
            </div>)
          ) :
          <form onSubmit={createTopic} className='flex flex-col justify-center items-center h-screen' >
            <label htmlFor="topic" className="text-lg">
              Topic Name
            </label>
            <input
              type="text"
              name="topic"
              id="topic"
              value={form?.topicName}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, topicName: e.target.value }));
              }}
              className="rounded text-black mt-2 focus:outline-none px-2 py-1"
            />
            <button
              type="submit"
              className="bg-black mt-5 px-9 py-1 rounded hover:bg-white hover:text-black duration-300 text-white hover:border-black hover:border">
              Create
            </button>
          </form>}
      </UserLayout >
    </>
  );
};




export default Record;
