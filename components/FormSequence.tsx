import React, { useState } from 'react';

// --- Types ---

type QuestionType = 'welcome' | 'choice' | 'text' | 'reflection' | 'contact';

interface Step {
  id: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: string[];
  placeholder?: string;
  buttonText?: string;
}

// --- Data ---

const steps: Step[] = [
  {
    id: 1,
    type: 'welcome',
    title: 'Para entender lo que buscas...',
    subtitle: 'Responde en calma. Esto es solo para darte claridad.',
    buttonText: 'Comenzar'
  },
  {
    id: 2,
    type: 'choice',
    title: '¿Qué palabra describe mejor esta decisión?',
    options: ['Importante', 'Confusa', 'Emocionante', 'Agotadora', 'No sé']
  },
  {
    id: 3,
    type: 'choice',
    title: 'Cuando imaginas tu casa... ¿qué aparece primero?',
    options: ['Cómo se siente', 'Lo práctica', 'La zona', 'Lo que representa a futuro', 'No estoy seguro(a)']
  },
  {
    id: 4,
    type: 'choice',
    title: '¿Sientes que lo que quieres y lo que necesitas coinciden?',
    options: ['Sí', 'No del todo', 'A veces', 'No lo había pensado así']
  },
  {
    id: 5,
    type: 'choice',
    title: 'Cuando hablas de esto, ¿qué pasa alrededor?',
    options: ['Muchas opiniones', 'Recomendaciones constantes', 'A veces prisa', 'Prefiero guardármelo']
  },
  {
    id: 6,
    type: 'choice',
    title: '¿Qué te haría sentir más en control?',
    options: ['Ver solo opciones reales', 'Que alguien filtre por mí', 'Evitar visitas innecesarias', 'Cero presión', 'Información clara para decidir yo']
  },
  {
    id: 7,
    type: 'choice',
    title: '¿Cómo prefieres decidir?',
    options: ['Con datos', 'Con calma', 'Acompañado(a)', 'Pocas opciones pero buenas', 'Cuidando mi energía']
  },
  {
    id: 8,
    type: 'reflection',
    title: 'Hay opciones... y hay claridad.',
    buttonText: 'Continuar'
  },
  {
    id: 9,
    type: 'choice',
    title: '¿Te ayudaría que alguien viera primero lo que sí vale la pena?',
    options: ['Sí', 'Sí, pero a mi ritmo', 'Me interesa', 'No estoy seguro(a)']
  },
  {
    id: 10,
    type: 'text',
    title: '¿Qué esperas de quien te acompañe en este camino?',
    placeholder: 'Escribe aquí...'
  },
  {
    id: 11,
    type: 'contact',
    title: 'Para enviarte claridad...',
    subtitle: 'A partir de aquí, el proceso será más tuyo... y menos del ruido.',
    buttonText: 'Finalizar'
  }
];

// --- Components ---

export const FormSequence: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [finished, setFinished] = useState(false);

  // Form Field States
  const [textInput, setTextInput] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const currentStep = steps[currentStepIndex];

  const handleNext = (answer?: any) => {
    if (isAnimating) return;
    
    // Save answer
    if (answer) {
      setAnswers(prev => ({ ...prev, [currentStep.id]: answer }));
    } else if (currentStep.type === 'text') {
       setAnswers(prev => ({ ...prev, [currentStep.id]: textInput }));
    } else if (currentStep.type === 'contact') {
       setAnswers(prev => ({ ...prev, [currentStep.id]: { name, phone } }));
    }

    setIsAnimating(true);
    
    // Slight delay to allow "click" animation on buttons
    setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
        setIsAnimating(false);
      } else {
        setFinished(true);
      }
    }, 300);
  };

  if (finished) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-[#FDFCF8]">
        <div className="w-16 h-16 rounded-full bg-[#E6E4DC] flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-[#2C2C2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-light text-[#2C2C2C] mb-4">Todo listo.</h2>
        <p className="text-gray-500 font-light">
          Analizaré tus respuestas para enviarte una propuesta de claridad, no de ruido.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFCF8]">
      {/* Progress Indicator (Minimalist) */}
      <div className="w-full h-1 bg-[#F5F5F0]">
        <div 
          className="h-full bg-[#D8D4C8] transition-all duration-500"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Main Card Container */}
      <div className="flex-1 flex flex-col justify-center px-8 relative overflow-hidden">
        
        {/* Animated Key container forces remount/animation on step change */}
        <div key={currentStep.id} className="w-full animate-slide-in flex flex-col">
          
          {/* WELCOME / INTRO */}
          {currentStep.type === 'welcome' && (
            <div className="text-center space-y-8">
              <h1 className="text-3xl font-light text-[#2C2C2C] leading-tight">
                {currentStep.title}
              </h1>
              <p className="text-[#8A8A8A] font-light text-lg">
                {currentStep.subtitle}
              </p>
              <button 
                onClick={() => handleNext(true)}
                className="w-full py-4 mt-8 rounded-xl border border-[#E6E4DC] text-[#2C2C2C] hover:bg-[#F5F5F0] transition-all duration-300 tracking-wide font-medium"
              >
                {currentStep.buttonText}
              </button>
            </div>
          )}

          {/* CHOICE SELECTION */}
          {currentStep.type === 'choice' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-light text-[#2C2C2C] leading-snug">
                {currentStep.title}
              </h2>
              <div className="flex flex-col gap-3">
                {currentStep.options?.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNext(option)}
                    className="w-full text-left p-5 rounded-xl border border-[#E6E4DC] text-[#555] bg-white hover:bg-[#FBFBF9] hover:border-[#D8D4C8] transition-all duration-200 active:scale-[0.98] font-light"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* REFLECTION PAUSE */}
          {currentStep.type === 'reflection' && (
             <div 
               onClick={() => handleNext(true)}
               className="h-full flex flex-col items-center justify-center cursor-pointer min-h-[50vh]"
             >
               <h2 className="text-2xl font-light text-[#2C2C2C] text-center leading-relaxed italic">
                 "{currentStep.title}"
               </h2>
               <p className="mt-8 text-xs text-[#8A8A8A] uppercase tracking-widest animate-pulse">
                 Toca para continuar
               </p>
             </div>
          )}

          {/* OPEN TEXT */}
          {currentStep.type === 'text' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-[#2C2C2C]">
                {currentStep.title}
              </h2>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={currentStep.placeholder}
                className="w-full h-40 p-4 rounded-xl border border-[#E6E4DC] bg-white text-[#2C2C2C] focus:outline-none focus:border-[#B0B0B0] font-light resize-none"
              />
              <button 
                onClick={() => handleNext()}
                disabled={!textInput.trim()}
                className={`w-full py-4 rounded-xl transition-all duration-300 tracking-wide font-medium ${
                  textInput.trim() 
                    ? 'bg-[#2C2C2C] text-white shadow-lg' 
                    : 'bg-[#F0F0F0] text-[#A0A0A0] cursor-not-allowed'
                }`}
              >
                Continuar
              </button>
            </div>
          )}

          {/* CONTACT INFO */}
          {currentStep.type === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light text-[#2C2C2C]">
                {currentStep.title}
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#E6E4DC] bg-white text-[#2C2C2C] focus:outline-none focus:border-[#B0B0B0] font-light"
                />
                <input
                  type="tel"
                  placeholder="Tu teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 rounded-xl border border-[#E6E4DC] bg-white text-[#2C2C2C] focus:outline-none focus:border-[#B0B0B0] font-light"
                />
              </div>
              <p className="text-[#8A8A8A] font-light text-sm pt-2">
                {currentStep.subtitle}
              </p>
              <button 
                onClick={() => handleNext()}
                disabled={!name.trim() || !phone.trim()}
                className={`w-full py-4 mt-4 rounded-xl transition-all duration-300 tracking-wide font-medium ${
                  name.trim() && phone.trim()
                    ? 'bg-[#2C2C2C] text-white shadow-lg' 
                    : 'bg-[#F0F0F0] text-[#A0A0A0] cursor-not-allowed'
                }`}
              >
                {currentStep.buttonText}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};