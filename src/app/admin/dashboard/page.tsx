"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Users,
  MessageSquare,
  Star,
  Briefcase,
  LogOut,
  Menu,
  X,
  Trash2,
  Plus,
  Globe,
  MessageCircle,
} from "lucide-react";
import { fetchJSON } from "@/lib/api";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  location: string | null;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  budget: string | null;
  message: string;
  createdAt: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  websiteUrl: string | null;
  category: string | null;
}

interface ChatMessage {
  id: string;
  name: string;
  email: string | null;
  message: string;
  reply: string | null;
  isRead: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"testimonial" | "service" | "team" | "project">("testimonial");
  const [formData, setFormData] = useState<any>({});
  const [replyForm, setReplyForm] = useState<{ id: string; reply: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchTestimonials();
      fetchMessages();
      fetchServices();
      fetchTeamMembers();
      fetchProjects();
      fetchChatMessages();
      
      // Poll for new chat messages every 5 seconds
      const interval = setInterval(fetchChatMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const fetchTestimonials = async () => {
    try {
      const data = await fetchJSON<any[]>("/api/testimonials");
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await fetchJSON<any[]>("/api/contact");
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchServices = async () => {
    try {
      const data = await fetchJSON<any[]>("/api/services");
      setServices(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const data = await fetchJSON<any[]>("/api/team");
      setTeamMembers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await fetchJSON<any[]>("/api/projects");
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const res = await fetch("/api/chat");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setChatMessages(data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  // Count answered vs unanswered
  const answeredCount = chatMessages.filter((m: any) => m.reply).length;
  const pendingCount = chatMessages.filter((m: any) => !m.reply).length;

  // Group messages by IP address
  const groupedMessages = chatMessages.reduce((acc: any, msg: any) => {
    const key = msg.ipAddress || msg.name.toLowerCase().trim();
    if (!acc[key]) {
      acc[key] = {
        name: msg.name,
        email: msg.email,
        ipAddress: msg.ipAddress,
        messages: [],
        lastMessageAt: msg.createdAt,
      };
    }
    acc[key].messages.push(msg);
    if (new Date(msg.createdAt) > new Date(acc[key].lastMessageAt)) {
      acc[key].lastMessageAt = msg.createdAt;
    }
    return acc;
  }, {});

  // Convert to array and sort by latest message
  const conversations = Object.values(groupedMessages).sort(
    (a: any, b: any) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  );

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

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
    if (type === "testimonials") fetchTestimonials();
    if (type === "contact") fetchMessages();
    if (type === "services") fetchServices();
    if (type === "team") fetchTeamMembers();
    if (type === "projects") fetchProjects();
  };

  const handleAddNew = (type: "testimonial" | "service" | "team" | "project") => {
    setModalType(type);
    setShowModal(true);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = modalType === "testimonial" ? "testimonials" : modalType === "service" ? "services" : modalType === "project" ? "projects" : "team";
    
    await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setShowModal(false);
    if (modalType === "testimonial") fetchTestimonials();
    if (modalType === "service") fetchServices();
    if (modalType === "team") fetchTeamMembers();
    if (modalType === "project") fetchProjects();
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { id: "overview", label: "Overview", icon: Briefcase },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "messages", label: "Contact Messages", icon: MessageSquare },
    { id: "services", label: "Services", icon: Users },
    { id: "team", label: "Team", icon: Users },
    { id: "projects", label: "Projects", icon: Globe },
    { id: "chat", label: "Live Chat", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700">
          {sidebarOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 sm:p-6">
            <img src="/logo.png" alt="Veesioo" className="h-[4rem] sm:h-[6rem] w-auto max-w-[100%] mb-4 sm:mb-6" />
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">Welcome, {session.user?.name || session.user?.email}</p>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base ${
                    activeTab === item.id
                      ? "bg-[var(--color-highlight)] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="border-t border-gray-200 my-4"></div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 capitalize">{activeTab}</h1>

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mb-3 sm:mb-4" />
                  <p className="text-2xl sm:text-3xl font-bold">{testimonials.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Testimonials</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                  <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 mb-3 sm:mb-4" />
                  <p className="text-2xl sm:text-3xl font-bold">{messages.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Contact Msgs</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 mb-3 sm:mb-4" />
                  <p className="text-2xl sm:text-3xl font-bold">{services.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Services</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                  <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mb-3 sm:mb-4" />
                  <p className="text-2xl sm:text-3xl font-bold">{teamMembers.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Team</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                  <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 mb-3 sm:mb-4" />
                  <p className="text-2xl sm:text-3xl font-bold">{projects.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Projects</p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                  <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 mb-3 sm:mb-4" />
                  <p className="text-2xl sm:text-3xl font-bold">{pendingCount}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Pending Chat</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <h2 className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Recent Messages</h2>
                {messages.length === 0 ? (
                  <p className="text-sm text-gray-600">No messages yet.</p>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {messages.slice(0, 5).map((msg) => (
                      <div key={msg.id} className="border-b pb-3 sm:pb-4 last:border-0">
                        <p className="font-semibold text-sm sm:text-base">{msg.name}</p>
                        <p className="text-gray-600 text-xs sm:text-sm">{msg.email}</p>
                        <p className="text-gray-700 mt-2 text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Testimonials */}
          {activeTab === "testimonials" && (
            <div>
              <button
                onClick={() => handleAddNew("testimonial")}
                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
              >
                <Plus className="h-5 w-5 mr-2" /> Add Testimonial
              </button>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {testimonials.map((t) => (
                      <tr key={t.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{t.name}</td>
                        <td className="px-6 py-4">{t.content.substring(0, 50)}...</td>
                        <td className="px-6 py-4 whitespace-nowrap">{"⭐".repeat(t.rating)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{t.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleDelete("testimonials", t.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Messages */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {messages.map((msg) => (
                    <tr key={msg.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{msg.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{msg.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{msg.projectType}</td>
                      <td className="px-6 py-4">{msg.message.substring(0, 50)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete("contact", msg.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Services */}
          {activeTab === "services" && (
            <div>
              <button
                onClick={() => handleAddNew("service")}
                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
              >
                <Plus className="h-5 w-5 mr-2" /> Add Service
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <button
                      onClick={() => handleDelete("services", service.id)}
                      className="text-red-600 hover:text-red-800 flex items-center"
                    >
                      <Trash2 className="h-5 w-5 mr-2" /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team */}
          {activeTab === "team" && (
            <div>
              <button
                onClick={() => handleAddNew("team")}
                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
              >
                <Plus className="h-5 w-5 mr-2" /> Add Team Member
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <button
                      onClick={() => handleDelete("team", member.id)}
                      className="text-red-600 hover:text-red-800 flex items-center"
                    >
                      <Trash2 className="h-5 w-5 mr-2" /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {activeTab === "projects" && (
            <div>
              <button
                onClick={() => handleAddNew("project")}
                className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition"
              >
                <Plus className="h-5 w-5 mr-2" /> Add Project
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <img src={project.imageUrl || "https://via.placeholder.com/400x200"} alt={project.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                      <p className="text-xs text-[var(--color-highlight)] font-semibold mb-2">{project.category}</p>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      {project.websiteUrl && (
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline block mb-3">
                          {project.websiteUrl}
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete("projects", project.id)}
                        className="text-red-600 hover:text-red-800 flex items-center text-sm"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Chat */}
          {activeTab === "chat" && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Live Chat Messages</h2>
                  <div className="flex gap-4 mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      ✓ {answeredCount} Answered
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      ⏳ {pendingCount} Pending
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                      📊 {chatMessages.length} Total
                    </span>
                  </div>
                </div>
                <button
                  onClick={fetchChatMessages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Refresh
                </button>
              </div>
              
              {chatMessages.length === 0 ? (
                <div className="text-center py-16">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No chat messages yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((chat: any) => (
                    <div key={chat.id} className="bg-white rounded-lg shadow p-6">
                      {/* User Message */}
                      <div className="flex justify-end mb-3">
                        <div className="bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[70%]">
                          <p className="text-sm">{chat.message}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-white/80">
                            <span>{chat.name}</span>
                            {chat.email && <span>• {chat.email}</span>}
                            <span>• {new Date(chat.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Admin Reply */}
                      {chat.reply ? (
                        <div className="flex justify-start">
                          <div className="bg-green-50 border border-green-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[70%]">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                                </svg>
                              </div>
                              <span className="text-sm font-semibold text-green-800">Support Team</span>
                            </div>
                            <p className="text-gray-700">{chat.reply}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                          <button
                            onClick={() => setReplyForm({ id: chat.id, reply: "" })}
                            className="px-4 py-2 bg-[var(--color-highlight)] text-white rounded-lg hover:bg-[var(--color-accent)] transition"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => {
                              handleDelete("chat", chat.id);
                            }}
                            className="text-red-600 hover:text-red-800 flex items-center text-sm"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </button>
                        </div>
                      )}
                      
                      {/* Reply Form */}
                      {replyForm && replyForm?.id === chat.id && (
                        <form onSubmit={handleReplySubmit} className="mt-4 space-y-3">
                          <textarea
                            value={replyForm?.reply || ''}
                            onChange={(e) => setReplyForm({ ...replyForm, reply: e.target.value })}
                            placeholder="Type your reply..."
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent outline-none"
                            required
                          />
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-[var(--color-highlight)] text-white rounded-lg hover:bg-[var(--color-accent)] transition"
                            >
                              Send Reply
                            </button>
                            <button
                              type="button"
                              onClick={() => setReplyForm(null)}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              Add {modalType === "testimonial" ? "Testimonial" : modalType === "service" ? "Service" : modalType === "project" ? "Project" : "Team Member"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {modalType === "testimonial" && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Content"
                    value={formData.content || ""}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={formData.rating || 5}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg"
                    min="1"
                    max="5"
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </>
              )}
              {modalType === "service" && (
                <>
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Icon (globe, smartphone, palette, shopping-cart, cpu)"
                    value={formData.icon || ""}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </>
              )}
              {modalType === "team" && (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Bio"
                    value={formData.bio || ""}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                  />
                </>
              )}
              {modalType === "project" && (
                <>
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={3}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g., E-Commerce)"
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={formData.imageUrl || ""}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="Website URL"
                    value={formData.websiteUrl || ""}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </>
              )}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
