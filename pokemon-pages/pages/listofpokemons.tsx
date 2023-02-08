import { InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import classes from '../styles/ListOfPokemons.module.css';



function Page(data: InferGetStaticPropsType<typeof getStaticProps>) {
	const [inputValue, setInputValue] = useState<string | undefined>(undefined);

	const listOfPokemons = data.data.results.map((p) => {
		const nameOfPokemon = p.name;
		if (inputValue === undefined || inputValue === '') {
			return <li key={p.name}>{p.name}</li>;
		}
		if (nameOfPokemon.includes(inputValue.toLowerCase())) {
			return <li key={p.name}>{p.name}</li>;
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
				{listOfPokemons}
			</ul>
		</div>
	);
}

// This gets called on every request
export async function getStaticProps() {
	// Fetch data from external API
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
	const data = (await res.json()) as { results: { name: string }[] };

	// Pass data to the page via props
	return { props: { data } };
}

export default Page;
