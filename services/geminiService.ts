
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getPayrollInsights = async (data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As an HR Financial Analyst, analyze this payroll data for a Bangladeshi company and provide a concise summary including:
        1. Total Payroll Cost Trend
        2. Departmental Efficiency
        3. Anomalies (High OT, High Absenteeism)
        4. Budget Recommendations
        
        Data: ${JSON.stringify(data)}`,
      config: {
        temperature: 0.7,
        systemInstruction: "You are an expert HR Consultant specialized in Bangladeshi corporate labor laws and payroll dynamics. Keep insights professional and actionable."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Unable to generate insights at this time.";
  }
};
