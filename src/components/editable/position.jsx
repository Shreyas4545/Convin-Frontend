import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Modal } from "antd";
function Position() {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("");
  const check = async (e, userid, val) => {
    let z = userid;
    console.log(e, z);

    if (val != 1) {
      await axios
        .put(
          "https://telegram-bot-backend.vercel.app/api/admin/update_user",
          {
            id: userid,
            activity_status: !e,
          }
        )
        .then((res) => {
          console.log(res);
          setOpen(true);
          setType("Success ✅");
          setModalText("Successfully Updated Activity Status Of User");
          getUsers();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setModalText("Please Select an alternative value");
      setType("Failure ❌");
      setOpen(true);
    }
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Successfully Updated Activity Status Of User"
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
        // "https://bot-backend-cqgdkokpt-shreyas4545.vercel.app/api/admin/get-users"
        "https://telegram-bot-backend.vercel.app/api/admin/get-users"
      )
      .then((res) => {
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
        You can change the activity status of Users.
      </p>
      <div className="grid grid-cols-3">
        {users &&
          users?.map((item, index) => {
            let x = item?.activity_status;
            let userid = item?._id;
            let name = item?.firstName;
            let val = x == 1 ? 0 : 1;
            return (
              <div className="h-[6rem] shadow-2xl grid col-span-1 mt-[2rem] font-sans w-[25rem] rounded-lg p-[15px] bg-slate-200">
                <div className="flex grid-cols-2 gap-2">
                  <div className="col-span-1 w-full gap-2 flex">
                    <p>{item?.firstName}</p>
                    <p>{item?.lastName}</p>
                  </div>
                  <div className="col-span-1 w-full">
                    <p className="font-semibold">Activity Status</p>
                  </div>
                </div>
                <div className="flex grid-cols-2 gap-8">
                  <div className="w-full col-span-1">
                    <p>{item?.email}</p>
                  </div>
                  <div className="w-full col-span-1 gap-4 flex">
                    <p className="">Active</p>
                    <input
                      type="checkbox"
                      checked={x}
                      className="pl-[8rem]"
                      onChange={() => check(x, userid, x)}
                    />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-full">
                    <p>{item.phoneNumber}</p>
                  </div>
                  <div className="w-full gap-3 flex">
                    <p className="">Inactive</p>
                    <input
                      type="checkbox"
                      checked={x == 1 ? 0 : 1}
                      className=""
                      onChange={() => check(x, userid, val)}
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

export default Position;
