import React from "react";
import Avatar from "../../assets/OIP.jpeg";
import Input from "../../components/index";

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
    {
      name: "Kanishka",
      status: "Available",
      img: Avatar,
    },
    {
      name: "Kanishka",
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
    <div className="flex w-screen">
      <div className="w-[25%] h-screen border">
        <div className="flex items-center justify-center my-6">
          <div className="border border-primary p-[2px] rounded-full">
            <img src={Avatar} width={75} height={75} alt="avatar" />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">Chat App</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10 h-[75%] overflow-y-scroll !mr-0 p-8">
          <div className="mt-4 text-2xl text-primary">Messages</div>
          <div>
            {contact.map(({ name, status, img }) => {
              return (
                <div className="flex py-8 border-b border-b-gray-300">
                  <div className="flex cursor-pointer">
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
      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        <div className="w-[75%] bg-secondary h-[80px] mt-14 rounded-full flex items-center px-14 mb-6">
          <div className="cursor-pointer">
            <img src={Avatar} alt="mainIcon" height={60} width={60} />
          </div>
          <div className="ml-6 mr-auto">
            <h3 className="text-lg">Hansaka</h3>
            <p className="text-sm font-light text-gray-600">Online</p>
          </div>
          <div className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-phone-call"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              
              stroke="#2c3e50"
              fill="none"
              
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              <path d="M15 7a2 2 0 0 1 2 2" />
              <path d="M15 3a6 6 0 0 1 6 6" />
            </svg>   
          </div> 
        </div>    
        <div className="h-[75%]  w-full overflow-y-scroll">
          <div className="p-14">
            <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl clear-right p-4 mb-6">
              Open Source Events and Hackathons: Keep an eye out for open-source
              events
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl p-4 float-right clear-left mb-6 text-white">
              Open Source Events and Hackathons: Keep an eye out for open-source
              events
            </div>
          </div> 
        </div>
        <div className="flex items-center w-full p-14">
          <Input
            placeholder="Type a message ..."
            className="p-4 border-8 rounded-full shadow-md outline-none bg-light focus:ring-0 focus:border-0"
          />
          <div className="p-2 ml-4 rounded-full cursor-pointer bg-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-send"
              width="30"
              height="30"
              viewBox="0 0 24 24"
             
              stroke="#2c3e50"
              fill="none"
              
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </div>
          <div className="p-2 ml-4 rounded-full cursor-pointer bg-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-plus"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              
              stroke="#2c3e50"
              fill="none"
              
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 12l6 0" />
              <path d="M12 9l0 6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[25%] h-screen border"></div>
    </div>
  );
};

export default Dashboard;
