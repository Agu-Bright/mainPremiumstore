import connectDB from "@utils/connectDB";
import Category from "@models/Category";

export const GET = async (req, res) => {
  try {
    await connectDB;
    const categories = await Category.find();
    return new Response(JSON.stringify({ success: true, categories }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
