import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { RutaRaiz } from './src/utils/constants'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/gestion-titulacion",
  server: {
    allowedHosts: ["justusas.com"]
  }
})  
