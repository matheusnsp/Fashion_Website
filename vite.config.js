import { defineConfig } from 'vite'

export default defineConfig({
  // O './' garante que funcione tanto no Vercel quanto no seu PC (caminhos relativos)
  base: './', 
  
  server: {
    open: true, // Isso vai abrir o navegador sozinho quando você der 'npm run dev'
    port: 5173
  },

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html', // Vite procura na raiz por padrão
      }
    }
  }
})