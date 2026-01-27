// Tarih formatlama fonksiyonu - Tarihi Türkçe formatta gösterir
// Örnek: "15 Ocak 2024" formatında döndürür
export function formatDate(date) {
  // Gelen tarihi Date objesine çevir
  var date = new Date(date);

  // Türkçe ay isimleri dizisi
  var months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  // Gün bilgisini al (1-31 arası)
  var dateInfo = date.getDate();

  // Ay bilgisini al ve Türkçe ay ismine çevir
  // getMonth() 0-11 arası döndürür, bu yüzden months dizisinden doğru ayı alırız
  var monthInfo = months[date.getMonth()];

  // Yıl bilgisini al (örn: 2024)
  var yearInfo = date.getFullYear();

  // Tarihi birleştir: "15 Ocak 2024" formatında
  var result = dateInfo + ' ' + monthInfo + ' ' + yearInfo;

  return result;
}
export function formatDistance(distance) {
  // KORUMA: Eğer mesafe gelmemişse veya geçerli bir sayı değilse
  if (distance === undefined || distance === null || isNaN(distance)) {
    return "Mesafe hesaplanamadı";
  }

  var newDistance, unit;

  if (distance > 1) {
    newDistance = parseFloat(distance).toFixed(1);
    unit = " km";
  } else {
    // Sayıya çevirerek (Number) matematiksel hatayı önleyelim
    newDistance = parseInt(Number(distance) * 1000, 10);
    unit = " m";
  }

  return newDistance + unit;
};