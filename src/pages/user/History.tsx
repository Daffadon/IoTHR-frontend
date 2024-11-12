
import UserLayout from '../../components/layout/UserLayout';
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { setChartBarOption, setChartLineOption, setPlotOption } from '../../feature/Record/chart-option';
import { axiosClient } from '../../lib/axios-client';
import { errorNotification } from '../../components/toast/notification';
import { HistoryProps } from '../../data/dto/profile';
import { prediction } from '../../api/prediction/prediction';
import { deleteTopic } from '../../api/topic/topic';
import Loading from '../../components/loading/Loading';


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

  const [loading, setLoading] = useState<boolean>(false)
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
    } catch (error: any) {
      errorNotification(error.response.data.error)
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
    } catch (error: any) {
      errorNotification(error.response.data.error)
      await prediction(topicId)
      window.location.reload()
    }
  }

  const getPredictionById = async (predictionId: string) => {
    try {
      const { data } = await axiosClient.get('/prediction/id/' + predictionId)
      if (data) {
        setPredictionData(data.data)
      }
    } catch (error) {
      errorNotification("Failed to get Prediction")
    }
  }

  const getTopic = async () => {
    try {
      const { data } = await axiosClient.get('/topic/' + selected?.value)
      if (!data.topic.ecg_plot) {
        await prediction(selected?.value)
        window.location.reload()
      }
      if (data) {
        setOptionsSelection(data.topic)
        getPrediction(data.topic.topic.id)
      }
    } catch (error: any) {
      if (error.response.status == 404) {
        errorNotification(error.response.data.error + "Trying to generate from recorded data")
        try {
          await prediction(selected?.value)
          window.location.reload()
        } catch (error: any) {
          if (error.response.status == 404) {
            errorNotification(error.response.data.error + ". Deleting the topic")
            try {
              await deleteTopic(selected?.value)
              setTimeout(() => {
                window.location.reload()
              }, 2500)
            } catch (error) { }
          }
        }
      }
      errorNotification(error.response.data.error)
    }
  }

  useEffect(() => {
    if (predictionData && optionsSelection) {
      setOptionSeries(setChartLineOption(optionsSelection, predictionData));
      setOptionBarSeries(setChartBarOption(predictionData));
      const { N, S, V, F, Q } = predictionData?.sample_plot;
      setSamplePlot({ N, S, V, F, Q })
    }
    setLoading(false)
  }, [predictionData])

  useEffect(() => {
    if (selectedFeature) {
      setLoading(true)
      getPredictionById(selectedFeature.value)
    }
  }, [selectedFeature])

  useEffect(() => {
    if (selected) {
      setLoading(true)
      getTopic()
    }
  }, [selected])

  useEffect(() => {
    setLoading(true);
    getHistory()
  }, [])


  return (
    loading ? <Loading /> :
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
        {optionsSelection && <p className='text-center font-semibold'>Recorded At: <span className='text-blue-600'>{optionsSelection?.topic.date}</span></p>}
        {optionsSelection && <p className='text-center font-semibold'>Recording Time: <span className='text-blue-600'>{optionsSelection?.topic.recordTime}</span></p>}
        <div style={{ width: '100%', height: '400px' }}>
          {optionSeries &&
            <ReactECharts option={optionSeries} style={{ width: '100%', height: '100%' }} notMerge={true} />
          }
        </div>
        {samplePlot?.N.length > 0 && (
          <h1 className='text-center text-lg font-semibold pb-4'>Sample Plot</h1>
        )}
        <div className='flex justify-center items-center w-full flex-wrap px-3'>
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
        <div className='flex justify-center'>
          <div style={{ width: '40%', height: '400px' }}>
            {optionBarSeries &&
              <ReactECharts option={optionBarSeries} style={{ width: "100%", height: "100%" }} />
            }
          </div>
        </div>
        {optionsSelection != null && (
          <div className='mb-5'>
            <p className="mt-4 ml-10 text-xl font-semibold">Analysis</p>
            {optionsSelection?.topic.analysis == null || optionsSelection?.topic.analysis.length === 0 ?
              <p className="ml-10">No Analysis yet</p>
              : optionsSelection?.topic.analysis.map((doctor, index) => {
                return <>
                  <p key={index} className="ml-10 mt-2 text-md font-semibold">From Doctor {doctor.doctorName}</p>
                  <ul className="ml-10">
                    {doctor.comment.map((comment, index) => {
                      return <li key={index} className="ml-5">"{comment}"</li>
                    })}
                  </ul>
                </>
              })}
          </div>
        )}
      </UserLayout>
  );
};

export default History;
