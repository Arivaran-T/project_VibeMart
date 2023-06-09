import Product from '@models/product';
import { connectToDB } from '@utils/database';

//Read a Product
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.id).populate('creator');

    if (!product) return new Response('No Product Found!!!', { status: 404 });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all Products', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { name, price, details, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing product by ID
    const existingProduct = await Product.findById(params.id);

    if (!existingProduct) {
      return new Response('Product not found', { status: 404 });
    }

    // Update the product with new data
    existingProduct.name = name;
    existingProduct.price = price;
    existingProduct.details = details;
    existingProduct.tag = tag;

    await existingProduct.save();

    return new Response('Successfully updated the Product', { status: 200 });
  } catch (error) {
    return new Response('Error Updating Product', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the product by ID and remove it
    await Product.findByIdAndRemove(params.id);

    return new Response('Product deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting Product', { status: 500 });
  }
};
