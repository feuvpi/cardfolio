<script lang="ts">
  import { auth, user, userData } from "$lib/firebase";
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
  import { onDestroy, onMount } from 'svelte';

  let username = "";
  let userDataUnsubscribe: (() => void) | undefined;

  async function signInWithGoogle(){
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const idToken = await credential.user.getIdToken();
      // const res = await fetch("/api/signin", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ idToken }),
      // })

      console.log
      if(idToken){
        window.location.href = "/register/username"
      } else {
        console.log("Authentication failed!")
      }
  }

  async function signOutSSR() {
  const res = await fetch("/api/signin", { method: "DELETE" });
  await signOut(auth);
}

onMount(() => {
  if(user){
    userDataUnsubscribe = userData.subscribe((data) => {
            if (data && data.username !== null) {
                username = data.username;
                window.location.href = `/${username}/edit`
            } else {
                username = "";
            }
        });
  }
        
    });

// -- cancelar a inscrição quando a pagina for destruida
onDestroy(() => {
        if (userDataUnsubscribe) {
            userDataUnsubscribe();
        }
    });


</script>

<!-- // -- colocar uma background image -->
<!-- This is an example component -->
<!-- <div class="h-screen font-sans login bg-cover">
  <div class="container mx-auto h-full flex flex-1 justify-center items-center">
      <div class="w-full max-w-lg">
        <div class="leading-loose"> -->
          <!-- <form class="max-w-sm m-4 p-10 bg-white bg-opacity-25 rounded shadow-xl"> -->
              
                <!-- <div class="">
                  <label class="block text-sm text-white" for="email">E-mail</label>
                  <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="email" id="email"  placeholder="Type your e-mail" aria-label="email" required>
                </div>
                <div class="mt-2">
                  <label class="block  text-sm text-white">Password</label>
                   <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                    type="password" id="password" placeholder="Type your password" arial-label="password" required>
                </div>

                <div class="mt-2">
                  <label class="block  text-sm text-white">Confirm Password</label>
                   <input class="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                    type="password" id="password" placeholder="Confirm your password" arial-label="password" required>
                </div>
  
                <div class="mt-3 items-center place-content-center flex">
                  <button class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                    type="submit">Register</button>
                </div>
                <div class="text-center">
                  <a class="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                      Already registered? Log in.
                  </a>
                </div>

                <div class="relative m-6">
                  <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300"></div>
                  </div>
                  <div class="relative flex justify-center text-sm">
                      <span class="px-2 bg-gray-100 text-gray-500">
                          Or continue with
                      </span>
                  </div>
              </div> -->

    {#if $user}
      <h2 class="font-mono title text-black font-bold">Welcome! {$user.displayName}</h2>
      <p class="text-center text-success font-bold font-mono">You are in.</p>
      <div class="mt-4 items-center place-content-center flex">
      <button  class="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" on:click={signOutSSR}>Sign Out</button>
      </div>
{:else}
<p class="text-white font-medium text-center text-lg font-bold">CREATE NEW ACCOUNT</p>
<div class="mt-8 items-center place-content-center flex">
 
  <button on:click={signInWithGoogle} class="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
    <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
    <span>Continue with Google</span>
</button>

</div>

{/if}

              
              

  
          <!-- </form> -->
  
        <!-- </div> -->
      <!-- </div> -->
    <!-- </div> -->
  <!-- </div> -->
  <style>
    .login{
    /*
      background: url('https://tailwindadmin.netlify.app/dist/images/login-new.jpeg');
    */
    /* background: url('http://bit.ly/2gPLxZ4'); */
    background-repeat: no-repeat;
    background-size: cover;
  }
  </style>