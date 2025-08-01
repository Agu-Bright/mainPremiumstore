import connectDB from "@utils/connectDB";
import Wallet from "@models/wallet";
import Wallet2 from "@models/wallet2";
//get single restaurant
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const id = params.id;
    const wallet = await Wallet2.findOne({ user: id });
    if (!wallet) {
      return Response.json(
        { message: `No restaurant found with Id: ${id}` },
        { status: 404 }
      );
    }
    return Response.json({ balance: wallet.balance }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
