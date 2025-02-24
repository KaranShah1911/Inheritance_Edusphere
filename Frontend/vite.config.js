import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    fs: {
      strict: true, // Prevent accessing .jsx files from URL
    },
  },
  esbuild: {
    loader: 'jsx',
    include : /\.js$/,
  },
})
