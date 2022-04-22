import { useEffect, useState } from "react";
import "./styles.css";
import Loader from "./Loader";

export default function App() {
  const [quote, setQuote] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showQuote, setShowQuote] = useState([]);
  const api_url = "https://type.fit/api/quotes";

  const generateKeys = () => {
    let numArr = [];
    for (let index = 0; index < 4; index++) {
      let num = Math.floor(Math.random() * (1640 + 1));

      if (numArr.indexOf(num) === -1) {
        numArr.push(num);
      }
    }
    return numArr;
  };
  useEffect(() => {
    const getQuotes = async () => {
      const response = await fetch(api_url);
      const data = await response.json();
      setLoader(false);
      let keys = generateKeys();
      let newQuotes = [];
      keys.map((key) => {
        return newQuotes.push(data[key]);
      });
      setShowQuote(newQuotes);
      setQuote(data);
    };

    getQuotes();
  }, []);

  const handleRefresh = () => {
    let keys = generateKeys();
    let newQuotes = [];
    keys.map((key) => {
      return newQuotes.push(quote[key]);
    });
    setShowQuote(newQuotes);
  };
  return (
    <div className="App">
      <div className={"container"}>
        <div className={"header"}>
          <h1>Quotes</h1>
          <div className={"refresh"} onClick={handleRefresh}>
            {loader ? (
              ""
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/128/25/25429.png"
                alt="refresh"
              />
            )}
          </div>
        </div>
        {loader ? <Loader /> : ""}
        <ul>
          {showQuote.map((quote) => {
            return <li key={Math.random() * 100}>{quote.text}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
