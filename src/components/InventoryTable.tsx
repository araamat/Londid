import { QuerySnapshot, deleteDoc, doc } from "firebase/firestore";
import db, { Inventory } from "../db";
import Status, { itemStatusFromText } from "./Status";
import { TrashIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
interface InventoryTableProps {
  documents: QuerySnapshot<Partial<Inventory>, Partial<Inventory>>;
  refetch: () => Promise<void>;
  openModal: (id: string) => void;
}

export default function InventoryTable({
  documents,
  refetch,
  openModal,
}: InventoryTableProps) {
  return (
    <table className="border-spacing-y-3 border-separate">
      <thead>
        <tr>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Inventory Number
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Item Name
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Rental Date
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Status
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Person's name
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Room
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Person's Email
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        {documents.docs.map((document) => {
          const item = document.data();

          const handleDelete = async () => {
            await deleteDoc(doc(db.inventory, document.id));
            await refetch();
          };

          return (
            <>
              <tr className="border-t-2 border-[#E7EAEE]">
                <td className="text-left">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        openModal(document.id);
                      }}
                    >
                      <CheckBadgeIcon className="h-5 w-5" />
                    </button>
                    {item.inventoryNumber}
                  </div>
                </td>
                <td className="text-left">{item.name}</td>
                <td className="text-left">
                  {item.rentalStart && (
                    <>
                      {" "}
                      {item.rentalStart!.toDate().toDateString()} - <br />{" "}
                      {item.rentalEnd!.toDate().toDateString()}
                    </>
                  )}
                </td>
                <td className="text-left">
                  <Status status={itemStatusFromText(item.status!)} />{" "}
                </td>
                <td className="text-left">{item.personName}</td>
                <td className="text-left">{item.room}</td>
                <td className="text-left">{item.email}</td>
                <td className="text-left">
                  <div className="flex items-center gap-2">
                    {item.note}

                    <button onClick={handleDelete}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}
