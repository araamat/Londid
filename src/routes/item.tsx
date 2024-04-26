import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useItem } from "../hooks/useItem";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import { Timestamp, deleteField, doc, updateDoc } from "firebase/firestore";
import db from "../db";

export interface ItemSearch {
  uid: string;
}

export const Route = createFileRoute("/item")({
  component: () => <ItemMobile />,
  validateSearch: (params: Record<string, unknown>): ItemSearch => {
    return {
      uid: (params?.uid as string) ?? "",
    };
  },
});

interface RentInputs {
  email: string;
  rentalEnd: Date;
  note: string;
}

export default function ItemMobile() {
  const navigate = useNavigate();
  const { uid } = Route.useSearch();
  const { data, isLoading } = useItem(uid);
  const { register, handleSubmit, reset, control } = useForm<RentInputs>();
  if (isLoading) return "Loading...";

  const onSubmit: SubmitHandler<RentInputs> = async (data) => {
    await updateDoc(doc(db.inventory, uid), {
      status: "inUse",
      email: data.email,
      rentalEnd: Timestamp.fromDate(data.rentalEnd),
      rentalStart: Timestamp.now(),
      comment: data.note,
    });
    reset();
    navigate({
      to: "/",
    });
  };

  const handleClose = () =>
    navigate({
      to: "/",
    });

  const onReturn = async () => {
    await updateDoc(doc(db.inventory, uid), {
      rentalEnd: deleteField(),
      rentalStart: deleteField(),
      email: deleteField(),
      comment: deleteField(),
      status: "avaliable",
    });
    reset();
    navigate({
      to: "/",
    });
  }

  const item = data?.data();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="font-semibold text-xl truncate">{item?.name}</h1>
      {item?.status != "avaliable" ? (
        <button onClick={onReturn} className="w-full cursor-pointer py-4 rounded-full bg-[#6B4EFF] text-xl font-bold text-white">Tagasta ese</button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="w-full border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold placeholder:text-[#A6A6A6]"
            {...register("email")}
            placeholder="E-mail"
          />

          <Controller
            control={control}
            name="rentalEnd"
            render={({ field }) => (
              <ReactDatePicker
                className="w-full border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
                placeholderText="Rendi lõpp"
                onChange={field.onChange}
                selected={field.value}
              />
            )}
          />

          <input
            {...register("note")}
            className="border-2 border-[#A6A6A6] rounded-lg w-full py-2 px-3 font-semibold"
            placeholder="Märkused"
          />

          <input
            className="w-full cursor-pointer py-4 rounded-full bg-[#6B4EFF] text-xl font-bold text-white"
            value="Rendi"
            type="submit"
          />

          <button
            onClick={handleClose}
            className="text-black font-bold text-xl"
          >
            Tühista
          </button>
        </form>
      )}
    </div>
  );
}
