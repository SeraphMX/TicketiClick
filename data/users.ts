// data/users.ts
// Mock de usuarios con diferentes roles

export type UserRole = 'user' | 'organizer' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'María González',
    email: 'maria@ejemplo.com',
    role: 'organizer',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    email: 'carlos@ejemplo.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'Laura Martínez',
    email: 'laura@ejemplo.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 5,
    name: 'Roberto Fernández',
    email: 'roberto@ejemplo.com',
    role: 'organizer',
    avatar: 'https://i.pravatar.cc/150?img=5'
  }
];

// Función para obtener un usuario por ID
export const getUserById = (id: number): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Función para obtener un usuario por email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};