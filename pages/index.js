import Head from 'next/head';
import Navbar from '../components/Navbar';
import Todo from '../components/Todo';
import { table, minifyRecords } from './api/utils/Airtable';
import { TodosContext } from '../contexts/TodosContext';
import { useEffect, useContext } from 'react';

export default function Home({ initialTodos }) {
	const { todos, setTodos } = useContext(TodosContext);

	useEffect(() => {
		setTodos(initialTodos);
	}, []);

	return (
		<div>
			<Head>
				<title>Authenticated TODO App</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Navbar />
			<main>
				<h1>Welcome, Vision!</h1>
				<ul>{todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}</ul>
			</main>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	try {
		const todos = await table.select({}).firstPage();
		return {
			props: {
				initialTodos: minifyRecords(todos)
			}
		};
	} catch (err) {
		console.error(err);
		return {
			props: {
				err: 'Something went wrong'
			}
		};
	}
};
