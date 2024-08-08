import React, { useEffect, useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import "./Banner.css"
import axios from '../../axios'

function Banner() {
  const [movies,setMovies] = useState();
  useEffect(() => {
    let isMounted = true; // Flag to check if component is mounted
    axios.get(`/trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (isMounted) {
          const movies = response.data.results;
          const randomIndex = Math.floor(Math.random() * movies.length);
          console.log(movies[randomIndex]);
          setMovies(movies[randomIndex]);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    return () => {
      isMounted = false; // Cleanup to prevent state update if component unmounts
    };
  }, []);

  return (
    <div className='banner' style={{backgroundImage: `Url(${movies ? imageUrl+movies.backdrop_path:""})` }}>
        <div className='content'>
            <h1 className='title'>{movies ? (movies.title ? movies.title : movies.name) : ""}</h1>
            <div className='banner_buttons'>
                <button className='button'>Play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='description'>{movies ? movies.overview : ""}</h1>
        </div>
      <div className="fade"></div>
    </div>
  )
}

export default Banner