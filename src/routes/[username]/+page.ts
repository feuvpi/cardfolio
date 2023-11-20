/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '$lib/firebase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { collection, getDocs, limit, query, where } from "firebase/firestore"

export const load = (async ({ params }) => {

    const collectionRef = collection(db, "users");

    // -- assemble the query
    const pquery = query(
        collectionRef,
        where("username", "==", params.username),
        limit(1)
    );

    // -- execute the query
    const snapshot = await getDocs(pquery);
    const exists = snapshot.docs[0]?.exists();
    const data = snapshot.docs[0]?.data();

    if(!exists){
        throw error(404, "Profile not found.")
    }

    if(!data.published){
        throw error(403, "This profile is currently private")
    }

    return {
        username: data.username,
        photoURL: data.photoURL,
        bio: data.bio,
        links: data.links ?? [],
    };
}) satisfies PageLoad;