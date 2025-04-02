import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Filme from './pages/Filmes'
import Serie from './pages/Series'
import Erro from './pages/Erro'
import Favoritos from './pages/Favoritos';
import Search from './pages/Search';

import Header from './components/Header'; 


function RoutesApp(){
    return(
        <BrowserRouter >
            <Header/>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/Filme/:id' element={ <Filme/> }/>
                <Route path='/Serie/:id' element={ <Serie/> }/>
                <Route path='/Favoritos' element={ <Favoritos/> }/>
                <Route path='/Search' element={ <Search/> }/>

                
                <Route path='*' element={ <Erro/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;