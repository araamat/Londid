import { deleteDoc, doc } from "firebase/firestore";
import Modal, { ModalProps } from "./Modal";
import db from "../db";

type DeleteModalProps = ModalProps & {
  id: string;
  refetch: () => Promise<void>;
};

export default function DeleteModal({ id, refetch, ...props }: DeleteModalProps) {
  const handleDelete = async () => {
    await deleteDoc(doc(db.inventory, id));
    await refetch();
    props.handleClose();
  };

  return (
    <Modal {...props}>
      <div className="flex flex-col gap-4 justify-center items-center bg-white border border-[#CDCFD0] rounded-lg px-8 py-12">
        <h1 className="font-bold text-2xl">Are you sure?</h1>

        <button
          onClick={handleDelete}
          className="w-full cursor-pointer py-4 rounded-full bg-[#6B4EFF] text-xl font-bold text-white"
        >
          Delete
        </button>
        <button
          onClick={() => props.handleClose()}
          className="text-black font-bold text-xl"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
