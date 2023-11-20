<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import AuthCheck from "$lib/components/AuthCheck.svelte"
    import { db, user, userData } from "$lib/firebase";
    import { collection, deleteDoc, doc, getDoc, getDocs, query, where, writeBatch } from "firebase/firestore"
    import type { Unsubscribe } from 'firebase/firestore'; 

    let username = "";
    let userDataUnsubscribe: (() => void) | undefined;
    let loading = false;
    let isAvailable = false;
    let debounceTimer: NodeJS.Timeout;

    // -- validation 
    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading;
    $: isConfirmed = false;



    async function checkAvailability() {
        isAvailable = false;
        clearTimeout(debounceTimer);
        loading = true;
        console.log(`checking if ${username} is available...`);

        debounceTimer = setTimeout(async () => {
            // -- reference to firestore documemt
            const ref = doc(db, "usernames", username);
            const exists = await getDoc(ref).then((doc) => doc.exists());
            isAvailable = !exists;
            loading = false;   
        }, 500)
            
    }

    async function confirmUsername() {
    console.log("confirming username", username);

    // Verifica se já existe um nome de usuário associado a este UID
    const usernameDoc = doc(db, "usernames", username);
    const usernameSnapshot = await getDoc(usernameDoc);
    const batch = writeBatch(db);

    
    if (usernameSnapshot.exists()) {
        console.log("entrei aqui")
        const existingUID = usernameSnapshot.data().uuid;
        // Se já existe um nome de usuário, e não é o mesmo UID, evite criar um novo
        if (existingUID !== $user?.uid) {
            console.log("Este nome de usuário já está em uso por outro usuário.");
            return; // Evita criar um novo nome de usuário
        }
    }

    // -- verificar se ja possui username
    const querySnapshot = await getDocs(query(collection(db, 'usernames'), where('uuid', '==', $user!.uid)));
    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });

    // Salva ou atualiza o nome de usuário no Firestore
    batch.set(doc(db, "usernames", username), { uuid: $user?.uid });
    batch.set(doc(db, "users", $user!.uid), {
        username,
        photoURL: $user?.photoURL ?? null,
        published: true,
        bio: 'Hello world',
        links: [{
            title: 'Test link 1',
            url: '#',
            icon: 'custom'
        }]
    });

    await batch.commit();
    isConfirmed = true;
    
    if(isConfirmed){
        window.location.href = "/register/photo"
      } else {
        console.log("There was a problem confirming your address locator!")
      }

}

onMount(() => {
        userDataUnsubscribe = userData.subscribe((data) => {
            if (data && data.username !== null) {
                username = data.username;
            } else {
                username = "";
            }
        });
    });

// -- cancelar a inscrição quando a pagina for destruida
onDestroy(() => {
        if (userDataUnsubscribe) {
            userDataUnsubscribe();
        }
    });
    
</script>

<AuthCheck>
    <h2 class="text-left mb-2">Choose an username:</h2>
    <form class="mb-4" on:submit|preventDefault={confirmUsername}>
    <input
    type="text"
    placeholder="/address"
    class="input w-full"
    bind:value={username}
    on:input={checkAvailability}
    class:input-error={(!isValid && isTouched) || isTouched}
    class:input-warning={isTaken}
    class:input-success={isAvailable && isValid && !loading}
    />
    </form>

    <div class="my-4">
        {#if loading}
            <p class="text-secondary text-sm">Checking availability of @{username}...</p>
        {/if}

        {#if !isValid && isTouched}
            <p class="text-error text-sm">Username must be 3-16 alphanumeric characters.</p>
        {/if}

        {#if isValid && !isAvailable && !loading && !$userData?.username}
            <p class="text-warning text-sm">@{username} is not available.</p>
        {/if}

        {#if isValid && isAvailable && !loading &&!isConfirmed}
            <button on:click={confirmUsername} class="btn btn-success">Confirm username @{username}</button>
        {/if}
        {#if isConfirmed}
            <button class="btn btn-success">Username confirmed! @{username}</button>
        {/if}
    </div>  
</AuthCheck>
