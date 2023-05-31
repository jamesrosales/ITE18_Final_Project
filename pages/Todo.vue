<template>
  <div>
    <div class="header">
      <div class="center"><a href="http://localhost:3000/ite18_project/">
  <img src="../media/OBICO.png" style="width: 140px; height: 100px;"></a>
</div>
      <h1>obico</h1>
      <p>Your Blogs of Destiny</p>
    </div>
    <Navbar />
    <h2 style="color: white;">About Me</h2>
    <h5 style="color: white;">Photo of me:</h5>
    <div class="flex">
      <div class="max-w-md w-full mx-auto mt-8">
        <div class="flex justify-center">
          <h1 class="text-3xl font-extrabold mb-4">Add Blog</h1>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="mb-6 flex justify-center">
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
        </form><br></br>
      </div>
    </div><div class="footer">
      <p>
        Copyright © 2023
        <a href="https://www.facebook.com/jamesrowise">
          <button class="btn btn-primary btn-lg"> | James Esguerra Rosales</button>
        </a>
        | All Rights Reserved
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
        date: '',
        blogtitle: '',
        content: ''
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:1337/api/blogs', {
        data: {
          date: this.date,
          blogtitle: this.blogtitle,
          content: this.content,
        }});
        setTimeout(() => {
            window.location.href = 'http://localhost:3000/blog';
          }, 500);
        // eslint-disable-next-line no-console
        console.log('Data added successfully:', response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding data:', error);
      }
    },
  },
};
</script>

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