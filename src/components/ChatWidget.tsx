"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide chat on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when messages change or chat opens
    if (messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chat", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch messages");
      }
      const data = await res.json();
      setMessages(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Unable to load messages. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !name.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ name, email, message: newMessage }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      setHasSentFirstMessage(true);
      setNewMessage("");
      await fetchMessages();
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-80 sm:max-w-[calc(100vw-2rem)] z-50 bg-white rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200"
          style={{ height: isMobile ? "100%" : "450px" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] text-white p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
            <div>
              <h3 className="font-bold text-sm sm:text-base">Live Chat</h3>
              <p className="text-xs text-white/80">Chat with our team</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-3 text-sm">
                {error}
              </div>
            )}
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[var(--color-highlight)]/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-[var(--color-highlight)]" />
                </div>
                <p className="text-gray-700 font-semibold mb-2">Start a Conversation</p>
                <p className="text-gray-600 text-sm">Send us a message and we&apos;ll respond shortly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {/* User Message */}
                    <div className="flex justify-end mb-2">
                      <div className="bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-2xl rounded-br-sm px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[80%] shadow-md">
                        <p className="text-xs sm:text-sm">{msg.message}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-white/70">
                          <span>{msg.name}</span>
                          <span>•</span>
                          <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    {/* Admin Reply */}
                    {msg.reply && (
                      <div className="flex justify-start mb-1">
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3 sm:px-4 py-2 max-w-[85%] sm:max-w-[80%] shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                              </svg>
                            </div>
                            <span className="text-xs font-semibold text-gray-600">Support</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-700">{msg.reply}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-white border-t flex-shrink-0">
            {!hasSentFirstMessage && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name *"
                  required
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent outline-none text-sm"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email (optional)"
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent outline-none text-sm"
                />
              </>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent outline-none text-sm"
              />
              <button
                type="submit"
                disabled={loading || !newMessage.trim() || (!hasSentFirstMessage && !name.trim())}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all active:scale-95"
                aria-label="Send message"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
