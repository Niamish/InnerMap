import React, { useState, useEffect } from 'react';
import { gitaQuotes } from './quoteLibrary';
import "./styles.css";

const InnerMapApp = () => {
  // All data stored in React state instead of localStorage
  const [screen, setScreen] = useState('home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [lastPracticeDate, setLastPracticeDate] = useState(null);
  const [completedPractices, setCompletedPractices] = useState([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementText, setAchievementText] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('im-dark') === 'true'
      : false
  );
  const [dailyInsight, setDailyInsight] = useState('');
  const [guidance, setGuidance] = useState(null);
  // Follow-up quiz state
  const [followupIndex, setFollowupIndex] = useState(0);
  const [followupAnswers, setFollowupAnswers] = useState([]);
  const [quote, setQuote] = useState("");
  const [followupScore, setFollowupScore] = useState(null);

  // Animation states for quiz
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Full 30 questions
  const questions = [
    { id: 1, category: 'Devotion', text: "Do you sometimes feel a longing you can't quite name or explain?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 4, category: 'Devotion', text: 'Do certain moments of beauty or kindness bring tears to your eyes?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 7, category: 'Devotion', text: 'Do you find peace when you stop trying to control outcomes?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 10, category: 'Devotion', text: "Have you ever felt the boundary between 'you' and 'everything else' dissolve?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 13, category: 'Devotion', text: 'Does seeing others suffer genuinely hurt your heart?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 16, category: 'Devotion', text: "Do you sometimes feel love so strong it's almost too much to contain?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 19, category: 'Devotion', text: "When someone calls you spiritual, do you feel they don't really know you?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 22, category: 'Devotion', text: 'Do beautiful moments feel like unexpected gifts?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 25, category: 'Devotion', text: 'Do you sometimes see something precious in every person you meet?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 28, category: 'Devotion', text: 'Do you ever feel overwhelming gratitude for existence itself?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 2, category: 'Knowledge', text: "Do you sometimes wonder if what you think is 'you' is actually real?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 5, category: 'Knowledge', text: 'Do thoughts sometimes feel like clouds passing through an open sky?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 8, category: 'Knowledge', text: "Do you find yourself wondering 'What is aware of my thoughts?'", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 12, category: 'Knowledge', text: 'Do you feel drawn to understand the deepest truths about existence?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 15, category: 'Knowledge', text: 'Are you sometimes aware of an unchanging presence that watches all experience?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 18, category: 'Knowledge', text: 'Do you sometimes question the very nature of reality itself?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 21, category: 'Knowledge', text: "Do you feel that what you call 'mind' is actually empty space?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 24, category: 'Knowledge', text: 'Do you feel more real in moments of complete stillness?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 27, category: 'Knowledge', text: "Have you ever realized that the 'searcher' and the 'sought' are the same?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 30, category: 'Knowledge', text: 'Do you sometimes feel that all knowledge is actually remembering?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 3, category: 'Action', text: 'When you see something that needs doing, do you naturally step forward?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 6, category: 'Action', text: 'Do people naturally come to you when things get difficult?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 9, category: 'Action', text: "Do you sometimes act so naturally that you forget you're the one doing it?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 11, category: 'Action', text: "Do you sometimes act to help others without thinking what's in it for you?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 14, category: 'Action', text: "Do you sometimes give or serve so naturally you don't think about it?", options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 17, category: 'Action', text: 'Do you sense when your actions flow with something greater than your personal will?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 20, category: 'Action', text: 'Do you naturally take charge when situations become chaotic?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 23, category: 'Action', text: 'Can you work with full intensity while feeling completely detached from results?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 26, category: 'Action', text: 'Do you prefer taking decisive action over endless analysis?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    { id: 29, category: 'Action', text: 'Do you feel most alive when serving others or a greater cause?', options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] }
  ];

  const personalityTypes = {
    devotee_pure: {
      name: 'The Pure Devotee',
      subtitle: 'Lover of Divine',
      description: 'You embody pure divine love and complete surrender to the highest truth.',
      emoji: '🙏',
      practices: [
        'How can I dissolve completely in divine love today?',
        'What would pure surrender look like in this moment?',
        'How do I serve without any sense of doership?',
        'What is blocking my heart from opening fully?',
        'How can I see only the Divine in everything?'
      ]
    },
    devotee_doer: {
      name: 'The Devotee-Doer',
      subtitle: 'Divine Servant in Action',
      description: 'You express divine love through dedicated service and righteous action.',
      emoji: '💝',
      practices: [
        'How can I serve the Divine through my work today?',
        'What actions align with divine will?',
        'How do I offer all results to the Divine?',
        'Where is service needed most today?',
        'How can I work without attachment to outcomes?'
      ]
    },
    devotee_knowledge: {
      name: 'The Devotee-Sage',
      subtitle: 'Divine Lover-Knower',
      description: 'You unite divine love with sacred wisdom and deep understanding.',
      emoji: '🕊️',
      practices: [
        'What is the Divine trying to teach me today?',
        'How does love and wisdom unite in my heart?',
        'What is the nature of the Divine Self?',
        'How do I know with the heart, not just the mind?',
        'What illusions is love dissolving?'
      ]
    },
    knowledge_doer: {
      name: 'The Sage-Warrior',
      subtitle: 'Wise Actor',
      description: 'You combine deep wisdom with purposeful action in service of truth.',
      emoji: '⚔️',
      practices: [
        'How do I act from wisdom rather than reactivity?',
        'What actions serve the highest truth today?',
        'How do I remain unattached while fully engaged?',
        'What is my dharmic duty in this situation?',
        'Where can wisdom be applied practically?'
      ]
    },
    pure_doer: {
      name: 'The Pure Karma Yogi',
      subtitle: 'Selfless Actor',
      description: 'You embody perfect action without attachment.',
      emoji: '🌟',
      practices: [
        'How do I act without any sense of doership?',
        'What would perfect selfless service look like?',
        'How do I work without attachment to results?',
        'Where can I serve most effectively today?',
        'How do I become a pure instrument?'
      ]
    },
    pure_knowledge: {
      name: 'The Pure Jnani',
      subtitle: 'Knower of Truth',
      description: 'You embody pure wisdom and direct knowledge.',
      emoji: '🧘',
      practices: [
        'Who am I beyond all identifications?',
        'What is the nature of ultimate reality?',
        'How do I rest in pure awareness?',
        'What is real and what is illusion?',
        'How do I abide in the Self?'
      ]
    } 
  };

  const personalityInsights = {
    devotee_pure: [
      'Let devotion be your guide in every moment.',
      'Surrender fully to what is and notice the peace that follows.'
    ],
    devotee_doer: [
      'Channel your love into acts of service today.',
      'Small acts done with great love transform the world.'
    ],
    devotee_knowledge: [
      'Let wisdom soften your heart into deeper compassion.',
      'Contemplate how love and truth arise together.'
    ],
    knowledge_doer: [
      'Apply your insights in practical ways for others.',
      'Wise action is the bridge between understanding and service.'
    ],
    pure_doer: [
      'Selfless work purifies the mind and opens the heart.',
      'See if you can act without clinging to the outcome.'
    ],
    pure_knowledge: [
      'Rest in awareness and notice the quiet joy within.',
      'Let each experience reveal the truth of who you are.'
    ]
  };

  const followupQuestions = {
    devotee_pure: [
      'Do you often feel a deep longing for union with the divine?',
      'Does devotional music or chanting move you profoundly?',
      'Do you easily offer your successes and failures to a higher power?',
      'Does your heart expand during prayer or meditation?',
      'Do you see love as the ultimate path to liberation?'
    ],
    devotee_doer: [
      'Is serving others your primary expression of devotion?',
      'Do you feel energized when acting on behalf of a noble cause?',
      'Do you enjoy organizing service projects or community events?',
      'Do you balance personal ambition with a sense of spiritual duty?',
      'Do you often feel guided in your actions by divine inspiration?'
    ],
    devotee_knowledge: [
      'Do you study spiritual texts to deepen your devotion?',
      'Do insights into reality open your heart even more?',
      'Do you prefer contemplation over rituals?',
      'Does understanding spiritual principles motivate your service?',
      'Is wisdom inseparable from love in your experience?'
    ],
    knowledge_doer: [
      'Do you apply philosophical concepts directly in your life?',
      'Does acting from clarity feel more important than emotional impulse?',
      'Do you value discipline as a way to embody wisdom?',
      'Do you seek mentors to refine your skills?',
      'Is living your truth the highest form of knowledge?'
    ],
    pure_doer: [
      'Do you act without expecting anything in return?',
      'Does work feel natural when it benefits others?',
      'Do you prefer direct action over introspection?',
      'Do you feel most fulfilled when fully immersed in tasks?',
      'Is detachment from results easy for you?'
    ],
    pure_knowledge: [
      'Do you frequently inquire into "Who am I?"',
      'Is inner silence more valuable than external achievements?',
      'Do you naturally witness thoughts without identifying with them?',
      'Does the idea of non-duality resonate deeply with you?',
      'Do you feel that true knowledge cannot be expressed in words?'
    ]
  };

  const followupInsights = {
    devotee_pure: 'Your devotion is deep and heartfelt. Continue surrendering.',
    devotee_doer: 'Service further opens your heart. Keep helping others.',
    devotee_knowledge: 'Blend your love with wisdom for balanced growth.',
    knowledge_doer: 'Act from clarity and let wisdom guide your deeds.',
    pure_doer: 'Selfless action is your greatest teacher. Trust the flow.',
    pure_knowledge: 'Abide as awareness and let silence reveal the truth.'
  };

  const personalityPDFs = {
    devotee_pure: 'pdfs/devotee_pure.pdf',
    devotee_doer: 'pdfs/devotee_doer.pdf',
    devotee_knowledge: 'pdfs/devotee_knowledge.pdf',
    knowledge_doer: 'pdfs/knowledge_doer.pdf',
    pure_doer: 'pdfs/pure_doer.pdf',
    pure_knowledge: 'pdfs/pure_knowledge.pdf'
  };

  const gitaGuidance = {
    devotee_pure: {
      verse: 'BG 9.22',
      text: 'To those who are constantly devoted and worship Me with love, I give the understanding by which they can come to Me.',
      guidance: 'Your path is pure devotion. Cultivate love and surrender.'
    },
    devotee_doer: {
      verse: 'BG 3.9',
      text: 'Work done as a sacrifice for the Supreme must be performed, otherwise work binds one to this material world.',
      guidance: 'Let every action be an offering. Serve selflessly.'
    },
    devotee_knowledge: {
      verse: 'BG 7.17',
      text: 'Of these, the wise one who is in full knowledge in union with me through devotion is the best.',
      guidance: 'Let wisdom illuminate your love.'
    },
    knowledge_doer: {
      verse: 'BG 4.18',
      text: 'One who sees inaction in action, and action in inaction, is intelligent among men.',
      guidance: 'Act from clear understanding.'
    },
    pure_doer: {
      verse: 'BG 2.47',
      text: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.',
      guidance: 'Focus on perfect action without attachment.'
    },
    pure_knowledge: {
      verse: 'BG 4.38',
      text: 'In this world, there is nothing so sublime and pure as transcendental knowledge.',
      guidance: 'Seek the highest truth through inquiry.'
    }
  };

  useEffect(() => {
    setSelectedAnswer(answers[questionIndex] || null);
  }, [questionIndex, answers]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('im-dark', darkMode);
      localStorage.setItem('im-dark', darkMode ? 'true' : 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    if (isLoggedIn) {
      loadStoredResult();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
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
      const score = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'].indexOf(answer);
      const question = questions[index];

      if (question.category === 'Devotion') devotionScore += score;
      if (question.category === 'Knowledge') knowledgeScore += score;
      if (question.category === 'Action') actionScore += score;
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

  const getRandomInsight = (type) => {
    const list = personalityInsights[type] || [];
    return list[Math.floor(Math.random() * list.length)] || '';
  };

  const getRandomQuote = () => gitaQuotes[Math.floor(Math.random() * gitaQuotes.length)] || "";
  const storeResult = (data) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('im-result', JSON.stringify(data));
    }
  };

  const loadStoredResult = () => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('im-result');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setResult(parsed);
          setDailyInsight(getRandomInsight(parsed.type));
          setQuote(getRandomQuote());
          setGuidance(gitaGuidance[parsed.type]);
        } catch (e) {
          console.error('Failed to parse stored result', e);
        }
      }
    }
  };

  const refreshInsight = () => {
    if (result) {
      setDailyInsight(getRandomInsight(result.type));
      setQuote(getRandomQuote());
      setGuidance(gitaGuidance[result.type]);
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(answers[questionIndex + 1] || null);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setSelectedAnswer(answers[questionIndex - 1] || null);
    }
  };

  const handleAnswer = (answer) => {
    const updated = [...answers];
    updated[questionIndex] = answer;
    setAnswers(updated);

    if (questionIndex < questions.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setSelectedAnswer(updated[nextIndex] || null);
      setIsTransitioning(false);
    } else {
      const calculatedResult = calculateResult(updated);
      setResult(calculatedResult);
      storeResult(calculatedResult);
      setDailyInsight(getRandomInsight(calculatedResult.type));
      setQuote(getRandomQuote());
      setGuidance(gitaGuidance[calculatedResult.type]);
      setScreen('result');
    }
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setScreen('dashboard');
    setIsTransitioning(false);
    setSelectedAnswer(null);
    resetFollowup();
  };

  const resetFollowup = () => {
    setFollowupIndex(0);
    setFollowupAnswers([]);
    setFollowupScore(null);
  };

  const handleFollowupAnswer = (answer) => {
    if (!result) return;
    const updated = [...followupAnswers];
    updated[followupIndex] = answer;
    setFollowupAnswers(updated);

    const list = followupQuestions[result.type] || [];
    if (followupIndex < list.length - 1) {
      setFollowupIndex(followupIndex + 1);
    } else {
      const total = updated.reduce(
        (sum, ans) =>
          sum + ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'].indexOf(ans),
        0
      );
      const percent = Math.round((total / (list.length * 4)) * 100);
      setFollowupScore(percent);
      setScreen('followupResult');
    }
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

  const handleSignOut = () => {
    setScreen('home');
    setEmail('');
    setPassword('');
    setIsLoggedIn(false);
    setResult(null);
    setDailyInsight('');
    setGuidance(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('im-result');
    }
    setStreak(0);
    setLastPracticeDate(null);
    setCompletedPractices([]);
    setQuestionIndex(0);
    setAnswers([]);
    resetFollowup();
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      setResult(null);
      setDailyInsight('');
      setQuote('');
      setGuidance(null);
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('im-result');
      }
      setStreak(0);
      setCompletedPractices([]);
      setLastPracticeDate(null);
      resetFollowup();
      setScreen('dashboard');
    }
  };

  const shareResult = () => {
    if (!result) return;
    const personality = personalityTypes[result.type];
    const text = `My InnerMap result: ${personality.name} - ${personality.subtitle}`;
    try {
      if (navigator.share) {
        navigator.share({ title: 'My InnerMap Result', text });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert('Result copied to clipboard!');
      }
    } catch (err) {
      console.error('Sharing failed', err);
    }
  };


  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
      const testLine = line + word + " ";
      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  };

  const downloadQuoteCard = () => {
    if (!quote) return;
    const width = Math.min(800, window.innerWidth * 0.9);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = width * 0.6;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#6b21a8");
    gradient.addColorStop(1, "#b794f4");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "bold 28px serif";
    const lines = wrapText(ctx, quote, canvas.width - 60);
    lines.forEach((line, i) =>
      ctx.fillText(line, canvas.width / 2, canvas.height / 2 - (lines.length - 1 - i) * 32)
    );
    ctx.font = "16px sans-serif";
    ctx.fillText("Bhagavad Gita", canvas.width / 2, canvas.height - 30);
    const link = document.createElement("a");
    link.download = "wisdom-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  const openPersonalityPDF = (type) => {
    const url = personalityPDFs[type];
    if (url) {
      window.open(url, '_blank');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-5 overflow-y-auto">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl transform transition-all hover:scale-105">
          <div className="flex justify-end mb-2">
            <button
              onClick={toggleDarkMode}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧘‍♀️</div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Inner Map</h1>
            <p className="text-gray-600 mt-2">Discover your spiritual path</p>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="••••••••"
            />
          </div>

          {loginError && (
            <div className="text-red-500 mb-3 text-sm">{loginError}</div>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg transform transition-all hover:-translate-y-1"
          >
            Sign In
          </button>

          <p className="text-center mt-5 text-sm text-gray-600">
            Enter any email and password to continue
          </p>
        </div>
      </div>
    );
  }

  if (screen === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50 p-5 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Welcome back! 👋</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setScreen('profile')}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Profile
              </button>
              <button
                onClick={toggleDarkMode}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {darkMode ? 'Light' : 'Dark'} Mode
              </button>
              <button
                onClick={handleSignOut}
                className="px-5 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {streak > 0 && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-5 mb-6 text-white text-center">
              <div className="text-2xl mb-1">🔥 {streak} Day Streak!</div>
              <div className="text-sm opacity-90">Keep up the great work!</div>
            </div>
          )}

          {result ? (
            <div className="bg-white rounded-3xl p-10 shadow-xl mb-6">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {personalityTypes[result.type].emoji}
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                  {personalityTypes[result.type].name}
                </h2>
                <p className="text-xl text-gray-600">
                  {personalityTypes[result.type].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-sm text-purple-600 mb-1">Devotion</div>
                  <div className="text-2xl font-bold text-purple-700">{result.scores.devotion}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-blue-600 mb-1">Knowledge</div>
                  <div className="text-2xl font-bold text-blue-700">{result.scores.knowledge}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-green-600 mb-1">Action</div>
                  <div className="text-2xl font-bold text-green-700">{result.scores.action}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setScreen('practices')}
                  className="py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Daily Practices ✨
                </button>
                <button
                  onClick={() => {
                    setQuestionIndex(0);
                    setAnswers([]);
                    setScreen('quiz');
                    setIsTransitioning(false);
                    setSelectedAnswer(null);
                  }}
                  className="py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 shadow-xl">
              <h2 className="text-2xl font-semibold mb-5 text-gray-800">
                Discover Your Spiritual Path
              </h2>
              <p className="mb-8 text-gray-600 leading-relaxed">
                Take our comprehensive assessment with 30 questions to understand your unique spiritual personality
                across three dimensions: Devotion, Knowledge, and Action.
              </p>
              <button
                onClick={() => {
                  setScreen('quiz');
                  setIsTransitioning(false);
                  setSelectedAnswer(null);
                }}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg transform transition-all hover:-translate-y-1"
              >
                Start Assessment 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === 'quiz') {
    const currentQuestion = questions[questionIndex];
    const progress = ((questionIndex + 1) / questions.length) * 100;

    const handleAnswerWithAnimation = (answer) => {
      setSelectedAnswer(answer);
      setIsTransitioning(true);
      setTimeout(() => {
        handleAnswer(answer);
        setIsTransitioning(false);
        setSelectedAnswer(null);
      }, 400);
    };

    const handlePreviousWithAnimation = () => {
      if (questionIndex > 0) {
        setIsTransitioning(true);
        setTimeout(() => {
          handlePreviousQuestion();
          setIsTransitioning(false);
        }, 200);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 p-5 flex items-center justify-center overflow-y-auto">
        <div className="bg-white rounded-3xl p-10 max-w-2xl w-full shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50 pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-5">
                <span className="text-sm text-gray-600 animate-fade-in">
                  Question {questionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full animate-bounce">
                  {currentQuestion.category}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div
                    className="absolute inset-0 -inset-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    style={{ animation: 'shimmer 2s infinite', animationDelay: '1s' }}
                  />
                </div>
              </div>
            </div>

            <div
              className="transition-all duration-300"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
              }}
            >
              <h2
                className="text-2xl font-semibold mb-8 text-gray-800 text-center leading-relaxed"
                style={{ animation: 'slideIn 0.6s ease-out' }}
              >
                {currentQuestion.text}
              </h2>

              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerWithAnimation(option)}
                    disabled={isTransitioning}
                    className={`
                      p-4 rounded-xl font-medium transition-all duration-300 relative overflow-hidden
                      ${selectedAnswer === option
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-50 border-2 border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-300 hover:shadow-md'}
                      ${isTransitioning && selectedAnswer !== option ? 'opacity-50' : ''}
                    `}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 50}ms both`,
                      transform: selectedAnswer === option ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.3s ease-out'
                    }}
                  >
                    <span className={`inline-flex items-center justify-center w-full ${selectedAnswer === option ? 'animate-pulse' : ''}`}>
                      {option}
                      {selectedAnswer === option && (
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" style={{ animation: 'bounceIn 0.6s ease-out' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                    {selectedAnswer === option && (
                      <span className="absolute inset-0 bg-white opacity-20" style={{ animation: 'ripple 0.6s ease-out' }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-between animate-fade-in">
              <button
                onClick={handlePreviousWithAnimation}
                className={`
                  px-5 py-2 rounded-lg font-medium transition-all duration-200
                  ${questionIndex === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-md active:scale-95'}
                `}
                disabled={questionIndex === 0 || isTransitioning}
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  setScreen('dashboard');
                  setIsTransitioning(false);
                  setSelectedAnswer(null);
                }}
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200 hover:shadow-md active:scale-95"
                disabled={isTransitioning}
              >
                Exit
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
          @keyframes ripple {
            0% { transform: scale(0); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-out; }
          .im-dark { background-color: #0d1117; color: #f7fafc; transition: background-color 0.3s ease; }
          .im-dark .bg-white { background-color: #202733 !important; }
          .im-dark .text-gray-800 { color: #f7fafc !important; }
          .im-dark input { background-color: #374151; color: #f7fafc; }
          .im-dark .bg-gray-50 { background-color: #1a202c; }
          .im-dark .text-gray-700 { color: #e2e8f0; }
          .im-dark .bg-gray-100 { background-color: #374151; }
          .im-dark .bg-gray-200 { background-color: #4a5568; }
          .im-dark .bg-gray-300 { background-color: #4a5568; }
          .im-dark .border-gray-300 { border-color: #4a5568; }
          .im-dark .text-gray-500 { color: #a0aec0; }
          img { max-width: 100%; height: auto; }
          .im-dark img { opacity: 0.9; }
      `}</style>
    </div>
  );
  }

  if (screen === 'followupQuiz' && result) {
    const list = followupQuestions[result.type] || [];
    const current = list[followupIndex];
    const progress = ((followupIndex + 1) / list.length) * 100;
    return (
      <div className="min-h-screen bg-gray-50 p-5 flex items-center justify-center overflow-y-auto">
        <div className="bg-white rounded-3xl p-10 max-w-2xl w-full shadow-xl relative">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">More Insight</h2>
            <p className="text-gray-600">Question {followupIndex + 1} of {list.length}</p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-purple-600" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-5 text-gray-800 text-center">{current}</h3>
          <div className="grid gap-3">
            {['Never','Rarely','Sometimes','Often','Always'].map((opt) => (
              <button
                key={opt}
                onClick={() => handleFollowupAnswer(opt)}
                className="bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-lg p-3 hover:bg-purple-50 hover:border-purple-300"
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={() => { resetFollowup(); setScreen('dashboard'); }}
            className="mt-6 px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'result') {
    const personality = personalityTypes[result.type];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-5 overflow-y-auto">
        <div className="bg-white rounded-3xl p-10 max-w-2xl w-full shadow-2xl text-center">
          <div className="text-8xl mb-5 animate-bounce">{personality.emoji}</div>
          <h1 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Your Spiritual Path Revealed!</h1>
          <h2 className="text-3xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{personality.name}</h2>
          <p className="text-xl text-gray-600 mb-5">{personality.subtitle}</p>
          <p className="mb-8 text-gray-700 leading-relaxed">{personality.description}</p>
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Path Strengths</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1"><span className="text-purple-700">💜 Devotion</span><span className="font-bold text-purple-700">{result.scores.devotion}%</span></div>
                <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden"><div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${result.scores.devotion}%` }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span className="text-blue-700">🧠 Knowledge</span><span className="font-bold text-blue-700">{result.scores.knowledge}%</span></div>
                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${result.scores.knowledge}%` }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span className="text-green-700">⚡ Action</span><span className="font-bold text-green-700">{result.scores.action}%</span></div>
                <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden"><div className="h-full bg-green-600 transition-all duration-1000" style={{ width: `${result.scores.action}%` }} /></div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-semibold mb-2 text-purple-800">Daily Insight</h3>
            <p className="text-gray-700">{dailyInsight}</p>
            <button
              onClick={refreshInsight}
              className="mt-3 text-sm text-purple-600 underline"
            >
              New Insight
            </button>
          </div>
          {guidance && (
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-purple-800">Gita Guidance</h3>
              <p className="text-gray-800 font-medium mb-1">{guidance.verse}</p>
              <p className="text-gray-700 italic mb-3">"{guidance.text}"</p>
              <p className="text-gray-700">{guidance.guidance}</p>
            </div>
          )}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-purple-800">Wisdom Quote</h3>
            <p className="text-gray-700 italic">{quote}</p>
            <button onClick={downloadQuoteCard} className="mt-3 text-sm text-purple-600 underline">Download Card</button>
          </div>
          <div className="grid gap-3">
            <button
              onClick={shareResult}
              className="py-3 bg-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Share Result 📤
            </button>
            <button
              onClick={() => openPersonalityPDF(result.type)}
              className="py-3 bg-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              View Guide 📄
            </button>
            <button
              onClick={() => {
                resetFollowup();
                setScreen('followupQuiz');
              }}
              className="py-3 bg-yellow-50 text-purple-700 border-2 border-purple-600 rounded-lg font-semibold hover:bg-yellow-100 transition-all"
            >
              Deepen Insight
            </button>
            <button onClick={() => setScreen('dashboard')} className="py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all">Continue to Dashboard</button>
            <button onClick={() => { setQuestionIndex(0); setAnswers([]); setScreen('quiz'); setIsTransitioning(false); setSelectedAnswer(null); }} className="py-3 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all">Take Again</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'followupResult' && result) {
    const personality = personalityTypes[result.type];
    const message = followupInsights[result.type];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-5 overflow-y-auto">
        <div className="bg-white rounded-3xl p-10 max-w-xl w-full shadow-2xl text-center">
          <div className="text-7xl mb-4">{personality.emoji}</div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Thanks for digging deeper!</h2>
          <p className="text-lg text-gray-700 mb-6">{message}</p>
          {followupScore !== null && (
            <p className="text-gray-600 mb-6">Insight score: {followupScore}%</p>
          )}
          <button
            onClick={() => setScreen('dashboard')}
            className="py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'practices') {
    const personality = result ? personalityTypes[result.type] : null;
    const today = new Date().toDateString();
    const todaysPractices = completedPractices.filter(p => p.date === today);
    return (
      <div className="min-h-screen bg-gray-50 p-5 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => setScreen('dashboard')} className="text-2xl mr-3 hover:text-purple-600 transition-colors">←</button>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Daily Practices</h1>
          </div>
          {personality ? (
            <div>
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 mb-6 text-white text-center">
                <div className="text-5xl mb-3">{personality.emoji}</div>
                <h2 className="text-2xl mb-2">Today's Practice for {personality.name}</h2>
                <p className="text-base opacity-90">{todaysPractices.length} of {personality.practices.length} completed today</p>
              </div>
          {personality.practices.map((practice, index) => {
            const isCompleted = todaysPractices.some(p => p.practiceIndex === index);
            return (
              <div key={index} className={`bg-white rounded-2xl p-5 mb-4 shadow-md ${isCompleted ? 'opacity-70' : ''} transition-opacity`}>
                    <div className="flex items-start justify-between">
                      <p className="text-gray-700 leading-relaxed flex-1 mr-3">{practice}</p>
                      <button onClick={() => !isCompleted && handlePracticeComplete(index)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isCompleted ? 'bg-green-500 text-white cursor-default' : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'}`} disabled={isCompleted}>{isCompleted ? '✓ Done' : 'Complete'}</button>
                    </div>
              </div>
            );
          })}
          <button
            onClick={() => result && openPersonalityPDF(result.type)}
            className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Open Full Guide
          </button>
        </div>
      ) : (
            <div className="bg-white rounded-3xl p-10 text-center">
              <div className="text-6xl mb-5">🎯</div>
              <p className="text-lg text-gray-700 mb-6">Complete your assessment to receive personalized practices</p>
              <button onClick={() => { setScreen('quiz'); setIsTransitioning(false); setSelectedAnswer(null); }} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all">Take Assessment</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50 p-5 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => setScreen('dashboard')} className="text-2xl mr-3 hover:text-purple-600 transition-colors">←</button>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Your Profile</h1>
          </div>

          <div className="bg-white rounded-3xl p-8 mb-6 text-center shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl text-white">
              {email ? email[0].toUpperCase() : 'U'}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {email || 'Spiritual Seeker'}
            </h2>

            {result && (
              <div className="bg-gray-50 rounded-2xl p-5 mt-5">
                <div className="text-4xl mb-3">{personalityTypes[result.type].emoji}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{personalityTypes[result.type].name}</h3>
                <p className="text-gray-600">{personalityTypes[result.type].subtitle}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 text-center shadow-md">
              <div className="text-3xl mb-1">🔥</div>
              <div className="text-2xl font-bold text-red-500">{streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>

            <div className="bg-white rounded-2xl p-5 text-center shadow-md">
              <div className="text-3xl mb-1">✅</div>
              <div className="text-2xl font-bold text-green-500">{completedPractices.length}</div>
              <div className="text-sm text-gray-600">Total Completed</div>
            </div>
          </div>

          <button onClick={handleResetData} className="w-full py-3 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-colors">
            Reset All Data
          </button>
        </div>
      </div>
    );
  }

  if (showAchievement) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center transform scale-110 animate-bounce">
            <div className="text-6xl mb-3">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Achievement Unlocked!</h2>
            <p className="text-lg text-gray-600">{achievementText}</p>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default InnerMapApp;
