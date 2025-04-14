import Game from "./pages/Game";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard.jsx";
import MainLayout from "./Layout/MainLayout";
import NotFound from "./pages/NotFound";
import Roster from "./pages/Roster";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* NOT FOUND  */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
