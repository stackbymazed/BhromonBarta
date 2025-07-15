import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import animationData from '../../../Animation.json';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import GoogleLogIn from '../../Utilis/GoogleLogIn/GoogleLogIn';
import { toast } from 'react-toastify';

const SignIn = () => {
  const { userSignin, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    userSignin(data.email, data.password)
      .then(() => {
        toast.success('User logged in');
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleReset = () => {
    if (!resetEmail) {
      toast.error('Please enter your email!');
      return;
    }
    resetPassword(resetEmail)
      .then(() => {
        toast.success('Check your email for reset instructions.');
        setIsModalOpen(false);
        setResetEmail('');
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* SignIn Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 space-y-4"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Login to Your Account
          </h2>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
              })}
              className="input input-bordered w-full"
              placeholder="Your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
              })}
              className="input input-bordered w-full"
              placeholder="Your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <input type="submit" value="Sign In" className="btn btn-primary w-full" />

          <p className="text-center text-sm">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <GoogleLogIn />
        </form>
      </div>

      {/* Animation */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
        <Lottie animationData={animationData} loop className="w-full max-w-md" />
      </div>

      {/* Modal for Forgot Password */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-white/10 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="input input-bordered w-full mb-4"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-sm btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="btn btn-sm btn-primary"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
