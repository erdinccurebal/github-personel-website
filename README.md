# GitHub Personal Website

A personal portfolio website that dynamically fetches all data from the GitHub API. Just provide your GitHub username and get a fully functional personal website.

## Features

- All data pulled dynamically from GitHub API (profile, bio, avatar, location, social links, repositories)
- Repository cards with language colors, stars, topics, homepage links, and dates
- Social accounts fetched automatically from GitHub
- Dynamic page title and round favicon from GitHub avatar
- Dark theme based on GitHub's color palette
- Responsive design

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and set your GitHub username:

```bash
cp .env.example .env
```

```
VITE_GITHUB_USERNAME=your-github-username
```

3. Install dependencies and run:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Vite

## GitHub API Endpoints Used

- `GET /users/:username` - Profile data
- `GET /users/:username/social_accounts` - Social links
- `GET /users/:username/repos?sort=updated&per_page=30` - Repositories
- Language colors via [ozh/github-colors](https://github.com/ozh/github-colors)
