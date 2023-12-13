<script lang="ts">
    import type { PageData } from './$types';
    import Heading from "$lib/components/Heading.svelte"
    
    export let data: PageData;
</script>

<Heading username={data.username} photoURL={data.photoURL}/>
<div class="grid place-items-center w-56">
    <p class="leading-relaxed">@{data.bio}</p>
</div>
<h2 class="text-3xl font-bold my-4">Articles</h2>




