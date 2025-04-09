import Details from "./pages/Details";
import Game from "./pages/Game";
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import NotFound from "./pages/NotFound";
import React from "react";
import Roster from "./pages/Roster";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="roster" element={<Roster />} />
          <Route path="detail" element={<Details />} />
          <Route path="game" element={<Game />} />

          {/* NOT FOUND  */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
