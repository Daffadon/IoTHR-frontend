import { FormEvent, useState } from 'react';
import { axiosClient } from '../lib/axios-client';
import { loginFormType } from '../data/dto/form';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import GuestLayout from '../components/layout/GuestLayout';
import { BsArrowRight } from 'react-icons/bs';

const Login = () => {
  const { setTokenToLocal, setUser } = useUserContext();
  const navigate = useNavigate();
  const [msg, setMsg] = useState<[] | null>(null);
  const [form, setForm] = useState<loginFormType>({
    username: '',
    password: ''
  });

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axiosClient.post('/login', { form });

      setTokenToLocal('');
      setUser({ name: '', role: '', validated: false });

      navigate('/admin');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GuestLayout>
      <div className="grid place-items-center min-h-[90vh]">
        <form
          className="flex flex-col justify-center items-center text-white min-h-[60vh] py-5 w-[20em] bg-blue-700 rounded-xl"
          onSubmit={loginHandler}>
          <h1 className="mb-5 text-white font-bold text-2xl">Login</h1>
          {msg &&
            msg.map((msg) => {
              return <p>{msg}</p>;
            })}
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
          <button type="submit" className="bg-black mt-5 px-9 py-1 rounded">
            Login
          </button>
          <Link to={'/signup'} className="text-lg flex justify-center items-center mt-5 gap-2">
            <p>Signup</p>
            <div className="mt-1">
              <BsArrowRight size={25} />
            </div>
          </Link>
        </form>
      </div>
    </GuestLayout>
  );
};

export default Login;
