import { Link, useNavigate, useParams } from "react-router-dom"
import dummypict from '../../assets/profpicdummy.png';
import DoctorLayout from "../../components/layout/DoctorLayout"
import { useEffect, useState } from "react"
import { ProfileProps, UserHistoryProps } from "../../data/dto/profile"
import { axiosClient } from "../../lib/axios-client"
import { errorNotification } from "../../components/toast/notification"
import { calculateAge } from "../../utils/calcualteAge"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { CiSquareCheck, CiSquareRemove } from "react-icons/ci";
import Loading from "../../components/loading/Loading";


const PatientDetail = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<ProfileProps>()
  const [history, setHistory] = useState<UserHistoryProps[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const getPatientProfile = async () => {
    try {
      const { data } = await axiosClient.get('/doctor/user/' + userId)
      if (data) {
        setProfile(data.data)
      }
    } catch (error) {
      errorNotification("Failed to fetch Patient Data")
    }
  }
  const getPatientHistory = async () => {
    try {
      const { data } = await axiosClient.get('/doctor/history/' + userId)
      if (data) {
        setHistory(data.data)
      }
    } catch (error) {
      errorNotification("Failed to fetch Patient History")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getPatientProfile(), getPatientHistory()]);
      } catch (error) {
        errorNotification("Failed to get data")
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])
  return (
    loading ? <Loading /> :
      <DoctorLayout>
        <h1 className="text-center py-5 font-bold text-2xl">Patient Detail</h1>
        <IoArrowBackCircleOutline className="absolute text-5xl left-10 top-16 cursor-pointer hover:text-blue-500 duration-150" onClick={() => { navigate(-1) }} />
        <div className="flex justify-center items-center">
          <img src={dummypict} alt="" className="rounded-full w-40 h-40 object-cover" />
        </div>
        <h1 className="text-center text-2xl pt-5">{profile?.fullname}</h1>
        <h2 className="text-center text-lg">{profile?.email}</h2>
        <h2 className='text-center text-lg'>Age: {calculateAge(profile ? profile.birthDate : "0")} years old</h2>
        <h3 className="text-center mt-5 font-bold text-xl">History</h3>
        <div className="flex justify-around items-center mt-3">
          <table className="rounded-md p-2 w-3/4">
            <thead>
              <tr>
                <th className="w-1/12 py-2">No</th>
                <th className="w-1/3 py-2">Topic Name</th>
                <th className="w-1/3 py-2">Recorded At</th>
                <th className="w-1/3 py-2">Recording Duration</th>
                <th className="w-1/5 py-2">Analyzed</th>
                <th className="w-1/5 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {history && history.map((topic, index) => {
                return (
                  <tr key={topic.topicId} className={`text-white mt-2 ${index % 2 == 0 ? "bg-blue-600" : "bg-blue-500"}`}>
                    <td className="w-1/12 text-center py-2">{index + 1}</td>
                    <td className="w-1/3 text-center py-2">{topic.topicName}</td>
                    <td className="w-1/3 text-center py-2">{topic.date}</td>
                    <td className="w-1/3 text-center py-2">{topic.recordTime}</td>
                    <td className="w-1/5 text-center py-2">{topic.analyzed ?
                      <div className="flex justify-center items-center">
                        <CiSquareCheck className="text-3xl bg-green-500 rounded" />
                      </div>
                      :
                      <div className="flex justify-center items-center">
                        <CiSquareRemove className="text-3xl bg-red-500 rounded" />
                      </div>
                    }</td>
                    <td className="w-1/3 text-center py-2 px-4">
                      <Link to={`/analyze/${topic.topicId}`}>
                        <button className="px-3 py-2 bg-white rounded text-black hover:scale-95text-sm font-semibold hover:text-white hover:bg-black duration-150">Analyze</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DoctorLayout>
  )
}

export default PatientDetail