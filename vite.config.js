import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

//Ruta base para producción
// const baseRoute = "/gestion-titulacion"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: baseRoute,
})  
