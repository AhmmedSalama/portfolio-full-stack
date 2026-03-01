export interface IContact {
  _id?: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  linkedin: string;
  github: string;
  facebook: string;
}


export interface IMessage {
  _id?: string;
  name: string;
  phone?: string;    
  email: string;
  message: string;
  createdAt?: Date; 
}