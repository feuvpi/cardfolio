<script >
    
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
    import { auth, userData } from "$lib/firebase";
    import { goto } from '$app/navigation'
    
    $: {
    if ($userData && $userData.username) {

      goto(`/${$userData.username}/edit`);
    } else if ($userData) {
        goto('/login/username');
    }
}
    
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

  
</script>

<nav class="bg-transparent w-full flex justify-center items-center mx-auto px-2 h-20">
  <button type="button" class="flex mr-4 items-center border rounded-full border-2 text-purple-600 border-purple-600" on:click={signInWithGoogle}>
    <a class="inline-block py-2 px-3 hover:bg-gray-800 rounded-full">
      <div class="flex items-center relative cursor-pointer whitespace-nowrap">Log In</div>
    </a>
  </button>
</nav>

