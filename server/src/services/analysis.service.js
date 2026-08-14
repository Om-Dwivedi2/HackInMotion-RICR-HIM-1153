export const calculateDeterministicScore = (resumeData, jdData) => {
  // Normalize text for comparison
  const normalize = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const resumeSkills = (resumeData.skills || []).map(s => s.name || '');
  const resumeExperience = (resumeData.experience || []).map(e => (e.description || []).join(' ')).join(' ');
  const resumeProjects = (resumeData.projects || []).map(p => {
    return [p.name, p.description, ...(p.technologies || [])].join(' ');
  }).join(' ');

  const allResumeText = `${resumeSkills.join(' ')} ${resumeExperience} ${resumeProjects}`;
  const normalizedResumeText = normalize(allResumeText);
  const normalizedResumeSkills = resumeSkills.map(normalize);

  const matchedSkills = [];
  const weakSkills = [];
  const missingSkills = [];
  
  let earnedPoints = 0;
  let possiblePoints = 0;

  const processRequirement = (req, weight) => {
    possiblePoints += weight;
    const normalizedReq = normalize(req);
    
    // Check if skill is explicitly listed in skills array
    const exactMatch = normalizedResumeSkills.some(rs => rs === normalizedReq || rs.includes(normalizedReq) || normalizedReq.includes(rs) && rs.length > 3);
    
    if (exactMatch) {
      earnedPoints += weight;
      matchedSkills.push({
        skill: req,
        evidence: `Explicitly listed as a skill or found in exact matching text.`
      });
      return;
    }

    // Check if skill is mentioned in experience or projects
    if (normalizedResumeText.includes(normalizedReq)) {
      // It's mentioned but maybe not explicitly a primary skill, consider it weak or matched based on context.
      // For simplicity in deterministic logic, if it's in the text but not in skills array, we'll give it partial credit.
      earnedPoints += (weight * 0.5);
      weakSkills.push({
        skill: req,
        evidence: `Found mention in experience or projects.`,
        reason: `Experience is mentioned but not explicitly listed as a core skill.`
      });
      return;
    }

    // Missing
    missingSkills.push({
      skill: req,
      priority: weight >= 1.0 ? 'high' : 'medium',
      reason: `No evidence found in resume.`
    });
  };

  // Process JD Skills (Treat as required -> weight 1.0)
  const jdSkills = jdData.skills || [];
  jdSkills.forEach(req => processRequirement(req, 1.0));

  // Process JD Keywords (Treat as preferred -> weight 0.5)
  const jdKeywords = jdData.keywords || [];
  jdKeywords.forEach(req => processRequirement(req, 0.5));
  
  // Handle empty JD case
  if (possiblePoints === 0) {
    return {
      score: 0,
      label: "Insufficient Data",
      skillAnalysis: { matched: [], weak: [], missing: [] },
      keywordAnalysis: { matched: [], weak: [], missing: [] },
      strengths: []
    };
  }

  const percentage = Math.round((earnedPoints / possiblePoints) * 100);
  const score = Math.max(0, Math.min(100, percentage)); // Clamp between 0-100

  let label = "Low Match";
  if (score >= 80) label = "Strong Match";
  else if (score >= 60) label = "Moderate Match";
  else if (score >= 40) label = "Needs Improvement";

  // Derive strengths from matched skills
  const strengths = matchedSkills.slice(0, 3).map(m => `Strong evidence of ${m.skill} experience.`);

  return {
    score,
    label,
    skillAnalysis: {
      matched: matchedSkills,
      weak: weakSkills,
      missing: missingSkills,
    },
    keywordAnalysis: {
      matched: [], // Simplified for now, incorporated into skills above
      weak: [],
      missing: []
    },
    strengths
  };
};
