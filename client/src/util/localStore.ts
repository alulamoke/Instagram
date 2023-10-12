export default {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  authenticateUser: (token: string) => {
    localStorage.setItem("instagramToken", token);
  },

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  isUserAuthenticated: (): boolean =>
    localStorage.getItem("instagramToken") !== null,

  /**
   * Deauthenticate a user. Remove token and email from Local Storage.
   *
   */
  deauthenticateUser: () => {
    localStorage.removeItem("instagramToken");
  },
  /**
   * Get a token value.
   *
   * @returns {string}
   */
  getToken: (): string | null => localStorage.getItem("instagramToken"),
};
