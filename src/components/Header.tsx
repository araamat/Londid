import logo from "../assets/ametikoolLogo.jpg";
import { auth } from "../firebase";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "@tanstack/react-router";

export default function Header() {
  const navigate = useNavigate();
  const { data, isLoading } = useUser();
  if (isLoading) return "Loading...";

  async function onSignOut() {
    await auth.signOut();
    navigate({
      to: "/login",
    });
  }

  return (
    <header className="flex items-center justify-between w-screen px-8">
      <img className="w-24" src={logo} />
      <div className="flex items-center gap-4">
        {!data ? (
          <button
            onClick={onSignOut}
            className="text-white rounded-lg bg-[#908B8B] px-2 py-2"
          >
            Logi sisse
          </button>
        ) : (
          <>
            <span>
              {data!.name} {data!.surname}
            </span>
            <button
              onClick={onSignOut}
              className="text-white rounded-lg bg-[#908B8B] px-2 py-2"
            >
              Logi välja
            </button>
          </>
        )}
      </div>
    </header>
  );
}
