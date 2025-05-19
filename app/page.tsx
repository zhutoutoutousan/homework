"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, ArrowRight, Star, Users, Zap, Target, Menu, X, ChevronRight, Linkedin, Twitter, Instagram, TrendingUp, TrendingDown, DollarSign, Shield, Skull, Crown, Info, AlertCircle, Activity } from "lucide-react"
import { useState, useEffect } from "react"

// Type definitions
interface GameOption {
  text: string;
  impact: number;
  risk: 'high' | 'medium' | 'low';
  cost: number;
  requirements?: {
    reputation?: number;
    capital?: number;
    connections?: number;
  };
  consequences?: {
    positive?: string[];
    negative?: string[];
  };
}

interface BusinessScenario {
  id: number;
  question: string;
  options: GameOption[];
  difficulty: number;
  type: 'market' | 'crisis' | 'opportunity' | 'challenge' | 'innovation' | 'competition' | 'regulation' | 'partnership';
  randomEvents?: {
    trigger: number;
    events: {
      type: 'positive' | 'negative' | 'neutral';
      message: string;
      effect: {
        capital?: number;
        reputation?: number;
        connections?: number;
      };
    }[];
  };
}

interface GameDecision {
  scenario: string;
  decision: string;
  impact: number;
  round: number;
}

interface GameState {
  currentScenario: number;
  score: number;
  decisions: GameDecision[];
  showResult: boolean;
  round: number;
  resources: {
    capital: number;
    reputation: number;
    connections: number;
    stress: number;
    marketVolatility: number;
    credit: number;
    loanAmount: number;
    loanInterest: number;
  };
  gameOver: boolean;
  highScore: number;
  unlockedAchievements: string[];
  activeEffects: Array<{
    name: string;
    type: 'positive' | 'negative';
    roundsLeft: number;
    value: number;
  }>;
  difficulty: number;
  randomEvents: string[];
  gameOverReason: string;
  canLaissezFaire: boolean;
  lastResortUsed: boolean;
  showSaveCompany: boolean;
  isPlaying: boolean;
  loanCooldown: number;
}

// Add keyframes for animations
const shimmerAnimation = `
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
}

.animate-pulse {
  animation: pulse 3s infinite ease-in-out;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(147, 51, 234, 0.1) 0%,
    rgba(147, 51, 234, 0.2) 50%,
    rgba(147, 51, 234, 0.1) 100%
  );
  animation: shimmer 3s infinite linear;
  z-index: 1;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s infinite ease-in-out;
}

.game-card {
  transition: all 0.3s ease;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.5); }
  50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8); }
}

.animate-glow {
  animation: glow 2s infinite;
}

@keyframes float-text {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
}

@keyframes glow-text {
  0%, 100% { text-shadow: 0 0 10px rgba(147, 51, 234, 0.5); }
  50% { text-shadow: 0 0 20px rgba(147, 51, 234, 0.8), 0 0 30px rgba(147, 51, 234, 0.6); }
}

@keyframes border-pulse {
  0%, 100% { border-color: rgba(147, 51, 234, 0.2); }
  50% { border-color: rgba(147, 51, 234, 0.5); }
}

.animate-float-text {
  animation: float-text 3s infinite ease-in-out;
}

.animate-glow-text {
  animation: glow-text 2s infinite;
}

.animate-border-pulse {
  animation: border-pulse 2s infinite;
}

.hero-gradient {
  background: linear-gradient(
    45deg,
    rgba(147, 51, 234, 0.1) 0%,
    rgba(147, 51, 234, 0.2) 50%,
    rgba(147, 51, 234, 0.1) 100%
  );
  backdrop-filter: blur(10px);
}

.hero-text-shadow {
  text-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
}

.hero-border-glow {
  box-shadow: 0 0 20px rgba(147, 51, 234, 0.2);
}
`

const scenarioTypes = [
  'market',
  'crisis',
  'opportunity',
  'challenge',
  'innovation',
  'competition',
  'regulation',
  'partnership'
] as const;

const generateRandomScenario = (difficulty: number, resources: GameState['resources']): BusinessScenario => {
  const resourceMultiplier = 1 + (
    (resources.capital / 20000) +
    (resources.reputation / 20) +
    (resources.connections / 10) +
    (resources.credit / 2000)
  ) * 0.1;

  const adjustedDifficulty = Math.min(difficulty * resourceMultiplier, 5);
  const baseCost = 4000 * adjustedDifficulty; // Adjusted base cost
  const baseImpact = 40 * adjustedDifficulty; // Adjusted base impact

  return {
    id: Math.floor(Math.random() * 1000),
    question: `Round ${Math.floor(difficulty)}: ${getRandomQuestion(scenarioTypes[Math.floor(Math.random() * scenarioTypes.length)])}`,
    type: scenarioTypes[Math.floor(Math.random() * scenarioTypes.length)],
    difficulty: adjustedDifficulty,
    options: [
      {
        text: getRandomOption('aggressive'),
        impact: baseImpact * 1.3,
        risk: "high",
        cost: baseCost * 1.5,
        requirements: {
          capital: baseCost * 2,
          reputation: Math.ceil(adjustedDifficulty * 0.8),
          connections: Math.ceil(adjustedDifficulty * 0.6)
        },
        consequences: {
          positive: getRandomConsequences('positive', 2),
          negative: getRandomConsequences('negative', 2)
        }
      },
      {
        text: getRandomOption('balanced'),
        impact: baseImpact * 1.1,
        risk: "medium",
        cost: baseCost * 1.2,
        requirements: {
          capital: baseCost * 1.5,
          reputation: Math.ceil(adjustedDifficulty * 0.6),
          connections: Math.ceil(adjustedDifficulty * 0.4)
        },
        consequences: {
          positive: getRandomConsequences('positive', 1),
          negative: getRandomConsequences('negative', 1)
        }
      },
      {
        text: getRandomOption('conservative'),
        impact: baseImpact,
        risk: "low",
        cost: baseCost,
        requirements: {
          capital: baseCost,
          reputation: Math.ceil(adjustedDifficulty * 0.4),
          connections: Math.ceil(adjustedDifficulty * 0.3)
        },
        consequences: {
          positive: getRandomConsequences('positive', 1),
          negative: getRandomConsequences('negative', 1)
        }
      }
    ],
    randomEvents: {
      trigger: 40 + (adjustedDifficulty * 5),
      events: [
        {
          type: 'negative',
          message: "Market crash! All investments lose 5% value",
          effect: { capital: -0.05 }
        },
        {
          type: 'positive',
          message: "Unexpected market boom! All investments gain 3%",
          effect: { capital: 0.03 }
        },
        {
          type: 'negative',
          message: "Regulatory crackdown! Reputation takes a hit",
          effect: { reputation: -2 }
        },
        {
          type: 'positive',
          message: "Industry recognition! Reputation boost",
          effect: { reputation: 2 }
        }
      ]
    }
  };
};

const getRandomQuestion = (type: string): string => {
  const questions = {
    market: [
      "Market Volatility Crisis",
      "Emerging Market Opportunity",
      "Market Share Battle",
      "Market Disruption Threat"
    ],
    crisis: [
      "Financial Crisis Management",
      "Supply Chain Disruption",
      "Competitive Threat Response",
      "Regulatory Compliance Crisis"
    ],
    opportunity: [
      "Global Expansion Opportunity",
      "Strategic Partnership Chance",
      "Innovation Investment Window",
      "Market Entry Opportunity"
    ],
    challenge: [
      "Technology Disruption Challenge",
      "Regulatory Compliance Challenge",
      "Talent Acquisition Challenge",
      "Resource Management Challenge"
    ],
    innovation: [
      "R&D Investment Decision",
      "Product Innovation Opportunity",
      "Technology Adoption Challenge",
      "Innovation Strategy Pivot"
    ],
    competition: [
      "Competitive Response Strategy",
      "Market Share Defense",
      "Competitive Advantage Building",
      "Industry Leadership Battle"
    ],
    regulation: [
      "Regulatory Compliance Strategy",
      "Policy Change Adaptation",
      "Legal Framework Challenge",
      "Compliance Risk Management"
    ],
    partnership: [
      "Strategic Alliance Opportunity",
      "Joint Venture Decision",
      "Partnership Negotiation",
      "Collaboration Strategy"
    ]
  };
  return questions[type as keyof typeof questions][Math.floor(Math.random() * questions[type as keyof typeof questions].length)];
};

const getRandomOption = (style: string): string => {
  const options = {
    aggressive: [
      "Aggressive Market Expansion",
      "High-Risk Investment",
      "Bold Strategic Move",
      "Disruptive Innovation",
      "Market Dominance Push"
    ],
    balanced: [
      "Strategic Partnership",
      "Moderate Investment",
      "Balanced Approach",
      "Controlled Expansion",
      "Sustainable Growth"
    ],
    conservative: [
      "Risk-Averse Strategy",
      "Minimal Investment",
      "Defensive Position",
      "Gradual Growth",
      "Stable Development"
    ]
  };
  return options[style as keyof typeof options][Math.floor(Math.random() * options[style as keyof typeof options].length)];
};

const getRandomConsequences = (type: string, count: number): string[] => {
  const consequences = {
    positive: [
      "Market leadership position",
      "Increased brand value",
      "Enhanced competitive advantage",
      "Improved market share",
      "Stronger industry position",
      "Better resource allocation",
      "Enhanced innovation capability",
      "Improved operational efficiency"
    ],
    negative: [
      "Increased operational costs",
      "Higher market volatility",
      "Resource constraints",
      "Competitive pressure",
      "Regulatory scrutiny",
      "Market uncertainty",
      "Resource depletion",
      "Strategic vulnerability"
    ]
  };
  
  const shuffled = [...consequences[type as keyof typeof consequences]].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const gameMechanics = {
  resources: {
    capital: "Your available funds. Affects what decisions you can make and your company's growth.",
    reputation: "Your standing in the industry. Higher reputation unlocks better opportunities.",
    connections: "Your business network. More connections mean more options and better deals.",
    stress: "Your company's pressure level. High stress can lead to game over.",
    marketVolatility: "Market conditions. High volatility means more risk and potential reward."
  },
  risks: {
    high: "High risk decisions offer big rewards but can lead to significant losses.",
    medium: "Balanced risk and reward. A safer choice than high risk options.",
    low: "Conservative choices with steady, predictable outcomes."
  },
  effects: {
    positive: "Benefits from your decisions that can help in future rounds.",
    negative: "Drawbacks that you'll need to manage in upcoming decisions."
  }
}

// Add number formatting helper
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(num);
};

// Update formatPercentage function
const formatPercentage = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};

// Update calculateSuccessChance function
const calculateSuccessChance = (option: GameOption, resources: GameState['resources']): number => {
  const baseChance = option.risk === 'high' ? 0.45 : option.risk === 'medium' ? 0.55 : 0.65;
  const reputationBonus = resources.reputation * 0.01;
  const connectionBonus = resources.connections * 0.005;
  const stressPenalty = resources.stress * 0.002;
  const volatilityPenalty = resources.marketVolatility * 0.001;

  const finalChance = baseChance + reputationBonus + connectionBonus - stressPenalty - volatilityPenalty;
  return Math.min(0.8, Math.max(0.4, finalChance));
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    currentScenario: 0,
    score: 0,
    decisions: [],
    showResult: false,
    round: 1,
    resources: {
      capital: 10000,
      reputation: 5,
      connections: 3,
      stress: 0,
      marketVolatility: 0,
      credit: 700,
      loanAmount: 0,
      loanInterest: 0.05
    },
    gameOver: false,
    highScore: 0,
    unlockedAchievements: [],
    activeEffects: [],
    difficulty: 1,
    randomEvents: [],
    gameOverReason: '',
    canLaissezFaire: true,
    lastResortUsed: false,
    showSaveCompany: false,
    isPlaying: false,
    loanCooldown: 0
  })

  const [currentScenario, setCurrentScenario] = useState<BusinessScenario>(generateRandomScenario(1, gameState.resources))

  const checkRequirements = (option: GameOption): boolean => {
    if (!option.requirements) return true;
    
    const { capital, reputation, connections } = option.requirements;
    const { capital: currentCapital, reputation: currentReputation, connections: currentConnections } = gameState.resources;

    if (capital && currentCapital < capital) return false;
    if (reputation && currentReputation < reputation) return false;
    if (connections && currentConnections < connections) return false;

    return true;
  }

  const hasValidOptions = (scenario: BusinessScenario): boolean => {
    return scenario.options.some(option => {
      if (!option.requirements) return true;
      const { capital, reputation, connections } = option.requirements;
      const { capital: currentCapital, reputation: currentReputation, connections: currentConnections } = gameState.resources;
      
      return (!capital || currentCapital >= capital) &&
             (!reputation || currentReputation >= reputation) &&
             (!connections || currentConnections >= connections);
    });
  };

  const handleLoan = (amount: number) => {
    if (amount <= 0) return;
    
    const maxLoan = gameState.resources.capital * 2 * (gameState.resources.credit / 700);
    if (amount > maxLoan) return;

    const interestRate = 0.05 + (1 - (gameState.resources.credit / 1000)) * 0.1;
    
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        capital: prev.resources.capital + amount,
        loanAmount: prev.resources.loanAmount + amount,
        loanInterest: interestRate
      }
    }));
  };

  const handleLoanRepayment = (amount: number) => {
    if (amount <= 0 || amount > gameState.resources.capital) return;
    
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        capital: prev.resources.capital - amount,
        loanAmount: Math.max(0, prev.resources.loanAmount - amount),
        credit: Math.min(1000, prev.resources.credit + (amount >= prev.resources.loanAmount * 0.1 ? 10 : 5))
      }
    }));
  };

  const handleLaissezFaire = () => {
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        stress: Math.max(0, prev.resources.stress - 30),
        marketVolatility: Math.min(100, prev.resources.marketVolatility + 10)
      },
      canLaissezFaire: false,
      showResult: true
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showResult: false
      }));
    }, 2000);
  };

  const handleLastResortLoan = () => {
    const emergencyLoan = gameState.resources.capital * 3;
    const highInterestRate = 0.15; // 15% interest rate
    
    const newResources = {
      ...gameState.resources,
      capital: gameState.resources.capital + emergencyLoan,
      loanAmount: gameState.resources.loanAmount + emergencyLoan,
      loanInterest: highInterestRate,
      stress: Math.min(100, gameState.resources.stress + 20),
      credit: Math.max(300, gameState.resources.credit - 100)
    };

    // Generate new scenario with updated resources
    const nextScenario = generateRandomScenario(gameState.difficulty, newResources);
    
    setGameState(prev => ({
      ...prev,
      resources: newResources,
      lastResortUsed: true,
      showSaveCompany: false,
      gameOver: false,
      showResult: true,
      canLaissezFaire: true
    }));

    setCurrentScenario(nextScenario);

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showResult: false
      }));
    }, 2000);
  };

  const handleLastResortSellAssets = () => {
    const assetValue = gameState.resources.capital * 0.5;
    
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        capital: prev.resources.capital + assetValue,
        reputation: Math.max(0, prev.resources.reputation - 2),
        stress: Math.min(100, prev.resources.stress + 15),
        marketVolatility: Math.min(100, prev.resources.marketVolatility + 15)
      },
      lastResortUsed: true,
      showSaveCompany: false,
      gameOver: false,
      showResult: true
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showResult: false
      }));
      // Generate new scenario after saving
      setCurrentScenario(generateRandomScenario(gameState.difficulty, {
        ...gameState.resources,
        capital: gameState.resources.capital + assetValue,
        reputation: Math.max(0, gameState.resources.reputation - 2),
        stress: Math.min(100, gameState.resources.stress + 15),
        marketVolatility: Math.min(100, gameState.resources.marketVolatility + 15)
      }));
    }, 2000);
  };

  const handleLastResortRestructure = () => {
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        capital: Math.max(0, prev.resources.capital - 1000),
        reputation: Math.max(0, prev.resources.reputation - 3),
        connections: Math.max(0, prev.resources.connections - 2),
        stress: Math.min(100, prev.resources.stress + 25),
        marketVolatility: Math.min(100, prev.resources.marketVolatility + 20)
      },
      activeEffects: [
        ...prev.activeEffects,
        {
          name: "Company Restructuring",
          type: "negative",
          roundsLeft: 3,
          value: -0.1
        }
      ],
      lastResortUsed: true,
      showSaveCompany: false,
      gameOver: false,
      showResult: true
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showResult: false
      }));
      // Generate new scenario after saving
      setCurrentScenario(generateRandomScenario(gameState.difficulty, {
        ...gameState.resources,
        capital: Math.max(0, gameState.resources.capital - 1000),
        reputation: Math.max(0, gameState.resources.reputation - 3),
        connections: Math.max(0, gameState.resources.connections - 2),
        stress: Math.min(100, gameState.resources.stress + 25),
        marketVolatility: Math.min(100, gameState.resources.marketVolatility + 20)
      }));
    }, 2000);
  };

  // Update handleDecision function's resource calculations
  const handleDecision = (option: GameOption) => {
    if (!checkRequirements(option)) {
      return;
    }

    const successChance = calculateSuccessChance(option, gameState.resources);
    const isSuccess = Math.random() < successChance;
    
    const newScore = gameState.score + (isSuccess ? option.impact : -option.impact * 0.5);
    const newDecisions: GameDecision[] = [...gameState.decisions, {
      scenario: currentScenario.question,
      decision: option.text,
      impact: isSuccess ? option.impact : -option.impact * 0.5,
      round: gameState.round
    }];

    // Calculate stress increase based on risk and difficulty
    const stressIncrease = option.risk === 'high' ? 10 : option.risk === 'medium' ? 7 : 4;
    const difficultyMultiplier = 1 + (gameState.difficulty * 0.03);
    
    // Calculate profit/loss with more balanced multipliers
    const profitMultiplier = option.risk === 'high' ? 1.5 : option.risk === 'medium' ? 1.3 : 1.2;
    const profit = isSuccess ? option.cost * profitMultiplier : 0;
    const loss = option.cost;
    
    // Calculate reputation changes
    const reputationChange = isSuccess ? 
      (option.risk === 'high' ? 3 : option.risk === 'medium' ? 2 : 1) * difficultyMultiplier :
      (option.risk === 'high' ? -2 : option.risk === 'medium' ? -1 : -0.5) * difficultyMultiplier;
    
    // Update resources with success/failure outcome
    const newResources = {
      ...gameState.resources,
      capital: Math.floor(gameState.resources.capital - loss + profit),
      reputation: Math.max(0, Math.floor(gameState.resources.reputation + reputationChange)),
      connections: Math.floor(gameState.resources.connections + (isSuccess ? 
        (option.risk === 'low' ? 2 : 1) * difficultyMultiplier :
        (option.risk === 'low' ? -1 : 0) * difficultyMultiplier)),
      stress: Math.min(100, gameState.resources.stress + stressIncrease * difficultyMultiplier),
      marketVolatility: Math.min(100, gameState.resources.marketVolatility + (Math.random() * 8 - 2) * difficultyMultiplier),
      credit: Math.min(1000, Math.max(300, gameState.resources.credit + (isSuccess ? 
        (option.risk === 'low' ? 10 : option.risk === 'medium' ? 7 : 5) :
        (option.risk === 'low' ? -5 : option.risk === 'medium' ? -7 : -10)))),
      loanAmount: gameState.resources.loanAmount,
      loanInterest: gameState.resources.loanInterest
    };

    // Handle loan payments
    if (newResources.loanAmount > 0) {
      const payment = Math.min(newResources.loanAmount, newResources.capital * 0.05);
      newResources.capital -= payment;
      newResources.loanAmount -= payment;
      
      if (payment >= newResources.loanAmount * 0.05) {
        newResources.credit = Math.min(1000, newResources.credit + 10);
      }
    }

    // Check for random events
    let randomEventMessage: string | null = null;
    if (currentScenario.randomEvents && Math.random() * 100 < currentScenario.randomEvents.trigger) {
      const randomEvent = currentScenario.randomEvents.events[Math.floor(Math.random() * currentScenario.randomEvents.events.length)];
      if (randomEvent) {
        randomEventMessage = randomEvent.message;
        newResources.capital = Math.floor(newResources.capital * (1 + (randomEvent.effect.capital || 0)));
        newResources.reputation = Math.floor(newResources.reputation + (randomEvent.effect.reputation || 0));
        newResources.connections = Math.floor(newResources.connections + (randomEvent.effect.connections || 0));
      }
    }

    // Update active effects
    const newActiveEffects = gameState.activeEffects
      .map(effect => ({
        ...effect,
        roundsLeft: effect.roundsLeft - 1
      }))
      .filter(effect => effect.roundsLeft > 0);

    // Add new effects with reduced impact
    if (option.consequences?.positive) {
      newActiveEffects.push(...option.consequences.positive.map(pos => ({
        name: pos,
        type: 'positive' as const,
        roundsLeft: 4,
        value: 0.02 // Reduced from 0.15 to 0.02 (2% boost)
      })));
    }
    if (option.consequences?.negative) {
      newActiveEffects.push(...option.consequences.negative.map(neg => ({
        name: neg,
        type: 'negative' as const,
        roundsLeft: 2,
        value: -0.01 // Reduced from -0.03 to -0.01 (1% penalty)
      })));
    }

    // Apply active effects with reduced impact
    newActiveEffects.forEach(effect => {
      if (effect.type === 'positive') {
        newResources.capital = Math.floor(newResources.capital * (1 + effect.value));
      } else {
        newResources.capital = Math.floor(newResources.capital * (1 + effect.value));
      }
    });

    // Generate next scenario with current resources for difficulty scaling
    const nextDifficulty = Math.floor(gameState.difficulty + 1);
    const nextScenario = generateRandomScenario(nextDifficulty, newResources);

    // Check for game over conditions and store reason
    let gameOverReason = '';
    if (newResources.capital < -2000) {
      gameOverReason = 'Bankruptcy: Capital fell below -$2000';
    } else if (newResources.reputation < 0) {
      gameOverReason = 'Reputation Ruined: Your standing in the industry is destroyed';
    } else if (newResources.stress >= 100) {
      gameOverReason = 'Overwhelming Stress: Your company cannot handle the pressure';
    } else if (newResources.marketVolatility > 95) {
      gameOverReason = 'Market Collapse: Market conditions are too unstable';
    } else if (newResources.credit < 200) {
      gameOverReason = 'Credit Crisis: Your credit rating is too low to continue';
    } else if (!hasValidOptions(nextScenario)) {
      gameOverReason = 'No Options Available: You cannot meet the requirements for any decisions';
    }

    const isGameOver = gameOverReason !== '';

    // Check for achievements
    const newAchievements = [...gameState.unlockedAchievements];
    if (newScore > gameState.highScore) {
      newAchievements.push('New High Score!');
    }
    if (newResources.capital > 20000) {
      newAchievements.push('Capital Master');
    }
    if (newResources.reputation > 20) {
      newAchievements.push('Industry Leader');
    }
    if (newResources.stress < 20) {
      newAchievements.push('Stress Master');
    }
    if (newResources.credit > 900) {
      newAchievements.push('Credit Master');
    }

    setGameState(prev => ({
      ...prev,
      score: newScore,
      decisions: newDecisions,
      showResult: true,
      resources: newResources,
      gameOver: isGameOver,
      gameOverReason: gameOverReason,
      highScore: Math.max(prev.highScore, newScore),
      unlockedAchievements: newAchievements,
      activeEffects: newActiveEffects,
      difficulty: prev.difficulty + 0.2,
      randomEvents: randomEventMessage ? [...prev.randomEvents, randomEventMessage] : prev.randomEvents,
      canLaissezFaire: true,
      lastResortUsed: false
    }));

    if (!isGameOver) {
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showResult: false,
          round: prev.round + 1
        }));
        setCurrentScenario(nextScenario);
      }, 2000);
    }
  };

  const resetGame = () => {
    setGameState({
      currentScenario: 0,
      score: 0,
      decisions: [],
      showResult: false,
      round: 1,
      resources: {
        capital: 10000,
        reputation: 5,
        connections: 3,
        stress: 0,
        marketVolatility: 0,
        credit: 700,
        loanAmount: 0,
        loanInterest: 0.05
      },
      gameOver: false,
      highScore: gameState.highScore,
      unlockedAchievements: [],
      activeEffects: [],
      difficulty: 1,
      randomEvents: [],
      gameOverReason: '',
      canLaissezFaire: true,
      lastResortUsed: false,
      showSaveCompany: false,
      isPlaying: false,
      loanCooldown: 0
    });
    setCurrentScenario(generateRandomScenario(1, {
      capital: 1000,
      reputation: 5,
      connections: 3,
      stress: 0,
      marketVolatility: 0,
      credit: 700,
      loanAmount: 0,
      loanInterest: 0.05
    }));
  };

  const handleSaveCompany = () => {
    setGameState(prev => ({
      ...prev,
      showSaveCompany: true,
      gameOver: true
    }));
  };

  const handleMerger = () => {
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        capital: Math.max(0, prev.resources.capital + 10000),
        reputation: Math.max(0, prev.resources.reputation - 4),
        connections: Math.max(0, prev.resources.connections - 3),
        stress: Math.min(100, prev.resources.stress + 30),
        marketVolatility: Math.min(100, prev.resources.marketVolatility + 25)
      },
      activeEffects: [
        ...prev.activeEffects,
        {
          name: "Merger Integration",
          type: "negative",
          roundsLeft: 5,
          value: -0.15
        }
      ],
      gameOver: false,
      showSaveCompany: false,
      showResult: true
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showResult: false
      }));
    }, 2000);
  };

  const handleBankruptcy = () => {
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        capital: 2000,
        reputation: Math.max(0, prev.resources.reputation - 5),
        connections: Math.max(0, prev.resources.connections - 4),
        stress: 50,
        marketVolatility: 50,
        credit: 300,
        loanAmount: 0,
        loanInterest: 0.05
      },
      activeEffects: [
        ...prev.activeEffects,
        {
          name: "Bankruptcy Recovery",
          type: "negative",
          roundsLeft: 8,
          value: -0.2
        }
      ],
      gameOver: false,
      showSaveCompany: false,
      showResult: true
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showResult: false
      }));
    }, 2000);
  };

  const handleHostileTakeover = () => {
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        capital: Math.max(0, prev.resources.capital + 15000),
        reputation: Math.max(0, prev.resources.reputation - 6),
        connections: Math.max(0, prev.resources.connections - 5),
        stress: Math.min(100, prev.resources.stress + 40),
        marketVolatility: Math.min(100, prev.resources.marketVolatility + 35)
      },
      activeEffects: [
        ...prev.activeEffects,
        {
          name: "Hostile Takeover Aftermath",
          type: "negative",
          roundsLeft: 10,
          value: -0.25
        }
      ],
      gameOver: false,
      showSaveCompany: false,
      showResult: true
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showResult: false
      }));
    }, 2000);
  };

  // Add handleVolatilityReduction inside the component
  const handleVolatilityReduction = () => {
    setGameState(prev => ({
      ...prev,
      resources: {
        ...prev.resources,
        marketVolatility: Math.max(0, prev.resources.marketVolatility - 20),
        stress: Math.min(100, prev.resources.stress + 10)
      },
      showResult: true
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        showResult: false
      }));
    }, 2000);
  };

  // Add useEffect to check for no valid options
  useEffect(() => {
    if (!hasValidOptions(currentScenario) && !gameState.gameOver) {
      setGameState(prev => ({
        ...prev,
        gameOver: true,
        gameOverReason: 'No Options Available: You cannot meet the requirements for any decisions'
      }));
    }
  }, [currentScenario, gameState.gameOver]);

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{shimmerAnimation}</style>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-black tracking-tighter">BCD</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-purple-300 hover:text-white transition-colors">About</a>
              <a href="#benefits" className="text-purple-300 hover:text-white transition-colors">Benefits</a>
              <a href="#events" className="text-purple-300 hover:text-white transition-colors">Events</a>
              <a href="#insights" className="text-purple-300 hover:text-white transition-colors">Insights</a>
              <Button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-none border-2 border-purple-500/30">
                Join Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-purple-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
              </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-purple-500/20">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#about" className="block text-purple-300 hover:text-white transition-colors">About</a>
              <a href="#benefits" className="block text-purple-300 hover:text-white transition-colors">Benefits</a>
              <a href="#events" className="block text-purple-300 hover:text-white transition-colors">Events</a>
              <a href="#insights" className="block text-purple-300 hover:text-white transition-colors">Insights</a>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-none border-2 border-purple-500/30">
                Join Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32 relative min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/50 backdrop-blur-3xl -z-10" />
          <div className="absolute inset-0 hero-gradient -z-5" />
          
          <div className="grid md:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-12 text-center md:text-left">
              <div className="space-y-8">
                <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-none hero-text-shadow animate-glow-text">
                  BCD
                <br />
                  <span className="text-purple-300">NETWORK</span>
                </h1>
                <p className="text-3xl md:text-4xl text-purple-300 font-light animate-float-text">
                  Where Elite Minds
                  <br />
                  Shape Tomorrow
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-6">
                <Button className="bg-purple-600 hover:bg-purple-700 text-2xl px-12 py-8 rounded-none border-2 border-purple-500/30 transform hover:scale-105 transition-all duration-300 hero-border-glow">
                  Join the Elite <ArrowRight className="ml-2" />
                </Button>
            </div>

              <div className="text-xl text-purple-300/80 animate-float-text">
                <p>Exclusive Network of Industry Leaders</p>
          </div>
            </div>

            <div className="relative">
              <div className="bg-black/40 rounded-lg p-12 border border-purple-500/20 backdrop-blur-sm hero-border-glow animate-border-pulse">
                <div className="text-center space-y-8">
                  <h2 className="text-4xl font-bold text-purple-300 mb-4 animate-glow-text">Elite Business Empire</h2>
                  <p className="text-xl text-purple-300/80 mb-8">Build your legacy through strategic decisions</p>
                  <Button 
                    onClick={() => setGameState(prev => ({ ...prev, isPlaying: true }))}
                    className="bg-purple-600 hover:bg-purple-700 text-2xl px-12 py-8 rounded-none border-2 border-purple-500/30 transform hover:scale-105 transition-all duration-300"
                  >
                    Play Now <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full-screen Game Interface */}
        {gameState.isPlaying && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 overflow-auto">
            <div className="min-h-screen p-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-purple-300">Elite Business Empire</h2>
                  <Button 
                    onClick={() => setGameState(prev => ({ ...prev, isPlaying: false }))}
                    className="bg-purple-600/20 hover:bg-purple-600/30 px-4 py-2 rounded-none border border-purple-500/30"
                  >
                    Exit Game
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8">
                  {/* Left Column - Game State */}
                  <div className="bg-black/40 p-8 rounded-lg border border-purple-500/20 backdrop-blur-sm">
                    <h3 className="text-xl font-medium text-purple-300 mb-6">Game State</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="group relative bg-black/40 p-4 rounded text-center">
                          <DollarSign className="h-5 w-5 mx-auto mb-2" />
                          <span className="text-base">{formatNumber(gameState.resources.capital)}</span>
                        </div>
                        <div className="group relative bg-black/40 p-4 rounded text-center">
                          <Star className="h-5 w-5 mx-auto mb-2" />
                          <span className="text-base">{gameState.resources.reputation}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="group relative bg-black/40 p-4 rounded text-center">
                          <Users className="h-5 w-5 mx-auto mb-2" />
                          <span className="text-base">{gameState.resources.connections}</span>
                        </div>
                        <div className="group relative bg-black/40 p-4 rounded text-center">
                          <Activity className="h-5 w-5 mx-auto mb-2" />
                          <div className="relative h-3 bg-black/60 rounded-full overflow-hidden">
                            <div 
                              className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                                gameState.resources.stress < 30 ? 'bg-green-500' :
                                gameState.resources.stress < 70 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${gameState.resources.stress}%` }}
                            />
                          </div>
                          <span className="text-sm mt-2 block">Stress: {gameState.resources.stress}%</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="group relative bg-black/40 p-4 rounded text-center">
                          <TrendingUp className="h-5 w-5 mx-auto mb-2" />
                          <div className="relative h-3 bg-black/60 rounded-full overflow-hidden">
                            <div 
                              className={`absolute top-0 left-0 h-full transition-all duration-300 ${
                                gameState.resources.marketVolatility < 30 ? 'bg-green-500' :
                                gameState.resources.marketVolatility < 70 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${gameState.resources.marketVolatility}%` }}
                            />
                          </div>
                          <span className="text-sm mt-2 block">Volatility: {gameState.resources.marketVolatility}%</span>
                        </div>
                      </div>

                      {gameState.activeEffects.length > 0 && (
                        <div className="p-4 bg-black/40 rounded border border-purple-500/20">
                          <div className="flex items-center space-x-2 mb-3">
                            <Activity className="h-5 w-5 text-purple-300" />
                            <span className="text-base text-purple-300">Active Effects:</span>
                          </div>
                          <div className="space-y-2">
                            {gameState.activeEffects.map((effect, index) => (
                              <div key={index} className="text-sm text-purple-300/80">
                                • {effect.name} ({effect.roundsLeft} rounds left) {effect.type === 'positive' ? '+' : ''}{effect.value * 100}%
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle Column - Choices */}
                  <div className="bg-black/40 p-8 rounded-lg border border-purple-500/20 backdrop-blur-sm">
                    <h3 className="text-xl font-medium text-purple-300 mb-6">{currentScenario.question}</h3>
        <div className="space-y-4">
                      {currentScenario.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleDecision(option)}
                          disabled={!checkRequirements(option)}
                          className={`w-full p-4 text-left rounded-md transition-all game-card ${
                            !checkRequirements(option)
                              ? 'opacity-50 cursor-not-allowed'
                              : option.risk === 'high' 
                                ? 'bg-red-500/20 hover:bg-red-500/30' 
                                : option.risk === 'medium'
                                ? 'bg-yellow-500/20 hover:bg-yellow-500/30'
                                : 'bg-green-500/20 hover:bg-green-500/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-base">{option.text}</span>
                              <div className="text-sm text-purple-300/80">
                                Cost: {formatNumber(option.cost)}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-base">
                                {option.impact > 0 ? '+' : ''}{formatPercentage(option.impact)}
                              </span>
                              <div className="text-sm text-purple-300/80">
                                Success: {formatPercentage(calculateSuccessChance(option, gameState.resources))}
                              </div>
                              {option.requirements && (
                                <div className="text-sm text-purple-300/80 space-y-1">
                                  {option.requirements.capital && (
                                    <div className={gameState.resources.capital >= option.requirements.capital ? 'text-green-400' : 'text-red-400'}>
                                      Capital: {formatNumber(option.requirements.capital)}
                                    </div>
                                  )}
                                  {option.requirements.reputation && (
                                    <div className={gameState.resources.reputation >= option.requirements.reputation ? 'text-green-400' : 'text-red-400'}>
                                      Reputation: {option.requirements.reputation} ⭐
                                    </div>
                                  )}
                                  {option.requirements.connections && (
                                    <div className={gameState.resources.connections >= option.requirements.connections ? 'text-green-400' : 'text-red-400'}>
                                      Connections: {option.requirements.connections} 👥
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                      
                      {gameState.canLaissezFaire && (
                        <div className="space-y-4">
                          <button
                            onClick={handleLaissezFaire}
                            className="w-full p-4 text-left rounded-md transition-all game-card bg-blue-500/20 hover:bg-blue-500/30"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-base">Laissez-faire (Take a Break)</span>
                                <div className="text-sm text-purple-300/80">
                                  Skip this round to recover
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-base text-green-400">-30% Stress</span>
                                <div className="text-sm text-red-400">+10% Market Volatility</div>
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={handleVolatilityReduction}
                            className="w-full p-4 text-left rounded-md transition-all game-card bg-blue-500/20 hover:bg-blue-500/30"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-base">Market Stabilization</span>
                                <div className="text-sm text-purple-300/80">
                                  Reduce market volatility
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-base text-green-400">-20% Volatility</span>
                                <div className="text-sm text-red-400">+10% Stress</div>
                              </div>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Bank Loan */}
                  <div className="bg-black/40 p-8 rounded-lg border border-purple-500/20 backdrop-blur-sm">
                    <h3 className="text-xl font-medium text-purple-300 mb-6">Bank Loan</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-black/60 p-4 rounded">
                          <div className="text-sm text-purple-300/80">Current Loan</div>
                          <div className="text-xl font-medium">{formatNumber(gameState.resources.loanAmount)}</div>
                        </div>
                        <div className="bg-black/60 p-4 rounded">
                          <div className="text-sm text-purple-300/80">Interest Rate</div>
                          <div className="text-xl font-medium">{(gameState.resources.loanInterest * 100).toFixed(1)}%</div>
                        </div>
                      </div>

                      <div className="bg-black/60 p-4 rounded">
                        <div className="text-sm text-purple-300/80">Credit Score</div>
                        <div className="text-xl font-medium">{gameState.resources.credit}</div>
                      </div>

                      {gameState.resources.loanAmount > 0 && (
                        <div className="bg-black/60 p-4 rounded">
                          <div className="text-sm text-purple-300/80">Next Payment Due</div>
                          <div className="text-xl font-medium">
                            {formatNumber(Math.ceil(gameState.resources.loanAmount * gameState.resources.loanInterest))}
                            <span className="text-sm text-purple-300/80 ml-2">(5% of loan amount)</span>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleLoan(1000)}
                          className="bg-purple-600/20 hover:bg-purple-600/30 px-4 py-3 rounded text-base border border-purple-500/30"
                        >
                          Take Loan ($1,000)
                        </button>
                        <button
                          onClick={() => handleLoanRepayment(1000)}
                          disabled={gameState.resources.loanAmount === 0 || gameState.resources.capital < 1000}
                          className="bg-purple-600/20 hover:bg-purple-600/30 px-4 py-3 rounded text-base border border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Repay Loan ($1,000)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="space-y-8">
            <div className="flex items-center space-x-6 bg-black/40 p-8 rounded-lg border border-purple-500/20 backdrop-blur-sm">
              <Avatar className="h-16 w-16 border-2 border-purple-500/30 image-container">
                <Image 
                  src="/placeholder.svg?height=64&width=64" 
                  alt="User" 
                  width={64} 
                  height={64}
                  className="animate-pulse" 
                />
            </Avatar>
            <div className="flex-1">
                <p className="text-lg font-medium">
                  Sarah Chen
                <br />
                  <span className="text-purple-300">Tech Visionary</span>
                <br />
                  <span className="text-2xl font-light">"BCD transformed my business network into a powerhouse of innovation"</span>
              </p>
            </div>
              <div className="bg-purple-500/20 p-6 rounded-md text-lg border border-purple-500/30">5-Star Experience</div>
          </div>

            <div className="flex items-center space-x-6">
              <div className="bg-purple-500/20 p-6 rounded-md text-lg border border-purple-500/30 flex-1">Game-Changing Network</div>
          <div className="flex items-center space-x-4">
                <p className="text-lg font-medium text-right">
                  Marcus Rodriguez
                <br />
                  <span className="text-purple-300">Industry Leader</span>
                <br />
                  <span className="text-2xl font-light">"The connections I've made here are priceless"</span>
                </p>
                <Avatar className="h-16 w-16 border-2 border-purple-500/30 image-container">
                  <Image 
                    src="/placeholder.svg?height=64&width=64" 
                    alt="User" 
                    width={64} 
                    height={64}
                    className="animate-pulse" 
                  />
              </Avatar>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center space-y-6 bg-black/40 p-12 rounded-lg border border-purple-500/20 backdrop-blur-sm">
            <h2 className="text-5xl font-black tracking-tighter">Join the Elite Circle</h2>
            <p className="text-2xl text-purple-300">Access exclusive opportunities and connect with industry leaders</p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-xl px-12 py-8 rounded-none border-2 border-purple-500/30">
              Become a Member <ArrowRight className="ml-2" />
            </Button>
        </div>
      </section>

        {/* Benefits Section */}
        <section id="benefits" className="container mx-auto px-4 py-24">
          <h2 className="text-5xl font-black tracking-tighter mb-4">Elite Benefits</h2>
          <p className="text-2xl text-purple-300 mb-12">Unlock your potential with our exclusive network</p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="grid grid-cols-2 gap-6 bg-black/40 p-8 rounded-lg border border-purple-500/20 backdrop-blur-sm">
              <div className="bg-purple-500/20 p-6 rounded border border-purple-500/30 flex flex-col items-center justify-center">
                <Star className="h-8 w-8 text-purple-300 mb-3" />
                <span className="text-lg text-center">Premium Connections</span>
              </div>
              <div className="bg-purple-500/20 p-6 rounded border border-purple-500/30 flex flex-col items-center justify-center">
                <Users className="h-8 w-8 text-purple-300 mb-3" />
                <span className="text-lg text-center">Elite Community</span>
              </div>
              <div className="bg-purple-500/20 p-6 rounded border border-purple-500/30 flex flex-col items-center justify-center">
                <Zap className="h-8 w-8 text-purple-300 mb-3" />
                <span className="text-lg text-center">Fast Growth</span>
              </div>
              <div className="bg-purple-500/20 p-6 rounded border border-purple-500/30 flex flex-col items-center justify-center">
                <Target className="h-8 w-8 text-purple-300 mb-3" />
                <span className="text-lg text-center">Strategic Goals</span>
              </div>
          </div>

            <div className="bg-black/40 rounded-lg p-8 flex items-center justify-center border border-purple-500/20 backdrop-blur-sm image-container">
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Features"
              width={300}
              height={200}
                className="rounded-md animate-pulse"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Event Section */}
        <section id="events" className="container mx-auto px-4 py-24">
          <h2 className="text-5xl font-black tracking-tighter mb-12">Elite Summit 2024</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex items-start space-x-6">
              <div className="bg-purple-500/20 p-6 rounded border border-purple-500/30">
                <span className="text-xl text-purple-300">Exclusive Event</span>
            </div>
          </div>

            <div className="bg-black/40 rounded-lg p-8 border border-purple-500/20 backdrop-blur-sm">
              <div className="flex justify-center mb-6">
                <RefreshCw className="h-12 w-12 text-purple-300" />
            </div>
              <p className="text-2xl font-medium mb-6">
                Join Industry Leaders
              <br />
                for the Ultimate
              <br />
                Networking Experience
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 w-full mt-6 py-8 text-xl rounded-none border-2 border-purple-500/30">
                Secure Your Spot
              </Button>
              <p className="text-sm text-purple-300 mt-4">Limited to 100 Elite Members</p>
          </div>
        </div>
      </section>

      {/* News Section */}
        <section id="insights" className="container mx-auto px-4 py-24">
          <h2 className="text-5xl font-black tracking-tighter mb-4">Elite Insights</h2>
          <p className="text-2xl text-purple-300 mb-12">Stay ahead with exclusive industry insights</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-0">
                <div className="bg-purple-500/20 aspect-video flex items-center justify-center border-b border-purple-500/20 image-container">
                  <Image 
                    src="/placeholder.svg?height=150&width=250" 
                    alt="News 1" 
                    width={250} 
                    height={150}
                    className="animate-pulse" 
                  />
              </div>
                <div className="p-6">
                  <h3 className="font-bold text-2xl mb-2">Future of Tech</h3>
                  <p className="text-lg text-purple-300">Exclusive insights into emerging technologies</p>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-0">
                <div className="bg-purple-500/20 aspect-video flex items-center justify-center border-b border-purple-500/20 image-container">
                  <Image 
                    src="/placeholder.svg?height=150&width=250" 
                    alt="News 2" 
                    width={250} 
                    height={150}
                    className="animate-pulse" 
                  />
              </div>
                <div className="p-6">
                  <h3 className="font-bold text-2xl mb-2">Market Trends</h3>
                  <p className="text-lg text-purple-300">Analysis of current market dynamics</p>
              </div>
            </CardContent>
          </Card>

            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-0">
                <div className="bg-purple-500/20 aspect-video flex items-center justify-center border-b border-purple-500/20 image-container">
                  <Image 
                    src="/placeholder.svg?height=150&width=250" 
                    alt="News 3" 
                    width={250} 
                    height={150}
                    className="animate-pulse" 
                  />
              </div>
                <div className="p-6">
                  <h3 className="font-bold text-2xl mb-2">Success Stories</h3>
                  <p className="text-lg text-purple-300">Member achievements and milestones</p>
              </div>
            </CardContent>
          </Card>
        </div>

          <div className="text-center mt-8">
            <Button variant="link" className="text-xl text-purple-300 hover:text-purple-400">
              Explore More Insights <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* KPIs/Facts Section */}
        <section className="container mx-auto px-4 py-24 mb-12">
          <h2 className="text-5xl font-black tracking-tighter mb-12 text-center">Elite Metrics</h2>

          <ul className="space-y-6 max-w-3xl mx-auto text-lg">
            <li className="flex items-center bg-black/40 p-6 rounded-lg border border-purple-500/20 backdrop-blur-sm">
              <span className="mr-4 text-purple-300 text-2xl">→</span>
              <span>Lightning-fast response time &lt; 1min</span>
          </li>
            <li className="flex items-center bg-black/40 p-6 rounded-lg border border-purple-500/20 backdrop-blur-sm">
              <span className="mr-4 text-purple-300 text-2xl">→</span>
              <span>12 Elite Networking Events Annually</span>
          </li>
            <li className="flex items-center bg-black/40 p-6 rounded-lg border border-purple-500/20 backdrop-blur-sm">
              <span className="mr-4 text-purple-300 text-2xl">→</span>
              <span>Exclusive Forum Sessions</span>
          </li>
            <li className="flex items-center bg-black/40 p-6 rounded-lg border border-purple-500/20 backdrop-blur-sm">
              <span className="mr-4 text-purple-300 text-2xl">→</span>
              <span>Premium Events with 100 NPS</span>
          </li>
            <li className="flex items-center bg-black/40 p-6 rounded-lg border border-purple-500/20 backdrop-blur-sm">
              <span className="mr-4 text-purple-300 text-2xl">→</span>
              <span>100+ Deals Facilitated</span>
          </li>
            <li className="flex items-center bg-black/40 p-6 rounded-lg border border-purple-500/20 backdrop-blur-sm">
              <span className="mr-4 text-purple-300 text-2xl">→</span>
              <span>Countless Strategic Introductions</span>
          </li>
        </ul>

          <div className="text-center mt-12">
            <p className="text-lg text-purple-300">BCD Elite Network 2024</p>
        </div>
      </section>

        {/* Last Resort Options */}
        {!hasValidOptions(currentScenario) && !gameState.gameOver && (
          <div className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
            <h4 className="text-lg font-medium text-red-400 mb-3">Game Over</h4>
            <p className="text-sm text-red-400/80 mb-3">No valid options available. The game is over.</p>
            <div className="space-y-3">
              <button
                onClick={resetGame}
                className="w-full p-3 text-left rounded-md transition-all game-card bg-red-500/20 hover:bg-red-500/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span>Start New Game</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {gameState.showResult && gameState.lastResortUsed && (
          <div className="text-center animate-float">
            <p className="text-red-400">Last Resort Action Taken</p>
            <p className="text-sm text-purple-300/80">Effects will last for multiple rounds</p>
          </div>
        )}

        {/* Update the game over display to be more prominent */}
        {gameState.gameOver && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center">
            <div className="bg-black/40 p-8 rounded-lg border border-purple-500/20 backdrop-blur-sm max-w-lg w-full mx-4">
              <div className="text-center space-y-6">
                <Skull className="h-16 w-16 mx-auto text-red-500" />
                <h2 className="text-3xl font-bold text-red-500">Game Over!</h2>
                <p className="text-xl text-purple-300">{gameState.gameOverReason}</p>
                <div className="space-y-4">
                  <Button 
                    onClick={resetGame}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-xl px-8 py-6 rounded-none border-2 border-purple-500/30"
                  >
                    Start New Game
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
    </main>

      {/* Footer */}
      <footer className="bg-black/90 backdrop-blur-xl border-t border-purple-500/20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-black tracking-tighter">BCD</h3>
              <p className="text-purple-300">Elite Business Network</p>
              <div className="flex space-x-4">
                <a href="#" className="text-purple-300 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-purple-300 hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-purple-300 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="text-purple-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#benefits" className="text-purple-300 hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#events" className="text-purple-300 hover:text-white transition-colors">Events</a></li>
                <li><a href="#insights" className="text-purple-300 hover:text-white transition-colors">Insights</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors">News</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-purple-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Newsletter</h4>
              <p className="text-purple-300 mb-4">Stay updated with our latest insights</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-black/40 border border-purple-500/30 px-4 py-2 rounded-none text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
                />
                <Button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-none border-2 border-purple-500/30">
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-12 pt-8 text-center text-purple-300">
            <p>© 2024 BCD Elite Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
