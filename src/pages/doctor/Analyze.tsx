import DoctorLayout from "../../components/layout/DoctorLayout"
import { FormEvent, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { axiosClient } from "../../lib/axios-client";
import { errorNotification, successNotification } from "../../components/toast/notification";
import { setChartBarOption, setChartLineOption, setPlotOption } from "../../feature/Record/chart-option";
import ReactECharts from 'echarts-for-react';
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Button, Modal, Textarea, ToggleSwitch } from "flowbite-react";
import { toggleSwitchTheme } from "../../styles/toggleSwitch";
import { CiSquareRemove } from "react-icons/ci";
import Loading from "../../components/loading/Loading";
import { prediction } from "../../api/prediction/prediction";
import { deleteTopic } from "../../api/topic/topic";


const Analyze = () => {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const [comment, setComment] = useState<string>('')
  const [optionsSelection, setOptionsSelection] = useState<TopicProps>();
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
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    commentIndex: -1
  })
  const addCommentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await axiosClient.patch('/doctor/topic/analyze-comment/' + topicId, { comment })
      successNotification("Analysis added")
      setModal(false)
      setComment('')
      getTopic()
    } catch (error) {
      errorNotification("Failed to add analysis. Please try again")
    }
  }
  const deleteCommentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await axiosClient.delete('/doctor/topic/analyze-comment/' + topicId, {
        data: { commentIndex: deleteModal.commentIndex }
      })
      setDeleteModal({ show: false, commentIndex: -1 })
      successNotification("Comment deleted")
      getTopic()
    } catch (error) {
      errorNotification("Failed to delete comment")
    }
  }

  const switchHandler = async (checked: boolean) => {
    try {
      await axiosClient.patch('/doctor/topic/analyze/' + topicId, { analyzed: checked })
      getTopic()
    } catch (error) { }
  }
  const handleFeatureSelectChange = (selectedOption: SingleValue<SelectionOption>) => {
    setSelectedFeature(selectedOption!);
  };

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
      const { data } = await axiosClient.get('/doctor/topic/' + topicId)
      if (!data.topic.ecg_plot) {
        await prediction(topicId)
        window.location.reload()
      }
      if (data) {
        setOptionsSelection(data.topic)
        getPrediction(data.topic.topic.id)
      }
    } catch (error: any) {
      errorNotification(error.response.data.error + "Trying to generate from recorded data")
      try {
        await prediction(topicId)
        window.location.reload()
      } catch (error: any) {
        if (error.response.status == 404) {
          errorNotification(error.response.data.error + ". Deleting the topic")
          try {
            await deleteTopic(topicId)
            setTimeout(() => {
              window.location.reload()
            }, 2500)
          } catch (error) { }
        }
      }
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
    setLoading(true)
    getTopic()
  }, [])


  return (
    loading ? <Loading /> :
      <DoctorLayout>
        <h1 className="py-2 font-bold text-2xl text-center">Heart Rate Graphic</h1>
        <IoArrowBackCircleOutline className="absolute text-5xl left-10 top-16 cursor-pointer hover:text-blue-500 duration-150" onClick={() => { navigate(-1) }} />
        <ToggleSwitch checked={optionsSelection?.topic.analyzed ?? false} onChange={switchHandler} label={`${optionsSelection?.topic.analyzed ? "Analyzed" : "Not Analyzed"}`} className="absolute right-10 top-5" theme={toggleSwitchTheme} sizing={"md"} color="blue" />
        <div className="flex gap-4 justify-center items-center py-5 focus:border-none">
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
        <div className='flex justify-center'>
          <div style={{ width: '40%', height: '400px' }}>
            {optionBarSeries &&
              <ReactECharts option={optionBarSeries} style={{ width: "100%", height: "100%" }} />
            }
          </div>
        </div>
        <div className="pb-5">
          <button onClick={() => { setModal(true) }} className="bg-black mt-5 px-3 py-2 text-white hover:bg-blue-500 rounded duration-300 ml-10">Add Analysis</button>
          {optionsSelection?.topic.analysis == null || optionsSelection?.topic.analysis.length === 0 ?
            <>
              <p className="mt-4 ml-10 text-xl font-semibold">Analysis</p>
              <p className="ml-10">No Analysis yet</p>
            </>
            : optionsSelection?.topic.analysis.map((doctor, index) => {
              return <div key={index}>
                <p className="ml-10 mt-2 text-lg font-semibold">From Doctor {doctor.doctorName}</p>
                <ul className="ml-10">
                  {doctor.comment.map((comment, index) => {
                    return <li key={index} className="flex mt-2 items-center">
                      <button onClick={() => setDeleteModal({
                        show: true,
                        commentIndex: index
                      })}>
                        <CiSquareRemove className="text-3xl rounded mr-2 hover:bg-red-500 duration-150" />
                      </button>
                      <p>"{comment}"</p>
                    </li>
                  })}
                </ul>
              </div>
            })}
        </div>
        <Modal show={deleteModal.show} size="md" onClose={() => { setDeleteModal({ show: false, commentIndex: -1 }) }} popup>
          <Modal.Header />
          <Modal.Body>
            <h1 className="text-center">Are you sure want to delete this comment?</h1>
            <form className="flex items-center justify-center gap-5" onSubmit={deleteCommentHandler}>
              <Button type="submit" className="mt-4 bg-red-500">Delete</Button>
              <Button onClick={() => setDeleteModal({ show: false, commentIndex: -1 })} className="mt-4">Cancel</Button>
            </form>
          </Modal.Body>
        </Modal>
        <Modal show={modal} size="md" onClose={() => { setModal(false) }} popup>
          <Modal.Header />
          <Modal.Body>
            <h1>Add your analysis here</h1>
            <form onSubmit={addCommentHandler}>
              <Textarea
                id="analysis-comment"
                placeholder="Your analysis here"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                required
                className="mt-4 resize-none focus:outline-none focus:border-none focus:right-0"
                rows={5}
              />
              <Button type="submit" className="mt-4">Submit</Button>
            </form>
          </Modal.Body>
        </Modal>
      </DoctorLayout>
  );
}

export default Analyze