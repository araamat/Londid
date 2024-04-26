import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import Header from "../components/Header";
import { useEffect } from "react";
import { auth, isMobile } from "../firebase";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((_) => {
      navigate({
        to: "/",
      });
    });
  }, []);
  
  return (
    <>
      {isMobile() ? null : <Header />}
      <Outlet />
    </>
  );
}
