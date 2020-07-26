import React, { Component } from "react";
import loader from '../../images/loader.svg';
import placeholder from '../../images/placeholder.jpg';
import imdb from '../../images/imdb.png';

class MovieDetails extends Component {
    state = {
        movieDetail: null
    };
    fetchMovieDetial = this.fetchMovieDetial.bind(this)

    componentDidMount() {
        this.fetchMovieDetial();
    }

    fetchMovieDetial() {
        this.setState({
            movieDetail: null
        });
        if (this.props.id) {
            fetch("https://api.themoviedb.org/3/movie/" + this.props.id + "?api_key=81aca9d1237f1912113be3633c606413&language=en-US")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            movieDetail: result
                        });
                    },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                );
        }
    }

    render() {
        console.log(this.state.movieDetail);
        if (this.state.movieDetail && this.props?.state?.config) {
            return (
                <div className="row movie-detail">
                    <div className="col-sm-3 col-12">
                        <div className="movie-item">
                            {
                                this.state.movieDetail.poster_path ?
                                    <img className="movie-poster" alt={this.state.movieDetail.title} src={this.props.state.config.images.secure_base_url + this.props.state.config.images.poster_sizes[3] + this.state.movieDetail.poster_path} />
                                    :
                                    <img className="movie-poster" alt={this.state.movieDetail.title} src={placeholder} />
                            }
                        </div>
                    </div>
                    <div className="col-sm-9 col-12 movie-data">
                        <h1 className="section-title">{this.state.movieDetail.title}
                            {this.state.movieDetail.title !== this.state.movieDetail.original_title?  <span>{'(' +this.state.movieDetail.original_title + ')'}</span> : ''}
                            <a href={'https://www.imdb.com/title/' + this.state.movieDetail.imdb_id} target="_blank">
                                <img src={imdb} atl="IMDB" className="imdb-icon" />
                            </a>
                        </h1>
                        {this.state.movieDetail.tagline?<p className="tagline">{this.state.movieDetail.tagline}</p>:''}
                        <p className="genres">
                            {
                                this.state.movieDetail.genres.map((genre, i)=>(
                                <i>{genre.name}{i < this.state.movieDetail.genres.length-1? ', ' : ''}</i>
                                ))
                            }
                        </p>
                        <p className="detail-subtitle">
                            <span>Release Date : </span> {this.state.movieDetail.release_date.replace(/-/g, ' / ')}
                        </p>
                        <p className="detail-subtitle">
                            <span>Budget : </span> {this.state.movieDetail.budget > 0 ?'$ ' + this.state.movieDetail.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' (estimated)' : 'N/A'}
                        </p>
                        <p className="detail-subtitle">
                            <span>Revenue : </span> {this.state.movieDetail.revenue > 0 ? '$ ' + this.state.movieDetail.revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' (estimated)' : 'N/A'}
                        </p>
                        <p className="detail-subtitle">
                            <span>Runtime : </span> {parseInt(this.state.movieDetail.runtime) > 60 ? 
                            Math.floor((this.state.movieDetail.runtime / 60)) + " hour(s) " + Math.round(((this.state.movieDetail.runtime / 60) - Math.floor((this.state.movieDetail.runtime / 60))) * 60) + " minute(s)"
                            : this.state.movieDetail.runtime + ' minutes'
                        }
                        </p>
                        <p className="detail-subtitle text-muted">
                            <span>Overview : </span> {this.state.movieDetail.overview}
                        </p>
                    </div>
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

export default (MovieDetails);