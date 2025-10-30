export interface Message {
  id: string
  title: string
  response: string
  role?: 'user' | 'assistant'
  content?: string
}
