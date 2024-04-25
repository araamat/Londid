import logo from "../assets/ametikoolLogo.png"
import { auth } from "../firebase"
import { useUser } from "../hooks/useUser"

export default function Header() {
    // const { data, isLoading } = useUser();
    // if(isLoading) return "Loading..."

    return <header className="flex items-center justify-between w-screen px-8">
        <img src={logo} />
        <div className="flex gap-8">
            {/* <span>{data!.name} {data!.surname}</span> */}
        </div>
    </header>
}