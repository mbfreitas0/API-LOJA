import React, {useState, useEffect} from "react";
import Axios from "axios";
import './App.css';

function App() {

  const [movieName, setMovieName] = useState("")
  const [review, setReview] = useState("")
  const [moveReviewList, setMovieList] = useState([])
  const [newReview, setNewReview] = useState("")
  
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  },[]); 


  const submitReview = () => {
    
    Axios.post ("http://localhost:3001/api/insert",{
      movieName: movieName,
      movieReview: review,
  }).then( () => {
    alert("Successfull insert!");
  });   
      setMovieList([...moveReviewList, {movieName:movieName, movieReview:review}]);
   };

   const deleteReview = (movie) => {
     Axios.delete (`http://localhost:3001/api/delete/${movie}`);
    };

    const updateReview = (movie) => {
      Axios.put ("http://localhost:3001/api/update/", {
        movieName: movie,
        movieReview: newReview, 
      });
      setNewReview("");
     }; 

   
  return (
    <div className="App">
      <h1>A SUA SÉRIE FAVORITA</h1>

      <div className="form">  
      <label>Nome da Série:</label>
      <input type="text" name="movieName" onChange={(e) => {
        setMovieName (e.target.value)
      }}/>
      <label>Sua Opinião:</label>
      <input type="text" name="review" onChange={ (e) => {
        setReview (e.target.value)
      }}/>

        <button onClick={submitReview}>Enviar</button>
        <br />

        {moveReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button onClick={ () => {deleteReview(val.movieName)}}>Delete</button>
              <input type="text" id="updateInput" onClick={ (e) =>  {
                setNewReview(e.target.value)
              }}/>
              <button onClick={ () => {updateReview(val.movieName)}}>Update</button>
             
            </div>
          );
        })}
        
      
      </div>
      </div>
  );
    
      }

export default App;
