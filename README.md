# erdinc.curebal.dev

Personal portfolio website that dynamically fetches all data from the GitHub API.

## Features

- All profile data pulled from GitHub API (name, bio, avatar, location, social links)
- Repositories listed dynamically with language colors from GitHub Linguist
- Social accounts fetched from GitHub (LinkedIn, X, Instagram, YouTube)
- Dynamic page title and round favicon from GitHub avatar
- Dark theme based on GitHub's color palette
- Responsive design

## Tech Stack

- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Vite

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## API Endpoints Used

- `GET /users/erdinccurebal` - Profile data
- `GET /users/erdinccurebal/social_accounts` - Social links
- `GET /users/erdinccurebal/repos?sort=updated&per_page=30` - Repositories
- GitHub Linguist colors via `ozh/github-colors`
