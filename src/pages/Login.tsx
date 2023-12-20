import { FormEvent, useState } from 'react';
// import { axiosClient } from '../lib/axios-client';
import { loginFormType } from '../data/dto/form';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import GuestLayout from '../components/layout/GuestLayout';
import { BsArrowLeft } from 'react-icons/bs';

const Login = () => {
  // const { setTokenToLocal, setUser } = useUserContext();

  const { setTokenToLocal } = useUserContext();
  const navigate = useNavigate();
  // const [msg, setMsg] = useState<[] | null>(null);
  const [msg, setMsg] = useState<String | null>(null);
  const [form, setForm] = useState<loginFormType>({
    username: '',
    password: ''
  });

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const data = await axiosClient.post('/login', { form });
      if (
        form.username === import.meta.env.VITE_APP_USERNAME &&
        form.password === import.meta.env.VITE_APP_PASSWD
      ) {
        setTokenToLocal(import.meta.env.VITE_APP_TOKEN);
        // setUser({ name: '', role: '', validated: false });
        navigate('/home');
      } else {
        setMsg("username and password combination doesn't match");
      }
    } catch (error) {}
  };
  return (
    <GuestLayout>
      <div className="grid place-items-center min-h-[90vh]">
        <form
          className="flex flex-col justify-center items-center text-white min-h-[60vh] py-5 w-[22em] bg-blue-700 rounded-xl"
          onSubmit={loginHandler}>
          <h1 className="mb-5 text-white font-bold text-2xl">Login</h1>
          {/* {msg &&
            msg.map((msg) => {
              return <p>{msg}</p>;
            })} */}
          <label htmlFor="username" className="text-lg">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, username: e.target.value }));
              // setForm((prev) => {
              //   return { ...prev, username: e.target.value };
              // });
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
          {msg ? <p className="text-center text-black font-semibold mt-5">{msg}</p> : ''}
        </form>
      </div>
    </GuestLayout>
  );
};

export default Login;
