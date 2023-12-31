import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Cave() {
  const navigate = useNavigate()
  const [form,setForm] = useState({
    userId: "",
    choice: ""
  })
  const [userStatus, setUserStatus] = useState("IN_COMBAT");
  const [userId, setUserId] = useState(localStorage.getItem('userId') ?? null);
  const [battleMessage, setBattleMessage] = useState("You are under Attack")
  const [choices, setChoices] = useState()
  const [location, setLocation] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:80/character/status?username=testUser");
        const jsonStatus = response.data.status;
        const getUserId = response.data.userId
        setChoices(jsonStatus.choices)
        setUserStatus(jsonStatus.userStatus);
        // setUserId(getUserId)
        setLocation(jsonStatus.locationId)
        console.log("location: ", location)
        // console.log("User Status:", jsonStatus);
        console.log("userId: ", userId);
        console.log(choices)
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

const GoForth = async () =>{
  const gf_form = {
    userId: "1701375677110566",
    choice: "4"
  }

  const GFMessage = await axios.put("http://localhost:80/quest/choice", gf_form)
  console.log("GFMessage location attemp: ", GFMessage.data.status.locationId)
  console.log("GFMessage: ", GFMessage)
  navigate("/Mountain")

}


const RunAway = async() =>{
  const form ={
    userId: userId,
    action: "run"
  }
  axios.put("http://localhost:80/quest/action", form)
}
const Attack = async () =>{
  const form = {
    userId: "1701375677110566",
    action: "attack"
  }
  const attackResponse = await axios.put("http://localhost:80/quest/action", form)
  console.log("Attack response: ", attackResponse)
  const status = attackResponse.data.status
//   console.log("Damage done: ", )
  setBattleMessage(attackResponse.data.message)
  if(attackResponse.data.character.status.userStatus === "IN_QUEST"){
    setTimeout(() => {
      setUserStatus("IN_QUEST");
  }, 2000)
}
else{
  setUserStatus(attackResponse.data.character.status.userStatus)
}
  if(userStatus === "IN_QUEST"){

  }
  // console.log("attack resp: ", attackResponse.data.status.userStatus)
}

  console.log("User Status: ", userStatus);

  return (
    <div>
      <h1>Cave</h1>
      {userStatus === "IN_QUEST" &&(
        <div className = "in_quest">
            <h1>All roads lead to your final test, be brave and venture forward!</h1>
            <button className="go_left" onClick={GoForth}>Go Forth</button> 
        </div> 
       )}
       {userStatus === "IN_COMBAT" &&(
        <div className="in_combat">
          <h1>{battleMessage}</h1>
           <button className="run_button" onClick={RunAway}>Run</button>
           <button className="attack_button" onClick={Attack}>Attack</button>
        </div>
       )}
    </div>
  );
}

export default Cave;
