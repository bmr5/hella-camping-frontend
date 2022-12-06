/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "unsplash.com",
      "www.gstatic.com",
      "cali-content.usedirect.com",
      "via.placeholder.com",
    ],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoiYmVucmF5NSIsImEiOiJjbGFzd2w0ajMyNzNzM3BsZTkwbWtxZ216In0.yB73xoQlFih98pzYY1vioA",
  },
};
