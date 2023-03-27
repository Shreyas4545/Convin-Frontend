import React from "react";
import { notification } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "antd";
import { Select, Space } from "antd";
import video from "../images/video_image.jpeg";
const History = ({ Category }) => {
  const [show, setShow] = useState(false);
  const [bucket, setBucket] = useState("");
  let uid = localStorage.getItem("uid");
  const [data, setData] = useState([]);
  const shreyas = async () => {
    try {
      const res = await axios.get(
        "https://convin-backend.vercel.app/api/admin/get-users"
      );
      const newData = [];
      const newDetails = res.data.data;
      for (var i = 0; i < newDetails.length; i++) {
        for (var j = 0; j < newDetails[i].videos.length; j++) {
          newData.push(newDetails[i].videos[j]);
        }
      }
      for (var i = 0; i < newData.length; i++) {
        newData[i].date = newData[i].date.split("T")[0];
        let x = newData[i].link;
        x = x.split("&")[0];
        let y = x.split("m")[0];
        let a = x.slice(32, x.length);
        let z = "/embed/";
        let m = "m";
        y = y.concat(m);
        y = y.concat(z);
        y = y.concat(a);
        newData[i].link = y;
      }
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };

  const [checked, setChecked] = useState(false);
  const [ids, setIds] = useState([]);
  let unique;
  const change = (e, val) => {
    const newIds = [...ids, val];
    unique = [...new Set(newIds.map((item) => JSON.stringify(item)))].map(
      (item) => JSON.parse(item)
    );
    if (!e.target.checked) {
      unique = unique.filter((item) => item !== val);
    }
    setIds(unique);
  };
  useEffect(() => {
    shreyas();
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, desc) => {
    api[type]({
      message: `${message}`,
      description: `${desc}`,
    });
  };

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Successfully Created a Card !");
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setOpen1(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
    setOpen1(false);
  };

  const buckets = [
    { label: "Entertainment", value: "Entertainment" },
    { label: "Sports", value: "Sports" },
    { label: "Education", value: "Education" },
    { label: "Politics", value: "Politics" },
    { label: "Finance", value: "Finance" },
  ];

  const [video_id, setVideo_id] = useState();
  const update_category = async (vid) => {
    setShow(true);
    setVideo_id(vid);
  };

  const submit = async (vid) => {
    if (!bucket) {
      openNotificationWithIcon(
        "error",
        "Process Failed",
        "Please Select a Category"
      );
      return;
    }
    await axios
      .put("https://convin-backend.vercel.app/api/admin/update_category", {
        uid,
        vid,
        bucket,
      })
      .then((res) => {
        shreyas();
        setBucket("");
        setOpen(true);
        setType2("Success ✅");
        setShow(false);
        setModalText("Successfully Updated Category of Video");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let unique1;
  const delete1 = async (id) => {
    if (id) {
      const newIds = [...ids, id];
      unique1 = [...new Set(newIds.map((item) => JSON.stringify(item)))].map(
        (item) => JSON.parse(item)
      );
      setIds(unique1);
    }
    await axios
      .put("https://convin-backend.vercel.app/api/admin/delete_user", {
        uid,
        ids,
      })
      .then((res) => {
        console.log(res);
        shreyas();
        setOpen(true);
        setType2("Success ✅");
        setIds([]);
        setModalText("Successfully Deleted the Video");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update_time = async (vid) => {
    console.log(vid);
    setVideo_id(vid);
    setOpen1(true);
    setType1("Success ✅");
    await axios
      .put("https://convin-backend.vercel.app/api/admin/update_time", {
        uid,
        vid,
      })
      .then((res) => {
        console.log(res.data);
        try {
          shreyas();
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="grid grid-cols-3">
      {contextHolder}
      {data &&
        data.map((item, index) =>
          item?.bucket === Category ? (
            <div
              key={index}
              className="card mt-[4rem] card-compact w-96 bg-base-100 shadow-2xl border-white"
            >
              <figure>
                <img
                  src={video}
                  onClick={() => update_time(item?._id)}
                  className="h-[20rem] cursor-pointer p-[2rem] w-[23.9em]"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <div className="items-center flex justify-center">
                  <h2 className="card-title text-lg text-red-500">
                    Click to Play the Video
                  </h2>
                </div>
                <div className="text-lg">
                  <p>Name: {item?.name}</p>
                  <p>Bucket: {item?.bucket}</p>
                  <p>
                    Last played on:
                    <span className="text-red-500"> {item?.date}</span> at:
                    <span className="text-red-500"> {item?.time}</span> ISO
                  </p>
                </div>
                <div className="card-actions flex pt-[0.8rem] gap-[1rem]">
                  <button
                    onClick={() => update_category(item?._id)}
                    className="btn btn-primary"
                  >
                    Edit Category
                  </button>
                  <button
                    onClick={() => delete1(item?._id)}
                    className="btn btn-primary ml-[8.5rem]"
                  >
                    Delete
                  </button>
                  {video_id === item?._id ? (
                    <Modal
                      title={`${type1}`}
                      className="mt-[6rem] text-4xl"
                      open={open1}
                      onOk={handleOk}
                      confirmLoading={confirmLoading}
                      onCancel={handleCancel}
                    >
                      <iframe
                        className="w-[29.5rem]  h-[20rem]"
                        src={item?.link}
                      />
                    </Modal>
                  ) : null}
                </div>
                <div className="text-lg w-full flex pt-[1rem]">
                  <p>Delete Multiple</p>{" "}
                  <input
                    className="ml-[1rem] mt-[0.4rem]"
                    onChange={(e) => change(e, item?._id)}
                    type="checkbox"
                  />{" "}
                </div>

                {show && video_id === item?._id ? (
                  <div className="flex gap-[1rem] py-[1.5rem]">
                    <Select
                      options={buckets}
                      className="mt-[0.5rem]"
                      value={bucket || "Categories"}
                      onChange={(value) => setBucket(value)}
                      defaultValue="Categories"
                      style={{
                        width: 216,
                      }}
                    />
                    <button
                      onClick={() => submit(item?._id)}
                      className="btn ml-[2.2rem] btn-primary"
                    >
                      Update
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null
        )}

      <Modal
        title={`${type2}`}
        className="mt-[15rem] text-4xl"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {modalText}
      </Modal>
      {ids.length > 1 ? (
        <div>
          <button
            onClick={() => delete1()}
            className="btn mb-[0.5rem] ml-[2.2rem] btn-primary"
          >
            Delete Multiple
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default History;
