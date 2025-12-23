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

To use the authentication and data features, you'll need to:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Add them to your `.env` file

### Database Schema (Optional)

You can create the following tables in Supabase for full functionality:

```sql
-- Users table (handled by Supabase Auth)

-- User rewards tracking
create table user_rewards (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  points integer default 0,
  streak integer default 0,
  last_claim_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Rewards catalog
create table rewards (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  points_required integer not null,
  icon text,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Referrals
create table referrals (
  id uuid default uuid_generate_v4() primary key,
  referrer_id uuid references auth.users not null,
  referred_id uuid references auth.users,
  referral_code text unique not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

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