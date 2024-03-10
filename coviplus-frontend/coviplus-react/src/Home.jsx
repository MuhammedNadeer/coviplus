import { Link } from 'react-router-dom';
import './App.css'
import logoimg from "./assets/coviplus.ico"
import homeimg from './assets/home-img.png'
import aboutimg from './assets/about-img.jpg'
import React, { useState } from 'react';
import { useForm } from '@formspree/react';


const Home = () => {
  const [state, handleSubmit, reset] = useForm('mgegzlve');

    
    return (
        <><nav className="py-4 text-stone-950 mt-2">
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
        </nav>
        <section id="home" className="section home">
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
            <div className="container mx-auto flex items-center justify-between h-full">
            <div className="w-1/2 h-full flex items-center"><img src={aboutimg} className=""/></div>
              <div className="w-1/2 p-8">
                <h2 className="text-3xl font-semibold">About Us</h2>
                <p className="mt-4">We are committed to revolutionizing healthcare through advanced technology.</p>
                <p className="mt-2">Our team consists of experts in AI, healthcare, and technology who are dedicated to creating innovative solutions.</p>
              </div>
            </div>
          </section>
          <section className="bg-gray-100 min-h-screen flex items-center justify-center" id="contact">
            <div className="max-w-md p-8 bg-white rounded shadow-md">
              <h2 className="text-3xl font-semibold mb-4">Support Section</h2>
              <p className="text-gray-600 mb-6">
                Welcome to our support section! How can we assist you today?
              </p>
              {state.succeeded ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
                <p className="font-semibold">Thank you for your message!</p>
                <p>We'll get back to you as soon as possible.</p>
              </div>
              ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
                  <input type="text" id="name" name="name" className="w-full border rounded px-3 py-2 focus:outline-none focus:border-teal-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" className="w-full border rounded px-3 py-2 focus:outline-none focus:border-teal-500" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Message</label>
                  <textarea id="message" name="message" rows="4" className="w-full border rounded px-3 py-2 focus:outline-none focus:border-teal-500"></textarea>
                </div>
                <button type="submit" disabled={state.submitting} className="w-full bg-teal-500 text-white font-semibold py-2 rounded hover:bg-teal-600 transition duration-300">Submit</button>
              </form>)}
              <div className="mt-6">
                <p className="text-gray-600 mb-2">Contact us:</p>
                <ul className="flex space-x-4">
                  <li><a href="tel:+123456789" className="text-teal-500 hover:text-teal-600"><i className="fas fa-phone"></i> +1 (234) 567-89</a></li>
                  <li><a href="mailto:support@example.com" className="text-teal-500 hover:text-teal-600"><i className="fas fa-envelope"></i> support@example.com</a></li>
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Follow us:</p>
                <ul className="flex space-x-4">
                  <li><a href="#" className="text-teal-500 hover:text-teal-600"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#" className="text-teal-500 hover:text-teal-600"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#" className="text-teal-500 hover:text-teal-600"><i className="fab fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
          </section>
          <footer className="bg-gray-800 py-4 text-gray-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
              <p>Designed with ❤️ by You</p>
            </div>
          </footer>
   </>
    )
}

export default Home