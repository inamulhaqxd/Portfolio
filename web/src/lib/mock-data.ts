import type { Project } from '../shared/types/project'
import type { Message } from '../shared/types/message'

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Rice Crop Disease Detection',
    slug: 'rice-crop-disease-detection',
    caseStudy: 'Computer vision system for detecting diseases in rice crops using deep learning.',
    tech_tags: ['Python', 'TensorFlow', 'OpenCV', 'CNN'],
    live_demo_url: null,
    github_url: 'https://github.com/inam/rice-disease',
    youtube_url: null,
    images: ['/placeholder-project.jpg'],
    thumbnail_url: '/placeholder-project.jpg',
    status: 'published',
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
  },
]

export const mockMessages: Message[] = []
