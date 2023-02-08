type PokemonApiName = {
	data: {
		name: string;
	};
};

function Pokemon(props: PokemonApiName) {
	return <h1>{props.data.name}</h1>;
}

export default Pokemon;

export async function getStaticPaths() {
	const request = await fetch('https://pokeapi.co/api/v2/pokemon');
	const data = (await request.json()) as { results: { name: string }[] };

	const paths = data.results.map((pok) => ({
		params: { pokemons: pok.name },
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
