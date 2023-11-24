<script lang="ts">
    import "../app.css";
    import { user } from "$lib/firebase"
    import Heading from "$lib/components/HeadingLanding.svelte"
    $user;

    // let screenSize = 2000;
    // $: isIphone = screenSize < 700

    // onNavigate(({ complete }) => {
    //     if(!document.startViewTransition) return;
        
    //     return new Promise((resolve) => {
    //         document.startViewTransition(async () => {
    //             resolve();
    //             await 
    //         })
    //     })
    // })

</script>



<div class="wrapper relative font-sans min-h-screen flex flex-col align-middle bg-gray-900">
    <Heading/>
    <slot />
</div>

<!-- <svelte:window bind:innerWidth={screenSize} /> -->
