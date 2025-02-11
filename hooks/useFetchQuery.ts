import { Colors } from '@/constants/Colors';
import { InitialPageParam } from './../node_modules/@tanstack/query-core/src/types'
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = 'https://pokeapi.co/api/v2';

type API = {
  '/pokemon?Limit=21': {
    count: number;
    next: string | null;
    results: {
      name: string;
      url: string;
    }[];
  },
  '/pokemon/[id]': {
    id: number;
    name: number;
    url: string;
    weight: number;
    height: number;
    moves: {
      move: {
        name: string;
        url: string;
      }
    }[];
    stats: {
      base_stat: number;
      stat: {
        name: string;
      }
    }[];
    cries: {
      latest: string;
    };
    types: {
      type: {
        name: keyof typeof Colors[ 'type' ];
      }
    }[];
  },
  '/pokemon-species/[id]': {
    flavor_text_entries: {
        flavor_text: string;
        language: {
          name: string;
        }
      }[];
  },
  
  }
  

export function useFetchQuery<T extends keyof API>(path: T, params?: Record<string, string | number>) {
	
	const localUrl =
		endpoint + // On commence par l'URL de base (endpoint)
		Object.entries(params ?? {}).reduce(
			// On utilise `Object.entries` pour transformer l'objet `params` en un tableau de paires [clé, valeur]
			(
				acc,
				[key, value] // `reduce` parcourt chaque paire [clé, valeur]
			) => acc.replaceAll(`[${key}]`, value.toString()), // On remplace toutes les occurrences de `[clé]` dans `acc` par la valeur convertie en chaîne
			path // `path` est la chaîne de départ (par exemple, "/pokemon/[id]")
		);
	return useQuery({
		queryKey: [localUrl],
		queryFn: async () => {
			return fetch(localUrl, {
				headers: {
					Accept: 'application/json'
				}
			}).then((r) => r.json() as Promise<API[T]>);
		}
	});
}

export function useInfiniteFetchQuery<T extends keyof API> (path: T) {
  return useInfiniteQuery({
    queryKey: [ path ],
    initialPageParam: endpoint + path,
    queryFn: async ({pageParam}) => {
      return fetch(pageParam, {
        headers: {
          Accept: 'application/json',
        }
      }).then((r) => r.json() as Promise<API[T]>);
    },
    getNextPageParam: (lastPage) => {
      if('next' in lastPage) {
        return lastPage.next
      }
      return null
    }

  })
}

function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration*1000));
}