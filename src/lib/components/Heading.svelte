<script>
    export let username = "";
    export let photoURL = "";
</script>
  
  <nav class="grid place-items-center pt-12 md:pt-20 pb-6 md:pb-12">
    <a href="/" title="Home">
      <button
        class="border rounded-full border-4 hover:border-orange-600 hover:bg-orange-200 duration-300"
      >
        <img
          class="rounded-full h-32 w-32 shadow-xl"
          src={photoURL}
          alt="profile"
        />
      </button>
    </a>
  
    <h1 class="font-bold text-3xl md:text-5xl my-5">
      {username.slice(0, Math.round(username.length/2))}<span class="text-brand text-indigo-700">{username.slice(Math.round(username.length/2))}</span>
    </h1>
  </nav>