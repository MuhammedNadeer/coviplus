import React, { useState } from 'react';
import img from "../assets/img-icon.png"
import axios from 'axios';


const Predict = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [explanations, setExplanations] = useState(null);
    const [error, setError] = useState(null);


    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0])); // Set image URL
      
      };

      const formData = new FormData();
      formData.append('image', selectedFile);

    const handleFileUpload = async () => {
      setError(null);
      setPrediction(null);
      setExplanations(null);

      if (!selectedFile) {
        setError('Please select an image file.');
        return;
      }
      try {
        const response = await fetch("https://5d2d-2401-4900-2652-2fc9-e9b4-dbb5-67d2-fbbc.ngrok-free.app/predict",{
          method : "POST",
          body : formData
        });
  
        setPrediction(response.data.prediction);
        setExplanations(response.data.explanations);
      } catch (error) {
        console.error(error);
        setError('An error occurred while sending the image.');
      }
    }
      
      
    return (
        <div className="bg-gray-100 min-h-screen p-16 flex justify-center items-center">
       <div className="w-2/3 bg-white p-8 rounded-lg shadow-lg">
         <h1 className="text-2xl font-bold mb-8">Upload Image</h1>
         <div className="h-32 w-32 flex items-center justify-center mb-4 bg-green-200 rounded-lg overflow-hidden">
           {imageUrl ? <img src={imageUrl} alt="Uploaded Graphic" className="h-full w-auto" /> : <img src={img} alt="Upload Graphic" className="h-full w-auto" />}
         </div>
         <input type="file" className="mb-4"  onChange={handleFileChange}/>
         <button className="bg-teal-500 text-white py-2 px-4 rounded w-full" onClick={handleFileUpload}>Upload</button>
       </div>
       <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg ml-8">
         <h1 className="text-2xl font-bold mb-4">Prediction</h1>
         <p className="text-gray-900 mb-4">{prediction}</p>
         <p className="text-gray-500">{explanations}</p>
       </div>
     </div>
    )
}

export default Predict
