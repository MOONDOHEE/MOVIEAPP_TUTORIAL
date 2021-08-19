import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';
/*
function Food(props) {
	console.log(props.food);
	return <h3>I like potato!</h3>;
}
위와 같이 적어도 좋고

function Food( {food} ) {
	return <h3>I like {food} </h3>;
}
위도 가능하다.
*/

//function방법이 아닌 Class 방법으로 디버깅하는 법
class App extends React.Component {
	state = {
		isLoading: true,
		movies: [],
	};

	//async은 비동기라는 뜻이다.
	getMovies = async () => {
		const {
			data: {
				data: { movies },
			},
		} = await axios.get(
			'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
		);
		this.setState({ movies, isLoading: false });
	};

	componentDidMount() {
		this.getMovies();
	}

	//setState를 호출할때마다 react는 매순간 새로운 state와 함께 render function을 호출한다.
	render() {
		const { isLoading, movies } = this.state;
		return (
			<section className='container'>
				{isLoading ? (
					<div className='loader'>
						<span className='loader__text'>Loading...</span>
					</div>
				) : (
					<div className='movies'>
						{movies.map((movie) => (
							<Movie
								key={movie.id}
								id={movie.id}
								year={movie.year}
								title={movie.title}
								summary={movie.summary}
								poster={movie.medium_cover_image}
								genres={movie.genres}
							/>
						))}
					</div>
				)}
			</section>
		);
	}
}

/*
function App() {

}
*/

// <Food
// favorit="kimchi"
// someting={true}
// papapapapa={["hello", 1, 2, 3, 4, true]}
//위와 같은 형식으로도 전달이 가능하다.

export default App;
