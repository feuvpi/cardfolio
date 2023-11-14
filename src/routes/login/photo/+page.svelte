<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user, userData, storage, db } from "$lib/firebase";
    import { doc, updateDoc } from "firebase/firestore";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    
    let previewURL: string;
    let uploading = false;

    async function upload(e: any) {}

</script>

<AuthCheck>

<h2 class="card-title">Upload picture</h2>
<form action="" class="max-w-screen-md w-full">
    <div class="form-control w-full max-w-xs my-10 mx-auto text-center">
        <img 
        src={previewURL ?? $userData?.photoURL ?? "/user.png"} 
        alt="photoURL"
        width="256"
        height="256"
        class="mx-auto"/>
        <label for="photoURL" class="label">
            <span class="label-text">Choose a file</span>
        </label>
        <input 
        name="photoURL"
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        accept="image/png, image/jpeg, image/gif, image/webp"/>
    </div>
</form>
</AuthCheck>