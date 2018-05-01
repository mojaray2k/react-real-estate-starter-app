import React from 'react';
import Header from '../../components/common/header/header'
import FeaturedHouse from '../../components/featured-house/featured-house';
import HouseFilter from '../../components/house-filter/house-filter';
import HouseDetail from '../../components/house';
import SearchResults from '../../components/search-results';

const AppPresentation = (props) => {
    let activeComponent = null;
    if (props.country)
        activeComponent = <SearchResults country={props.country} filteredHouses={props.filteredHouses} setActiveHouse={props.setActiveHouse} />;
    if (props.activeHouse)
        activeComponent = <HouseDetail house={props.activeHouse} />;
    if (!activeComponent)
        activeComponent = <FeaturedHouse house={props.featuredHouse} />;

    return (
        <div className="container">
            <Header />
            <HouseFilter countries={props.countries} filterHouses={props.filterHouses} />
            {activeComponent}
        </div>
    );
}

export default AppPresentation;