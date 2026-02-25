<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import type { GitHubRepo } from '../composables/useGitHub'

const props = defineProps<{
  repo: GitHubRepo
  langColors: Record<string, string>
}>()

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

const topicsRef = ref<HTMLElement | null>(null)
const visibleTopics = ref(props.repo.topics)
const extraCount = ref(0)
const ready = ref(false)

onMounted(async () => {
  await nextTick()
  const container = topicsRef.value
  if (!container || props.repo.topics.length === 0) {
    ready.value = true
    return
  }

  const children = Array.from(container.children) as HTMLElement[]
  const containerRight = container.getBoundingClientRect().right
  let count = 0

  for (const child of children) {
    const right = child.getBoundingClientRect().right
    if (right + 40 <= containerRight) {
      count++
    } else {
      break
    }
  }

  if (count > 0 && count < props.repo.topics.length) {
    visibleTopics.value = props.repo.topics.slice(0, count)
    extraCount.value = props.repo.topics.length - count
  }

  ready.value = true
})
</script>

<template>
  <a :href="repo.html_url" target="_blank" rel="noopener" class="repo-card">
    <!-- Header -->
    <div class="repo-card__header">
      <h3 class="repo-card__name">{{ repo.name }}</h3>
    </div>

    <!-- Content -->
    <div class="repo-card__content">
      <p v-if="repo.description" class="repo-card__desc">{{ repo.description }}</p>

      <a
        v-if="repo.homepage"
        :href="repo.homepage"
        target="_blank"
        rel="noopener"
        class="repo-card__homepage"
        @click.stop
      >{{ getDomain(repo.homepage) }}</a>

      <div v-if="repo.topics.length" ref="topicsRef" class="repo-card__topics" :style="{ visibility: ready ? 'visible' : 'hidden' }">
        <span v-for="topic in visibleTopics" :key="topic" class="repo-card__topic">{{ topic }}</span>
        <span v-if="extraCount > 0" class="repo-card__more">+{{ extraCount }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="repo-card__footer">
      <div class="repo-card__left">
        <div class="repo-card__meta">
          <span v-if="repo.language" class="repo-card__lang">
            <span class="repo-card__dot" :style="{ background: langColors[repo.language] ?? '#8b949e' }"></span>
            {{ repo.language }}
          </span>
          <span v-if="repo.stargazers_count" class="repo-card__stars">&#9733; {{ repo.stargazers_count }}</span>
          <span v-if="repo.forks_count">&#9741; {{ repo.forks_count }}</span>
        </div>
      </div>
      <div class="repo-card__dates">
        <span>Created {{ formatDate(repo.created_at) }}</span>
      </div>
    </div>
  </a>
</template>
