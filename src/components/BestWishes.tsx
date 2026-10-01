import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface BestWishesProps {
  inviteeName?: string;
  isWaleema?: boolean;
}

export const BestWishes: React.FC<BestWishesProps> = ({ inviteeName = '', isWaleema = false }) => {
  const [name, setName] = useState(inviteeName);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inviteeName) {
      setName(inviteeName);
    }
  }, [inviteeName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setLoading(true);
    
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxu_hFbfsUMTcKZjqL0agaq8WkHGVjk7VW5UROJXD1JyawjWdDSmeh7oHfwTAmyiMo/exec';
      
      if (scriptUrl !== 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            type: 'wish',
            name: name,
            message: message,
            eventType: isWaleema ? 'Waleema' : 'Wedding',
          })
        });
      } else {
        // Fallback simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    } catch (e) {
      console.error('Error saving wish to sheets:', e);
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-24 sm:py-32 px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg mx-auto flex flex-col items-center"
      >
        <h2 className="font-display text-[4rem] sm:text-[5rem] text-[#3a2d27] mb-2 leading-[0.9] text-center">
          Best Wishes
        </h2>

        <span className="text-[#5a4d46] font-sans text-[10px] sm:text-[11px] tracking-[0.3em] font-medium uppercase mt-6 mb-16 sm:mb-24 text-center">
          Leave a message for the couple
        </span>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <h3 className="text-4xl font-display text-[#3a2d27] mb-4">Thank You</h3>
              <p className="text-[#5a4d46] font-serif italic text-lg mb-8">
                Your wishes mean the world to us.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="text-[#3a2d27] font-sans text-[10px] tracking-[0.2em] uppercase border-b border-[#3a2d27] pb-1 hover:opacity-70 transition-opacity"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-10"
            >
              {/* Name */}
              <div className="flex flex-col gap-3">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#5a4d46]">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., John & Jane Doe"
                  className="w-full bg-transparent border-b border-[#3a2d27]/20 pb-3 text-[#3a2d27] font-serif text-base focus:outline-none focus:border-[#3a2d27] transition-colors placeholder:text-[#3a2d27]/40 placeholder:italic"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              {/* Message */}
              <div className="flex flex-col gap-3">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#5a4d46]">Your Message</label>
                <textarea
                  required
                  placeholder="Write your wishes for the couple..."
                  rows={3}
                  className="w-full bg-transparent border-b border-[#3a2d27]/20 pb-3 text-[#3a2d27] font-serif text-base focus:outline-none focus:border-[#3a2d27] transition-colors placeholder:text-[#3a2d27]/40 placeholder:italic resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              {/* Submit Button */}
              <div className="pt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 py-4 bg-transparent border border-[#3a2d27]/30 rounded-full text-[#3a2d27] font-sans tracking-[0.3em] text-[10px] uppercase hover:bg-[#3a2d27] hover:text-[#FAF9F6] transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Send Wishes'
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
