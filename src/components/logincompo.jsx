import React from "react";
import Input from "./input.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "./loader.jsx";
import { notification } from "antd";
import AST from "../images/Convin.png";
import { useState } from "react";
import { ROUTES } from "../routes/router.config.js";
import axios from "axios";
const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, desc) => {
    api[type]({
      message: `${message}`,
      description: `${desc}`,
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      openNotificationWithIcon(
        "error",
        "Login Failed",
        "Please enter the required details"
      );
      return
    }
    try {
      setLoading(true);
      await axios
        .post(
          "https://convin-backend.vercel.app/api/admin/login",{
            email:email,
            password:password
          }
        )
        .then((res) => {
          console.log(res.data.data._id);
          localStorage.setItem("uid",res.data.data._id);
          navigate(ROUTES.Dashboard)
        })
        .catch((err) => {
          console.log(err);
          openNotificationWithIcon(
            "error",
            "Login Failed",
            "Invalid Credentials"
          );
        });
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Login Failed",
        "There was something error. Please try signing again !"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      console.log(email);
    } else if (name === "password") {
      setPassword(value);
      console.log(password);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-[3rem] items-center p-8">
        <img alt="" className="h-[7rem]" src={AST} />
        <p className="text-[3.7rem]">CONVIN - HIRING TASK 1</p>
      </div>
      <div className="min-h-[70vh] flex items-center">
        {contextHolder}
        {loading && <Loader />}
        <div className="flex flex-col gap-[10px] card w-[45%] shadow-[0px_0px_8px_rgba(0,0,0,0.1)] bg-[#3c3c3c]/[0.1] py-[100px] px-[20px] rounded-[8px] mx-auto">
          <h1 className="text-center text-2xl font-semibold">Login</h1>
          <div className="flex flex-col gap-[10px] w-[50%] mx-auto">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              handleChange={handleChange}
              value={email}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              handleChange={handleChange}
              value={password}
            />
          </div>
          <button
            className="bg-[#F2C347] color-[#333333] w-[50%] mx-auto font-semibold rounded-[4px]  py-[8px] mt-[20px]"
            onClick={() => {
              handleLogin();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
