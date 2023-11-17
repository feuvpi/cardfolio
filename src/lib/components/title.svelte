<script>
    import { userData } from '$lib/firebase';
</script>
  
  <nav class="grid place-items-center pt-12 md:pt-20 pb-6 md:pb-12">
    <a href="/" title="Home">
      <button
        class="border rounded-full border-4 hover:border-orange-600 hover:bg-orange-200 duration-300"
      >
        <img
          class="rounded-full h-20 w-20 shadow-xl"
          src="$userData.photoURL"
          alt="profile"
        />
      </button>
    </a>
  
    <h1 class="font-bold text-3xl md:text-5xl my-5">
      @{$userData?.username.slice(0, Math.round($userData?.username.length/2))} <span class="text-brand font-black">@{$userData?.username.slice(Math.round($userData?.username.length/2))}</span>.
    </h1>
  </nav>