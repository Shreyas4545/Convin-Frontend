import React from "react";
import Bot from "../../images/bot.jpg";
import { useState } from "react";
import axios from "axios";
import { notification } from "antd";
import { Select, Modal } from "antd";
import "./currency.css";
function Currency() {
  const [currency, setCurrency] = useState({
    currency: "",
  });
  
  const clear = () =>{
    setCurrency({
        currency: ""
    })
    setVal(false)
  }
  const [val,setVal] = useState(false);  

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, desc) => {
    api[type]({
      message: `${message}`,
      description: `${desc}`,
    });
  };

  const info = (name, value) => {
    setVal(true);
    setCurrency((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const update = async () => {
    console.log(currency);
    if(!val)
    {
        openNotificationWithIcon(
            "error",
            "Updation Failed",
            "Please select a option !"
        );
        return;
    }
    await axios
      .put("https://telegram-bot-backend.vercel.app/api", {
        price: currency,
      })
      .then((res) => {
        console.log(res);
        setOpen(true);
        clear();
        setVal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const prices = [
    {
      label: "Rupees",
      value: "Rupees",
    },
    {
      label: "Euros",
      value: "Euros",
    },
    {
      label: "Pounds",
      value: "Pounds",
    },
  ];

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Successfully Updated Currency format of all Iphones"
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

  return (
    <div>
    {contextHolder}
      <p className="font-semibold text-center text-[2rem]">
        Telegram Bot Settings.
      </p>
      <p className="text-center text-[2rem] pt-[1rem]">
        You can update Telegram Bot settings.
      </p>
      <div className="grid-cols-2 flex w-full">
        <div className="col-span-1 w-full">
          <p className="text-red-600 text-[2rem] text-center mt-[4.8rem]">
            Update the currency of Iphone prices (Users will recieve prices in
            selected currency).
          </p>
          <br />
          <div className="flex gap-[3rem] justify-center py-[4rem]">
            <Select
              style={{ width: 200.5 }}
              value = { currency.currency || "Select Currency"}
              defaultValue="Select Currency"
              options={prices}
              onChange={(value) => info("currency", value)}
            />
            <button
              onClick={() => update()}
              className="h-[3rem] font-semibold px-[40px] text-[1.4rem] bg-[#2E3147] text-white rounded-[4px]"
            >
              Update
            </button>
          </div>
        </div>
        <div className="col-span-1 w-full">
          <img alt="" className="mt-[6rem] ml-[2rem] shadow-xl" src={Bot} />
        </div>
      </div>
      <Modal
        title="Success ✅"
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

export default Currency;
