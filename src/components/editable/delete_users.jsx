import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import trash from "../../images/trash.png"
function Delete() {
  const [users, setUsers] = useState([]);
  const [type,setType] = useState("");
  const check = async (userid) => {
    console.log(userid);
    let x = userid;
    await axios
      .delete(
        "https://telegram-bot-backend.vercel.app/api/admin/delete_user",
        {
          data:{
            id: x
          }
        }
      )
      .then((res) => {
        console.log(res);
        setOpen(true);
        setType("Success ✅");
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
    }

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Successfully Deleted User"
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
        You can Delete the User Accounts.
      </p>
      <div className="grid grid-cols-3">
        {users &&
          users?.map((item, index) => {
            let userid = item?._id;
            return (
              <div className="h-[6rem] shadow-2xl grid col-span-1 mt-[2rem] font-sans w-[20rem] rounded-lg p-[15px] bg-slate-200">
                <div className="flex grid-cols-2 gap-2">
                  <div className="col-span-1 w-[20rem] gap-2 flex">
                    <p>{item?.firstName}</p>
                    <p>{item?.lastName}</p>
                  </div>
                  <div className="col-span-1 w-full">
                    <p className="font-semibold mr-[2rem]">Delete User</p>
                  </div>
                </div>
                <div className="flex grid-cols-2">
                  <div className="w-[28rem] col-span-1 flex">
                    <p>{item?.email}</p>
                  </div>
                  <div className="w-full col-span-1 flex">
                    <img alt="" className="cursor-pointer" onClick={() => check(userid)} src={trash} />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-full">
                    <p>{item.phoneNumber}</p>
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

export default Delete;
