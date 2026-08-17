export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
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
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          tech_tags: string[]
          live_demo_url?: string | null
          github_url?: string | null
          youtube_url?: string | null
          images: string[]
          thumbnail_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          tech_tags?: string[]
          live_demo_url?: string | null
          github_url?: string | null
          youtube_url?: string | null
          images?: string[]
          thumbnail_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}
