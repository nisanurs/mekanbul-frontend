import React, { useState } from "react"; // useState'i ekledik
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddRating from "./AddRating";
import Header from "./Header";
import VenueDataService from "../services/VenueDataService";

function AddComment() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. ADIM: Yıldız değerini tutacak state'i tanımladık
  const [rating, setRating] = useState(0);

  const onSubmit = (evt) => {
    evt.preventDefault();
    
    // 2. ADIM: Kontrol ve veri gönderme kısmını güncelledik
    // Artık puanı evt.target'tan değil, yukarıdaki 'rating' state'inden alıyoruz
    if(evt.target.elements.author.value && evt.target.elements.text.value && rating > 0){
        let newComment = {
          author: evt.target.elements.author.value,
          text: evt.target.elements.text.value,
          rating: rating // State'ten gelen sayı (1-5 arası)
        };

        // Backend'e gönderim işlemi (dispatch ve servis çağrısı buraya gelecek)
        dispatch({ type: "ADD_COMMENT_INIT" });
        VenueDataService.addComment(id, newComment)
          .then(() => {
             dispatch({ type: "ADD_COMMENT_SUCCESS" });
             navigate(`/venue/${id}`); // Başarılıysa mekana geri dön
          })
          .catch(() => {
             dispatch({ type: "ADD_COMMENT_FAILURE" });
          });
      } else {
        alert("Lütfen tüm alanları doldurun ve bir puan seçin!");
      }
  };

  return (
    <>
      <Header headerText={location.state.name} motto=" mekanına yorum yap" />
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <form className="form-horizontal" id="yorumEkle" onSubmit={onSubmit}>
            
            <div className="form-group">
              <label className="col-sm-2 control-label">İsim:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="author" name="author" />
              </div>
            </div>
            
            {/* 3. ADIM: SELECT BLOĞUNU SİLDİK, YERİNEAddRating KOYDUK */}
            
            
            <div className="form-group">
  <label className="col-xs-12 col-sm-2 control-label">Puan:</label>
  <div className="col-xs-12 col-sm-10" style={{ display: 'flex', alignItems: 'center' }}>
    <AddRating onRate={(val) => setRating(val)} />
  </div>
</div>
            <div className="form-group">
              <label className="col-sm-2 control-label">Yorum:</label>
              <div className="col-sm-10">
                <textarea className="review form-control" name="text" rows={5} />
              </div>
            </div>
            
            <button className="btn btn-default pull-right">Yorum Ekle</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddComment;