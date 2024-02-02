<script context="module" lang="ts">
    interface Params {
        [key: string]: any;
    }

    export async function load({ params }: { params: Params }): Promise<{ props: any }> {
        const { username } = params;
    
        // Fetch the user data using the username to get the UUID
        const userResponse = await fetch(`https://firestore.googleapis.com/v1/projects/auth-app-e21d2/databases/(default)/documents/usernames/${username}`);

        if (!userResponse.ok) {
            return { props: { userData: null } };
        }


        const user = await userResponse.json();
    
        // Fetch the projects using the UUID
        const userDataResponse = await fetch(`https://firestore.googleapis.com/v1/projects/auth-app-e21d2/databases/(default)/documents/user/${user.uuid}`);

        if (!userDataResponse.ok) {
            return { props: { userData: null } };
        }


        const userData = await userDataResponse.json();

        if(userData === undefined){
            return { props: { userData: true } };
        }
    
        console.log('userData:', userData);
        return { props: { userData } };
    }
</script>

<script lang="ts">
interface UserData {
  username: string;
  bio: string;
  photoURL: string;
  published: boolean;
  links: any[];
  projects: ProjectData[];
}

interface ProjectData {
  id: string;
  index: string; 
  title: string;
  description: string;
  tags: string[];
  imageUrls: string[];
  userId: string;
}


    import SortableList from '$lib/components/SortableList.svelte';
    import UserLink from '$lib/components/UserLink.svelte';
    export let userData: UserData;
    console.log(userData)
    let isMobile = false;
</script>

{#if userData !== null 
&& userData !== undefined}
{#if isMobile}
<main>
    <div class="grid-col-1 align-center">
        
        <div class="flex justify-center">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img
                src={""}
                alt="User Image"
                class="w-48 h-48 rounded-full object-cover mb-4 item-center align-middle"
            />
        </div>

        <!-- <div class="relative">
<input type="text" class="bg-slate-700 bg-opacity-50 text-sm font-mono text-center font-bold border-none rounded px-2 py-1 mb-4 w-full pl-8" bind:value={$userData.username}>
<span class="absolute py-1 mb-4 inset-y-0 left-2 flex items-center text-gray-500 text-sm font-mono font-bold pointer-events-none">
  cardfolio.card/
</span>
</div> -->

        <div
            class="flex items-center text-center bg-slate-700 bg-opacity-50 text-xl font-mono font-bold border-none rounded px-2 py-1 mb-1 w-full"
        >
            <span class="text-gray-500 font-mono text-sm ml-10">cardfolio.card/</span>
        </div>
        <!-- <button
    on:click={() => consoleCheck()}
    class="btn btn-xs btn-error group-hover:visible transition-all">console</button
> -->
        <!-- <p>teste</p> -->
        <!-- Campo de entrada para o username -->
        <div class="my-2">
            <textarea
                class="border-none bg-slate-700 bg-opacity-50 w-full rounded px-2 font-mono"
                rows="4"
                value={userData.bio}
            />
        </div>
        <SortableList list={userData.projects} isSortable={Boolean(false)} let:item let:index>
            <div class="group relative">
                <UserLink {...item} imagesUrls={item.imagesUrls} />
            </div>
        </SortableList>
    </div>
</main>
{:else}
<main class="flex h-5/6 w-full m-4 p-2 place-self-center">
    <div class="w-50 bg-slate-700 bg-opacity-50 rounded-md p-2">
        <div class="flex justify-center">
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img
                src={userData.photoURL}
                alt="User Image"
                class="w-48 h-48 rounded-full object-cover mb-4 item-center align-middle"
            />
        </div>

        <!-- <div class="relative">
<input type="text" class="bg-slate-700 bg-opacity-50 text-sm font-mono text-center font-bold border-none rounded px-2 py-1 mb-4 w-full pl-8" bind:value={$userData.username}>
<span class="absolute py-1 mb-4 inset-y-0 left-2 flex items-center text-gray-500 text-sm font-mono font-bold pointer-events-none">
  cardfolio.card/
</span>
</div> -->

        <div
            class="flex items-center text-center mx-2 bg-slate-700 bg-opacity-50 text-xl font-mono font-bold border-none rounded py-1 mb-1"
        >
            <span class="text-gray-500 font-mono text-sm ml-10">cardfolio.card/</span>
        </div>
        <!-- <button
    on:click={() => consoleCheck()}
    class="btn btn-xs btn-error group-hover:visible transition-all">console</button
> -->
        <!-- <p>teste</p> -->
        <!-- Campo de entrada para o username -->
        <div class="m-2">
            <textarea
                class="border-none bg-slate-700 bg-opacity-50 w-full rounded px-2 font-mono"
                rows="4"
                bind:value={userData.bio}
            />
        </div>
    </div>
    <div class="flex-1 mx-4 bg-slate-700 bg-opacity-50 rounded-md p-2 overflow-y-auto overflow-x-hidden">
        <SortableList list={userData.projects} isSortable={Boolean(false)} let:item let:index>
            <div class="group relative">
                <UserLink {...item} imagesUrls={item.imagesUrls} />
            </div>
        </SortableList>
    </div>
</main>
{/if}
{:else}
    <!-- Display personalized not found page -->
    <main class="flex items-center justify-center h-screen">
        <p class="text-4xl font-bold">User Not Found</p>
    </main>
{/if}

<!-- <Heading username={data.username} photoURL={data.photoURL}/>
<div class="grid place-items-center w-56">
    <p class="leading-relaxed">@{data.bio}</p>
</div>
<h2 class="text-3xl font-bold my-4">Articles</h2> -->




