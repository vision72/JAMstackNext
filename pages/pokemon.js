import Head from 'next/head';

const Pokemon = ({ pokemon }) => {
    return (
        <>
            <Head>
                <title>Pokemon: {pokemon?.name}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div>
                Welcome, {pokemon?.name}!
            </div>
            <img src={pokemon?.sprites.front_default}></img>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
    const pokemon = await res.json();
    return {
        props: {
            pokemon
        }
    }
}

export default Pokemon;
