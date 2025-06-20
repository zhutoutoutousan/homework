"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  type: 'kpis' | 'valueProps' | 'results';
  content: any;
  language: 'de' | 'en';
};

export function InteractiveCTA({ type, content, language }: Props) {
  const [diceRoll, setDiceRoll] = useState(0);
  const [diceRolling, setDiceRolling] = useState(false);
  const [readyClicks, setReadyClicks] = useState(0);
  const [crystalBallActive, setCrystalBallActive] = useState(false);

  const handleDiceRoll = () => {
    setDiceRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    setTimeout(() => {
      setDiceRoll(roll);
      setDiceRolling(false);
    }, 1000);
  };

  const handleReadyClick = () => {
    setReadyClicks(prev => prev + 1);
  };

  const activateCrystalBall = () => {
    setCrystalBallActive(true);
    setTimeout(() => setCrystalBallActive(false), 2000);
  };

  const getHandler = () => {
    switch(type) {
      case 'kpis':
        return handleReadyClick;
      case 'valueProps':
        return activateCrystalBall;
      case 'results':
        return handleDiceRoll;
      default:
        return () => {};
    }
  };

  const getButtonContent = () => {
    switch(type) {
      case 'kpis':
        return `${content.ctas[language].kpis.action} ${readyClicks > 0 ? `(${readyClicks})` : ''}`;
      case 'valueProps':
        return content.ctas[language].valueProps.action;
      case 'results':
        return diceRolling ? '🎲' : diceRoll === 6 ? '🎯 Access Granted!' : diceRoll > 0 ? `Try again (${diceRoll})` : content.ctas[language].results.action;
      default:
        return '';
    }
  };

  return (
    <motion.div
      className="mt-16 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <motion.button
        onClick={getHandler()}
        disabled={type === 'results' && diceRolling}
        className="group relative px-8 py-4 bg-transparent border-2 border-purple-500 rounded-full overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transform transition-all duration-500 ${type === 'valueProps' && crystalBallActive ? 'scale-150 opacity-50' : 'scale-100 opacity-20'}`} />
        <div className="relative">
          <h3 className="text-2xl font-bold text-white mb-2">
            {content.ctas[language][type].text}
          </h3>
          <p className="text-sm text-gray-400">
            {content.ctas[language][type].subtext}
          </p>
          <span className={`block mt-4 text-xl font-bold ${type === 'valueProps' && crystalBallActive ? 'text-white scale-110' : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500'}`}>
            {getButtonContent()}
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
} 