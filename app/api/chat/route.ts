import { NextResponse } from 'next/server';
import { client } from "@/lib/sanity.client";
import { 
  projectsQuery, 
  educationQuery, 
  workQuery, 
  certificatesQuery, 
  proficienciesQuery 
} from "@/lib/sanity.queries";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not found' }, { status: 500 });
    }

    // "Training" Phase: Fetch live website data from Sanity
    const [projects, education, work, certificates, proficiencies] = await Promise.all([
      client.fetch(projectsQuery),
      client.fetch(educationQuery),
      client.fetch(workQuery),
      client.fetch(certificatesQuery),
      client.fetch(proficienciesQuery),
    ]);

    // Format the knowledge base for the model
    const websiteData = {
      projects: projects?.map((p: any) => ({ title: p.title, description: p.description })),
      experience: work?.map((w: any) => ({ role: w.role, company: w.company, desc: w.description })),
      education: education?.map((e: any) => ({ degree: e.degree, school: e.institution })),
      skills: proficiencies?.map((s: any) => s.name)
    };

    const systemPrompt = `
      You are SN-PITS, the AI Race Engineer for Safwan Nazir's portfolio.
      
      CRITICAL RULES:
      1. BE CONCISE: Responses must be "radio-snappy" (max 30-50 words). 
      2. DIRECT ANSWERS: Don't list everything Safwan does; focus ONLY on what the user asked.
      3. PERSONA: You are a high-speed Race Engineer. Use short, punchy radio-style messages.
      
      KNOWLEDGE BASE:
      ${JSON.stringify(websiteData)}
      
      Safwan Profile:
      - Role: Software Developer
      - Aesthetic: Racing / F1 ("SN911").
      
      Mission:
      - Use the KNOWLEDGE BASE to give ultra-accurate details.
      - If you don't know, say "Telemetry is unclear on that one, boss. Check with Safwan directly."
      - Example style: "Copy that. Safwan mastered Next.js and GSAP for the SN911 build. What's the next move?"
    `;

    // Map history and limit to last 4 messages to save tokens (since we added KNOWLEDGE BASE)
    const formattedHistory = history.slice(-4).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Prioritize models
    const modelsToTry = [
      { name: 'gemini-2.0-flash-lite', version: 'v1beta' },
      { name: 'gemini-flash-lite-latest', version: 'v1beta' },
      { name: 'gemini-2.0-flash', version: 'v1beta' }
    ];

    let response;
    let data;
    let lastError = '';

    for (const model of modelsToTry) {
      try {
        response = await fetch(
          `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { role: 'user', parts: [{ text: systemPrompt }] },
                { role: 'model', parts: [{ text: "Copy that. SN-Pits is online and ready for the race. How can I assist the driver today?" }] },
                ...formattedHistory,
                { role: 'user', parts: [{ text: message }] }
              ],
            }),
          }
        );

        data = await response.json();
        
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          // Success! Break the loop
          break;
        } else {
          lastError = data.error?.message || 'Model call failed';
          console.warn(`Attempt with ${model.name} (${model.version}) failed: ${lastError}`);
        }
      } catch (err: any) {
        lastError = err.message || 'Fetch failed';
        console.warn(`Fetch error for ${model.name}: ${lastError}`);
      }
    }

    if (!data || !data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('All Gemini attempts failed. Last error:', lastError);
      return NextResponse.json({ 
        error: lastError || 'No response from the factory line.',
        text: "Box Box! Loss of signal from all frequencies. Telemetry data is corrupted." 
      }, { status: 404 });
    }

    const text = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
