   import React from "react";
   import { BrowserRouter, Route, Routes } from 'react-router-dom'
   import Navbar from "./components/Navbar/Navbar";
   import Home from "./components/Home/Home"; 
   import Footer from "./components/Footer/Footer"; //Importar todas as telas


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

             </Routes>
         </BrowserRouter>

    )
   }
     



export default App;
