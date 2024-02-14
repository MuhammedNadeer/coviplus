import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Trynow from "./Trynow"

const App = () => {
    return (
        <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="try" element={<Trynow />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
    )
}

export default App