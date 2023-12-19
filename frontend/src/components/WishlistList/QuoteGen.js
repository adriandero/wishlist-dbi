import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function QuoteGen() {
  const [quote, setQuote] = useState("");

  const keanuReevesQuotes = [
    "I know that the ones who love us will miss us. - Keanu Reeves",
    "Falling in love and having a relationship are two different things. - Keanu Reeves",
    "I try not to think about my life. I have no life. I need therapy. - Keanu Reeves",
  ];

  const ryanReynoldsQuotes = [
    "I've always been someone who's been kind of hard on myself. It might be a Canadian thing. - Ryan Reynolds",
    "I'm not a control freak. I'm just passionate. - Ryan Reynolds",
    "I'm really over looking at people squeezed into their jeans. I don't want to know that much about anybody! - Ryan Reynolds",
  ];

  const wishlistReviews = [
    "I love how easy it is to organize my wishes on this website!",
    "Creating wishlists has never been more enjoyable – great user experience!",
    "The wishlist feature is a game-changer for keeping track of gift ideas.",
    "Intuitive design and seamless functionality make wishlist creation a breeze.",
    "My friends and family appreciate the wishlist links for special occasions – super convenient!",
    "The ability to categorize and share wishlists makes gift-giving so much simpler.",
    "I've tried other wishlist platforms, but this one stands out for its simplicity and effectiveness.",
    "Kudos to the developers for a user-friendly interface and responsive design.",
    "This website has become my go-to for all things wishlist-related – highly recommended!",
    "The wishlist notifications keep me updated on items I've been eyeing – a nice touch!",
  ];

  // Combine both arrays
  const combinedQuotes = [...keanuReevesQuotes, ...ryanReynoldsQuotes];

  const handleNewQuoteClick = () => {
    // Fetch and set a new random quote
    const randomQuote =
      wishlistReviews[Math.floor(Math.random() * wishlistReviews.length)];
    setQuote(randomQuote);
  };

  const handleNewBeautyQuoteClick = () => {
    // Fetch and set a new random quote
    const randomQuote =
      combinedQuotes[Math.floor(Math.random() * combinedQuotes.length)];
    setQuote(randomQuote);
  };

  const handleCancel = () => {
    setQuote("");
  };

  return (
    <div>
      <Button onClick={handleNewQuoteClick} sx={{ m: 2 }}>
        Get Review
      </Button>
      <Button onClick={handleNewBeautyQuoteClick}>Get Beauty</Button>
      <Button onClick={handleCancel} sx={{ m: 2 }}>
        stop
      </Button>

      <blockquote>
        <p>{quote}</p>
      </blockquote>
    </div>
  );
}
