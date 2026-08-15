import { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';

export const useSpeechRecognition = (options = {}) => {
  const {
    lang = 'en-US',
    continuous = true,
    interimResults = true,
  } = options;

  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const shouldContinueRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopRecording = useCallback(() => {
    shouldContinueRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignore errors if it's already stopped
      }
    }
    setIsRecording(false);
    stopTimer();
  }, []);

  const startRecording = useCallback((onResultCallback) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    if (isRecording) return;

    // Clean up any existing instance
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch(e) {}
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;
    shouldContinueRef.current = true;
    setInterimTranscript('');
    setError(null);
    setRecordingTime(0);

    recognition.onstart = () => {
      setIsRecording(true);
      setError(null);
      stopTimer();
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    };

    recognition.onresult = (event) => {
      let finalStr = '';
      let interimStr = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalStr += event.results[i][0].transcript;
        } else {
          interimStr += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(interimStr);
      
      if (finalStr && onResultCallback) {
        onResultCallback(finalStr);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      stopTimer();
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        toast.error('Microphone access was denied. Please allow microphone access and try again.');
        setError('not-allowed');
        shouldContinueRef.current = false;
      } else if (event.error === 'network') {
        toast.error('Speech recognition is currently unavailable. Please try again.');
        setError('network');
        shouldContinueRef.current = false;
      } else if (event.error === 'no-speech') {
        // Don't toast for no-speech, but record error state
        setError('no-speech');
      } else {
        setError(event.error);
        shouldContinueRef.current = false;
      }
    };

    recognition.onend = () => {
      // Browser sometimes stops continuous recognition automatically. 
      // Restart if we shouldn't have stopped.
      if (shouldContinueRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          setIsRecording(false);
          stopTimer();
        }
      } else {
        setIsRecording(false);
        stopTimer();
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      toast.error('Unable to start voice input. Please check microphone permissions.');
      setIsRecording(false);
      stopTimer();
    }
  }, [lang, continuous, interimResults, isRecording]);

  useEffect(() => {
    return () => {
      shouldContinueRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch(e) {}
      }
      stopTimer();
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    isSupported,
    isRecording,
    interimTranscript,
    error,
    startRecording,
    stopRecording,
    recordingTime,
    formattedTime: formatTime(recordingTime)
  };
};

export default useSpeechRecognition;
