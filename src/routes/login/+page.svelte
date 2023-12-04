<script lang="ts">
    import { auth, user, userData } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
    import { goto } from '$app/navigation' 

    async function signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        const credential = await signInWithPopup(auth, provider);
        const idToken = await credential.user.getIdToken();
        const res = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
        })
    }

    async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }

  $: {
    if ($userData && $userData.username) {

      goto(`/${$userData.username}/edit`);
    } else if ($userData) {
        goto('/login/username');
    }
}

</script>

<h2>Welcome!</h2>
{#if $user}

    <h2 class="title">Welcome! {$user.displayName}</h2>
    <p class="text-center text-success">You are in.</p>
    <button  class="btn btn-warning" on:click={signOutSSR}>Sign Out</button>
{:else}

<button class="btn btn-primary" on:click={signInWithGoogle}>SignIn with Google</button>

{/if}