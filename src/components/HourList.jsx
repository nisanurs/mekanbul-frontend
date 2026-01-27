
const HourList = ({ hourList }) => {

  // Dizideki her bir çalışma saatini listele
  // map() fonksiyonu ile hourList dizisindeki her elemanı döngüye al
  // key={index} = React'in her elemanı takip edebilmesi için benzersiz anahtar

  return hourList.map((hour, index) => (
    <p key={index}>
      {/* Günler: Açılış saati - Kapanış saati formatında göster */}
      {hour.days}: {hour.open}-{hour.close}
    </p>
  ));
};

export default HourList;
