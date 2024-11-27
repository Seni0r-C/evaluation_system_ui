import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { Rutaraiz } from './src/utils/constants'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: Rutaraiz, // Cambia "subcarpeta" al nombre de tu carpeta
})
