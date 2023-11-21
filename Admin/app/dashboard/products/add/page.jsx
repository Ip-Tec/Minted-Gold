"use client"

import { useState } from 'react';
import { addProduct } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    cat: 'general',
    price: '',
    stock: '',
    color: '',
    size: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <select
          name="cat"
          id="cat"
          value={formData.cat}
          onChange={handleChange}
        >
          <option value="general">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
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
        <input
          type="text"
          placeholder="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
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
