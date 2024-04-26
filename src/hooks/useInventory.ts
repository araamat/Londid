import { useQuery } from "@tanstack/react-query";
import db from "../db"
import { getDocs, orderBy, query } from "firebase/firestore"

export const useInventory = () => {
    const inventoryQuery = query(db.inventory, orderBy("name"));

    return useQuery({
        queryKey: ['inventory'],
        queryFn: async () => {
            const docs = await getDocs(inventoryQuery)

            return docs
        }
    })
}