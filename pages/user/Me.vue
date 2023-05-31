// frontend/pages/user/Me.vue
<template>
  <div>
    <div class="header">
      <div class="center"><a href="http://localhost:3000/ite18_project/">
  <img src="../../media/OBICO.png" style="width: 140px; height: 100px;"></a>
</div>
      <h1>obico</h1>
      <p>Your Blogs of Destiny</p>
    </div>
    <Navbar />
    <h2 style="color: white;">About Me</h2>
    <h5 style="color: white;">Photo of me:</h5>
    <div class="max-w-md w-full mx-auto mt-8">
      <h1 class="text-3xl font-extrabold mb-4">Profile</h1>
      <form @submit.prevent="userLogin">
        <div class="mb-6">
          <label 
            for="email" class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          ">Email</label>
          <input 
            type="email" class="
            mb-6
            bg-gray-100
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            cursor-not-allowed
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-500
            dark:text-gray-500
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " :value="loggedInUser.email" disabled />
        </div>
        <div class="mb-6">
          <label 
            for="username" class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          ">Username</label>
          <input 
            type="text" class="
            mb-6
            bg-gray-100
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            cursor-not-allowed
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-500
            dark:text-gray-500
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          " :value="loggedInUser.username" disabled />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    middleware: 'auth',
    computed: {
      ...mapGetters(['loggedInUser']),
    },
  }
</script>