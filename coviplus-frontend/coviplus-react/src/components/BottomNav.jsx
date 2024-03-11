import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomNav() {
  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-teal-700 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
    <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <Link to="/dash" className="flex items-center justify-center">
            <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <i className="fas fa-home h-full w-full mb-1 text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-500"></i>
                <span className="sr-only">Home</span>
            </button>
        </Link>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link to="/predict" className="flex items-center justify-center">
            <button data-tooltip-target="tooltip-predict" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <i className="fas fa-chart-line w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-blue-500"></i>
                <span className="sr-only">Predict</span>
            </button>
        </Link>
        <div id="tooltip-predict" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Predict
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link to="/chatbot" className="flex items-center justify-center">
            <button data-tooltip-target="tooltip-chatbot" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                <i className="fas fa-comments w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-blue-500"></i>
                <span className="sr-only">Chatbot</span>
            </button>
        </Link>
        <div id="tooltip-chatbot" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Chatbot
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div>

  )
}
