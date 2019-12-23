// Global constants
const GlobalConstants = {
  BASE_API_URL:
    process.env.NODE_ENV == "production"
      ? "https://api.desplega.com/"
      : "http://localhost:9000/",
  API_AUTH_TOKEN: "API_AUTH_TOKEN",
  AUTH_USER: "AUTH_USER",
  DATA_LIMIT: 30
};

export default GlobalConstants;
