import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Brush
} from 'recharts';
import { data } from '../data/page/analysis/heart_rate_data';
import data1 from '../data/page/analysis/pasien1_20231030-203706.json';
import UserLayout from '../components/layout/UserLayout';
import Select from 'react-select';
import { toECGPayload, toPredictionValue } from '../lib/toRightPayload';
// Nanti pake context biar ga fetching terus buat batch

const History = () => {
  const dataEcg = toECGPayload(data1.ecgplot);
  const classification = toPredictionValue(data1.prediction);
  return (
    <UserLayout>
      <h1 className="py-5 font-bold text-3xl text-center">Heart Rate Graphic</h1>
      {/* Dropdown data for spesific user */}
      <div className="flex justify-center items-center pb-5 ">
        <Select options={data} className="w-1/3" placeholder="Search" />
      </div>
      <div className="flex justify-center items-center flex-col">
        <ResponsiveContainer width="90%" height="30%" minHeight={'80vh'}>
          <LineChart
            data={dataEcg}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis scale={'auto'} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={'pulse'} stroke="#8884d8" dot={false} />
            <Brush startIndex={0} endIndex={1100} dataKey="pulse" stroke="#8884d8" />
            {/* <Line type="monotone" dataKey={'pulse'} stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="40%" height="20%" minHeight={'50vh'}>
          <BarChart
            data={classification}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </UserLayout>
  );
};

export default History;
