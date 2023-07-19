import React, { useEffect, useState, useRef } from "react";
import Avatar from "../../assets/OIP.jpeg";
import Input from "../../components/index";
import { io } from 'socket.io-client'

const Dashboard = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
  const [conversation, setConversation] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState([])
  const [users, setUsers] = useState([])
  const [socket, setSocket] = useState(null)
	const messageRef = useRef(null)

	useEffect(() => {
		setSocket(io('http://localhost:8090'))
	}, [])

	useEffect(() => {
		socket?.emit('addUser', user?.id);
		socket?.on('getUsers', users => {
			console.log('activeUsers :>> ', users);
		})
		socket?.on('getMessage', data => {
			setMessages(prev => ({
				...prev,
				messages: [...prev.messages, { user: data.user, message: data.message }]
			}))
		})
	}, [socket])

	useEffect(() => {
		messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages?.messages])
  


  useEffect(()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
    const fetchConversation = async()=>{
      const res = await fetch(`http://localhost:8050/conversations/api/conversations/${loggedInUser?.id}`,{
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

  const fetchMessages = async(conversationId, receiver)=>{
    const res = await fetch(`http://localhost:8050/messages/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,{
      method:'GET',
      headers:{
        'Content_Type': 'application/json'
      }
    })
    const resData = await res.json()
    setMessages({messages:resData, receiver: user, conversationId})
  }

  useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch(`http://localhost:8050/users/api/users/${user?.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const resData = await res.json()
			setUsers(resData)
		}
		fetchUsers()
	}, [])

  const sendMessage = async(e)=>{
  
    setMessage('')
		socket?.emit('sendMessage', {
			senderId: user?.id,
			receiverId: messages?.receiver?.receiverId,
			message,
			conversationId: messages?.conversationId
		});
    
    const res = await fetch('http://localhost:8050/messages/api/message', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId
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
            <h3 className="text-2xl">{user?.name}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10 h-[75%] overflow-y-scroll !mr-0 p-8">
          <div className="mt-4 text-2xl text-primary">Messages</div>
          <div>
            {conversation.length > 0 ?
              
               conversation.map(({ conversationId, user }) => {
              return (
                <div className="flex py-8 border-b border-b-gray-300">
                  <div className="flex cursor-pointer" onClick={()=>
                    fetchMessages(conversationId, user)
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
                      <p className="text-sm font-light">{user?.email}</p>
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
              
              
              fill="none"
              
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              <path d="M15 7a2 2 0 0 1 2 2" />
              <path d="M15 3a6 6 0 0 1 6 6" />
            </svg>   
          </div> 
        </div>    
        }
        
        <div className="h-[75%]  w-full overflow-y-scroll">
          <div className="p-14">
            
            {messages?.messages?.length > 0 ?
            
            messages.messages.map(({message, user :{id} = {}})=>{
             
             
                return (
                  <>
                  <div className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${id === user?.id ? 'bg-primary text-white rounded-tl-xl ml-auto' : 'bg-secondary rounded-tr-xl'} `}>{message}</div>
                  <div ref={messageRef}></div>
                  </>
                )
              
              
            }) : <div className='mt-24 text-lg font-semibold text-center'>No Messages or No Conversation Selected</div>       
            }
            
           
          </div> 
        </div>
        {
					messages?.receiver?.name &&
					<div className='flex items-center w-full p-14'>
						<Input placeholder='Type a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[75%]' inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
						<div className={`ml-4 p-2 cursor-pointer rounded-full  ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<line x1="10" y1="14" x2="21" y2="3" />
								<path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
							</svg>
						</div>
						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<circle cx="12" cy="12" r="9" />
								<line x1="9" y1="12" x2="15" y2="12" />
								<line x1="12" y1="9" x2="12" y2="15" />
							</svg>
						</div>
					</div>
				}
      </div>
      <div className='w-[25%] h-screen bg-light px-8 py-16 overflow-scroll'>
				<div className='text-lg text-primary'>People</div>
				<div>
					{
						users.length > 0 ?
							users.map(({  userId, user }) => {
								return (
									<div className='flex items-center py-8 border-b border-b-gray-300'>
										<div className='flex items-center cursor-pointer' onClick={() => fetchMessages('new', user)}>
											<div><img src={Avatar} className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary" alt="person"/></div>
											<div className='ml-6'>
												<h3 className='text-lg font-semibold'>{user?.name}</h3>
												<p className='text-sm font-light text-gray-600'>{user?.email}</p>
											</div>
										</div>
									</div>
								)
							}) : <div className='mt-24 text-lg font-semibold text-center'>No Conversations</div>
					}
				</div>
			</div>
    </div>
  );
};

export default Dashboard;
