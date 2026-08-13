import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import InterviewEmptyState from '../components/dashboard/mock-interview/InterviewEmptyState';
import InterviewSetup from '../components/dashboard/mock-interview/InterviewSetup';
import InterviewHeader from '../components/dashboard/mock-interview/InterviewHeader';
import InterviewQuestion from '../components/dashboard/mock-interview/InterviewQuestion';
import AnswerInput from '../components/dashboard/mock-interview/AnswerInput';
import InterviewProgress from '../components/dashboard/mock-interview/InterviewProgress';
import AIFeedback from '../components/dashboard/mock-interview/AIFeedback';
import InterviewResult from '../components/dashboard/mock-interview/InterviewResult';

// --- MOCK DATA ---
const targetRole = "Backend Engineer";
const hasResumeProfile = true; // Toggle for empty state

const mockQuestions = [
  {
    id: 1,
    type: "Technical Question",
    text: "Your resume mentions that you built a REST API using Node.js. How did you handle authentication and authorization in that project?"
  },
  {
    id: 2,
    type: "Behavioral Question",
    text: "Tell me about a time when you had to optimize a slow-performing database query. What steps did you take?"
  },
  {
    id: 3,
    type: "System Design",
    text: "If you were asked to design a scalable URL shortener, what database would you choose and why?"
  },
  {
    id: 4,
    type: "Technical Question",
    text: "Explain the difference between horizontal and vertical scaling. When would you choose one over the other?"
  },
  {
    id: 5,
    type: "Behavioral Question",
    text: "Describe a situation where you disagreed with a team member on a technical decision. How was it resolved?"
  }
];

const mockFeedback = {
  score: 81,
  metrics: {
    relevance: 92,
    clarity: 84,
    completeness: 76
  },
  positive: [
    "Strong technical understanding",
    "Answer directly addressed the question"
  ],
  improvement: [
    "Explain your security decisions in more detail",
    "Give a concrete implementation example"
  ]
};

// --- MAIN PAGE COMPONENT ---
const MockInterview = () => {
  // State machine: 'setup' | 'active' | 'completed'
  const [sessionState, setSessionState] = useState('setup');
  
  // Active interview state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Handlers
  const handleStart = () => {
    setSessionState('active');
    setCurrentQuestionIndex(0);
    setAnswer('');
    setShowFeedback(false);
  };

  const handleEnd = () => {
    if (window.confirm("Are you sure you want to end the interview early? Your progress will be lost.")) {
      setSessionState('setup');
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowFeedback(true);
    }, 1500);
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer('');
      setShowFeedback(false);
    } else {
      setSessionState('completed');
    }
  };

  const handleRetry = () => {
    setSessionState('setup');
  };

  // Render logic
  const renderContent = () => {
    if (!hasResumeProfile) {
      return <InterviewEmptyState />;
    }

    if (sessionState === 'setup') {
      return <InterviewSetup onStart={handleStart} />;
    }

    if (sessionState === 'completed') {
      return <InterviewResult onRetry={handleRetry} />;
    }

    // 'active' state
    const currentQuestion = mockQuestions[currentQuestionIndex];
    
    return (
      <div className="max-w-6xl mx-auto">
        <InterviewHeader 
          targetRole={targetRole} 
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={mockQuestions.length}
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
                value={answer}
                onChange={setAnswer}
                onSubmit={handleSubmit}
                onSkip={handleSkip}
                isSubmitting={isSubmitting}
              />
            ) : (
              <AIFeedback 
                feedback={mockFeedback}
                onNext={handleNext}
              />
            )}
          </div>
          
          <div className="lg:col-span-1">
            <InterviewProgress 
              current={currentQuestionIndex + 1}
              total={mockQuestions.length}
              targetRole={targetRole}
              focusAreas={['Node.js', 'REST APIs', 'Authentication', 'System Design']}
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
                  <span className="font-medium text-slate-900">{targetRole}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Resume</span>
                  <span className="font-medium text-slate-900">Om_Dwivedi_Resume.pdf</span>
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
