import React from "react"
import { Footer } from "./components/Footer/Footer"
import { Logo } from "./components/Logo/Logo"
import { Main } from "./components/Main/main"
import "./App.css"

const App = () => {
  return (
    <div className="app">
      <Logo />
      <main className="app-content">
        <Main />
      </main>
      <Footer />
    </div>
  )
}

export default App;
