<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;

     // Define props to receive project details
  // export let projectTitle: any;
  // export let projectDescription: any;
  // export let projectImages: 

  function openImageModal(imageUrl: any) {
      // Implement logic to showcase the image in a larger view
      // This can be achieved through a modal or a lightbox effect
      // Display the clicked image in a larger size
    }
</script>


<div class="container mx-auto py-8">
    <!-- <h1 class="text-3xl font-bold mb-4 font-mono">{projectTitle}</h1>
    <p class="text-gray-600 mb-6">{projectDescription}</p> -->
  <p>teste</p>
    <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {#each projectImages as image}
        <img
          src={image.url}
          alt={image.alt}
          class="w-full h-auto cursor-pointer"
          on:click={() => openImageModal(image.url)}
        />
      {/each}
    </div> -->
  
    <!-- Image Modal -->
    <!-- You can create a modal component or use a library like 'svelte-dialog' for this -->
    <!-- When an image is clicked, it triggers the modal to display a larger version of the image -->
  </div>

  <style>
    /* Tailwind classes or custom styles can be added here */
  </style>

