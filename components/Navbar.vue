<!-- eslint-disable vue/multi-word-component-names --> <!-- frontend/components/Navbar.vue -->
<!-- Disable eslint rule 'vue/multi-word-component-names' for this file -->

<template>
  <!-- Start of template section -->
  <div class="parentDiv">
    <!-- Start of parentDiv -->
    <div class="nav">
      <!-- Start of nav -->
      <div class="bg-gray-800 py-4 px-4">
        <!-- Start of bg-gray-800 -->
        <NuxtLink class="text-white p-2 hover:bg-gray-700" to="/">Mountains</NuxtLink>
        <!-- NuxtLink component with text 'Mountains', linking to '/' -->
        <NuxtLink v-if="!isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/user/login">Sign In</NuxtLink>
        <!-- NuxtLink component with text 'Sign In', conditionally rendered if 'isAuthenticated' is false, linking to '/user/login' -->
        <NuxtLink v-if="!isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/user/register">Sign Up</NuxtLink>
        <!-- NuxtLink component with text 'Sign Up', conditionally rendered if 'isAuthenticated' is false, linking to '/user/register' -->
        <NuxtLink v-if="isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/blog">Available Blogs</NuxtLink>
        <!-- NuxtLink component with text 'Available Blogs', conditionally rendered if 'isAuthenticated' is true, linking to '/blog' -->
        <NuxtLink v-if="isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/todo">Add Blogs</NuxtLink>
        <!-- NuxtLink component with text 'Add Blogs', conditionally rendered if 'isAuthenticated' is true, linking to '/todo' -->
        <NuxtLink v-if="isAuthenticated" class="text-white p-2 hover:bg-gray-700" to="/user/me">Profile</NuxtLink>
        <!-- NuxtLink component with text 'Profile', conditionally rendered if 'isAuthenticated' is true, linking to '/user/me' -->
        <a v-if="isAuthenticated" class="text-white p-2 hover:bg-gray-700" href="/logout" @click.prevent="userLogout">Logout</a>
        <!-- Anchor tag with text 'Logout', conditionally rendered if 'isAuthenticated' is true, linking to '/logout', with a click event to trigger 'userLogout' method -->
      </div>
      <!-- End of bg-gray-800 -->
    </div>
    <!-- End of nav -->
  </div>
  <!-- End of parentDiv -->
</template>
<!-- End of template section -->

<script>
  // Start of script section
  import {
    mapGetters
  } from 'vuex'
  // Importing the 'mapGetters' function from Vuex

  export default {
    // Exporting the default Vue component
    computed: {
      ...mapGetters(['isAuthenticated']),
      // Using the 'mapGetters' function to map the 'isAuthenticated' getter from Vuex
    },
    methods: {
      // Start of methods section
      async userLogout() {
        // Defining an asynchronous method named 'userLogout'
        await this.$auth.logout()
        // Calling the 'logout' method from the '$auth' object and awaiting its completion
      },
    },
    // End of methods section
  }
  // End of export default
</script>
<!-- End of script section -->

<style>
  body {
    margin: 0;
    padding: 0;
  }

  .parentDiv {
    position: absolute;
    width: 100%;
    background-color: black;
    color: white;
  }

  .nav {
    text-align: center;
  }

  ul li {
    display: inline-block;
    padding: 0 5px;
  }
</style>
<!-- End of style section -->