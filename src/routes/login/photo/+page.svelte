<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user, userData, storage, db } from "$lib/firebase";
    import { doc, updateDoc } from "firebase/firestore";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    
    let previewURL: string;
    let uploading = false;
    $: href = `/${$userData?.username}/edit`;

    async function upload(e: any) {
        uploading = true;
        const file = e.target.files[0]
        previewURL = URL.createObjectURL(file);

        // -- upload to firebase
        const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
        const result = await uploadBytes(storageRef, file)

        // -- store the download url in the firestore in user document
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(db, "users", $user!.uid), { photoURL: url});
        uploading = false;
    }

</script>

<AuthCheck>

<h2 class="card-title">Upload picture</h2>
<form action="" class="max-w-screen-md w-full">
    <div class="form-control w-full max-w-xs my-2 mx-auto text-center">
        <img 
        src={previewURL ?? $userData?.photoURL ?? "/user.png"} 
        alt="photoURL"
        width="256"
        height="64"
        class="mx-auto"/>
        <label for="photoURL" class="label mt-8">
            <span class="label-text">Choose a file:</span>
        </label>
        <input 
        on:change={upload}
        name="photoURL"
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        accept="image/png, image/jpeg, image/gif, image/webp"/>
        {#if uploading}
            <p>Uploading image...</p>
            <progress class="progress progress-info w-56 mt-6"/>
        {/if}
    </div>
</form>
<a {href} class="btn btn-primary"> Finish </a>
</AuthCheck>