import React,{useEffect,useState} from 'react'
import "./RowPost.css"
import axios from '../../axios';
import {API_KEY, imageUrl } from '../../constants/constants';
import YouTube from 'react-youtube';


function RowPost(props) {
  const [list,setList] = useState([]);
  const [urlid,setUrlid] =useState("");
  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      console.log(response.data)
      setList(response.data.results);
    })
  },[props.url])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id)=>{
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data)
      if(response.data.results.length!==0){
        setUrlid(response.data.results[0])
      }else{
        alert("Array empty");
      }
    })
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {
          list.map((obj)=>
            <img onClick={()=>handleMovie(obj.id)} alt='poster' className={props.isSmall ? 'smallposter' : 'poster'} src={`${imageUrl+obj.backdrop_path}`}></img>
          )
        }
      </div>
      {urlid && <YouTube opts={opts} videoId={urlid.key} />}
    </div>
  )
}

export default RowPost
