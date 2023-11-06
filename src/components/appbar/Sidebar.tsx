import { NavLink } from 'react-router-dom';
import icnlogo from '../../assets/icn-logo.svg';
import { TbActivityHeartbeat } from 'react-icons/tb';
const Sidebar = () => {
  const logout = () => {};
  return (
    <div className="w-1/6 max-h-screen sticky top-0 text-white border-right font-semibold backdrop-blur-xl bg-gradient-to-r from-[#1565c0] from-30% via-[#0E2FA6] via-60% bg-[#01579b] to-100%">
      <img
        src={icnlogo}
        alt="logo"
        className="absolute top-[50%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%] -z-10"
      />
      <div className=" w-full max-h-screen h-screen bg-opacity-50">
        <div className="h-[3em] mb-[1em] flex justify-center items-center text-black bg-gradient-to-r from-blue-500 from-30% via-[#03A9F4] via-60% bg-[#0277BD] to-100%">
          <TbActivityHeartbeat size={50} />
        </div>
        <div className="block border-b-2 border-blue-700 px-2 py-3">
          <NavLink to={'/profile'} className="hover:text-blue-300 duration-150">
            Profile
          </NavLink>
        </div>

        <div className="block border-b-2 border-blue-700 px-2 py-3">
          <NavLink to={'/history'} className="hover:text-blue-400 duration-150">
            History
          </NavLink>
        </div>

        <div className="block border-b-2 border-blue-700 px-2 py-3">
          <NavLink to={'/faq'} className="hover:text-blue-400 duration-150">
            FAQ
          </NavLink>
        </div>

        <div className="block border-b-2 border-blue-700 px-2 py-3">
          <NavLink to={'/contact'} className="hover:text-blue-400 duration-150">
            Contact
          </NavLink>
        </div>

        <div className="flex justify-center items-end h-1/2 ">
          <a href="/" className="w-full flex justify-center">
            <button
              // onClick={logout}
              className="bg-gradient-to-r from-blue-500 from-30% via-[#03A9F4] via-60% bg-[#0277BD] to-100% w-[60%] text-black text-center py-2 font-extrabold rounded-lg hover:bg-[#40c4ff] hover:text-white duration-200">
              Logout
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
