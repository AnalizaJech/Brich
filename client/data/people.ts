export interface PersonCard {
  id: number;
  name: string;
  age: number;
  distance: string;
  mode: 'blue' | 'amber' | 'red';
  gender: 'male' | 'female';
  story: string;
  online: boolean;
  verified: boolean;
}

export const nearbyPeople: PersonCard[] = [
  {
    id: 1,
    name: "Isabella",
    age: 24,
    distance: "1.2 km",
    mode: "blue",
    gender: "female",
    story: "Psicóloga buscando algo serio y duradero",
    online: true,
    verified: true
  },
  {
    id: 2,
    name: "Alejandro",
    age: 27,
    distance: "2.1 km",
    mode: "amber",
    gender: "male",
    story: "Fotógrafo viajero en busca de aventuras",
    online: true,
    verified: true
  },
  {
    id: 3,
    name: "Valentina",
    age: 26,
    distance: "1.8 km",
    mode: "red",
    gender: "female",
    story: "Bailarina apasionada por la vida",
    online: false,
    verified: true
  },
  {
    id: 4,
    name: "Sebastian",
    age: 29,
    distance: "2.7 km",
    mode: "blue",
    gender: "male",
    story: "Arquitecto profesional buscando estabilidad",
    online: true,
    verified: true
  },
  {
    id: 5,
    name: "Camila",
    age: 23,
    distance: "3.2 km",
    mode: "amber",
    gender: "female",
    story: "Chef aventurera explorando sabores",
    online: true,
    verified: false
  },
  {
    id: 6,
    name: "Mateo",
    age: 25,
    distance: "2.9 km",
    mode: "red",
    gender: "male",
    story: "Músico intenso buscando conexión real",
    online: true,
    verified: true
  },
  {
    id: 7,
    name: "Sophia",
    age: 28,
    distance: "4.1 km",
    mode: "blue",
    gender: "female",
    story: "Doctora comprometida con relaciones serias",
    online: false,
    verified: true
  },
  {
    id: 8,
    name: "Diego",
    age: 30,
    distance: "3.8 km",
    mode: "amber",
    gender: "male",
    story: "Surfista divertido conociendo gente nueva",
    online: true,
    verified: false
  },
  {
    id: 9,
    name: "Martina",
    age: 22,
    distance: "4.5 km",
    mode: "red",
    gender: "female",
    story: "Modelo fitness con pasión por la vida",
    online: true,
    verified: true
  },
  {
    id: 10,
    name: "Emilio",
    age: 26,
    distance: "4.8 km",
    mode: "blue",
    gender: "male",
    story: "Ingeniero serio buscando compañera de vida",
    online: false,
    verified: true
  }
];
