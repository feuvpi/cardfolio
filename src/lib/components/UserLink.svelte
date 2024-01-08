<script lang='ts'>
	import Page from "../../routes/+page.svelte";

    export let icon = 'default';
    export let title = '';
    export let username = '';
    export let url = `cardfolio.card/${username}/${title}`

    export let imageUrls: string[] = [];


    // Get the first image URL from the array
    let firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : '/${default}.png';
</script>

<a href={url} class="mt-2 stack w-full max-w-md text-center bg-base-300 flex justify-center items-center p-2 rounded-md not-prose font-mono no-underline">
    <img src={firstImageUrl} alt={icon} width="48" height="48" class="w-12 rounded-md"/>
    <span class="font-mono text-lg text-white font-bold">{title}</span>
</a>







<!-- <div
slot="header"
class="ios:-mx-4 ios:-mt-4 h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]"
style="background-image: url(https://cdn.framework7.io/placeholder/people-1000x600-6.jpg)"
>
Lorem Ipsum
</div> -->