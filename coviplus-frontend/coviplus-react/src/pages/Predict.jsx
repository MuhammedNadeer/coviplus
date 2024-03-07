import React, { useState } from 'react';
import img from "../assets/img-icon.png"
import axios from 'axios';


const Predict = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [explanation, setExplanations] = useState("")
    


    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0])); // Set image URL
      
      };

      const formData = new FormData();
      formData.append('file', selectedFile);

    const handleFileUpload = async () => {

      if (!selectedFile) {
        setError('Please select an image file.');
        return;
      }
      
        axios.post('http://127.0.0.1:5000/predict', formData)
        .then(response => {
          console.log(response.data.result);
          setPrediction(response.data.result)
          setExplanations(response.data.predict_data);
          // Handle response
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error
        });
        // console.log(response)
        // const data = response.data
        // console.log(data.result)
        // setPrediction(data.result);
        
      
    }
      
      
    return (
        <div className="bg-gray-100 min-h-screen p-16 flex justify-center items-center">
       <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg">
         <h1 className="text-2xl font-bold mb-8">Upload Image</h1>
         <div className="h-64 w-64 flex items-center justify-center mb-4 bg-green-200 rounded-lg overflow-hidden">
           {imageUrl ? <img src={imageUrl} name="file" alt="Uploaded Graphic" className="h-full w-auto" /> : <img src={img} alt="Upload Graphic" className="h-full w-auto" />}
         </div>
         <input type="file" className="mb-4"  onChange={handleFileChange}/>
         <button className="bg-teal-500 text-white py-2 px-4 rounded w-full" onClick={handleFileUpload}>Upload</button>
       </div>
       <div className="w-1/2 bg-white p-8 rounded-lg shadow-lg ml-8">
         <h1 className="text-2xl font-bold mb-4">Prediction</h1>
         <p className="text-gray-900 mb-4">{prediction}</p>
         <p className="text-gray-500">{explanation}</p>
       </div>
     </div>
    )
}

export default Predict
