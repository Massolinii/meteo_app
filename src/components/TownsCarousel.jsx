import Carousel from "react-bootstrap/Carousel";

function TownsCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-75 mx-auto my-4"
          src="https://tse4.mm.bing.net/th?id=OIP.bjM7JYBClr7cv0bSPS16jQHaEK&pid=Api&P=0"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default TownsCarousel;
