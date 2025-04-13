   import React from "react";
   import { BrowserRouter, Route, Routes } from 'react-router-dom'
   import Navbar from "./components/Navbar/Navbar";
   import Home from "./components/Home/Home"; 
   import Footer from "./components/Footer/Footer"; //Importar todas as telas
   import Politica from "./components/Politica/Politica";
   import Login from "./components/Login/Login";


   const Inicial = () =>{      {/*conjunto de telas*/}
    return(
        <div>
        <Navbar/>
        <Home/>
        <Footer/>
        </div>
    )
   }
    
      {/*Função para exportar tudo depois */} 
       function App () {  
          return (
          <BrowserRouter>   
             <Routes> {/*Rotas*/}
                  <Route path='/' element={<Inicial/>}/>
                  <Route path='/Politica'  element={<Politica/>}/>
                  <Route path='/Bottom'  element={<Inicial/>}/>
                  <Route path='/Entrar'  element={<Login/>}/>


             </Routes>
         </BrowserRouter>

    )
   }
     


     



export default App;
