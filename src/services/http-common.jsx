// Axios kütüphanesini içe aktar
// Axios: HTTP istekleri (GET, POST, PUT, DELETE vb.) yapmak için kullanılan kütüphane
import axios from "axios";

// Axios instance oluştur - Tüm API istekleri için ortak yapılandırma
// Bu instance, her API çağrısında tekrar tekrar yapılandırma yapmamızı önler
export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});
