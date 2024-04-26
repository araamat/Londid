import { doc, getDoc } from "firebase/firestore";
import db from "../db";
import { useQuery } from "@tanstack/react-query";

export const useItem = (uid: string) => {
  return useQuery({
    queryKey: ["item", uid],
    queryFn: () => getDoc(doc(db.inventory, uid)),
  });
};
