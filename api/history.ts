import { createClient } from "../lib/supabase/server";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CreateTranslationRequest } from "../types/translation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers for cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const supabase = await createClient();

    switch (req.method) {
      case "GET":
        // Get translation history (latest 10 entries)
        const { data: history, error: fetchError } = await supabase
          .from("translation_history")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);

        if (fetchError) {
          throw fetchError;
        }

        res.status(200).json({
          success: true,
          data: history || [],
          count: history?.length || 0,
        });
        break;

      case "POST":
        // Create new translation history entry
        const {
          original_text,
          translated_text,
          target_language,
        }: CreateTranslationRequest = req.body;

        // Validate input
        if (!original_text || !translated_text || !target_language) {
          return res.status(400).json({
            error: "Missing required fields",
            message:
              "original_text, translated_text, and target_language are required",
          });
        }

        if (original_text.length > 1000) {
          return res.status(400).json({
            error: "Text too long",
            message: "Original text must be less than 1000 characters",
          });
        }

        const { data: newEntry, error: insertError } = await supabase
          .from("translation_history")
          .insert({
            original_text,
            translated_text,
            target_language,
          })
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        res.status(201).json({
          success: true,
          data: newEntry,
          message: "Translation saved to history",
        });
        break;

      case "DELETE":
        // Delete translation history entry by ID
        const { id } = req.query;

        if (!id || typeof id !== "string") {
          return res.status(400).json({
            error: "Missing or invalid ID",
            message: "A valid translation ID is required",
          });
        }

        const { error: deleteError } = await supabase
          .from("translation_history")
          .delete()
          .eq("id", id);

        if (deleteError) {
          throw deleteError;
        }

        res.status(200).json({
          success: true,
          message: "Translation deleted from history",
        });
        break;

      default:
        res.status(405).json({
          error: "Method not allowed",
          message: `Method ${req.method} is not supported`,
        });
    }
  } catch (error) {
    console.error("History API Error:", error);

    res.status(500).json({
      error: "Internal server error",
      message: "An error occurred while processing your request",
      timestamp: new Date().toISOString(),
    });
  }
}
