# FamPay Transact Feed 📱

> A high-fidelity, interactive mobile-first payment feed experience built with Next.js, mimic-ing a premium fintech app environment.

![Project Status](https://img.shields.io/badge/Status-Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_15_•_Tailwind_•_TypeScript-blue)

## 🌟 Overview

This project simulates a modern banking/payment feed interface (specifically inspired by FamPay's aesthetic). It runs entirely in the browser but feels like a native mobile app, complete with a simulated phone frame when viewed on desktop, realistic status bars, and glassmorphism UI effects.

The goal was to create a **"wow"** factor user experience with smooth animations, GenZ-focused copywriting, and pixel-perfect responsiveness.

## ✨ Key Features

### 📱 Realistic Mobile Simulation
- **Phone Frame**: On desktop, the app lives inside a realistic phone container with proper borders, rounded corners, and shadows.
- **Phone Overlay**: Includes a simulated status bar (Time, Wifi, Battery) and a functional Home Indicator.
- **Responsive Layout**: Automatically adapts to full-screen on actual mobile devices (100dvh) without address bar scrolling issues.

### 💸 Interactive Transaction Feed
- **Infinite Scroll**: Seamlessly loads transactions as you scroll (simulated).
- **Smart Filtering**: Visual distinction between Credits (Green) and Debits (White).
- **Navigation**: Click any transaction to view detailed insights.

### 🤖 AI-Powered Insights
- **GenZ Mode**: Transaction details come with a generated "story" using current slang (e.g., "lowkey iconic", "vibes", "real ones").
- **Smart Context**: Recognizes merchant categories (Food, Travel, Shopping) and tailors the message accordingly.

### 🔔 Notification System
- **Interactive**: Bell icon toggles a glassmorphic notification overlay.
- **Real-time feel**: Animations for entry/exit of notification panels.

### 🎨 Premium UI/UX
- **Glassmorphism**: Heavy use of backdrop blur and translucent layers.
- **Dark Mode**: Deep black/zinc color palette for that premium fintech look.
- **Micro-interactions**: Hover states, active scaling, and smooth page transitions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript
- **State**: React Hooks (useState, useEffect, useParms)

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx               # Main Feed (Phone Home Screen)
│   ├── layout.tsx             # Global Layout wrappers
│   ├── globals.css            # Tailwind & Global Styles
│   └── transaction/[id]/      # Dynamic Transaction Details Page
├── components/
│   ├── NotificationList.tsx   # Notification Overlay
│   └── PhoneOverlay.tsx       # Status Bar & Home Indicator
└── features/feed/
    ├── api.ts                 # Mock API & Data Persistence Logic
    ├── components/
    │   ├── Feed.tsx           # Main List Container
    │   ├── TransactionRow.tsx # Individual Transaction Item
    │   └── WalletCard.tsx     # Hero Card with Balance
    └── utils/
        ├── mockGenerator.ts   # Deterministic Mock Data (Faker.js)
        └── storyGenerator.ts  # AI Message Logic
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **View the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Desktop vs Mobile

- **Desktop**: You will see a "Simulated Phone" in the center of the screen. The background is a nice dark radial gradient acting as a "desk".
- **Mobile**: The app takes over the full viewport (100dvh). The outer "phone frame" borders are hidden to give a native feel.

## 🎨 Design Philosophy

We prioritized **Aesthetics** and **Vibe**. 
- No boring "You paid $5". Instead -> *"Retail therapy hit hard? 🛍️"*
- No plain gray backgrounds. Instead -> *Rich Zinc-950 with blurry glass overlays.*

---
Built with 🧡 using Next.js
