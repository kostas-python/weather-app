import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./admin/components/spotify/Login";

import Dashboard from "./admin/components/spotify/Dashboard"

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <Dashboard code={code} /> : <Login />
}

export default App;