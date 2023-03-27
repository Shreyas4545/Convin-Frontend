import React from "react";
import Bot from "../../images/bot.jpg";
import { notification } from "antd";
import { useState } from "react";
import axios from "axios";
import { Input, Modal } from "antd";
function Time() {
  const [value, setValue] = useState();
  
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, desc) => {
    api[type]({
      message: `${message}`,
      description: `${desc}`,
    });
  };
  
  const handleChange = (e) =>{
        console.log(e.target.value);
        setValue(e.target.value)
  }

  const update = async () => {
    
    if(value === undefined || value.length===0) {
      openNotificationWithIcon(
      "error",
      "Updation Failed",
      "Please select a valid value !"
    )
    return;
      }
    await axios.put("https://telegram-bot-backend.vercel.app/api",{
          time:value
    }).then((res)=>{
      console.log(res);
      setOpen(true);
      value=null;
    }).catch((err)=>{
      console.log(err);
    })
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Successfully Updated Bot's Api Data fetching time interval"
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
        <div className="col-span-1 h-full w-full">
          <p className="text-red-600 text-[2rem] text-center mt-[4rem]">
            Update time interval for which users should recieve continous updates (convert into seconds).
            <br />
            <div className="flex gap-[3rem] justify-center py-[4rem]">
              <Input
                type="Number"
                max="15"
                min="0"
                onChange={(e) => handleChange(e)}
                className="border-black w-[10rem]"
              />
              <button
                onClick={() => update()}
                className="h-[3rem] font-semibold px-[40px] text-[0.875em] bg-[#2E3147] text-white rounded-[4px]"
              >
                Update
              </button>
            </div>
          </p>
        </div>
        <div className="col-span-1 w-full">
          <img alt="" className="mt-[5rem] ml-[2rem] shadow-xl" src={Bot} />
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

export default Time;
