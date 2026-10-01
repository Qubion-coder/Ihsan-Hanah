import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface RSVPFormProps {
  inviteeName?: string;
  eventName?: string;
  eventParam?: string;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ inviteeName = '', eventName = 'the celebration', eventParam = 'both' }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const guestsParam = searchParams.get('guests') || '1';

  const [formData, setFormData] = useState({
    fullName: inviteeName,
    email: '',
    attendance: 'yes',
    guests: guestsParam,
    dietary: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (inviteeName) {
      setFormData(prev => ({ ...prev, fullName: inviteeName }));
    }
  }, [inviteeName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      toast.success('Your RSVP has been warmly received!');
    } catch (error) {
      setStatus('error');
      toast.error('Could not submit RSVP. Please try again.');
    }
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
        {/* Swans Scroll Animation */}
        <div className="w-48 sm:w-64 h-24 sm:h-32 mb-8 relative flex items-center justify-center">
          <motion.img 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            src="/Gemini_Generated_Image_t3ilvlt3ilvlt3il-removebg-preview.png" 
            alt="Left Swan" 
            className="w-1/2 h-full object-contain mix-blend-multiply" 
          />
          <motion.img 
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            src="/Gemini_Generated_Image_t3ilvlt3ilvlt3il-removebg-preview - Copy.png" 
            alt="Right Swan" 
            className="w-1/2 h-full object-contain mix-blend-multiply" 
          />
        </div>

        <h2 className="font-display text-[4rem] sm:text-[5rem] text-[#3a2d27] mb-2 leading-[0.9] text-center">
          Confirm your<br />presence
        </h2>

        <span className="text-[#5a4d46] font-sans text-[10px] sm:text-[11px] tracking-[0.3em] font-medium uppercase mt-8 mb-16 sm:mb-24 text-center">
          Kindly respond by October 08, 2026
        </span>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <h3 className="text-4xl font-display text-[#3a2d27] mb-4">With Gratitude</h3>
              <p className="text-[#5a4d46] font-serif italic text-lg mb-8">
                Your response has been warmly received. We cannot wait to celebrate with you!
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-[#3a2d27] font-sans text-[10px] tracking-[0.2em] uppercase border-b border-[#3a2d27] pb-1 hover:opacity-70 transition-opacity"
              >
                Update Response
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
              {/* Full Name */}
              <div className="flex flex-col gap-3">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#5a4d46]">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-[#3a2d27]/20 pb-3 text-[#3a2d27] font-serif text-base focus:outline-none focus:border-[#3a2d27] transition-colors placeholder:text-[#3a2d27]/40 placeholder:italic"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#5a4d46]">Email</label>
                <input
                  required
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full bg-transparent border-b border-[#3a2d27]/20 pb-3 text-[#3a2d27] font-serif text-base focus:outline-none focus:border-[#3a2d27] transition-colors placeholder:text-[#3a2d27]/40 placeholder:italic"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Attendance */}
              <div className="flex flex-col gap-4">
                <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#5a4d46]">Will you be attending?</label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-4 h-4 rounded-full border border-[#3a2d27]/40 flex items-center justify-center group-hover:border-[#3a2d27] transition-colors">
                      {formData.attendance === 'yes' && <div className="w-2 h-2 rounded-full bg-[#3a2d27]" />}
                    </div>
                    <span className="text-[#3a2d27] font-serif text-base">Joyfully Accept</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-4 h-4 rounded-full border border-[#3a2d27]/40 flex items-center justify-center group-hover:border-[#3a2d27] transition-colors">
                      {formData.attendance === 'no' && <div className="w-2 h-2 rounded-full bg-[#3a2d27]" />}
                    </div>
                    <span className="text-[#3a2d27] font-serif text-base">Regretfully Decline</span>
                  </label>
                </div>
              </div>

              {/* Guests */}
              {formData.attendance === 'yes' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#5a4d46]">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    className="w-16 bg-transparent border-b border-[#3a2d27]/20 pb-3 text-[#3a2d27] font-serif text-base focus:outline-none focus:border-[#3a2d27] transition-colors"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  />
                </div>
              )}

              {/* Dietary */}
              {formData.attendance === 'yes' && (
                <div className="flex flex-col gap-3">
                  <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium text-[#5a4d46]">Dietary Restrictions</label>
                  <input
                    type="text"
                    placeholder="Let us know if you have any dietary requirements..."
                    className="w-full bg-transparent border-b border-[#3a2d27]/20 pb-3 text-[#3a2d27] font-serif text-base focus:outline-none focus:border-[#3a2d27] transition-colors placeholder:text-[#3a2d27]/40 placeholder:italic"
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-8 flex justify-center">
                <button
                  disabled={status === 'loading'}
                  type="submit"
                  className="px-12 py-4 bg-transparent border border-[#3a2d27]/30 rounded-full text-[#3a2d27] font-sans tracking-[0.3em] text-[10px] uppercase hover:bg-[#3a2d27] hover:text-[#FAF9F6] transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Send RSVP'
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
