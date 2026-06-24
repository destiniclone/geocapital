# Where In The World? 🌍

A daily geography guessing game. Each day you get a new location (capital, city, landmark, nature reserve, or lake) and have 6 attempts to guess which country it belongs to. Wrong guesses show distance and direction to help you narrow it down.

**Features:**
- Daily puzzle (same for all players via UTC date)
- Photo carousel from Wikipedia
- 8 location types: capitals, former capitals, major cities, UNESCO sites, nature reserves, sightseeing spots, lakes, and mountains
- Distance hints in km with cardinal directions
- Share your results
- Learn more via Wikipedia links

## Deploy to GitHub + Vercel

### Step 1 — Push to GitHub

1. Go to [github.com](https://github.com) and sign in
2. Click **New repository** 
3. Name it `witworld`, keep **Public**, click **Create repository**
4. Click **uploading an existing file**
5. Drag and drop all the files from this project
6. Click **Commit changes**

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and **Sign in with GitHub**
2. Click **Add New → Project**
3. Select the `witworld` repository
4. Vercel auto-detects Vite — click **Deploy**
5. In ~60 seconds you get a free URL 🎉

Every push to GitHub redeploys automatically.

## Run Locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173
