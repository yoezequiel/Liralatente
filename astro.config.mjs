import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkBreaks from "remark-breaks";

export default defineConfig({
    site: "https://liralatente.vercel.app",
    integrations: [mdx(), sitemap()],
    markdown: {
        remarkPlugins: [remarkBreaks],
    },
});
