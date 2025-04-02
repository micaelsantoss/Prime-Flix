import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './search.css';
import api from "../../services/api";

function Search(){
    const [search, setSearch] = useState([])
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const value = queryParams.get('search');

        Search(value)

        async function Search(valor){
            const response = await api.get('/search/movie', {
                params: {
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    query: valor,
                    language: "pt-BR",
                    page: 1,
                }
            })

            if(response.data.results.length === 0){
                alert('erro'); 
            }else{
                setSearch(response.data.results.slice(0, 10));
            }

        }

}, [])

    return(
        
        <div className="container-search">

            <div className="lista-filmes-search">
        
                {search.map((filme) => {
                    return(
                        
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                        
                    )
                    
                })}
                    
            </div>
        </div>
    )
}

export default Search;