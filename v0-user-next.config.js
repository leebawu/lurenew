const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  // 其他Next.js配置
})

