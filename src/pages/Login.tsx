import { FormEvent, useState } from 'react';
import { loginFormType } from '../data/dto/form';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import GuestLayout from '../components/layout/GuestLayout';
import { BsArrowLeft } from 'react-icons/bs';
import { axiosClient } from '../lib/axios-client';
import { errorNotification, successNotification } from '../components/toast/notification';
import { ToastContainer } from 'react-toastify';

const Login = () => {
  const { setTokenToLocal } = useUserContext();
  const [form, setForm] = useState<loginFormType>({
    email: '',
    password: ''
  });

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post('/auth/login', form);
      if (data != null || data != undefined) {
        successNotification('Login Success');
        setTokenToLocal(data.jwt);
      }
    } catch (error: any) {
      errorNotification(error.response.data.error);
    }
  };
  return (
    <GuestLayout>
      <div className="grid place-items-center min-h-[90vh]">
        <form
          className="flex flex-col justify-center items-center text-white min-h-[60vh] py-5 w-[22em] bg-blue-700 rounded-xl"
          onSubmit={loginHandler}>
          <h1 className="mb-5 text-white font-bold text-2xl">Login</h1>
          <label htmlFor="username" className="text-lg">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={form.email}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
            }}
            className="rounded text-black mt-2 focus:outline-none px-2 py-1"
          />
          <label htmlFor="password" className="mt-5 text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, password: e.target.value }));
            }}
            className=" rounded text-black mt-2 focus:outline-none px-2 py-1"
          />
          <button
            type="submit"
            className="bg-black mt-5 px-9 py-1 rounded hover:bg-white hover:text-black duration-300">
            Login
          </button>
          <Link to={'/signup'} className="text-lg flex justify-center items-center mt-5 gap-2">
            <div className="mt-1">
              <BsArrowLeft size={25} />
            </div>
            <p>Signup</p>
          </Link>
        </form>
        <ToastContainer />
      </div>
    </GuestLayout>
  );
};

export default Login;
