import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeClosed } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formdata);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-200 to-blue-300 p-4">
      <motion.form
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 p-8 rounded-xl bg-white/40 backdrop-blur-md shadow-xl border border-white/30"
      >
        <h1 className="text-3xl font-bold text-center text-sky-700">
          Welcome Back
        </h1>

        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm"
            value={formdata.email}
            onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition text-sm"
              value={formdata.password}
              onChange={(e) =>
                setFormData({ ...formdata, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-600 hover:text-sky-800 transition"
            >
              {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Login button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={isLoggingIn}
          className="w-full py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition disabled:opacity-60"
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </motion.button>

        {/* Bottom link */}
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-sky-600 hover:underline font-medium">
            Create account
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default LoginPage;
