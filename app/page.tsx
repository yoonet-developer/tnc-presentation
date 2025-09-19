'use client'

import React, { useState, useEffect, useRef } from 'react'

type TimerRefs = {
  [key: string]: NodeJS.Timeout | null
}

export default function TeamworkPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timer30, setTimer30] = useState(30)
  const [timer60, setTimer60] = useState(60)
  const [isTimer30Running, setIsTimer30Running] = useState(false)
  const [isTimer60Running, setIsTimer60Running] = useState(false)
  const timerRefs = useRef<TimerRefs>({})
  
  const totalSlides = 12

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateSlide(-1)
      if (e.key === 'ArrowRight') navigateSlide(1)
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide])

  const navigateSlide = (direction: number) => {
    const newSlide = currentSlide + direction
    if (newSlide >= 0 && newSlide < totalSlides) {
      setCurrentSlide(newSlide)
    }
  }

  const startTimer = (duration: number, which: '30' | '60') => {
    const isRunning = which === '30' ? isTimer30Running : isTimer60Running
    if (isRunning) return

    const setRunning = which === '30' ? setIsTimer30Running : setIsTimer60Running
    const setTime = which === '30' ? setTimer30 : setTimer60
    
    setRunning(true)
    let timeLeft = duration
    
    timerRefs.current[which] = setInterval(() => {
      timeLeft--
      setTime(timeLeft)
      
      if (timeLeft <= 0) {
        if (timerRefs.current[which]) {
          clearInterval(timerRefs.current[which]!)
          timerRefs.current[which] = null
        }
        setRunning(false)
      }
    }, 1000)
  }

  const resetTimer = (duration: number, which: '30' | '60') => {
    if (timerRefs.current[which]) {
      clearInterval(timerRefs.current[which]!)
      timerRefs.current[which] = null
    }
    
    if (which === '30') {
      setTimer30(30)
      setIsTimer30Running(false)
    } else {
      setTimer60(60)
      setIsTimer60Running(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const slides = [
    // Slide 1: Enhanced Title
    {
      id: 'intro',
      content: (
        <div className="slide-content">
          <div className="title-animation">
            <h1 className="main-title">
              <span className="title-word">Teamwork</span>
              <span className="title-symbol">&</span>
              <span className="title-word">Collaboration</span>
            </h1>
            <div className="code-subtitle">
              <span className="code-bracket">{'{ '}</span>
              <span className="code-text">Building Better Software Together</span>
              <span className="code-bracket">{' }'}</span>
            </div>
          </div>
          <div className="intro-stats">
            <div className="stat-item">
              <span className="stat-number">80%</span>
              <span className="stat-label">of our work involves collaboration</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3x</span>
              <span className="stat-label">more innovative with diverse teams</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5x</span>
              <span className="stat-label">better performance in collaborative teams</span>
            </div>
          </div>
        </div>
      )
    },
    // Slide 2: Foundation
    {
      id: 'foundation',
      content: (
        <div className="slide-content">
          <h2>The Foundation: What's the Difference?</h2>
          <div className="foundation-visual">
            <div className="concept-card">
              <div className="concept-icon">🚣</div>
              <h3>Teamwork</h3>
              <p>Working <span className="emphasis">together</span> towards a goal</p>
              <p className="subtitle">Like rowing a boat - everyone does their part</p>
            </div>
            <div className="concept-card">
              <div className="concept-icon">🎷</div>
              <h3>Collaboration</h3>
              <p>Creating <span className="emphasis">together</span> with shared ideas</p>
              <p className="subtitle">Like a jazz band - improvising and building on each other</p>
            </div>
          </div>
          <p className="foundation-bottom">
            One is about <span className="code-inline">dividing tasks</span>, 
            the other is about <span className="code-inline">multiplying ideas</span>
          </p>
        </div>
      )
    },
    // Slide 3: Ice Breaker
    {
      id: 'icebreaker',
      content: (
        <div className="slide-content">
          <h2>🌟 Ice Breaker: Success Stories</h2>
          <div className="icebreaker-container">
            <div className="icebreaker-icon">💬</div>
            <div className="icebreaker-prompt">
              <h3>Share Your Experience!</h3>
              <p>Turn to someone near you and share:</p>
              <p className="prompt-question">
                "A time when teamwork & collaboration helped you succeed"
              </p>
              <p className="subtitle">What big progress did you make together?</p>
            </div>
            <p className="timer-indicator">⏱️ 1 minute</p>
          </div>
        </div>
      )
    },
    // Slide 4: Why This Matters
    {
      id: 'why-matters',
      content: (
        <div className="slide-content">
          <h2>Why This Matters</h2>
          <div className="icon-grid">
            <div className="icon-card">
              <div className="icon">🤝</div>
              <h3>Trust & Relationships</h3>
              <p>Your network is your net worth</p>
            </div>
            <div className="icon-card">
              <div className="icon">🧩</div>
              <h3>Better Problem Solving</h3>
              <p>None of us is as smart as all of us</p>
            </div>
            <div className="icon-card">
              <div className="icon">💡</div>
              <h3>Innovation</h3>
              <p>Great ideas rarely happen in isolation</p>
            </div>
          </div>
        </div>
      )
    },
    // Slide 5: Dev Teams Excel
    {
      id: 'dev-teams',
      content: (
        <div className="slide-content">
          <h2>&lt;/&gt; Why Dev Teams Excel Together</h2>
          <div className="icon-grid-large">
            {[
              { icon: '🐛', title: 'Debugging', desc: 'More eyes = fewer bugs' },
              { icon: '👀', title: 'Code Reviews', desc: 'Like spell-check but for logic' },
              { icon: '📚', title: 'Knowledge Transfer', desc: 'Learn that framework you\'ve been avoiding' },
              { icon: '🚌', title: 'The "Bus Factor"', desc: 'What if someone gets hit by a bus?' },
              { icon: '🏗️', title: 'Better Architecture', desc: 'Multiple perspectives = robust solutions' },
              { icon: '⚡', title: 'Faster Delivery', desc: 'Parallel work, shared ownership' }
            ].map((item, i) => (
              <div key={i} className="icon-card">
                <div className="icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 6: 5 C's
    {
      id: 'five-cs',
      content: (
        <div className="slide-content">
          <h2>The 5 C's of Great Teams</h2>
          <div className="five-cs">
            {[
              { icon: '💬', title: 'Communication', desc: 'Not just Slack reactions' },
              { icon: '🤝', title: 'Collaboration', desc: 'Beyond "LGTM" on PRs' },
              { icon: '✅', title: 'Commitment', desc: 'Showing up for standups' },
              { icon: '💪', title: 'Courage', desc: 'Admitting when you broke production' },
              { icon: '🎉', title: 'Celebration', desc: 'Merge parties!' }
            ].map((c, i) => (
              <div key={i} className="c-item">
                <div className="c-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 7: Challenges
    {
      id: 'challenges',
      content: (
        <div className="slide-content">
          <h2>Common Team Challenges (We've All Been There)</h2>
          <div className="challenges-grid">
            {[
              { emoji: '🤐', title: 'The "Silent Meeting"', problem: 'Everyone\'s on mute, mentally and literally', solution: 'Start with a fun check-in question' },
              { emoji: '👨‍🍳', title: '"Too Many Cooks"', problem: 'Everyone has opinions, no one decides', solution: 'Assign a decision maker' },
              { emoji: '🙅', title: '"Not My Job"', problem: 'Strict boundaries, no flexibility', solution: 'Shared ownership mindset' },
              { emoji: '📧', title: '"Reply All Chaos"', problem: 'Communication overload', solution: 'Clear communication channels' }
            ].map((item, i) => (
              <div key={i} className="challenge-card">
                <h3>{item.emoji} {item.title}</h3>
                <p>{item.problem}</p>
                <p className="solution">💡 Solution: {item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 8: Practical Tips
    {
      id: 'tips',
      content: (
        <div className="slide-content">
          <h2>Practical Tips You Can Use Today</h2>
          <div className="tips-grid">
            {[
              { num: 1, title: 'The "Yes, And..." Rule', desc: 'From improv comedy - build on ideas instead of shutting them down' },
              { num: 2, title: 'The 2-Pizza Rule', desc: 'If a team can\'t be fed with 2 pizzas, it\'s too big' },
              { num: 3, title: 'Pomodoro for Pairs', desc: '25 min focused work, 5 min break - perfect for pair programming' },
              { num: 4, title: 'Document Everything', desc: 'Your future self (and team) will thank you' }
            ].map((tip, i) => (
              <div key={i} className="tip-card">
                <span className="tip-number">{tip.num}</span>
                <h3>{tip.title}</h3>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 9: Success Stories
    {
      id: 'stories',
      content: (
        <div className="slide-content">
          <h2>Real Success Stories</h2>
          <div className="stories-container">
            {[
              { icon: '🐧', title: 'Linux Kernel', desc: '15,000 developers, one kernel' },
              { icon: '📚', title: 'Wikipedia', desc: 'Millions collaborating on truth' },
              { icon: '💻', title: 'Stack Overflow', desc: '50M+ devs helping each other' }
            ].map((story, i) => (
              <div key={i} className="story-card">
                <div className="story-icon">{story.icon}</div>
                <h3>{story.title}</h3>
                <p>{story.desc}</p>
              </div>
            ))}
          </div>
          <p className="story-footer">
            And every successful project in <span className="emphasis">your company</span> too!
          </p>
        </div>
      )
    },
    // Slide 10: Drawing Game
    {
      id: 'game',
      content: (
        <div className="slide-content">
          <h2>🎨 Collaborative Drawing Game</h2>
          <div className="game-container">
            <div className="game-instructions">
              <h3>How to Play:</h3>
              <ol>
                <li>Choose a concept (e.g., "Teamwork in action", "Our dream office")</li>
                <li>First person starts drawing</li>
                <li>When timer ends, pass to next person</li>
                <li>Each person adds to the drawing - no talking!</li>
                <li>Reveal and discuss the final masterpiece</li>
              </ol>
            </div>
            <p className="timer-choice">Choose your timer duration:</p>
            <div className="timer-section">
              <div className="timer-box">
                <div className="timer-label">Quick Round</div>
                <div className={`timer-display ${timer30 <= 5 ? 'timer-ending' : ''}`}>
                  {formatTime(timer30)}
                </div>
                <div className="timer-controls">
                  <button 
                    className="timer-btn start-btn" 
                    onClick={() => startTimer(30, '30')}
                    disabled={isTimer30Running}
                  >
                    Start
                  </button>
                  <button 
                    className="timer-btn reset-btn" 
                    onClick={() => resetTimer(30, '30')}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="timer-box">
                <div className="timer-label">Extended Round</div>
                <div className={`timer-display ${timer60 <= 5 ? 'timer-ending' : ''}`}>
                  {formatTime(timer60)}
                </div>
                <div className="timer-controls">
                  <button 
                    className="timer-btn start-btn" 
                    onClick={() => startTimer(60, '60')}
                    disabled={isTimer60Running}
                  >
                    Start
                  </button>
                  <button 
                    className="timer-btn reset-btn" 
                    onClick={() => resetTimer(60, '60')}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    // Slide 11: Takeaways
    {
      id: 'takeaways',
      content: (
        <div className="slide-content">
          <h2>Key Takeaways</h2>
          <div className="takeaways-box">
            {[
              { num: '1️⃣', text: 'Teamwork ≠ Collaboration (but you need both)' },
              { num: '2️⃣', text: 'Great teams are made, not born' },
              { num: '3️⃣', text: 'Start small: One conversation, one shared idea' }
            ].map((item, i) => (
              <div key={i} className="takeaway-item">
                <span className="takeaway-icon">{item.num}</span>
                <span className="takeaway-text">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="challenge-text">
            💪 Challenge: Try one collaborative technique this week!
          </p>
        </div>
      )
    },
    // Slide 12: Closing
    {
      id: 'closing',
      content: (
        <div className="slide-content">
          <h2>🚀 Final Thoughts</h2>
          <div className="quote">
            <p>"If you want to go fast, go alone. If you want to go far, go together."</p>
            <div className="author">- African Proverb</div>
          </div>
          <h3 className="git-message">
            <span className="code-inline">git push</span> alone, 
            <span className="code-inline">git pull</span> together
          </h3>
          <div className="final-message">
            <p>The best code is written <span className="emphasis">together</span></p>
            <p>The best products are built <span className="emphasis">together</span></p>
            <p>The best careers are grown <span className="emphasis">together</span></p>
          </div>
          <p className="thank-you">Thank you! Let's build amazing things together! 🎉</p>
        </div>
      )
    }
  ]

  return (
    <div className="presentation-wrapper">
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .presentation-wrapper {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #181925 0%, #2a2b3d 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .presentation-container {
          width: 95%;
          max-width: 1200px;
          height: 95vh;
          max-height: 800px;
          background: #eeeff4;
          border-radius: 24px;
          box-shadow: 0 25px 70px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .slide-indicator {
          position: absolute;
          top: 20px;
          right: 20px;
          color: #6c7091;
          font-size: 14px;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.8);
          padding: 8px 16px;
          border-radius: 20px;
          z-index: 10;
        }

        .progress-dots {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 15;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6c7091;
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .dot.active {
          opacity: 1;
          background: #8a9eff;
          transform: scale(1.3);
        }

        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 60px 100px 60px;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.5s ease-in-out;
        }

        .slide.active {
          opacity: 1;
          transform: translateX(0);
        }

        .slide.prev {
          transform: translateX(-100%);
        }

        .slide-content {
          width: 100%;
          max-width: 1100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Enhanced Title Styles */
        .title-animation {
          margin-bottom: 50px;
        }

        .main-title {
          font-size: 3.5em;
          font-weight: 800;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          animation: fadeInUp 1s ease;
        }

        .title-word {
          background: linear-gradient(135deg, #8a9eff, #ff6495);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-symbol {
          color: #6c7091;
          font-weight: 400;
        }

        .code-subtitle {
          font-size: 1.4em;
          color: #181925;
          font-family: 'Monaco', 'Courier New', monospace;
          animation: fadeInUp 1s ease 0.3s;
          animation-fill-mode: both;
        }

        .code-bracket {
          color: #8a9eff;
          font-weight: bold;
        }

        .code-text {
          color: #6c7091;
          margin: 0 10px;
        }

        .intro-stats {
          display: flex;
          gap: 50px;
          margin-top: 40px;
          animation: fadeInUp 1s ease 0.6s;
          animation-fill-mode: both;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 2.5em;
          font-weight: bold;
          color: #ff6495;
        }

        .stat-label {
          font-size: 0.9em;
          color: #6c7091;
          margin-top: 5px;
          max-width: 120px;
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

        h2 {
          font-size: 2.2em;
          color: #8a9eff;
          margin-bottom: 30px;
          font-weight: 600;
        }

        h3 {
          font-size: 1.3em;
          color: #8a9eff;
          margin: 10px 0;
          font-weight: 500;
        }

        p {
          font-size: 1.1em;
          color: #181925;
          line-height: 1.8;
        }

        .subtitle {
          color: #6c7091;
          font-size: 0.95em;
          margin-top: 10px;
        }

        .emphasis {
          color: #ff6495;
          font-weight: 600;
        }

        .code-inline {
          font-family: 'Monaco', 'Courier New', monospace;
          background: rgba(138, 158, 255, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          color: #8a9eff;
        }

        /* Navigation */
        .navigation {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          z-index: 20;
        }

        .nav-btn {
          padding: 12px 28px;
          background: linear-gradient(135deg, #8a9eff, #a5b4ff);
          color: #eeeff4;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(138, 158, 255, 0.3);
        }

        .nav-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(138, 158, 255, 0.5);
        }

        .nav-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          background: #6c7091;
        }

        /* Foundation Visual */
        .foundation-visual {
          display: flex;
          gap: 50px;
          margin: 40px 0;
        }

        .concept-card {
          background: linear-gradient(145deg, #ffffff, #f5f6fa);
          padding: 30px;
          border-radius: 20px;
          flex: 1;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .concept-card:hover {
          transform: translateY(-5px);
          border-color: #8a9eff;
          box-shadow: 0 10px 30px rgba(138, 158, 255, 0.2);
        }

        .concept-icon {
          font-size: 3em;
          margin-bottom: 15px;
        }

        .foundation-bottom {
          font-size: 1.3em;
          margin-top: 30px;
        }

        /* Ice Breaker */
        .icebreaker-container {
          padding: 40px;
          background: linear-gradient(145deg, rgba(138, 158, 255, 0.05), rgba(255, 100, 149, 0.05));
          border-radius: 20px;
          max-width: 600px;
        }

        .icebreaker-icon {
          font-size: 4em;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }

        .icebreaker-prompt {
          background: white;
          padding: 20px;
          border-radius: 15px;
          margin: 20px 0;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .prompt-question {
          font-size: 1.3em;
          color: #ff6495;
          margin: 20px 0;
        }

        .timer-indicator {
          font-size: 2em;
          margin-top: 20px;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Icon Grid */
        .icon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-top: 30px;
        }

        .icon-grid-large {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-top: 30px;
          width: 100%;
        }

        .icon-card {
          background: linear-gradient(145deg, #ffffff, #f5f6fa);
          padding: 20px;
          border-radius: 20px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .icon-card:hover {
          transform: translateY(-5px);
          border-color: #8a9eff;
          box-shadow: 0 10px 30px rgba(138, 158, 255, 0.2);
        }

        .icon {
          font-size: 2.5em;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #8a9eff, #ff6495);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* 5 C's */
        .five-cs {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 30px;
        }

        .c-item {
          padding: 20px;
          background: linear-gradient(145deg, rgba(138, 158, 255, 0.05), rgba(138, 158, 255, 0.1));
          border-radius: 20px;
          flex: 1;
          min-width: 150px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .c-item:hover {
          transform: scale(1.05);
          border-color: #8a9eff;
        }

        .c-icon {
          font-size: 2em;
          margin-bottom: 10px;
        }

        /* Challenges */
        .challenges-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 30px;
        }

        .challenge-card {
          background: linear-gradient(145deg, #ffffff, #f5f6fa);
          padding: 25px;
          border-radius: 15px;
          border-left: 4px solid #ff6495;
          transition: all 0.3s ease;
          text-align: left;
        }

        .challenge-card:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 20px rgba(255, 100, 149, 0.2);
        }

        .challenge-card h3 {
          color: #ff6495;
          margin-bottom: 10px;
        }

        .solution {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(108, 112, 145, 0.2);
          color: #6c7091;
          font-size: 0.9em;
        }

        /* Tips */
        .tips-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
          margin-top: 30px;
        }

        .tip-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border-top: 3px solid #8a9eff;
          text-align: left;
        }

        .tip-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(138, 158, 255, 0.2);
        }

        .tip-number {
          display: inline-block;
          background: linear-gradient(135deg, #8a9eff, #ff6495);
          color: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        /* Stories */
        .stories-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          margin-top: 30px;
        }

        .story-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          transition: all 0.3s ease;
          border-bottom: 3px solid #8a9eff;
        }

        .story-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(138, 158, 255, 0.2);
        }

        .story-icon {
          font-size: 2em;
          margin-bottom: 10px;
        }

        .story-footer {
          margin-top: 30px;
          font-size: 1.3em;
        }

        /* Drawing Game */
        .game-container {
          width: 100%;
          background: linear-gradient(145deg, rgba(138, 158, 255, 0.05), rgba(255, 100, 149, 0.05));
          padding: 30px;
          border-radius: 20px;
        }

        .game-instructions {
          background: white;
          padding: 20px;
          border-radius: 15px;
          margin-bottom: 20px;
          text-align: left;
        }

        .game-instructions ol {
          padding-left: 20px;
          color: #181925;
        }

        .game-instructions li {
          margin: 10px 0;
        }

        .timer-choice {
          color: #6c7091;
          margin: 20px 0;
        }

        .timer-section {
          display: flex;
          justify-content: space-around;
          gap: 40px;
          margin-top: 30px;
        }

        .timer-box {
          flex: 1;
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .timer-label {
          color: #6c7091;
          font-size: 1.1em;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .timer-display {
          font-size: 3.5em;
          color: #8a9eff;
          font-weight: bold;
          font-family: 'Monaco', 'Courier New', monospace;
          margin: 20px 0;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .timer-display.timer-ending {
          color: #ff6495;
          animation: pulse 1s infinite;
        }

        .timer-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .timer-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .start-btn {
          background: linear-gradient(135deg, #8a9eff, #a5b4ff);
          color: white;
        }

        .start-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(138, 158, 255, 0.4);
        }

        .reset-btn {
          background: linear-gradient(135deg, #ff6495, #ff8aae);
          color: white;
        }

        .reset-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 100, 149, 0.4);
        }

        .timer-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Takeaways */
        .takeaways-box {
          background: linear-gradient(145deg, rgba(138, 158, 255, 0.1), rgba(255, 100, 149, 0.1));
          padding: 30px;
          border-radius: 20px;
          margin: 30px auto;
        }

        .takeaway-item {
          display: flex;
          align-items: center;
          margin: 20px 0;
          padding: 15px;
          background: white;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .takeaway-item:hover {
          transform: translateX(10px);
          box-shadow: 0 5px 15px rgba(138, 158, 255, 0.2);
        }

        .takeaway-icon {
          font-size: 1.5em;
          margin-right: 15px;
        }

        .takeaway-text {
          flex: 1;
          color: #181925;
          font-size: 1.1em;
        }

        .challenge-text {
          margin-top: 30px;
          font-size: 1.2em;
        }

        /* Closing */
        .quote {
          padding: 25px;
          border-left: 4px solid #8a9eff;
          background: linear-gradient(90deg, rgba(138, 158, 255, 0.1), rgba(138, 158, 255, 0.05));
          border-radius: 0 15px 15px 0;
          margin: 30px 0;
          font-style: italic;
        }

        .quote p {
          color: #6c7091;
        }

        .author {
          text-align: right;
          margin-top: 10px;
          color: #8a9eff;
          font-weight: 500;
        }

        .git-message {
          margin: 30px 0;
          font-size: 1.5em;
          color: #ff6495;
        }

        .final-message {
          margin: 40px 0;
        }

        .final-message p {
          font-size: 1.3em;
          margin: 10px 0;
        }

        .thank-you {
          font-size: 1.2em;
          color: #8a9eff;
          margin-top: 30px;
        }
      `}</style>

      <div className="presentation-container">
        <div className="slide-indicator">
          {currentSlide + 1} / {totalSlides}
        </div>

        <div className="progress-dots">
          {[...Array(totalSlides)].map((_, i) => (
            <div key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} />
          ))}
        </div>

        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${
              index === currentSlide ? 'active' : 
              index < currentSlide ? 'prev' : ''
            }`}
          >
            {slide.content}
          </div>
        ))}

        <div className="navigation">
          <button 
            className="nav-btn" 
            onClick={() => navigateSlide(-1)}
            disabled={currentSlide === 0}
          >
            ← Previous
          </button>
          <button 
            className="nav-btn" 
            onClick={() => navigateSlide(1)}
            disabled={currentSlide === totalSlides - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}