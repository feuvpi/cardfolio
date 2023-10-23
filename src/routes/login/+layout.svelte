<script lang="ts">
    import { page } from "$app/stores";
	import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<div class="grid grid-cols-1 gap-4 place-content-center h-96">

    <AnimatedRoute>
        <main class="card w-5/6 bg-neutral text-neutral-content mx-auto mt-96">
            <div class="card-body items-center text-center">
                <slot></slot>
            </div>
        </main>
    </AnimatedRoute>
    

    <nav class="flex justify-center my-6">
        <ul class="steps steps-vertical">
            <a href="/login" class="step step-primary">Sign In</a>
            <a href="/login/username" class="step" class:step-primary={$page.route.id?.match(/username|photo/g)}>Choose a username</a>
            <a href="/login/photo" class="step" class:step-primary={$page.route.id?.includes("photo")}>Upload a profile picture</a>
        </ul>
    </nav>
    
    
</div>
