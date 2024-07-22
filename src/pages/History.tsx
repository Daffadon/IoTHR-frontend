
import UserLayout from '../components/layout/UserLayout';
import Select, { SingleValue } from 'react-select';
// import { optionsSelection } from '../data/page/analysis/options';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { setChartBarOption, setChartLineOption, setPlotOption } from '../feature/Record/chart-option';
import { axiosClient } from '../lib/axios-client';
import { HistoryProps } from './Profile';
import { errorNotification } from '../components/toast/notification';

interface SelectionOption {
  value: string,
  label: string
}
interface SamplePlotProps {
  N: number[],
  S: number[],
  V: number[],
  F: number[],
  Q: number[]

}

const History = () => {
  const [history, setHistory] = useState<SelectionOption[]>([]);
  const [optionsSelection, setOptionsSelection] = useState<JsonDatatype>();
  const [selected, setSelected] = useState<SelectionOption>();
  const [optionSeries, setOptionSeries] = useState<any>()
  const [optionBarSeries, setOptionBarSeries] = useState<any>();
  const [samplePlot, setSamplePlot] = useState<SamplePlotProps>({
    N: [],
    S: [],
    V: [],
    F: [],
    Q: []
  });
  const handleSelectChange = (selectedOption: SingleValue<SelectionOption>) => {
    setSelected(selectedOption!);
    getTopic()
  };

  const getHistory = async () => {
    try {
      const { data } = await axiosClient.get('/profile/history')
      if (data) {
        const newObj: SelectionOption[] = data.data.map((item: HistoryProps) => {
          return { value: item.topicId, label: item.topicName }
        })
        setHistory(newObj)
        setSelected(newObj[0])
      }
    } catch (error) {
      errorNotification("Failed to fetch History")
    }
  }

  const getTopic = async () => {
    try {
      const { data } = await axiosClient.get('/topic/' + selected?.value)
      if (data) {
        console.log(data.topic)
        setOptionsSelection(data.topic)
      }
    } catch (error) {
      errorNotification("Failed to fetch Topic")
    }
  }

  useEffect(() => {
    if (selected) {
      getTopic()
    }
  }, [selected])

  useEffect(() => {
    if (!optionsSelection) return;
    setOptionSeries(setChartLineOption(optionsSelection));
    setOptionBarSeries(setChartBarOption(optionsSelection));
    const { N, S, V, F, Q } = optionsSelection?.sample_plot;
    setSamplePlot({ N, S, V, F, Q })
  }, [optionsSelection])

  useEffect(() => {
    getHistory()
  }, [])


  return (
    <UserLayout>
      <h1 className="py-2 font-bold text-2xl text-center">Heart Rate Graphic</h1>
      <div className="flex justify-center items-center pb-5 focus:border-none">
        <Select
          isSearchable={false}
          value={selected}
          onChange={handleSelectChange}
          options={history}
          className="w-1/3 border-black focus:outline-none focus-within::border-black max-h-[20vh] text-black"
        />
      </div>
      <div style={{ width: '100%', height: '400px' }}>
        {optionSeries &&
          <ReactECharts option={optionSeries} style={{ width: '100%', height: '100%' }} notMerge={true} />
        }
      </div>
      <div className='flex justify-center'>
        <div style={{ width: '40%', height: '400px' }}>
          {optionBarSeries &&
            <ReactECharts option={optionBarSeries} style={{ width: "100%", height: "100%" }} />
          }
        </div>
      </div>
      <h1 className='text-center text-lg font-semibold pb-4'>Sample Plot</h1>
      <div className='flex justify-center items-center w-full flex-wrap'>
        {samplePlot?.N.length > 0 && (
          <ReactECharts option={setPlotOption(samplePlot?.N, "N")} className='w-4/12' />
        )}
        {samplePlot?.S.length > 0 && (
          <ReactECharts option={setPlotOption(samplePlot?.S, "S")} className='w-4/12' />
        )}
        {samplePlot.V.length > 0 && (
          <ReactECharts option={setPlotOption(samplePlot?.V, "V")} className='w-4/12' />
        )}
        {samplePlot.F.length > 0 && (
          <ReactECharts option={setPlotOption(samplePlot?.F, "F")} className='w-4/12' />
        )}
        {samplePlot.Q.length > 0 && (
          <ReactECharts option={setPlotOption(samplePlot?.Q, "Q")} className='w-4/12' />
        )}
      </div>
    </UserLayout>
  );
};

export default History;
