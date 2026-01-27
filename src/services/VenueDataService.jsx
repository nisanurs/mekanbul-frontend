import http from "./http-common";



class VenueDataService {

  // Mevcut fonksiyonun

  nearbyVenues(lat, long) {

    return http.get(`/venues?lat=${lat}&long=${long}`);

  }



  // EKSİK OLAN VE HATAYA SEBEP OLAN FONKSİYON:

  addComment(id, data) {

    return http.post(`/venues/${id}/reviews`, data);

  }



  // Tek bir mekanı getirmek için (lazım olacak)

  getVenue(id) {

    return http.get(`/venues/${id}`);

  }

}



export default new VenueDataService();