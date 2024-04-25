import {
  createFileRoute,
  createLazyFileRoute,
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
}

function LogIn() {
  const navigate = useNavigate({
    from: "/login",
  });

  const { register, handleSubmit } = useForm<LogInInputs>();

  const onSubmit: SubmitHandler<LogInInputs> = async (data) => {
    setPersistence(auth, browserLocalPersistence).then(() => {
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
        className="flex flex-col items-center p-4 gap-4 border border-black w-64"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Log In</h1>
        <input
          className="border-2 border-black p-3"
          placeholder="Email"
          {...register("email")}
        />
        <input
          className="border-2 border-black p-3"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <input className="border-2 border-black py-3 px-6" type="submit" />
      </form>
    </div>
  );
}
