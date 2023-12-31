import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './quest.css';

function Quest() {
    const [quests, setQuests] = useState([]);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState("1701375677110566"); // username: testUser

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuests = async () => {
          const fq_form = {
            userId: "1701375677110566"
          }
            try {
                const response = await axios.put("http://localhost:80/quests/request", fq_form);
                if (response?.data) {
                    setQuests(response.data.quests);
                } else {
                    setQuests([]);
                }
            } catch (err) {
                console.error("Error fetching quests:", err);
                setError(err);
            }
        };

        fetchQuests();
    }, []);

    const selectQuest = (quest) => async () => {
      const sq_form = {
        userId: "1701375677110566",
        questId: quest.questId
      }
        try {
            console.log(quest)
            const response = await axios.put("http://localhost:80/quests/accept", sq_form);
            if (response?.status === 200) {
                if (quest.locations[0] === "Cave")
                    navigate("/Forest")
                else if (quest.locations[0] === "Forest")
                    navigate("/Forest")
                else if (quest.locations[0] === "Mountain")
                    navigate("/Forest")
                else
                    navigate("/Forest")
            }
        } catch (e) {
            console.error("Error accepting quest", e)
            // setError(e)
        }
        // localStorage.setItem('quest', JSON.stringify(quest));
    };

    if (error) return <div>Error loading quests: {error.message}</div>;

    return (
        <div className="quests-container">
            <h2>Available Quests</h2>
            <div className="quests-list">
                {quests.map((quest, index) => (
                    <div key={index} className="quest" onClick={selectQuest(quest)}>
                        <h3>{quest.name}</h3>
                        <p>{quest.difficulty}</p>
                    </div>
                ))}
            </div>
            {/* Static message under quest boxes */}
            <div className="quest-message">
                {quests.length > 0 ? "Select a quest to continue" : "Cannot accept a request"}
            </div>
        </div>
    );
                
                }
export default Quest;
