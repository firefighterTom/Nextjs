import { useIsFirstOrLastPage } from '@/hooks/useIsFirstOrLastPage';
import { useChangePage } from '@/hooks/useChangePage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type PokemonApiName = {
	data: {
		name: string;
	};
};

function Pokemon(props: PokemonApiName) {
	const router = useRouter();
	const [isFirstPage, setIsFirstPage] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);
	const pageNumber = Number(router.query.pokemons);
	useEffect(() => {
		const isItFirstOrLastPage = useIsFirstOrLastPage(pageNumber);
		setIsLastPage(isItFirstOrLastPage.lastPage);
		setIsFirstPage(isItFirstOrLastPage.firstPage);
	}, [pageNumber]);
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
					onClick={() => useChangePage('-', router, pageNumber)}
					disabled={isFirstPage}>
					Prev
				</button>
				<button
					onClick={() => useChangePage('+', router, pageNumber)}
					disabled={isLastPage}>
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
