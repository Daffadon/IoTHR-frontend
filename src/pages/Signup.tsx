import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupFormType } from '../data/dto/form';
import { axiosClient } from '../lib/axios-client';
import GuestLayout from '../components/layout/GuestLayout';
import { BsArrowRight } from 'react-icons/bs';
import { errorNotification, successNotification } from '../components/toast/notification';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<signupFormType>({
    email: '',
    fullname: '',
    password: '',
    confirmPassword: ''
  });
  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (form.password !== form.confirmPassword) {
        setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }));
        errorNotification("Password and Confirm Password not match");
        return;
      }
      const { data } = await axiosClient.post('/auth/register', form);
      if (data.message === 'success') {
        successNotification("Register Success", 1000);
        setTimeout(() => {
          navigate('/login');
        }, 1500)
      }
    } catch (error: any) {
      errorNotification(error.response.data.error)
    }
  };
  return (
    <GuestLayout>
      <div className="flex justify-center flex-col items-center gap-5 min-h-[90vh]">
        <form
          className="flex flex-col justify-center items-center text-white min-h-[60vh] w-[22em] bg-blue-700 rounded-xl py-10 px-16"
          onSubmit={signupHandler}>
          <h1 className="mb-5 font-bold text-xl text-white">Signup</h1>
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
            }}
            className="rounded text-black mt-2 px-2 py-1 focus:outline-none"
          />
          <label htmlFor="username" className="mt-5 text-lg">
            Fullname
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={form.fullname}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, fullname: e.target.value }));
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
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={form.confirmPassword}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, confirmPassword: e.target.value }));
            }}
            className=" rounded text-black mt-2 px-2 py-1 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-black mt-5 px-9 py-1 rounded hover:bg-white hover:text-black duration-300">
            Signup
          </button>
          <Link to={'/login'} className="text-lg flex justify-center items-center mt-5 gap-2">
            <p>Login</p>
            <div className="mt-1">
              <BsArrowRight size={25} />
            </div>
          </Link>
        </form>
      </div>
    </GuestLayout>
  );
};

export default Signup;
