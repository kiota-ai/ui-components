import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
        insertTypesEntry: true,
    }),
    copy({
        targets: [
            { src: 'src/assets/*.svg', dest: 'dist/images' },
            { src: 'src/assets/*.jpg', dest: 'dist/images' }
        ]
    })],
    publicDir: "src/assets",
    build: {
        outDir: './dist',
        emptyOutDir: true,
        lib: {
            
            entry: 'src/lib/index.ts',
            name: 'UiComponents',
            formats: ['es', 'umd'],
            fileName: (format) => `kiota-ui-components.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom','src/**/*.stories.@(js|jsx|mjs|ts|tsx)','src/**/*.test.@(js|jsx|mjs|ts|tsx)'],
            output: {
                
                globals: {
                    
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
            },
        },
    },
    assetsInclude: ['src/assets/*.svg','src/assets/*.jpg'],
    test: {
        environment: 'jsdom'
    }
})
