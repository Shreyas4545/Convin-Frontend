import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "antd";
function Status() {
  const [users, setUsers] = useState([]);
  const [type,setType] = useState("");
  const check = async (e,val,userid) => {
    let z = userid;
    console.log(e, z , val);
    let pos;
    
    if(val!==1){
    if(e=="Elder")
    {
      pos="Co-Leader";
    }
    else if(e==="Co-Leader")
    {
      pos="Elder";
    }
    await axios
      .put(
        "https://telegram-bot-backend.vercel.app/api/admin/update_user",
        {
          id: userid,
          position: pos,
        }
      )
      .then((res) => {
        console.log(res);
        setOpen(true);
        setType("Success ✅");
        getUsers();
        setModalText("Successfully Updated Position Of User");
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      setModalText("Please Select an alternative value");
      setType("Failure ❌");
      setOpen(true);
    }
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Successfully Updated Postion Of User"
  );
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const getUsers = async () => {
    await axios
      .get(
        "https://telegram-bot-backend.vercel.app/api/admin/get-users"
      )
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <p className="font-semibold text-center text-[2rem]">Users List.</p>
      <p className="text-center text-[2rem]">
        You can change the position status of Users.
      </p>
      <div className="grid grid-cols-3">
        {users &&
          users?.map((item, index) => {
            let x = item?.position === "Elder" ? 1:0;
            let val=x == 1 ? 0 : 1;
            let pos = item?.position
            let userid = item?._id;
            return (
              <div className="h-[6rem] shadow-2xl grid col-span-1 mt-[2rem] font-sans w-[25rem] rounded-lg p-[15px] bg-slate-200">
                <div className="flex grid-cols-2 gap-2">
                  <div className="col-span-1 w-full gap-2 flex">
                    <p>{item?.firstName}</p>
                    <p>{item?.lastName}</p>
                  </div>
                  <div className="col-span-1 w-full">
                    <p className="font-semibold">Position Status</p>
                  </div>
                </div>
                <div className="flex grid-cols-2 gap-8">
                  <div className="w-full col-span-1">
                    <p>{item?.email}</p>
                  </div>
                  <div className="w-full col-span-1 gap-[3.1rem] flex">
                    <p className="">Elder</p>
                    <input
                      type="checkbox"
                      checked={x}
                      className="pl-[8rem]"
                      onChange={() => check(pos,x,userid)}
                    />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-full">
                    <p>{item.phoneNumber}</p>
                  </div>
                  <div className="w-full gap-3 flex">
                    <p className="">Co-Leader</p>
                    <input
                      type="checkbox"
                      checked={x == 1 ? 0 : 1}
                      className=""
                      onChange={() => check(pos,val,userid)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Modal
        title={`${type}`}
        className="mt-[15rem] text-4xl"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {modalText}
      </Modal>
    </div>
  );
}

export default Status;
