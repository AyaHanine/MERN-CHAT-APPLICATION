import React, { useState, useEffect,useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute , host} from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import {io} from "socket.io-client";
import Logout from "../components/Logout";

 
export default function Chat(){
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
   let [currentUser,setCurrentUser] = useState(undefined);
   const[currentChat,setCurrentChat] = useState(undefined);

   const a = JSON.parse( 
    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  ) ;

  useEffect( () =>{
      
    async function f1(){
      
      if(!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)){
        navigate("/login");
      }else{
         
        
      currentUser =
            a.username
        ;
      }
      console.log("local",JSON.parse( 
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ) )
        console.log("CURRENTUSER 1:",currentUser);
          
      } 
    f1(); 
  },[]);
  
useEffect(() => {
  if(currentUser){
    socket.current = io(host); // connection etablie
    socket.current.emit("add-user",a._id);
  }
})
  
  useEffect(() => {

    async function f2(){
      console.log("bool " ,a.isAvatarImageSet);
      if(a){
        if(a.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${a._id}`);
          setContacts(data.data);
          console.log("CONTACT FROM 1 :",contacts);
        }else {        
          navigate("/setAvatar");
        } 
      }  
    }
    console.log("CURRENT USER :",currentUser); 
    console.log("CONTACTS : ",contacts);
    f2();
  },[]);
             
   
  console.log("CURRENT CHAT BEFORE : ",currentChat);
const handleChatChange = (chat) =>{
  console.log("chat ",chat);
    setCurrentChat(chat);
    console.log("CURRENT CHAT AFTER ",currentChat);
 
}  
  return ( 
    <Container>  
      <div className="container">
      <Contacts contacts={contacts} currentUser={a} changeChat = {handleChatChange} />
      {currentChat === undefined ? (
      <Welcome />) : (<ChatContainer currentChat={currentChat} currentUser={a} socket = {socket} />)  }
     
      
      
      </div>
    </Container>
  )
} 
  
 
const Container = styled.div`
height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;   