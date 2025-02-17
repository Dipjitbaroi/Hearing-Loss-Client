import React from "react"
import ReactDOM from "react-dom/client"
import "../node_modules/@milon27/react-sidebar/dist/react-sidebar.css"
import App from "./App.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
