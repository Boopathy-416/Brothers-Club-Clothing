// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 1978,
//     strictPort: true,
//   },
//   preview: {
//     port: 1978,
//     strictPort: true,
//   },
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 1978,
    strictPort: true,
  },
  preview: {
    port: 1978,
    strictPort: true,
  },
})
