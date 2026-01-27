import InputWithLabel from "./InputWithLabel";
import VenueList from "./VenueList";
import Header from "./Header";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import VenueDataService from "../services/VenueDataService"

const Home = () => {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.data); 
  
  const [searchVenue, setSearchVenue] = useState("");

  const search = (event) => {
    setSearchVenue(event.target.value);
  };

  // Sayfa açıldığında backend'den veriyi çeken motor burası
  React.useEffect(() => {
    dispatch({ type: "FETCH_INIT" }); 
    VenueDataService.nearbyVenues(40.1, 29.1) 
      .then((response) => {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data }); 
      })
      .catch(() => {
        dispatch({ type: "FETCH_FAILURE" });
      });
  }, [dispatch]);


  const filteredVenues = Array.isArray(venues) ? venues.filter((venue) => {
    return venue.name.toLowerCase().includes(searchVenue.toLowerCase());
  }) : [];

  return (
    <div>
      <Header headerText="Mekanbul" motto="Civarınızdaki Mekanları Keşfedin!" />
      <InputWithLabel
        id="arama"
        label="Mekan Ara:"
        type="text"
        onInputChange={search}
        value={searchVenue}
      />
      <hr />
      <div className="row">
        {filteredVenues.length > 0 ? (
          <VenueList venues={filteredVenues} />
        ) : (
          <p>Mekanlar yükleniyor veya bulunamadı...</p>
        )}
      </div>
    </div>
  );
};

export default Home;