import React from "react";
import data from "../db.json";
import { RestaurantCard } from "./RestarentsCard";

export default class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRating: 0,
      paymentMethod: "all",
      sortMethod: null,
      activePage: 1,
      perPage: 5
    };
  }
  handleRating = (rating) => {
    this.setState({
      filterRating: rating
    });
  };
  handlePayment = (payment) => {
    this.setState({
      paymentMethod: payment
    });
  };
  handleSort = (order) => {
    this.setState({
      sortMethod: order
    });
  };
  handlePageChange = (page) => {
    this.setState({
      activePage: page
    });
  };

  filterLogic = ({ rating, payment_methods }, index) => {
    const { paymentMethod, filterRating, activePage, perPage } = this.state;

    const { cash, card } = payment_methods;
    let paymentCondition = true;
    if (paymentMethod === "cash") {
      paymentCondition = cash ? true : false;
    } else if (paymentMethod === "card") {
      paymentCondition = card ? true : false;
    }

    // pagination
    const offset = (activePage - 1) * perPage;
    const pageCondition = index >= offset && index < offset + perPage;

    return rating >= filterRating && paymentCondition && pageCondition;
  };

  render() {
    const { sortMethod, activePage, perPage } = this.state;
    const totalPages = Math.ceil(data.length / perPage);
    return (
      <>
        <h3> List </h3>
        {new Array(totalPages).fill(0).map((a, i) => (
          <button key={i} onClick={() => this.handlePageChange(i + 1)}>
            {i + 1}
          </button>
        ))}
        <div>
          {[4, 3, 2, 1, 0].map((rating) => (
            <button key={rating} onClick={() => this.handleRating(rating)}>
              {rating === 0 ? "All" : rating + " and above"}
            </button>
          ))}
        </div>
        <div>
          {["cash", "card", "all"].map((method) => (
            <button key={method} onClick={() => this.handlePayment(method)}>
              {method}
            </button>
          ))}
        </div>
        <div>
          {["asc", "desc"].map((order) => (
            <button key={order} onClick={() => this.handleSort(order)}>
              {order}
            </button>
          ))}
        </div>
        <div>
          {data &&
            data
              ?.filter(this.filterLogic)
              .sort((a, b) => {
                if (sortMethod === null) {
                  return 0;
                }
                if (sortMethod === "asc") {
                  return a.costForTwo - b.costForTwo;
                }
                if (sortMethod === "desc") {
                  return b.costForTwo - a.costForTwo;
                }
              })
              .map((item) => <RestaurantCard data={item} key={item.id} />)}
        </div>
      </>
    );
  }
}
