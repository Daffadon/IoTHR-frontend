import dummypict from '../../assets/profpicdummy.png';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../lib/axios-client';
import { errorNotification } from '../../components/toast/notification';
import { HistoryProps, ProfileProps } from '../../data/dto/profile';
import { calculateAge } from '../../utils/calcualteAge';
import { useUserContext } from '../../context/userContext';
import SelectLayout from '../../components/layout/SelectLayout';
import { CiSquareCheck, CiSquareRemove } from 'react-icons/ci';
import Loading from '../../components/loading/Loading';

const Profile = () => {
  const [profile, setProfile] = useState<ProfileProps>()
  const [history, setHistory] = useState<HistoryProps[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useUserContext()
  const getProfile = async () => {
    try {
      const { data } = await axiosClient.get('/profile')
      if (data) {
        setProfile(data.data)
      }
    } catch (error) {
      errorNotification("Failed to get profile")
    }
  }
  const getHistory = async () => {
    try {
      const { data } = await axiosClient.get('/profile/history')
      if (data) {
        setHistory(data.data)
      }
    } catch (error: any) {
      errorNotification(error.response.data.error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getProfile(), getHistory()]);
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
      <SelectLayout>
        <h1 className="text-center py-5 font-bold text-2xl">Welcome to Your Profile Page!</h1>
        <div className="flex justify-center items-center">
          <img src={dummypict} alt="" className="rounded-full w-40 h-40 object-cover" />
        </div>
        <h1 className="text-center text-2xl pt-5">{profile?.fullname}</h1>
        <h2 className="text-center text-lg">{profile?.email}</h2>
        <h2 className='text-center text-lg'>Age: {calculateAge(profile ? profile.birthDate : "0")} years old</h2>
        {
          user?.role === 'user' &&
          (<>
            <h3 className="text-center mt-5 font-bold text-xl">History</h3>
            <div className="flex justify-around items-center mt-3">
              <table className="border-2 border-black rounded-md p-2 w-1/2">
                <thead>
                  <tr className="">
                    <th className="w-1/2 border border-black py-2">Topic Name</th>
                    <th className="w-1/2 border border-black py-2">Analyzed</th>
                  </tr>
                </thead>
                <tbody>
                  {history && history.map((topic) => {
                    return (
                      <tr key={topic.topicId} className="border border-black">
                        <td className="w-1/2 border border-black text-center py-1">{topic.topicName}</td>
                        <td className="w-1/2 border border-black text-center py-1">
                          {topic.analyzed ? <div className="flex justify-center items-center">
                            <CiSquareCheck className="text-3xl bg-green-500 rounded" />
                          </div>
                            :
                            <div className="flex justify-center items-center">
                              <CiSquareRemove className="text-3xl bg-red-500 rounded" />
                            </div>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
          )
        }
      </SelectLayout>
  );
};

export default Profile;
