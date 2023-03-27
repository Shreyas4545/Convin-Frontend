import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
const SidebarOptions = [
  {
    id: "activeLocation",
    name: "Create a Card",
  },
  {
    id: "company",
    name: "View Your History",
  },
];

const history = [];
let unique;
const Sidebar = ({ setSidebar, remove }) => {
  const data = [];
  const [details, setDetails] = useState([]);
  const handleClick = async() =>{
    // e.preventDefault();
    await axios
      .get("https://convin-backend.vercel.app/api/admin/get-users")
      .then((res) => {
        setDetails(res.data.data);
        let newDetails = res.data.data;
        for (var i = 0; i < newDetails.length; i++) {
          for (var j = 0; j < newDetails[i].videos.length; j++) {
            history.push({
              id: newDetails[i].videos[j].bucket,
              bucket: newDetails[i].videos[j].bucket,
            });
            data.push(newDetails[i].videos[j]);
          }
        }
        for (var i = 0; i < data.length; i++) {
          data[i].date = data[i].date.split("T")[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
      unique = [
      ...new Set(history.map((item) => JSON.stringify(item))),
    ].map((item) => JSON.parse(item));
  };

  useEffect(() => {
    handleClick();
  }, [data]);

  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("abc");

  return (
    <div className="p-[20px] min-h-[100vh]">
      <ul className="mt-[60px]">
        {SidebarOptions &&
          SidebarOptions.map((item, index) => {
            return (
              <>
                <li
                  className={
                    "p-[15px] flex gap-[20px] rounded-[4px] items-center cursor-pointer my-[20px] font-[600]" +
                    (selected === item?.id
                      ? " bg-[#E9EAEC]"
                      : " text-[#00000080]")
                  }
                  onClick={(e) => {
                    handleClick(e);
                    setSelected(String(item?.id));
                    remove(false);
                    setSidebar(item?.id);
                    setSelected2("abc");
                    remove(true);
                    localStorage.setItem("options", item?.id);
                  }}
                >
                  <img src={item.icon} alt="" />
                  <p className="m-0">{item.name}</p>
                </li>
              </>
            );
          })}
        <div className="mt-[30px]">
          {selected == "activeLocation"
            ? localStorage.setItem("Card", true)
            : selected === "company"
            ? unique?.map((item1, index1) => {
                return (
                  <li
                    className={
                      "p-[15px] flex gap-[20px] rounded-[4px] items-center cursor-pointer my-[20px] font-[600]" +
                      (selected2 === item1?.id
                        ? " bg-[#E9EAEC]"
                        : " text-[#00000080]")
                    }
                    onClick={(e) => {
                      handleClick(e);
                      setSelected2(String(item1?.id));
                      setSidebar(item1?.id);
                      remove(true);
                      localStorage.setItem("options", item1?.id);
                    }}
                  >
                    <p className="pl-[1rem]">{item1.bucket}</p>
                  </li> 
                );
              })
            : null}
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
