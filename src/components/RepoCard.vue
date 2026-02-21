<script setup lang="ts">
import type { GitHubRepo } from '../composables/useGitHub'

const props = defineProps<{
  repo: GitHubRepo
  langColors: Record<string, string>
}>()

function shortUrl(url: string): string {
  try {
    const u = new URL(url)
    return u.hostname.replace('www.', '')
  } catch {
    return url.replace(/^https?:\/\//, '')
  }
}

const maxTopics = 3
const visibleTopics = props.repo.topics.slice(0, maxTopics)
const extraCount = props.repo.topics.length - maxTopics
</script>

<template>
  <div class="repo-card">
    <div class="repo-card__body">
      <a :href="repo.html_url" target="_blank" rel="noopener" class="repo-card__name">{{ repo.name }}</a>
      <p class="repo-card__desc">{{ repo.description ?? '' }}</p>

      <div v-if="repo.topics.length" class="repo-card__topics">
        <span v-for="topic in visibleTopics" :key="topic" class="repo-card__topic">{{ topic }}</span>
        <span v-if="extraCount > 0" class="repo-card__topic repo-card__topic--more">+{{ extraCount }}</span>
      </div>
    </div>

    <div class="repo-card__footer">
      <div class="repo-card__meta">
        <span v-if="repo.language" class="repo-card__lang">
          <span class="repo-card__lang-dot" :style="{ background: langColors[repo.language] ?? '#8b949e' }"></span>
          {{ repo.language }}
        </span>
        <span v-if="repo.stargazers_count">&#9733; {{ repo.stargazers_count }}</span>
        <span v-if="repo.forks_count">&#9741; {{ repo.forks_count }}</span>
      </div>
      <a v-if="repo.homepage" :href="repo.homepage" target="_blank" rel="noopener" class="repo-card__homepage">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        {{ shortUrl(repo.homepage) }}
      </a>
    </div>
  </div>
</template>
