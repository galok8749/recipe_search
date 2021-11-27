import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

export default function App() {
	const APP_ID = "d13e1670";
	const APP_KEY = "dfb7c098d49612b1c49c3dcc146f2e4f";
	// const example = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

	const [recipies, setRecipies] = useState([]);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("paneer");

	useEffect(()=>{
		getRecipes();
	}, [query]);

	const getRecipes = async ()=>{
		const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
		const data = await response.json();
		setRecipies(data.hits);
	}

	const updateSearch = e => {
		setSearch(e.target.value);
	}

	const getSearch = e => {
		e.preventDefault();
		setQuery(search);
		setSearch("");
	}

  	return (
    	<div className="App">
			<form onSubmit={getSearch} className="search-form">
				<input className="search-bar" type="text" value={search} onChange={updateSearch}/>
				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			<div className="recipies">
			{recipies.map(recipe=>(
				<Recipe
				key={recipe.recipe.label} 
				title={recipe.recipe.label} 
				calories={recipe.recipe.calories}
				image={recipe.recipe.image}
				ingredients={recipe.recipe.ingredients}
				></Recipe>
			))}
			</div>
    	</div>
  	);
};

