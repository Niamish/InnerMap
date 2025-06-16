import React, { useState, useEffect } from 'react';

const InnerMapApp = () => {
  // Load saved data on mount
  const savedData = JSON.parse(localStorage.getItem('innerMapData') || '{}');

  const [screen, setScreen] = useState(savedData.isLoggedIn ? 'dashboard' : 'home');
  const [email, setEmail] = useState(savedData.email || '');
  const [password, setPassword] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(savedData.result || null);
  const [streak, setStreak] = useState(savedData.streak || 0);
  const [lastPracticeDate, setLastPracticeDate] = useState(savedData.lastPracticeDate || null);
  const [completedPractices, setCompletedPractices] = useState(savedData.completedPractices || []);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState('');
  const [loginError, setLoginError] = useState('');

  // Save data to localStorage
  useEffect(() => {
    if (email && result) {
      localStorage.setItem('innerMapData', JSON.stringify({
        isLoggedIn: screen !== 'home',
        email,
        result,
        streak,
        lastPracticeDate,
        completedPractices
      }));
    }
  }, [email, result, streak, lastPracticeDate, completedPractices, screen]);

  // Full 30 questions
  const questions = [
    // Devotion Questions
    { id: 1, category: "Devotion", text: "Do you sometimes feel a longing you can't quite name or explain?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 4, category: "Devotion", text: "Do certain moments of beauty or kindness bring tears to your eyes?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 7, category: "Devotion", text: "Do you find peace when you stop trying to control outcomes?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 10, category: "Devotion", text: "Have you ever felt the boundary between 'you' and 'everything else' dissolve?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 13, category: "Devotion", text: "Does seeing others suffer genuinely hurt your heart?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 16, category: "Devotion", text: "Do you sometimes feel love so strong it's almost too much to contain?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 19, category: "Devotion", text: "When someone calls you spiritual, do you feel they don't really know you?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 22, category: "Devotion", text: "Do beautiful moments feel like unexpected gifts?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 25, category: "Devotion", text: "Do you sometimes see something precious in every person you meet?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 28, category: "Devotion", text: "Do you ever feel overwhelming gratitude for existence itself?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },

    // Knowledge Questions
    { id: 2, category: "Knowledge", text: "Do you sometimes wonder if what you think is 'you' is actually real?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, category: "Knowledge", text: "Do thoughts sometimes feel like clouds passing through an open sky?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 8, category: "Knowledge", text: "Do you find yourself wondering 'What is aware of my thoughts?'", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 12, category: "Knowledge", text: "Do you feel drawn to understand the deepest truths about existence?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 15, category: "Knowledge", text: "Are you sometimes aware of an unchanging presence that watches all experience?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 18, category: "Knowledge", text: "Do you sometimes question the very nature of reality itself?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 21, category: "Knowledge", text: "Do you feel that what you call 'mind' is actually empty space?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 24, category: "Knowledge", text: "Do you feel more real in moments of complete stillness?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 27, category: "Knowledge", text: "Have you ever realized that the 'searcher' and the 'sought' are the same?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 30, category: "Knowledge", text: "Do you sometimes feel that all knowledge is actually remembering?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },

    // Action Questions
    { id: 3, category: "Action", text: "When you see something that needs doing, do you naturally step forward?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 6, category: "Action", text: "Do people naturally come to you when things get difficult?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 9, category: "Action", text: "Do you sometimes act so naturally that you forget you're the one doing it?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 11, category: "Action", text: "Do you sometimes act to help others without thinking what's in it for you?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 14, category: "Action", text: "Do you sometimes give or serve so naturally you don't think about it?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 17, category: "Action", text: "Do you sense when your actions flow with something greater than your personal will?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 20, category: "Action", text: "Do you naturally take charge when situations become chaotic?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 23, category: "Action", text: "Can you work with full intensity while feeling completely detached from results?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 26, category: "Action", text: "Do you prefer taking decisive action over endless analysis?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 29, category: "Action", text: "Do you feel most alive when serving others or a greater cause?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  ];

  const personalityTypes = {
    devotee_pure: {
      name: "The Pure Devotee",
      subtitle: "Lover of Divine",
      description: "You embody pure divine love and complete surrender to the highest truth.",
      emoji: "🙏",
      practices: [
        "How can I dissolve completely in divine love today?",
        "What would pure surrender look like in this moment?",
        "How do I serve without any sense of doership?",
        "What is blocking my heart from opening fully?",
        "How can I see only the Divine in everything?"
      ]
    },
    devotee_doer: {
      name: "The Devotee-Doer",
      subtitle: "Divine Servant in Action",
      description: "You express divine love through dedicated service and righteous action.",
      emoji: "💝",
      practices: [
        "How can I serve the Divine through my work today?",
        "What actions align with divine will?",
        "How do I offer all results to the Divine?",
        "Where is service needed most today?",
        "How can I work without attachment to outcomes?"
      ]
    },
    devotee_knowledge: {
      name: "The Devotee-Sage",
      subtitle: "Divine Lover-Knower",
      description: "You unite divine love with sacred wisdom and deep understanding.",
      emoji: "🕊️",
      practices: [
        "What is the Divine trying to teach me today?",
        "How does love and wisdom unite in my heart?",
        "What is the nature of the Divine Self?",
        "How do I know with the heart, not just the mind?",
        "What illusions is love dissolving?"
      ]
    },
    knowledge_doer: {
      name: "The Sage-Warrior",
      subtitle: "Wise Actor",
      description: "You combine deep wisdom with purposeful action in service of truth.",
      emoji: "⚔️",
      practices: [
        "How do I act from wisdom rather than reactivity?",
        "What actions serve the highest truth today?",
        "How do I remain unattached while fully engaged?",
        "What is my dharmic duty in this situation?",
        "Where can wisdom be applied practically?"
      ]
    },
    pure_doer: {
      name: "The Pure Karma Yogi",
      subtitle: "Selfless Actor",
      description: "You embody perfect action without attachment.",
      emoji: "🌟",
      practices: [
        "How do I act without any sense of doership?",
        "What would perfect selfless service look like?",
        "How do I work without attachment to results?",
        "Where can I serve most effectively today?",
        "How do I become a pure instrument?"
      ]
    },
    pure_knowledge: {
      name: "The Pure Jnani",
      subtitle: "Knower of Truth",
      description: "You embody pure wisdom and direct knowledge.",
      emoji: "🧘",
      practices: [
        "Who am I beyond all identifications?",
        "What is the nature of ultimate reality?",
        "How do I rest in pure awareness?",
        "What is real and what is illusion?",
        "How do I abide in the Self?"
      ]
    }
  };

  const handleLogin = () => {
    if (email && password) {
      setScreen('dashboard');
      setLoginError('');
    } else {
      setLoginError('Please enter email and password.');
    }
  };

  const calculateResult = (allAnswers) => {
    let devotionScore = 0;
    let knowledgeScore = 0;
    let actionScore = 0;

    allAnswers.forEach((answer, index) => {
      const score = ["Never", "Rarely", "Sometimes", "Often", "Always"].indexOf(answer);
      const question = questions[index];

      if (question.category === "Devotion") devotionScore += score;
      if (question.category === "Knowledge") knowledgeScore += score;
      if (question.category === "Action") actionScore += score;
    });

    const devotionPercent = Math.round((devotionScore / 40) * 100);
    const knowledgePercent = Math.round((knowledgeScore / 40) * 100);
    const actionPercent = Math.round((actionScore / 40) * 100);

    let type;
    if (devotionPercent >= 70 && devotionPercent > knowledgePercent + 15 && devotionPercent > actionPercent + 15) {
      type = 'devotee_pure';
    } else if (devotionPercent >= 55 && actionPercent >= 45 && devotionPercent > knowledgePercent) {
      type = 'devotee_doer';
    } else if (devotionPercent >= 55 && knowledgePercent >= 45 && devotionPercent > actionPercent) {
      type = 'devotee_knowledge';
    } else if (knowledgePercent >= 50 && actionPercent >= 45 && devotionPercent < 45) {
      type = 'knowledge_doer';
    } else if (actionPercent >= 70) {
      type = 'pure_doer';
    } else if (knowledgePercent >= 70) {
      type = 'pure_knowledge';
    } else {
      if (devotionPercent >= knowledgePercent && devotionPercent >= actionPercent) {
        type = 'devotee_doer';
      } else if (knowledgePercent >= actionPercent) {
        type = 'knowledge_doer';
      } else {
        type = 'pure_doer';
      }
    }

    return {
      type,
      scores: {
        devotion: devotionPercent,
        knowledge: knowledgePercent,
        action: actionPercent
      }
    };
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const calculatedResult = calculateResult(newAnswers);
      setResult(calculatedResult);
      setScreen('result');
    }
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setScreen('dashboard');
  };

  const handlePracticeComplete = (practiceIndex) => {
    const today = new Date().toDateString();
    const newCompletedPractices = [...completedPractices, { date: today, practiceIndex }];
    setCompletedPractices(newCompletedPractices);

    if (lastPracticeDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastPracticeDate === yesterday.toDateString()) {
        setStreak(streak + 1);
        if (streak + 1 === 7) {
          setAchievementText('7 Day Streak! 🔥');
          setShowAchievement(true);
          setTimeout(() => setShowAchievement(false), 3000);
        }
      } else {
        setStreak(1);
      }
      setLastPracticeDate(today);
    }
  };

  const fadeClass = 'fade-in';
  const buttonClass = 'button-hover';

  // Home/Login Screen
  if (screen === 'home') {
    return (
      <div className={fadeClass} style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '60px', marginBottom: '10px' }}>🧘‍♀️</div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#4a5568'
            }}>Inner Map</h1>
            <p style={{ color: '#718096', marginTop: '10px' }}>Discover your spiritual path</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#4a5568'
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none'
              }}
              placeholder="your@email.com"
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#4a5568'
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none'
              }}
              placeholder="••••••••"
            />
          </div>

          {loginError && (
            <div style={{ color: '#e53e3e', marginBottom: '10px', fontSize: '14px' }}>{loginError}</div>
          )}

          <button
            onClick={handleLogin}
            className={buttonClass}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>

          <p style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '14px',
            color: '#718096'
          }}>
            Enter any email and password to continue
          </p>
        </div>
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          .button-hover { transition: transform 0.2s, box-shadow 0.2s; }
          .button-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // Dashboard Screen
  if (screen === 'dashboard') {
    return (
      <div className={fadeClass} style={{
        minHeight: '100vh',
        background: '#f7fafc',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#2d3748'
            }}>Welcome back! 👋</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setScreen('profile')}
                className={buttonClass}
                style={{
                  padding: '10px 20px',
                  background: '#e2e8f0',
                  color: '#4a5568',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  setScreen('home');
                  localStorage.removeItem('innerMapData');
                }}
                className={buttonClass}
                style={{
                  padding: '10px 20px',
                  background: '#fed7d7',
                  color: '#c53030',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {streak > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              color: 'white',
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🔥 {streak} Day Streak!</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Keep up the great work!</div>
            </div>
          )}

          {result ? (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ fontSize: '60px', marginBottom: '10px' }}>
                  {personalityTypes[result.type].emoji}
                </div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '10px'
                }}>
                  {personalityTypes[result.type].name}
                </h2>
                <p style={{ color: '#718096', fontSize: '18px' }}>
                  {personalityTypes[result.type].subtitle}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#a78bfa', marginBottom: '5px' }}>
                    Devotion
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#7c3aed' }}>
                    {result.scores.devotion}%
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#60a5fa', marginBottom: '5px' }}>
                    Knowledge
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                    {result.scores.knowledge}%
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', color: '#34d399', marginBottom: '5px' }}>
                    Action
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
                    {result.scores.action}%
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => setScreen('practices')}
                  className={buttonClass}
                  style={{
                    padding: '14px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Daily Practices ✨
                </button>
                <button
                  onClick={resetQuiz}
                  className={buttonClass}
                  style={{
                    padding: '14px',
                    background: 'white',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#4a5568'
              }}>Discover Your Spiritual Path</h2>

              <p style={{
                marginBottom: '30px',
                color: '#718096',
                lineHeight: '1.6'
              }}>
                Take our comprehensive assessment with 30 questions to understand your unique spiritual personality
                across three dimensions: Devotion, Knowledge, and Action.
              </p>

              <button
                onClick={() => setScreen('quiz')}
                className={buttonClass}
                style={{
                  padding: '14px 30px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Start Assessment 🚀
              </button>
            </div>
          )}
        </div>
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          .button-hover { transition: transform 0.2s, box-shadow 0.2s; }
          .button-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // Quiz Screen
  if (screen === 'quiz') {
    const currentQuestion = questions[questionIndex];

    return (
      <div className={fadeClass} style={{
        minHeight: '100vh',
        background: '#f7fafc',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <div style={{
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#718096'
              }}>
                Question {questionIndex + 1} of {questions.length}
              </span>
              <span style={{
                fontSize: '14px',
                color: '#718096',
                background: '#edf2f7',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                {currentQuestion.category}
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '8px',
              background: '#e2e8f0',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div className="progress-bar" style={{
                width: `${((questionIndex + 1) / questions.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }} />
            </div>
          </div>

          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '30px',
            color: '#2d3748',
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            {currentQuestion.text}
          </h2>

          <div style={{
            display: 'grid',
            gap: '12px'
          }}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={buttonClass}
                style={{
                  padding: '16px',
                  background: '#f7fafc',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <div style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={() => {
                if (questionIndex > 0) setQuestionIndex(questionIndex - 1);
              }}
              className={buttonClass}
              style={{
                padding: '10px 20px',
                background: questionIndex === 0 ? '#e2e8f0' : '#667eea',
                color: questionIndex === 0 ? '#a0aec0' : 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: questionIndex === 0 ? 'default' : 'pointer',
                opacity: questionIndex === 0 ? 0.5 : 1
              }}
              disabled={questionIndex === 0}
            >
              ← Previous
            </button>
            <button
              onClick={() => setScreen('dashboard')}
              className={buttonClass}
              style={{
                padding: '10px 20px',
                background: '#e2e8f0',
                color: '#4a5568',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Exit
            </button>
          </div>
        </div>
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          .button-hover { transition: transform 0.2s, box-shadow 0.2s; }
          .button-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .progress-bar { transition: width 0.3s ease; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // Result Screen
  if (screen === 'result') {
    const personality = personalityTypes[result.type];

    return (
      <div className={fadeClass} style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <div style={{
            fontSize: '80px',
            marginBottom: '20px',
            animation: 'bounce 1s ease-in-out'
          }}>
            {personality.emoji}
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#2d3748'
          }}>Your Spiritual Path Revealed!</h1>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {personality.name}
          </h2>

          <p style={{
            fontSize: '20px',
            color: '#718096',
            marginBottom: '20px'
          }}>
            {personality.subtitle}
          </p>

          <p style={{
            marginBottom: '30px',
            color: '#4a5568',
            lineHeight: '1.6'
          }}>
            {personality.description}
          </p>

          <div style={{
            background: '#f7fafc',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '15px',
              color: '#4a5568'
            }}>Your Path Strengths</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '15px'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px'
                }}>
                  <span style={{ color: '#7c3aed' }}>💜 Devotion</span>
                  <span style={{ fontWeight: 'bold', color: '#7c3aed' }}>{result.scores.devotion}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#e9d8fd',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${result.scores.devotion}%`,
                    height: '100%',
                    background: '#7c3aed',
                    transition: 'width 1s ease-out'
                  }} />
                </div>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px'
                }}>
                  <span style={{ color: '#2563eb' }}>🧠 Knowledge</span>
                  <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{result.scores.knowledge}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#dbeafe',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${result.scores.knowledge}%`,
                    height: '100%',
                    background: '#2563eb',
                    transition: 'width 1s ease-out'
                  }} />
                </div>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px'
                }}>
                  <span style={{ color: '#059669' }}>⚡ Action</span>
                  <span style={{ fontWeight: 'bold', color: '#059669' }}>{result.scores.action}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#d1fae5',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${result.scores.action}%`,
                    height: '100%',
                    background: '#059669',
                    transition: 'width 1s ease-out'
                  }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gap: '12px'
          }}>
            <button
              onClick={() => setScreen('dashboard')}
              className={buttonClass}
              style={{
                padding: '14px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Continue to Dashboard
            </button>

            <button
              onClick={resetQuiz}
              className={buttonClass}
              style={{
                padding: '14px',
                background: 'white',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Take Again
            </button>
          </div>
        </div>
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          .button-hover { transition: transform 0.2s, box-shadow 0.2s; }
          .button-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // Practices Screen
  if (screen === 'practices') {
    const personality = result ? personalityTypes[result.type] : null;
    const today = new Date().toDateString();
    const todaysPractices = completedPractices.filter(p => p.date === today);

    return (
      <div className={fadeClass} style={{
        minHeight: '100vh',
        background: '#f7fafc',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setScreen('dashboard')}
              className={buttonClass}
              style={{
                padding: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              ←
            </button>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#2d3748'
            }}>Daily Practices</h1>
          </div>

          {personality ? (
            <div>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '20px',
                padding: '30px',
                marginBottom: '20px',
                color: 'white',
                textAlign: 'center',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>{personality.emoji}</div>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
                  Today's Practice for {personality.name}
                </h2>
                <p style={{ fontSize: '16px', opacity: 0.9 }}>
                  {todaysPractices.length} of {personality.practices.length} completed today
                </p>
              </div>

              {personality.practices.map((practice, index) => {
                const isCompleted = todaysPractices.some(p => p.practiceIndex === index);

                return (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      borderRadius: '15px',
                      padding: '20px',
                      marginBottom: '15px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      opacity: isCompleted ? 0.7 : 1,
                      transition: 'opacity 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: '16px',
                          color: '#4a5568',
                          lineHeight: '1.6',
                          marginBottom: '10px'
                        }}>
                          {practice}
                        </p>
                      </div>
                      <button
                        onClick={() => !isCompleted && handlePracticeComplete(index)}
                        className={buttonClass}
                        style={{
                          padding: '8px 16px',
                          background: isCompleted ? '#68d391' : '#edf2f7',
                          color: isCompleted ? 'white' : '#4a5568',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          cursor: isCompleted ? 'default' : 'pointer',
                          marginLeft: '10px',
                          whiteSpace: 'nowrap'
                        }}
                        disabled={isCompleted}
                      >
                        {isCompleted ? '✓ Done' : 'Complete'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎯</div>
              <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '20px' }}>
                Complete your assessment to receive personalized practices
              </p>
              <button
                onClick={() => setScreen('quiz')}
                className={buttonClass}
                style={{
                  padding: '14px 30px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Take Assessment
              </button>
            </div>
          )}
        </div>
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          .button-hover { transition: transform 0.2s, box-shadow 0.2s; }
          .button-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // Profile Screen
  if (screen === 'profile') {
    return (
      <div className={fadeClass} style={{
        minHeight: '100vh',
        background: '#f7fafc',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => setScreen('dashboard')}
              className={buttonClass}
              style={{
                padding: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              ←
            </button>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#2d3748'
            }}>Your Profile</h1>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '20px',
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '40px',
              color: 'white'
            }}>
              {email ? email[0].toUpperCase() : 'U'}
            </div>

            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2d3748',
              marginBottom: '10px'
            }}>
              {email || 'Spiritual Seeker'}
            </h2>

            {result && (
              <div style={{
                background: '#f7fafc',
                borderRadius: '15px',
                padding: '20px',
                marginTop: '20px'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                  {personalityTypes[result.type].emoji}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '5px'
                }}>
                  {personalityTypes[result.type].name}
                </h3>
                <p style={{ color: '#718096' }}>
                  {personalityTypes[result.type].subtitle}
                </p>
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '5px' }}>🔥</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f56565' }}>
                {streak}
              </div>
              <div style={{ fontSize: '14px', color: '#718096' }}>Day Streak</div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '5px' }}>✅</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#48bb78' }}>
                {completedPractices.length}
              </div>
              <div style={{ fontSize: '14px', color: '#718096' }}>Total Completed</div>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all data?')) {
                localStorage.removeItem('innerMapData');
                setResult(null);
                setStreak(0);
                setCompletedPractices([]);
                setLastPracticeDate(null);
                setScreen('dashboard');
              }
            }}
            className={buttonClass}
            style={{
              width: '100%',
              padding: '14px',
              background: '#fed7d7',
              color: '#c53030',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Reset All Data
          </button>
        </div>
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          .button-hover { transition: transform 0.2s, box-shadow 0.2s; }
          .button-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  if (showAchievement) {
    return (
      <>
        {screen === 'practices' && <div style={{ filter: 'blur(3px)' }}>...</div>}

        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '10px' }}>🏆</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
            Achievement Unlocked!
          </h2>
          <p style={{ fontSize: '18px', color: '#4a5568' }}>{achievementText}</p>
        </div>
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </>
    );
  }

  return null;
};

export default InnerMapApp;
