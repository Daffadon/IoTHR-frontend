
import UserLayout from '../components/layout/UserLayout';
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { setChartBarOption, setChartLineOption, setPlotOption } from '../feature/Record/chart-option';
import { axiosClient } from '../lib/axios-client';
import { errorNotification } from '../components/toast/notification';
import { HistoryProps } from '../data/dto/profile';


const History = () => {
  const [history, setHistory] = useState<SelectionOption[]>([]);
  const [optionsSelection, setOptionsSelection] = useState<TopicProps>();
  const [selected, setSelected] = useState<SelectionOption>();
  const [optionSeries, setOptionSeries] = useState<any>()

  const [optionBarSeries, setOptionBarSeries] = useState<any>();
  const [selectedFeature, setSelectedFeature] = useState<PredictionOptionProps>();
  const [predictionOption, setPredictionOption] = useState<PredictionOptionProps[]>();
  const [predictionData, setPredictionData] = useState<PredictionProps>();
  const [samplePlot, setSamplePlot] = useState<SamplePlotProps>({
    N: [],
    S: [],
    V: [],
    F: [],
    Q: []
  });
  const handleSelectChange = (selectedOption: SingleValue<SelectionOption>) => {
    setSelected(selectedOption!);
  };

  const handleFeatureSelectChange = (selectedOption: SingleValue<SelectionOption>) => {
    setSelectedFeature(selectedOption!);
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
  const getPrediction = async (topicId: string) => {
    try {
      const { data } = await axiosClient.get('/prediction/' + topicId)
      if (data) {
        const newObj: SelectionOption[] = data.data.map((item: PredictionOptionListProps) => {
          return { value: item.predictionId, label: item.feature }
        })
        setPredictionOption(newObj)
        setSelectedFeature(newObj[0])
      }
    } catch (error) {
      errorNotification("Failed to fetch Prediction")
    }
  }

  const getPredictionById = async (predictionId: string) => {
    try {
      const { data } = await axiosClient.get('/prediction/id/' + predictionId)
      if (data) {
        setPredictionData(data.data)
      }
    } catch (error) {
      errorNotification("Failed to fetch Prediction")
    }
  }

  const getTopic = async () => {
    try {
      const { data } = await axiosClient.get('/topic/' + selected?.value)
      if (data) {
        setOptionsSelection(data.topic)
        getPrediction(data.topic.id)
      }
    } catch (error) {
      errorNotification("Failed to fetch Topic")
    }
  }

  useEffect(() => {
    if (predictionData && optionsSelection) {
      setOptionSeries(setChartLineOption(optionsSelection, predictionData));
      setOptionBarSeries(setChartBarOption(predictionData));
      const { N, S, V, F, Q } = predictionData?.sample_plot;
      setSamplePlot({ N, S, V, F, Q })
    }
  }, [predictionData])

  useEffect(() => {
    if (selectedFeature) {
      getPredictionById(selectedFeature.value)
    }
  }, [selectedFeature])

  useEffect(() => {
    if (selected) {
      getTopic()
    }
  }, [selected])

  useEffect(() => {
    getHistory()
  }, [])


  return (
    <UserLayout>
      <h1 className="py-2 font-bold text-2xl text-center">Heart Rate Graphic</h1>
      <div className="flex gap-4 justify-center items-center py-5 focus:border-none">
        <Select
          isSearchable={false}
          value={selected}
          onChange={handleSelectChange}
          options={history}
          className="w-1/3 border-black focus:outline-none focus-within::border-black max-h-[20vh] text-black"
        />
        <Select
          isSearchable={false}
          value={selectedFeature}
          onChange={handleFeatureSelectChange}
          options={predictionOption}
          className="w-1/3 border-black focus:outline-none focus-within::border-black max-h-[20vh] text-black"
        />
      </div>
      {optionsSelection && <p className='text-center font-semibold'>Recording Time: <span className='text-blue-600'>{optionsSelection?.recordTime}</span></p>}
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
