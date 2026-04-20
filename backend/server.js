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

function buildCartoonPrompt(theme = "princess") {
  const themeStyleMap = {
    princess: "storybook princess illustration with magical pastel elegance",
    fairyland: "whimsical fairy illustration with dreamy magical atmosphere",
    candyland: "whimsical candyland cartoon with playful pastel colors",
    superhero: "bold comic-style superhero cartoon with vibrant colors",
    adventure: "anime-inspired child adventure portrait with a cute fantasy creature companion, glowing magical energy effects, vibrant outdoor landscape, playful and heroic mood",
    classic: `
      soft illustrated portrait based on the original photo,
      preserve facial features and likeness,
      maintain natural proportions,
      keep original background recognizable,
      soft lighting and gentle warmth,
      clean and polished look,
      no heavy fantasy elements,
      subtle stylization, not exaggerated
    `
  };

  const baseStyle =
      themeStyleMap[theme] || "playful cartoon illustration";

  // 🔥 Only override for Minecraft
  const minecraftOverride = `
    THEME:
    - minecraft-inspired blocky cartoon style
    - simple square and geometric forms
    - bright playful colors
    - block-world background with grass, sky, cubes
    - fun, clean, game-like aesthetic
    - avoid soft pastel fantasy look
    - avoid magical glow
    - sharper, simpler shapes
      `.trim();

  const adventureOverride = `
    THEME:
    - anime-inspired child adventure style
    - include a small cute fantasy creature companion
    - creature should be small, floating, and friendly
    - consistent soft rounded shape, not complex
    - creature positioned close to the child’s shoulder or upper body, not above the head
    - avoid placing the creature near the top edge of the image
    - avoid placing the creature too close to the edge of the frame
    - scale of creature should be small but clearly visible
    - creature should appear as a friendly companion interacting with the child’s space
    - keep the child as the central focus, with the creature clearly secondary and nearby
    - glowing magical energy effects around subject
    - vibrant outdoor setting (grass, sky, hills)
    - playful, heroic, child-friendly mood
    - soft but vibrant colors
    - NOT realistic anime, still cartoon-friendly
    - avoid copyrighted characters
    - slightly larger, expressive eyes
    - keep eyes natural and proportional
    - avoid oversized anime eyes
    - maintain childlike facial proportions with soft round cheeks
    - preserve youthful features appropriate for a young child
    - avoid making the subject look older or more mature
    - keep face slightly round and soft, not sharp or angular
    `.trim(); 

  const defaultThemeBlock = `
    THEME:
    - ${baseStyle}
    - magical birthday invitation aesthetic
    - softly blurred whimsical background to focus on subject
      `.trim();

  let themeBlock;

  if (theme === "minecraft") {
    themeBlock = minecraftOverride;
  } else if (theme === "adventure") {
    themeBlock = adventureOverride;
  } else {
    themeBlock = defaultThemeBlock;
  }

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

${themeBlock}

IDENTITY (VERY IMPORTANT):
- prioritize realism of facial proportions while keeping cartoon style
- must look like the SAME PERSON
- preserve face shape, eyes, nose, and smile
- preserve hairstyle
- preserve pose and framing
- do NOT replace with a generic character
- soft magical glow around subject

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});