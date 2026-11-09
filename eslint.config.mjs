import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Architecture boundaries. See docs/architecture/conventions.md.
  // Each layer gets its own block because a later no-restricted-imports
  // setting replaces an earlier one for the same file.
  {
    files: ["src/app/**/*.{ts,tsx}", "src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*"],
              message:
                "Import a feature through its public entry point (@/features/<name>). Use relative imports inside a feature.",
            },
            {
              group: ["@supabase/*"],
              message: "Import vendor SDKs only inside src/lib.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features", "@/features/**"],
              message: "Shared components must not depend on features.",
            },
            {
              group: ["@supabase/*"],
              message: "Import vendor SDKs only inside src/lib.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/features",
                "@/features/**",
                "@/components",
                "@/components/**",
                "@/app",
                "@/app/**",
              ],
              message:
                "src/lib must not depend on features, components, or routes.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
