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
