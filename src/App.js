import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import loader from './images/loader.svg';
import logo from './images/logo.png'
import './App.scss';
import HomePage from './components/home-page/home-page.component';

export default class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    config: null,
    data: null,
    movieList: null,
    upcoming: null,
    topRated: null,
    search: null
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/configuration?api_key=81aca9d1237f1912113be3633c606413")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            config: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=81aca9d1237f1912113be3633c606413&language=en-US")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            movieList: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
    fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=81aca9d1237f1912113be3633c606413&language=en-US&page=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            upcoming: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=81aca9d1237f1912113be3633c606413&language=en-US&page=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            topRated: result
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
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark" role="navigation">
          <ul className="nav navbar-nav pull-sm-left">
            <li className="nav-item">
              <Link className="nav-link" to="/upcoming">Upcoming</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-logo mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" href="#">
                <img src={logo} alt="logo" />
              </Link>
            </li>
          </ul>
          <ul className="nav navbar-nav pull-sm-right">
            <li className="nav-item">
              <Link className="nav-link" to="/topRated">Top Rated</Link>
            </li>
          </ul>
        </nav>

        <main className="main">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div>
                  <Switch>
                    <Route exact path="/">
                      <HomePage state={this.state} />
                    </Route>
                    <Route path="/upcoming">
                      <Upcoming upcoming={this.state.upcoming} config={this.state.config} />
                    </Route>
                    <Route path="/topRated">
                      <TopRated topRated={this.state.topRated} config={this.state.config} />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Router>
    );
  }
}


function Upcoming({ upcoming, config }) {
  if (config && upcoming) {
    return (
      <div className="row">
        <div className="col-12">
          <h1 className="section-title">Upcoming</h1>
        </div>
        {
          upcoming.results.map((movie, i) => (
            <div className="col-sm-3 col-12" key={i}>
              <div className="movie-item">
                <img className="movie-poster" src={config.images.secure_base_url + config.images.poster_sizes[3] + movie.poster_path} />
                <h6 className="movie-title">{movie.original_title}</h6>
              </div>
            </div>
          ))
        }
      </div>
    );
  } else {
    return (
      <div className="text-danger">
        <img src={loader} className="loader-img" />
      </div>
    );
  }
}

function TopRated({ topRated, config }) {
  if (config && topRated) {
    return (
      <div className="row">
        <div className="col-12">
          <h1 className="section-title">Top Rated</h1>
        </div>
        {
          topRated.results.map((movie, i) => (
            <div className="col-sm-3 col-12" key={i}>
              <div className="movie-item">
                <img className="movie-poster" src={config.images.secure_base_url + config.images.poster_sizes[3] + movie.poster_path} />
                <h6 className="movie-title">{movie.original_title}</h6>
              </div>
            </div>
          ))
        }
      </div>
    );
  } else {
    return (
      <div className="text-danger">
        <img src={loader} className="loader-img" />
      </div>
    );
  }
}