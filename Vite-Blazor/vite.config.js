import { defineConfig } from "vite";

export default defineConfig(
{
        build:
        {
            outDir: '../wwwroot/vite',
            emptyOutDir: true,
            rollupOptions:
            {
                input: 'src/firebase/FirebaseInterop.js',
                output:
                {
                    entryFileNames: 'assets/[name].js',
                    chunkFileNames: 'assets/[name].js',
                    assetFileNames: 'assets[name].[ext]'
                }
            }
        }
    }
)