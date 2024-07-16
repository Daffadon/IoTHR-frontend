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
  Brush,
  ReferenceDot
} from 'recharts';

import UserLayout from '../components/layout/UserLayout';
import Select, { SingleValue } from 'react-select';
import { toECGPayload, toHRPayload, toPredictionValue } from '../lib/toRightPayload';
import { optionsSelection } from '../data/page/analysis/options';
import { useState } from 'react';
// Nanti pake context biar ga fetching terus buat batch

const Record = () => {
  const [selected, setSelected] = useState<JsonDatatype>(optionsSelection[0]);

  const dataEcg = toHRPayload(selected);
  const classification = toPredictionValue(selected.value.prediction);

  const handleSelectChange = (selectedOption: SingleValue<JsonDatatype>) => {
    setSelected(selectedOption!);
  };

  const { N, S, V, F, Q } = selected.value.sample_plot;
  const annot = selected.value.annotation;

  return (
    <UserLayout>
      <h1 className="py-2 font-bold text-2xl text-center">Heart Rate Graphic</h1>
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
        <ResponsiveContainer width="90%" height="30%" minHeight={'45vh'}>
          <LineChart
            data={dataEcg}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey={'index'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={'pulse'} stroke="#8884d8" name="Heartbeat" dot={false} />
            {annot.V.length > 0 && (
              <ReferenceDot x={annot.V[0][0]} y={annot.V[0][1] + 100} label="v" fill="yellow" />
            )}
            {annot.S.length > 0 && (
              <ReferenceDot x={annot.S[0][0]} y={annot.S[0][1] + 100} label="s" fill="red" />
            )}
            {annot.F.length > 0 && (
              <ReferenceDot x={annot.V[0][0]} y={annot.V[0][1] + 100} label="f" fill="green" />
            )}
            {annot.N.length > 0 && (
              <ReferenceDot x={annot.V[0][0]} y={annot.V[0][1] + 100} label="n" fill="blue" />
            )}
            {annot.Q.length > 0 && (
              <ReferenceDot x={annot.V[0][0]} y={annot.V[0][1] + 100} label="q" fill="grey" />
            )}
            <Brush startIndex={0} endIndex={950} dataKey="index" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>

        {/*  CONTOH PLOT */}

        <div className="flex flex-col w-full justify-center mt-2">
          <h1 className="text-center font-bold text-xl">Example Plot</h1>
          <div className="flex justify-center items-center mt-5">
            {N.length > 0 && (
              <ResponsiveContainer width="25%" height="30%" minHeight={'20vh'}>
                <LineChart
                  data={toECGPayload(N)}
                  margin={{
                    top: 5,
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
            )}

            {S.length > 0 && (
              <ResponsiveContainer width="25%" height="30%" minHeight={'20vh'}>
                <LineChart
                  data={toECGPayload(S)}
                  margin={{
                    top: 5,
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
            )}

            {V.length > 0 && (
              <ResponsiveContainer width="25%" height="30%" minHeight={'20vh'}>
                <LineChart
                  data={toECGPayload(V)}
                  margin={{
                    top: 5,
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
            )}

            {F.length > 0 && (
              <ResponsiveContainer width="25%" height="30%" minHeight={'20vh'}>
                <LineChart
                  data={toECGPayload(F)}
                  margin={{
                    top: 5,
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
            )}

            {Q.length > 0 && (
              <ResponsiveContainer width="25%" height="30%" minHeight={'20vh'}>
                <LineChart
                  data={toECGPayload(Q)}
                  margin={{
                    top: 5,
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
            )}
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <h1 className="text-center font-bold text-xl py-8">Classification Result</h1>
          <ResponsiveContainer width="30%" height="20%" minHeight={'50vh'}>
            <BarChart
              data={classification}
              margin={{
                top: 5,
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
        {selected.comment.map((com, index) => (
          <p key={index}>{com}</p>
        ))}
      </section>
    </UserLayout>
  );
};

export default Record;