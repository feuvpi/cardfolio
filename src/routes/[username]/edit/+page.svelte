<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore missing-declaration -->
<script lang="ts">
  import { page } from "$app/stores";
  import { db, user, userData } from "$lib/firebase";
  import { arrayUnion, doc, updateDoc, setDoc, arrayRemove, getDoc } from "firebase/firestore";
  import SortableList from "$lib/components/SortableList.svelte";
  import UserLink from "$lib/components/UserLink.svelte";
  import { writable } from "svelte/store";

  $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
	$: isTouched = username.length > 0;
	$: isTaken = isValid && !isAvailable && !loading;
	$: isConfirmed = false;

  let username = $userData?.username ?? "";
  let loading = false;
	let isAvailable = false;
  let debounceTimer: NodeJS.Timeout;
  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	async function checkAvailability() {
		isAvailable = false;
		clearTimeout(debounceTimer);
		loading = true;
		console.log(`checking if ${username} is available...`);

		debounceTimer = setTimeout(async () => {
			// -- reference to firestore documemt
			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());
			isAvailable = !exists;
			loading = false;
		}, 500);
	}

 
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
      // const userRef = doc(db, "users", $user!.uid);
      // await updateDoc(userRef, {
      //   links: arrayRemove(item),
      // });
      //console.log($userData)
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

    function consoleCheck(){
      console.log($userData?.projects);
    }


    async function salvarDadosUsuario() {
  const userRef = doc(db, "users", $user!.uid);

  try {
    // Atualiza os dados do usuário
    await updateDoc(userRef, {
      username: $userData?.username,
      bio: $userData?.bio,
      // Adicione outros campos que você deseja atualizar
    });

    // Atualiza os links/projects do usuário
    const novosLinks = $userData?.projects.map((projeto: any) => ({
      ...projeto,
      // Adicione campos específicos do projeto que precisam ser atualizados, se houver
    }));

    await setDoc(userRef, { projects: novosLinks }, { merge: true });

    console.log("Dados do usuário atualizados com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar os dados do usuário:", error);
  }
}
</script>



    <!-- {#if $userData } -->
    {#if $userData?.username == $page.params.username}
   

<div class="grid-col-1 align-center">

    <div class="flex justify-center">

  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={$userData.photoURL} alt="User Image" class="w-48 h-48 rounded-full object-cover mb-4 item-center align-middle">
    </div>

    <!-- <div class="relative">
      <input type="text" class="bg-slate-700 bg-opacity-50 text-sm font-mono text-center font-bold border-none rounded px-2 py-1 mb-4 w-full pl-8" bind:value={$userData.username}>
      <span class="absolute py-1 mb-4 inset-y-0 left-2 flex items-center text-gray-500 text-sm font-mono font-bold pointer-events-none">
          cardfolio.card/
      </span>
  </div> -->

  <div class="flex items-center text-center bg-slate-700 bg-opacity-50 text-xl font-mono font-bold border-none rounded px-2 py-1 mb-1 w-full">
    <span class="text-gray-500 font-mono text-sm ml-10">cardfolio.card/</span>
    <input type="text" class="w-full bg-transparent focus:outline-none text-sm font-mono" 
    bind:value={username}
    on:input={checkAvailability}
			class:input-error={(!isValid && isTouched) || isTouched}
			class:input-warning={isTaken}
			class:input-success={isAvailable && isValid && !loading}>
</div>
    {#if loading}
			<p class="text-secondary text-sm">Checking availability of @{username}...</p>
		{/if}

		{#if !isValid && isTouched}
			<p class="text-error text-sm">Username must be 3-16 alphanumeric characters.</p>
		{/if}

		{#if isValid && !isAvailable && !loading && !$userData?.username}
			<p class="text-warning text-sm">@{username} is not available.</p>
		{/if}
    {#if isValid && isAvailable && !loading && !isConfirmed}
    <p class="text-success text-sm">@{username} is available.</p>
    {/if}
<button on:click={() => consoleCheck()} class="btn btn-xs btn-error group-hover:visible transition-all">console</button>
<p>teste</p>
  <!-- Campo de entrada para o username -->
  <div class="mb-4">
    <textarea class="border-none bg-slate-700 bg-opacity-50 w-full rounded px-2 py-1 font-mono" rows="4" bind:value={$userData.bio}></textarea>

  </div>


<SortableList list={$userData?.projects} on:sort={sortList} let:item let:index>

<div class="group relative">
  <UserLink {...item} imagesUrls={item.imagesUrls}/>
  <button on:click={() => deleteLink(item)} class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10">Delete</button>
</div>
</SortableList>


{#if isValid && isAvailable && !loading && !isConfirmed}
<div class="place-content-center flex">

  <button type="button" on:click={salvarDadosUsuario} class="mt-4 flex mr-4 items-center place-self-center place-content-center rounded-full bg-indigo-700 w-24 font-mono">
Save
  </button>

</div>
{/if}





</div>
    {:else}
    <p class="text-red-500">You're not authorized.</p>
    {/if}
    
   
  
