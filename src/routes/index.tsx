import {
  Navigate,
  Outlet,
  createFileRoute,
  createLazyFileRoute,
  redirect,
} from "@tanstack/react-router";
import { auth } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db, { User, firestore } from "../db";
import { useInventory } from "../hooks/useInventory";
import TableHeader from "../components/TableHeader";
import InventoryTable from "../components/InventoryTable";
import { ChangeEvent, useState } from "react";
import Modal from "../components/Modal";
import AddItemModal from "../components/AddItemModal";
import RentItemModal from "../components/RentItemModal";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (!auth.currentUser) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Index,
});

function Index() {
  const { data, isLoading, refetch } = useInventory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRentModalOpen, setRentModalOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  const handleClose = () => setModalOpen(!isModalOpen);
  const handleRentClose = () => setRentModalOpen(!isRentModalOpen);

  if (isLoading) return <p>Loading...</p>;

  function onChange(event: ChangeEvent<HTMLInputElement>) {}

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
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#191D23] font-bold text-3xl">Items</h1>
          <h2 className="text-[#64748B]">
            Manage the schools design’s devices and items
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#780404] py-3 px-6 text-sm font-semibold text-white rounded-lg">
            Delete Item
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#047857] py-3 px-6 text-sm font-semibold text-white rounded-lg"
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="flex items-center bg-[#F7F8F9] w-full rounded-sm p-3 justify-between">
        <input
          onChange={onChange}
          className="border py-2.5 px-6 rounded-md border-[#E7EAEE"
          placeholder="Search by Series Number, Status, Name..."
        />
        <button className="text-[#64748B] bg-white py-2 px-3 font-semibold rounded-md">
          Filter
        </button>
      </div>
      <InventoryTable
        openModal={(id) => {
          setItemId(id);
          handleRentClose()
        }}
        refetch={async () => void (await refetch())}
        documents={data!}
      />
    </div>
  );
}
