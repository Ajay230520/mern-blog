import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


// const serverOn = import.meta.env.NODE_ENV;
const viteApiUrl = import.meta.env.VITE_API_URL;
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: viteApiUrl ? viteApiUrl :'http://localhost:3000', // use http for local development
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
