import { useState, useEffect } from 'react';
import  Papa  from 'papaparse';
import quotes from './quotes.csv';

const images = require.context('./backgrounds', true);
const imageList = images.keys().map(image => images(image));

function getURL(string){

  return "url("+string+")";

}

function getImage(){

  return imageList[Math.floor(Math.random()*imageList.length)];

}

function App() {

      const [quote, setQuote] = useState();

      const useablequotes = () => {Papa.parse(quotes, {
          download: true,
          complete: function(results) {
            setQuote(results.data[Math.floor(Math.random()*results.data.length)]);
          }
        });
      }

      const [backgroundURL, setBackgroundURL] = useState(getURL(getImage())); // getURL(picture1)

      /**
      const getThing = () => {
        fetch('https://jsonplaceholder.typicode.com/photos')
          .then(response => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
      })};**/

      
      useEffect(() => {

        useablequotes();
        document.body.style.backgroundImage = backgroundURL;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed"; 
        document.body.style.backgroundPosition = "center";
      

      }, [backgroundURL]);


      return (<div>

          <div class = 'content'><div class = "text">
            {quote}
          </div></div>

      </div>);

}

export default App;
