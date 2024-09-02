export interface User {
    id?: number;
    name?: string;
    email: string;
    fonction?:string;
    password?: string;  // Optional, include for signup or login
  }