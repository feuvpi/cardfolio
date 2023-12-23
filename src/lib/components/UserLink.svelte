<script lang='ts'>
    export let icon = 'default';
    export let title = '';
    export let username = '';
    export let url = `cardfolio.card/${username}/${title}`

    let imagesUrls: string[] = [];


    // Get the first image URL from the array
    let firstImageUrl = imagesUrls.length > 0 ? imagesUrls[0] : '';
</script>

<a href={url} class="stack w-full max-w-md text-center bg-base-300 flex justify-center items-center p-4 rounded-md not-prose font-mono no-underline">
    <img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8"/>
    <span class="font-mono text-lg text-white font-bold">{title}</span>
</a>



<!-- <div
slot="header"
class="ios:-mx-4 ios:-mt-4 h-48 p-4 flex items-end text-white ios:font-bold bg-cover bg-center material:rounded-xl mb-4 material:text-[22px]"
style="background-image: url(https://cdn.framework7.io/placeholder/people-1000x600-6.jpg)"
>
Lorem Ipsum
</div> -->