import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Button } from '@chakra-ui/react';
import { Link , useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast()
  
     
    const handleLogin = () => {
        if(email.length === 0){
          alert("Email has left Blank!");
        }
        else if(password.length === 0){
          alert("password has left Blank!");
        }
        else{
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                //console.log(response.data);
                const userData = response.data;
                login(userData);
                navigate("/dash");
                toast({
                  title: 'Login Successfull.',
                  description: "",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    toast({
                      title: 'Login Failed.',
                      description: "",
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    })
                    setEmail('')
                    setPassword('')
                }
            });
        }
    }

  return (
       
    
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forget"><a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot your password?
                </a></Link>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
            <div className="text-center">
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup"><a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                  
                  Sign up
                </a></Link>
              </p>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Login;
