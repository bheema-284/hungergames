import React from "react";

const ImageRest = ({ src, name, width }) => {
  return <img width={width} src={src} alt={name} />;
};

export const RestaurantCard = ({ data }) => {
  const {
    name,
    id,
    cuisine,
    costForTwo,
    minOrder,
    deliveryTime,
    payment_methods: { cash, card },
    rating,
    votes,
    reviews,
    src
  } = data;
  return (
    <div style={{ border: "1px solid black" }}>
      <div style={{ display: "flex", flexDirection: "row", padding: 15 }}>
        <div style={{ flex: 1, alignSelf: "center" }}>
          <ImageRest src={src} alt={name} width={"140px"} />
        </div>
        <div style={{ textAlign: "left", flex: 2 }}>
          <h3> {name} </h3>
          <p> {cuisine.join(", ")}</p>
          <p> Cost for two: ₹{costForTwo} </p>
          <p>
            Min: ₹{minOrder} - Upto {deliveryTime} min
          </p>
          <p>
            Accepts: {cash && card ? "Cash and Card" : card ? "Card" : "Cash"}
          </p>
        </div>
        <div style={{ textAlign: "right", flex: 0.8, paddingTop: 20 }}>
          <div> {rating} </div>
          <div> {votes} votes </div>
          <div> {reviews} reviews </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "right",
          padding: 15,
          borderTop: "1px solid black"
        }}
      >
        Order Online >
      </div>
    </div>
  );
};
