export function getPkemonId(url: string): number {
  return parseInt(url.split('/').at(-2)!, 10)
}

export function getPokemonArtWork(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getPokemonCries(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
}

export function formatWeight(weight: number): string {
  if (!weight) return "--";
  return (weight / 10).toString().replace('.', ',') + ' Kg';
}

export function formatheight(height: number): string {
  if (!height) return '--';
	return (height / 10).toString().replace('.', ',') + ' m';
}

export const basePokemonStat = [
	{
		base_stat: 1,
		stat: {
			name: 'hp',
		}
	},
	{
		base_stat: 1,
		stat: {
			name: 'attack',
		}
	},
	{
		base_stat: 1,
		stat: {
			name: 'defense',
		}
	},
	{
		base_stat: 1,
		stat: {
			name: 'special-attack',
		}
	},
	{
		base_stat: 1,
		stat: {
			name: 'special-defense',
		}
	},
	{
		base_stat: 1,
		stat: {
			name: 'speed',
		}
	}
];