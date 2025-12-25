# Rewards Hub

A comprehensive gamification platform built with React, featuring points tracking, daily streaks, reward redemption, and a referral system.

## Features

- 🔐 **Authentication**: Secure login and signup with Supabase Auth
- 💎 **Points System**: Earn and track points for various activities
- 🔥 **Daily Streaks**: Maintain streaks by checking in daily
- 🎁 **Rewards**: Redeem points for gift cards and other rewards
- 👥 **Referral Program**: Invite friends and earn bonus points
- 🎨 **Beautiful UI**: Modern design with smooth animations

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Backend**: Supabase
- **Routing**: React Router v7

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Supabase Setup

To connect your application with Supabase:

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully set up

### 2. Get Your API Keys

1. Go to Project Settings > API
2. Copy your project URL and anon/public key
3. Add them to your `.env` file:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3. Set Up the Database

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase-schema.sql` from this project
3. Paste and run the SQL script in the SQL Editor
4. This will create all necessary tables, policies, and initial data

The schema includes:
- `user_rewards` - Track user points and streaks
- `rewards` - Catalog of available rewards
- `user_reward_redemptions` - History of redeemed rewards
- `referrals` - Track referral links and completions

### 4. Verify Database Setup

After running the schema:
1. Go to Table Editor in Supabase
2. You should see all four tables created
3. The `rewards` table should have 3 default rewards

### 5. Test the Connection

1. Start your development server: `npm run dev`
2. Sign up with a new account
3. Your user rewards record should be automatically created
4. Try claiming daily points to verify database sync

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── AppSidebar.jsx
│   ├── DailyStreak.jsx
│   ├── PointsBalance.jsx
│   ├── ProtectedRoute.jsx
│   ├── ReferralSection.jsx
│   ├── RewardCard.jsx
│   ├── StatsCard.jsx
│   └── ToolSpotlight.jsx
├── contexts/          # React contexts
│   └── AuthContext.jsx
├── data/              # Mock data
│   └── mockData.js
├── lib/               # Utilities and configs
│   └── supabase.js
├── pages/             # Page components
│   ├── ComingSoon.jsx
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── stores/            # Zustand stores
│   └── useRewardsStore.js
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Overview

### Authentication
- Email/password authentication
- Protected routes
- User profile display
- Session persistence

### Points & Rewards
- Track points balance
- View progress toward rewards
- Redeem rewards (when unlocked)
- Filter rewards by status

### Daily Streaks
- Check in daily to earn points
- Visual streak tracker
- Weekday indicators

### Referral System
- Personal referral link
- Copy to clipboard
- Social sharing buttons
- Track referrals and earnings

## Customization

The app uses Tailwind CSS v4 with custom color variables defined in `src/index.css`. You can customize the theme by modifying the CSS variables in the `:root` selector.

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.