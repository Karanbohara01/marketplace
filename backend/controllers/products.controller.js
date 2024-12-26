import { generateToken } from "../lib/utils.js";
import Products from "../models/product.model.js";

// Controller function to add a new product
export const postProduct = async (req, res) => {
  const {
    productName,
    productImage,
    productCategory,
    productColor,
    productDelivery,
    productDeliveryArea,
    productDeliveryCharge,
    productDescription,
    productDownPayment,
    productMakeYear,
    productLocation,
    productWarranty,
    productPrice,
  } = req.body;

  try {
    // if (!productName || !productPrice || !productWarranty || !productLocation|| !productMakeYear || ! productMakeYear || !productDownPayment || !productDescription|| !product) {
    //   return res.status(400).json({ message: "All fields are required." });
    // }
    // create new product
    const product = new Products({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productColor: req.body.productColor,
      productWarranty: req.body.productWarranty,
      productDelivery: req.body.productDelivery,
      productMakeYear: req.body.productMakeYear,
      productDownPayment: req.body.productDownPayment,
      productLocation: req.body.productLocation,
      productDeliveryArea: req.body.productDeliveryArea,
      productDeliveryCharge: req.body.productDeliveryCharge,
      productImage: req.body.productImage || "",
      productCategory: req.body.productCategory,
    });

    const savedProduct = await product.save();
    const token = generateToken(savedProduct._id, res);

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
      token, //attach the product token to the response
    });
  } catch (error) {
    console.error("Error while saving product", error);
    res.status(400).json({
      error: "Failed to create product. Please try again later.",
    });
  }
};

// Controller function to retrieve all products from the database
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products", error);
    res.status(500).json({
      error: "Failed to retrieve products. Please try again later.",
    });
  }
};

// Controller function to update an existing product
export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productColor: req.body.productColor,
        productWarranty: req.body.productWarranty,
        productDelivery: req.body.productDelivery,
        productMakeYear: req.body.productMakeYear,
        productDownPayment: req.body.productDownPayment,
        productLocation: req.body.productLocation,
        productDeliveryArea: req.body.productDeliveryArea,
        productDeliveryCharge: req.body.productDeliveryCharge,
        productImage: req.body.productImage || "",
        productCategory: req.body.productCategory,
      },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found. Unable to update." });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error while updating product", error);
    res.status(500).json({
      error:
        "An error occurred while updating the product. Please try again later.",
    });
  }
};

// Controller function to delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product with the given ID was not found.",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error while deleting product", error);
    res.status(500).json({
      error:
        "An error occurred while deleting the product. Please try again later.",
    });
  }
};
