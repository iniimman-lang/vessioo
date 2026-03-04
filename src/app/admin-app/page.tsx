import Link from "next/link";
import { Download, Smartphone, Tablet, Laptop, CheckCircle } from "lucide-react";

export default function AppDownloadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <img src="/logo.png" alt="Veesioo" className="h-24 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Veesioo Admin App
          </h1>
          <p className="text-xl text-white/90">
            Manage your business on the go
          </p>
        </div>

        {/* Download Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* PWA Option */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mobile Web App</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Install directly from your browser. No app store needed!
            </p>
            <ul className="text-left text-sm space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Works on all phones</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Instant updates</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> No download size</li>
            </ul>
            <Link
              href="/admin/mobile"
              className="block w-full bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Open App
            </Link>
            <p className="text-xs text-gray-500 mt-2">
              Then "Add to Home Screen"
            </p>
          </div>

          {/* Android Option */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Android APK</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Download and install directly on Android devices
            </p>
            <ul className="text-left text-sm space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Native experience</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Works offline</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Push notifications</li>
            </ul>
            <a
              href="/admin-app.apk"
              className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Download APK
            </a>
            <p className="text-xs text-gray-500 mt-2">
              Coming Soon
            </p>
          </div>

          {/* Desktop Option */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Laptop className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Desktop Admin</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Full admin dashboard for desktop/laptop
            </p>
            <ul className="text-left text-sm space-y-2 mb-6">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Full features</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Large screen</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Keyboard shortcuts</li>
            </ul>
            <Link
              href="/admin/dashboard"
              className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Open Dashboard
            </Link>
            <p className="text-xs text-gray-500 mt-2">
              For computer/laptop
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            App Features
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "💬", text: "Live Chat" },
              { icon: "⭐", text: "Reviews" },
              { icon: "📱", text: "Services" },
              { icon: "🌍", text: "Projects" },
              { icon: "🔔", text: "Notifications" },
              { icon: "📊", text: "Analytics" },
              { icon: "👥", text: "Team Mgmt" },
              { icon: "🔒", text: "Secure Login" },
            ].map((feature, i) => (
              <div key={i} className="text-center text-white">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="text-sm font-semibold">{feature.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Guide */}
        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            How to Install
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mr-2">1</span>
                Android
              </h3>
              <ol className="space-y-2 text-gray-700 text-sm ml-8">
                <li>1. Open app link in Chrome</li>
                <li>2. Tap menu (⋮) → "Install app"</li>
                <li>3. Or "Add to Home screen"</li>
                <li>4. App appears on home screen</li>
              </ol>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-2">2</span>
                iPhone
              </h3>
              <ol className="space-y-2 text-gray-700 text-sm ml-8">
                <li>1. Open app link in Safari</li>
                <li>2. Tap Share button</li>
                <li>3. "Add to Home Screen"</li>
                <li>4. App appears on home screen</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/80 text-sm">
          <p>© 2026 Veesioo. All rights reserved.</p>
          <p className="mt-2">
            Questions? <a href="/contact" className="underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
