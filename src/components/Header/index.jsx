import { Link,  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './style.css';

function Header(){
    const [query, setQuery] = useState();

    const navigate = useNavigate();

    function valueSearch(){
        if(query == undefined){
            alert('Por favor, digite o nome do filme desejado');  
        }else{
           
            navigate(`/Search?inputValue=${query}`)
        }     
    }

    const handleChange= (e) => {
        setQuery(e.target.value);
    };
    
    return(
        <header>
            <Link className='logo' to='/'>Prime Flix</Link>
            <div className='blocodireita'>
                <div className="search">                            
                    <form >
                        <input 
                            id='value-search' 
                            type="text" 
                            name='search' 
                            placeholder='Pesquisar'
                            onChange={handleChange}
                        />
                            
                        <button type='submit' onClick={valueSearch}>Buscar</button>                 
                    </form>                     
                </div>
                <Link className='favoritos' to='/Favoritos'>Minha Lista</Link >  
            </div>
        </header>
    )
}

export default Header;