<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte"
    import { db, user } from "$lib/firebase";
    import { doc, getDoc, writeBatch } from "firebase/firestore"

    let username = "";
    let loading = false;
    let isAvailable = false;
    let debounceTimer: NodeJS.Timeout;

    // -- validation 
    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    $: isValid = username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading;



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

        console.log("confirming username", username)
        const batch = writeBatch(db);

        batch.set(doc(db, "usernames", username), { uuid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), {
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: 'Hello world',
            links:[
                {
                title: 'Test link 1',
                url: '#',
                icon: 'custom'

            }
            ] 
        })

        await batch.commit();

    }
    
</script>

<AuthCheck>
    <h2>Username</h2>
    <form class="w-2/5 mb-4" on:submit|preventDefault={confirmUsername}>
    <input
    type="text"
    placeholder="Username"
    class="input w-full"
    bind:value={username}
    on:input={checkAvailability}
    class:input-error={(!isValid && isTouched) || isTouched}
    class:input-warning={isTaken}
    class:input-success={isAvailable && isValid && !loading}
    />
    </form>

    <div className="pt-10">
        {#if loading}
            <p class="text-secondary text-sm">Checking availability of @{username}...</p>
        {/if}

        {#if !isValid && isTouched}
            <p class="text-error text-sm">Username must be 3-16 alphanumeric characters.</p>
        {/if}

        {#if isValid && !isAvailable && !loading}
            <p class="text-warning text-sm">@{username} is not available.</p>
        {/if}

        {#if isValid && isAvailable && !loading}
            <button class="btn btn-success">Confirm username @{username}</button>
        {/if}
    </div>  
</AuthCheck>
