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
} from "lucide-react";

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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"testimonial" | "service" | "team">("testimonial");
  const [formData, setFormData] = useState<any>({});

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
    }
  }, [session]);

  const fetchTestimonials = async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
  };

  const fetchMessages = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data);
  };

  const fetchServices = async () => {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data);
  };

  const fetchTeamMembers = async () => {
    const res = await fetch("/api/team");
    const data = await res.json();
    setTeamMembers(data);
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
    if (type === "testimonials") fetchTestimonials();
    if (type === "contact") fetchMessages();
    if (type === "services") fetchServices();
    if (type === "team") fetchTeamMembers();
  };

  const handleAddNew = (type: "testimonial" | "service" | "team") => {
    setModalType(type);
    setShowModal(true);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = modalType === "testimonial" ? "testimonials" : modalType === "service" ? "services" : "team";
    
    await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setShowModal(false);
    if (modalType === "testimonial") fetchTestimonials();
    if (modalType === "service") fetchServices();
    if (modalType === "team") fetchTeamMembers();
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
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "services", label: "Services", icon: Users },
    { id: "team", label: "Team", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700">
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6">
            <img src="/logo.png" alt="Veesioo" className="h-[6rem] w-auto max-w-[100%] mb-6" />
            <p className="text-sm text-gray-600 mb-6">Welcome, {session.user?.name || session.user?.email}</p>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
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
        <main className="flex-1 p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6 capitalize">{activeTab}</h1>

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <Star className="h-8 w-8 text-yellow-500 mb-4" />
                  <p className="text-3xl font-bold">{testimonials.length}</p>
                  <p className="text-gray-600">Testimonials</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <MessageSquare className="h-8 w-8 text-blue-500 mb-4" />
                  <p className="text-3xl font-bold">{messages.length}</p>
                  <p className="text-gray-600">Messages</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <Users className="h-8 w-8 text-green-500 mb-4" />
                  <p className="text-3xl font-bold">{services.length}</p>
                  <p className="text-gray-600">Services</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <Briefcase className="h-8 w-8 text-purple-500 mb-4" />
                  <p className="text-3xl font-bold">{teamMembers.length}</p>
                  <p className="text-gray-600">Team Members</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
                {messages.length === 0 ? (
                  <p className="text-gray-600">No messages yet.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.slice(0, 5).map((msg) => (
                      <div key={msg.id} className="border-b pb-4 last:border-0">
                        <p className="font-semibold">{msg.name}</p>
                        <p className="text-gray-600 text-sm">{msg.email}</p>
                        <p className="text-gray-700 mt-2">{msg.message}</p>
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
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              Add {modalType === "testimonial" ? "Testimonial" : modalType === "service" ? "Service" : "Team Member"}
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
