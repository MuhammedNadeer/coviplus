import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function BottomNav() {

    const [isHovering, setIsHovering] = useState(true);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

  return (
    <div className="fixed z-51 w-full h-16 max-w-lg -translate-x-1/2  bottom-4 left-1/2 dark:bg-teal-700 dark:border-teal-600"
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}>
    {isHovering &&(<div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-teal-700 rounded-full bottom-4 left-1/2 dark:bg-teal-700 dark:border-teal-600 duration-1000 ease-in">
    <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <Link to="/dash" className="flex items-center justify-center">
            <button data-tooltip-target="tooltip-home" type="button" className="h-full w-full flex items-center justify-center px-5 rounded-s-full hover:bg-teal-50 dark:hover:bg-teal-800 group">
                <i className="fas fa-home mb-1 text-teal-500 dark:text-teal-400 group-hover:text-teal-600 dark:group-hover:text-teal-500"></i>
            </button>
        </Link>
        <Link to="/predict" className="flex items-center justify-center">
            <button data-tooltip-target="tooltip-predict" type="button" className="h-full w-full flex items-center justify-center px-5 hover:bg-teal-50 dark:hover:bg-teal-800 group">
                <i className="fas fa-chart-line w-6 h-6 mt-1 text-teal-500 dark:text-teal-400 group-hover:text-teal-600 dark:group-hover:text-blue-500"></i>
            </button>
        </Link>
        <Link to="/chatbot" className="flex items-center justify-center">
            <button data-tooltip-target="tooltip-chatbot" type="button" className="h-full w-full flex items-center rounded-r-full justify-center px-5  hover:bg-teal-50 dark:hover:bg-teal-800 group">
                <i className="fas fa-comments w-6 h-6 mt text-teal-500 dark:text-teal-400 group-hover:text-teal-600 dark:group-hover:text-blue-500"></i>
            </button>
        </Link>
    </div>
</div>)}
</div>
  )
}
