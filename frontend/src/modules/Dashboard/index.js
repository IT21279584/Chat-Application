import React, { useEffect, useState } from "react";
import Avatar from "../../assets/OIP.jpeg";
import Input from "../../components/index";

const Dashboard = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user: details")))
  const [conversation, setConversation] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState([])

  useEffect(()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('user:details'))
    const fetchConversation = async()=>{
      const res = await fetch(`http://localhost:8050/conversations/api/conversation/${loggedInUser?.id}`,{
        method:'GET',
        headers:{
          'Content_Type': 'application/json'
        }
      })
      const resData = await res.json()
      setConversation(resData)
    }
    fetchConversation()
  }, [])

  const fetchMessages = async(conversationId)=>{
    const res = await fetch(`http://localhost:8050/messages/api/message/${conversationId}`,{
      method:'GET',
      headers:{
        'Content_Type': 'application/json'
      }
    })
    const resData = await res.json()
    setMessages({messages:resData, receiver: user, conversationId})
  }

  const sendMessage = async(e)=>{
  
    const res = await fetch(`http://localhost:/messages/8050/api/message`,{
      method:'POST',
      headers:{
        'Content_Type': 'application/json'
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.id
      })
    })
    const resData = await res.json()
    setMessage({message:resData, receiver: user})
  }


  

  return (
    <div className="flex w-screen">
      <div className="w-[25%] h-screen border">
        <div className="flex items-center justify-center my-6">
          <div className="border border-primary p-[2px] rounded-full">
            <img src={Avatar} width={75} height={75} alt="avatar" />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">{user.name}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10 h-[75%] overflow-y-scroll !mr-0 p-8">
          <div className="mt-4 text-2xl text-primary">Messages</div>
          <div>
            {conversation.length >0 ?
              
               conversation.map(({ conversationId, user }) => {
              return (
                <div className="flex py-8 border-b border-b-gray-300">
                  <div className="flex cursor-pointer" onClick={()=>
                    fetchMessages(conversationId)
                  }>
                    <div>
                      <img
                        src={Avatar}
                        alt="icon"
                        width={60}
                        height={60}
                        className="border border-primary p-[2px] rounded-full"
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">{user?.name}</h3>
                      <p className="text-sm font-light">{user?.status}</p>
                    </div>
                  </div>
                </div>
              );
            }) : <div className="mt-10 text-lg font-semibold">No conversations</div>
            
            }
           
          </div>
        </div>
      </div>
      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        {
          messages?.receiver?.name &&
        <div className="w-[75%] bg-secondary h-[80px] mt-14 rounded-full flex items-center px-14 mb-6">
          <div className="cursor-pointer">
            <img src={Avatar} alt="mainIcon" height={60} width={60} />
          </div>
          <div className="ml-6 mr-auto">
            <h3 className="text-lg">{messages?.receiver?.name}</h3>
            <p className="text-sm font-light text-gray-600">{messages?.receiver?.email}</p>
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
        }
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
            
            {messages?.messages?.length > 0 ?
            
            messages.messages.map(({messages, user :{id} = {}})=>{
             
              if(id === user?.id){
                return (
                  <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl clear-right p-4 mb-6">
              {messages}
            </div>
                )
              }else{
                return(
                  <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl p-4 float-right clear-left mb-6 text-white">
                 {messages}
                </div>
                )
              }
              
            }) : <div className="mt-24 text-lg font-semibold text-center">No Messages</div>            
            }
            
           
          </div> 
        </div>
        <div className="flex items-center w-full p-14">
          <input
       
            placeholder="Type a message ..."   value={message} onChange={(e)=>sendMessage(e.target.value)}
            // className="p-4 border-8 rounded-full shadow-md outline-none bg-light focus:ring-0 focus:border-0"
            className='bg-gray-50 text-sm border border-gray-300 text-gray-900 t  focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2 h-[35px]'
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
