import Modal, { ModalProps } from "./Modal";
import { getDocs, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import db from "../db";

type StudentItemsProps = ModalProps & {
  email: string;
};

export default function StudentItems({ email, ...props }: StudentItemsProps) {
  const itemsQuery = query(db.inventory, where("email", "==", email));
  const { data, isLoading } = useQuery({
    queryKey: ["inventoryStudent"],
    queryFn: () => getDocs(itemsQuery),
  });

  if (isLoading) return null;

  return (
    <Modal {...props}>
      <div className="flex flex-col gap-4 justify-center items-center bg-white border border-[#CDCFD0] rounded-lg px-2 py-6">
        <h1 className="font-bold text-2xl">Õpilase renditud esemed</h1>
        <table className="border-spacing-y-3 border-spacing-x-16 border-separate">
          <thead>
            <th className="text-left font-semibold text-sm text-[#64748B]">
              Eseme nimi
            </th>
            <th className="text-left font-semibold text-sm text-[#64748B]">
              Periood
            </th>
          </thead>
          {data?.docs.map((document) => {
            const item = document.data();

            return (
              <tr>
                <td>{item.name}</td>
                <td>
                  {item?.rentalStart && (
                    <>
                      {item.rentalStart!.toDate().toDateString()} - <br />{" "}
                      {item.rentalEnd!.toDate().toDateString()}{" "}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </table>
        <button
          onClick={() => props.handleClose()}
          className="w-full cursor-pointer py-4 rounded-full bg-[#6B4EFF] text-xl font-bold text-white"
        >
          Sulge
        </button>
      </div>
    </Modal>
  );
}
