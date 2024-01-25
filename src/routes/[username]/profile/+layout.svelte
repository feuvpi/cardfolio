<script lang="ts">
	import { onMount } from 'svelte';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	// -- test 
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

<AnimatedRoute>
	<AuthCheck>
		{#if !isMobile}
			<div class="flex h-screen border-orange-700 border-4">
				<!-- svelte-ignore missing-declaration -->
				<Sidebar />
	
				<main class="flex mx-auto justify-center w-full border-red-700 border-4">
					<slot />
				</main>
			</div>
		{:else}
			<div class="flex flex-col h-screen overflow-x-hidden">
				<Navbar />
	
				<main class="max-w-sm m-4 p-10 bg-slate-700 bg-opacity-50 rounded shadow-xl">
					<slot />
				</main>
			</div>
		{/if}
	</AuthCheck>
</AnimatedRoute>

