import React, { Component } from 'react';
import './styles.css';
import Header from '../../components/common/header/header'
import FeaturedHouse from '../../components/featured-house/featured-house';
import HouseFilter from '../../components/house-filter/house-filter';
import HouseDetail from '../../components/house';
import SearchResults from '../../components/search-results';

class App extends Component {
  state = {}

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch('/houses.json')
    .then(res => res.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
      this.determineUniqueCountries();
    })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse =  this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState({ activeHouse: house });
  }

  render() {
    let activeComponent = null;
    if (this.state.country)
    activeComponent = <SearchResults country={this.state.country} 
      filteredHouses={this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    if (this.state.activeHouse)
      activeComponent = <HouseDetail house={this.state.activeHouse}/>;
    if (!activeComponent)
      activeComponent = <FeaturedHouse house={this.state.featuredHouse} />;
    return (
      <div className="container">
        <Header subtitle="Providing houses world wide" />
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses} />
        {activeComponent}
      </div>
    );
  }
}

export default App;
