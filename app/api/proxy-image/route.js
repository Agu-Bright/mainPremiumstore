import axios from "@node_modules/axios";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("imageUrl");

  if (!imageUrl) {
    return new Response(
      JSON.stringify({ success: false, message: "Image URL is required" }),
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const contentType = response.headers["content-type"];

    return new Response(response.data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "max-age=86400", // Cache for 1 day
      },
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch image" }),
      { status: 500 }
    );
  }
};
