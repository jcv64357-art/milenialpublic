import React, { useEffect, useState } from 'react';

interface VideoReelProps {
  onComplete: () => void;
}

type Scene = 
  | 'start' 
  | 'chaos' 
  | 'conflict' 
  | 'silence' 
  | 'breathe' 
  | 'clarity' 
  | 'companion' 
  | 'features' 
  | 'identity' 
  | 'purpose' 
  | 'cta';

export const VideoReel: React.FC<VideoReelProps> = ({ onComplete }) => {
  const [scene, setScene] = useState<Scene>('start');
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Timeline Logic (30s sequence)
  useEffect(() => {
    if (time >= 0 && time < 2) setScene('start');
    else if (time >= 2 && time < 4) setScene('chaos');
    else if (time >= 4 && time < 6) setScene('conflict');
    else if (time >= 6 && time < 8) setScene('silence');
    else if (time >= 8 && time < 10) setScene('breathe');
    else if (time >= 10 && time < 13) setScene('clarity');
    else if (time >= 13 && time < 16) setScene('companion');
    else if (time >= 16 && time < 19) setScene('features');
    else if (time >= 19 && time < 22) setScene('identity');
    else if (time >= 22 && time < 25) setScene('purpose');
    else if (time >= 25) setScene('cta');
  }, [time]);

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-8 relative transition-colors duration-1000 ease-in-out cursor-pointer"
      onClick={onComplete} // Allow skipping/continuing at end
      style={{
        backgroundColor: scene === 'start' || scene === 'chaos' || scene === 'conflict' 
          ? '#EBEBEB' // Greyish for noise
          : '#FDFCF8' // Warm white for clarity
      }}
    >
      {/* --- SCENE 1: SATURATION (0-2s) --- */}
      {scene === 'start' && (
        <div className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden animate-fade-in">
           {/* Background noise simulation */}
           <div className="absolute top-10 left-10 text-xs text-gray-400 opacity-30 rotate-12">SE VENDE</div>
           <div className="absolute bottom-20 right-10 text-xs text-gray-400 opacity-30 -rotate-12">OFERTA</div>
           <div className="absolute top-1/3 right-1/4 text-xs text-gray-400 opacity-30 rotate-45">$5.4MDP</div>
           
           <h1 className="text-2xl font-light text-gray-800 animate-float-up z-10 text-center">
             Buscar casa se ve así...
           </h1>
        </div>
      )}

      {/* --- SCENE 2: NOISE (2-4s) --- */}
      {scene === 'chaos' && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 animate-chaos overflow-hidden">
           <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="bg-gray-400 h-20 w-full rounded-md"></div>
              ))}
           </div>
           <div className="z-10 bg-white/80 p-6 shadow-xl backdrop-blur-md max-w-xs text-center">
              <h2 className="text-xl font-medium text-red-800">...pero se siente peor.</h2>
           </div>
        </div>
      )}

      {/* --- SCENE 3: CONFLICT (4-6s) --- */}
      {scene === 'conflict' && (
        <div className="flex flex-col gap-6 text-center">
           <span className="text-3xl font-thin tracking-widest text-gray-400 animate-[floatUp_0.5s_ease-out]">Quiero.</span>
           <span className="text-3xl font-bold tracking-widest text-gray-800 animate-[floatUp_0.5s_ease-out_0.2s_both]">Necesito.</span>
           <span className="text-3xl font-thin italic text-gray-500 animate-[floatUp_0.5s_ease-out_0.4s_both]">Dicen.</span>
        </div>
      )}

      {/* --- SCENE 4: SILENCE (6-8s) --- */}
      {scene === 'silence' && (
        <div className="absolute inset-0 bg-white flex items-center justify-center transition-opacity duration-1000">
           <h1 className="text-xs tracking-[0.5em] text-gray-300 uppercase scale-150 transition-transform duration-[2000ms] ease-out">
             Ruido
           </h1>
        </div>
      )}

      {/* --- SCENE 5: BREATHE (8-10s) --- */}
      {scene === 'breathe' && (
        <div className="flex items-center justify-center">
           <div className="w-4 h-4 bg-[#D8D4C8] rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
           <span className="absolute mt-12 text-lg font-light text-[#8A8A8A] animate-float-up">Respira.</span>
        </div>
      )}

      {/* --- SCENE 6: CLARITY (10-13s) --- */}
      {scene === 'clarity' && (
        <div className="text-center px-10">
           <div className="w-px h-16 bg-[#D8D4C8] mx-auto mb-6"></div>
           <h2 className="text-2xl font-light text-[#2C2C2C] leading-relaxed animate-float-up">
             Decidir debería sentirse así.
           </h2>
        </div>
      )}

      {/* --- SCENE 7: COMPANION (13-16s) --- */}
      {scene === 'companion' && (
        <div className="text-center">
           <h2 className="text-xl font-thin text-[#2C2C2C] tracking-wide animate-float-up border-b border-[#E6E4DC] pb-4">
             Acompañamiento imparcial.
           </h2>
        </div>
      )}

      {/* --- SCENE 8: DIFFERENTIAL (16-19s) --- */}
      {scene === 'features' && (
        <div className="flex flex-col gap-4 text-center items-center">
           <span className="text-lg text-[#8A8A8A] font-light animate-[floatUp_0.5s_ease-out]">Sin ruido.</span>
           <span className="text-lg text-[#8A8A8A] font-light animate-[floatUp_0.5s_ease-out_0.3s_both]">Sin prisa.</span>
           <span className="text-lg text-[#2C2C2C] font-normal animate-[floatUp_0.5s_ease-out_0.6s_both]">Sin presión.</span>
        </div>
      )}

      {/* --- SCENE 9: IDENTITY (19-22s) --- */}
      {scene === 'identity' && (
        <div className="text-center">
           <h1 className="text-3xl font-extralight tracking-widest text-[#2C2C2C] animate-float-up uppercase">
             Vita
           </h1>
           <p className="text-xs tracking-[0.3em] text-[#8A8A8A] mt-2 animate-[floatUp_1s_ease-out_0.3s_both] uppercase">
             Personal Shopper
           </p>
        </div>
      )}

      {/* --- SCENE 10: PURPOSE (22-25s) --- */}
      {scene === 'purpose' && (
        <div className="text-center max-w-xs">
           <p className="text-xl font-light text-[#2C2C2C] leading-relaxed animate-float-up">
             Para que decidas tú.<br/>
             <span className="text-[#A09D95]">No el ruido.</span>
           </p>
        </div>
      )}

      {/* --- SCENE 11: CTA (25s+) --- */}
      {scene === 'cta' && (
        <div className="text-center flex flex-col items-center h-full justify-center">
           <p className="text-xl font-light text-[#2C2C2C] mb-2 animate-float-up">
             Si quieres claridad...
           </p>
           <p className="text-xl font-medium text-[#2C2C2C] mb-12 animate-[floatUp_0.8s_ease-out_0.3s_both]">
             ...te acompaño.
           </p>
           
           <div className="mt-auto mb-10 animate-pulse">
             <p className="text-xs tracking-widest text-[#8A8A8A] uppercase">
               Toca para continuar
             </p>
             <div className="w-px h-8 bg-[#D8D4C8] mx-auto mt-4"></div>
           </div>
        </div>
      )}
      
      {/* Progress Line (subtle) */}
      <div className="absolute bottom-0 left-0 h-1 bg-[#E6E4DC] w-full">
        <div 
          className="h-full bg-[#2C2C2C] transition-all duration-1000 ease-linear"
          style={{ width: `${Math.min((time / 30) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
};