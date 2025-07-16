import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const VoiceNotePage = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [fromName, setFromName] = useState('');
  const [toEmail, setToEmail] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let newTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          newTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (newTranscript) {
        setTranscript((prev) => prev + newTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const clearTranscript = () => {
    setTranscript('');
    setFromName('');
    setToEmail('');
  };

  const saveTranscript = () => {
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'voice-note.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const sendEmail = () => {
    if (!fromName || !toEmail || !transcript) {
      alert('Please fill in all fields and generate a transcript.');
      return;
    }

    const templateParams = {
      from_name: fromName,
      reply_to: toEmail,
      message: transcript,
      to_email: toEmail,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send('service_ulpp955', 'template_6ufzytl', templateParams, 'Pni0rTr8NM-fFVWOf')
      .then(() => {
        alert('Email sent successfully!');
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        alert('Failed to send email.');
      });
  };

  return (
    <>
      <style>{`
        /* Animated background bubbles */
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
        .bubble {
          position: fixed;
          bottom: -100px;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          border-radius: 50%;
          opacity: 0.6;
          animation: floatUp 10s linear infinite;
          pointer-events: none;
        }
        .bubble1 { left: 10%; width: 40px; height: 40px; animation-delay: 0s; }
        .bubble2 { left: 30%; width: 30px; height: 30px; animation-delay: 3s; }
        .bubble3 { left: 50%; width: 50px; height: 50px; animation-delay: 5s; }
        .bubble4 { left: 70%; width: 35px; height: 35px; animation-delay: 2s; }
        .bubble5 { left: 90%; width: 45px; height: 45px; animation-delay: 7s; }

        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f0f4ff;
        }

        .container {
          backdrop-filter: saturate(180%) blur(20px);
          background: rgba(255, 255, 255, 0.85);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(37, 117, 252, 0.3);
          max-width: 480px;
          width: 90%;
          margin: auto;
          padding: 2.5rem 2rem;
          text-align: center;
          position: relative;
          z-index: 10;
        }

        h1 {
          font-size: 2.75rem;
          font-weight: 900;
          color: #3b49df;
          letter-spacing: 0.08em;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.6rem;
          user-select: none;
        }

        h1 span {
          display: inline-block;
          animation: bounce 1.6s infinite;
          transform-origin: 50% 50%;
        }
        h1 span:nth-child(2) {
          animation-delay: 0.2s;
        }
        h1 span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        input, textarea {
          width: 100%;
          padding: 1rem 1.2rem;
          margin-bottom: 1rem;
          font-size: 1.1rem;
          border-radius: 12px;
          border: 2px solid transparent;
          background: #f8faff;
          box-shadow: inset 0 0 6px #c5d7ff;
          transition: all 0.3s ease;
          resize: none;
          color: #0c1a39;
          font-weight: 600;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #3b49df;
          box-shadow: 0 0 10px #3b49df;
          background: #e7ecff;
          color: #121f52;
        }

        textarea {
          min-height: 160px;
          max-height: 300px;
        }

        .buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        button {
          background: linear-gradient(135deg, #3b49df, #2575fc);
          border: none;
          color: white;
          padding: 0.75rem 1.8rem;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 40px;
          cursor: pointer;
          box-shadow: 0 8px 15px rgba(37, 117, 252, 0.4);
          transition: all 0.35s ease;
          user-select: none;
          flex: 1 1 140px;
          max-width: 180px;
          min-width: 140px;
        }
        button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2575fc, #3b49df);
          box-shadow: 0 12px 25px rgba(37, 117, 252, 0.65);
          transform: translateY(-3px);
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
          background: #a0a7e6;
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem;
          }
          button {
            flex: 1 1 100%;
            max-width: none;
            min-width: auto;
          }
        }
      `}</style>

      {/* Animated bubbles background */}
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>

      <main className="container" role="main" aria-label="Voice note app">
        <h1 aria-live="polite" aria-atomic="true" aria-relevant="additions">
          🎤{' '}
          <span>V</span>
          <span>o</span>
          <span>c</span>
          <span>a</span>
          <span>-</span>
          <span>P</span>
          <span>a</span>
          <span>d</span>
        </h1>

        <input
          type="text"
          placeholder="Your name"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          aria-label="Your name"
          autoComplete="name"
          required
        />

        <input
          type="email"
          placeholder="Recipient email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          aria-label="Recipient email"
          autoComplete="email"
          required
        />

        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Your voice notes will appear here..."
          aria-label="Voice notes text area"
        />

        <div className="buttons">
          <button onClick={startListening} disabled={isListening} aria-disabled={isListening}>
            Start Listening
          </button>
          <button onClick={stopListening} disabled={!isListening} aria-disabled={!isListening}>
            Stop
          </button>
          <button onClick={saveTranscript}>Save</button>
          <button onClick={sendEmail}>Send Email</button>
          <button onClick={clearTranscript}>Clear</button>
        </div>
      </main>
    </>
  );
};

export default VoiceNotePage;