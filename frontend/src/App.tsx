import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";

function App(){
  return(
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}/>
      <Route path="/room/:roomId" element={<RoomPage/>}></Route>
    </Routes>
  )
}

export default App;