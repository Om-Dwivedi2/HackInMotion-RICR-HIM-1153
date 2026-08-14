import Resume from "../modules/resume/resume.model.js";
import CareerTarget from "../modules/careerTarget/careerTarget.model.js";
import Interview from "../modules/interview/interview.model.js";
import { generateInterviewQuestions, gradeInterview } from "../services/ai.service.js";
import { AppError } from "../utils/error.utils.js";

export const generateInterview = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const resume = await Resume.findOne({ userId, isActive: true });
    if (!resume) throw new AppError("No active resume found", 404);
    if (!resume.parsedData) throw new AppError("Resume has not been parsed yet", 400);

    const target = await CareerTarget.findOne({ userId, isActive: true });
    if (!target) throw new AppError("No active career target found", 404);

    const result = await generateInterviewQuestions(resume.parsedData, {
      role: target.role,
      company: target.company || "Unknown",
    });

    if (!result || !result.questions || result.questions.length === 0) {
        throw new AppError("Failed to generate questions", 500);
    }

    const interview = new Interview({
      userId,
      resumeId: resume._id,
      careerTargetId: target._id,
      status: "active",
      questions: result.questions,
    });

    await interview.save();

    res.status(201).json({
      success: true,
      data: { interview },
    });
  } catch (error) {
    next(error);
  }
};

export const submitInterview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { interviewId, answers } = req.body;

    if (!interviewId || !answers || !Array.isArray(answers)) {
      throw new AppError("Invalid input: interviewId and answers array are required", 400);
    }

    const interview = await Interview.findOne({ _id: interviewId, userId });
    if (!interview) {
      throw new AppError("Interview session not found", 404);
    }

    const target = await CareerTarget.findById(interview.careerTargetId);

    const questionsAndAnswers = interview.questions.map(q => {
      const answer = answers.find(a => a.questionId === q.id);
      return {
        question: q.text,
        answer: answer ? answer.text : "No answer provided",
      };
    });

    const feedback = await gradeInterview(questionsAndAnswers, {
      role: target?.role || "Unknown",
      company: target?.company || "Unknown",
    });

    interview.answers = answers;
    interview.feedback = feedback;
    interview.status = "completed";

    await interview.save();

    res.status(200).json({
      success: true,
      data: { interview },
    });
  } catch (error) {
    next(error);
  }
};
