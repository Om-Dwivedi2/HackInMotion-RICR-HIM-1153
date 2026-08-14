import Analysis from "../modules/analysis/analysis.model.js";
import Interview from "../modules/interview/interview.model.js";
import { AppError } from "../utils/error.utils.js";

export const getHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type = 'all', limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    let activities = [];

    // Fetch analyses
    if (type === 'all' || type === 'resume-analysis') {
      const analyses = await Analysis.find({ userId, status: "completed" })
        .populate('resumeId', 'file.originalName')
        .populate('careerTargetId', 'role')
        .sort({ createdAt: -1 })
        .lean();

      const mappedAnalyses = analyses.map(a => ({
        id: a._id,
        type: 'resume-analysis',
        title: 'Resume Analysis',
        targetRole: a.careerTargetId?.role || "Unknown Role",
        resumeName: a.resumeId?.file?.originalName || "Resume",
        score: a.matchScore?.score || 0,
        scoreLabel: a.matchScore?.label || "Analyzed",
        timestamp: new Date(a.createdAt).getTime(),
        date: new Date(a.createdAt).toLocaleDateString(),
        time: new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      activities.push(...mappedAnalyses);
    }

    // Fetch interviews
    if (type === 'all' || type === 'mock-interview') {
      const interviews = await Interview.find({ userId, status: "completed" })
        .populate('resumeId', 'file.originalName')
        .populate('careerTargetId', 'role')
        .sort({ createdAt: -1 })
        .lean();

      const mappedInterviews = interviews.map(i => ({
        id: i._id,
        type: 'mock-interview',
        title: 'Mock Interview',
        targetRole: i.careerTargetId?.role || "Unknown Role",
        interviewType: "Technical + Behavioral",
        score: i.feedback?.score || 0,
        scoreLabel: "Completed",
        timestamp: new Date(i.createdAt).getTime(),
        date: new Date(i.createdAt).toLocaleDateString(),
        time: new Date(i.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      activities.push(...mappedInterviews);
    }

    // Sort by timestamp descending
    activities.sort((a, b) => b.timestamp - a.timestamp);

    const total = activities.length;
    const paginatedActivities = activities.slice(skip, skip + parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        activities: paginatedActivities,
        total,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};
