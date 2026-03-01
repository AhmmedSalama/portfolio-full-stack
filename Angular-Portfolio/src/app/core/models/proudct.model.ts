export interface IProject {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  techs: string[];
  features: string[];
  githubLink?: string;  // أضف هذا
  liveDemo?: string;    // أضف هذا
}
export interface IProjects {
  _id?: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  techs: string[];
  features: string[];
  githubLink?: string;  // أضف هذا
  liveDemo?: string;    // أضف هذا
}