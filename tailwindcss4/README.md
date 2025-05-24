# Quotes App

A React application for managing personal quotes with Supabase integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Supabase:
- Copy `src/lib/supabaseClient.template.js` to `src/lib/supabaseClient.js`
- Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase credentials

3. Run the development server:
```bash
npm run dev
```

## Features
- User authentication
- Create and view personal quotes
- Secure data storage with Supabase
- Responsive design with TailwindCSS

## Security Note
The `supabaseClient.js` file is excluded from Git for security reasons. Make sure to set up your credentials locally using the template file.
