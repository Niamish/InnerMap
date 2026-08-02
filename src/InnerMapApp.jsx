import React, { useEffect, useState } from 'react';
import { gitaQuotes } from './quoteLibrary';
import './styles.css';
import { questions } from './data/questions';
import { personalityTypes, personalityInsights } from './data/personality';
import { followupQuestions, followupInsights } from './data/followup';
import { gitaGuidance } from './data/guidance';
import { personalityPDFs } from './data/pdfs';
import { calculateResult, wrapText } from './utils/quiz';

const answerScale = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'];

const iconPaths = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-5h5v5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z"/>',
  practice: '<path d="M12 21c4.8-2.4 7-6.2 7-11.4V4l-7-2-7 2v5.6C5 14.8 7.2 18.6 12 21Z"/><path d="m9 12 2 2 4-5"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  sun: '<circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"/>',
  arrowLeft: '<path d="m15 18-6-6 6-6"/>',
  arrowRight: '<path d="m9 18 6-6-6-6"/>',
  refresh: '<path d="M20 7v5h-5"/><path d="M4 17v-5h5"/><path d="M6.1 8.5A7 7 0 0 1 18.4 6L20 12M4 12l1.6 6a7 7 0 0 0 12.3-2.5"/>',
  share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.6M8.2 13.2l7.6 4.6"/>',
  download: '<path d="M12 3v12M7.5 10.5 12 15l4.5-4.5"/><path d="M4 20h16"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"/><path d="M20 4.5A2.5 2.5 0 0 0 17.5 2H13v17h4.5a2.5 2.5 0 0 1 2.5 2.5v-17Z"/>',
  check: '<path d="m5 12 4.2 4L19 6.5"/>',
  flame: '<path d="M13.5 2.5c.4 3-1 4.3-2.4 5.8-1.5 1.6-3 3.2-2.2 6 .4-1.3 1.2-2.2 2.1-3.1-.1 2.1 1 3.2 2.4 4.4 1.2 1 1.6 2.2 1.4 3.9 3-1.3 5.2-4 5.2-7.5 0-4.5-3-7.6-6.5-9.5Z"/><path d="M9.4 9.5C6.4 11 4 13.4 4 16.5A5.5 5.5 0 0 0 9.5 22c1.3 0 2.5-.4 3.5-1.2"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>',
  spark: '<path d="m12 2 1.6 5.1L19 9l-5.4 1.9L12 16l-1.6-5.1L5 9l5.4-1.9L12 2Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
};

const Icon = ({ name, size = 20 }) => (
  <svg
    className="icon"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: iconPaths[name] || iconPaths.compass }}
  />
);

const BrandMark = ({ compact = false }) => (
  <span className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20.5" />
      <circle cx="24" cy="24" r="8" />
      <path d="M24 3.5v40M6.2 34.2 41.8 13.8M6.2 13.8l35.6 20.4" />
      <circle cx="24" cy="24" r="2.2" className="brand-mark__core" />
    </svg>
  </span>
);

const CompassMap = ({ scores, compact = false, progress = 0 }) => {
  const values = scores || { devotion: 72, knowledge: 62, action: 78 };
  const axes = [
    { key: 'devotion', label: 'Devotion', angle: -90 },
    { key: 'knowledge', label: 'Knowledge', angle: 30 },
    { key: 'action', label: 'Action', angle: 150 },
  ];
  const center = 150;
  const maxRadius = 92;
  const pointFor = (angle, radius) => {
    const radians = (angle * Math.PI) / 180;
    return `${center + Math.cos(radians) * radius},${center + Math.sin(radians) * radius}`;
  };
  const polygon = axes.map(({ key, angle }) => pointFor(angle, Math.max(18, values[key] * 0.92))).join(' ');

  return (
    <div className={`compass-map ${compact ? 'compass-map--compact' : ''}`}>
      <svg viewBox="0 0 300 300" role="img" aria-label="Your three-path inner compass">
        <defs>
          <radialGradient id="compassGlow">
            <stop offset="0" stopColor="var(--accent)" stopOpacity=".2" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="150" cy="150" r="130" className="compass-map__halo" />
        <circle cx="150" cy="150" r="102" className="compass-map__ring compass-map__ring--outer" />
        <circle cx="150" cy="150" r="68" className="compass-map__ring" />
        <circle cx="150" cy="150" r="34" className="compass-map__ring" />
        <circle cx="150" cy="150" r="112" className="compass-map__progress-track" />
        <circle
          cx="150"
          cy="150"
          r="112"
          pathLength="100"
          className="compass-map__progress"
          style={{ strokeDashoffset: 100 - progress }}
        />
        {axes.map(({ key, label, angle }) => {
          const [x, y] = pointFor(angle, maxRadius).split(',');
          const [lx, ly] = pointFor(angle, 122).split(',');
          return (
            <g key={key}>
              <line x1="150" y1="150" x2={x} y2={y} className="compass-map__axis" />
              <circle cx={x} cy={y} r="4.5" className={`compass-map__node compass-map__node--${key}`} />
              <text x={lx} y={ly} className="compass-map__label" textAnchor="middle" dominantBaseline="middle">
                {label}
              </text>
            </g>
          );
        })}
        <polygon points={polygon} className="compass-map__shape" />
        <circle cx="150" cy="150" r="37" fill="url(#compassGlow)" />
        <circle cx="150" cy="150" r="7" className="compass-map__center" />
        <circle cx="150" cy="150" r="2" className="compass-map__center-dot" />
      </svg>
    </div>
  );
};

const ThemeButton = ({ darkMode, onClick, label = true }) => (
  <button className="icon-button theme-button" type="button" onClick={onClick} aria-label={`Use ${darkMode ? 'light' : 'dark'} theme`}>
    <Icon name={darkMode ? 'sun' : 'moon'} />
    {label && <span>{darkMode ? 'Light' : 'Dark'}</span>}
  </button>
);

const ScreenHeader = ({ eyebrow, title, description, action }) => (
  <header className="screen-header">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="screen-header__description">{description}</p>}
    </div>
    {action}
  </header>
);

const ScoreRow = ({ label, value, index }) => (
  <div className="score-row">
    <div className="score-row__meta">
      <span><i>{String(index).padStart(2, '0')}</i>{label}</span>
      <strong>{value}%</strong>
    </div>
    <div className="score-row__track" aria-label={`${label}: ${value} percent`}>
      <span style={{ '--score': `${value}%` }} />
    </div>
  </div>
);

const navItems = [
  { id: 'dashboard', label: 'Map', icon: 'home' },
  { id: 'quiz', label: 'Assess', icon: 'compass' },
  { id: 'practices', label: 'Practice', icon: 'practice' },
  { id: 'profile', label: 'Self', icon: 'profile' },
];

const InnerMapApp = () => {
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
    typeof window !== 'undefined' ? localStorage.getItem('im-dark') !== 'false' : true
  );
  const [dailyInsight, setDailyInsight] = useState('');
  const [guidance, setGuidance] = useState(null);
  const [followupIndex, setFollowupIndex] = useState(0);
  const [followupAnswers, setFollowupAnswers] = useState([]);
  const [quote, setQuote] = useState('');
  const [followupScore, setFollowupScore] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shareStatus, setShareStatus] = useState('');

  const personality = result ? personalityTypes[result.type] : null;

  useEffect(() => {
    setSelectedAnswer(answers[questionIndex] || null);
  }, [questionIndex, answers]);

  useEffect(() => {
    document.documentElement.classList.toggle('im-dark', darkMode);
    localStorage.setItem('im-dark', darkMode ? 'true' : 'false');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#17130f' : '#f4efe5');
  }, [darkMode]);

  useEffect(() => {
    if (isLoggedIn) loadStoredResult();
  }, [isLoggedIn]);

  const navigate = (nextScreen) => {
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getRandomInsight = (type) => {
    const list = personalityInsights[type] || [];
    return list[Math.floor(Math.random() * list.length)] || '';
  };

  const getRandomQuote = () => gitaQuotes[Math.floor(Math.random() * gitaQuotes.length)] || '';

  const hydrateResult = (nextResult) => {
    setResult(nextResult);
    setDailyInsight(getRandomInsight(nextResult.type));
    setQuote(getRandomQuote());
    setGuidance(gitaGuidance[nextResult.type]);
  };

  const storeResult = (data) => localStorage.setItem('im-result', JSON.stringify(data));

  const loadStoredResult = () => {
    const stored = localStorage.getItem('im-result');
    if (!stored) return;
    try {
      hydrateResult(JSON.parse(stored));
    } catch (error) {
      console.error('Failed to parse stored result', error);
      localStorage.removeItem('im-result');
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setLoginError('Enter both fields to open your map.');
      return;
    }
    setIsLoggedIn(true);
    setLoginError('');
    navigate('dashboard');
  };

  const refreshInsight = () => {
    if (!result) return;
    setDailyInsight(getRandomInsight(result.type));
    setQuote(getRandomQuote());
  };

  const finishAssessment = (updatedAnswers) => {
    const calculatedResult = calculateResult(updatedAnswers, questions);
    hydrateResult(calculatedResult);
    storeResult(calculatedResult);
    navigate('result');
  };

  const handleAnswer = (answer) => {
    if (isTransitioning) return;
    const updated = [...answers];
    updated[questionIndex] = answer;
    setAnswers(updated);
    setSelectedAnswer(answer);
    setIsTransitioning(true);

    window.setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((current) => current + 1);
      } else {
        finishAssessment(updated);
      }
      setIsTransitioning(false);
    }, 320);
  };

  const handlePreviousQuestion = () => {
    if (questionIndex === 0 || isTransitioning) return;
    setQuestionIndex((current) => current - 1);
  };

  const beginAssessment = () => {
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setIsTransitioning(false);
    navigate('quiz');
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
      setFollowupIndex((current) => current + 1);
      return;
    }
    const total = updated.reduce((sum, item) => sum + answerScale.indexOf(item), 0);
    setFollowupScore(Math.round((total / (list.length * 4)) * 100));
    navigate('followupResult');
  };

  const handlePracticeComplete = (practiceIndex) => {
    const today = new Date().toDateString();
    if (completedPractices.some((item) => item.date === today && item.practiceIndex === practiceIndex)) return;
    setCompletedPractices((current) => [...current, { date: today, practiceIndex }]);
    if (lastPracticeDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const nextStreak = lastPracticeDate === yesterday.toDateString() ? streak + 1 : 1;
    setStreak(nextStreak);
    setLastPracticeDate(today);
    if (nextStreak === 7) {
      setAchievementText('Seven days of steady practice');
      setShowAchievement(true);
      window.setTimeout(() => setShowAchievement(false), 3200);
    }
  };

  const handleSignOut = () => {
    setScreen('home');
    setEmail('');
    setPassword('');
    setIsLoggedIn(false);
    setLoginError('');
  };

  const handleResetData = () => {
    if (!window.confirm('Reset your assessment, practices, and streak?')) return;
    setResult(null);
    setDailyInsight('');
    setQuote('');
    setGuidance(null);
    localStorage.removeItem('im-result');
    setStreak(0);
    setCompletedPractices([]);
    setLastPracticeDate(null);
    resetFollowup();
    navigate('dashboard');
  };

  const shareResult = async () => {
    if (!result) return;
    const text = `My InnerMap: ${personality.name} — ${personality.subtitle}`;
    try {
      if (navigator.share) await navigator.share({ title: 'My InnerMap', text });
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setShareStatus('Copied');
        window.setTimeout(() => setShareStatus(''), 1800);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') setShareStatus('Try again');
    }
  };

  const downloadQuoteCard = () => {
    if (!quote) return;
    const width = Math.min(900, window.innerWidth * 1.5);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = width * 0.68;
    const context = canvas.getContext('2d');
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1d1812');
    gradient.addColorStop(1, '#46351f');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#c38b43';
    context.lineWidth = 2;
    context.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
    context.fillStyle = '#f5ead5';
    context.textAlign = 'center';
    context.font = `500 ${Math.round(width * 0.038)}px Georgia`;
    const lines = wrapText(context, `“${quote}”`, canvas.width - 150);
    const lineHeight = width * 0.052;
    const startY = canvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, index) => context.fillText(line, canvas.width / 2, startY + index * lineHeight));
    context.fillStyle = '#c38b43';
    context.font = `600 ${Math.round(width * 0.017)}px Arial`;
    context.letterSpacing = '4px';
    context.fillText('INNERMAP · BHAGAVAD GITA', canvas.width / 2, canvas.height - 72);
    const link = document.createElement('a');
    link.download = 'innermap-wisdom-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const openPersonalityPDF = () => {
    const url = personalityPDFs[result?.type];
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderDashboard = () => {
    const displayName = email ? email.split('@')[0] : 'seeker';
    if (!result) {
      return (
        <div className="screen dashboard-screen">
          <ScreenHeader eyebrow="Your inner terrain" title={`Good to see you, ${displayName}.`} description="A clear path begins with an honest reading of where you are." />
          <section className="orientation-layout">
            <div className="orientation-copy">
              <p className="index-label">Orientation 01</p>
              <h2>Three paths.<br /><em>One nature.</em></h2>
              <p>Thirty reflections map how devotion, inquiry, and purposeful action already move through your life.</p>
              <button className="button button--primary" type="button" onClick={beginAssessment}>
                Read my inner compass <Icon name="arrowRight" />
              </button>
              <div className="assessment-meta" aria-label="Assessment details">
                <span><strong>30</strong> reflections</span>
                <span><strong>6</strong> archetypes</span>
                <span><strong>~7</strong> minutes</span>
              </div>
            </div>
            <div className="orientation-visual">
              <CompassMap />
              <p className="map-caption"><span /> Your pattern appears as you answer</p>
            </div>
          </section>
          <blockquote className="dashboard-verse">
            <p>“Yoga is the stilling of the changing states of the mind.”</p>
            <cite>Yoga Sutra · 1.2</cite>
          </blockquote>
        </div>
      );
    }

    return (
      <div className="screen dashboard-screen">
        <ScreenHeader
          eyebrow="Your inner terrain"
          title={`Welcome back, ${displayName}.`}
          description="Your map is not a label. It is a practice in motion."
          action={<button className="button button--quiet" type="button" onClick={() => navigate('result')}>Open full reading <Icon name="arrowRight" /></button>}
        />
        <section className="mapped-dashboard">
          <div className="mapped-dashboard__identity">
            <div className="archetype-glyph">{personality.emoji}</div>
            <p className="index-label">Current orientation</p>
            <h2>{personality.name}</h2>
            <p className="subtitle">{personality.subtitle}</p>
            <p>{personality.description}</p>
            <button className="text-link" type="button" onClick={beginAssessment}>Recalibrate the map <Icon name="refresh" size={17} /></button>
          </div>
          <div className="mapped-dashboard__map">
            <CompassMap scores={result.scores} />
          </div>
          <div className="mapped-dashboard__scores">
            <ScoreRow label="Devotion" value={result.scores.devotion} index={1} />
            <ScoreRow label="Knowledge" value={result.scores.knowledge} index={2} />
            <ScoreRow label="Action" value={result.scores.action} index={3} />
          </div>
        </section>
        <section className="daily-strip">
          <div className="daily-strip__number">{String(new Date().getDate()).padStart(2, '0')}</div>
          <div className="daily-strip__copy">
            <p className="eyebrow">Today’s contemplation</p>
            <p>{dailyInsight}</p>
          </div>
          <button className="icon-button" type="button" onClick={refreshInsight} aria-label="Show another contemplation"><Icon name="refresh" /></button>
        </section>
        <section className="dashboard-actions">
          <button type="button" className="action-line" onClick={() => navigate('practices')}>
            <span><Icon name="practice" /><i>Daily practice</i></span>
            <strong>{completedPractices.filter((item) => item.date === new Date().toDateString()).length}/{personality.practices.length}</strong>
            <Icon name="arrowRight" />
          </button>
          <button type="button" className="action-line" onClick={() => { resetFollowup(); navigate('followupQuiz'); }}>
            <span><Icon name="spark" /><i>Refine this reading</i></span>
            <strong>5 questions</strong>
            <Icon name="arrowRight" />
          </button>
        </section>
      </div>
    );
  };

  const renderQuiz = () => {
    const currentQuestion = questions[questionIndex];
    const progress = ((questionIndex + 1) / questions.length) * 100;
    const categoryIndex = ['Devotion', 'Knowledge', 'Action'].indexOf(currentQuestion.category);
    return (
      <div className="screen quiz-screen">
        <div className="quiz-topline">
          <button className="text-link" type="button" onClick={() => navigate('dashboard')}><Icon name="arrowLeft" /> Save & exit</button>
          <span className="numeric">{String(questionIndex + 1).padStart(2, '0')} / {questions.length}</span>
        </div>
        <div className="quiz-layout">
          <aside className="quiz-route" aria-label="Assessment path">
            <p className="eyebrow">Inner reading</p>
            <div className="quiz-route__map"><CompassMap compact progress={progress} /></div>
            <ol>
              {['Devotion', 'Knowledge', 'Action'].map((category, index) => (
                <li key={category} className={index === categoryIndex ? 'is-current' : index < categoryIndex ? 'is-complete' : ''}>
                  <span>{index < categoryIndex ? <Icon name="check" size={14} /> : index + 1}</span>{category}
                </li>
              ))}
            </ol>
          </aside>
          <main className={`question-stage ${isTransitioning ? 'is-transitioning' : ''}`}>
            <p className="question-stage__category">Path of {currentQuestion.category}</p>
            <h1>{currentQuestion.text}</h1>
            <p className="question-stage__instruction">Choose the response that feels true before you explain it.</p>
            <div className="answer-list" role="radiogroup" aria-label="Answer choices">
              {currentQuestion.options.map((option, index) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={selectedAnswer === option}
                  key={option}
                  disabled={isTransitioning}
                  className={`answer-option ${selectedAnswer === option ? 'is-selected' : ''}`}
                  onClick={() => handleAnswer(option)}
                >
                  <span className="answer-option__index">{index + 1}</span>
                  <span>{option}</span>
                  <i><Icon name="arrowRight" size={18} /></i>
                </button>
              ))}
            </div>
            <div className="question-stage__footer">
              <button className="button button--quiet" type="button" onClick={handlePreviousQuestion} disabled={questionIndex === 0 || isTransitioning}><Icon name="arrowLeft" /> Previous</button>
              <p>Your answers stay in this browser.</p>
            </div>
          </main>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!result) return renderDashboard();
    return (
      <div className="screen result-screen">
        <div className="result-intro">
          <p className="eyebrow">Your reading · complete</p>
          <div className="result-intro__map"><CompassMap scores={result.scores} progress={100} /></div>
          <div className="result-intro__copy">
            <span className="archetype-glyph">{personality.emoji}</span>
            <h1>{personality.name}</h1>
            <p className="subtitle">{personality.subtitle}</p>
            <p>{personality.description}</p>
          </div>
          <p className="result-intro__note">This is an orientation, not a verdict.</p>
        </div>

        <div className="reading-layout">
          <section className="reading-scores">
            <p className="index-label">Reading 01 · Your balance</p>
            <h2>The shape of your attention</h2>
            <ScoreRow label="Devotion" value={result.scores.devotion} index={1} />
            <ScoreRow label="Knowledge" value={result.scores.knowledge} index={2} />
            <ScoreRow label="Action" value={result.scores.action} index={3} />
          </section>
          <aside className="reading-guidance">
            <p className="index-label">Reading 02 · Gita guidance</p>
            {guidance && (
              <>
                <span className="verse-ref">{guidance.verse}</span>
                <blockquote>“{guidance.text}”</blockquote>
                <p>{guidance.guidance}</p>
              </>
            )}
          </aside>
        </div>

        <section className="wisdom-panel">
          <div>
            <p className="eyebrow">A verse for today</p>
            <blockquote>“{quote}”</blockquote>
            <cite>Bhagavad Gita</cite>
          </div>
          <div className="wisdom-panel__actions">
            <button className="button button--quiet" type="button" onClick={refreshInsight}><Icon name="refresh" /> New verse</button>
            <button className="button button--quiet" type="button" onClick={downloadQuoteCard}><Icon name="download" /> Save card</button>
          </div>
        </section>

        <section className="result-actions">
          <div>
            <p className="eyebrow">Put the reading into motion</p>
            <h2>Insight becomes useful when it enters the day.</h2>
          </div>
          <div className="result-actions__buttons">
            <button className="button button--primary" type="button" onClick={() => navigate('practices')}>Begin today’s practice <Icon name="arrowRight" /></button>
            <button className="button button--quiet" type="button" onClick={() => { resetFollowup(); navigate('followupQuiz'); }}>Refine this reading</button>
            <button className="button button--quiet" type="button" onClick={shareResult}><Icon name="share" /> {shareStatus || 'Share result'}</button>
            <button className="button button--quiet" type="button" onClick={openPersonalityPDF}><Icon name="book" /> Open guide</button>
          </div>
        </section>
      </div>
    );
  };

  const renderFollowupQuiz = () => {
    if (!result) return renderDashboard();
    const list = followupQuestions[result.type] || [];
    const current = list[followupIndex];
    const progress = ((followupIndex + 1) / list.length) * 100;
    return (
      <div className="screen followup-screen">
        <div className="quiz-topline">
          <button className="text-link" type="button" onClick={() => navigate('result')}><Icon name="arrowLeft" /> Back to reading</button>
          <span className="numeric">{String(followupIndex + 1).padStart(2, '0')} / {list.length}</span>
        </div>
        <main className="followup-stage">
          <div className="followup-stage__meter"><span style={{ '--progress': `${progress}%` }} /></div>
          <p className="eyebrow">Refine the map</p>
          <h1>{current}</h1>
          <div className="answer-list" role="radiogroup" aria-label="Answer choices">
            {answerScale.map((option, index) => (
              <button type="button" role="radio" aria-checked="false" key={option} className="answer-option" onClick={() => handleFollowupAnswer(option)}>
                <span className="answer-option__index">{index + 1}</span><span>{option}</span><i><Icon name="arrowRight" size={18} /></i>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  };

  const renderFollowupResult = () => (
    <div className="screen followup-result-screen">
      <div className="followup-result__seal"><BrandMark /></div>
      <p className="eyebrow">Second reading</p>
      <h1>Your map is becoming more precise.</h1>
      <p className="followup-result__message">{result ? followupInsights[result.type] : ''}</p>
      <div className="followup-result__score"><strong>{followupScore}%</strong><span>alignment with this archetype</span></div>
      <button className="button button--primary" type="button" onClick={() => navigate('result')}>Return to my reading <Icon name="arrowRight" /></button>
    </div>
  );

  const renderPractices = () => {
    const today = new Date().toDateString();
    const todaysPractices = completedPractices.filter((item) => item.date === today);
    if (!personality) {
      return (
        <div className="screen empty-screen">
          <BrandMark />
          <p className="eyebrow">Practice needs direction</p>
          <h1>Read your inner compass first.</h1>
          <p>Your practice set is shaped by the balance found in the assessment.</p>
          <button className="button button--primary" type="button" onClick={beginAssessment}>Begin the assessment <Icon name="arrowRight" /></button>
        </div>
      );
    }
    return (
      <div className="screen practices-screen">
        <ScreenHeader
          eyebrow="Daily fieldwork"
          title="Turn insight into practice."
          description={`Five contemplations for ${personality.name}. Complete one with full attention, or move through all five.`}
          action={<div className="streak-badge"><Icon name="flame" /><strong>{streak}</strong><span>day streak</span></div>}
        />
        <div className="practice-progress">
          <span style={{ '--progress': `${(todaysPractices.length / personality.practices.length) * 100}%` }} />
          <p><strong>{todaysPractices.length}</strong> of {personality.practices.length} completed today</p>
        </div>
        <ol className="practice-list">
          {personality.practices.map((practice, index) => {
            const isCompleted = todaysPractices.some((item) => item.practiceIndex === index);
            return (
              <li key={practice} className={isCompleted ? 'is-complete' : ''}>
                <span className="practice-list__index">{String(index + 1).padStart(2, '0')}</span>
                <p>{practice}</p>
                <button type="button" className="practice-check" onClick={() => handlePracticeComplete(index)} disabled={isCompleted}>
                  <Icon name="check" /> {isCompleted ? 'Completed' : 'Mark complete'}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="practice-footer">
          <p>Return tomorrow. The question may be the same; the person meeting it will not be.</p>
          <button className="button button--quiet" type="button" onClick={() => navigate('dashboard')}>Return to map</button>
        </div>
      </div>
    );
  };

  const renderProfile = () => {
    const initials = email ? email.slice(0, 2).toUpperCase() : 'IM';
    return (
      <div className="screen profile-screen">
        <ScreenHeader eyebrow="The observer" title="Your profile" description="Your reading and practice history live only in this browser." />
        <section className="profile-identity">
          <div className="profile-avatar">{initials}</div>
          <div>
            <p className="eyebrow">Seeker record</p>
            <h2>{email || 'Spiritual seeker'}</h2>
            <p>{personality ? `${personality.name} · ${personality.subtitle}` : 'Assessment not yet completed'}</p>
          </div>
          {personality && <div className="profile-identity__glyph">{personality.emoji}</div>}
        </section>
        <section className="profile-ledger">
          <div><span>Current streak</span><strong>{streak}<small> days</small></strong></div>
          <div><span>Practices completed</span><strong>{completedPractices.length}</strong></div>
          <div><span>Assessment</span><strong>{result ? 'Complete' : 'Open'}</strong></div>
        </section>
        <section className="profile-settings">
          <div>
            <p className="eyebrow">Appearance</p>
            <h2>Reading atmosphere</h2>
          </div>
          <ThemeButton darkMode={darkMode} onClick={() => setDarkMode((current) => !current)} />
        </section>
        <section className="danger-zone">
          <div><p className="eyebrow">Local data</p><p>Remove your result, practice history, and streak from this browser.</p></div>
          <button className="button button--danger" type="button" onClick={handleResetData}><Icon name="trash" /> Reset my map</button>
        </section>
      </div>
    );
  };

  const activeNav = ['result', 'followupQuiz', 'followupResult'].includes(screen) ? 'quiz' : screen;
  const renderCurrentScreen = () => {
    if (screen === 'dashboard') return renderDashboard();
    if (screen === 'quiz') return renderQuiz();
    if (screen === 'result') return renderResult();
    if (screen === 'followupQuiz') return renderFollowupQuiz();
    if (screen === 'followupResult') return renderFollowupResult();
    if (screen === 'practices') return renderPractices();
    if (screen === 'profile') return renderProfile();
    return renderDashboard();
  };

  if (screen === 'home') {
    return (
      <main className="entry-screen">
        <div className="entry-screen__geometry" aria-hidden="true">
          <CompassMap />
        </div>
        <header className="entry-nav">
          <a className="brand" href="#top" aria-label="InnerMap home"><BrandMark compact /><span>InnerMap</span></a>
          <ThemeButton darkMode={darkMode} onClick={() => setDarkMode((current) => !current)} />
        </header>
        <section className="entry-story" id="top">
          <div className="entry-story__content">
            <p className="eyebrow">Psychology · timeless wisdom · daily practice</p>
            <h1>Know the path<br />already moving<br /><em>through you.</em></h1>
            <p className="entry-story__lead">InnerMap reads your natural balance of devotion, inquiry, and action—then turns that understanding into a practice you can live.</p>
            <div className="entry-story__facts">
              <span><strong>30</strong> reflective questions</span>
              <span><strong>03</strong> paths in balance</span>
              <span><strong>01</strong> personal compass</span>
            </div>
          </div>
          <div className="entry-story__aside">
            <p>Bhakti</p><span>heart</span><p>Jñāna</p><span>mind</span><p>Karma</p><span>hands</span>
          </div>
        </section>
        <aside className="entry-panel">
          <div className="entry-panel__heading">
            <BrandMark />
            <p className="eyebrow">Private entry</p>
            <h2>Open your inner map.</h2>
            <p>This demo stores your reading on this device. Any non-empty credentials will continue.</p>
          </div>
          <form onSubmit={handleLogin} noValidate>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" aria-describedby={loginError ? 'login-error' : 'login-help'} />
            <label htmlFor="password">Passphrase</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" placeholder="Enter any passphrase" aria-describedby={loginError ? 'login-error' : 'login-help'} />
            {loginError ? <p className="form-message form-message--error" id="login-error" role="alert">{loginError}</p> : <p className="form-message" id="login-help">Local-only demo · nothing is sent</p>}
            <button className="button button--primary button--full" type="submit">Enter the map <Icon name="arrowRight" /></button>
          </form>
          <blockquote><span>“</span>As the mind, so the world.<cite>Upanishads</cite></blockquote>
        </aside>
      </main>
    );
  }

  return (
    <div className="app-shell">
      <aside className="side-rail">
        <button className="brand brand--button" type="button" onClick={() => navigate('dashboard')} aria-label="Go to InnerMap dashboard"><BrandMark compact /><span>InnerMap</span></button>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.id} type="button" className={activeNav === item.id ? 'is-active' : ''} onClick={() => item.id === 'quiz' ? beginAssessment() : navigate(item.id)}>
              <Icon name={item.icon} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="side-rail__utilities">
          <ThemeButton darkMode={darkMode} onClick={() => setDarkMode((current) => !current)} label={false} />
          <button className="icon-button" type="button" onClick={handleSignOut} aria-label="Sign out"><Icon name="logout" /></button>
        </div>
      </aside>
      <div className="mobile-bar">
        <button className="brand brand--button" type="button" onClick={() => navigate('dashboard')}><BrandMark compact /><span>InnerMap</span></button>
        <div><ThemeButton darkMode={darkMode} onClick={() => setDarkMode((current) => !current)} label={false} /><button className="icon-button" type="button" onClick={handleSignOut} aria-label="Sign out"><Icon name="logout" /></button></div>
      </div>
      <main className="app-content">{renderCurrentScreen()}</main>
      <nav className="mobile-dock" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <button key={item.id} type="button" className={activeNav === item.id ? 'is-active' : ''} onClick={() => item.id === 'quiz' ? beginAssessment() : navigate(item.id)}>
            <Icon name={item.icon} /><span>{item.label}</span>
          </button>
        ))}
      </nav>
      {showAchievement && (
        <dialog open className="achievement-dialog" aria-labelledby="achievement-title">
          <BrandMark />
          <p className="eyebrow">Practice milestone</p>
          <h2 id="achievement-title">{achievementText}</h2>
          <p>Consistency is beginning to leave a shape.</p>
          <button className="button button--primary" type="button" onClick={() => setShowAchievement(false)}>Continue</button>
        </dialog>
      )}
    </div>
  );
};

export default InnerMapApp;
