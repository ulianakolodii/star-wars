export type Hero = {
  id: number;
  name: string;
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: number;
  films: number[];
  species: number[];
  starships: number[];
  vehicles: number[];
  url: string;
  detail?: string;
};

export type Heroes = Map<number, Hero>;

export type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: number[];
  starships: number[];
  vehicles: number[];
  characters: number[];
  planets: number[];
  url: string;
  created: string;
  edited: string;
};

export type Films = Map<number, Film>;

export type Ship = {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: number[];
  films: number[];
  created: string;
  edited: string;
  url: string;
};

export type Ships = Map<number, Ship>;
