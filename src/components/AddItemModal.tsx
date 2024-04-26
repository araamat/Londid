import { SubmitHandler, useForm } from "react-hook-form";
import Modal, { ModalProps } from "./Modal";
import { addDoc } from "firebase/firestore";
import db from "../db";

interface AddItemInputs {
  seriesNumber: string;
  inventoryNumber: string;
  category: string;
  name: string;
  room: string;
  note: string;
}

type AddItemContentProps = {
  refetch: () => Promise<void>,
} & ModalProps

export default function AddItemContent(props: AddItemContentProps) {
  const { register, handleSubmit, reset } = useForm<AddItemInputs>();

  const onSubmit: SubmitHandler<AddItemInputs> = async (data) => {
    props.handleClose()
    reset()
    await addDoc(db.inventory, {
      inventoryNumber: data.inventoryNumber,
      seriesNumber: data.seriesNumber,
      name: data.name,
      status: "avaliable",
      room: data.room,
      category: data.category
    })
    await props.refetch()

  };

  return (
    <Modal {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-center items-center bg-white border border-[#CDCFD0] rounded-lg p-8">
        <h1 className="self-start font-bold text-2xl">Lisa seade</h1>
        <div className="flex items-center gap-4">
          <input
            className="border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
            placeholder="Seerianumber"
            {...register("seriesNumber")}
          />

          <input
            className="border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
            placeholder="Kooli Kood"
            {...register("inventoryNumber")}
          />
        </div>
        <div className="flex items-center gap-4">
          <input
            className="border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
            placeholder="Kategooria/Klass"
            {...register("category")}
          />
          <input
            className="border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
            placeholder="Ruum"
            {...register("room")}
          />

        </div>
        <div className="flex items-center gap-4">
          <input
            className="border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
            placeholder="Märkused/Kommentaarid"
            {...register("note")}
          />

          <input
            className="border-2 border-[#A6A6A6] rounded-lg py-2 px-3 font-semibold text-[#A6A6A6]"
            placeholder="Eseme Nimi"
            {...register("name")}
          />
        </div>
        <input className="w-full cursor-pointer py-4 rounded-full bg-[#6B4EFF] text-xl font-bold text-white" type="submit" value="Lisa ese" />
        <button onClick={() => props.handleClose()} className="text-black font-bold text-xl">Tühista</button>
      </form>
    </Modal>
  );
}
