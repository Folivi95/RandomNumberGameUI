import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const data = {
    email,
    password
  }

  useEffect(()=> {
    localStorage.clear();
  }, []);

  const requestOptions = {
    method: 'post',
    data,
    url: 'api/Account/authenticate',
    timeout: 600000,
  }

  const signIn = async () => {
    setLoading(true);
    localStorage.clear();

    await axios(requestOptions)
      .then(
        res => {
          toast.success('Login Successful');
          localStorage.setItem('userId', res.data.data.id);
          localStorage.setItem('token', res.data.data.jwToken);
          localStorage.setItem('refreshToken', res.data.data.refreshToken);
          setLoading(false);
          props.history.push('/admin');
        }
      )
      .catch(
        err => {
          toast.error('Failed to Login.');
          localStorage.clear();
          setLoading(false);
        }
      )
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={e => {setEmail(e.target.value)}}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={e => {setPassword(e.target.value)}}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={signIn}
                    >
                      { loading && <i class="fas fa-spinner fa-pulse"></i> }
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
