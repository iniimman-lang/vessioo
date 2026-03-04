# Veesioo Admin Mobile App

## 📱 Mobile Apps for Admin Dashboard

### Option 1: Progressive Web App (PWA) - RECOMMENDED

The admin dashboard is already mobile-responsive! Access it from your phone:

1. **Open**: http://localhost:3001/admin/login (or your production URL)
2. **Login**: admin@veesioo.com / admin123
3. **Add to Home Screen**:
   - **iPhone (Safari)**: Tap Share → "Add to Home Screen"
   - **Android (Chrome)**: Tap Menu → "Add to Home Screen"

**Features:**
- ✅ Works on Android & iOS
- ✅ No app store needed
- ✅ Real-time chat notifications
- ✅ Manage testimonials, services, team, projects
- ✅ Respond to customer messages

---

### Option 2: Create Native Apps with Expo

#### Prerequisites
```bash
npm install -g expo-cli
```

#### Setup
```bash
cd mobile-app
npm install
npx expo start
```

#### Build for Android
```bash
npx expo build:android
```

#### Build for iOS
```bash
npx expo build:ios
```

---

### Option 3: Use Capacitor to Wrap Web App

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
npx cap sync
```

---

## 🔥 Current Mobile Features

The admin dashboard is fully mobile-responsive:

- **Live Chat** - Real-time customer support
- **Testimonials** - Add/delete reviews
- **Services** - Manage service offerings
- **Team** - Update team members
- **Projects** - Add portfolio items
- **Contact Messages** - View inquiries

All accessible from any mobile browser!

---

## 📲 Quick Access QR Code

Generate a QR code for easy mobile access:
```bash
npm install -g qrcode-terminal
qrcode-terminal "http://localhost:3001/admin/login"
```

Scan with your phone to access the admin dashboard instantly!
