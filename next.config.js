/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    basePath: process.env.NODE_ENV == 'production' ? "": "",
    images: {
    unoptimized: false,

    }
}

module.exports = nextConfig
