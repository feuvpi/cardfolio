/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from '$lib/firebase';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { collection, getDocs, limit, query, where } from "firebase/firestore"
/** @type {import('./$types').PageLoad} */
export const load = (async ({ params }) => {

    const collectionRef = collection(db, "users");

    // -- assemble the query
    const pquery = query(
        collectionRef,
        where("username", "==", params.username),
        limit(1)
    );

    // Fetch the user data using the username to get the UUID
    const userResponse = await fetch(`https://firestore.googleapis.com/v1/projects/auth-app-e21d2/databases/(default)/documents/usernames/${params.username}`);

    if (!userResponse.ok) {
        return { props: { userData: null } };
    }
    const user = await userResponse.json();
    // -- execute the query
    const snapshot = await getDocs(pquery);
    const exists = snapshot.docs[0]?.exists();
    const data = snapshot.docs[0]?.data();

    console.log(data)

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
        projects: data.projects
    };
}) satisfies PageLoad;