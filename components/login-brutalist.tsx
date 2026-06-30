"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiEnvelopeSimpleFill, PiLockKeyFill, PiSignInBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
export interface LoginBrutalistProps {
  title?: string;
  subtitle?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  forgotPasswordText?: string;
  orContinueText?: string;
  submitText?: string;
  successText?: string;
  signUpText?: string;
  signUpActionText?: string;
  socialButtons?: React.ReactNode;
  onSubmit?: (email: string, password: string) => Promise<void> | void;
  className?: string;
}
export const LoginBrutalist = ({
  title = "Sign In",
  subtitle = "Enter your credentials to continue.",
  emailLabel = "Email",
  emailPlaceholder = "neo@factory.com",
  passwordLabel = "Password",
  passwordPlaceholder = "••••••••",
  forgotPasswordText = "Forgot password?",
  orContinueText = "or continue with",
  submitText = "Sign In",
  successText = "Access Granted",
  signUpText = "Don't have an account?",
  signUpActionText = "Sign Up",
  socialButtons = (
    <>
      <motion.button
        type="button"
        whileHover={{ y: -2, boxShadow: "6px 6px 0px #ccff00" }}
        whileTap={{ y: 2, boxShadow: "1px 1px 0px #ccff00" }}
        className="modern:opacity-100 py-3 bg-black border-4 border-black text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-[4px_4px_0px_#ccff00] transition-shadow-xs flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        GitHub
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ y: -2, boxShadow: "6px 6px 0px #000" }}
        whileTap={{ y: 2, boxShadow: "1px 1px 0px #000" }}
        className="py-3 bg-white border-4 border-black text-black font-black uppercase tracking-widest text-[10px] rounded-xl shadow-[4px_4px_0px_#000] transition-shadow-xs flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google
      </motion.button>
    </>
  ),
  onSubmit,
  className
}: LoginBrutalistProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    }, 1200);
  };
  return (
    <motion.div
      animate={shake ? { x: [0, -14, 14, -10, 10, -4, 4, 0] } : {}}
      transition={{ duration: 0.5 }}
      className={cn("w-full max-w-md relative", className)}
    >
      <div className="bg-black border-4 border-black rounded-2xl shadow-[8px_8px_0px_#000] overflow-hidden">
        <div className="relative bg-black px-8 pt-8 pb-7 overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-36 h-full opacity-[0.07] pointer-events-none"
            style={{
              background: "repeating-linear-gradient(45deg, transparent, transparent 10px, #ccff00 10px, #ccff00 20px)"
            }}
          />
          <h2 className="text-4xl font-black font-heading uppercase tracking-widest text-white relative z-10">
            {title}
          </h2>
          <p className="text-white/40 font-bold mt-2 uppercase tracking-wide text-xs relative z-10">
            {subtitle}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-black uppercase tracking-widest text-[11px] text-black flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: focusedField === "email" ? -12 : 0,
                  scale: focusedField === "email" ? 1.2 : 1
                }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <PiEnvelopeSimpleFill size={16} />
              </motion.div>
              {emailLabel}
            </label>
            <motion.div
              animate={{
                y: focusedField === "email" ? -3 : 0,
                boxShadow: focusedField === "email" ? "6px 6px 0px #000" : "3px 3px 0px #000",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full px-4 py-3.5 border-4 border-black rounded-xl font-bold text-black placeholder:text-black/25 outline-hidden transition-colors",
                  focusedField === "email" ? "bg-[#ccff00]/10" : "bg-[#f4f0ea]"
                )}
                placeholder={emailPlaceholder}
              />
            </motion.div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-black uppercase tracking-widest text-[11px] text-black flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: focusedField === "password" ? -12 : 0,
                  scale: focusedField === "password" ? 1.2 : 1
                }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <PiLockKeyFill size={16} />
              </motion.div>
              {passwordLabel}
            </label>
            <motion.div
              animate={{
                y: focusedField === "password" ? -3 : 0,
                boxShadow: focusedField === "password" ? "6px 6px 0px #000" : "3px 3px 0px #000",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={cn(
                  "w-full px-4 py-3.5 border-4 border-black rounded-xl font-bold text-black placeholder:text-black/25 outline-hidden transition-colors",
                  focusedField === "password" ? "bg-[#ccff00]/10" : "bg-[#f4f0ea]"
                )}
                placeholder={passwordPlaceholder}
              />
            </motion.div>
            <div className="flex justify-end mt-0.5">
              <a href="#" className="text-[10px] font-black uppercase tracking-wider text-black/40 hover:text-[#ff6b6b] hover:underline underline-offset-4 decoration-2 transition-colors">
                {forgotPasswordText}
              </a>
            </div>
          </div>
          {socialButtons && (
            <>
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-[3px] bg-black rounded-full" />
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black/30 shrink-0">{orContinueText}</span>
                <div className="flex-1 h-[3px] bg-black rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {socialButtons}
              </div>
            </>
          )}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="mt-2 w-full py-4 bg-[#ccff00] border-4 border-black font-black uppercase tracking-widest text-black text-lg flex items-center justify-center gap-3 shadow-[6px_6px_0px_#000] rounded-xl select-none"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  ✓
                </motion.span>
                {successText}
              </motion.div>
            ) : (
              <motion.button
                key="submit"
                whileHover={{ y: -4, boxShadow: "10px 10px 0px #000" }}
                whileTap={{ y: 4, boxShadow: "2px 2px 0px #000" }}
                disabled={isSubmitting}
                className={cn(
                  "mt-2 w-full py-4 border-4 border-black font-black uppercase tracking-widest text-lg flex items-center justify-center gap-3 shadow-[6px_6px_0px_#000] rounded-xl relative overflow-hidden transition-colors",
                  isSubmitting 
                    ? "bg-black text-[#ccff00] cursor-wait" 
                    : "bg-[#ccff00] text-black hover:bg-[#b3ff00]"
                )}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                    className="w-6 h-6 border-[3px] border-[#ccff00]/30 border-t-[#ccff00] rounded-full"
                  />
                ) : (
                  <>
                    <PiSignInBold size={22} />
                    {submitText}
                  </>
                )}
              </motion.button>
            )}
          </AnimatePresence>
          <div className="text-center mt-1 flex items-center justify-center gap-2">
            <div className="h-0.5 w-5 bg-black rounded-full" />
            <span className="text-black/50 font-bold text-[11px] uppercase tracking-wide">{signUpText}</span>
            <a href="#" className="text-black font-black uppercase tracking-wider text-[11px] hover:text-[#ff6b6b] hover:underline underline-offset-4 decoration-2 transition-colors">
              {signUpActionText}
            </a>
            <div className="h-0.5 w-5 bg-black rounded-full" />
          </div>
        </form>
      </div>
    </motion.div>
  );
};