import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function Card({ deck }) {
  const [current, setCurrent] = useState(0);
  const card = deck.cards[current] || {};
  const [toggle, setToggle] = useState(false);
  const [display, setDisplay] = useState("");
  const [nextBtn, setNextBtn] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setDisplay(card.front);
  }, [card.front]);

  function flipHandler(event) {
    setToggle(!toggle);
    if (toggle) {
      setDisplay(card.front);
      setNextBtn(null);
    } else {
      setDisplay(card.back);
      setNextBtn(
        <button
          type="button"
          className="btn btn-primary ml-3"
          onClick={nextHandler}
        >
          Next
        </button>
      );
    }
  }

  function nextHandler(event) {
    if (current + 1 === deck.cards.length) {
      if (
        window.confirm(
          "Restart Cards? \n \n Click 'cancel' to return to the home page."
        )
      ) {
        setCurrent(0);
        setDisplay(card.front);
        setNextBtn(null);
        setToggle(false);
        return;
      } else {
        history.push("/");
      }
    }
    setCurrent(() => current + 1);
    setDisplay(card.front);
    setNextBtn(null);
    setToggle(false);
  }
  if (deck.cards.length < 3) {
    return (
      <>
        <h2 className="mt-4">Not enough cards.</h2>
        <p>
          {`You need at least 3 cards to study. There are ${deck.cards.length} cards in this deck.`}
        </p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Add Cards
        </Link>
      </>
    );
  }
  return (
    <div className="card w-75">
      <div className="card-body">
        <h5 className="card-title">{`Card ${current + 1} of ${
          deck.cards.length
        }`}</h5>
        <p className="card-text">{display}</p>
        <button
          type="button"
          onClick={flipHandler}
          className="btn btn-secondary"
        >
          Flip
        </button>
        {nextBtn}
      </div>
    </div>
  );
}