import { createServerClient } from '../supabase/server'
import type { Message } from '../types/message'

const supabase = createServerClient()

export async function getAllMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getMessageById(id: string): Promise<Message | null> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function createMessage(message: Omit<Message, 'id' | 'created_at' | 'is_read'>): Promise<Message> {
  const { data, error } = await supabase
    .from('messages')
    .insert({ ...message, is_read: false })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function markMessageAsRead(id: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', id)

  if (error) throw error
}

export async function deleteMessage(id: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)

  if (error) throw error
}
