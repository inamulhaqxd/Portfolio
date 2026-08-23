import { createServerClient } from '../supabase/server'
import type { KnowledgeBase } from '../types/knowledge-base'

const supabase = createServerClient()

export async function getKnowledgeBaseEntries(): Promise<KnowledgeBase[]> {
  const { data, error } = await supabase
    .from('knowledge_base')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getKnowledgeBaseByCategory(category: string): Promise<KnowledgeBase[]> {
  const { data, error } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createKnowledgeBaseEntry(entry: Omit<KnowledgeBase, 'id' | 'created_at' | 'updated_at'>): Promise<KnowledgeBase> {
  const { data, error } = await supabase
    .from('knowledge_base')
    .insert(entry)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateKnowledgeBaseEntry(id: string, updates: Partial<KnowledgeBase>): Promise<KnowledgeBase> {
  const { data, error } = await supabase
    .from('knowledge_base')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteKnowledgeBaseEntry(id: string): Promise<void> {
  const { error } = await supabase
    .from('knowledge_base')
    .delete()
    .eq('id', id)

  if (error) throw error
}
