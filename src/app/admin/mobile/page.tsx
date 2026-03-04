"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MessageCircle, Star, Users, Briefcase, Globe, LogOut, Menu, X, Send, Trash2
} from "lucide-react";

export default function MobileAdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [replyForm, setReplyForm] = useState<{ id: string; reply: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchChatMessages();
      const interval = setInterval(fetchChatMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const fetchChatMessages = async () => {
    try {
      const res = await fetch("/api/chat");
      const data = await res.json();
      setChatMessages(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyForm) return;

    await fetch("/api/chat", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyForm),
    });

    setReplyForm(null);
    fetchChatMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/chat?id=${id}`, { method: "DELETE" });
    fetchChatMessages();
  };

  if (status === "loading" || !session) return null;

  const navItems = [
    { id: "chat", label: "Live Chat", icon: MessageCircle, count: chatMessages.filter((m: any) => !m.reply).length },
    { id: "testimonials", label: "Reviews", icon: Star },
    { id: "services", label: "Services", icon: Users },
    { id: "projects", label: "Projects", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Veesioo" className="h-10 w-auto" />
            <h1 className="text-lg font-bold">Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="p-2">
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition ${
                activeTab === item.id
                  ? "bg-white text-[var(--color-primary)]"
                  : "bg-white/20 text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-semibold">{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "chat" && (
          <div className="space-y-4 pb-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Live Chat</h2>
              <button onClick={fetchChatMessages} className="text-sm text-[var(--color-highlight)] font-semibold">
                Refresh
              </button>
            </div>

            {chatMessages.length === 0 ? (
              <div className="text-center py-16">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No messages yet</p>
              </div>
            ) : (
              chatMessages.map((chat: any) => (
                <div key={chat.id} className="bg-white rounded-xl shadow p-4">
                  <div className="flex justify-end mb-3">
                    <div className="bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%]">
                      <p className="text-sm">{chat.message}</p>
                      <p className="text-xs text-white/70 mt-1">{chat.name}</p>
                    </div>
                  </div>

                  {chat.reply ? (
                    <div className="flex justify-start">
                      <div className="bg-green-50 border border-green-200 rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%]">
                        <p className="text-xs font-semibold text-green-800 mb-1">Support Team</p>
                        <p className="text-sm text-gray-700">{chat.reply}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 mt-3 pt-3 border-t">
                      <button
                        onClick={() => setReplyForm({ id: chat.id, reply: "" })}
                        className="flex-1 bg-[var(--color-highlight)] text-white py-2 rounded-lg text-sm font-semibold"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => handleDelete(chat.id)}
                        className="px-3 text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}

                  {replyForm && replyForm?.id === chat.id && (
                    <form onSubmit={handleReplySubmit} className="mt-3 space-y-2">
                      <textarea
                        value={replyForm?.reply || ''}
                        onChange={(e) => setReplyForm({ ...replyForm, reply: e.target.value })}
                        placeholder="Type reply..."
                        rows={2}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-[var(--color-highlight)] text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                          <Send className="h-4 w-4" /> Send
                        </button>
                        <button type="button" onClick={() => setReplyForm(null)} className="px-4 bg-gray-300 text-gray-700 rounded-lg text-sm font-semibold">
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="text-center py-16">
            <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Testimonials management</p>
          </div>
        )}

        {activeTab === "services" && (
          <div className="text-center py-16">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Services management</p>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="text-center py-16">
            <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Projects management</p>
          </div>
        )}
      </div>
    </div>
  );
}
