import { useQuery } from "@tanstack/react-query";
import { auth } from "../firebase";
import { getDocs, query, where } from "firebase/firestore";
import db from "../db";

export const useUser = () => {
  const user = auth.currentUser!;
  const userQuery = query(db.users, where("uid", "==", user.uid));

  return useQuery({
    queryKey: ["user", user.uid],
    queryFn: () =>
      getDocs(userQuery).then((snapshot) => snapshot.docs[0].data()!),
  });
};
