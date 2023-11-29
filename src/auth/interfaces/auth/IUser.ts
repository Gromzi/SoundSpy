export interface IUser {
  id: string
  name: string
  email: string
  picture: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  google_id: string | null
  avatar: string | null
}
