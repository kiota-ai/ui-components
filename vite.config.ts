import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
    dts({
      insertTypesEntry: true,
  }),],
    build: {
        lib: {
            entry: 'src/lib/index.ts',
            name: 'UiComponents',
            formats: ['es', 'umd'],
            fileName: (format) => `kiota-ui-components.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom','src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
            },
        },
    },
    test: {
        environment: 'jsdom'
    }
})
