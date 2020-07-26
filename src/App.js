import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import loader from './images/loader.svg';
import logo from './images/logo.png'
import './App.scss';
import HomePage from './components/home-page/home-page.component';
import MovieList from './components/movie-list/movie-list.component';
import MovieDetails from './components/movie-details/movie-details.component';

export default class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    config: null,
    movieList: null,
    topRated: null,
  };

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
                        <MovieList state={this.state} title="Upcoming" item="upcoming" />
                    </Route>
                    <Route path="/topRated">
                        <MovieList state={this.state} title="Top Rated" item="top_rated" />
                    </Route>
                    <Route path="/movie/:id" render={routeProps => <MovieDetails state={this.state} id={routeProps.match.params.id} />} />
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
