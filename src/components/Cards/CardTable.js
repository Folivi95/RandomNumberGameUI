import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components

//import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardTable({ color }) {
  const [matches, setMatches] = useState([]);

  const requestOptions = {
    method: 'get',
    url: 'api/v1/Matches',
    timeout: 600000,
  }

  const fetchData = async () => {
    await axios(requestOptions)
      .then(
        res => {
          toast.success(`${res.data.message}`);
          setMatches(res.data.data);
        }
      )
      .catch(
        err => {
          toast.error(`${err.response.data.Message}`);
        }
      );
  }

  useEffect(() => {
    ;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playGame = () => {
    const matchId = localStorage.getItem('matchId');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const reqOpt = {
      method: 'get',
      url: `api/v1/Matches/${matchId}/user/${userId}`,
      timeout: 600000,
      headers: {'Authorization': `Bearer ${token}`}
    }

    const callPlay = async () => {
      await axios(reqOpt)
      .then(
        res => {
          toast.success(`${res.data.message}`);
          setTimeout(() => window.location.reload(), 1000);
        }
      )
        .catch(
          err => {
            toast.error(`${err.response.data.Message}. Please login`);
          }
        );
    }

    callPlay();
  }

  return (
    <>
      <ToastContainer />
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                List of Matches
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {window.location.reload()}}
              >
                Refresh Results
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Match Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Play Now
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  User Score
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Current Winner Score
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Current Winners Details
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {matches.map((e, i) => (
                <tr key={i}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-nowrap p-4 text-left flex items-center">
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                      {e.name}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {localStorage.setItem('matchId', e.id); playGame();}}
                    >
                      Play Now
                    </button>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-nowrap p-4 text-left items-center">
                    {e.userScore}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-nowrap p-4 text-left items-center">
                      {e.winnerScore}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-nowrap p-4">
                    {e.user ? e.user?.firstName : "Not "} {e.user ? e.user?.lastName : "Available"}
                  </td>
                </tr>
              ))}


            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
