import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Predict from "./pages/Predict"
import Login from './pages/Login'
import SignUp from "./pages/SignUp"
import ForgetPass from "./pages/ForgetPass"
import DashBoard from "./pages/DashBoard"
import ProtectedRoute from "./contexts/ProtectedRoute"
import { AuthProvider } from "./contexts/AuthContext"
import Chatbot from "./components/Chatbot"


const App = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forget" element={<ForgetPass />} />
            <AuthProvider>
                <ProtectedRoute path="dash" element={<DashBoard/>}></ProtectedRoute>
                <ProtectedRoute path="predict" element={<Predict/>}></ProtectedRoute>
            </AuthProvider>
        </Routes>
        </BrowserRouter>
    )
}

export default App