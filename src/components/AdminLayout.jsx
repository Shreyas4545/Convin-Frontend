import React, { FC } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { notification } from "antd";
import { useState, useEffect } from "react";
import History from "./history";
import axios from "axios";
import Card from "./Card";

const AdminLayout = ({ children }) => {
  let noty = localStorage.getItem("noty");
  useEffect(() => {
    if (!noty) {
      openNotificationWithIcon("success");
    }
    noty = true;
    localStorage.setItem("noty", true);
  }, []);

  const display = [
    {
      id: "activeLocation",
      compo: <Card />,
    },
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Login",
      description: "You are Successfully Logged in",
    });
  };

  let option;
  option = localStorage.getItem("options");
  
  const [selected, setSelected] = useState(localStorage.getItem("options"));
  const [rem, setRem] = useState();

  return (
    <div className="w-[97vw] max-h-[200vh] overflow-x-hidden max-w-[110vw] flex">
      {contextHolder}
      <div className="w-[20%] hidden md:block bg-[#F2C347]">
        <Sidebar selected={selected} setSidebar={setSelected} remove={setRem} />
      </div>
      <div className="md:w-[80%]">
        <Navbar />
        <div className="container mx-auto p-[20px] ">
          {children}
          <div>
            {!rem || !option || option === "abc" ? (
              <>
                <p className="text-[3rem] font-serif">Welcome User.</p>
                <p className="font-sans text-[2rem] pl-[0.4rem]">
                  Please click among the options.
                </p>{" "}
              </>
            ) : option === "company" ? (
              <>
                <p className="text-[3rem] font-serif">Hello User.</p>
                <p className="font-sans text-[2rem] pl-[0.4rem]">
                  You can edit your videos by choosing from the respective
                  Categories.
                </p>{" "}
              </>
            ) :  <div className="pt-[2rem]">
            <History
              Category={option}
            />
          </div>}
            {selected && rem
              ? display &&
                display.map((item, index) => {
                  if (item?.id === selected) {
                    return <>{item?.compo}</>;
                  }
                })
              :null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
