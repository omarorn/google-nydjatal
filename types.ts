
export interface Person {
  id: string;
  name: string;
  birthDate: string;
  deathDate?: string;
  gender: 'male' | 'female' | 'other';
  avatar: string;
  bio?: string;
  parents: string[]; // IDs
  children: string[]; // IDs
  famous?: boolean;
  famousTitle?: string;
  location?: string;
}

export interface FamilyActivity {
  id: string;
  type: 'birthday' | 'memory' | 'new_relation' | 'achievement';
  personId: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
}

export interface RelationshipResult {
  commonAncestorId?: string;
  path: string[];
  degree: number;
  label: string;
  explanation?: string;
}
