import React, { useState } from "react";
import axios from "axios";
import "./uploadProduct.scss";

const BulkProductUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploadStatus("Uploading...");

    try {
      const response = await axios.post(
        "https://calgary-wholesale-tires.onrender.com/api/product/bulk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setUploadStatus("File uploaded successfully!");
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("An error occurred during upload.");
    }
  };

  return (
    <div className="bulkUploadContainer">
      <h1>Bulk Product Upload</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p
        className={
          uploadStatus.includes("error") || uploadStatus.includes("failed")
            ? "error"
            : "success"
        }
      >
        {uploadStatus}
      </p>
    </div>
  );
};

export default BulkProductUpload;
