<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
    import AuthCheck from "$lib/components/AuthCheck.svelte"
    import Sidebar from "$lib/components/Sidebar.svelte"
	import Navbar from "$lib/components/Navbar.svelte"

	let isMobile = false;

	onMount(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the breakpoint as needed
        isMobile = mediaQuery.matches;
        
        const handleResize = () => {
            isMobile = mediaQuery.matches;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
</script>

{#if !isMobile}
<div
	style="background-image: url(https://images.unsplash.com/photo-1533135091724-62cc5402aa20?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);"
	class="flex h-screen"
>
<Sidebar/>

<div class="flex justify-center h-screen w-full">
	
	<main class="max-w-sm m-4 p-10 bg-slate-700 bg-opacity-50 rounded shadow-xl">
		<slot />
	</main>
</div>
</div>
{:else}
<div
	style="background-image: url(https://images.unsplash.com/photo-1533135091724-62cc5402aa20?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);"
	class="flex flex-col h-screen overflow-x-hidden"
>
<Navbar/>
<div class="items-center justify-center h-screen w-full">
	<main class="max-w-sm m-4 p-10 bg-slate-700 bg-opacity-50 rounded shadow-xl">
		<slot />
	</main>
</div>
</div>
{/if}