import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupFormType } from '../data/dto/form';
import { axiosClient } from '../lib/axios-client';
import { useUserContext } from '../context/userContext';
import GuestLayout from '../components/layout/GuestLayout';
import { BsArrowLeft } from 'react-icons/bs';

const Signup = () => {
  const navigate = useNavigate();
  const { setTokenToLocal, setUser } = useUserContext();
  const [msg, setMsg] = useState<string[] | null>(null);
  const [form, setForm] = useState<signupFormType>({
    email: '',
    username: '',
    password: '',
    rePassword: ''
  });

  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (form.password !== form.rePassword) {
        setMsg(['Your Password and Repeat Password Not Match']);
        return;
      }
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
          className="flex flex-col justify-center items-center text-white min-h-[60vh] w-[20em] bg-blue-700 rounded-xl py-10 px-16"
          onSubmit={signupHandler}>
          <h1 className="mb-5 font-bold text-xl text-white">Signup</h1>
          {msg &&
            msg.map((msg) => {
              return <p>{msg}</p>;
            })}
          <label htmlFor="email" className="text-lg">
            Email
          </label>
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
            className="rounded text-black mt-2 px-2 py-1 focus:outline-none"
          />
          <label htmlFor="username" className="mt-5 text-lg">
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
            className="rounded text-black mt-2 px-2 py-1 focus:outline-none"
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
            className=" rounded text-black mt-2 px-2 py-1 focus:outline-none"
          />
          <label htmlFor="repassword" className="mt-5 text-lg">
            Repeat Password
          </label>
          <input
            type="password"
            name="repassword"
            id="repassword"
            value={form.rePassword}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, rePassword: e.target.value }));
            }}
            className=" rounded text-black mt-2 px-2 py-1 focus:outline-none"
          />
          <button type="submit" className="bg-black mt-5 px-9 py-1 rounded">
            Signup
          </button>
          <Link to={'/login'} className="text-lg flex justify-center items-center mt-5 gap-2">
            <div className="mt-1">
              <BsArrowLeft size={25} />
            </div>
            <p>Login</p>
          </Link>
        </form>
      </div>
    </GuestLayout>
  );
};

export default Signup;
