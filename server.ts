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

  // Permissive CORS, CORP, and COEP headers to prevent COEP/CORP blocking on custom domains, CDNs (Cloudflare), and proxies
  app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
  });

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

  const CURATED_MCQ_FALLBACKS: Record<string, any[]> = {
    polity: [
      {
        topic: "भारतीय संविधान व संसद",
        subtopic: "संसदीय समित्या",
        exam: "Rajyaseva",
        difficulty: "Hard",
        questionMr: "लोकलेखा समितीबाबत (Public Accounts Committee - PAC) खालील विधाने विचारात घ्या:\n(अ) या समितीत एकूण २२ सदस्य असतात (१५ लोकसभा आणि ७ राज्यसभा).\n(ब) कोणताही मंत्री या समितीचा सदस्य होण्यास पात्र नसतो.\n(क) या समितीच्या अध्यक्षांची नियुक्ती लोकसभा अध्यक्ष विरोधी पक्षातील सदस्यांमधून करतात.\nवरीलपैकी कोणती विधाने सत्य आहेत?",
        questionEn: "Consider the following statements regarding the Public Accounts Committee (PAC):\n(a) It consists of 22 members (15 from Lok Sabha and 7 from Rajya Sabha).\n(b) A minister cannot be elected as a member of the committee.\n(c) The Chairman of the committee is appointed by the Speaker from the opposition.\nWhich of the above statements are correct?",
        optionsMr: ["फक्त (अ) आणि (ब)", "फक्त (ब) आणि (क)", "फक्त (अ) आणि (क)", "सर्व विधाने सत्य (अ, ब आणि क)"],
        optionsEn: ["Only (a) and (b)", "Only (b) and (c)", "Only (a) and (c)", "All statements (a, b and c) are correct"],
        correctAnswerIndex: 3,
        explanationMr: "लोकलेखा समिती ही संसदेची सर्वात जुनी वित्तीय समिती आहे (स्थापना १९२१). यात २२ सदस्य असून मंत्री सदस्य होऊ शकत नाही. १९६७ पासून अध्यक्षांची नियुक्ती विरोधी पक्षातून करण्याची प्रथा आहे.",
        explanationEn: "PAC was set up in 1921. It has 22 members (15 LS + 7 RS), ministers cannot be members, and since 1967 the chairman is customarily chosen from the opposition.",
        reference: "एम. लक्ष्मीकांत - भारतीय राज्यव्यवस्था (संसदीय समित्या)",
      },
      {
        topic: "मूलभूत हक्क व न्यायालयीन अधिकार",
        subtopic: "कलम ३२ व रिट अधिकार",
        exam: "Both",
        difficulty: "Moderate",
        questionMr: "भारतीय संविधानातील कलम ३२ ला 'संविधानाचा आत्मा आणि हृदय' (Heart and Soul of the Constitution) असे कोणाद्वारे संबोधण्यात आले होते?",
        questionEn: "Who termed Article 32 as the 'Heart and Soul of the Constitution' of India?",
        optionsMr: ["पंडित जवाहरलाल नेहरू", "डॉ. बी. आर. आंबेडकर", "सरदार वल्लभभाई पटेल", "डॉ. राजेंद्र प्रसाद"],
        optionsEn: ["Pt. Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Vallabhbhai Patel", "Dr. Rajendra Prasad"],
        correctAnswerIndex: 1,
        explanationMr: "डॉ. बाबासाहेब आंबेडकरांनी संविधान सभेत घटनात्मक उपायांच्या अधिकाराला (कलम ३२) 'संविधानाचा आत्मा आणि हृदय' म्हटले होते.",
        explanationEn: "Dr. B.R. Ambedkar described Article 32 (Right to Constitutional Remedies) as the very soul of the Constitution and its very heart.",
        reference: "संविधान सभा वादविवाद / एम. लक्ष्मीकांत",
      }
    ],
    maharashtra_history: [
      {
        topic: "महाराष्ट्रातील समाजसुधारक",
        subtopic: "महात्मा जोतीराव फुले",
        exam: "Both",
        difficulty: "Hard",
        questionMr: "महात्मा जोतीराव फुले यांनी १ जानेवारी १८४८ रोजी पुण्यातील भिडे वाड्यात मुलींची पहिली शाळा सुरू केली. या शाळेतील पहिल्या शिक्षिका व मुख्याध्यापिका कोण होत्या?",
        questionEn: "Mahatma Jyotirao Phule started India's first school for girls at Bhide Wada, Pune on 1 January 1848. Who served as its pioneering first teacher and headmistress?",
        optionsMr: ["सावित्रीबाई फुले", "फातिमा शेख", "ताराबाई शिंदे", "पंडिता रमाबाई"],
        optionsEn: ["Savitribai Phule", "Fatima Sheikh", "Tarabai Shinde", "Pandita Ramabai"],
        correctAnswerIndex: 0,
        explanationMr: "सावित्रीबाई फुले या भारताच्या पहिल्या महिला शिक्षिका व मुख्याध्यापिका होत्या. त्यांनी स्त्री शिक्षणाचा पाया रचला.",
        explanationEn: "Krantijyoti Savitribai Phule became the first female teacher and headmistress in modern India.",
        reference: "डॉ. धनंजय कीर - महात्मा फुले चरित्र",
      }
    ],
    maharashtra_geography: [
      {
        topic: "महाराष्ट्राची प्राकृतिक रचना",
        subtopic: "पर्वत शिखरे",
        exam: "Both",
        difficulty: "Moderate",
        questionMr: "सह्याद्री पर्वतातील महाराष्ट्रातील सर्वोच्च शिखर 'कळसूबाई' (१,६४६ मीटर) हे कोणत्या दोन जिल्ह्यांच्या सीमेवर / कोणत्या तालुक्यात येते?",
        questionEn: "Mount Kalsubai (1,646 meters), the highest peak in Maharashtra, is situated in which region?",
        optionsMr: ["अहमदनगर (अकोले तालुका)", "पुणे (जुन्नर तालुका)", "नाशिक (इगतपुरी)", "सातारा (महाबळेश्वर)"],
        optionsEn: ["Ahmednagar (Akole taluka)", "Pune (Junnar taluka)", "Nashik (Igatpuri)", "Satara (Mahabaleshwar)"],
        correctAnswerIndex: 0,
        explanationMr: "कळसूबाई हे सह्याद्रीतील सर्वोच्च शिखर (१६४६ मी) अहमदनगर जिल्ह्यातील अकोले तालुक्यात येते.",
        explanationEn: "Kalsubai peak (1646 m) is located in Akole taluka of Ahmednagar district on Sahyadri range.",
        reference: "ए. बी. सवदी - महाराष्ट्राचा भूगोल",
      }
    ],
    general_science: [
      {
        topic: "सामान्य विज्ञान व आरोग्यशास्त्र",
        subtopic: "मानवी शरीर व जीवनसत्त्वे",
        exam: "Both",
        difficulty: "Moderate",
        questionMr: "खालीलपैकी कोणते जीवनसत्त्व पाण्यात विरघळणारे (Water-Soluble) आहे?",
        questionEn: "Which of the following vitamins is water-soluble?",
        optionsMr: ["जीवनसत्त्व सी (Vitamin C)", "जीवनसत्त्व ए (Vitamin A)", "जीवनसत्त्व डी (Vitamin D)", "जीवनसत्त्व के (Vitamin K)"],
        optionsEn: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin K"],
        correctAnswerIndex: 0,
        explanationMr: "जीवनसत्त्व B आणि C पाण्यात विरघळतात. तर A, D, E आणि K हे मेदात (Fat-soluble) विरघळतात.",
        explanationEn: "Vitamins B-complex and C are water-soluble; Vitamins A, D, E, and K are fat-soluble.",
        reference: "स्टेट बोर्ड सामान्य विज्ञान इयत्ता ८ वी व ९ वी",
      }
    ]
  };

  app.post("/api/generate-mcq", async (req, res) => {
    const {
      subject = "polity",
      topic = "",
      difficulty = "Moderate",
      examType = "Both",
    } = req.body || {};

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const list = CURATED_MCQ_FALLBACKS[subject] || CURATED_MCQ_FALLBACKS.polity;
      const picked = list[Math.floor(Math.random() * list.length)];
      return res.json({
        success: true,
        source: "curated_fallback",
        mcq: {
          ...picked,
          subjectId: subject,
          exam: examType || picked.exam,
          difficulty: difficulty || picked.difficulty,
        },
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Generate an authentic, high-yield MPSC exam multiple choice question (MCQ) for the subject "${subject}" ${
        topic ? `on the topic "${topic}"` : ""
      } at ${difficulty} difficulty level for ${examType} prelims/mains.
Return ONLY valid JSON strictly adhering to this structure:
{
  "topic": "topic name in Marathi / English",
  "subtopic": "subtopic name",
  "questionMr": "Question text in clear Marathi with official civil service terminology",
  "questionEn": "Question text in crisp English",
  "optionsMr": ["Option 1 in Marathi", "Option 2 in Marathi", "Option 3 in Marathi", "Option 4 in Marathi"],
  "optionsEn": ["Option 1 in English", "Option 2 in English", "Option 3 in English", "Option 4 in English"],
  "correctAnswerIndex": 0,
  "explanationMr": "Detailed analytical explanation in Marathi quoting reference facts",
  "explanationEn": "Detailed explanation in English",
  "reference": "Authoritative standard book name (e.g. M. Laxmikanth, A.B. Savadi, Dr. Kathare, Ramesh Singh)"
}`;

      let generatedJson: any = null;

      for (const modelName of CANDIDATE_MODELS) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              temperature: 0.3,
            },
          });

          if (response.text) {
            generatedJson = JSON.parse(response.text);
            break;
          }
        } catch (modelErr: any) {
          console.warn(`[GenerateMCQ] Model ${modelName} error:`, modelErr?.message || modelErr);
        }
      }

      if (generatedJson && generatedJson.questionMr && Array.isArray(generatedJson.optionsMr)) {
        return res.json({
          success: true,
          source: "gemini_ai",
          mcq: {
            ...generatedJson,
            subjectId: subject,
            exam: examType,
            difficulty: difficulty,
          },
        });
      }

      const list = CURATED_MCQ_FALLBACKS[subject] || CURATED_MCQ_FALLBACKS.polity;
      const fallback = list[Math.floor(Math.random() * list.length)];
      return res.json({
        success: true,
        source: "curated_fallback",
        mcq: {
          ...fallback,
          subjectId: subject,
          exam: examType,
          difficulty: difficulty,
        },
      });
    } catch (err: any) {
      console.warn("[GenerateMCQ] Handled error:", err?.message || err);
      const list = CURATED_MCQ_FALLBACKS[subject] || CURATED_MCQ_FALLBACKS.polity;
      const fallback = list[Math.floor(Math.random() * list.length)];
      return res.json({
        success: true,
        source: "curated_fallback",
        mcq: {
          ...fallback,
          subjectId: subject,
          exam: examType,
          difficulty: difficulty,
        },
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
