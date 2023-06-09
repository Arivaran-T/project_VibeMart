import { connectToDB } from '@utils/database';
import Product from '@models/product';
export const POST = async (req) => {
  const { name, price, details, tag, userId } = await req.json();
  try {
    await connectToDB();
    const newProduct = new Product({
      name: name,
      price: price,
      details: details,
      tag: tag,
      creator: userId,
    });

    await newProduct.save();

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response('Failed to Add new Product', { status: 500 });
  }
};
