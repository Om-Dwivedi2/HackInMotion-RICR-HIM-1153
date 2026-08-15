import { envConfig } from '../config/env.config.js';

const callOpenRouter = async (prompt) => {
  if (!envConfig.openRouterApiKey) {
    throw new Error('OPENROUTER_API_KEY is not defined in environment variables');
  }

  const headers = {
    'Authorization': `Bearer ${envConfig.openRouterApiKey}`,
    'Content-Type': 'application/json',
  };

  if (envConfig.openRouterSiteUrl) {
    headers['HTTP-Referer'] = envConfig.openRouterSiteUrl;
  }
  if (envConfig.openRouterSiteName) {
    headers['X-Title'] = envConfig.openRouterSiteName;
  }

  // Model fallback chain
  const candidateModels = [
    envConfig.openRouterModel,
    'openai/gpt-4o-mini',
    'anthropic/claude-3-haiku',
    'meta-llama/llama-3.3-70b-instruct'
  ].filter((m, idx, arr) => m && arr.indexOf(m) === idx);

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const body = JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2500,
      });

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers,
        body,
        signal: AbortSignal.timeout(45000)
      });

      if (!response.ok) {
        let errorBody = '';
        try {
          errorBody = await response.text();
        } catch (e) {}

        console.warn(`[OpenRouter Warning] Model ${model} returned status ${response.status}:`, errorBody);

        if (response.status === 401) {
          throw new Error('AI Service Configuration Error: Unauthorized. Check API Key.');
        } else if (response.status === 402) {
          throw new Error('AI Service Provider Error: Payment Required or Insufficient Credits.');
        }

        // For other statuses (like 404 or 429), try next candidate model
        lastError = new Error(`AI Service Request Failed for model ${model} (Status: ${response.status})`);
        continue;
      }

      const data = await response.json();
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        throw new Error('Invalid response structure from AI Provider');
      }

      return data.choices[0].message.content;
    } catch (err) {
      if (err.message?.includes('Unauthorized') || err.message?.includes('Payment Required')) {
        throw err;
      }
      console.warn(`[OpenRouter Model ${model} Error]:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('All AI models failed to respond.');
};

const extractJson = (text) => {
  if (!text) throw new Error('Empty response received from AI service');
  
  let cleanText = text.trim();
  
  // Strip markdown code block wrappers
  if (cleanText.startsWith('```json')) cleanText = cleanText.substring(7);
  else if (cleanText.startsWith('```')) cleanText = cleanText.substring(3);
  if (cleanText.endsWith('```')) cleanText = cleanText.substring(0, cleanText.length - 3);
  cleanText = cleanText.trim();

  // Try direct parse
  try {
    return JSON.parse(cleanText);
  } catch (directError) {
    // Attempt substring extraction between first { and last }
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      const bracketJson = cleanText.substring(firstBrace, lastBrace + 1);
      return JSON.parse(bracketJson);
    }
    
    // Attempt substring extraction between first [ and last ]
    const firstBracket = cleanText.indexOf('[');
    const lastBracket = cleanText.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket > firstBracket) {
      const arrayJson = cleanText.substring(firstBracket, lastBracket + 1);
      return JSON.parse(arrayJson);
    }

    throw directError;
  }
};

export const parseResumeText = async (rawText) => {
  try {
    const prompt = `
      You are an expert ATS (Applicant Tracking System) parser.
      Extract and structure the following raw resume text into JSON format.

      CRITICAL INSTRUCTIONS:
      - Return ONLY valid JSON, do not include markdown blocks like \`\`\`json or \`\`\`.
      - Do not invent missing information. Use empty arrays or null values when information is absent.
      - Preserve actual evidence and avoid fabricating skills, companies, degrees, experience, or certifications.
      - Normalize obvious terminology (e.g., "Mongo" -> "MongoDB") but preserve the source evidence.

      The JSON must perfectly match this structure:
      {
        "personalInfo": { "name": "Applicant Full Name", "email": "Email if present", "phone": "Phone if present" },
        "summary": "Professional summary or objective if present, otherwise null",
        "skills": [
          { "name": "Skill Name", "category": "Category like 'Language', 'Framework', 'Database', 'Tool', etc." }
        ],
        "education": [
          { "institution": "Name of university/school", "degree": "Degree name", "fieldOfStudy": "Major/Field", "startDate": "YYYY-MM-DD or null", "endDate": "YYYY-MM-DD or null" }
        ],
        "experience": [
          { "company": "Company Name", "jobTitle": "Job Title", "startDate": "YYYY-MM-DD or null", "endDate": "YYYY-MM-DD or null", "description": ["Bullet point 1", "Bullet point 2"] }
        ],
        "projects": [
          { "name": "Project Name", "description": "Project Description", "technologies": ["Tech 1", "Tech 2"] }
        ],
        "certifications": ["Certification 1", "Certification 2"],
        "achievements": ["Achievement 1", "Achievement 2"]
      }

      Raw Resume Text:
      """
      ${rawText}
      """
    `;

    const textResponse = await callOpenRouter(prompt);
    return extractJson(textResponse);
  } catch (error) {
    console.error('OpenRouter Resume Parsing Error:', error);
    throw new Error(error.message || 'Failed to parse resume using AI');
  }
};

export const parseJobDescriptionText = async (rawText) => {
  try {
    const prompt = `
      You are an expert HR recruiter and tech talent evaluator.
      Extract and structure the following raw job description text into JSON format.

      CRITICAL INSTRUCTIONS:
      - Return ONLY valid JSON, do not include markdown blocks like \`\`\`json or \`\`\`.
      - Extract only requirements supported by the actual JD. Do not use a hardcoded list of skills.
      - Do not invent missing information. Use empty arrays or null values when information is absent.
      - Normalize obvious terminology (e.g., "Mongo" -> "MongoDB").
      
      The JSON must perfectly match this structure:
      {
        "skills": ["List of explicitly required or preferred technical skills"],
        "keywords": ["Important non-technical keywords, methodologies, e.g., Agile, CI/CD, REST APIs"],
        "responsibilities": ["Key responsibilities of the role"],
        "experience": ["Experience expectations, e.g., '3+ years with Node.js', '5 years overall backend experience'"],
        "education": ["Education expectations, e.g., 'B.S. in Computer Science', 'Master\\'s preferred'"]
      }

      Raw Job Description Text:
      """
      ${rawText}
      """
    `;

    const textResponse = await callOpenRouter(prompt);
    return extractJson(textResponse);
  } catch (error) {
    console.error('OpenRouter JD Parsing Error:', error);
    throw new Error(error.message || 'Failed to parse job description using AI');
  }
};

export const analyzeResumeVsJobWithAI = async (resumeData, jdData, targetContext) => {
  try {
    const prompt = `
      You are an expert technical recruiter and ATS system.
      Your task is to deeply analyze a candidate's resume against a job description.

      CRITICAL INSTRUCTIONS:
      - Return ONLY valid JSON, do not include markdown blocks like \`\`\`json or \`\`\`.
      - Be objective and strict. Do not invent missing skills.
      - Calculate a realistic overall match score between 0 and 100.
      - Provide sub-scores (0-100) for skills, keywords, experience, and education.

      Resume Data:
      ${JSON.stringify(resumeData, null, 2)}

      Job Requirements:
      ${JSON.stringify(jdData, null, 2)}

      Target Context:
      Role: ${targetContext.role}
      Company: ${targetContext.company}

      The JSON MUST perfectly match this structure:
      {
        "matchScore": {
          "score": <0-100 number>,
          "label": "Strong Match" | "Moderate Match" | "Low Match",
          "breakdown": {
            "skills": <0-100 number>,
            "keywords": <0-100 number>,
            "experience": <0-100 number>,
            "education": <0-100 number>
          }
        },
        "skillAnalysis": {
          "matched": [{ "skill": "Skill Name", "evidence": "Where it was found" }],
          "weak": [{ "skill": "Skill Name", "evidence": "Mentioned context", "reason": "Why it's weak" }],
          "missing": [{ "skill": "Skill Name", "priority": "high" | "medium" | "low", "reason": "Why it's important" }]
        },
        "keywordAnalysis": {
          "matched": ["keyword1", "keyword2"],
          "weak": ["keyword3"],
          "missing": ["keyword4"]
        },
        "experienceProjectFit": {
          "experience": { "level": "strong" | "moderate" | "weak" | "poor", "explanation": "..." },
          "projects": { "level": "strong" | "moderate" | "weak" | "poor", "explanation": "..." }
        },
        "strengths": ["Strength 1", "Strength 2"],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "recommendations": [
          { "title": "Actionable title", "description": "Specific action", "priority": "high" | "medium" | "low" }
        ]
      }
    `;

    const textResponse = await callOpenRouter(prompt);
    return extractJson(textResponse);
  } catch (error) {
    console.error('OpenRouter AI Analysis Error:', error);
    throw new Error(error.message || 'Failed to analyze resume with AI');
  }
};

export const generateInterviewQuestions = async (resumeData, targetContext) => {
  try {
    const prompt = `
      You are an expert technical interviewer.
      Based on the candidate's resume and their target role, generate 5 interview questions.
      The questions should be a mix of technical, behavioral, and system design (if applicable to the role).

      CRITICAL INSTRUCTIONS:
      - Return ONLY valid JSON, do not include markdown blocks like \`\`\`json or \`\`\`.
      
      Resume Data:
      ${JSON.stringify(resumeData, null, 2)}
      
      Target Context:
      Role: ${targetContext.role}
      Company: ${targetContext.company}

      The JSON must perfectly match this structure:
      {
        "questions": [
          {
            "id": 1,
            "type": "Technical Question" | "Behavioral Question" | "System Design",
            "text": "The actual question text"
          }
        ]
      }
    `;

    const textResponse = await callOpenRouter(prompt);
    return extractJson(textResponse);
  } catch (error) {
    console.error('OpenRouter Interview Generation Error:', error);
    throw new Error('Failed to generate interview questions');
  }
};

export const gradeInterview = async (questionsAndAnswers, targetContext) => {
  try {
    const prompt = `
      You are an expert technical interviewer.
      You are evaluating a candidate's answers to an interview for the role of ${targetContext.role} at ${targetContext.company}.
      Provide a score out of 100, specific metrics, positive feedback, and areas for improvement.

      CRITICAL INSTRUCTIONS:
      - Return ONLY valid JSON, do not include markdown blocks like \`\`\`json or \`\`\`.
      
      Interview Session:
      ${JSON.stringify(questionsAndAnswers, null, 2)}

      The JSON must perfectly match this structure:
      {
        "score": 85,
        "metrics": {
          "relevance": 90,
          "clarity": 80,
          "completeness": 85
        },
        "positive": ["Point 1", "Point 2"],
        "improvement": ["Point 1", "Point 2"]
      }
    `;

    const textResponse = await callOpenRouter(prompt);
    return extractJson(textResponse);
  } catch (error) {
    console.error('OpenRouter Interview Grading Error:', error);
    throw new Error('Failed to grade interview');
  }
};
