
export interface IProject {
  _id?: string;
  title: string;
  shortDescription?: string;
  description: string;
  image: string;
  techs: string[];
  githubLink?: string;
  liveDemo?: string;
  createdAt?: Date;
}

export interface ISkill {
  _id?: string;
  name: string;
  icon: string;
  createdAt?: Date;
}


export interface IAbout {
  _id?: string;
  title: string;
  desc: string;
  job: string;
  descJob: string;
  image: string;
  skills: string[];
}
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
  email: string;
  phone?: string;
  message: string;
  createdAt?: Date;
}