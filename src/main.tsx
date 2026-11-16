import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './shop/cart'
import { PopupProvider } from './popups/PopupContext'
import './styles.css'
createRoot(document.getElementById('root')!).render(<StrictMode><HashRouter><CartProvider><PopupProvider><App /></PopupProvider></CartProvider></HashRouter></StrictMode>)
