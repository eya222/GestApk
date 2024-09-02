export interface Update {
  consultantTechnique: string;
  consultantFonctionnel?: string;
  apk?: File;
  document?: File;
  demo?: File;
  photos?: File[];
  date: Date;  
}
export interface Appli {
  _id?: string;
  name: string;
  client: string;
  description: string;
  updates: Update[];  
  
}