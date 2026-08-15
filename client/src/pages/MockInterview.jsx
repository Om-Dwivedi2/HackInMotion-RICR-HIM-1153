import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import InterviewEmptyState from '../components/dashboard/mock-interview/InterviewEmptyState';
import InterviewSetup from '../components/dashboard/mock-interview/InterviewSetup';
import InterviewHeader from '../components/dashboard/mock-interview/InterviewHeader';
import InterviewQuestion from '../components/dashboard/mock-interview/InterviewQuestion';
import AnswerInput from '../components/dashboard/mock-interview/AnswerInput';
import InterviewProgress from '../components/dashboard/mock-interview/InterviewProgress';
import AIFeedback from '../components/dashboard/mock-interview/AIFeedback';
import InterviewResult from '../components/dashboard/mock-interview/InterviewResult';

const MockInterview = () => {
  // State machine: 'setup' | 'active' | 'completed'
  const [sessionState, setSessionState] = useState('setup');
  
  // Active interview state
  const [activeResume, setActiveResume] = useState(null);
  const [activeTarget, setActiveTarget] = useState(null);
  const [interviewSession, setInterviewSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const [finalFeedback, setFinalFeedback] = useState(null);

  useEffect(() => {
    const fetchContext = async () => {
      try {
        const [resumeRes, targetRes] = await Promise.all([
          api.get('/resumes/active'),
          api.get('/targets/active')
        ]);
        if (resumeRes.data.success) setActiveResume(resumeRes.data.data);
        if (targetRes.data.success) setActiveTarget(targetRes.data.data);
      } catch (err) {
        console.error("Failed to fetch context for interview", err);
      }
    };
    fetchContext();
  }, []);

  const hasResumeProfile = activeResume && activeTarget;

  // Handlers
  const handleStart = async () => {
    setIsGenerating(true);
    toast.loading('Generating interview questions based on your profile...', { id: 'interview-gen' });
    try {
      const res = await api.post('/interviews/generate');
      if (res.data.success && res.data.data.interview) {
        setInterviewSession(res.data.data.interview);
        setSessionState('active');
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setCurrentAnswer('');
        setShowFeedback(false);
        toast.success('Interview ready!', { id: 'interview-gen' });
      }
    } catch (err) {
      toast.error('Failed to generate interview. Please try again.', { id: 'interview-gen' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnd = () => {
    if (window.confirm("Are you sure you want to end the interview early? Your progress will be lost.")) {
      setSessionState('setup');
      setInterviewSession(null);
    }
  };

  const handleSubmit = (finalAnswerText) => {
    const textToSubmit = typeof finalAnswerText === 'string' ? finalAnswerText : currentAnswer;
    
    if (!textToSubmit.trim()) {
      toast.error('Please provide an answer before submitting.');
      return;
    }
    const currentQ = interviewSession.questions[currentQuestionIndex];
    setAnswers(prev => [...prev, { questionId: currentQ.id, text: textToSubmit }]);
    setShowFeedback(true);
  };

  const handleSkip = () => {
    const currentQ = interviewSession.questions[currentQuestionIndex];
    setAnswers(prev => [...prev, { questionId: currentQ.id, text: "Skipped" }]);
    setShowFeedback(true);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < interviewSession.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
      setShowFeedback(false);
    } else {
      // Submit entire interview
      setIsSubmitting(true);
      toast.loading('Grading your interview...', { id: 'interview-grade' });
      try {
        const res = await api.post('/interviews/submit', {
          interviewId: interviewSession._id,
          answers: answers
        });
        if (res.data.success && res.data.data.interview) {
          setFinalFeedback(res.data.data.interview.feedback);
          setSessionState('completed');
          toast.success('Interview graded!', { id: 'interview-grade' });
        }
      } catch (err) {
        toast.error('Failed to grade interview.', { id: 'interview-grade' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleRetry = () => {
    setSessionState('setup');
    setInterviewSession(null);
    setFinalFeedback(null);
  };

  // Render logic
  const renderContent = () => {
    if (!hasResumeProfile) {
      return <InterviewEmptyState />;
    }

    if (sessionState === 'setup') {
      return (
        <div className="relative">
          <InterviewSetup onStart={handleStart} />
          {isGenerating && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-slate-700 font-medium">Preparing your customized interview...</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (sessionState === 'completed') {
      return <InterviewResult feedback={finalFeedback} onRetry={handleRetry} />;
    }

    // 'active' state
    const currentQuestion = interviewSession.questions[currentQuestionIndex];
    
    return (
      <div className="max-w-6xl mx-auto">
        <InterviewHeader 
          targetRole={activeTarget?.role} 
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={interviewSession.questions.length}
          onEnd={handleEnd}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <InterviewQuestion 
              question={currentQuestion.text}
              type={currentQuestion.type}
            />
            
            {!showFeedback ? (
              <AnswerInput 
                value={currentAnswer}
                onChange={setCurrentAnswer}
                onSubmit={handleSubmit}
                onSkip={handleSkip}
                isSubmitting={isSubmitting}
              />
            ) : (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]">
                <p className="text-blue-800 font-medium mb-6 text-center">
                  {currentQuestionIndex < interviewSession.questions.length - 1 
                    ? "Answer recorded. Ready for the next question?" 
                    : "Interview complete! Ready to see your results?"}
                </p>
                <button 
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  {currentQuestionIndex < interviewSession.questions.length - 1 ? "Next Question" : "Finish & Get Results"}
                </button>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <InterviewProgress 
              current={currentQuestionIndex + 1}
              total={interviewSession.questions.length}
              targetRole={activeTarget?.role}
              focusAreas={[]}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="w-full pb-12">
        {sessionState === 'setup' && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Mock Interview</h1>
            <p className="text-slate-600 mt-1 text-sm max-w-xl">
              Practice role-specific interview questions and get AI-powered feedback on your answers.
            </p>
            {hasResumeProfile && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm border-t border-slate-100 pt-4 max-w-2xl">
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Target Role</span>
                  <span className="font-medium text-slate-900">{activeTarget?.role}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Resume</span>
                  <span className="font-medium text-slate-900">{activeResume?.file?.originalName}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default MockInterview;
