<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore missing-declaration -->
<script lang="ts">
  import { page } from "$app/stores";
  import { db, user, userData } from "$lib/firebase";
  import AuthCheck from "$lib/components/AuthCheck.svelte" // Importe o seu userData store aqui
	import { arrayUnion, doc, updateDoc, setDoc, arrayRemove } from "firebase/firestore";
  import SortableList from "$lib/components/SortableList.svelte";
  import UserLink from "$lib/components/UserLink.svelte";
  import { writable } from "svelte/store"

  const icons = [
    "X",
    "Youtube",
    "TikTok",
    "LinkedIn",
    "Github",
    "Custom" 
];

const formDefaults = {
  icon: "custom",
  tittle: "",
  url: "https://"
}

const formData = writable(formDefaults)
let showForm = false;




    // let user = $userData;

    async function addLink(e: SubmitEvent){
      const userRef = doc(db, "users", $user!.uid)
      await updateDoc(userRef, {
        links: arrayUnion({
          ...$formData,
          id: Date.now().toString(),
        }),
      });
      formData.set({
        icon: "",
      })
    }
</script>


<AuthCheck>

  {#if $userData}
    {#if $userData.username == $page.params.username}
   


<div class="grid-col-1 align-center">

    <div class="flex justify-center">

  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={$userData.photoURL} alt="User Image" class="w-48 h-48 rounded-full object-cover mb-4 item-center align-middle">
    </div>

  <!-- Campo de entrada para o username -->
  <div class="mb-4">
    <p class="leading-relaxed">
      @{$userData.bio}
    </p>

  </div>
  <input type="text" class="text-2xl font-bold border border-gray-300 rounded px-2 py-1 mb-4" bind:value={$userData.username}>

  <!-- Campo de texto para mostrar userData.bio -->
  <textarea class="border border-gray-300 rounded px-2 py-1" rows="4" bind:value={$userData.bio}></textarea>

  <!-- Botão para adicionar link -->
  <button class="mt-6 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Add Link</button>
</div>



    
    {:else}
    <p class="text-red-500">You're not authorized.</p>
    {/if}
    {:else}
    <!-- Mostrar mensagem de erro -->
    <p class="text-red-500">Error. Try again later..</p>
   
  {/if}
  

</AuthCheck>
