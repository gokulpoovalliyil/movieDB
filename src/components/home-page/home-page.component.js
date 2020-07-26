import React, { Component } from "react";
import loader from '../../images/loader.svg';
import placeholder from '../../images/placeholder.jpg';
import { render } from "react-dom";

class HomePage extends Component {
    state = {
        value: null,
        searchLoaded: false,
        result: null,
        error: null,
        searchError: false,
        resultFor: null
    };
    constructor(props) {
        super(props);
        this.state.value = '';
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchSearch = this.fetchSearch.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        this.setState({
            searchError: false
        });
        if (this.state.value) {
            this.fetchSearch(this.state.value);
        } else {
            this.setState({
                searchError: true
            });
        }
        event.preventDefault();
    }

    handleClear(event) {
        this.setState({
            searchLoaded: false,
            result: null,
            value: ''
        });
        console.log(this.state);
        event.preventDefault();
    }

    fetchSearch(value) {
        fetch("https://api.themoviedb.org/3/search/movie?api_key=81aca9d1237f1912113be3633c606413&query=" + value + "&page=1")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        searchLoaded: true,
                        result: result,
                        resultFor: this.state.value
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );
    }

    render() {
        if (this.props.state.movieList && this.props.state.config && !this.state.result) {
            return (
                <div className="row">
                    <div className="col-12">
                        <form className="form-main my-5" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
                            </div>
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col-12">
                        <h1 className="section-title">Popular</h1>
                    </div>
                    {
                        this.props.state.movieList.results.map((movie, i) => (
                            <div className="col-sm-3 col-12" key={i}>
                                <div className="movie-item">
                                    <img className="movie-poster" src={this.props.state.config.images.secure_base_url + this.props.state.config.images.poster_sizes[3] + movie.poster_path} />
                                    <h6 className="movie-title">{movie.original_title}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
            );
        } else if (this.state.result != null && this.props.state.config) {
            return (
                <div className="row">
                    <div className="col-12">
                        <form className="form-main my-5" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
                            </div>
                            <button className="btn btn-outline-primary" type="button" onClick={this.handleClear}>Clear</button>
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col-12">
                        <h1 className="section-title">Result for : {this.state.resultFor}</h1>
                    </div>
                    {
                        this.state.result.results.map((movie, i) => (
                            <div className="col-sm-3 col-12" key={i}>
                                <div className="movie-item">
                                    {
                                        movie.poster_path ?
                                            <img className="movie-poster" src={this.props.state.config.images.secure_base_url + this.props.state.config.images.poster_sizes[3] + movie.poster_path} />
                                            :
                                            <img className="movie-poster" src={placeholder} />
                                    }
                                    <h6 className="movie-title">{movie.original_title}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <img src={loader} className="loader-img" />
                </div>
            );
        }
    }
}

export default (HomePage);