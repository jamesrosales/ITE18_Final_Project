# This is the frontend of my ITE 18 final project.

## Authentication is the process through which a website or app verifies the identity of its users. As the gatekeeper to an app, authentication needs to be secure and reliable. After all, it deals with user information, potentially the most critical data in an app.

## Implementing a secure authentication mechanism from scratch could be difficult and can quickly become cumbersome. Where do you save the user data? Should you roll out a database and model the user content type? What about registration, login, and password reset? It doesn't end there. How do you deal with passwords securely?

## That's a lot to think about when you just want to dive into the core functionality of the app you're developing. You could build your own authentication mechanism, but do you really need or want to? It may be better to rely on something that's already been built and thoroughly tested.

## Here's a preview of what we want to achieve:

![image](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/71e38391-36ef-4840-a7b3-0c6e4426a4d8)

![image](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/ca6c7a5b-97fa-452f-94c3-a03f53f2ae2f)

![image](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/53089c5b-05b7-4618-9643-80cea16d8491)

![image](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/e9dbf1dc-9d6b-45f6-841c-b05b26766c5e)

## Node.js, we recommend you have the v14 version installed, Yarn, a text editor, and a Vue tooling for VS Code. It comes with multiple features like syntax highlighting, formatting, IntelliSense, debugging, and more, A terminal, we recommend using VS Code's integrated terminal.

## On your desktop, create a folder, and name it to "ITE18 Final Project." Open you command prompt and locate your "ITE18 Final Project" folder, setup the Strapi, run this:

```bash
yarn create strapi-app backend --quickstart
```

![s_4AF4FDEDF16A3DF3B0654D64C2F33EDD6CA7EA05F0D813E76F8984F96837F085_1639072772822_image]

![image](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/2934ee65-9a52-407c-99c0-580f92f49a9b)

## Using the --quickstart flag at the end of the command to directly create the project in quickstart mode, which uses the default database (SQLite). Once the installation is complete, your browser automatically opens a new tab. Complete the form to create your new Strapi administrator account.

![s_D08EBA5A8A1577920E1C8A6A274507CC02EEDB230CF9C8AEC8381DB53B5B115F_1649519659482_Capture+dcran+de+2022-04-09+15-54-01](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/8ae5780e-e980-4ba8-b493-ff75a2468596)

## Now that you've created your Strapi application, you are ready to start a new Nuxt.js project.

## In this step, we will use create-nuxt-app to create a new Nuxt project.

## Open a terminal or, from Visual Studio Code, open an integrated terminal and use the following command to create a new starter project:

```bash yarn create nuxt-app frontend
```

## After running the command above, you’ll have to answer some questions. Once all questions are answered, it will install all the dependencies.

```bash
    ? Project name: frontend
    ? Programming language: JavaScript
    ? Package manager: Yarn
    ? UI framework: Windi CSS
    ? Nuxt.js modules: None
    ? Linting tools: ESLint, Prettier
    ? Testing framework: None
    ? Rendering mode: Universal (SSR / SSG)
    ? Deployment target: Server (Node.js hosting)
    ? Development tools: jsconfig.json (Recommended for VS Code if you're not using typescript)
    ? Continuous integration: None
    ? Version control system: Git
 ```
 
## Once the project is created, follow the instructions to install dependencies and start the dev server:
 
```bash cd frontend
yarn
yarn dev 
```

### Now that the dev server is running, open http://localhost:3000/ in your browser.

## **nuxt auth** authenticates users using a configurable authentication scheme or by using one of the directly supported providers. It provides an API for triggering authentication and accessing the resulting user information.

### Ctrl + C to close process js
```bash cd frontend
yarn add --exact @nuxtjs/auth-next
yarn add @nuxtjs/axios
```

## Then, add the following to the modules section of nuxt.config.js:

```bash
export default {
  target: 'static',
  router: {
    base: '/ite18_project/'
  },
  axios: {
    // Base URL of the API
    baseURL: 'http://localhost:1337',
    // Headers to send with every request
    headers: {
      common: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  auth: {
    // Authentication options
    strategies: {
      local: {
        token: {
          property: 'jwt',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'http://localhost:1337/api/auth/local',
            method: 'post',
          },
          user: {
            url: 'http://localhost:1337/api/users/me',
            method: 'get',
          },
          logout: false,
        },
      },
    },
  },
  head: {
    // HTML head configuration
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      // Meta tags
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [], // Global CSS files
  plugins: ['~plugins/axios'], // Plugins to run before rendering pages
  components: true, // Auto import components
  buildModules: [
    // Modules for development and build
    '@nuxtjs/eslint-module', // ESLint module
    '@nuxtjs/tailwindcss', // Tailwind CSS module
  ],
  modules: [
    // Modules
    '@nuxtjs/axios', // Axios module for making HTTP requests
    '@nuxtjs/auth-next' // Auth module for authentication
  ],
  build: {
    // Build configuration
    transpile: [
      'defu' // Packages to transpile
    ]
  }
}
```

## The auth-module relies on Vuex, a state management pattern + library for Vue.js applications. You can activate the store by creating a new ./store/index.js file

```bash
// frontend/store/index.js
export const getters = {
  isAuthenticated(state) {
    // Getter to check if the user is authenticated
    return state.auth.loggedIn
    // Returns the value of the `loggedIn` property in the `auth` module of the store's state
  },
  loggedInUser(state) {
    // Getter to get the logged-in user
    return state.auth.user
    // Returns the value of the `user` property in the `auth` module of the store's state
  },
}
```

## Schemes define authentication logic, see IANA list of authentication schemes. local is the default credentials based scheme for flows like JWT (JSON Web Token), which is the authentication process provided by Strapi roles & permissions plugin.

## Here, you set the base URL that axios will use when making requests. In our case, we are referencing the Strapi API endpoint we set up earlier.

## Then, you define the authentication endpoints for the local strategy corresponding to those on your API: 

## login: authenticates the user. On successful authentication, the JWT token will be available in the jwt property of the response object.
## user: retrieves the authenticated user's info. If the user is authenticated, the JWT token will be added to the request, allowing Strapi to identify the user.
## We've also disabled the logout endpoint, since logging out a user is only done locally and doesn't require any request to Strapi's API. The token is simply removed from the local storage when the user logs out.

## Create a new ./components/Navbar.vue file, and copy/paste the following code in it:

```bash
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
```

## In the code above, we have created a navbar component using Tailwind CSS. Apart from that, we've defined the computed property isAuthenticated and userLogout method used in the component's template.

## Add your navbar component to all your pages by extending the main layout. Add a new layouts/default.vue file, and copy/paste the following code in it:

```bash
<!-- This component represents the default layout for the application -->

<template>
  <!-- Start of template section -->
  <div>
    <!-- Start of div -->
    <nuxt />
    <!-- The <nuxt /> component is used to render the content of the current route -->
  </div>
  <!-- End of div -->
</template>
<!-- End of template section -->
```

## Run yarn dev to start the development server.
## Visit http://localhost:3000 to view your application.

![image](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/8db100c8-16cd-419d-b59a-b87363932156)

## Create a new ./pages/user/Login.vue file, and copy/paste the following code in it:

```bash
<template>
  <div>
    <div class="header">
      <div class="center"><a href="http://localhost:3000/ite18_project/">
  <img src="../../media/OBICO.png" style="width: 140px; height: 100px;"></a>
</div>
      <h1>obico</h1>
      <p>Your Blogs of Destiny</p>
    </div>
    <LogNav />
    <h2 style="color: white;">About Me</h2>
    <h5 style="color: white;">Photo of me:</h5>
    <div class="max-w-md w-full mx-auto mt-8">
      <h1 class="text-3xl font-extrabold mb-4">Sign in</h1>
      <form @submit.prevent="userLogin">
        <div 
          v-if="err" class="
          p-4
          mb-4
          text-sm text-red-700
          bg-red-100
          rounded-lg
          dark:bg-red-200 dark:text-red-800
        " role="alert">
          {{ err }}
        </div>
        <div class="mb-6">
          <label 
            for="email" class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          ">Your email</label>
          <input 
            v-model="email" type="email" class="
            shadow-sm
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
            dark:shadow-sm-light
          " placeholder="name@email.com" required />
        </div>
        <div class="mb-6">
          <label
            for="password" class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          ">Your password</label>
          <input 
            v-model="password" type="password" class="
            shadow-sm
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
            dark:shadow-sm-light
          " placeholder="password" required />
        </div>
        <button 
          type="submit" class="
          text-white
          bg-blue-700
          hover:bg-blue-800
          focus:ring-4 focus:outline-none focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5
          text-center
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        "> Sign in </button>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    auth: 'guest',
    data() {
      return {
        err: null,
        email: '',
        password: '',
      }
    },
    methods: {
      async userLogin() {
        try {
          await this.$auth.loginWith('local', {
            data: {
              identifier: this.email,
              password: this.password
            },
          })
        } catch (e) {
          if (e.response) this.err = e.response.data.error.message
        }
      },
    },
  }
</script>
<style>
  * {
    box-sizing: border-box;
  }

  /* Style the body */
  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }

  /* Header/logo Title */
  .header {
    padding: 80px;
    text-align: center;
    background: #1abc9c;
    color: white;
  }

  /* Increase the font size of the heading */
  .header h1 {
    font-size: 40px;
  }

  /* Style the top navigation bar */
  .navbar {
    overflow: hidden;
    background-color: #333;
  }

  /* Style the navigation bar links */
  .navbar a {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
  }

  /* Right-aligned link */
  .navbar a.right {
    float: right;
  }

  /* Change color on hover */
  .navbar a:hover {
    background-color: #ddd;
    color: black;
  }

  /* Column container */
  .row {
    display: -ms-flexbox;
    /* IE10 */
    display: flex;
    -ms-flex-wrap: wrap;
    /* IE10 */
    flex-wrap: wrap;
  }

  /* Create two unequal columns that sits next to each other */
  /* Sidebar/left column */
  .side {
    -ms-flex: 30%;
    /* IE10 */
    flex: 30%;
    background-color: #f1f1f1;
    padding: 20px;
  }

  /* Main column */
  .main {
    -ms-flex: 70%;
    /* IE10 */
    flex: 70%;
    background-color: white;
    padding: 20px;
  }

  /* Fake image, just for this example */
  .fakeimg {
    background-color: #aaa;
    width: 100%;
    padding: 20px;
  }

  /* Footer */
  .footer {
    padding: 20px;
    text-align: center;
    background: #ddd;
  }

  /* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 700px) {
    .row {
      flex-direction: column;
    }
  }

  /* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
  @media screen and (max-width: 400px) {
    .navbar a {
      float: none;
      width: 100%;
    }
  }
</style>
```

## In the code above, we've defined three properties err, email and password used in the component's template and userLogin method which log in the user after sending the data to the Strapi application. An error notification will be displayed if login attempt is not successful, If not the user will be redirected to the homepage. The auth: guest middleware help redirected the user to the homepage, if already logged in.

## Create a new ./pages/user/Register.vue file, and copy/paste the following code in it:

![image](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/cce6b1b8-d1b0-4638-94d4-8dc8de83fd19)

```bash
<template>
  <div>
    <div class="header">
      <div class="center"><a href="http://localhost:3000/ite18_project/">
  <img src="../../media/OBICO.png" style="width: 140px; height: 100px;"></a>
</div>
      <h1>obico</h1>
      <p>Your Blogs of Destiny</p>
    </div>
    <RegNav />
    <h2 style="color: white;">About Me</h2>
    <h5 style="color: white;">Photo of me:</h5>
    <div class="max-w-md w-full mx-auto mt-8">
      <h1 class="text-3xl font-extrabold mb-4">Sign up</h1>
      <form @submit.prevent="userRegister">
        <div v-if="err" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          {{ err }}
        </div>
        <div v-if="success" class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert"> Your account has been created successfully! <router-link to="user/login" class="font-medium"></router-link>
        </div>
        <div class="mb-6">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your username</label>
          <input v-model="username" type="text" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="username" required />
        </div>
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
          <input v-model="email" type="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@email.com" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
          <input v-model="password" type="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="password" required />
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Sign up </button>
      </form><br></br>
    </div>
  </div>
</template>
<script>
  export default {
    auth: 'guest',
    data() {
      return {
        success: false,
        err: null,
        username: '',
        email: '',
        password: '',
      }
    },
    methods: {
      async userRegister() {
        try {
          this.$axios.setToken(false)
          await this.$axios.post('http://localhost:1337/api/auth/local/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          })
          this.success = true
          // Display success message
          setTimeout(() => {
            window.location.href = 'http://localhost:3000/user/login';
          }, 3000);
          this.$toast.success('Your account has been created successfully!', {
            duration: 5000,
          })
          // Redirect to login page
          this.$router.push('http://localhost:3000/user/login')
        } catch (e) {
          if (e.response && e.response.data && e.response.data.error) {
            this.err = e.response.data.error.message
          }
        }
      },
    },
  }
</script>
<style>
  * {
    box-sizing: border-box;
  }

  /* Style the body */
  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }

  /* Header/logo Title */
  .header {
    padding: 80px;
    text-align: center;
    background: #1abc9c;
    color: white;
  }

  /* Increase the font size of the heading */
  .header h1 {
    font-size: 40px;
  }

  /* Style the top navigation bar */
  .navbar {
    overflow: hidden;
    background-color: #333;
  }

  /* Style the navigation bar links */
  .navbar a {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
  }

  /* Right-aligned link */
  .navbar a.right {
    float: right;
  }

  /* Change color on hover */
  .navbar a:hover {
    background-color: #ddd;
    color: black;
  }

  /* Column container */
  .row {
    display: -ms-flexbox;
    /* IE10 */
    display: flex;
    -ms-flex-wrap: wrap;
    /* IE10 */
    flex-wrap: wrap;
  }

  /* Create two unequal columns that sits next to each other */
  /* Sidebar/left column */
  .side {
    -ms-flex: 30%;
    /* IE10 */
    flex: 30%;
    background-color: #f1f1f1;
    padding: 20px;
  }

  /* Main column */
  .main {
    -ms-flex: 70%;
    /* IE10 */
    flex: 70%;
    background-color: white;
    padding: 20px;
  }

  /* Fake image, just for this example */
  .fakeimg {
    background-color: #aaa;
    width: 100%;
    padding: 20px;
  }

  /* Footer */
  .footer {
    padding: 20px;
    text-align: center;
    background: #ddd;
  }

  /* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 700px) {
    .row {
      flex-direction: column;
    }
  }

  /* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
  @media screen and (max-width: 400px) {
    .navbar a {
      float: none;
      width: 100%;
    }
  }
</style>
```

## In the code above, we've defined two more properties success and username used to display a success message after a successful registration.

# Create a new ./pages/user/Me.vue file, and copy/paste the following code in it:

```bash
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
```

## The auth middleware guarantees that only logged in users can access this page.

## Before implementing the password reset feature. We need to enable the Public Role permissions for the auth/reset-password and auth/forgot-password endpoints.

## To do so, open your Strapi application at http://localhost:1337/admin, from the left sidebar of the admin dashboard, click Settings, Roles, Edit Public, open Users-permissions, check both forgotPassword and resetPassword, then click Save.

![11](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/8a04d5ce-7e37-4c48-abcf-600edaa45f9e)

## In the code above, we've defined a new userPassword method that sends a request to Strapi's auth/forgot-password endpoint. If the email address exists in Strapi's user database, an email is sent with a link to a reset password page in the frontend app.

## This link contains an empty URL with code param which is required to reset user password. To specify a URL, there’s some simple configuration you need to do inside the admin panel.

## From the left sidebar of the admin dashboard, click Settings, Advanced settings, paste http://localhost:3000/user/reset in the “Reset password page" field, then click Save.

![22](https://github.com/jamesrosales/ITE18_Final_Project/assets/93830746/a9c95df0-e3dc-4f48-bb4a-63fca39827ae)

## If the JWT token expires, subsequent requests to Strapi will return a 401 Unauthorized error.

## To deal with this, we'll intercept error responses in axios and check if the status code is 401. If it is, we redirect the user to the login page.

```bash
export default function ({ $axios, redirect }) {
  // Plugin function receives the Nuxt context object, which includes the $axios instance and the redirect function

  $axios.onError((error) => {
    // Handle Axios errors
    const code = parseInt(error.response && error.response.status)
    // Get the response status code from the error object

    if (code === 401) {
      // If the response status is 401 (Unauthorized)
      redirect('/user/login')
      // Redirect the user to the login page
    }
  })
}
```

## Now, when the JWT expires the user will be gracefully redirected to the login page.

## Create a new ./pages/Blog.vue file for personal blogs display, and copy/paste the following code in it:

```bash
<template>
  <!-- Start of template section -->
  <div>
    <!-- Start of div -->
    <div class="header">
      <!-- Header section -->
      <div class="center">
        <!-- Centered div -->
        <a href="http://localhost:3000/ite18_project/">
          <!-- Link to home page -->
          <img src="../media/OBICO.png" style="width: 140px; height: 100px;">
          <!-- OBICO logo -->
        </a>
      </div>
      <h1>obico</h1>
      <p>Your Blogs of Destiny</p>
    </div>
    <Navbar />
    <!-- Include the Navbar component -->
    <h2 style="color: white;">xxx</h2>
    <!-- Placeholder content -->
    <div v-if="selectedBlog">
      <!-- Conditional rendering based on selectedBlog -->
      <div class="flex">
        <div class="max-w-md w-full mx-auto mt-8">
          <div class="flex justify-center">
            <h1 class="text-3xl font-extrabold mb-4">Update Blog</h1>
          </div>
          <form @submit.prevent="updateBlog">
            <!-- Update blog form -->
            <div class="mb-6 flex justify-center">
              <input
                v-model="selectedBlog.date"
                type="date"
                class="..."
                placeholder="Select Date"
                required
                @input="selectedBlog.date = $event.target.value"
              />
            </div>
            <div class="mb-6 flex justify-center">
              <input
                v-model="selectedBlog.blogtitle"
                type="text"
                class="..."
                placeholder="Title"
                required
                @input="selectedBlog.blogtitle = $event.target.value"
              />
            </div>
            <div class="mb-6 flex justify-center">
              <input
                v-model="selectedBlog.content"
                type="text"
                class="..."
                placeholder="Content"
                required
                @input="selectedBlog.content = $event.target.value"
              />
            </div>
            <div>
              <button type="submit" class="...">Update</button>
            </div>
            <div>
              <br />
              <button
                type="submit"
                class="delete-button"
                onclick="window.location.href = 'http://localhost:3000/ite18_project/blog'"
              >Cancel</button>
            </div>
            <br></br>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Conditional rendering when selectedBlog is null -->
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <ul>
              <li v-for="blog in sortedBlogs" :key="blog.id">
                <div class="blog-details">
                  <h2>{{ blog.attributes.blogtitle }}</h2>
                  <h6>{{ blog.attributes.content }}</h6>
                  <button class="edit-button" @click="editBlog(blog)">Edit</button>
                  <button class="delete-button" @click="deleteBlog(blog.id)">Delete</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- Footer section -->
      <p>
        <!-- Footer text -->
        Copyright © 2023
        <a href="https://www.facebook.com/jamesrowise">
          <!-- Link to James Esguerra Rosales' Facebook profile -->
          <button class="btn btn-primary btn-lg"> | James Esguerra Rosales</button>
        </a>
        | All Rights Reserved
      </p>
    </div>
  </div>
  <!-- End of div -->
</template>
<!-- End of template section -->

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // Data properties
      blogs: {
        data: []
      },
      blogtitle: '',
      date: '',
      content: '',
      selectedBlog: null
    };
  },
  computed: {
    // Computed property for sorting blogs
    sortedBlogs() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.blogs.data.sort((a, b) => {
        // Assuming your date format is ISO string, otherwise modify accordingly
        return new Date(a.attributes.date) - new Date(b.attributes.date);
      });
    },
  },
  mounted() {
    // Lifecycle hook: mounted
    this.fetchBlogs();
  },
  methods: {
    // Methods
    fetchBlogs() {
      // Method to fetch blogs from the API
      axios.get(`http://localhost:1337/api/blogs?filters[$and][0][user][username][$eq]=${this.$auth.$state.user.username}`)
        .then(response => {
          // Successful response
          this.blogs = response.data;
          // eslint-disable-next-line no-console
          console.log(response);
        })
        .catch(error => {
          // Error occurred
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    deleteBlog(id) {
      // Method to delete a blog
      axios.delete(`http://localhost:1337/api/blogs/${id}`)
        .then(response => {
          // Successful response
          // eslint-disable-next-line no-console
          console.log(response);
          // Remove the deleted blog from the data
          this.blogs.data = this.blogs.data.filter(blog => blog.id !== id);
        })
        .catch(error => {
          // Error occurred
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },
    editBlog(blog) {
      // Method to edit a blog
      this.selectedBlog = { ...blog }; // Create a copy of the selected article
    },
    updateBlog() {
      // Method to update a blog
      axios.put(`http://localhost:1337/api/blogs/${this.selectedBlog.id}`, {
        data: {
          blogtitle: this.selectedBlog.blogtitle,
          date: this.selectedBlog.date,
          content: this.selectedBlog.content,
        },
      })
        .then(response => {
          // Successful response
          // Update the article in the articles data
          const updatedBlog = response.data.data;
          const index = this.blogs.data.findIndex(blog => blog.id === updatedBlog.id);
          if (index !== -1) {
            this.blogs.data.splice(index, 1, updatedBlog);
          }
          this.selectedBlog = null; // Clear the selected article after update
        })
        .catch(error => {
          // Error occurred
          // eslint-disable-next-line no-console
          console.error('Error updating blog:', error);
        });
    }
  },
};
</script>
<!-- End of script section -->

<style>
  .delete-button {
    background-color: #f56565;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .delete-button:hover {
    background-color: #e53e3e;
  }

  .edit-button {
    background-color: #4299e1;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .edit-button:hover {
    background-color: #3182ce;
  }

  .update-button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }

  .update-button button {
    background-color: #e53e3e;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }

  .container {
    margin-left: 7%;
    margin-right: 6%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    align-items: center;
  }

  li {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2em;
    margin-bottom: 5px;
  }

  h6 {
    font-size: 1em;
    margin-bottom: 5px;
  }

  h5 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  p {
    font-size: 1em;
    line-height: 1.5;
  }

  h5 {
    color: white;
    font-size: 50%;
    text-align: center;
    margin: auto;
  }

  .blog-details {
    margin: 0 auto;
    max-width: 600px;
  }
</style>
<!-- End of style section -->
```

## Create a new ./pages/Todo.vue file for adding personal blog, and copy/paste the following code in it:

```bash
<template>
  <!-- Start of template section -->
  <div>
    <!-- Start of div -->
    <div class="header">
      <!-- Header section -->
      <div class="center">
        <!-- Centered div -->
        <a href="http://localhost:3000/ite18_project/">
          <!-- Link to home page -->
          <img src="../media/OBICO.png" style="width: 140px; height: 100px;">
          <!-- OBICO logo -->
        </a>
      </div>
      <h1>obico</h1>
      <p>Your Blogs of Destiny</p>
    </div>
    <Navbar />
    <!-- Include the Navbar component -->

    <h2 style="color: white;">About Me</h2>
    <h5 style="color: white;">Photo of me:</h5>
    <div class="flex">
      <!-- Flex container -->
      <div class="max-w-md w-full mx-auto mt-8">
        <!-- Max width container -->
        <div class="flex justify-center">
          <!-- Flex centered -->
          <h1 class="text-3xl font-extrabold mb-4">Add Blog</h1>
        </div>
        <form @submit.prevent="handleSubmit">
          <!-- Form submission -->
          <div class="mb-6 flex justify-center">
            <!-- Date input -->
            <input
              v-model="date"
              type="date"
              class="
                shadow-sm
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
                dark:shadow-sm-light
              "
              placeholder="Select Date"
              required
            />
          </div>
          <div class="mb-6 flex justify-center">
            <!-- Blog title input -->
            <input
              v-model="blogtitle"
              type="text"
              class="
                shadow-sm
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
                dark:shadow-sm-light
              "
              placeholder="Title"
              required
            />
          </div>
          <div class="mb-6 flex justify-center">
            <!-- Blog content input -->
            <input
              v-model="content"
              type="text"
              class="
                shadow-sm
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                rounded-lg
                focus:ring-blue-500 focus:border-blue-500
                block
                w-full
                p-2.5
                dark:bg-gray-700
                dark:border-gray-600
                dark:placeholder-gray-400
                dark:text-white
                dark:focus:ring-blue-500
                dark:focus:border-blue-500
                dark:shadow-sm-light
              "
              placeholder="Content"
              required
            />
          </div>
          <div>
            <!-- Submit button -->
            <button
              type="submit"
              class="
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
            >
              Add
            </button>
          </div>
        </form>
        <br></br>
      </div>
    </div>
    <!-- End of div -->

    <div class="footer">
      <!-- Footer section -->
      <p>
        Copyright © 2023
        <a href="https://www.facebook.com/jamesrowise">
          <button class="btn btn-primary btn-lg"> | James Esguerra Rosales</button>
        </a>
        | All Rights Reserved
      </p>
    </div>
  </div>
  <!-- End of template section -->
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      date: '',
      blogtitle: '',
      content: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:1337/api/blogs', {
          // Make a POST request to add a new blog
          data: {
            date: this.date,
            blogtitle: this.blogtitle,
            content: this.content,
            user: this.$auth.$state.user.id
          }
        });
        setTimeout(() => {
          // Redirect to the blog page after a delay
          window.location.href = 'http://localhost:3000/blog';
        }, 500);
        // eslint-disable-next-line no-console
        console.log('Data added successfully:', response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding data:', error);
      }
    }
  }
};
</script>
<!-- End of script section -->

<style>
  .flex {
    display: flex;
    justify-content: center;
  }

  #todo-list-container {
    margin-top: 16px;
    width: 50%;
  }

  @media (max-width: 768px) {
    .flex {
      flex-direction: column;
      align-items: center;
    }

    #todo-list-container {
      width: 100%;
      margin-top: 32px;
    }
  }

  .my-heading {
    font-size: 3rem;
  }

  .header1 {
    padding: 80px;
    text-align: center;
    background: #1abc9c;
    color: white;
  }

  /* Increase the font size of the heading */
  .header h4 {
    font-size: 40px;
  }
</style>
<!-- End of style section -->
```

## Create a new ./pages/Index.vue file to display third-party API, and copy/paste the following code in it:

```bash
<template>
  <!-- Start of template section -->
  <div>
    <!-- Start of div -->
    <div class="header">
      <!-- Header section -->
      <div class="center">
        <!-- Centered div -->
        <a href="http://localhost:3000/ite18_project/">
          <!-- Link to home page -->
          <img src="../media/OBICO.png" style="width: 140px; height: 100px;">
          <!-- OBICO logo -->
        </a>
      </div>
      <h1>obico</h1>
      <p>Your Blogs of Destiny</p>
    </div>
    <Navbar />
    <!-- Include the Navbar component -->

    <div class="row">
      <!-- Start of row -->
      <div class="side">
        <!-- Side section -->
        <h2 style="color: #F4F4F4;">About Me</h2>
        <h5 style="color: #F4F4F4;">Photo of me:</h5>

        <div class="mb-6 flex justify-center">
          <!-- Search input -->
          <input
            v-model="searchQuery"
            type="text"
            class="
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light
            "
            placeholder="Search Mountains"
          />
        </div>

        <div class="articles">
          <!-- Articles section -->
          <article v-for="(mountain, index) in filteredMountains" :key="index" class="card">
            <!-- Loop through filteredMountains array -->
            <div class="article-wrapper">
              <figure>
                <img :src="mountain.image" alt="Mountain Photo" />
              </figure>
              <div class="article-body">
                <h2>{{ mountain.title }}</h2>
                <p>{{ mountain.description }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <!-- End of side section -->
    </div>
    <!-- End of row section -->

    <div class="footer">
      <!-- Footer section -->
      <p>
        <!-- Footer text -->
        Copyright © 2023
        <a href="https://www.facebook.com/jamesrowise">
          <!-- Link to James Esguerra Rosales' Facebook profile -->
          <button class="btn btn-primary btn-lg"> | James Esguerra Rosales</button>
        </a>
        | All Rights Reserved
      </p>
    </div>
  </div>
  <!-- End of div -->
</template>
<!-- End of template section -->

<script>
export default {
  name: 'HomePage',
  components: {},
  data() {
    return {
      // Data properties
      mountains: [],
      searchQuery: ''
    };
  },
  async fetch() {
    // Lifecycle hook: fetch
    this.mountains = await fetch('https://api.nuxtjs.dev/mountains').then(res => res.json());
    // Fetch mountains data from the provided API
  },
  computed: {
    filteredMountains() {
      // Computed property for filtered mountains
      if (this.searchQuery === '') {
        // If search query is empty, return all mountains
        return this.mountains;
      } else {
        const query = this.searchQuery.toLowerCase();
        // Convert search query to lowercase
        return this.mountains.filter(
          mountain =>
            mountain.title.toLowerCase().includes(query) ||
            mountain.description.toLowerCase().includes(query)
        );
        // Filter mountains based on title or description matching the search query
      }
    }
  }
};
</script>
<!-- End of script section -->

<style>
  .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 100%;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .container {
    padding: 2px 16px;
  }

  * {
    box-sizing: border-box;
  }

  /* Style the body */
  body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    background-color: white; /* Set the background color to white */
  }

  /* Header/logo Title */
  .header {
    padding: 80px;
    text-align: center;
    background: #1abc9c;
    color: white;
  }

  /* Increase the font size of the heading */
  .header h1 {
    font-size: 40px;
  }

  /* Style the top navigation bar */
  .navbar {
    overflow: hidden;
    background-color: #333;
  }

  /* Style the navigation bar links */
  .navbar a {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
  }

  /* Right-aligned link */
  .navbar a.right {
    float: right;
  }

  /* Change color on hover */
  .navbar a:hover {
    background-color: #ddd;
    color: black;
  }

  /* Column container */
  .row {
    display: -ms-flexbox;
    /* IE10 */
    display: flex;
    -ms-flex-wrap: wrap;
    /* IE10 */
    flex-wrap: wrap;
  }

  /* Create two unequal columns that sits next to each other */
  /* Sidebar/left column */
  .side {
    -ms-flex: 30%;
    /* IE10 */
    flex: 30%;
    background-color: #f1f1f1;
    padding: 20px;
  }

  /* Main column */
  .main {
    -ms-flex: 70%;
    /* IE10 */
    flex: 70%;
    background-color: white;
    padding: 20px;
  }

  /* Fake image, just for this example */
  .fakeimg {
    background-color: #aaa;
    width: 100%;
    padding: 20px;
  }

  /* Footer */
  .footer {
    padding: 20px;
    text-align: center;
    background: #ddd;
  }

  /* Responsive layout - when the screen is less than 700px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 700px) {
    .row {
      flex-direction: column;
    }
  }

  /* Responsive layout - when the screen is less than 400px wide, make the navigation links stack on top of each other instead of next to each other */
  @media screen and (max-width: 400px) {
    .navbar a {
      float: none;
      width: 100%;
    }
  }

  article {
  --img-scale: 1.001;
  --title-color: black;
  --link-icon-translate: -20px;
  --link-icon-opacity: 0;
  position: relative;
  border-radius: 16px;
  box-shadow: none;
  background: #fff;
  transform-origin: center;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
  }

  article a::after {
    position: absolute;
    inset-block: 0;
    inset-inline: 0;
    cursor: pointer;
    content: "";
  }

  /* basic article elements styling */
  article h2 {
    margin: 0 0 18px 0;
    font-family: "Bebas Neue", cursive;
    font-size: 1.9rem;
    letter-spacing: 0.06em;
    color: var(--title-color);
    transition: color 0.3s ease-out;
  }

  figure {
    margin: 0;
    padding: 0;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  article img {
    max-width: 100%;
    transform-origin: center;
    transform: scale(var(--img-scale));
    transition: transform 0.4s ease-in-out;
  }

  .article-body {
    padding: 15px;
    width: 100%;
  }

  article a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    color: #28666e;
  }

  article a:focus {
    outline: 1px dotted #28666e;
  }

  article a .icon {
    min-width: 24px;
    width: 24px;
    height: 24px;
    margin-left: 5px;
    transform: translateX(var(--link-icon-translate));
    opacity: var(--link-icon-opacity);
    transition: all 0.3s;
  }

  /* using the has() relational pseudo selector to update our custom properties */
  article:has(:hover, :focus) {
    --img-scale: 1.1;
    --title-color: #28666e;
    --link-icon-translate: 0;
    --link-icon-opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .articles {
    display: grid;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: 24px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  @media screen and (max-width: 960px) {
    article {
      font-size: card/inline-size;
    }
    .article-body p {
      display: none;
    }
  }

  @container card (min-width: 380px) {
    .article-wrapper {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 16px;
    }
    .article-body {
      padding-left: 0;
    }
    figure {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    figure img {
      height: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }
  }

  .sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0); 
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap; 
    width: 1px;
  }
</style>
<!-- End of style section -->
```



## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

# Thank you for spending your time on reading this learning tips!

## For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
