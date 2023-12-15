<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
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
        <label for="imageUpload" class="block mb-2">Upload Images</label>
        <input type="file" id="imageUpload" multiple class="input input-bordered w-full" on:change={handleImageUpload} />
      </div>
  
      <div class="flex flex-wrap -mx-2 mb-4">
        {#each uploadedImages as image, index}
          <div class="w-1/2 sm:w-1/4 md:w-1/6 px-2 mb-2">
            <div class="relative">
              <button class="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full" on:click={() => removeImage(index)}>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <img src={image.url} alt={image.alt} class="w-full h-auto" />
            </div>
          </div>
        {/each}
      </div>
  
      <button type="submit" class="btn btn-primary w-full">Submit</button>
    </form>
  </div>
  
  <style>
    /* Tailwind classes or custom styles can be added here */
  </style>