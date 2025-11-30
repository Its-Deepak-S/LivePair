import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const API_BASE_URL = "http://localhost:8000/v1";

function HomePage() {
  const [joinId, setJoinId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(`${API_BASE_URL}/rooms`);
      const roomId = res.data.roomId;
      navigate(`/room/${roomId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create room. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = () => {
    if (!joinId.trim()) {
      setError("Please enter a room ID.");
      return;
    }
    setError(null);
    navigate(`/room/${joinId.trim()}`);
  };

  return (
    <div className="lp-root">
      <div className="lp-card">
        <div className="lp-header">
          <div className="lp-logo-circle">LP</div>
          <div>
            <h1 className="lp-title">LivePair</h1>
            <p className="lp-subtitle">
              Real-time pair programming in your browser.
            </p>
          </div>
        </div>

        <div className="lp-section">
          <h2 className="lp-section-title">Start a new session</h2>
          <p className="lp-section-text">
            Create a fresh room and share the ID with your pair.
          </p>
          <button
            className="lp-button lp-button-primary"
            onClick={handleCreateRoom}
            disabled={loading}
          >
            {loading ? "Creating room..." : "Create Room"}
          </button>
        </div>

        <div className="lp-divider">
          <span>or</span>
        </div>

        <div className="lp-section">
          <h2 className="lp-section-title">Join an existing room</h2>
          <p className="lp-section-text">
            Paste a room ID you received from someone else.
          </p>
          <div className="lp-join-row">
            <input
              className="lp-input"
              placeholder="Enter room ID"
              value={joinId}
              onChange={(e) => setJoinId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleJoinRoom();
              }}
            />
            <button
              className="lp-button lp-button-secondary"
              onClick={handleJoinRoom}
            >
              Join
            </button>
          </div>
        </div>

        {error && <div className="lp-error">{error}</div>}

        <p className="lp-footer">
          Open the same room in two tabs to see real-time collaboration.
        </p>
      </div>
    </div>
  );
}

export default HomePage;