"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const content = {
  hero: {
    de: {
      title: "Ein Club für Antworten rund um Vermögen, Kapital, Deals und Unternehmertum",
      subtitle: "Austauschen. Lernen. Netzwerken.",
      benefits: [
        "Persönlichen Erfahrungsaustausch unter Top Unternehmern",
        "Inspiration finden, Perspektiven challengen, Wissen erweitern",
        "Netzwerk erweitern und erprobte Strategien selbst nutzen"
      ]
    },
    en: {
      title: "A Club for Answers about Wealth, Capital, Deals and Entrepreneurship",
      subtitle: "Exchange. Learn. Network.",
      benefits: [
        "Personal exchange among top entrepreneurs",
        "Find inspiration, challenge perspectives, expand knowledge",
        "Expand network and use proven strategies"
      ]
    }
  },
  exclusive: {
    de: {
      title: "Jetzt exklusiv erhalten!",
      subtitle: "113 Fragen, die sich Unternehmer rund um ihr Vermögen in diesen Zeiten stellen SOLLTEN",
      cta: "Jetzt Fragenkatalog herunterladen"
    },
    en: {
      title: "Get Exclusive Access Now!",
      subtitle: "113 Questions Entrepreneurs Should Ask About Their Wealth in These Times",
      cta: "Download Question Catalog Now"
    }
  },
  topics: [
    { de: "Investment Strategien & Modelle", en: "Investment Strategies & Models" },
    { de: "Vermögensverwaltung & Allokation", en: "Wealth Management & Allocation" },
    { de: "Vermögenscontrolling & Steuern", en: "Wealth Controlling & Taxes" },
    { de: "Venture Capital & Private Equity", en: "Venture Capital & Private Equity" },
    { de: "Risikomanagement & Diversifikation", en: "Risk Management & Diversification" },
    { de: "Immobilien Investments & Strategie", en: "Real Estate Investments & Strategy" },
    { de: "Erbschafts- und Nachfolgeplanung", en: "Inheritance & Succession Planning" }
  ],
  experts: [
    {
      name: "Dr. Dominik Benner",
      role: { de: "CEO Benner Holding", en: "CEO Benner Holding" },
      specialty: { de: "Immobilien und IPOs", en: "Real Estate and IPOs" }
    },
    {
      name: "Jan Beckers",
      role: { de: "CIO Bit Capital", en: "CIO Bit Capital" },
      specialty: { de: "Aktien, Tech und Private Markets", en: "Stocks, Tech and Private Markets" }
    },
    {
      name: "Reinhard Panse",
      role: { de: "CIO Finvia MFO", en: "CIO Finvia MFO" },
      specialty: { de: "Strategische Asset Allokation", en: "Strategic Asset Allocation" }
    },
    {
      name: "Tristan Berghaus",
      role: { de: "CEO Berghaus & Cie", en: "CEO Berghaus & Cie" },
      specialty: { de: "Wein & Collectibles", en: "Wine & Collectibles" }
    }
  ],
  about: {
    de: {
      title: "Netzwerke helfen nur dem, der sie nutzt.",
      content: "Ich bin seit fast 20 Jahren Seriengründer und Vollblut-Unternehmer – und helfe anderen, ebenfalls erfolgreich zu sein. Indem ich mein Geld als Wagniskapitalgeber in neue Geschäftsmodelle investiere. Dazu habe ich 2016 Cavalry Ventures gegründet und 60+ Firmen finanziert. Faktisch nutze ich mein Netzwerk und meine Reichweite, um Menschen zusammenzubringen – von New bis Old Economy, von Startup bis Deutschland AG."
    },
    en: {
      title: "Networks only help those who use them.",
      content: "I've been a serial founder and full-blooded entrepreneur for almost 20 years – and I help others to be successful too. By investing my money as a venture capitalist in new business models. For this, I founded Cavalry Ventures in 2016 and funded 60+ companies. In fact, I use my network and reach to bring people together – from New to Old Economy, from Startup to Deutschland AG."
    }
  },
  kpis: {
    de: [
      { number: "€2.1B+", label: "Verwaltetes Vermögen", sublabel: "durch unser Netzwerk" },
      { number: "600+", label: "Elite Unternehmer", sublabel: "in der Community" },
      { number: "60+", label: "Venture Investments", sublabel: "durch Cavalry Ventures" },
      { number: "12", label: "Exklusive Events", sublabel: "pro Jahr" }
    ],
    en: [
      { number: "€2.1B+", label: "Assets Under Management", sublabel: "through our network" },
      { number: "600+", label: "Elite Entrepreneurs", sublabel: "in the community" },
      { number: "60+", label: "Venture Investments", sublabel: "through Cavalry Ventures" },
      { number: "12", label: "Exclusive Events", sublabel: "per year" }
    ]
  },
  valueProps: {
    de: [
      {
        title: "Exklusives Dealflow-Netzwerk",
        description: "Direkter Zugang zu Pre-Seed bis Series A Investmentmöglichkeiten aus unserem Netzwerk",
        icon: "💎"
      },
      {
        title: "Vermögensoptimierung",
        description: "Strategische Beratung zur Optimierung deiner Asset-Allokation durch Family Office Experten",
        icon: "📈"
      },
      {
        title: "Peer-to-Peer Mastermind",
        description: "Vertraulicher Austausch mit Unternehmern auf Augenhöhe in kleinen, kuratierten Gruppen",
        icon: "🤝"
      },
      {
        title: "Global Real Estate Access",
        description: "Exklusive Immobilieninvestments in Premium-Lagen weltweit durch unser Partnernetzwerk",
        icon: "🏰"
      }
    ],
    en: [
      {
        title: "Exclusive Dealflow Network",
        description: "Direct access to Pre-Seed to Series A investment opportunities from our network",
        icon: "💎"
      },
      {
        title: "Wealth Optimization",
        description: "Strategic consulting on optimizing your asset allocation through Family Office experts",
        icon: "📈"
      },
      {
        title: "Peer-to-Peer Mastermind",
        description: "Confidential exchange with entrepreneurs at eye level in small, curated groups",
        icon: "🤝"
      },
      {
        title: "Global Real Estate Access",
        description: "Exclusive real estate investments in premium locations worldwide through our partner network",
        icon: "🏰"
      }
    ]
  },
  results: {
    de: [
      { number: "43%", label: "Durchschnittliche Rendite", sublabel: "pro Investment" },
      { number: "€25M+", label: "Dealflow Volumen", sublabel: "pro Quartal" },
      { number: "92%", label: "Mitglieder Zufriedenheit", sublabel: "in 2024" }
    ],
    en: [
      { number: "43%", label: "Average Return", sublabel: "per investment" },
      { number: "€25M+", label: "Dealflow Volume", sublabel: "per quarter" },
      { number: "92%", label: "Member Satisfaction", sublabel: "in 2024" }
    ]
  },
  ctas: {
    de: {
      kpis: {
        text: "Willst du die 601. Person sein?",
        subtext: "Klick nur, wenn du es ernst meinst",
        action: "Ich bin bereit 🚀"
      },
      valueProps: {
        text: "Zu spät für Bitcoin. Zu früh für Marsimmobilien.",
        subtext: "Genau richtig für unser Netzwerk",
        action: "Zeig mir die Zukunft 🔮"
      },
      results: {
        text: "Erfolg ist kein Glücksspiel",
        subtext: "Aber manchmal muss man würfeln",
        action: "Würfle eine 6 für Zugang 🎲"
      }
    },
    en: {
      kpis: {
        text: "Want to be person 601?",
        subtext: "Only click if you mean it",
        action: "I'm ready 🚀"
      },
      valueProps: {
        text: "Too late for Bitcoin. Too early for Mars real estate.",
        subtext: "Perfect timing for our network",
        action: "Show me the future 🔮"
      },
      results: {
        text: "Success isn't gambling",
        subtext: "But sometimes you need to roll the dice",
        action: "Roll a 6 for access 🎲"
      }
    }
  }
};

function InteractiveCTA({ 
  type, 
  content, 
  language 
}: { 
  type: 'kpis' | 'valueProps' | 'results',
  content: any,
  language: 'de' | 'en'
}) {
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

export default function BetterCallDominik() {
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [showTranslation, setShowTranslation] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'de' ? 'en' : 'de');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, -20, 0],
              opacity: [0, 1, 0],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleLanguage}
          className="bg-purple-600/20 hover:bg-purple-600/30 text-white border border-purple-500/30 backdrop-blur-sm"
        >
          {language === 'de' ? '🇬🇧 EN' : '🇩🇪 DE'}
        </Button>
        <Button
          onClick={() => setShowTranslation(!showTranslation)}
          className="ml-2 bg-purple-600/20 hover:bg-purple-600/30 text-white border border-purple-500/30 backdrop-blur-sm"
        >
          {showTranslation ? 'Hide Translation' : 'Show Translation'}
        </Button>
      </div>

      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 px-6 py-2 text-lg backdrop-blur-sm border border-purple-500/30">
            BETTER CALL DOMINIK
          </Badge>
          <div className="relative">
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-8">
              {content.hero[language].title}
            </h1>
            {showTranslation && language === 'de' && (
              <p className="text-2xl text-gray-400 mb-4 italic">
                {content.hero.en.title}
              </p>
            )}
            {showTranslation && language === 'en' && (
              <p className="text-2xl text-gray-400 mb-4 italic">
                {content.hero.de.title}
              </p>
            )}
          </div>
          <p className="text-2xl text-gray-300 mb-8">
            {content.hero[language].subtitle}
          </p>
          <ul className="space-y-4 mb-12">
            {content.hero[language].benefits.map((benefit, index) => (
              <motion.li
                key={index}
                className="text-xl text-gray-300"
                whileHover={{ scale: 1.02 }}
              >
                ✨ {benefit}
                {showTranslation && (
                  <p className="text-gray-400 italic mt-1">
                    {content.hero[language === 'de' ? 'en' : 'de'].benefits[index]}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* KPIs Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {content.kpis[language].map((kpi, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                <Card className="backdrop-blur-xl bg-black/30 border border-purple-500/30 p-8 rounded-3xl relative text-center">
                  <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                    {kpi.number}
                  </h3>
                  <p className="text-xl font-bold text-white mb-2">{kpi.label}</p>
                  <p className="text-sm text-gray-400">{kpi.sublabel}</p>
                  {showTranslation && (
                    <div className="mt-4 text-gray-400 italic text-sm">
                      <p>{content.kpis[language === 'de' ? 'en' : 'de'][index].label}</p>
                      <p>{content.kpis[language === 'de' ? 'en' : 'de'][index].sublabel}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
          
          <InteractiveCTA type="kpis" content={content} language={language} />
        </motion.div>

        {/* Value Propositions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-bold text-white mb-16 text-center">
            {language === 'de' ? 'Dein Unfairer Vorteil' : 'Your Unfair Advantage'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.valueProps[language].map((prop, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                <Card className="backdrop-blur-xl bg-black/30 border border-purple-500/30 p-8 rounded-3xl relative">
                  <span className="text-4xl mb-6 block">{prop.icon}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{prop.title}</h3>
                  <p className="text-gray-300">{prop.description}</p>
                  {showTranslation && (
                    <div className="mt-4 text-gray-400 italic">
                      <h4 className="font-bold mb-2">{content.valueProps[language === 'de' ? 'en' : 'de'][index].title}</h4>
                      <p>{content.valueProps[language === 'de' ? 'en' : 'de'][index].description}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          <InteractiveCTA type="valueProps" content={content} language={language} />
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-bold text-white mb-16 text-center">
            {language === 'de' ? 'Unsere Erfolge' : 'Our Results'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.results[language].map((result, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                <Card className="backdrop-blur-xl bg-black/30 border border-purple-500/30 p-8 rounded-3xl relative text-center">
                  <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
                    {result.number}
                  </h3>
                  <p className="text-xl font-bold text-white mb-2">{result.label}</p>
                  <p className="text-sm text-gray-400">{result.sublabel}</p>
                  {showTranslation && (
                    <div className="mt-4 text-gray-400 italic text-sm">
                      <p>{content.results[language === 'de' ? 'en' : 'de'][index].label}</p>
                      <p>{content.results[language === 'de' ? 'en' : 'de'][index].sublabel}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          <InteractiveCTA type="results" content={content} language={language} />
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-bold text-white mb-16 text-center">
            {language === 'de' ? 'Themen die uns bewegen' : 'Topics that move us'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {content.topics.map((topic, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-xl bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 hover:bg-purple-800/20 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">{topic[language]}</h3>
                {showTranslation && (
                  <p className="text-gray-400 italic">
                    {topic[language === 'de' ? 'en' : 'de']}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experts Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <h2 className="text-5xl font-bold text-white mb-16 text-center">
            {language === 'de' ? 'Unser Experten-Pool' : 'Our Expert Pool'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.experts.map((expert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-xl" />
                <Card className="backdrop-blur-xl bg-black/30 border border-purple-500/30 p-8 rounded-3xl relative">
                  <h3 className="text-2xl font-bold text-white mb-2">{expert.name}</h3>
                  <p className="text-purple-400 mb-2">{expert.role[language]}</p>
                  <p className="text-gray-300">{expert.specialty[language]}</p>
                  {showTranslation && (
                    <div className="mt-4 text-gray-400 italic">
                      <p>{expert.specialty[language === 'de' ? 'en' : 'de']}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <Card className="backdrop-blur-xl bg-black/30 border border-purple-500/30 p-12 rounded-3xl">
            <h2 className="text-4xl font-bold text-white mb-8">
              {content.about[language].title}
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              {content.about[language].content}
            </p>
            {showTranslation && (
              <div className="mt-8 text-gray-400 italic">
                <h3 className="text-2xl mb-4">{content.about[language === 'de' ? 'en' : 'de'].title}</h3>
                <p className="text-lg">{content.about[language === 'de' ? 'en' : 'de'].content}</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
          <Card className="backdrop-blur-xl bg-black/50 border border-purple-500/30 p-16 rounded-3xl relative">
            <h2 className="text-5xl font-bold text-white mb-8">
              {language === 'de' ? 'Bereit für den nächsten Level?' : 'Ready for the next level?'}
            </h2>
            <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Werde Teil eines exklusiven Netzwerks von Unternehmern, die gemeinsam wachsen.' 
                : 'Become part of an exclusive network of entrepreneurs who grow together.'}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                text-white px-12 py-8 text-xl rounded-full transition-all duration-300 shadow-[0_0_50px_rgba(168,85,247,0.4)]"
              >
                <Link href="https://bettercalldominik.com/" target="_blank">
                  {language === 'de' ? 'Jetzt Mitglied werden →' : 'Become a Member Now →'}
                </Link>
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 