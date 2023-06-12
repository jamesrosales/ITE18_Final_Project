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
