// src/types/user.ts
export interface SignUpParams {
  email: string
  password: string
  metadata?: Record<string, any> // puedes tiparlo mejor si sabes los campos
}

export interface SignInParams {
  email: string
  password: string
}
