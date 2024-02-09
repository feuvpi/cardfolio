import type { PageServerLoad } from './profile/$types';
import { collection, getDocs, limit, query, where } from "firebase/firestore"






export const load = (async () => {

    const pquery = query(
        collectionRef,
        where("username", "==", params.username),
        limit(1)
    );

    const snapshot = await getDocs(pquery);


    return {};
}) satisfies PageServerLoad;