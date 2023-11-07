import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
const Navbar = () => {
  return (
    <nav className="flex justify-around items-center h-[10vh] bg-[#1E1E1E] sticky top-0 z-50">
      <div className="w-1/2 grid place-items-center">
        <Link to={'/'}>
          <img src={logo} alt="" className="w-12 rounded-full" />
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-center gap-7 text-white">
        <Link to="/home" className=" w-max hover:text-blue-600 duration-200">
          Home
        </Link>
        <Link to="/signup" className=" w-max hover:text-blue-600 duration-200">
          Signup
        </Link>
        <Link to="/login" className=" w-max hover:text-blue-600 duration-200">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
