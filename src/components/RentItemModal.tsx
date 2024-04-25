import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Modal, { ModalProps } from "./Modal";
import { Timestamp, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../db";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddItemInputs {
  studentEmail: string;
  rentalDate: Date;
  comment: string;
}

type RentItemModal = {
  refetch: () => Promise<void>;
  itemId: string;
} & ModalProps;

export default function RentItemModal(props: RentItemModal) {
  const { register, control, handleSubmit, reset } = useForm<AddItemInputs>();

  const onSubmit: SubmitHandler<AddItemInputs> = async (data) => {
    console.log(props.itemId);
    await updateDoc(doc(db.inventory, props.itemId), {
        status: "inUse",
        email: data.studentEmail,
        rentalEnd: Timestamp.fromDate(data.rentalDate),
        rentalStart: Timestamp.now(),
        note: data.comment
    })

    props.handleClose()
    reset()

    await props.refetch();
  };

  return (
    <Modal {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center items-center bg-white border border-[#CDCFD0] rounded-lg p-8"
      >
        <h1 className="self-start font-bold text-2xl">Rent Item</h1>
        <div className="flex items-center gap-4">
          <input
            className="border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
            placeholder="Student Email"
            {...register("studentEmail")}
          />

          <Controller
            control={control}
            name="rentalDate"
            render={({ field }) => (
              <ReactDatePicker
                className="border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
                placeholderText="End of rental"
                onChange={field.onChange}
                selected={field.value}
              />
            )}
          />
        </div>

        <input className="border-2 border-[#A6A6A6] rounded-lg w-full py-2 px-3 font-semibold" placeholder="Note" />

        <input
          {...register("comment")}
          className="w-full cursor-pointer py-4 rounded-full bg-[#6B4EFF] text-xl font-bold text-white"
          type="submit"
          value="Rent"
        />
        <button
          onClick={() => props.handleClose()}
          className="text-black font-bold text-xl"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}
