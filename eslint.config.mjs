import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextConfig = compat.config(nextCoreWebVitals);

const config = [
  {
    ignores: ["coverage/**"],
  },
  ...nextConfig,
];

export default config;
