import React from "react";
import Avatar from "../../assets/OIP.jpeg";

const Dashboard = () => {
  const contact = [
    {
      name: "Hansaka",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Amanda",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Oshitha",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Kanishka",
      status: "Available",
      img: Avatar,
    },
  ];
  return (
    <div className="w-screen flex">
      <div className="w-[25%] h-screen border">
        <div className="flex justify-center items-center my-6">
          <div className="border border-primary p-[2px] rounded-full">
            <img src={Avatar} width={75} height={75} alt="avatar" />
          </div>
          <div className="ml-8"> 
            <h3 className="text-2xl">Chat App</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10">
          <div className="text-2xl mt-4 text-primary">Messages</div>
          <div>
            {contact.map(({ name, status, img }) => {
              return (
                <div className="flex  py-8 border-b border-b-gray-300">
                  <div className="cursor-pointer flex">
                    <div>
                      <img
                        src={img}
                        alt="icon"
                        width={60}
                        height={60}
                        className="border border-primary p-[2px] rounded-full"
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">{name}</h3>
                      <p className="text-sm font-light">{status}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-[50%] h-screen border"></div>
      <div className="w-[25%] h-screen border"></div>
    </div>
  );
};

export default Dashboard;
