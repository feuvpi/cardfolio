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

<a href={url} class="h-48 mb-2 w-full max-w-md text-center bg-base-100 flex justify-center items-center p-2 rounded-md font-mono relative overflow-hidden">
    <img src={firstImageUrl} alt={icon} class="absolute z-0 w-full h-full object-cover rounded-md"/>
    <div class="absolute bg-opacity-50 bottom-0 w-full h-10 bg-black text-white p-2 rounded-b-md z-10">
        {title}
    </div>
</a>







<!-- <div
slot="header"
class="ios:-mx-4 ios:-mt-4 h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]"
style="background-image: url(https://cdn.framework7.io/placeholder/people-1000x600-6.jpg)"
>
Lorem Ipsum
</div> -->