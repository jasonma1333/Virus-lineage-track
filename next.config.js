/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // 讓 `next export` 產生靜態網站
  trailingSlash: true        // gh‑pages 友好 URL
};
module.exports = nextConfig;
