<script lang="ts">
    import { page } from "$app/stores";
	import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<div
style="background-image: url(https://images.unsplash.com/photo-1533135091724-62cc5402aa20?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);" 
class="flex flex-col justify-center items-center h-screen">

    <AnimatedRoute>
        <main class="max-w-sm m-4 p-10 bg-white bg-opacity-50 rounded shadow-xl">
            <div class="">
                <slot></slot>
            </div>
        </main>
    </AnimatedRoute>
    

    <nav class="flex justify-center my-6 bg-slate-300 rounded-xl bg-opacity-60">
        <ul class="steps opacity-100 mx-4 my-2">
            <a href="/register" class="step step-primary text-black bold">Sign In</a>
            <a href="/register/username" class="step text-black" class:step-primary={$page.route.id?.match(/username|photo/g)}>Username</a>
            <a href="/register/photo" class="step text-black" class:step-primary={$page.route.id?.includes("photo")}>Profile Picture</a>
        </ul>
    </nav>
    
    
</div>
