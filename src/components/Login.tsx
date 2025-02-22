import React, { useState } from 'react';

interface LoginProps {
  onLogin: (licenseKey: string) => void;
  darkMode: boolean;
}

function Login({ onLogin, darkMode }: LoginProps) {
  const [licenseKey, setLicenseKey] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className={`max-w-md w-full space-y-8 ${darkMode ? 'dark:bg-gray-800' : 'bg-white'} p-10 rounded-xl shadow-lg`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to LearnAI
          </h2>
          <p className={`mt-2 text-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Enter your license key to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          onLogin(licenseKey);
        }}>
          <div>
            <label htmlFor="license-key" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              License Key
            </label>
            <input
              id="license-key"
              type="text"
              required
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your license key"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;