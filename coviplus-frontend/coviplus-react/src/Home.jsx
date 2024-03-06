import { Link } from 'react-router-dom';
import './App.css'
import logoimg from "./assets/coviplus.ico"
import homeimg from './assets/home-img.png'
import aboutimg from './assets/about-img.jpg'
import Chatbot from './components/Chatbot';
import Chatbutton from './components/Chatbutton';
import React, { useState } from 'react';


const Home = () => {
  const [clicked, setClick] = useState(false);
  
    const handleClick = () => {
      setClick(!clicked)
    }

    return (
        <><nav className="py-4 text-stone-950 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex"><img className="mr-2 h-10 w-10" src={logoimg}/>
                <h1 className="text-3xl text-teal-900 font-semibold">CoviPlus</h1></div>
                <ul className="flex items-center">
                    <li><a href="#" className="text-stone-950 hover:text-teal-600 px-4 font-sans tracking-wide">Home</a></li>
                    <li><a href="#about" className="text-stone-950 hover:text-teal-600 px-4 font-sans tracking-wide">About</a></li>
                    <li><a href="#contact" className="text-stone-950 hover:text-teal-600 px-4 font-sans tracking-wide">Support</a></li>
                    <li><Link to="/login"><button className="rounded-md bg-[#00686F] text-white box-border px-4 h-10 w-32">Try Now</button></Link></li>
                </ul>
            </div>
        </nav><section id="home" className="section home">
                <div className="container mx-auto flex items-center justify-between h-full">
                    <div className="w-1/2 h-full p-12 mt-96 flex flex-col justify-start">
                        <div className="mb-4"><h1 className="text-5xl font-semibold">Navigate the Post-COVID Era with <span className="text-5xl text-[#00686F]">COVIPLUS</span>: Your Medical Crystal Ball!</h1>
                        <p className="mt-2 text-lg font-mono tracking-wide">"Empowering post-COVID lung health recovery seamlessly, our web app blends cutting-edge tech with community support."</p></div>
                        <Link to="/login"><button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-teal-500 duration-300 rounded-md shadow-2xl shadow-cyan-500/50 mt-8 bg-[#00686F] text-white tracking-wide box-border h-12 w-32">Try Now</button></Link>
                    </div>
                    <div className="w-1/2 h-full flex items-center"><img src={homeimg} className=""/></div>
                </div>
            </section>
            <section id="about" className="section about">
      <div className="container mx-auto flex items-center justify-between">
      <div className="w-1/2 h-full flex items-center"><img src={aboutimg} className=""/></div>
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold">About Us</h2>
          <p className="mt-4">We are committed to revolutionizing healthcare through advanced technology.</p>
          <p className="mt-2">Our team consists of experts in AI, healthcare, and technology who are dedicated to creating innovative solutions.</p>
        </div>
      </div>
    </section>
    <section id="contact" className="section contact">
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-semibold">Contact Us</h2>
          <p className="mt-4">If you have any questions or inquiries, please don't hesitate to contact us.</p>
          <p className="mt-2">Email: contact@coviplus.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <div className="w-1/2"></div>
      </div>
    </section>
    <div>
    
      <Chatbutton onClick={handleClick} />
       {clicked && (
        <Chatbot />
       )
       }
    
    </div>
            </>

    )
}

export default Home