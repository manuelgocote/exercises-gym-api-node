export interface User {
    id?: string;
    username: string;
    password: string;  // Almacenaremos el password hasheado
    email: string;
    role: 'user' | 'admin';  // Roles de usuario, puede ser 'user' o 'admin'
  }