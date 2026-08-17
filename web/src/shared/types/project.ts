export interface Project {
  id: string
  title: string
  slug: string
  description: string
  tech_tags: string[]
  live_demo_url: string | null
  github_url: string | null
  youtube_url: string | null
  images: string[]
  thumbnail_url: string
  created_at: string
  updated_at: string
}
