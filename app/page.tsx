'use client';

import { useState, useEffect, useRef } from 'react';

export default function TeamworkPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState(30);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const iceBreakerInterval = useRef<NodeJS.Timeout | null>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  const totalSlides = 14;

  useEffect(() => {
    updateProgress();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') previousSlide();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    const handleScroll = () => {
      if (slidesContainerRef.current) {
        const slideHeight = window.innerHeight;
        const scrollPosition = slidesContainerRef.current.scrollTop;
        const newSlide = Math.round(scrollPosition / slideHeight);
        setCurrentSlide(newSlide);
      }
    };

    const container = slidesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      scrollToSlide(newSlide);
    }
  };

  const scrollToSlide = (slideIndex: number) => {
    const slides = document.querySelectorAll('.slide');
    slides[slideIndex]?.scrollIntoView({ behavior: 'smooth' });
    updateProgress();
  };

  const updateProgress = () => {
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  };

  const selectBarrier = (element: HTMLDivElement) => {
    element.classList.toggle('selected');
  };

  const selectGameConcept = (concept: string) => {
    setSelectedConcept(concept);
  };

  const goToTimerSelection = () => {
    if (selectedConcept) {
      scrollToSlide(11);
    }
  };

  const selectTime = (time: number) => {
    setSelectedTime(time);
    setCurrentTimeLeft(time);
    setIsTimerRunning(false);
  };

  const toggleTimer = () => {
    if (!isTimerRunning) {
      startTimer();
      setIsTimerRunning(true);
    } else {
      if (timerInterval.current) clearInterval(timerInterval.current);
      setIsTimerRunning(false);
    }
  };

  const startTimer = () => {
    if (timerInterval.current) clearInterval(timerInterval.current);

    timerInterval.current = setInterval(() => {
      setCurrentTimeLeft(prev => {
        if (prev <= 1) {
          if (timerInterval.current) clearInterval(timerInterval.current);
          setIsTimerRunning(false);
          setTimeout(() => resetTimer(), 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    if (timerInterval.current) clearInterval(timerInterval.current);
    setCurrentTimeLeft(selectedTime);
    setIsTimerRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #181925 0%, #2A2B3D 100%);
          color: #EEEFF4;
          overflow: hidden;
          position: relative;
        }

        .nav-dots {
          position: fixed;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(238, 239, 244, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .nav-dot.active {
          background: #8A9EFF;
          transform: scale(1.3);
          border-color: rgba(138, 158, 255, 0.3);
        }

        .nav-dot:hover {
          background: rgba(138, 158, 255, 0.7);
        }

        .slides-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
        }

        .slides-container::-webkit-scrollbar {
          display: none;
        }

        .slide {
          min-height: 100vh;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 60px 40px;
          position: relative;
        }

        .slide:nth-child(odd) {
          background: linear-gradient(135deg, #181925 0%, #2A2B3D 100%);
        }

        .slide:nth-child(even) {
          background: linear-gradient(135deg, #2A2B3D 0%, #181925 100%);
        }

        h1 {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #8A9EFF, #FF6495);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
          line-height: 1.2;
        }

        h2 {
          font-size: 3rem;
          font-weight: 700;
          color: #8A9EFF;
          margin-bottom: 30px;
          text-align: center;
        }

        h3 {
          font-size: 2rem;
          color: #FF6495;
          margin-bottom: 20px;
          text-align: center;
        }

        p {
          font-size: 1.3rem;
          color: #EEEFF4;
          line-height: 1.8;
          max-width: 800px;
          text-align: center;
          margin-bottom: 20px;
        }

        .subtitle {
          font-size: 1.5rem;
          color: #6C7091;
          text-align: center;
          margin-bottom: 40px;
        }

        .content-card {
          background: rgba(42, 43, 61, 0.7);
          border: 1px solid rgba(138, 158, 255, 0.2);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          max-width: 900px;
          margin: 20px auto;
        }

        .story-box {
          background: linear-gradient(135deg, rgba(138, 158, 255, 0.1), rgba(255, 100, 149, 0.1));
          border-left: 4px solid #FF6495;
          padding: 30px;
          margin: 30px 0;
          border-radius: 10px;
          font-style: italic;
        }

        .button {
          background: linear-gradient(135deg, #8A9EFF, #FF6495);
          color: white;
          border: none;
          padding: 15px 40px;
          font-size: 1.2rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(138, 158, 255, 0.4);
        }

        .button:active {
          transform: translateY(0);
        }

        .button.secondary {
          background: transparent;
          border: 2px solid #8A9EFF;
          color: #8A9EFF;
        }

        .button.secondary:hover {
          background: rgba(138, 158, 255, 0.1);
        }

        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .concepts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 40px 0;
          max-width: 1000px;
        }

        .concept-card {
          background: rgba(42, 43, 61, 0.9);
          border: 2px solid transparent;
          padding: 25px;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .concept-card:hover {
          border-color: #8A9EFF;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(138, 158, 255, 0.3);
        }

        .concept-card.selected {
          background: linear-gradient(135deg, rgba(138, 158, 255, 0.3), rgba(255, 100, 149, 0.3));
          border-color: #FF6495;
        }

        .timer-display {
          font-size: 5rem;
          font-weight: 800;
          color: #8A9EFF;
          margin: 30px 0;
          font-family: 'Courier New', monospace;
          text-shadow: 0 0 30px rgba(138, 158, 255, 0.5);
        }

        .time-options {
          display: flex;
          gap: 30px;
          margin: 30px 0;
        }

        .time-option {
          background: rgba(42, 43, 61, 0.9);
          border: 3px solid transparent;
          padding: 30px 50px;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .time-option:hover {
          border-color: #8A9EFF;
          transform: scale(1.05);
        }

        .time-option.selected {
          border-color: #FF6495;
          background: linear-gradient(135deg, rgba(138, 158, 255, 0.2), rgba(255, 100, 149, 0.2));
        }

        .time-option h4 {
          font-size: 2rem;
          color: #8A9EFF;
          margin-bottom: 10px;
        }

        .time-option p {
          font-size: 1rem;
          color: #6C7091;
        }

        .feature-list {
          list-style: none;
          padding: 20px 0;
          max-width: 800px;
          margin: 0 auto;
        }

        .feature-list li {
          padding: 15px 0;
          padding-left: 40px;
          position: relative;
          font-size: 1.2rem;
          color: #EEEFF4;
          transition: all 0.3s ease;
        }

        .feature-list li:before {
          content: '▸';
          position: absolute;
          left: 0;
          color: #FF6495;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .feature-list li:hover {
          transform: translateX(10px);
          color: #8A9EFF;
        }

        .feature-list li:hover:before {
          color: #8A9EFF;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease forwards;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(108, 112, 145, 0.2);
          z-index: 1000;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8A9EFF, #FF6495);
          width: 0%;
          transition: width 0.3s ease;
        }

        .controls {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
          z-index: 100;
        }

        .control-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(42, 43, 61, 0.9);
          border: 2px solid rgba(138, 158, 255, 0.3);
          color: #8A9EFF;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 1.5rem;
        }

        .control-btn:hover {
          background: rgba(138, 158, 255, 0.2);
          transform: scale(1.1);
        }

        .hidden {
          display: none !important;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }

          h2 {
            font-size: 2rem;
          }

          p {
            font-size: 1.1rem;
          }

          .nav-dots {
            right: 15px;
          }

          .concepts-grid {
            grid-template-columns: 1fr;
          }

          .time-options {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="progress-bar">
        <div className="progress-fill" id="progressBar"></div>
      </div>

      <div className="nav-dots">
        {Array.from({ length: totalSlides }, (_, i) => (
          <div
            key={i}
            className={`nav-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => {
              setCurrentSlide(i);
              scrollToSlide(i);
            }}
          />
        ))}
      </div>

      <div className="controls">
        <button className="control-btn" onClick={previousSlide}>←</button>
        <button className="control-btn" onClick={nextSlide}>→</button>
      </div>

      <div className="slides-container" ref={slidesContainerRef}>

        <section className="slide">
          <h1 className="animate-in">The Power of Teamwork & Collaboration</h1>
          <p className="subtitle animate-in" style={{animationDelay: '0.2s'}}>Transforming Individual Talent into Collective Brilliance</p>
          <button className="button pulse" onClick={nextSlide}>Let&apos;s Begin</button>
        </section>

        <section className="slide">
          <h2>Hello, I&apos;m JCO!</h2>
          <div className="content-card animate-in">
            <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8A9EFF, #FF6495)',
                margin: '0 auto 30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{fontSize: '3rem', color: 'white'}}>JCO</span>
              </div>
            </div>
            <p style={{fontSize: '1.4rem', marginBottom: '30px'}}>Your guide for today&apos;s journey into teamwork excellence</p>
            <div className="story-box">
              <p>A bit about me...</p>
              <ul className="feature-list" style={{textAlign: 'left'}}>
                <li>Passionate about building collaborative teams</li>
                <li>Experienced in transforming group dynamics</li>
                <li>Believer in the power of collective success</li>
              </ul>
            </div>
            <p style={{marginTop: '30px', color: '#8A9EFF', fontSize: '1.2rem'}}>&quot;Together, we&apos;ll discover how to unlock your team&apos;s full potential&quot;</p>
          </div>
        </section>

        <section className="slide">
          <h2>Let&apos;s Define Our Terms</h2>
          <div className="content-card">
            <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '30px'}}>
              <div className="story-box" style={{background: 'linear-gradient(135deg, rgba(138, 158, 255, 0.15), rgba(138, 158, 255, 0.05))'}}>
                <h3 style={{color: '#8A9EFF', marginBottom: '15px'}}>Teamwork</h3>
                <p style={{fontStyle: 'normal', fontSize: '1.2rem'}}>The <strong>combined action</strong> of a group working towards a common goal</p>
                <p style={{marginTop: '15px', color: '#6C7091'}}>Think: Orchestra musicians playing in harmony</p>
                <ul style={{marginTop: '15px', listStyle: 'none'}}>
                  <li>• Shared responsibilities</li>
                  <li>• Coordinated effort</li>
                  <li>• Mutual support</li>
                </ul>
              </div>

              <div className="story-box" style={{background: 'linear-gradient(135deg, rgba(255, 100, 149, 0.15), rgba(255, 100, 149, 0.05))'}}>
                <h3 style={{color: '#FF6495', marginBottom: '15px'}}>Collaboration</h3>
                <p style={{fontStyle: 'normal', fontSize: '1.2rem'}}>The <strong>active partnership</strong> where people create something together</p>
                <p style={{marginTop: '15px', color: '#6C7091'}}>Think: Jazz musicians improvising together</p>
                <ul style={{marginTop: '15px', listStyle: 'none'}}>
                  <li>• Co-creation</li>
                  <li>• Shared ownership</li>
                  <li>• Synergistic innovation</li>
                </ul>
              </div>
            </div>
            <p style={{marginTop: '30px', textAlign: 'center', fontSize: '1.3rem', color: '#EEEFF4'}}>
              <strong>Today we&apos;ll explore both</strong> - how to work together AND create together
            </p>
          </div>
        </section>

        <section className="slide">
          <h2>A $125 Million Silence</h2>
          <div className="content-card animate-in">
            <div className="story-box">
              <p>In 1999, NASA lost the Mars Climate Orbiter. Not because of complex space physics or asteroid strikes...</p>
              <p style={{marginTop: '20px', color: '#FF6495'}}>But because one team used metric units whilst another used imperial.</p>
              <p style={{marginTop: '20px'}}>Nobody talked. Nobody checked. Nobody collaborated.</p>
            </div>
            <h3 style={{marginTop: '40px'}}>That silence cost $125 million.</h3>
            <p style={{marginTop: '20px'}}>Today, we&apos;ll ensure that never happens to your teams.</p>
          </div>
        </section>

        <section className="slide">
          <h2>Your Teamwork Stories</h2>
          <div className="content-card">
            <h3>Share Your Experience</h3>
            <p style={{marginBottom: '40px'}}>Turn to your partner and share:</p>
            <ul className="feature-list">
              <li>Your BEST team experience - what made it extraordinary?</li>
              <li>Your WORST team experience - what went wrong?</li>
            </ul>
          </div>
        </section>

        <section className="slide">
          <h2>Why Teams Fail Today</h2>
          <div className="content-card">
            <h3>The 5 Dysfunctions</h3>
            <ul className="feature-list">
              <li><strong>Absence of Trust</strong> - Fear of vulnerability</li>
              <li><strong>Fear of Conflict</strong> - Artificial harmony</li>
              <li><strong>Lack of Commitment</strong> - Ambiguity prevails</li>
              <li><strong>Avoidance of Accountability</strong> - Low standards</li>
              <li><strong>Inattention to Results</strong> - Individual goals win</li>
            </ul>
            <p style={{marginTop: '30px', fontStyle: 'italic'}}>Sound familiar from your worst team stories?</p>
          </div>
        </section>

        <section className="slide">
          <h2>What Great Teamwork Looks Like</h2>
          <div className="content-card">
            <h3>The 5 C&apos;s Framework</h3>
            <ul className="feature-list">
              <li><strong>Common Purpose</strong> - Everyone knows the &apos;why&apos;</li>
              <li><strong>Clear Roles</strong> - Strengths-based contributions</li>
              <li><strong>Communication</strong> - Open, honest, frequent</li>
              <li><strong>Commitment</strong> - Team over individual success</li>
              <li><strong>Celebration</strong> - Recognising collective wins</li>
            </ul>
            <p style={{marginTop: '30px'}}>These were present in all your BEST team stories!</p>
          </div>
        </section>

        <section className="slide">
          <h2>What Stops Us?</h2>
          <div className="content-card">
            <h3>The Hidden Saboteurs</h3>
            <p>Which is YOUR biggest barrier?</p>
            <div className="concepts-grid" style={{marginTop: '40px'}}>
              {['Ego & Competition', 'Fear of Conflict', 'Lack of Trust', 'Unclear Expectations', 'Virtual Distance', 'Time Pressure'].map((barrier) => (
                <div
                  key={barrier}
                  className="concept-card"
                  onClick={(e) => selectBarrier(e.currentTarget)}
                >
                  {barrier}
                </div>
              ))}
            </div>
            <p style={{marginTop: '30px', color: '#6C7091'}}>Click to vote - multiple selections allowed</p>
          </div>
        </section>

        <section className="slide">
          <h2>Practical Tools & Methods</h2>
          <div className="content-card">
            <ul className="feature-list">
              <li><strong>Daily Stand-ups</strong> - 15-minute team sync</li>
              <li><strong>After-Action Reviews</strong> - Learning from success AND failure</li>
              <li><strong>Cross-functional Shadowing</strong> - Walk in teammates&apos; shoes</li>
              <li><strong>Shared Scoreboards</strong> - Visible team metrics</li>
              <li><strong>Failure Parties</strong> - Celebrate learning from mistakes</li>
            </ul>
            <p style={{marginTop: '30px'}}>No one tool is magic - but together they transform teams</p>
          </div>
        </section>

        <section className="slide">
          <h2>When It Works Brilliantly</h2>
          <div className="content-card">
            <div className="story-box">
              <h3>The Thai Cave Rescue</h3>
              <p>13 lives saved because divers, engineers, doctors, and locals collaborated beyond their expertise</p>
            </div>
            <div className="story-box" style={{marginTop: '30px'}}>
              <h3>Leicester City&apos;s Miracle</h3>
              <p>5000-1 odds overcome through perfect teamwork, not individual stars</p>
            </div>
            <div className="story-box" style={{marginTop: '30px'}}>
              <h3>Spotify&apos;s Squad Model</h3>
              <p>Autonomous teams collaborating like jazz musicians</p>
            </div>
          </div>
        </section>

        <section className="slide">
          <h2>Silent Story Chain Game</h2>
          <div className="content-card">
            <h3>Step 1: Choose Your Concept</h3>
            <p>Select one concept for your team to illustrate</p>
            <div className="concepts-grid">
              {['Aquarium', 'Festival', 'Castle Grounds', 'Safari', 'Market', 'Harbor', 'Amusement Park', 'Snowy Mountain', 'Circus', 'Jungle', 'Space Station', 'Pirate Island'].map((concept) => (
                <div
                  key={concept}
                  className={`concept-card ${selectedConcept === concept ? 'selected' : ''}`}
                  onClick={() => selectGameConcept(concept)}
                >
                  {concept}
                </div>
              ))}
            </div>
            <button
              className="button"
              onClick={goToTimerSelection}
              disabled={!selectedConcept}
              style={{opacity: selectedConcept ? '1' : '0.5'}}
            >
              Next: Choose Time
            </button>
          </div>
        </section>

        <section className="slide">
          <h2>Silent Story Chain Game</h2>
          <div className="content-card">
            <h3>Selected Concept: {selectedConcept || 'None'}</h3>
            <p>Step 2: Choose your time limit per person</p>
            <div className="time-options">
              <div
                className={`time-option ${selectedTime === 30 ? 'selected' : ''}`}
                onClick={() => selectTime(30)}
              >
                <h4>30 Seconds</h4>
                <p>Quick & Energetic</p>
              </div>
              <div
                className={`time-option ${selectedTime === 60 ? 'selected' : ''}`}
                onClick={() => selectTime(60)}
              >
                <h4>1 Minute</h4>
                <p>More Detailed</p>
              </div>
            </div>
            <div className={selectedTime ? '' : 'hidden'} style={{marginTop: '40px'}}>
              <div className="timer-display" style={{color: currentTimeLeft <= 10 ? '#FF6495' : '#8A9EFF'}}>
                {currentTimeLeft === 0 ? 'SWITCH!' : formatTime(currentTimeLeft)}
              </div>
              <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
                <button className="button" onClick={toggleTimer}>
                  {isTimerRunning ? 'PAUSE' : 'START'}
                </button>
                <button className="button secondary" onClick={resetTimer}>RESET</button>
              </div>
            </div>
          </div>
        </section>

        <section className="slide">
          <h2>Your Commitment</h2>
          <div className="content-card">
            <h3>One Thing You&apos;ll Change</h3>
            <div className="story-box">
              <p style={{fontSize: '1.5rem', color: '#8A9EFF'}}>&quot;By next Friday, I will...&quot;</p>
            </div>
          </div>
        </section>

        <section className="slide">
          <h2>Remember This</h2>
          <div className="content-card">
            <div className="story-box" style={{background: 'linear-gradient(135deg, rgba(138, 158, 255, 0.2), rgba(255, 100, 149, 0.2))'}}>
              <p style={{fontSize: '1.5rem', textAlign: 'center', color: '#EEEFF4'}}>
                &quot;Teamwork isn&apos;t about being perfect together -
                <br /><br />
                it&apos;s about being committed to improving together.&quot;
              </p>
            </div>
            <h3 style={{marginTop: '40px'}}>Your teams are waiting for someone to take the first step.</h3>
            <p style={{fontSize: '1.5rem', color: '#8A9EFF', marginTop: '30px'}}>Why not you?</p>
            <p style={{fontSize: '1.5rem', color: '#FF6495'}}>Why not today?</p>
          </div>
          <button className="button pulse" style={{marginTop: '40px'}} onClick={() => window.location.reload()}>
            Start Again
          </button>
        </section>

      </div>
    </>
  );
}