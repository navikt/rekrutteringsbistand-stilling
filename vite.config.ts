import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    return {
        server: {
            port: 3002,
        },
        build: {
            sourcemap: true,
            copyPublicDir: false,
            manifest: 'asset-manifest.json',
            chunkSizeWarningLimit: 1000,
        },
        plugins: [react(), svgrPlugin()],
    };
});
