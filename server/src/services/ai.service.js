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

  const body = JSON.stringify({
    model: envConfig.openRouterModel,
    messages: [{ role: 'user', content: prompt }],
    // No response_format {"type": "json_object"} specified to support a wider range of models, 
    // we explicitly tell it to output JSON in the prompt and parse carefully.
  });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body,
      // Provide a reasonable timeout if the fetch environment supports it, 
      // otherwise relying on network timeout
      signal: AbortSignal.timeout(60000) 
    });

    if (!response.ok) {
      let errorBody = '';
      try {
        errorBody = await response.text();
      } catch (e) {
        // ignore
      }
      
      console.error(`OpenRouter API Error: Status ${response.status}`, errorBody);
      
      if (response.status === 401) {
         throw new Error('AI Service Configuration Error: Unauthorized. Check API Key.');
      } else if (response.status === 402) {
         throw new Error('AI Service Provider Error: Payment Required or Insufficient Credits.');
      } else if (response.status === 429) {
         throw new Error('AI Service Provider Error: Rate limit exceeded.');
      }
      
      throw new Error(`AI Service Request Failed (Status: ${response.status})`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
      throw new Error('Invalid response structure from AI Provider');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      throw new Error('AI Service temporarily unavailable (Timeout)');
    }
    throw error;
  }
};

const extractJson = (text) => {
  let cleanText = text.trim();
  // Strip markdown code block wrappers if model ignored the instruction
  if (cleanText.startsWith('```json')) cleanText = cleanText.substring(7);
  else if (cleanText.startsWith('```')) cleanText = cleanText.substring(3);
  
  if (cleanText.endsWith('```')) cleanText = cleanText.substring(0, cleanText.length - 3);
  
  return JSON.parse(cleanText.trim());
}

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

export const generateAnalysisExplanation = async (deterministicFindings, score, targetContext) => {
  try {
    const prompt = `
      You are an expert career coach and technical recruiter.
      You are receiving DETERMINISTIC analysis findings comparing a candidate's resume to a job description.
      Your job is to EXPLAIN these findings and provide ACTIONABLE recommendations.

      CRITICAL INSTRUCTIONS:
      - Return ONLY valid JSON, do not include markdown blocks like \`\`\`json or \`\`\`.
      - DO NOT change the score (${score}%).
      - Base all feedback on the provided deterministic findings. Do NOT invent missing skills or fabricate evidence.
      - Recommendations must be specific (e.g., "Add concrete REST API evidence to the project where you implemented Node.js") rather than generic (e.g., "Improve technical skills").
      
      Deterministic Findings:
      ${JSON.stringify(deterministicFindings, null, 2)}
      
      Target Context:
      Role: ${targetContext.role}
      Company: ${targetContext.company}
      
      The JSON must perfectly match this structure:
      {
        "recommendations": [
          {
            "title": "Short actionable title",
            "description": "Specific action the user should take based on the findings",
            "priority": "high" | "medium" | "low"
          }
        ]
      }
    `;

    const textResponse = await callOpenRouter(prompt);
    return extractJson(textResponse);
  } catch (error) {
    console.error('OpenRouter Analysis Explanation Error:', error);
    // Return empty recommendations if OpenRouter fails, do not throw so deterministic analysis is saved
    return { recommendations: [] };
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
