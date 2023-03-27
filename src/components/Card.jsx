import React from "react";
import axios from "axios";
import { Select, Space } from "antd";
import { notification } from "antd";
import { Modal } from "antd";
import { useState, useEffect } from "react";
const Card = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [bucket, setBucket] = useState("");
  const [type, setType] = useState("");
  const buckets = [
    { label: "Entertainment", value: "Entertainment" },
    { label: "Sports", value: "Sports" },
    { label: "Education", value: "Education" },
    { label: "Politics", value: "Politics" },
    { label: "Finance", value: "Finance" },
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, desc) => {
    api[type]({
      message: `${message}`,
      description: `${desc}`,
    });
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Successfully Created a Card !");
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

  const create = async () => {
    if (!link || !bucket || !name) {
      openNotificationWithIcon(
        "error",
        "Process Failed",
        "Please enter the required details"
      );
      return;
    }
    let id =localStorage.getItem("uid");
    const data= {
          name:name,
          link:link,
          id:id,
          bucket:bucket
    }
    await axios
      .put("https://convin-backend.vercel.app/api/admin/update_user",data)
      .then((res) => {
        console.log(res.data);
        setOpen(true);
        setType("Success ✅");
        setName("");
        setLink("");
        setBucket("");
      })
      .catch((err) => {
        console.log(err);
        openNotificationWithIcon(
            "error",
            "Failed to Cast",
            "Please Try Again"
          );
      });
  };

  return (
    <div>
      {contextHolder}
      <div class="flex justify-center">
        <div class="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
          <a href="#!" data-te-ripple-init data-te-ripple-color="light">
            <img
              class="rounded-t-lg"
              src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
              alt=""
            />
          </a>
          <div class="p-6">
            <div className="inline-block">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800">
                Card Name
              </h5>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[1px] rounded-lg my-[0.5rem] h-[2rem] pl-[0.5rem] border-black"
              />
            </div>
            <div className="py-[1rem]">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800">
                Select the Category of a Video
              </h5>
              <Select
                options={buckets}
                className="mt-[0.5rem]"
                value={bucket || "Categories"}
                onChange={(value) => setBucket(value)}
                defaultValue="Categories"
                style={{
                  width: 196,
                }}
              />
              <div className="py-[1rem]">
                <h5 class="mt-[0.5rem] text-xl font-medium leading-tight text-neutral-800">
                  Add Link to the Video
                </h5>
                <input
                  type="text"
                  value = {link}
                  onChange={(e) => setLink(e.target.value)}
                  className="border-[1px] w-[20rem] mt-[1rem] rounded-lg h-[2rem] pl-[0.5rem] border-black"
                />
              </div>
            </div>
            <button
              onClick={() => create()}
              type="button"
              class="flex ml-[7rem] rounded bg-primary px-6 pt-2.5 pb-2 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Create
            </button>
          </div>
        </div>
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
};

export default Card;
