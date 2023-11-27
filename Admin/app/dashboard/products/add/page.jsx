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
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Generate previews for the selected files
    const previews = files.map((file) => URL.createObjectURL(file));

    // Update the state with the selected files and previews
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);

    // Update formData.image to an array of file objects
    setFormData((prevData) => ({
      ...prevData,
      image: [...prevData.image, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    // Remove the selected image and its preview
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    image: imageFiles, // Change to null
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
      console.log({ formData });
      const AP = await addProduct(formData);
      console.log({ AP });
      // Optionally, you can navigate to another page or show a success message
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Input for multiple image upload */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
          <div className={styles.formContainer}>
            <label className={styles.label} htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              multiple
              required
            />
          </div>
        </div>
        {/* Other input fields */}
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="title">
            Product name
          </label>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="price">
            Price
          </label>
          <input
            type="number"
            placeholder="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="stock">
            Stock Number
          </label>
          <input
            type="number"
            placeholder="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formContainer}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>

          <textarea
            required
            name="description"
            id="description"
            rows="5"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
