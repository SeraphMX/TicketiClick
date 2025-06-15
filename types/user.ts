// src/types/user.ts
export interface SignUpParams {
  email: string
  password: string
  terms?: boolean | true

  metadata: {
    full_name: string
    phone: string
    role?: 'customer' | 'organizer'
  }
}

export interface SignInParams {
  email: string
  password: string
}
