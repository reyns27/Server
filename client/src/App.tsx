import { Outlet } from "react-router-dom";
import RouterManager from "./router/RouterManager";

function App() {

  return (
    <>
      <RouterManager />
      <Outlet />
    </>
  )
}

export default App
