import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base './' = percorsi relativi: funziona sia su username.github.io/repo/ sia su username.github.io/
// Se serve una base fissa: VITE_BASE=/nome-repo/ npm run build
export default defineConfig({ plugins: [react()], base: process.env.VITE_BASE ?? './' })
