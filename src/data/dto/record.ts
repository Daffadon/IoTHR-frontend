export type DeviceType = 'Sense' | 'H10';

export interface Device {
  type?: DeviceType;
  name?: string;
  output: string[];
  device?: BluetoothDevice;
  server?: BluetoothRemoteGATTServer;
  service?: BluetoothRemoteGATTService;
  character?: BluetoothRemoteGATTCharacteristic;
  data?: BluetoothRemoteGATTCharacteristic;
}
export const devices: Record<DeviceType, Device> = {
  Sense: { type: 'Sense', output: ['SDK', 'PPG', 'ACC_Sense'] },
  H10: { name: 'H10', output: ['ECG', 'ACC_H10'] }
};
