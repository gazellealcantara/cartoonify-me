import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import OpenAI, { toFile } from "openai";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Cartoonify backend is running");
});

// ✨ IMPROVED PROMPT (balanced: style + identity)
function buildCartoonPrompt(theme = "princess") {
  const themeStyleMap = {
    princess: "storybook princess illustration with magical pastel elegance",
    candy: "whimsical candyland cartoon with playful pastel colors",
    superhero: "bold comic-style superhero cartoon with vibrant colors"
  };

  const themeStyle = themeStyleMap[theme] || "playful cartoon illustration";

  return `
Transform this uploaded photo into a highly stylized 2D cartoon portrait.

CRITICAL STYLE:
- strong 2D cartoon illustration
- clearly hand-drawn, not photorealistic
- clean line art outlines
- cel shading (flat + soft gradients)
- simplified but recognizable face
- expressive eyes but proportional to real human face
- avoid overly exaggerated anime features
- smooth, soft pastel-friendly colors
- polished digital illustration
- cute, charming, child-friendly style

THEME:
- ${themeStyle}
- magical birthday invitation aesthetic

IDENTITY (VERY IMPORTANT):
- prioritize realism of facial proportions while keeping cartoon style
- must look like the SAME PERSON
- preserve face shape, eyes, nose, and smile
- preserve hairstyle
- preserve pose and framing
- do NOT replace with a generic character

AVOID:
- photorealism
- realistic skin texture
- changing identity
- adding extra people
- text or watermark
- distortion

FINAL:
A cartoon version of the SAME person styled as a ${theme} character, suitable for a birthday invitation.
  `.trim();
}

app.post("/cartoonify", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No photo uploaded." });
    }

    const theme = req.body.theme || "princess";
    const prompt = buildCartoonPrompt(theme);

    const imageFile = await toFile(
      req.file.buffer,
      req.file.originalname || "photo.png",
      {
        type: req.file.mimetype || "image/png",
      }
    );

    const result = await openai.images.edit({
      model: "gpt-image-1.5",
      image: imageFile,
      prompt,
      size: "1024x1024",
      quality: "high",
      output_format: "png",
    });

    const imageBase64 = result.data?.[0]?.b64_json;

    if (!imageBase64) {
      throw new Error("No image returned from OpenAI.");
    }

    return res.json({
      success: true,
      imageBase64,
      mimeType: "image/png",
    });
  } catch (error) {
    console.error("Cartoonify error:", error);

    return res.status(500).json({
      error: "Failed to cartoonify image.",
      details: error?.message || "Unknown error",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
