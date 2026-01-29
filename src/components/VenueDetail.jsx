import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom"; 
import Rating from "./Rating";
import FoodAndDrinkList from "./FoodAndDrinkList";
import Header from "./Header";
import HourList from "./HourList";
import CommentList from "./CommentList";
import VenueDataService from "../services/VenueDataService"; 
// Mekan detay sayfası bileşeni - Seçilen mekanın tüm bilgilerini gösterir
const VenueDetail = () => {
  const [venue, setVenue] = useState(null); // Başta mekan yok
  const { id } = useParams();

  useEffect(() => {
    // Sayfa açıldığında Render'daki backend'e git ve bu ID'li mekanı getir
    VenueDataService.getVenue(id)
      .then((response) => {
        setVenue(response.data); // Veri gelince state'i güncelle
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  // Veri henüz gelmediyse yükleniyor yazısı göster
  if (!venue) {
    return <div className="container">Mekan yükleniyor...</div>;
  }

  // ... geri kalan return (HTML) kısmı aynı kalabilir

  return (
    <div>
      {/* Sayfa başlığı - Mekan adını göster */}
      <Header headerText={venue.name} />

      {/* Bootstrap container - İçeriği ortalar ve genişliği sınırlar */}
      <div className="container">
        {/* Bootstrap row - Yatay satır oluşturur */}
        <div className="row">
          {/* Bootstrap grid: col-xs-12 (mobilde tam genişlik), col-md-12 (orta ekranda tam genişlik) */}
          <div className="col-xs-12 col-md-12">
            <div className="row">
              {/* Sol kolon - Mekan bilgileri */}
              {/* Bootstrap grid: col-xs-12 (mobilde tam genişlik), col-sm-6 (küçük ekranda yarım genişlik) */}
              <div className="col-xs-12 col-sm-6 ">
                {/* Yıldız puanlama - Özel CSS class'ı */}
                <p className="rating">
                  <Rating rating={venue.rating} />
                </p>

                {/* Mekan adresi */}
                <p>{venue.address}</p>

                {/* Açılış saatleri paneli */}
                {/* Bootstrap panel: panel-primary (mavi renk teması) */}
                <div className="panel panel-primary">
                  {/* Panel başlığı - Mavi arka plan */}
                  <div className="panel-heading ">
                    {/* Panel başlık metni */}
                    <h2 className="panel-title ">Açılış Saatleri</h2>
                  </div>
                  {/* Panel içeriği - Beyaz arka plan */}
                  <div className="panel-body ">
                    {/* Çalışma saatleri listesi */}
                    <HourList hourList={venue.hours || []} />
                  </div>
                </div>

                {/* Yiyecek/içecek paneli */}
                <div className="panel panel-primary">
                  <div className="panel-heading ">
                    <h2 className="panel-title ">Neler Var?</h2>
                  </div>
                  <div className="panel-body ">
                    {/* Yiyecek ve içecek listesi */}
                    <FoodAndDrinkList foodAndDrinkList={venue.foodanddrink || []} />
                  </div>
                </div>
              </div>

              {/* Sağ kolon - Harita */}
              {/* Bootstrap grid: col-xs-12 (mobilde tam genişlik), col-sm-6 (küçük ekranda yarım genişlik) */}
              <div className="col-xs-12 col-sm-6">
                {/* Konum bilgisi paneli */}
                <div className="panel panel-primary">
                  <div className="panel-heading ">
                    <h2 className="panel-title ">Konum Bilgisi</h2>
                  </div>
                  <div className="panel-body ">
                    {/* Google Maps statik harita görüntüsü */}
                    {/* coordinates ile mekanın konumunu gösterir */}
                    {/* Bootstrap img class'ları: img (temel stil), img-responsive (responsive yapar), img-rounded (yuvarlatılmış köşeler) */}
                    <img
                      className="img img-responsive img-rounded"
                      alt="Konum Bilgisi"
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${venue.coordinates
                        }&zoom=12&size=600x400&markers=${venue.coordinates
                        }&key=AIzaSyCmmKygTpBzHGOZEciJpAdxC9v_tWHagnE`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yorumlar bölümü */}
          <div className="row">
            {/* Bootstrap grid: col-xs-12 (mobilde tam genişlik) */}
            <div className="col-xs-12 ">
              <div className="panel panel-primary">
                <div className="panel-heading ">
                  {/* Yorum ekleme butonu - AddComment sayfasına yönlendirir */}
                  {/* Bootstrap buton: btn (temel buton), btn-default (gri renk), pull-right (sağa hizala) */}
                  {/* 
                    state prop'u: React Router'da sayfalar arası veri göndermek için kullanılır
                    Bu state, AddComment sayfasına mekan adını gönderir
                    AddComment sayfasında useLocation() hook'u ile bu veriye erişilir:
                    const location = useLocation();
                    location.state.name -> "Bilgisayar Mühendisliği" değerini döndürür
                    Bu sayede AddComment sayfası, hangi mekana yorum yapıldığını bilir
                    ve sayfa başlığında mekan adını gösterebilir
                  */}
                  {/* 
                    Template Literal (Template String) kullanımı:
                    Backtick (`) ile başlayan string, JavaScript'te template literal'dir
                    ${id} -> Değişken interpolasyonu (değişken değerini string'e ekler)
                    
                    Örnek:
                    - Eğer id = 123 ise -> to="/venue/123/comment/new"
                    - Eğer id = 456 ise -> to="/venue/456/comment/new"
                    
                    id değeri useParams() hook'u ile URL'den alınır:
                    const { id } = useParams(); // /venue/123 -> id = "123"
                    
                    Bu sayede dinamik URL oluşturulur ve her mekan için
                    kendi yorum ekleme sayfasına yönlendirilir
                  */}
                  <NavLink
                    className="btn btn-default pull-right"
                    to={`/venue/${id}/comment/new`}
                    state={{ name: venue.name }}
                  >
                    Yorum Ekle{" "}
                  </NavLink>
                  <h2 className="panel-title ">Yorumlar</h2>
                </div>
                <div className="panel-body ">
                  {/* Yorum listesi - Tüm yorumları göster */}
                  <CommentList commentList={venue.comments || []} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bileşeni dışa aktar
export default VenueDetail;
