// ProductContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/products");
        setProducts(response.data.reverse());
        setFeaturedProducts(
          response.data.filter((product) => product.isFeatured),
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const uploadImage = async (file) => {
    try {
      const uniqueIdentifier =
        Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      const formData = new FormData();
      formData.append(
        "image",
        file,
        `${uniqueIdentifier}.${file.name.split(".").pop()}`,
      );

      formData.append("upload_preset", "lle08gce");
      const response = await axios.post(
        "http://localhost:5005/api/products/upload-image",
        formData,
      );

      if (response.data && response.data.imageUrl) {
        return response.data.imageUrl;
      } else {
        throw new Error("Failed to upload image to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const deleteImage = async (imageUrl) => {
    try {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      console.log(publicId);
      await axios.delete(
        `http://localhost:5005/api/products/images/${publicId}`,
      );
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await axios.post(
        "http://localhost:5005/api/products",
        productData,
      );
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  const updateProduct = async (id, productData) => {
    console.log(id);
    console.log(productData);
    try {
      const response = await axios.put(
        `http://localhost:5005/api/products/${id}`,
        productData,
      );
    } catch (error) {
      throw error;
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5005/api/products/${id}`,
      );
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };
  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        createProduct,
        featuredProducts,
        uploadImage,
        deleteImage,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
