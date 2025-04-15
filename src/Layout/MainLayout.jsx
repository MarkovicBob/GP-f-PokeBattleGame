import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout({ user }) {
  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
}

export default MainLayout;
