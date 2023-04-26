import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const API_KEY = "6cbf0b3cb080c11f09fe6ba72bb563b5";

function tempConverter(kelvin) {
  const celsius = kelvin - 273.15;
  return Math.floor(celsius * 100) / 100;
}

const FavTowns = () => {
  const dispatch = useDispatch();
  const favContent = useSelector((state) => state.favourite.content);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const fetchedData = [];
      for (const town of favContent) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${API_KEY}`
          );
          const data = await response.json();
          fetchedData.push(data);
        } catch (error) {
          console.error(error);
        }
      }
      setWeatherData(fetchedData);
    };

    fetchWeatherData();
  }, [favContent]);

  return (
    <div>
      <div className="yourFav">
        <h2>Your Favourite Towns</h2>
        <h3>
          from aaaaall around the world{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-globe-americas"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
          </svg>
        </h3>
      </div>

      {favContent.length === 0 ? (
        <div className="empty-fav-message mx-5 my-3 p-1 ps-3">
          <h2>This place is empty!</h2>
          <p>Looks like you don't have any favourite places yet!</p>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-around">
          {weatherData.map((data, i) => {
            return (
              <Container className="my-1 ">
                <Row>
                  <Col>
                    <Card
                      key={data.name + i}
                      className="mx-auto mt-3 mx-auto textLeft mainCards"
                    >
                      <Card.Body>
                        <Link className="linkTitle" to={`/${data.name}`}>
                          <Card.Title className="mainCardTitle">
                            {data.name}
                          </Card.Title>
                        </Link>
                        <Row>
                          <Col className="d-flex col-3 align-items-center">
                            <Card.Text>
                              Temperature: <br />
                              {data.main && data.main.temp
                                ? Math.round(tempConverter(data.main.temp)) +
                                  "°C"
                                : "N/A"}
                            </Card.Text>
                          </Col>
                          <Col className="d-flex col-3 align-items-center">
                            <Card.Text className="mainCardHumidity">
                              Humidity: <br />
                              {data.main ? `${data.main.humidity}%` : "N/A"}
                            </Card.Text>
                          </Col>
                          <Col className="d-flex col-3 align-items-center">
                            <Card.Text className="mainCardWeather">
                              Weather: <br />
                              {data.weather && data.weather[0]
                                ? data.weather[0].description
                                    .charAt(0)
                                    .toUpperCase() +
                                  data.weather[0].description
                                    .slice(1)
                                    .toLowerCase()
                                : "N/A"}
                            </Card.Text>
                          </Col>
                        </Row>
                        <Button
                          className="m-2 mainCardsButton"
                          variant="danger"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_FAV",
                              payload: data.name,
                            });
                          }}
                        >
                          remove from fav 💔
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </div>
      )}
      <Link to="/" id="home-link">
        <Button className="m-4 mainCardsButton">Home</Button>
      </Link>
    </div>
  );
};

export default FavTowns;
