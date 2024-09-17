"use client";

import { api_url, pocketbase_url } from "@/app/constants/url_consts";
import React, { useEffect, useState } from "react";

export default function Session() {
  const [devices, setdevices] = useState([]);
  const [sessions, setsession] = useState([]);
  const [openDrop, setopenDrop] = useState(false);
  const [openExtend, setOpenExtend] = useState(false);
  const [openSnacks, setOpenSnacks] = useState(false);
  const [minutes, setminutes] = useState('');
  const [session_id, setsession_id] = useState('');
  const [out_time, setout_time] = useState("");
  const [in_time, setin_time] = useState("")
  const [snacks, setsnacks] = useState('');
  const [sessionJson, setSessionJson] = useState({})

  useEffect(() => {
    fetchDevice();
  }, []);

  async function fetchDevice() {
    const session = await fetch(
      `${pocketbase_url}/api/collections/Gaming_Sessions/records/?perPage=100000000000`
    );
    const data1 = await session.json();
    setsession(data1.items);
    const result = await fetch(
      `${pocketbase_url}/api/collections/Devices/records`
    );
    const data = await result.json();
    setdevices(data.items);
  }

  const pc_gaming_id = "oqhutmwzbqih6a3";
  const playstation_id = "z5vqy5vnmzpour0";


  async function handleSnacksUpdate(device, sessionid) {
    try {

      let url_call;
      if (device[0].Category === pc_gaming_id) {
        url_call = `${api_url}/api/pc_gaming/update`;
      }
      else if (device[0].Category === playstation_id) {
        url_call = `${api_url}/api/playstation/update`;
      }
      console.log('URL', url_call);

      const response = await fetch(url_call, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "session_id": sessionid,
          "customer_name": sessionJson.Customer_Contact,
          "customer_contact": sessionJson.Customer_Name,
          "device_id": sessionJson.Device,
          "date": sessionJson.Date,
          "hours": parseInt(sessionJson.Hours),
          "in_time": sessionJson.In_Time,
          "out_time": sessionJson.Out_Time,
          "no_of_players": parseInt(sessionJson.No_of_Players),
          "snacks": parseInt(snacks),
          "player_type": sessionJson.Player_Type,
          "session_price": parseInt(sessionJson.Session_Price),
          "total_price": parseInt(sessionJson.Total_Price),
        }),
      });
      const data = await response.json();
      console.log("Snacks:- ", data);
      if (response.ok) {
        alert("Snacks Added");
        handleSnacksPopup();
        await fetchDevice()
      }
    } catch (error) {
      throw console.error(error);
    }
  }


  async function handleExtendSession(device, sessionid) {
    try {

      if (device[0].Category === pc_gaming_id) {
        const response = await fetch(`${api_url}/api/pc_gaming/extend`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "session_id": sessionid,
            minutes,
            in_time,
            out_time
          }),
        });
        if (response.ok) {
          await fetchDevice()
        }
      } else if (device[0].Category === playstation_id) {
        const response = await fetch(`${api_url}/api/playstation/extend`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "session_id": sessionid,
            minutes,
            in_time,
            out_time
          }),
        });
        if (response.ok) {
          alert("Session Extended!!!");
          await fetchDevice();
        }
      }
    } catch (error) {
      throw console.error(error);
    }
  }

  async function handleCloseSession(device, session_id) {
    const check = confirm("Close Session?");
    if (check) {
      try {
        if (device[0].Category === pc_gaming_id) {
          const response = await fetch(`${api_url}/api/pc_gaming/close`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id,
            }),
          });
          if (response.ok) {
            alert("Session Closed.");
            await fetchDevice()
          }
        } else if (device[0].Category === playstation_id) {
          const response = await fetch(`${api_url}/api/playstation/close`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              session_id,
            }),
          });
          if (response.ok) {
            await fetchDevice();
          }
        }
      } catch (error) {
        throw console.error(error);
      }
    }

  }

  function handleDrop() {
    setopenDrop(!openDrop);
  }

  function handleExtendPopup() {
    setOpenExtend(!openExtend);
  }


  function handleExtend(id, data) {
    setsession_id(id);
    setout_time(data?.Out_Time);
    setin_time(data?.In_Time);
    setOpenExtend(!openExtend);
  }

  function handleSnacksPopup() {
    setOpenSnacks(!openSnacks);
  }


  function handleSnacks(id, data) {
    setsession_id(id);
    setsnacks(data?.Snacks);
    console.log(data);
    setSessionJson(data);
    setOpenSnacks(!openSnacks);
  }


  return (
    <div className="text-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mx-4">Latest Sessions</h2>
        <a href="/addsession">
          <button className="bg-green-500 addsession-btn active:bg-green-700 font-bold text-lg px-4 py-2 rounded-full">
            Add Session +
          </button>
        </a>
      </div>
      <div className="p-4 w-full lg:overflow-x-scroll lg:w-dvw">
        <div className="w-full hidden lg:block">
          <table className="min-w-[1440px] mx-auto bg-slate-900 text-md my-4 border-none">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="w-[350px] text-center p-2">Date</th>
                <th className="w-[250px] text-center p-2">Device</th>
                <th className="w-[350px] text-center p-2">Customer Name</th>
                <th className="w-[200px] text-center p-2">Hours</th>
                <th className="w-[200px] text-center p-2">In Time</th>
                <th className="w-[200px] text-center p-2">Out Time</th>
                <th className="w-[300px] text-center p-2">No. of Players</th>
                <th className="w-[300px] text-center p-2">Session Price</th>
                <th className="w-[300px] text-center p-2">Total Price</th>
                <th className="w-[200px] text-center p-2">Snacks</th>
                <th className="w-[150px] text-center p-2">Status</th>
                <th className="w-[200px] text-center p-2">Actions</th>
              </tr>
            </thead>
            {sessions
              .filter(
                (ses) => ses.Status === "Extended" || ses.Status === "Open"
              )
              .map((session, index) => (
                <tbody key={index}>
                  <tr className="text-white border-b border-slate-700">
                    <td className="w-[400px] text-center p-2">
                      {session.Date}
                    </td>
                    <td className="w-[200px] text-center p-2">
                      {devices
                        .filter((device) => device.id === session.Device)
                        .map((items) => items.Name)}
                    </td>
                    <td className="w-auto text-center p-2">
                      {session.Customer_Name}
                    </td>
                    <td className="w-[200px] text-center p-2">
                      {session.Hours}
                    </td>
                    <td className="w-[200px] text-center p-2">
                      {session.In_Time}
                    </td>
                    <td className="w-[200px] text-center p-2">
                      {session.Out_Time}
                    </td>
                    <td className="w-[200px] text-center p-2">
                      {session.No_of_Players}
                    </td>
                    <td className="w-[200px] text-center p-2">
                      ₹ {session.Session_Price}
                    </td>
                    <td className="w-[200px] text-center p-2">
                      ₹ {session.Total_Price}
                    </td>
                    <td className="w-[200px] text-center p-2">
                      {session.Snacks}
                    </td>
                    <td className="w-[150px] text-center p-2">
                      <span
                        className={`${session.Status === "Open" ? "bg-green-400 text-white rounded-full font-semibold bg-opacity-50 border-2 border-green-500"
                          : session.Status === "Extended" ? "bg-yellow-400 text-white rounded-full bg-opacity-50 border-2 border-yellow-500 font-semibold" : "bg-gray-700 text-white rounded-full bg-opacity-50 border-2 border-gray-500 font-semibold"
                          } p-1 w-[110px] inline-block`}
                      >
                        {session.Status}
                      </span>
                    </td>
                    <td className="text-2xl flex items-center gap-6 p-2 ml-10">

                      <button
                        onClick={() => {
                          sessionStorage.setItem("session_id", session.id)
                          handleSnacks(session.id, session);
                        }}
                        className=" text-2xl addsession-btn active:bg-slate-900 bg-yellow-700 py-2 px-4 rounded-lg"
                      >
                        <i className="fa-solid fa-utensils"></i>
                      </button>

                      <button
                        onClick={() => {
                          sessionStorage.setItem("session_id", session.id)
                          sessionStorage.setItem("session_device", session.Device)
                          handleExtend(session.id, session);
                        }}
                        className="text-2xl addsession-btn active:bg-slate-900 bg-slate-700 py-2 px-4 rounded-lg"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>

                      <button
                        onClick={() => {
                          const device_id = devices.filter(
                            (device) => device.id === session.Device
                          );
                          handleCloseSession(device_id, session.id);
                        }}
                        className="text-2xl addsession-btn active:bg-slate-900 bg-green-700 py-2 px-4 rounded-lg"
                      >
                        <i className="fa-solid fa-square-check"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
          {
            openSnacks && (
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                  <button
                    onClick={handleSnacksPopup}
                    className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
                  >
                    X
                  </button>
                  <h2 className="text-lg mb-4">Extend Session</h2>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Session", session_id)
                    const deviceid = sessionStorage.getItem('session_device')
                    const device_id = devices.filter(
                      (device) => device.id === deviceid
                    );
                    handleSnacksUpdate(device_id, session_id);
                  }}
                  >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="snacks"
                      >
                        Snacks (Rs.)
                      </label>
                      <input
                        type="text"
                        value={snacks}
                        onChange={
                          (e) => {
                            setsnacks(e.target.value);
                          }
                        }
                        id="snacks"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add Snacks
                    </button>
                  </form>
                </div>
              </div>
            )
          }
          {
            openExtend && (
              <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                  <button
                    onClick={handleExtendPopup}
                    className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
                  >
                    X
                  </button>
                  <h2 className="text-lg mb-4">Extend Session</h2>
                  <form >
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="minutes"
                      >
                        Minutes
                      </label>
                      <select
                        value={minutes}
                        onChange={
                          (e) => {
                            setminutes(e.target.value);
                          }
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      >
                        <option value="">-- Select -- </option>
                        <option value="15">15 Minutes</option>
                        <option value="30">30 Minutes</option>
                        <option value="60">60 Minutes</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="in_time"
                      >
                        In Time
                      </label>
                      <input
                        type="time"
                        value={in_time}
                        onChange={
                          (e) => {
                            setin_time(e.target.value);
                          }
                        }
                        id="in_time"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="out_time"
                      >
                        Out Time
                      </label>
                      <input
                        type="time"
                        value={out_time}
                        onChange={
                          (e) => {
                            setout_time(e.target.value);
                          }
                        }
                        id="out_time"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={() => {
                        console.log("Session", session_id)
                        const deviceid = sessionStorage.getItem('session_device')
                        const device_id = devices.filter(
                          (device) => device.id === deviceid
                        );
                        handleExtendSession(device_id, session_id);
                        alert('Session is Extended');
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Extend
                    </button>
                  </form>
                </div>
              </div>
            )
          }
        </div>
      </div>

      {/* For Smaller Screens */}
      <div className="w-full block lg:hidden mt-6">
        {
          sessions
            .filter(
              (ses) => ses.Status === "Extended" || ses.Status === "Open"
            )
            .map((session, index) => (
              <div key={index} className="bg-gradient-to-r w-full from-gray-800 to-gray-900 text-white p-6 rounded-lg shadow-lg mb-6 relative">
                <div key={index}>
                  <button
                    onClick={() => {
                      const device_id = devices.filter(
                        (device) => device.id === session.Device
                      );
                      handleCloseSession(device_id, session.id);
                    }}
                    className="absolute top-4 right-4 bg-slate-500 active:bg-slate-600 border-2 border-slate-500 text-white font-semibold px-3 py-1 rounded-full shadow-md">Close Session</button>

                  <button
                    onClick={() => {
                      handleExtend(session.id, session);
                    }}
                    className="absolute top-4 right-1/2 bg-slate-500 active:bg-slate-600 border-2 border-slate-500 text-white font-semibold px-3 py-1 rounded-full shadow-md">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  <div className="text-left absolute top-4 left-4 inline-flex items-center gap-4">
                    <p className="text-sm text-gray-400">Status</p>
                    <span
                      className={`${session.Status === "Open" ||
                        session.Status === "Extended"
                        ? "bg-green-400 text-white rounded-full font-semibold bg-opacity-50 border-2 border-green-500"
                        : "bg-yellow-400 text-white rounded-full bg-opacity-50 border-2 border-yellow-500 font-semibold"
                        } p-1 w-auto text-center px-4 inline-block`}
                    >{session.Status}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4 mt-10">
                    <div className="text-left">
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="text-lg font-semibold">{session.Date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Device</p>
                      <p className="text-lg font-semibold">
                        {devices
                          .filter((device) => device.id === session.Device)
                          .map((items) => items.Name)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-left">
                      <p className="text-sm text-gray-400">Customer</p>
                      <p className="text-lg font-semibold">{session.Customer_Name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Out Time</p>
                      <p className="text-lg font-semibold">{session.Out_Time}</p>
                    </div>
                  </div>
                  <button onClick={() => { handleDrop(); }} className={`text-lg w-full bg-transparent my-[-10px] p-2 rounded-full`}>
                    <i className="fa-solid fa-angle-down"></i>
                    <span>more</span>
                  </button>
                  {
                    openDrop && (
                      <>
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-left">
                            <p className="text-sm text-gray-400">No. of Players</p>
                            <p className="text-lg font-semibold">{session.No_of_Players}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Hours</p>
                            <p className="text-lg font-semibold">{session.Hours}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <div className="text-left">
                            <p className="text-sm text-gray-400">Session Price</p>
                            <p className="text-lg font-semibold">₹{session.Session_Price}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">Total Price</p>
                            <p className="text-lg font-semibold">₹{session.Total_Price}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <div className="text-left">
                            <p className="text-sm text-gray-400">Snacks</p>
                            <p className="text-lg font-semibold">{session.Snacks}</p>
                          </div>
                        </div>
                      </>
                    )
                  }
                  {
                    openExtend && (
                      <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                          <button
                            onClick={handleExtendPopup}
                            className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 hover:bg-zinc-300 w-[40px] h-[40px] rounded-full flex justify-center items-center"
                          >
                            X
                          </button>
                          <h2 className="text-lg text-black mb-4">Extend Session</h2>
                          <form >
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="minutes"
                              >
                                Minutes
                              </label>
                              <input
                                type="text"
                                id="minutes"
                                value={minutes}
                                onChange={
                                  (e) => {
                                    setminutes(e.target.value);
                                  }
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="in_time"
                              >
                                In Time
                              </label>
                              <input
                                type="time"
                                value={in_time}
                                onChange={
                                  (e) => {
                                    setin_time(e.target.value);
                                  }
                                }
                                id="in_time"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="out_time"
                              >
                                Out Time
                              </label>
                              <input
                                type="time"
                                value={out_time}
                                onChange={
                                  (e) => {
                                    setout_time(e.target.value);
                                  }
                                }
                                id="out_time"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                              Extend
                            </button>
                          </form>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
