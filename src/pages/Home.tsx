import UserLayout from '../components/layout/UserLayout';
import { CgProfile } from 'react-icons/cg';
import { VscGraphLine } from 'react-icons/vsc';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoIosContact } from 'react-icons/io';
import elipse from '../assets/ilustration/elipse.png';
import { useEffect, useState } from 'react';
import { axiosClient } from '../lib/axios-client';
import { ProfileProps } from '../data/dto/profile';
const Home = () => {
  const [profile, setProfile] = useState<ProfileProps>()
  const getProfile = async () => {
    try {
      const { data } = await axiosClient.get('/profile')
      if (data) {
        setProfile(data.data)
      }
    } catch (error) { }
  }
  useEffect(() => {
    getProfile()
  }, [])
  return (
    <UserLayout>
      <div className="px-2 py-3 pt-8 min-h-full flex flex-col justify-center items-center">
        <h1 className="text-center font-semibold text-xl">
          WELCOME TO DASHBOARD <span className='text-blue-700'>{profile?.fullname}</span>
        </h1>
        <p className="text-center">Here you can do these following things</p>
        <div className="flex justify-center"></div>
        <div className="flex justify-center items-center mt-10">
          <div className="flex justify-center items-center flex-col min-w-[3em] gap-2">
            <CgProfile size={40} />
            <p className=''>Record Heartrate</p>
          </div>
          <div className="w-10 bg-black h-[2px] mt-1 mx-2"></div>
          <div className="flex justify-center items-center flex-col min-w-[3em] gap-2">
            <VscGraphLine size={40} />
            <p>See Recorded Heartrate Analysis</p>
          </div>
          <div className="w-10 bg-black h-[2px] mt-1 mx-2"></div>
          <div className="flex justify-center items-center flex-col min-w-[3em] gap-2">
            <FaQuestionCircle size={40} />
            <p>Frequently Asked Questions</p>
          </div>
          <div className="w-10 bg-black h-[2px] mt-1 mx-2"></div>
          <div className="flex justify-center items-center flex-col min-w-[3em] gap-2">
            <IoIosContact size={40} />
            <p>Contact Us</p>
          </div>
        </div>
      </div>
      <img src={elipse} alt="elipse" className="absolute top-16 left-16 w-16 rotate-45" />
      <img src={elipse} alt="elipse" className="absolute bottom-16 right-16 w-16 -rotate-90" />
    </UserLayout>
  );
};

export default Home;
