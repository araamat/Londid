import { useQuery } from "@tanstack/react-query";
import db from "../db"
import { getDocs, limit, orderBy, query } from "firebase/firestore"

export const useInventory = () => {
    const inventoryQuery = query(db.inventory, orderBy("name"), limit(25));

    return useQuery({
        queryKey: ['inventory'],
        queryFn: () => getDocs(inventoryQuery)
    })
}