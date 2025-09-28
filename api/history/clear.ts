import { createClient } from "../../lib/supabase/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers for cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow DELETE requests
  if (req.method !== "DELETE") {
    return res.status(405).json({
      error: "Method not allowed",
      message: "Only DELETE requests are supported",
    });
  }

  try {
    const supabase = await createClient();

    // Delete all translation history entries
    const { error } = await supabase
      .from("translation_history")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all records

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "All translation history cleared",
    });
  } catch (error) {
    console.error("Clear History API Error:", error);

    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: "An error occurred while clearing translation history",
      timestamp: new Date().toISOString(),
    });
  }
}
