//Componente é um bloco isolado de html, js e css que não interfere no restante da aplicação
//Propriedade são informações que um componente Pai para para o componente Filho
//Estado Informações mantidas pelo componente

import React, {useState,useEffect} from 'react';
import api from './services/api'

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';



function App() {
const [devs,setDevs]= useState([]);




  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();

  },[]);

  async function handleAddDev(data){
    const response = await api.post('/devs',);
    setDevs([...devs,response.data]);
  }

  return (
    <div id="app">
      <aside>
      <strong>Cadastrar</strong>
      <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id}  dev={dev} />
          ))};

        </ul>
      </main>
    </div>
  );
}

export default App;
