import React from 'react';

import {useEffect} from 'react';
import axios from 'axios';


const Showspage = () => {

  let baseUrl = 'https://imdb8.p.rapidapi.com/auto-complete';
  let apikey = '79dbda4576msh0d80bf6c42d69b8p12986cjsn0c3250dfa9b7';

  useEffect(() => {

    axios.get(baseUrl,{
      params: {
        q: 'game of thr'
      },
      headers: {
        'x-rapidapi-host': 'imdb8.p.rapidapi.com',
        'x-rapidapi-key': apikey

      }
    }).then((response) => {

      alert("response: " + JSON.stringify(response));
    })


  }, []);

  return (
    <div>
      <h1>Showpage</h1>
    </div>
  );
};

export default Showspage;
