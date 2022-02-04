export function getPokemons(url) {
  return fetch(url).then((resp) => resp.json());
}
