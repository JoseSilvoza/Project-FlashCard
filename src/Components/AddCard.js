import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

export default function AddCard() {
  const { params, url } = useRouteMatch();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    const ac = new AbortController();
    async function getDeck() {
      const response = await readDeck(params.deckId, ac.signal);
      setDeck(() => response);
    }
    getDeck();
    return () => ac.abort();
  }, [params.deckId]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${params.deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {"Add Card"}
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <CardForm params={params} url={url} />
    </>
  );
}