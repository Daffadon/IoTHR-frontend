import { FormEvent, useState } from 'react';
import { axiosClient } from '../lib/axios-client';
import { loginFormType } from '../data/dto/form';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const Login = () => {
  const { setTokenToLocal, setUser } = useUserContext();
  const navigate = useNavigate();
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
    <div className="grid place-items-center h-screen">
      <form
        className="flex flex-col justify-center items-center text-white min-h-[50vh] py-5 w-[20em] bg-blue-500 rounded"
        onSubmit={loginHandler}>
        <h1 className="mb-5 text-black font-extrabold">Login</h1>
        <label htmlFor="username">Username</label>
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
          className="rounded text-black mt-2"
        />
        <label htmlFor="password" className="mt-5">
          Password
        </label>
        <input
          type="text"
          name="password"
          id="password"
          value={form.password}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, password: e.target.value }));
          }}
          className=" rounded text-black mt-2"
        />
        <button type="submit" className="bg-black mt-5 px-7 py-1 rounded">
          Login
        </button>
        <Link to={'/signup'} className="mt-5">
          Signup
        </Link>
      </form>
    </div>
  );
};

export default Login;
