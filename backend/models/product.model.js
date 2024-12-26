import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    productPrice: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be negative"],
    },
    productColor: {
      type: String,
      trim: true,
    },
    productWarranty: {
      type: Boolean,
      default: false,
    },
    productDelivery: {
      type: Boolean,
      default: false,
    },
    productMakeYear: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Product make year cannot be in the future",
      },
    },
    productDownPayment: {
      type: Boolean,
      default: false,
    },
    productLocation: {
      type: String,
      trim: true,
    },
    productDeliveryArea: {
      type: String,
      trim: true,
    },
    productDeliveryCharge: {
      type: Number,
      min: [0, "Delivery charge cannot be negative"],
    },
    productDescription: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    productImage: {
      type: String,
      default: "",
    },
    productCategory: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", productSchema);
export default Products;
