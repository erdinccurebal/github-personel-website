<script setup lang="ts">
import type { GitHubRepo } from '../composables/useGitHub'
import RepoCard from './RepoCard.vue'

defineProps<{
  repos: GitHubRepo[]
  totalRepos: number
  langColors: Record<string, string>
}>()
</script>

<template>
  <section>
    <div class="repos__header">
      <h2 class="repos__title">Pinned Repositories</h2>
      <span class="repos__count">{{ repos.length }}</span>
    </div>
    <div class="repos__grid">
      <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" :lang-colors="langColors" />
    </div>
  </section>
</template>
