"use client";

import { api_url, pocketbase_url } from "@/app/constants/url_consts";
import React, { useEffect, useState } from "react";

export default function History() {
  const [devices, setdevices] = useState([]);
  const [sessions, setsession] = useState([]);

  useEffect(() => {
    fetchDevice();
  }, []);

  async function fetchDevice() {
    const session = await fetch(
      `${pocketbase_url}/api/collections/Gaming_Sessions/records/?perPage=10000000000`
    );
    const data1 = await session.json();
    setsession(data1.items);
    const result = await fetch(
      `${pocketbase_url}/api/collections/Devices/records`
    );
    const data = await result.json();
    setdevices(data.items);
  }

  return (
    <div className="text-white p-4">
      <div className="flex justify-start items-center">
        <h2 className="text-xl font-bold mx-4"> Sessions History </h2>
      </div>
      <div className="p-4 overflow-x-scroll w-dvw">
        <div className="w-full">
          <table className="min-w-[1440px] mx-auto bg-slate-900 text-lg my-4 border-none">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="w-[350px] text-center p-2">Date</th>
                <th className="w-[250px] text-center p-2">Device</th>
                <th className="w-[350px] text-center p-2">Customer Name</th>
                <th className="w-[200px] text-center p-2">Hours</th>
                <th className="w-[200px] text-center p-2">Out Time</th>
                <th className="w-[250px] text-center p-2">No. of Players</th>
                <th className="w-[200px] text-center p-2">Session Price</th>
                <th className="w-[200px] text-center p-2">Total Price</th>
                <th className="w-[200px] text-center p-2">Snacks</th>
                <th className="w-[150px] text-center p-2">Status</th>
              </tr>
            </thead>
            {sessions
              .filter(
                (ses) => ses.Status === "Closed"
              )
              .map((session, index) => (
                <tbody key={index}>
                  <tr className="text-white border-b border-slate-700">
                    <td className="w-[350px] text-center p-2">
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
                        className={`${session.Status === "Open" ||
                          session.Status === "Extended"
                          ? "bg-green-400 text-white rounded-full font-semibold bg-opacity-50 border-2 border-green-500"
                          : "bg-yellow-400 text-white rounded-full bg-opacity-50 border-2 border-yellow-500 font-semibold"
                          } p-1 w-[110px] inline-block`}
                      >
                        {session.Status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </div>
  );
}
