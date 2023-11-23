"use client";

import { useState } from "react";
import { addProduct } from "@/utils/model/add";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

const AddProductPage = () => {
  // Function to format the date as dd-mm-yyyy
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    image: null, // Change to null
    createdAt: formatDate(new Date()),
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      // Handle file input separately for image upload
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));

      // Display image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Handle other input types
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call addProduct and pass formData
      await addProduct(formData);

      // Optionally, you can navigate to another page or show a success message
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error adding product:", error);
    }
  };

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Update the state with the selected files
    setImageFiles((prevFiles) => [...prevFiles, ...files]);

    // Generate previews for the selected files
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleRemoveImage = (index) => {
    // Remove the selected image and its preview
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Input for multiple image upload */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            multiple
            required
          />
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                margin: "0.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={preview}
                  alt={`Image Preview ${index}`}
                  style={{
                    width: "8rem",
                    height: "8rem",
                    marginBottom: "0.5rem",
                  }}
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    background: "transparent",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Other input fields */}
        <input
          type="text"
          placeholder="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          placeholder="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />
        <textarea
          required
          name="description"
          id="description"
          rows="16"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;
