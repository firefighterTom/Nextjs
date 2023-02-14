import { useRouter } from 'next/router';

type PokemonApiName = {
	data: {
		name: string;
	};
};

function Pokemon(props: PokemonApiName) {
	const router = useRouter();
	const fisrtPage = 1;
	const lastPage = 19;
	const pageNumber = Number(router.query.pokemons);
	const paginationHandler = (symbol: string) => {
		if (symbol === '+') {
			router.push(`/pokemon/${pageNumber + 1}`);
		}
		if (symbol === '-') {
			router.push(`/pokemon/${pageNumber - 1}`);
		}
	};
	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<h1>{props.data.name}</h1>
			<div style={{ display: 'flex', gap: 20 }}>
				<button
					onClick={() => paginationHandler('-')}
					disabled={fisrtPage >= pageNumber}>
					Prev
				</button>
				<button
					onClick={() => paginationHandler('+')}
					disabled={lastPage <= pageNumber}>
					Next
				</button>
			</div>
		</div>
	);
}

export default Pokemon;

export async function getStaticPaths() {
	const request = await fetch('https://pokeapi.co/api/v2/pokemon');
	const data = (await request.json()) as { results: { name: string }[] };

	const paths = data.results.map((pok, index) => ({
		params: { pokemons: index.toString() },
	}));
	return {
		paths,
		fallback: false,
	};
}
type AllPokemon = {
	params: {
		pokemons: {};
	};
};
export async function getStaticProps(params: AllPokemon) {
	const res = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${params.params.pokemons}/`
	);
	const data: PokemonApiName = await res.json();
	return { props: { data } };
}
