import React, { Component } from "react";
import loader from '../../images/loader.svg';
import placeholder from '../../images/placeholder.jpg';
import { Link } from "react-router-dom";

class MovieList extends Component {
    state = {
        movies: null
    };
    fetchMovieList = this.fetchMovieList.bind(this)

    componentDidMount() {
        this.fetchMovieList();
    }

    fetchMovieList() {
        this.setState({
            movies: null
        });
        fetch("https://api.themoviedb.org/3/movie/" + this.props.item + "?api_key=81aca9d1237f1912113be3633c606413&language=en-US&page=1")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        movies: result
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    componentDidUpdate(nextProps) {
        const { title } = this.props
        if (nextProps.title !== title) {
            if (title) {
                this.fetchMovieList();
            }
        }
    }

    render() {
        if (this.state.movies !== null) {
            return (
                <div className="row">
                    <div className="col-12">
                        <h1 className="section-title">{this.props.title}</h1>
                    </div>
                    {
                        this.state.movies.results.map((movie, i) => (
                            <div className="col-sm-3 col-12" key={i}>
                                <Link className="no-hover" to={'/movie/' + movie.id}>
                                    <div className="movie-item">
                                        {
                                            movie.poster_path ?
                                                <img className="movie-poster" alt={movie.title} src={this.props.state.config.images.secure_base_url + this.props.state.config.images.poster_sizes[3] + movie.poster_path} />
                                                :
                                                <img className="movie-poster" alt={movie.title} src={placeholder} />
                                        }
                                        <h6 className="movie-title">{movie.title}</h6>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            );
        } else {
            return (
                <div className="text-danger">
                    <img src={loader} alt="Loader" className="loader-img" />
                </div>
            );
        }
    }
}

export default (MovieList);