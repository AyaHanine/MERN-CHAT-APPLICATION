import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import { useNavigate } from "react-router-dom";


export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect( ()=> {
    async function f(){
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
        }
        f();
    }, []);

    
  
    
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome ! <span>{userName}</span>
      </h1>
      <h3>Ready to start chatting ?</h3>
      
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  
  img {
    justify-content: center;
    height: 10;
    filter: drop-shadow(16px 16px 20px white) invert(75%);  
  }
  span {
    color: red;
  }
`;
