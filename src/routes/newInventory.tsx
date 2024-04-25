import { Navigate, createFileRoute, redirect } from "@tanstack/react-router";
import { auth } from "../firebase";
import { Inventory } from "../db";
import { SubmitHandler, useForm } from "react-hook-form";

export const Route = createFileRoute("/newInventory")({
  beforeLoad: () => {
    if (!auth.currentUser) {
      console.log("REDIRECT")
      return <Navigate to="/login" />
    }
  },
  component: () => <div>Hello /newInventory!</div>,
});

type NewInventoryInputs = Inventory;

function NewInventory() {
  const { handleSubmit } = useForm<NewInventoryInputs>();
  const onSubmit: SubmitHandler<NewInventoryInputs> = (data) => {
    
  }


  return <div className="flex items-center w-screen h-screen">
    <form className="flex border border-black w-64" onSubmit={handleSubmit(onSubmit)}>
      
    </form>
  </div>
}
