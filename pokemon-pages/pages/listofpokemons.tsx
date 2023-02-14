import { InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import classes from '../styles/ListOfPokemons.module.css';

function Page(data: InferGetStaticPropsType<typeof getStaticProps>) {
	const [inputValue, setInputValue] = useState<string | undefined>(undefined);
	const filtredPokemons = data.data.results.filter((p) => {
		const nameOfPokemon = p.name;
		if (inputValue === undefined || inputValue === '') {
			return p.name;
		}
		if (nameOfPokemon.includes(inputValue.toLowerCase())) {
			return p.name;
		}
	});

	return (
		<div className={classes.flex}>
			<input
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
			/>
			<ul className={`${classes.listDecoration} ${classes.m}`}>
				{filtredPokemons.map((p) => {
					return <li key={p.name}>{p.name}</li>;
				})}
			</ul>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
	const data = (await res.json()) as { results: { name: string }[] };
	return { props: { data } };
}

export default Page;
