<script setup lang="ts">
import { useGitHub } from './composables/useGitHub'
import HeroSection from './components/HeroSection.vue'
import RepoList from './components/RepoList.vue'

const { user, socials, repos, langColors, loading, error } = useGitHub()
</script>

<template>
  <div v-if="loading" class="loading">
    <div class="spinner"></div>
    Loading...
  </div>

  <div v-else-if="error" class="error">
    {{ error }}
  </div>

  <template v-else-if="user">
    <HeroSection :user="user" :socials="socials" />
    <RepoList :repos="repos" :total-repos="user.public_repos" :lang-colors="langColors" />
  </template>
</template>
