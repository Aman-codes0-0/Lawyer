import { useEffect, useState } from "react";
import { Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#162F6A]"
        >
          <div className="relative flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-28 h-28 border-t-[3px] border-r-[3px] border-[#214AAB] border-b-[3px] border-b-[#214AAB] rounded-full absolute"
            />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center w-20 h-20 bg-[#102047] rounded-full shadow-[0_0_25px_rgba(221,167,58,0.25)] border border-[#DDA73A]/40"
            >
              <Scale className="w-10 h-10 text-[#DDA73A]" strokeWidth={1.5} />
            </motion.div>
          </div>
          <p className="text-white text-xs font-semibold tracking-widest uppercase mt-8 text-gray-300">
            LexPrime Legal Portal
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
