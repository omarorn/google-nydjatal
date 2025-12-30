
import { Person, FamilyActivity } from '../types';

export const mockPeople: Person[] = [
  // Generation 1 (Root)
  {
    id: '1',
    name: 'Steingrímur',
    birthDate: '1910-05-12',
    deathDate: '1995-02-20',
    gender: 'male',
    avatar: 'https://picsum.photos/seed/steingrimur/200',
    parents: [],
    children: ['3', '4', '5', '14', '15', '16'],
    location: 'Ísafjörður'
  },
  {
    id: '2',
    name: 'Halldóra',
    birthDate: '1912-08-15',
    deathDate: '1998-11-10',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/halldora/200',
    parents: [],
    children: ['3', '4', '5', '14', '15', '16'],
    location: 'Ísafjörður'
  },
  // Generation 2
  {
    id: '3',
    name: 'Anna Sigurlína',
    birthDate: '1935-03-22',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/anna/200',
    parents: ['1', '2'],
    children: ['6'], 
    location: 'Reykjavík'
  },
  {
    id: '4',
    name: 'Guðrún Kristín',
    birthDate: '1933-01-10',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/gudrun/200',
    parents: ['1', '2'],
    children: ['12'],
    location: 'Akureyri'
  },
  {
    id: '5',
    name: 'Ólína Marta',
    birthDate: '1940-06-15',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/olina/200',
    parents: ['1', '2'],
    children: ['13'],
    location: 'Hafnarfjörður'
  },
  {
    id: '14',
    name: 'Jóna Sigríður',
    birthDate: '1937-02-20',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/jona/200',
    parents: ['1', '2'],
    children: [],
    location: 'Keflavík'
  },
  {
    id: '15',
    name: 'Þröstur',
    birthDate: '1942-11-30',
    gender: 'male',
    avatar: 'https://picsum.photos/seed/throstur/200',
    parents: ['1', '2'],
    children: [],
    location: 'Reykjavík'
  },
  {
    id: '16',
    name: 'Guðný Fjóla',
    birthDate: '1946-04-05',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/gudny/200',
    parents: ['1', '2'],
    children: [],
    location: 'Hveragerði'
  },

  // Generation 3
  {
    id: '6',
    name: 'Magnús Örn',
    birthDate: '1960-07-30',
    gender: 'male',
    avatar: 'https://picsum.photos/seed/magnusorn/200',
    parents: ['3'],
    children: ['7', '8', '9'], // Ómar Örn, Anna Kristín, Guðmundur Jón
    location: 'Reykjavík',
    bio: 'Architect and amateur historian.'
  },
  {
    id: '12',
    name: 'Dóra',
    birthDate: '1958-02-14',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/dora/200',
    parents: ['4'],
    children: [],
    location: 'Kópavogur'
  },
   {
    id: '13',
    name: 'Bryndís Halldóra',
    birthDate: '1965-09-20',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/bryndis/200',
    parents: ['5'],
    children: [],
    location: 'Selfoss'
  },

  // Generation 4 (Focal Generation)
  {
    id: '7',
    name: 'Ómar Örn',
    birthDate: '1985-04-12',
    gender: 'male',
    avatar: 'https://picsum.photos/seed/omar/200',
    parents: ['6'],
    children: ['10', '11', '17', '18'],
    location: 'Garðabær',
    famous: true,
    famousTitle: 'App Developer'
  },
  {
    id: '8',
    name: 'Anna Kristín',
    birthDate: '1988-11-02',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/annakristin/200',
    parents: ['6'],
    children: [],
    location: 'Reykjavík'
  },
  {
    id: '9',
    name: 'Guðmundur Jón',
    birthDate: '1992-05-15',
    gender: 'male',
    avatar: 'https://picsum.photos/seed/gudmundur/200',
    parents: ['6'],
    children: [],
    location: 'Oslo'
  },

  // Generation 5
  {
    id: '10',
    name: 'Magnús Örn',
    birthDate: '2015-08-20',
    gender: 'male',
    avatar: 'https://picsum.photos/seed/magnusjr/200',
    parents: ['7'],
    children: [],
    location: 'Garðabær'
  },
  {
    id: '11',
    name: 'Harpa Dís',
    birthDate: '2018-01-10',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/harpa/200',
    parents: ['7'],
    children: [],
    location: 'Garðabær'
  },
  {
    id: '17',
    name: 'Lúkas Örn',
    birthDate: '2012-05-15',
    gender: 'male',
    avatar: 'https://picsum.photos/seed/lukas/200',
    parents: ['7'],
    children: [],
    location: 'Garðabær'
  },
  {
    id: '18',
    name: 'Emma Guðrún',
    birthDate: '2016-11-22',
    gender: 'female',
    avatar: 'https://picsum.photos/seed/emma/200',
    parents: ['7'],
    children: [],
    location: 'Garðabær'
  }
];

export const mockFeed: FamilyActivity[] = [
  {
    id: 'a1',
    type: 'memory',
    personId: '1',
    content: 'Steingrímur byggði ættaróðalið á Ísafirði árið 1945. Hér er mynd af honum við verkið.',
    timestamp: new Date(Date.now() - 3600000 * 2),
    likes: 45,
    comments: 12
  },
  {
    id: 'a2',
    type: 'achievement',
    personId: '7',
    content: 'Ómar Örn hefur gefið út nýja útgáfu af Ættartré appinu!',
    timestamp: new Date(Date.now() - 3600000 * 24),
    likes: 128,
    comments: 34
  },
  {
    id: 'a3',
    type: 'new_relation',
    personId: '10',
    content: 'Magnús Örn (yngri) byrjaði í fótbolta í dag. Áfram Stjarnan!',
    timestamp: new Date(Date.now() - 3600000 * 48),
    likes: 24,
    comments: 5
  }
];
