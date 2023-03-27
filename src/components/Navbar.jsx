import React from "react";
import AST from "../images/Convin.png";
import { useNavigate } from "react-router-dom";
import {ROUTES} from "../routes/router.config"
const Navbar = () => {
    const navigate = useNavigate();
    const logout = () =>{
          navigate(ROUTES.Login);
          localStorage.removeItem("uid");
          localStorage.removeItem("noty");
          localStorage.removeItem("options");
    }
  return (
    <div className="navbar border-b-[1px] p-[10px]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex grid-cols-2 w-full">
          <div className="flex justify-center text-center pl-[23rem] col-span-1 w-full">
            <img alt="" src={AST} className="h-[3rem]"/>
            <p className="pt-[0.3rem] text-[1.5rem] w-full text-center font-semibold">TASK 1 - CONVIN</p>
          </div>
          <div className="ml-auto w-full col-span-1 grid place-items-end">
            <button onClick={() => logout()} className="py-[12.5px] font-semibold px-[40px] text-[0.875em] bg-[#2E3147] text-white rounded-[4px]">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
