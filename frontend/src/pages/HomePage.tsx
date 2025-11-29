
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/v1"; 

function HomePage() {
  const [joinId, setJoinId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const res = await axios.post(`${API_BASE_URL}/rooms`);
    const roomId = res.data.roomId;
    navigate(`/room/${roomId}`);
  };

  const handleJoinRoom = () => {
    if (joinId.trim()) {
      navigate(`/room/${joinId.trim()}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Pair Programming</h1>

      <button onClick={handleCreateRoom}>Create Room</button>

      <div style={{ marginTop: "1rem" }}>
        <input
          placeholder="Enter Room ID"
          value={joinId}
          onChange={(e) => setJoinId(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default HomePage;
