export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  resume?: string;
  sessionize?: string;
  youtube?: string[];
  blog?: string;
}

export interface Person {
  id: string;
  name: string;
  birthDate: string;
  birthPlace?: string;
  deathDate?: string;
  image?: string;
  socials: SocialLinks;
  burialSite?: string;
  father?: Person;
  mother?: Person;
}