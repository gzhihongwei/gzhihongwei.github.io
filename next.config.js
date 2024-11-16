module.exports = {
  output: "export", // <=== enables static exports
  reactStrictMode: true,
  env: {
    LAST_UPDATE_DATE: process.env?.LAST_UPDATE_DATE ?? "DEV",
  },
}
