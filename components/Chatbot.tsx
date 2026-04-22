"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, ChevronDown, Flag } from "lucide-react";
import gsap from "gsap";

interface Message {
  role: "user" | "bot";
  text: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Copy that! This is SN-Pits. I've got your telemetry ready. Any questions about Safwan's career track?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(chatRef.current, {
        scale: 0.8,
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => setIsOpen(false),
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text })),
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "bot", text: data.text }]);
      } else if (data.error && data.error.includes("quota")) {
        setMessages((prev) => [...prev, { role: "bot", text: "We're in a mandatory pit stop! Quota's reached. We'll be back on track in a few seconds." }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: "Signal lost! Can't reach the pit wall right now." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", text: "System failure! Telemetry is offline." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 ${
          isOpen ? "bg-black text-white" : "bg-red-600 text-white"
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-red-600 text-white p-4 border-b-2 border-black flex items-center justify-between relative overflow-hidden">
             {/* Checkered pattern accent */}
            <div className="absolute top-0 right-0 w-20 h-full opacity-20 pointer-events-none" 
                 style={{ 
                   backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
                   backgroundSize: '10px 10px',
                   backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                 }} 
            />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <Flag size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-black italic text-lg tracking-tighter">SN-PITS</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Race Engineer Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f8f8]"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 text-sm font-medium shadow-sm transition-all ${
                    msg.role === "user"
                      ? "bg-black text-white rounded-l-2xl rounded-tr-2xl"
                      : "bg-white text-black border-2 border-slate-200 rounded-r-2xl rounded-tl-2xl"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-slate-200 p-3 rounded-r-2xl rounded-tl-2xl flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t-2 border-black">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about my career track..."
                className="flex-1 bg-slate-100 border-2 border-transparent focus:border-red-600 outline-none px-4 py-2 text-sm font-bold transition-all"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-black text-white p-2 hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-[9px] text-center mt-2 text-slate-400 font-bold uppercase tracking-widest">
              Powered by Gemini AI • Race Telemetry v1.1
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
