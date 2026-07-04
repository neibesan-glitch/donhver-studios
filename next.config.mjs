/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Restriction des hôtes autorisés pour next/image (audit M2 : le wildcard
    // "**" permettait une SSRF / utilisation comme proxy ouvert).
    remotePatterns: [
      { protocol: "https", hostname: "iohhfdpbwjmvtfzxzzyu.supabase.co" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
