import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

export default function CreateDeck() {
  const history = useHistory();
  const initialState = {
    name: "",
    description: "",
  };
  const [data, setData] = useState({ ...initialState });
  const changeHandler = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  function submitHandler(event) {
    event.preventDefault();
    const ac = new AbortController();
    let id = 0;

    createDeck(data, ac.signal)
      .then((response) => {
        id = response.id;
        history.push(`/decks/${id}`);
      })
      .catch((err) => console.log(err));
    setData({ ...initialState });
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={changeHandler}
            value={data.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Brief description of the deck"
            rows="4"
            name="description"
            onChange={changeHandler}
            value={data.description}
          />
        </div>
        <Link to={"/"} className="btn btn-secondary mr-2">
          Cancel
        </Link>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}