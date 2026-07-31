import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: 'override-nitro-preset',
      config(config: any) {
        if (config.nitro) {
          config.nitro.preset = 'node-server';
        } else {
          config.nitro = { preset: 'node-server' };
        }
        return config;
      }
    }
  ],
});
