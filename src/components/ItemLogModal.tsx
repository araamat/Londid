import Modal, { ModalProps } from "./Modal";
import { getDocs, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import db from "../db";
import { useEffect } from "react";

type StudentItemsProps = ModalProps & {
  inventoryNumber: string;
};

export default function ItemLogModal({
  inventoryNumber,
  ...props
}: StudentItemsProps) {
  const itemsQuery = query(
    db.itemLog,
    where("inventoryNumber", "==", inventoryNumber)
  );

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["inventoryStudent"],
    queryFn: () => getDocs(itemsQuery),
  });

  useEffect(() => {
    refetch();
  }, [inventoryNumber]);

  if (isLoading) return null;

  return (
    <Modal {...props}>
      <div className="flex flex-col gap-4 justify-center items-center bg-white border border-[#CDCFD0] rounded-lg px-2 py-6">
        <h1 className="font-bold text-2xl">Eseme ajalugu</h1>
        <table className="border-spacing-y-3 border-spacing-x-16 border-separate">
          <thead>
            <th className="text-left font-semibold text-sm text-[#64748B]">
              Meil
            </th>
            <th className="text-left font-semibold text-sm text-[#64748B]">
              Periood
            </th>
            <th className="text-left font-semibold text-sm text-[#64748B]">
              Isiku kommentaar
            </th>
          </thead>
          {data?.docs.map((document) => {
            const item = document.data();

            return (
              <tr>
                <td>{item.email}</td>
                <td>
                  {item?.rentalStart && (
                    <>
                      {item.rentalStart!.toDate().toDateString()} - <br />{" "}
                      {item.rentalEnd!.toDate().toDateString()}{" "}
                    </>
                  )}
                </td>
                <td>{item?.note}</td>
              </tr>
            );
          })}
        </table>
        <button
          onClick={() => props.handleClose()}
          className="text-black font-bold text-xl"
        >
          Sulge
        </button>
      </div>
    </Modal>
  );
}
