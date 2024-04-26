import { createFileRoute, redirect } from "@tanstack/react-router";
import { auth, isMobile } from "../firebase";
import { useInventory } from "../hooks/useInventory";
import InventoryTable from "../components/InventoryTable";
import React, { useMemo, useState } from "react";
import AddItemModal from "../components/AddItemModal";
import RentItemModal from "../components/RentItemModal";
import StudentItems from "../components/StudentItemsModal";
import ItemLogModal from "../components/ItemLogModal";
import { itemStatusFromText } from "../components/Status";
import IndexMobile from "../components/IndexMobile";
import DeleteModal from "../components/DeleteModal";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (!auth.currentUser) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: isMobile() ? IndexMobile : Index,
});

function Index() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRentModalOpen, setRentModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isStudentModalOpen, setStudentModalOpen] = useState(false);
  const [itemLogNumber, setItemLogNumber] = useState("");
  const [isItemLogModalOpen, setItemLogModalOpen] = useState(false);
  const [isItemDeleteModalOpen, setItemDeleteModalOpen] = useState(false);
  const [itemDeleteId, setItemDeleteId] = useState("");

  const [itemId, setItemId] = useState("");
  const { data, isLoading, refetch } = useInventory();

  const handleClose = () => setModalOpen(!isModalOpen);
  const handleRentClose = () => setRentModalOpen(!isRentModalOpen);
  const handleStudentClose = () => setStudentModalOpen(!isStudentModalOpen);
  const handleDeleteClose = () =>
    setItemDeleteModalOpen(!isItemDeleteModalOpen);

  const handleItemLogModalClose = () =>
    setItemLogModalOpen(!isItemLogModalOpen);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("skip");

  const searchDocs = useMemo(() => {
    const filtred = search
      ? data?.docs.filter((document) => {
          return document
            .data()
            .name?.toLowerCase()
            .includes(search.toLowerCase());
        })
      : data?.docs;

    return sort == "skip"
      ? filtred
      : filtred?.sort((a, b) =>
          sort == "desc"
            ? itemStatusFromText(a.data().status!) -
              itemStatusFromText(b.data().status!)
            : itemStatusFromText(b.data().status!) -
              itemStatusFromText(a.data().status!)
        );
  }, [data, search, sort]);

  function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.currentTarget.value);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col p-16 gap-8">
      <AddItemModal
        refetch={async () => void (await refetch())}
        handleClose={handleClose}
        isOpen={isModalOpen}
      />
      <RentItemModal
        itemId={itemId}
        refetch={async () => void (await refetch())}
        handleClose={handleRentClose}
        isOpen={isRentModalOpen}
      />
      {email && (
        <StudentItems
          email={email!}
          handleClose={handleStudentClose}
          isOpen={isStudentModalOpen}
        />
      )}
      {itemLogNumber && (
        <ItemLogModal
          inventoryNumber={itemLogNumber}
          handleClose={handleItemLogModalClose}
          isOpen={isItemLogModalOpen}
        />
      )}

      {itemDeleteId && (
        <DeleteModal
          refetch={async () => void (await refetch())}
          handleClose={handleDeleteClose}
          isOpen={isItemDeleteModalOpen}
          id={itemDeleteId}
        />
      )}

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#191D23] font-bold text-3xl">Esemed</h1>
          <h2 className="text-[#64748B]">
            Halda ja laenuta kooli disainimajaka esemeid ja seadmeid
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#047857] py-3 px-6 text-sm font-semibold text-white rounded-lg"
          >
            Lisa seade
          </button>
        </div>
      </div>
      <div className="flex items-center bg-[#F7F8F9] w-full rounded-sm p-3 justify-between">
        <input
          className="border py-2.5 px-6 rounded-md border-[#E7EAEE"
          onChange={onSearchChange}
          placeholder="Otsi nime järgi"
        />
      </div>
      <InventoryTable
        sortStatusBy={(order) => {
          setSort(order);
        }}
        openStudentModal={(studentEmail) => {
          setEmail(studentEmail);
          handleStudentClose();
        }}
        openModal={(id) => {
          setItemId(id);
          handleRentClose();
        }}
        openItemLogModal={(number) => {
          setItemLogNumber(number);
          handleItemLogModalClose();
        }}
        openDeleteModal={(id) => {
          setItemDeleteId(id);
          handleDeleteClose();
        }}
        refetch={async () => void (await refetch())}
        documents={searchDocs!}
      />
    </div>
  );
}
