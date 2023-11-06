import pasien1 from './heart_rate_data/pasien1_20231030-203706.json';
import foresta1 from './heart_rate_data/Foresta_20231106-115050.json';
import bernas1 from './heart_rate_data/Bernas_20231106-115214.json';
import bernas2 from './heart_rate_data/Bernas_20231106-115229.json';

export const optionsSelection = [
  {
    value: pasien1,
    label: 'pasien1_20231030-203706',
    analyzed: false
  },
  {
    value: foresta1,
    label: 'Foresta_20231106-115050',
    analyzed: false
  },
  {
    value: bernas1,
    label: 'Bernas_20231106-115229',
    analyzed: false
  },
  {
    value: bernas2,
    label: 'Bernas_20231106-115214',
    analyzed: false
  }
];
