let lastQuoteIndex = -1; // Store the index of the last quote to avoid repetition

function generateQuote() {
  const quotes = [
    { text: "The best revenge is massive success.", author: "Frank Sinatra" },
    { text: "It's not what happens to you, but how you react to it that matters.", author: "Epictetus" },
    { text: "Do not take life too seriously. You will not get out alive.", author: "Elbert Hubbard" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzy" },
    { text: "Do not take life too seriously. You will not get out alive.", author: "Elbert Hubbard" },
    { text: "Resentment is like drinking poison and waiting for your enemies to die.", author: "Nelson Mandela" }
  ];

  let randomIndex;
  
 
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastQuoteIndex);

  lastQuoteIndex = randomIndex; 

  const randomQuote = quotes[randomIndex];

 
  document.getElementById("quote").textContent = `"${randomQuote.text}"`;
  document.getElementById("author").textContent = `-- ${randomQuote.author}`;


  localStorage.setItem("selectedQuote", JSON.stringify(randomQuote));
}

function loadQuote() {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");

  quoteElement.textContent = "";
  authorElement.textContent = "";


  localStorage.removeItem("selectedQuote");
}
window.onload = loadQuote;
