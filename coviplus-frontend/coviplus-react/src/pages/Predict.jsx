import React, { useState } from 'react';
import axios from 'axios';
import BottomNav from '../components/BottomNav';

const Predict = () => {
    const [showForm, setShowForm] = useState(true);
    const [formData, setFormData] = useState({
        hadSurgeryBefore: false,
        affectedByCovidBefore: false,
        specialDisease: "",
        heartProblems: "",
    });
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [susDiseases, setSusDiseases] = useState([]);
    const [precautions, setPrecautions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFormSubmit = () => {
        setLoading(true);
        axios.post('http://localhost:5000/patient-info', formData)
            .then(response => {
                console.log(response.data);
                setLoading(false);
                setShowForm(false); // Close the form after successful submission
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
                setError('Failed to submit patient information');
            });
    };

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
        formData.append('file', selectedFile)
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data.result);
            setPrediction(response.data.result);
            setSusDiseases(response.data.susdisease);
            setPrecautions(response.data.precaution);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
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
        <>
            {showForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-4">Patient Information</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Had Surgery Before?
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setFormData({ ...formData, hadSurgeryBefore: e.target.value })}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Affected by COVID before?
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setFormData({ ...formData, affectedByCovidBefore: e.target.value })}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Special Diseases (if any)
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setFormData({ ...formData, specialDisease: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Heart Problems (if any)
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={(e) => setFormData({ ...formData, heartProblems: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-teal-500 text-white py-2 px-4 rounded" onClick={handleFormSubmit}>Submit</button>
                            <button className="ml-2 text-gray-600 py-2 px-4 rounded" onClick={() => setShowForm(false)}>Skip</button>
                        </div>
                    </div>
                </div>
            )}
            {loading && <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="text-white font-bold py-2 px-4 rounded-lg bg-blue-500">Submitting Patient Information...</div>
            </div>}
            {error && <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="text-white font-bold py-2 px-4 rounded-lg bg-red-500">{error}</div>
            </div>}
            <div className="bg-gray-100 min-h-screen p-16 flex justify-center items-center">
                <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-8">Upload Image</h1>
                    <div>
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
                </div>
                <div className="w-2/3 bg-white p-8 rounded-lg shadow-lg ml-8">
                    <h1 className="text-2xl font-bold mb-4">Prediction : <span className="text-teal-700">{prediction}</span></h1>
                    <div className="flex">
                        <div className="w-1/2 bg-gray-200 p-4">
                            <h2 className="text-xl font-bold mb-2">Susceptible Diseases</h2>
                            <ul className="list-disc text-gray-700 pl-6">
                                {susDiseases.map((disease, index) => (
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
                </div>
                <div><BottomNav /></div>
            </div>
        </>
    );
};

export default Predict;
