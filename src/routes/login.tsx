import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../firebase";

export const Route = createFileRoute("/login")({
  component: () => <LogIn />,
});

interface LogInInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LogIn() {
  const navigate = useNavigate({
    from: "/login",
  });

  const { register, handleSubmit } = useForm<LogInInputs>();

  const onSubmit: SubmitHandler<LogInInputs> = async (data) => {
    setPersistence(auth, data.rememberMe ? browserLocalPersistence : browserSessionPersistence).then(() => {
      return signInWithEmailAndPassword(auth, data.email, data.password).then(
        () => {
          navigate({
            to: "/",
          });
        }
      );
    });
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        className="flex flex-col items-center gap-4 p-4 border-2 border-[#9c9c9c] w-64 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Log In</h1>
        <input
          className="border-2 border-[#A6A6A6] p-3 rounded-lg"
          placeholder="Email"
          {...register("email")}
        />
        <input
          className="border-2 border-[#A6A6A6] p-3 rounded-lg"
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <label className="flex gap-2 self-start">
          <input type="checkbox" {...register("rememberMe")} />
          Keep me signed in
        </label>

        <input className="w-full cursor-pointer py-3 rounded-full bg-[#6B4EFF] text-xl font-bold text-white" type="submit" value="Log In" />
      </form>
    </div>
  );
}
