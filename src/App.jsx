import Game from "./pages/Game";
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import NotFound from "./pages/NotFound";
import PokemonDetail from "./pages/Details";
import Roster from "./pages/Roster";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="roster" element={<Roster />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="game" element={<Game />} />

          {/* NOT FOUND  */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
