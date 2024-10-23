export const mockHeroes = new Map<number, any>([
  [
    1,
    {
      id: 1,
      name: "Luke Skywalker",
      gender: "male",
      birth_year: "19BBY",
      mass: "77",
      height: "172",
      hair_color: "blond",
      eye_color: "blue",
      skin_color: "fair",
      homeworld: "1",
      species: "1",
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      starships: [10],
      films: [101],
    },
  ],
  [
    2,
    {
      id: 2,
      name: "Darth Vader",
      gender: "male",
      birth_year: "19BBY",
      mass: "77",
      height: "172",
      hair_color: "blond",
      eye_color: "blue",
      skin_color: "fair",
      homeworld: "1",
      species: "1",
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      starships: [20],
      films: [102],
    },
  ],
]);

export const mockFilms = new Map<number, any>([
  [
    101,
    {
      id: 101,
      title: "A New Hope",
      director: "George Lucas",
      producer: "Gary Kurtz",
      opening_crawl: "It is a period of civil war...",
      release_date: "1977-05-25",
      starships: [10, 30],
    },
  ],
  [
    102,
    {
      id: 102,
      title: "The Empire Strikes Back",
      director: "George Lucas",
      producer: "Gary Kurtz",
      opening_crawl: "It is a period of civil war...",
      release_date: "1977-05-25",
      starships: [20, 40],
    },
  ],
]);

export const mockShips = new Map<number, any>([
  [
    10,
    {
      id: 10,
      name: "Millennium Falcon",
      model: "YT-1300 light freighter",
      manufacturer: "Corellian Engineering Corporation",
      passengers: "6",
      crew: "4",
      max_atmosphering_speed: "1050",
    },
  ],
  [
    20,
    {
      id: 20,
      name: "Millennium Falcon",
      model: "YT-1300 light freighter",
      manufacturer: "Corellian Engineering Corporation",
      passengers: "6400",
      crew: "200",
      max_atmosphering_speed: "390",
    },
  ],
]);
