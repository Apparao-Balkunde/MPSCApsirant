import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Models to attempt in order of priority; if gemini-3.8-flash experiences temporary 503 spikes, seamlessly cascade
const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
];

function buildComprehensiveFallback(params: {
  language: string;
  subject?: string;
  questionText?: string;
  options?: any[];
  correctAnswer?: string;
  explanation?: string;
  studentQuery?: string;
}): string {
  const { language, subject, questionText, options, correctAnswer, explanation, studentQuery } = params;
  const isMr = language === "mr";

  if (isMr) {
    const optionsSection =
      options && Array.isArray(options) && options.length > 0
        ? `\n**३. पर्यायांचे विश्लेषण (Option Breakdown):**\n` +
          options
            .map(
              (opt, idx) =>
                `• **पर्याय (${idx + 1}):** ${opt} ${
                  opt === correctAnswer ? "✅ (अचूक उत्तर)" : "❌ (अयोग्य)"
                }`
            )
            .join("\n") +
          "\n"
        : "";

    return `📌 **एमपीएससी मार्गदर्शक विश्लेषण (MPSC Mentor Guidance):**

**१. थेट निष्कर्ष व अचूक पर्याय (Core Concept):**
• **योग्य पर्याय:** ${correctAnswer || "निश्चित अचूक पर्याय"}
• **विषय घटक:** ${subject || "सामान्य अध्ययन (General Studies)"}

**२. सविस्तर संकल्पना स्पष्टीकरण (Concept & Context):**
${explanation || "हा प्रश्न महाराष्ट्र लोकसेवा आयोगाच्या (MPSC) अभ्यासक्रमातील महत्त्वपूर्ण संकल्पनेवर आधारित आहे."}
${optionsSection}
**४. एमपीएससी परीक्षेसाठी महत्त्वाची रणनीती व स्मरण पद्धती (Exam Tips):**
• **संदर्भ ग्रंथ:** या घटकासाठी महाराष्ट्र राज्य पाठ्यपुस्तक मंडळ (इयत्ता ११ वी/१२ वी) तसेच मानक संदर्भ ग्रंथ (एम. लक्ष्मीकांत, के.ए. खातीब, रंजन कोळंबे) मधील तथ्यांची वारंवार उजळणी करा.
• **एलिमिनेशन पद्धती:** प्रश्नातील 'केवळ' (Only), 'सर्व' (All), 'नेहमी' (Always) किंवा 'कधीही नाही' (Never) यासारख्या टोकाच्या विधानांवर संशय घ्या; एमपीएससी परीक्षेत असे पर्याय बहुतांशी चुकीचे असतात.${
      studentQuery && studentQuery !== "कृपया सविस्तर मार्गदर्शन करा."
        ? `\n\n💡 **तुमच्या प्रश्नाबाबत (${studentQuery}):** या मुद्द्यावर थेट कलमे, कालानुक्रम आणि तुलनात्मक वैशिष्ट्यांवर भर द्या.`
        : ""
    }`;
  } else {
    const optionsSection =
      options && Array.isArray(options) && options.length > 0
        ? `\n**3. Option Breakdown:**\n` +
          options
            .map(
              (opt, idx) =>
                `• **Option (${idx + 1}):** ${opt} ${
                  opt === correctAnswer ? "✅ (Correct Choice)" : "❌ (Distractor)"
                }`
            )
            .join("\n") +
          "\n"
        : "";

    return `📌 **MPSC Exam Mentor Guidance:**

**1. Core Concept & Key Finding:**
• **Correct Option:** ${correctAnswer || "Designated Correct Answer"}
• **Subject Area:** ${subject || "General Studies"}

**2. In-Depth Explanation:**
${explanation || "This question tests core syllabus concepts prescribed by the Maharashtra Public Service Commission."}
${optionsSection}
**4. MPSC High-Yield Exam Strategy & Tricks:**
• **Standard References:** Revise Maharashtra State Board textbooks alongside standard reference materials (M. Laxmikanth, K.A. Khatib, Ramesh Singh).
• **Option Elimination:** Watch out for extreme qualifiers like 'Only', 'Always', or 'Never' which are frequently distractors in civil services prelims.${
      studentQuery && studentQuery !== "कृपया सविस्तर मार्गदर्शन करा."
        ? `\n\n💡 **Regarding your query (${studentQuery}):** For this topic, focus on precise constitutional articles, chronologies, and administrative bodies.`
        : ""
    }`;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "MPSC Aspirant Prep" });
  });

  app.post("/api/doubt-solver", async (req, res) => {
    const {
      questionText,
      options,
      correctAnswer,
      explanation,
      studentQuery,
      subject,
      language = "mr",
    } = req.body || {};

    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        const fallbackText = buildComprehensiveFallback({
          language,
          subject,
          questionText,
          options,
          correctAnswer,
          explanation,
          studentQuery,
        });
        return res.json({ answer: fallbackText, success: true, source: "curated_guide" });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const langInstruction =
        language === "mr"
          ? "Respond in clear, encouraging Marathi (मराठी) with English technical terms in brackets where helpful for MPSC aspirants."
          : "Respond in crisp, professional English suitable for civil services exam preparation.";

      const systemPrompt = `You are "MPSC Margdarshak" (मार्गदर्शक), an expert mentor and senior faculty for Maharashtra Public Service Commission (MPSC Rajyaseva & Combine Group B & C Prelims and Mains) examinations.
Your duty is to explain exam questions clearly, analyze why each choice is right or wrong, provide historical/constitutional context from Maharashtra State Board books, YCMOU, and standard references (M. Laxmikanth, Katte/Bhalerao, Ramesh Singh, etc.), and provide memorable memory aids (mnemonics/shortcuts).

Structure your response with:
1. **थेट निष्कर्ष / Direct Core Concept** (Key takeaway)
2. **पर्यायांचे विश्लेषण / Analysis of Options** (Why the correct option holds and why distractors are incorrect)
3. **MPSC संदर्भ व स्मरण पद्धती / MPSC Exam Tip & Mnemonic** (A practical mnemonic or high-yield revision trick)
Keep the tone motivating, disciplined, and focused strictly on scoring marks in MPSC.
${langInstruction}`;

      const userContent = `Subject: ${subject || "General Studies"}
Question: ${questionText || "N/A"}
Options: ${options ? JSON.stringify(options) : "N/A"}
Official Correct Answer: ${correctAnswer || "N/A"}
Base Explanation: ${explanation || "None"}
Student's Specific Doubt/Query: ${studentQuery || "Please explain this question in depth with exam tips."}

Please guide the aspirant thoroughly.`;

      let mentorAnswer: string | null = null;

      // Try candidate models with seamless fallback to handle temporary 503 high demand spikes
      for (const modelName of CANDIDATE_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: userContent,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.4,
            },
          });

          if (response.text && response.text.trim()) {
            mentorAnswer = response.text;
            break;
          }
        } catch (modelErr: any) {
          const errMsg = String(modelErr?.message || modelErr);
          const isDemandSpike =
            errMsg.includes("503") ||
            errMsg.includes("429") ||
            errMsg.includes("UNAVAILABLE") ||
            errMsg.includes("demand") ||
            errMsg.includes("overloaded");

          console.warn(
            `[DoubtSolver] Model ${modelName} encountered ${
              isDemandSpike ? "temporary demand spike (503/429)" : "issue"
            }. Attempting fallback...`
          );

          if (isDemandSpike) {
            // Short backoff before trying next model
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }
      }

      if (!mentorAnswer) {
        mentorAnswer = buildComprehensiveFallback({
          language,
          subject,
          questionText,
          options,
          correctAnswer,
          explanation,
          studentQuery,
        });
      }

      return res.json({
        answer: mentorAnswer,
        success: true,
      });
    } catch (error: any) {
      console.warn("[DoubtSolver] Non-blocking fallback triggered:", error?.message || error);
      const fallbackText = buildComprehensiveFallback({
        language,
        subject,
        questionText,
        options,
        correctAnswer,
        explanation,
        studentQuery,
      });

      return res.json({
        answer: fallbackText,
        success: true,
        source: "curated_guide",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MPSC Aspirant Prep Server running on port ${PORT}`);
  });
}

startServer();
