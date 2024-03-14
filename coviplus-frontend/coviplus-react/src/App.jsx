import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import React from "react"
import { Fragment } from "react"
import Home from "./Home"
import Predict from "./pages/Predict"
import Login from './pages/Login'
import SignUp from "./pages/SignUp"
import ForgetPass from "./pages/ForgetPass"
import DashBoard from "./pages/DashBoard"
import ProtectedRoute from "./contexts/ProtectedRoute"
import { AuthProvider } from "./contexts/AuthContext"
import Chatbot from "./pages/Chatbot"


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Fragment>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="forget" element={<ForgetPass />} />
                    <Route path="dash" element={<DashBoard/>}/>
                    <Route path="predict" element={<Predict/>}/>
                    <Route path="chatbot" element={<Chatbot/>}/>
                </Routes>
                </Fragment>
            </Router>
        </AuthProvider>
    )
}

export default App