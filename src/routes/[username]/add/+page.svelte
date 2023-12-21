<script lang="ts">
	import { user, storage, db } from '$lib/firebase';
  import type { PageData } from './$types';
  import { writeBatch, collection, addDoc } from 'firebase/firestore'
  import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
  export let data: PageData;

  let projectTitle = '';
  let projectDescription = '';
  let uploadedImages: any[] = [];
  let tags: any[] = [];
  let tagInput = ''; 
  const batch = writeBatch(db);
  let showMessage = false;

  // -- function to handle tag input
  function handleTagInput(event: any){
    if(event.key === ' '){
      if(tagInput.trim() !== ''){
        tags = [...tags, `#${tagInput.trim()}`];
        tagInput = '';
      }
    }
  }

  // -- Function to handle image upload
  function handleImageUpload(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = {
          url: reader.result,
          alt: files[i].name,
        };
        uploadedImages = [...uploadedImages, imageData];
      };
      reader.readAsDataURL(files[i]);
    }
  }

  // -- Function to remove uploaded image
  function removeImage(index: number) {
    uploadedImages = uploadedImages.filter((_, i) => i !== index);
  }

  // -- Function to submit the form
  async function submitForm() {
    const imageUrls = [];
    for(const image of uploadedImages) {
      const storageRef = ref(storage, `projects/${$user!.uid}/${projectTitle}/${image.alt}`);
      const result = await uploadBytes(storageRef, image.file);
      const downloadURL = await getDownloadURL(storageRef);
      imageUrls.push(downloadURL);
    }

    // -- create the object
    const project = {
      title: projectTitle,
      description: projectDescription,
      tags: tags,
      imageUrls: imageUrls,
      userId: $user!.uid
    }

    // -- save into the user firebase document
    const userProjectRef = collection(db, `users/${$user!.uid}/projects`);
    try{
      await addDoc(userProjectRef, project)
      showMessage = true
      setTimeout(() => {
        showMessage = false;
      }, 5000)
    } catch (error) {
      console.error('Error saving new project: ', error)
    }
    

    // batch.set(doc(db, 'projects', $user!.uid), project);

    resetForm();
  }

  function resetForm() {
    projectTitle = '';
    projectDescription = '';
    uploadedImages = [];
  }
</script>

<div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-4 text-center">Add New Project</h1>
  
    <form on:submit|preventDefault={submitForm} class="max-w-md mx-auto">
      <div class="mb-4">
        <label for="projectTitle" class="block mb-2">Project Title</label>
        <input type="text" id="projectTitle" bind:value={projectTitle} class="input input-bordered w-full" />
      </div>
  
      <div class="mb-4">
        <label for="projectDescription" class="block mb-2">Project Description</label>
        <textarea id="projectDescription" bind:value={projectDescription} class="textarea textarea-bordered w-full"></textarea>
      </div>

      <div class="mb-4">
        <label for="tags" class="block mb-2">Tags</label>
        <input
          type="text"
          id="tags"
          bind:value={tagInput}
          placeholder="Add tags separated by spaces"
          class="input input-bordered w-full mb-2"
          on:keyup={handleTagInput}
        />
        <div class="flex flex-wrap">
          {#each tags as tag, index}
            <span class="bg-gray-200 px-2 py-1 rounded-full text-sm mr-2 mb-2">{tag}</span>
          {/each}
        </div>
      </div>
  
      <div class="mb-4">
        <label for="imageUpload" class="block mb-2">Upload Images</label>
        <input type="file" id="imageUpload" multiple class="input input-bordered w-full" on:change={handleImageUpload} />
      </div>
  
      <div class="flex flex-wrap -mx-2 mb-4">
        {#each uploadedImages as image, index}
          <div class="w-1/2 sm:w-1/4 md:w-1/6 px-2 mb-2">
            <div class="relative h-20">
              <button class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full" on:click={() => removeImage(index)}>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <img src={image.url} alt={image.alt} class="object-cover w-full h-full" />
            </div>
          </div>
        {/each}
      </div>
  
      <button type="submit" class="btn btn-primary w-full">Submit</button>
        {#if showMessage}
    <p class="text-center text-green-500">Project saved successfully!</p>
        {/if}
    </form>
  </div>
  
  <style>
    /* Tailwind classes or custom styles can be added here */
  </style>