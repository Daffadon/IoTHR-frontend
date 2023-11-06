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

import UserLayout from '../components/layout/UserLayout';
import Select, { SingleValue } from 'react-select';
import { toECGPayload, toHRPayload, toPredictionValue } from '../lib/toRightPayload';
import { plot_n_flattened } from '../data/page/analysis/plot/plot_n';
import { plot_f_flattened } from '../data/page/analysis/plot/plot_f';
import { plot_q_flattened } from '../data/page/analysis/plot/plot_q';
import { plot_v_flattened } from '../data/page/analysis/plot/plot_v';
import { plot_s_flattened } from '../data/page/analysis/plot/plot_s';
import { optionsSelection } from '../data/page/analysis/options';
import { useState } from 'react';
// Nanti pake context biar ga fetching terus buat batch

const History = () => {
  const [selected, setSelected] = useState<{
    value: {
      name: string;
      date: string;
      prediction: { N: number; S: number; V: number; F: number; Q: number };
      feature: string;
      runtime: number;
      ecgplot: number[];
      annotation: number[][][];
    };
    label: string;
  }>(optionsSelection[0]);

  const dataEcg = toHRPayload(selected);

  const plot_n = toECGPayload(plot_n_flattened);
  const plot_f = toECGPayload(plot_f_flattened);
  const plot_q = toECGPayload(plot_q_flattened);
  const plot_s = toECGPayload(plot_s_flattened);
  const plot_v = toECGPayload(plot_v_flattened);

  const classification = toPredictionValue(selected.value.prediction);

  const handleSelectChange = (
    selectedOption: SingleValue<{
      value: {
        name: string;
        date: string;
        prediction: { N: number; S: number; V: number; F: number; Q: number };
        feature: string;
        runtime: number;
        ecgplot: number[];
        annotation: number[][][];
      };
      label: string;
    }>
  ) => {
    setSelected(selectedOption!);
  };

  return (
    <UserLayout>
      <h1 className="py-5 font-bold text-3xl text-center">Heart Rate Graphic</h1>
      {/* Dropdown data for spesific user */}
      <div className="flex justify-center items-center pb-5 focus:border-none">
        <Select
          isSearchable={false}
          value={selected}
          onChange={handleSelectChange}
          options={optionsSelection}
          className="w-1/3 border-black focus:outline-none focus-within::border-black"
        />
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
            <Line
              type="monotone"
              dataKey={'pulse'}
              stroke="#8884d8"
              name="Heart beat"
              dot={false}
            />
            <Brush startIndex={0} endIndex={1100} dataKey="pulse" stroke="#8884d8" />
            {/* <Line type="monotone" dataKey={'pulse'} stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          </LineChart>
        </ResponsiveContainer>

        {/*  CONTOH PLOT */}

        <div className="flex flex-col w-full justify-center mt-10">
          <h1 className="text-center font-bold text-xl">Example Plot</h1>
          <div className="flex justify-center items-center mt-5">
            <ResponsiveContainer width="25%" height="30%" minHeight={'40vh'}>
              <LineChart
                data={plot_n}
                margin={{
                  top: 5,
                  // right: 30,
                  // left: 20,
                  bottom: 5
                }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis scale={'auto'} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={'pulse'} name="N" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="25%" height="30%" minHeight={'40vh'}>
              <LineChart
                data={plot_f}
                margin={{
                  top: 5,
                  // right: 30,
                  // left: 20,
                  bottom: 5
                }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis scale={'auto'} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={'pulse'} name="F" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="25%" height="30%" minHeight={'40vh'}>
              <LineChart
                data={plot_q}
                margin={{
                  top: 5,
                  // right: 30,
                  // left: 20,
                  bottom: 5
                }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis scale={'auto'} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={'pulse'} name="Q" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center items-center">
            <ResponsiveContainer width="25%" height="30%" minHeight={'40vh'}>
              <LineChart
                data={plot_s}
                margin={{
                  top: 5,
                  // right: 30,
                  // left: 20,
                  bottom: 5
                }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis scale={'auto'} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={'pulse'} name="S" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="25%" height="30%" minHeight={'40vh'}>
              <LineChart
                data={plot_v}
                margin={{
                  top: 5,
                  // right: 30,
                  // left: 20,
                  bottom: 5
                }}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis scale={'auto'} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={'pulse'} name="V" stroke="#8884d8" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <h1 className="text-center font-bold text-xl py-8">Classification Result</h1>
          <ResponsiveContainer width="30%" height="20%" minHeight={'50vh'}>
            <BarChart
              data={classification}
              margin={{
                top: 5,
                // right: 30,
                // left: 20,
                bottom: 5
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Class" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <section className="ml-5 mr-5 pb-10">
        <h1 className="border-b-2 max-w-fit border-b-black mb-3">Comments From Doctor</h1>
        <p>
          "Dear Daffa, I am pleased to inform you that your recent ECG results indicate no signs of
          arrhythmia. Your heart rhythm appears to be normal. Please continue with your regular
          health routine."
        </p>
        <p>
          "Dear Daffa, your recent tests have come back negative for arrhythmia. Your heart is
          functioning as it should, and there are no irregularities to be concerned about. Stay
          well."
        </p>
      </section>
    </UserLayout>
  );
};

export default History;
