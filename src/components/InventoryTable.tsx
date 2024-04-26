import {
  ArrowDownIcon,
  ArrowUpIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  QueryDocumentSnapshot,
  Timestamp,
  deleteField,
  doc,
  updateDoc,
} from "firebase/firestore";
import db, { Inventory } from "../db";
import Status, { ItemStatus, itemStatusFromText } from "./Status";
import { useState } from "react";
interface InventoryTableProps {
  documents: QueryDocumentSnapshot<Partial<Inventory>, Partial<Inventory>>[];
  refetch: () => Promise<void>;
  openModal: (id: string) => void;
  openStudentModal: (id: string) => void;
  openItemLogModal: (inventoryNumber: string) => void;
  openDeleteModal: (id: string) => void;
  sortStatusBy: (order: "asc" | "desc" | "skip") => void;
}

export default function InventoryTable({
  documents,
  refetch,
  openModal,
  openStudentModal,
  openItemLogModal,
  openDeleteModal,
  sortStatusBy,
}: InventoryTableProps) {
  const [sort, setSort] = useState("skip");

  async function returnItem(id: string) {
    await updateDoc(doc(db.inventory, id), {
      rentalEnd: deleteField(),
      rentalStart: deleteField(),
      email: deleteField(),
      comment: deleteField(),
      status: "avaliable",
    });

    await refetch();
  }

  function handleSortChange() {
    setSort(sort == "skip" || sort == "asc" ? "desc" : "asc");
    sortStatusBy(sort as "asc" | "desc" | "skip");
  }
  return (
    <table className="border-spacing-y-3 border-separate">
      <thead>
        <tr>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Inventarinumber
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Seadme nimi
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Rentimiskuupäev
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            <div className="flex items-center gap-1">
              Staatus
              <button onClick={handleSortChange}>
                {sort == "desc" || sort == "skip" ? (
                  <ArrowDownIcon className="w-3 h-3" />
                ) : (
                  <ArrowUpIcon className="w-3 h-3" />
                )}
              </button>
            </div>
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Rühm
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            E-mail
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Märkus
          </th>
          <th className="text-left font-semibold text-sm text-[#64748B]">
            Kommentaar
          </th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => {
          const item = document.data();
          const isOverdue = item.rentalEnd
            ? Timestamp.now() > item.rentalEnd &&
              new Date().getDay() != item.rentalEnd.toDate().getDay()
            : false;

          const isRented = item.status == "inUse";

          const handleDelete = async () => {
            openDeleteModal(document.id);
          };

          return (
            <tr key={document.id} className="border-t-2 border-[#E7EAEE]">
              <td className="text-left">
                <div className="flex items-center gap-2">
                  {isRented ? (
                    <button
                      onClick={() => {
                        returnItem(document.id);
                      }}
                    >
                      <ArrowDownIcon className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        openModal(document.id);
                      }}
                    >
                      <ArrowUpIcon className="h-5 w-5" />
                    </button>
                  )}

                  {
                    <button
                      onClick={() => openItemLogModal(item.inventoryNumber!)}
                    >
                      {item.inventoryNumber}
                    </button>
                  }
                </div>
              </td>
              <td className="text-left">{item.name}</td>
              <td className="text-left">
                {item?.rentalStart && (
                  <>
                    {" "}
                    {item.rentalStart!.toDate().toDateString()} - <br />{" "}
                    {item.rentalEnd!.toDate().toDateString()}
                  </>
                )}
              </td>
              <td className="text-left">
                <Status
                  status={
                    isOverdue
                      ? ItemStatus.OverDue
                      : itemStatusFromText(item.status!)
                  }
                />
              </td>
              <td className="text-left">{item.room}</td>
              <td className="text-left">
                {item.email ? (
                  <button onClick={() => openStudentModal(item.email!)}>
                    {item.email}
                  </button>
                ) : (
                  item.email
                )}
              </td>
              <td className="text-left">{item.note}</td>
              <td className="text-left">
                {" "}
                <div className="flex items-center gap-2">
                  {item.comment}

                  <button className="self-start" onClick={handleDelete}>
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
