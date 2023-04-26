import { useState } from "react";

import { ListGroup, Dropdown, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom/dist";

const API_KEY = "6cbf0b3cb080c11f09fe6ba72bb563b5";

function tempConverter(kelvin) {
  const celsius = kelvin - 273.15;
  return Math.floor(celsius * 100) / 100;
}

const Searchbar = function () {
  const [town, setTown] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchSuggestions();
  };

  const onSelectTown = async (townName, country) => {
    setTown(`${townName}, ${country}`);
    setSuggestions([]);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${townName}&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData([data]);
      setError(null);
      console.log(data);
    } catch (error) {
      console.error(error);
      setError("City not found");
      setWeatherData([]);
    }
  };

  return (
    <>
      <Form onSubmit={handleSearch}>
        <InputGroup id="basic-addon1" className="d-flex w-75 mx-auto pt-2">
          <InputGroup.Text id="basic-addon1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-geo-alt"
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Search for any City..."
            aria-label="Search"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
          <Button variant="dark" type="submit">
            Search
          </Button>
        </InputGroup>
      </Form>
      {suggestions.length > 0 && (
        <Dropdown.Menu show>
          {suggestions.map((suggestion, i) => (
            <Dropdown.Item
              key={i}
              onClick={() => onSelectTown(suggestion.name, suggestion.country)}
            >
              {suggestion.name}, {suggestion.country}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
      {error && <p>{error}</p>}
      {weatherData.length > 0 && (
        <ListGroup>
          {weatherData.map((data, i) => (
            <ListGroup.Item key={data.name + i} className="searchCard">
              <h2>{data.name}</h2>
              <h3 className="fs-1">
                {data.main && data.main.temp
                  ? Math.round(tempConverter(data.main.temp)) + "°C"
                  : "N/A"}
              </h3>
              <p>
                Weather:{" "}
                {data.weather && data.weather[0] && data.weather[0].description
                  ? data.weather[0].description.charAt(0).toUpperCase() +
                    data.weather[0].description.slice(1)
                  : "N/A"}
              </p>
              <Link to={"/town/" + data.name}>
                <Button className="bg-white text-primary px-4 border border-2 border-primary">
                  See More
                </Button>
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default Searchbar;
