import React, { useState } from 'react';
import img from "../assets/img-icon.png"
import axios from 'axios';
import BottomNav from '../components/BottomNav';

const Predict = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [susdiseases, setSusDiseases] = useState([]);
    const [precautions, setPrecautions] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setError('Please select an image file.');
            return;
        }
      
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://127.0.0.1:5000/predict', formData)
            .then(response => {
                console.log(response.data.result);
                setPrediction(response.data.result);
                setSusDiseases(response.data.susdisease);
                setPrecautions(response.data.precaution);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <><div className="bg-gray-100 min-h-screen p-16 flex justify-center items-center">
            <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-8">Upload Image</h1>
                {imageUrl ?
                    <img src={imageUrl} name="file" alt="Uploaded Graphic" className="mx-auto my-auto h-full w-auto" /> :
                    <div
                        className="flex items-center justify-center w-full"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG ONLY</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>}
                <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded w-full" onClick={handleFileUpload}>Upload</button>
            </div>
            <div className="w-2/3 bg-white p-8 rounded-lg shadow-lg ml-8">
                <h1 className="text-2xl font-bold mb-4">Prediction : <span className="text-teal-700">{prediction}</span></h1>
                <div className="flex">
                    <div className="w-1/2 bg-gray-200 p-4">
                        <h2 className="text-xl font-bold mb-2">Susceptible Diseases</h2>
                        <ul className="list-disc text-gray-700 pl-6">
                            {susdiseases.map((disease, index) => (
                                <li key={index}>{disease}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/2 bg-gray-200 p-4">
                        <h2 className="text-xl font-bold mb-2">Precautions</h2>
                        <ul className="list-disc text-gray-700 pl-6">
                            {precautions.map((precaution, index) => (
                                <li key={index}>{precaution}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div><div><BottomNav /></div>
        </div></>
    )
}

export default Predict;
