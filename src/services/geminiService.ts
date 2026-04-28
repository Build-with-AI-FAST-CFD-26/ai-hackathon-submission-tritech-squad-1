import { GoogleGenAI, Type } from "@google/genai";
import { CognitiveAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are a Founder's Cognitive Twin. Your role is to act as a sharp, analytical strategic co-founder.
Analyze the provided input (messages, notes, task updates) and extract deep insights.

Focus on:
1. DECISION TRACKING: Extract explicit and implicit decisions.
2. CONFLICT DETECTION: Find contradictions between promises, features, deadlines, and current progress.
3. RISK IDENTIFICATION: Highlight missed follow-ups, overloaded schedules, and unrealistic commitments.
4. CONTEXT GAP ANALYSIS: Detect missing info or broken communication.
5. SMART RECOMMENDATIONS: Provide corrective actions and professional message drafts.

Style: Sharp, concise, strategic. No generic advice. Make hidden problems visible.`;

export async function analyzeFounderInput(input: string): Promise<CognitiveAnalysis> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: input }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          decisions: { type: Type.ARRAY, items: { type: Type.STRING } },
          conflicts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                description: { type: Type.STRING },
                evidence: { type: Type.STRING },
                impact: { type: Type.STRING },
              },
              required: ["type", "description", "evidence", "impact"],
            },
          },
          risks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                description: { type: Type.STRING },
                severity: { type: Type.STRING },
              },
              required: ["category", "description", "severity"],
            },
          },
          contextGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedActions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                task: { type: Type.STRING },
                rationale: { type: Type.STRING },
              },
              required: ["task", "rationale"],
            },
          },
          suggestedMessages: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                recipient: { type: Type.STRING },
                context: { type: Type.STRING },
                draft: { type: Type.STRING },
              },
              required: ["recipient", "context", "draft"],
            },
          },
        },
        required: ["summary", "decisions", "conflicts", "risks", "contextGaps", "suggestedActions", "suggestedMessages"],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No output from AI");
  return JSON.parse(text) as CognitiveAnalysis;
}
