const path = require("path");

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    serverActions: true,
  },
  webpack(config) {
    //config.resolve.fallback = { fs: false, net: false, tls: false };
    // config.externals.push("pino-pretty", "lokijs", "encoding");
    config.module.rules.push({
      test: [/sprite\.svg$/],
      type: "asset/resource",
    });

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    fileLoaderRule.exclude = /sprite\.svg$/;

    return config;
  },
  images: {
    domains: [
      "cdn.stamp.fyi",
      "public.blob.vercel-storage.com",
      "res.cloudinary.com",
      "abs.twimg.com",
      "pbs.twimg.com",
      "avatar.vercel.sh",
      "avatars.githubusercontent.com",
      "www.google.com",
      "flag.vercel.app",
      "illustrations.popsy.co",
    ],
  },
  reactStrictMode: false,
};
