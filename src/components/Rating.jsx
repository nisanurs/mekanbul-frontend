
function Rating({ rating }) {
  const stars = []; 

  for (let i = 0; i < rating; i++) {
    stars.push(
      <span className="glyphicon glyphicon-star" key={i}>
        {" "}
      </span>
    );
  }
  
  
  // Örn: rating = 3 ise, 2 boş yıldız eklenir (toplam 5 yıldız)
  for (let i = rating; i < 5; i++) {
    stars.push(
      <span className="glyphicon glyphicon-star-empty" key={i}>
        {" "}
      </span>
    );
  }
  
 
  return stars;
}


export default Rating;
