// Terral Toole Sandee Assignment

import React, { useState, useEffect } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const App = () => {
  const [myOptions, setMyOptions] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  const getUserPhotos = (userId) => {
      fetch(`https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=146c0f89da4a1daf2d2d91c8c9cc530f&user_id=${userId}&format=json&nojsoncallback=1&extras=url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o`)
      .then((response) => response.json())
      .then((response) => {
          if (response.photos.photo.length) {
          setUserPhotos(response.photos.photo);
          } else {
              alert('No photos for that user!');
          }
      })
};

const searchUsername = () => {
    
    if (username) {
        
        fetch(`https://www.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=146c0f89da4a1daf2d2d91c8c9cc530f&username=${encodeURIComponent(username)}&format=json&nojsoncallback=1&extras=url_l`)
        .then((response) => response.json())
        .then((response) => {
            if (response.user) {
                setUser(response.user);
            } else {
                alert('That username does not exist')
            }
        })
    } else {
        
        alert('You must enter a username to search!')
    }

}

  useEffect(() => {
      if (user) {
          console.log("User: ", user);
          getUserPhotos(user.id);
      }
  }, [user])

  useEffect(() => {
      setUserPhotos([]);
  }, [username]);

  return (
    <div style={{ marginTop: "70px" }}>
      <h3 style={{ margin: '0 auto', textAlign: 'center' }} > Search Flickr </h3>
      <Autocomplete
        style={{ width: 500, margin: '0 auto' }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => (
            <>
          <TextField
            {...params}
            onChange={(e) => {
                const { value } = e.target;
                setUsername(value);
            }}
            value={username}
            variant="outlined"
            label="Search"
          />
          <button onClick={searchUsername}>
              Search
              </button>
              </>
        )}
      />{" "}
      {/*  */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto', width: '80%' }}>
      {userPhotos.splice(-10).map(({ id, url_l, url_m, url_n, url_o }) => (
        <img src={url_l || url_m || url_n || url_o} key={id} style={{ width: '500px', height: '500px', objectFit: 'cover' }} />
      ))}
          </div>
    </div>
  );
};

export default App;
