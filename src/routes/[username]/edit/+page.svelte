<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore missing-declaration -->
<script lang="ts">
    import { page } from "$app/stores";
    import { db, user, userData } from "$lib/firebase";
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
  title: "",
  url: "https://"
}

const formData = writable(formDefaults)
let showForm = false;

$: urlIsValid = $formData.url.match(/^(ftp|http|https|):\/\/[^ "]+$/);
$: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
$: formIsValid = urlIsValid && titleIsValid;

    function sortList(e: CustomEvent){
      const newList = e.detail;
      const userRef = doc(db, "users", $user!.uid);
      setDoc(userRef, { links: newList }, { merge: true })
    }

    async function addLink(e: SubmitEvent){
      const userRef = doc(db, "users", $user!.uid);

      await updateDoc(userRef, {
        links: arrayUnion({
          ...$formData,
          id: Date.now().toString(),
        }),
      });

      formData.set({
        icon: "",
        title: "",
        url: "",
      });

      showForm = false;
    }

    async function deleteLink(item: any){
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        links: arrayRemove(item),
      });
    }

    async function toggleProfileStatus(item: any){
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        published: !$userData?.published,
      });
    }

    function cancelLink(){
      formData.set(formDefaults)
      showForm = false;
    }
</script>



    <!-- {#if $userData } -->
    {#if $userData?.username == $page.params.username}
<<<<<<< HEAD
   

=======
   <h1 class="mx-2 text-2xl font-mono font-bold mt-8 mb-4 text-center">Edit your page</h1>
>>>>>>> 3bbfc9115f9ea4e73352a6b675f3825a46ced4c7
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
    
    <!-- Mostrar mensagem de erro -->
    <p class="text-red-500">Error. Try again later..</p>
   
  
