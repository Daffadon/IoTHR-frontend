import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupFormType } from '../data/dto/form';
import { axiosClient } from '../lib/axios-client';
import { useUserContext } from '../context/userContext';
import GuestLayout from '../components/layout/GuestLayout';

const Signup = () => {
  const navigate = useNavigate();
  const { setTokenToLocal, setUser } = useUserContext();
  const [form, setForm] = useState<signupFormType>({
    email: '',
    username: '',
    password: '',
    rePassword: ''
  });

  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await axiosClient.post('/signup', { form });

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
          className="flex flex-col justify-center items-center text-white min-h-[50vh] w-[20em] bg-blue-500 rounded py-5"
          onSubmit={signupHandler}>
          <h1 className="mb-5 text-black font-extrabold">Signup</h1>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={form.email}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, email: e.target.value }));
              // setForm((prev) => {
              //   return { ...prev, username: e.target.value };
              // });
            }}
            className="rounded text-black mt-2"
          />
          <label htmlFor="username" className="mt-5">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, username: e.target.value }));
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
          <label htmlFor="repassword" className="mt-5">
            Repeat Password
          </label>
          <input
            type="text"
            name="repassword"
            id="repassword"
            value={form.rePassword}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, rePassword: e.target.value }));
            }}
            className=" rounded text-black mt-2"
          />
          <button type="submit" className="bg-black mt-5 px-7 py-1 rounded">
            Signup
          </button>
          <Link to={'/login'} className="mt-5">
            Login
          </Link>
        </form>
      </div>
    </GuestLayout>
  );
};

export default Signup;
