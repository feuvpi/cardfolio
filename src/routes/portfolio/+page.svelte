<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from '../login/portfolio/$types';
    
    // Assuming 'data' is an object with properties for the project information
    export let data: PageData;
  
    // Placeholder for project information
    let title = '';
    let description = '';
    let tags = '';
  
    // Placeholder for uploaded pictures
    let pictures: File[] = [];
  
    // Function to handle picture uploads
 // Function to handle picture uploads
 function handlePictureUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (pictures.length < 6) {
          pictures = [...pictures, files[i]];
        }
      }
    }
  }

  
    onMount(() => {
      // Fetch existing project information and populate the fields if needed
      title = data.title || '';
      description = data.description || '';
      tags = data.tags || '';
      // Assuming 'data.pictures' is an array of picture data
      pictures = data.pictures || [];
    });
  </script>
  
  <style>
    /* Styles can be added here for layout and appearance */
  </style>
  
  <div class="container">
    <h2>Title</h2>
    <input type="text" bind:value={title} />
  
    <h2>Picture Upload</h2>
    <input type="file" multiple accept="image/*" on:change={handlePictureUpload} />
    <div class="picture-container">
      {#each pictures as picture}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={URL.createObjectURL(picture)} alt="Project Picture" />
      {/each}
    </div>
  
    <h2>Description</h2>
    <textarea rows="4" bind:value={description}></textarea>
  
    <h2>Tags</h2>
    <input type="text" bind:value={tags} />
  </div>