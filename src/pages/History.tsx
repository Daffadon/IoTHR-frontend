
import UserLayout from '../components/layout/UserLayout';
import Select, { SingleValue } from 'react-select';
import { optionsSelection } from '../data/page/analysis/options';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { setChartBarOption, setChartLineOption, setPlotOption } from '../feature/Record/chart-option';

const History = () => {
  const [selected, setSelected] = useState<JsonDatatype>(optionsSelection[0]);
  const [optionSeries, setOptionSeries] = useState(setChartLineOption(selected));
  const [optionBarSeries, setOptionBarSeries] = useState(setChartBarOption(selected));
  const handleSelectChange = (selectedOption: SingleValue<JsonDatatype>) => {
    setSelected(selectedOption!);
  };

  useEffect(() => {
    setOptionSeries(setChartLineOption(selected));
    setOptionBarSeries(setChartBarOption(selected));
  }, [selected]);

  const { N, S, V, F, Q } = selected.value.sample_plot;
  console.log(N)

  return (
    <UserLayout>
      <h1 className="py-2 font-bold text-2xl text-center">Heart Rate Graphic</h1>
      <div className="flex justify-center items-center pb-5 focus:border-none">
        <Select
          isSearchable={false}
          value={selected}
          onChange={handleSelectChange}
          options={optionsSelection}
          className="w-1/3 border-black focus:outline-none focus-within::border-black max-h-[20vh]"
        />
      </div>
      <div style={{ width: '100%', height: '400px' }}>
        <ReactECharts option={optionSeries} style={{ width: '100%', height: '100%' }} notMerge={true} />
      </div>
      <div className='flex justify-center'>
        <div style={{ width: '40%', height: '400px' }}>
          <ReactECharts option={optionBarSeries} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <h1 className='text-center text-lg font-semibold pb-4'>Sample Plot</h1>
      <div className='flex justify-center items-center w-full flex-wrap'>
        {N.length > 0 && (
          <ReactECharts option={setPlotOption(N, "N")} className='w-4/12' />
        )}
        {S.length > 0 && (
          <ReactECharts option={setPlotOption(S, "S")} className='w-4/12' />
        )}
        {V.length > 0 && (
          <ReactECharts option={setPlotOption(V, "V")} className='w-4/12' />
        )}
        {F.length > 0 && (
          <ReactECharts option={setPlotOption(F, "F")} className='w-4/12' />
        )}
        {Q.length > 0 && (
          <ReactECharts option={setPlotOption(Q, "Q")} className='w-4/12' />
        )}
      </div>
    </UserLayout>
  );
};

export default History;
