import {
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  getFirestore,
} from "firebase/firestore";
import app from "./firebase";

export interface User {
  uid: string;
  name: string;
  surname: string;
}

export interface Inventory {
  inventoryNumber: string;
  assetNumber: string;
  seriesNumber: string;
  category: string;
  name: string;
  rentalStart: Timestamp;
  rentalEnd: Timestamp;
  status: string;
  personName: string | null;
  email: string | null;
  room: string;
  building: string;
  note: string | null;
}

export const firestore = getFirestore(app);

export const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export default {
  users: collection(firestore, "users").withConverter(converter<User>()),
  inventory: collection(firestore, "inventory").withConverter(
    converter<Inventory>()
  ),
};
