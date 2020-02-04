import React,{useState,useEffect} from 'react';

import './styles.css';



function DevForm({onSubmit}){
    const [latitude,setLatitude]=useState('');
    const [longitude,setLongitude]=useState('');
    const [github_username,setGithub]=useState('');
    const [techs,setTechs]=useState('');

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude}=position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (erro) => {
            console.log(erro);
          },{
            timeout:30000
          }
        );
      },[]);

async function handleSubmit(e){
    e.preventDefault();
    await onSubmit({
        github_username,
        techs,
        latitude,
        longitude
      });

      setGithub('');
      setTechs('');
}

    return(
        <form onSubmit={handleSubmit}>

        <div className="input-block">
          <label htmlFor="github_username">Usuário do Github</label>
          <input 
            name="github_username" 
            id="github_username" 
            required 
            value={github_username}
            onChange={e=> setGithub(e.target.value)}

          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input 
            name="techs" 
            id="techs" 
            required 
            value={techs}
            onChange={e=> setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input 
              type="number" 
              name="latitude" 
              id="latitude" 
              value={latitude} 
              required 
              onChange={e => setLatitude(e.target.value)} 
            />
          </div>

          <div className="input-block">
            <label htmlFor="logitude">Longitude</label>
            <input 
              type="number" 
              name="logitude" 
              id="logitude" 
              value={longitude} 
              required
              onChange={e => setLongitude(e.target.value)} 
            />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
}

export default DevForm;