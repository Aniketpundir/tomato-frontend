import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RestaurentCard.css";
import { Storecontext } from "../../../context/Storecontext";
import axios from "axios";

const RestaurantCard = () => {
  const { restroRes, url } = useContext(Storecontext);
  const [allRestro, setAllRestro] = useState([]);
  const navigate = useNavigate();

  const location = async () => {
    try {
      let newUrl = url;
      newUrl += "/api/restro/all";

      console.log(newUrl);

      const res = await axios.get(newUrl);

      setAllRestro(res.data.data);
    } catch {
      setAllRestro([]);
    }
  };

  useEffect(() => {
    location();
  }, []);

  console.log(allRestro);

  return (
    <>
      <div className="restaurent-header">
        <h1>Top Restaurants Near You</h1>
      </div>

      <div className="restaurentCard-container">
        {restroRes && Array.isArray(restroRes)
          ? restroRes.map((items, index) => (
              <div key={index} className="card-details" id={items._id}>
                <div className="rest-img">
                  <img src={items.image} alt="Restaurant" />
                </div>
                <div className="rest-text">
                  <h3 className="restaurent-name">{items.name}</h3>
                  <div className="location-menu_button">
                    <span className="location">
                      {items.address?.district} <br /> {items.address?.locality}
                    </span>
                    <button
                      onClick={() => {
                        navigate(`/menu/${items._id}`);
                        window.scroll(0, -10);
                      }}
                    >
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            ))
          : allRestro.map((items, index) => (
              <div key={index} className="card-details" id={items._id}>
                <div className="rest-img">
                  <img src={items.image} alt="Restaurant" />
                </div>
                <div className="rest-text">
                  <h3 className="restaurent-name">{items.name}</h3>
                  <div className="location-menu_button">
                    <span className="location">
                      {items.address?.district} <br /> {items.address?.locality}
                    </span>
                    <button
                      onClick={() => {
                        navigate(`/menu/${items._id}`);
                        window.scroll(0, -10);
                      }}
                    >
                      View Menu
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default RestaurantCard;
