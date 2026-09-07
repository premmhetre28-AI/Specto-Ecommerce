"use client";
import { useDispatch, useSelector } from "react-redux"
import { CopilotPopup } from "@copilotkit/react-core/v2";
import { useCopilotAction } from "@copilotkit/react-core";
import { z } from "zod";
import { useFrontendTool } from "@copilotkit/react-core/v2";
import { addProduct, searchProduct, stockIn, stockOut, fetchProducts } from "@/app/redux/slices/productSlice";


export default function AIChatBot() {
  const dispatch = useDispatch()
  const {products} = useSelector((state)=>state.product)
  // Add-products
  useFrontendTool({
    name: "add_product",
    description: "Add stock to inventory when user wants to increase product quantity",

    parameters: z.object({
      name: z.string().describe("Product name"),
      description: z.string().describe("Detailed description of the product"),
      stock: z.number().describe("Quantity to add"),
      price: z.number().describe("Purchase price of product"),
      selling_price: z.number().describe("Selling price of product"),
      category: z.string().describe("Product category"),
      gender: z
        .enum(["men","women","unisex"])
        .describe("Target gender for the product"),
    }),
    handler: async (args) => {
      dispatch(addProduct(args))
      return `Product ${args.name} added successfully`
    }
  })

  // get_product
  useFrontendTool({
    name: "get_product",
    description: "Find a specific product",
    parameters: z.object({
      name: z.string().describe("Product name"),
    }),
    handler: async (args) => {
      const result = await dispatch(searchProduct(args.name))
      const product = result.payload.products[0]
      if (!product) {
        return { message: `${args.name} not found` }
      }

      return {
        message: `${args.name} found`,
        product
      }
    }
  })

  // stock_add
  useFrontendTool({
    name: "add-stock",
    description: "Find a specific product",
    parameters: z.object({
      name: z.string().describe("Product name"),
      quantity: z.number().describe("Quantity to add")
    }),
    handler: async (args) => {
      const result = await dispatch(searchProduct(args.name))
      const product = result.payload.products[0]
      if (!product) {
        return { message: "Product not found" }
      }
      // // Check stock availability
      // if (product.stock < Number(args.quantity)) {
      //   return {
      //     message: `Only ${product.stock} units available`
      //   };
      // }
      // update stock
      await dispatch(stockIn({
        productId: product._id,
        quantity: Number(args.quantity)
      }));

      return {
        message: `${args.quantity} units added from ${product.name}`,
      }
    }
  })

  // stock_out
  useFrontendTool({
    name: "out-stock",
    description: "Find a specific product",
    parameters: z.object({
      name: z.string().describe("Product name"),
      quantity: z.number().describe("Quantity to add")
    }),
    handler: async (args) => {
      const result = await dispatch(searchProduct(args.name))
      const product = result.payload.products[0]
      if (!product) {
        return { message: "Product not found" }
      }
      // Check stock availability
      if (product.stock < Number(args.quantity)) {
        return {
          message: `Only ${product.stock} units available`
        };
      }
      // update stock
      await dispatch(stockOut({
        productId: product._id,
        quantity: Number(args.quantity)
      }));

      return {
        message: `${args.quantity} units out from ${product.name}`,
      }
    }
  })

  // total stock
  useFrontendTool({
    name:"total_stock",
    description:"get total stock right now",
    handler:async()=>{
      const total_stock = products.reduce((sum,p)=>sum+p.stock,0)
      
      return {message: `Total stock is ${total_stock}`,total_stock}
    }
  })
  return (
    <CopilotPopup
      instructions={`
                    You are a smart Inventory Management Assistant.

                    Your job is to help users add and manage products in their inventory in a simple and conversational way.

                    You can use this tool:

                    add_product(
                      name,
                      stock,
                      price,
                      selling_price,
                      category
                    )

                    Guidelines:

                    1. Use the add_product tool whenever the user wants to add a new product to inventory.

                    2. Required product details:
                      - Product Name
                      - Stock Quantity
                      - Purchase Price
                      - Selling Price
                      - Category

                    3. If the user provides all details, call the add_product tool immediately.

                    4. If any information is missing, politely ask only for the missing details.
                      Example:
                      "I can add the product for you. I just need the selling price."

                    5. Never call the tool with incomplete information.

                    6. Understand natural language.
                      Example:
                      - "Add 20 Nike shoes costing 500 and sell for 700 in footwear"
                      → Extract values and call tool.

                    7. If the user gives information step by step, remember previous details until all fields are collected.

                    8. Confirm the action after adding.
                      Example:
                      "Done. Your product has been added successfully."

                    9. Be helpful and conversational. Do not ask for information the user already provided.
                    `}
      labels={{
        title: "Inventory AI Assistant",
        initial: "Ask me about inventory",
      }}
    />
  );
}