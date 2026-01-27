// Axios kütüphanesini içe aktar
// Axios: HTTP istekleri (GET, POST, PUT, DELETE vb.) yapmak için kullanılan kütüphane
import axios from "axios";

// Axios instance oluştur - Tüm API istekleri için ortak yapılandırma
// Bu instance, her API çağrısında tekrar tekrar yapılandırma yapmamızı önler
export default axios.create({
  baseURL: "https://mekanbul-backend.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});
