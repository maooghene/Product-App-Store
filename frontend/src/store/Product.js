import { create } from "zustand";

const API_URL = "http://localhost:5000/api/products";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  // ✅ CREATE PRODUCT (FIXED)
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      console.log("Sending product to backend:", newProduct);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      console.log("Backend response:", data);

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to create product" };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Create product error:", error);
      return { success: false, message: "Server error" };
    }
  },

  // ✅ FETCH PRODUCTS (FIXED)
  fetchProducts: async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      set({ products: data.data });
    } catch (error) {
      console.error("Fetch products error:", error);
    }
  },

  // ✅ DELETE PRODUCT (FIXED)
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`${API_URL}/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Delete product error:", error);
      return { success: false, message: "Server error" };
    }
  },

  // ✅ UPDATE PRODUCT (FIXED)
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`${API_URL}/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Update product error:", error);
      return { success: false, message: "Server error" };
    }
  },
}));
