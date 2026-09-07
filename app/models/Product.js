import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    selling_price: {
      type: Number,
      required: true,
    },

    user: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "fashion",
        "footwear",
        "electronics",
        "beauty",
        "accessories",
        "sports",
        "watches",
        "bags",
      ],
    },

    gender: {
      type: String,
      required: true,
      enum: ["men", "women", "unisex"],
    },

    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

/* Search index */
productSchema.index({
  name: "text",
  description: "text",
  category: "text",
  gender:"text"
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);