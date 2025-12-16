# UFC Fight Analyzer 🥊

AI-powered UFC fight predictions and breakdowns using Claude.

## Features

- **Full Breakdown** - Detailed analysis of fighting styles, paths to victory, and prediction
- **Quick Pick** - Fast prediction with winner, method, and round
- **Betting Angle** - Analysis from a betting perspective (for entertainment only)

## How to Deploy

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button → **New repository**
3. Name it `ufc-analyzer`
4. Click **Create repository**
5. Upload all these files (drag and drop):
   - `src/` folder
   - `public/` folder
   - `package.json`
   - `tsconfig.json`
   - `.gitignore`
   - `README.md`
6. Click **Commit changes**

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New...** → **Project**
3. Find `ufc-analyzer` and click **Import**
4. Before deploying, add Environment Variable:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Your Claude API key (get it from console.anthropic.com)
5. Click **Deploy**

### Step 3: Done!

Your app will be live at `ufc-analyzer.vercel.app` (or similar URL).

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express, TypeScript
- **AI:** Claude (Anthropic)

## Local Development

```bash
# Install dependencies
npm install

# Create .env file with your API key
echo "ANTHROPIC_API_KEY=your-key-here" > .env

# Run locally
npm run dev

# Open http://localhost:3000
```

---

Built by Samson 🥊
