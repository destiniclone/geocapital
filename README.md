# GeoCities 🌍

A geography guessing game. You're shown a location (capital, former capital, major city, or UNESCO site) and have 6 attempts to guess which country it belongs to. Wrong guesses show the distance and direction to help you narrow it down.

## Deploy to GitHub + Vercel (free)

### Step 1 — Push to GitHub

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **New repository** (the green button or the + icon top right)
3. Name it `geocities`, keep it **Public**, click **Create repository**
4. Upload all these project files:
   - Click **uploading an existing file** on the repo page
   - Drag and drop all the files/folders from this project
   - Click **Commit changes**

> **Tip:** If you're comfortable with Git, you can also run:
> ```bash
> git init
> git add .
> git commit -m "Initial commit"
> git remote add origin https://github.com/YOUR_USERNAME/geocities.git
> git push -u origin main
> ```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **Add New → Project**
3. Find and select your `geocities` repository
4. Vercel auto-detects Vite — just click **Deploy**
5. In ~1 minute you'll get a free URL like `geocities.vercel.app` 🎉

That's it! Every time you push changes to GitHub, Vercel redeploys automatically.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173
