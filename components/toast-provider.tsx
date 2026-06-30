"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LiquidNotification } from "@/components/ui/liquid-notification";
import { useTheme } from "next-themes";
export type ToastType = "success" | "error" | "info";
interface Toast {
  id: string;
  message: string;
  type: ToastType;
}
interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}
const ToastContext = createContext<ToastContextType | undefined>(undefined);
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
}
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);
  const removeToast = (id: string | number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== String(id)));
  };
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isModern = mounted && currentTheme === "modern";
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 pointer-events-none" style={{ zIndex: 9999 }}>
        {!isModern ? (
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="pointer-events-auto"
                >
                  <div
                    className={`
                      flex items-center gap-3 px-5 py-4 min-w-[300px] max-w-[400px]
                      border-4 border-black rounded-xl shadow-[6px_6px_0px_#000]
                      ${toast.type === 'success' ? 'bg-[#ccff00] text-black' : 
                        toast.type === 'error' ? 'bg-[#ff6b6b] text-white' : 
                        'bg-white text-black'}
                    `}
                  >
                    <div className="shrink-0">
                      {toast.type === 'success' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      )}
                      {toast.type === 'error' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      )}
                      {toast.type === 'info' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                      )}
                    </div>
                    <p className="font-heading font-black tracking-wider uppercase text-sm flex-1 leading-tight">
                      {toast.message}
                    </p>
                    <button
                      onClick={() => removeToast(toast.id)}
                      className="shrink-0 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="w-full max-w-[400px]">
            <LiquidNotification 
              notifications={toasts.map(t => ({
                id: t.id,
                type: t.type,
                message: t.message
              }))}
              onClose={removeToast}
            />
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}