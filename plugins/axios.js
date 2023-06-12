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
