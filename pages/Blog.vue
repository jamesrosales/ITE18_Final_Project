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