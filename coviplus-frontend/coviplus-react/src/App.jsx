import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Predict from "./pages/Predict"
import Login from './pages/Login'
import SignUp from "./pages/SignUp"
import ForgetPass from "./pages/ForgetPass"
import DashBoard from "./pages/DashBoard"
import Chatbot from "./components/Chatbot"

const App = () => {
    return (
        <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="try" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forget" element={<ForgetPass />} />
          <Route path="dash" element={<DashBoard/>}></Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App