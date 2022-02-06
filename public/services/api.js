export function getPokemons(url) {
  return fetch(url).then((resp) => resp.json());
}

export function getFavorites() {
  return fetch("http://localhost:3000/Pokemon").then((resp) => resp.json());
}
