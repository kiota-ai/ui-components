// vite.config.ts
import { defineConfig } from "file:///home/humbertoandueza/ui-components-kiota/node_modules/vite/dist/node/index.js";
import react from "file:///home/humbertoandueza/ui-components-kiota/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///home/humbertoandueza/ui-components-kiota/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: "src/lib/index.ts",
      name: "UiComponents",
      formats: ["es", "umd"],
      fileName: (format) => `kiota-ui-components.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9odW1iZXJ0b2FuZHVlemEvdWktY29tcG9uZW50cy1raW90YVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvaHVtYmVydG9hbmR1ZXphL3VpLWNvbXBvbmVudHMta2lvdGEvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvaHVtYmVydG9hbmR1ZXphL3VpLWNvbXBvbmVudHMta2lvdGEvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgXG4gICAgZHRzKHtcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXG4gIH0pLF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgbGliOiB7XG4gICAgICAgICAgICBlbnRyeTogJ3NyYy9saWIvaW5kZXgudHMnLFxuICAgICAgICAgICAgbmFtZTogJ1VpQ29tcG9uZW50cycsXG4gICAgICAgICAgICBmb3JtYXRzOiBbJ2VzJywgJ3VtZCddLFxuICAgICAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBraW90YS11aS1jb21wb25lbnRzLiR7Zm9ybWF0fS5qc2AsXG4gICAgICAgIH0sXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGV4dGVybmFsOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsJ3NyYy8qKi8qLnN0b3JpZXMuQChqc3xqc3h8bWpzfHRzfHRzeCknXSxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXG4gICAgICAgICAgICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsb0JBQW9CO0FBQzFVLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFHaEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBRU4sSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsSUFDdEIsQ0FBQztBQUFBLEVBQUU7QUFBQSxFQUNELE9BQU87QUFBQSxJQUNILEtBQUs7QUFBQSxNQUNELE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLENBQUMsV0FBVyx1QkFBdUIsTUFBTTtBQUFBLElBQ3ZEO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDWCxVQUFVLENBQUMsU0FBUyxhQUFZLHVDQUF1QztBQUFBLE1BQ3ZFLFFBQVE7QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNqQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
