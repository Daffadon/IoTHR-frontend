import icnlogo from '../../assets/icn-logo.svg';
import { TbActivityHeartbeat } from 'react-icons/tb';
const Sidebar = () => {
  return (
    <div className="w-1/6 max-h-screen sticky top-0 border-r-indigo-700 text-white border-right font-semibold bg-black bg-no-repeat">
      <img
        src={icnlogo}
        alt="logo"
        className="absolute top-[50%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%] -z-10"
      />
      <div className="bg-blue-500 w-full max-h-screen h-screen bg-opacity-50">
        <div className="h-[3em] mb-[1em] bg-blue-300 flex justify-center items-center text-blue-800">
          <TbActivityHeartbeat size={50} />
        </div>
        <p className="px-3 py-2 border-b border-blue-800">Profile</p>
        <p className="px-3 py-2 border-b border-blue-800">Raw Data</p>
        <p className="px-3 py-2 border-b border-blue-800">Analysis</p>
        <p className="px-3 py-2 border-b border-blue-800">FAQ</p>
        <div className="flex justify-center items-end h-[60%]">
          <p className="bg-blue-300 w-full text-blue-800 text-center py-2 font-extrabold">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
