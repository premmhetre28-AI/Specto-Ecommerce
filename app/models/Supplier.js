import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    // product linked with supplier
    productName: {
      type: String,
    },

    // supplier person/business name
    name: {
      type: String,
    },

    // supplier company
    company: {
      type: String,
    },

    // contact email
    email: {
      type: String,
      lowercase: true,
    },

    // phone number
    phone: {
      type: Number,
    },
    // Amount 
    totalAmount: {
      type: Number,
    },
    paidAmount: { type: Number, default: 0, min: 0, },
    dueAmount: { type: Number, default: 0, },
    paymentStatus: { type: String, enum: ["Pending", "Partial", "Paid"], default: "Pending", },
    // supplier address
    address: {
      type: String,
    },

    // user ownership (if using Clerk auth like your product model)
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Supplier ||
  mongoose.model("Supplier", SupplierSchema);