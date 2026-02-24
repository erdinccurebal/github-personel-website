import { ref, onMounted } from 'vue'

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string
const LANG_COLORS_URL = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json'

export interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
  name: string | null
  bio: string | null
  location: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
}

export interface GitHubSocial {
  provider: string
  url: string
}

export interface GitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  homepage: string | null
  fork: boolean
  created_at: string
  updated_at: string
}

function setRoundFavicon(url: string) {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(img, 0, 0, size, size)

    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (link) {
      link.href = canvas.toDataURL('image/png')
    }
  }
  img.src = url
}

export function useGitHub() {
  const user = ref<GitHubUser | null>(null)
  const socials = ref<GitHubSocial[]>([])
  const repos = ref<GitHubRepo[]>([])
  const langColors = ref<Record<string, string>>({})
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchData() {
    loading.value = true
    error.value = null

    try {
      const [userRes, socialsRes, reposRes, colorsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/social_accounts`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`),
        fetch(LANG_COLORS_URL),
      ])

      if (!userRes.ok || !reposRes.ok) {
        throw new Error('GitHub API isteği başarısız oldu')
      }

      user.value = await userRes.json()

      const u = user.value!
      document.title = `${u.name ?? u.login} - ${u.bio ?? ''}`
      setRoundFavicon(u.avatar_url)

      if (socialsRes.ok) {
        socials.value = await socialsRes.json()
      }

      if (colorsRes.ok) {
        const raw: Record<string, { color: string | null }> = await colorsRes.json()
        const map: Record<string, string> = {}
        for (const [lang, data] of Object.entries(raw)) {
          if (data.color) map[lang] = data.color
        }
        langColors.value = map
      }

      const allRepos: GitHubRepo[] = await reposRes.json()
      repos.value = allRepos
        .filter((r) => !r.fork)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Bilinmeyen hata'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return { user, socials, repos, langColors, loading, error }
}
