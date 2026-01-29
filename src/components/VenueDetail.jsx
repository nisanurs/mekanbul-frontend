import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom"; 
import Rating from "./Rating";
import FoodAndDrinkList from "./FoodAndDrinkList";
import Header from "./Header";
import HourList from "./HourList";
import CommentList from "./CommentList";
import VenueDataService from "../services/VenueDataService"; 

const VenueDetail = () => {
  const [venue, setVenue] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    // URL'deki ID'nin sonundaki ":1" gibi hataları temizler
    const cleanId = id && id.includes(':') ? id.split(':')[0] : id;
    
    VenueDataService.getVenue(cleanId)
      .then((response) => {
        setVenue(response.data); 
      })
      .catch((e) => {
        console.error("Veri çekme hatası:", e);
      });
  }, [id]);

  if (!venue) {
    return <div className="container"><p>Yukleniyor...</p></div>;
  }

  return (
    <div>
      <Header headerText={venue.name} />
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <p className="rating"><Rating rating={venue.rating} /></p>
                <p>{venue.address}</p>
                <div className="panel panel-primary">
                  <div className="panel-heading"><h2 className="panel-title">Calisma Saatleri</h2></div>
                  <div className="panel-body"><HourList hourList={venue.hours || []} /></div>
                </div>
                <div className="panel panel-primary">
                  <div className="panel-heading"><h2 className="panel-title">Neler Var?</h2></div>
                  <div className="panel-body"><FoodAndDrinkList foodAndDrinkList={venue.foodanddrink || []} /></div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="panel panel-primary">
                  <div className="panel-heading"><h2 className="panel-title">Konum Bilgisi</h2></div>
                  <div className="panel-body">
                    {venue.coordinates && (
                      <img className="img-responsive img-rounded" alt="Konum"
                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${venue.coordinates[1]},${venue.coordinates[0]}&zoom=15&size=600x400&markers=${venue.coordinates[1]},${venue.coordinates[0]}&key=BURAYA_API_KEY`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;