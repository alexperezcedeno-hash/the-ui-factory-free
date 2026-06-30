"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  type?: NotificationType;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const NotificationCard = ({ type = "info", message, onClose, className }: NotificationProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-4 min-w-[300px] max-w-[400px]",
        "border-4 border-black rounded-xl shadow-[6px_6px_0px_#000]",
        type === "success" && "bg-[#ccff00] text-black",
        type === "error" && "bg-[#ff6b6b] text-white",
        type === "info" && "bg-white text-black",
        className
      )}
    >
      <div className="modern:opacity-100 shrink-0">
        {type === "success" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        )}
        {type === "error" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        )}
        {type === "info" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        )}
      </div>
      <p className="font-heading font-black tracking-wider uppercase text-sm flex-1 leading-tight">
        {message}
      </p>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export interface NotificationItem {
  id: number | string;
  type: NotificationType;
  message: string;
}

export interface NotificationBrutalistProps {
  initialNotifications?: NotificationItem[];
  buttonText?: string;
  emptyText?: string;
  className?: string;
}

export const NotificationBrutalist = ({
  initialNotifications = [
    { id: 1, type: "success", message: "Changes saved successfully!" },
    { id: 2, type: "error", message: "Failed to update profile." },
    { id: 3, type: "info", message: "New update available." }
  ],
  buttonText = "Push Notification",
  emptyText = "No active notifications",
  className,
}: NotificationBrutalistProps) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const removeNotification = (id: number | string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addRandomNotification = () => {
    const types: NotificationType[] = ["success", "error", "info"];
    const messages = [
      "Task completed successfully!",
      "Connection to server lost.",
      "Please verify your email address.",
      "Data synchronized across devices.",
      "Invalid credentials provided."
    ];

    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const newId = Date.now();

    setNotifications((prev) => [...prev, { id: newId, type: randomType, message: randomMessage }]);
  };

  return (
    <div className={cn("flex flex-col md:flex-row gap-12 items-start justify-center w-full max-w-4xl p-8", className)}>
      <div className="flex flex-col gap-4">
        <button 
          onClick={addRandomNotification}
          className="px-6 py-4 bg-black text-[#ccff00] font-heading font-black uppercase tracking-widest text-sm border-4 border-black rounded-xl shadow-[4px_4px_0px_#ccff00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#ccff00] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
        >
          {buttonText}
        </button>
      </div>

      <div className="flex flex-col gap-4 min-h-[300px]">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout
            >
              <NotificationCard 
                type={n.type} 
                message={n.message} 
                onClose={() => removeNotification(n.id)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <div className="text-black/30 font-heading font-black uppercase tracking-widest text-sm flex items-center justify-center h-full min-h-[200px]">
            {emptyText}
          </div>
        )}
      </div>
    </div>
  );
};
