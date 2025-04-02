import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './favoritos.css'
import { toast } from "react-toastify";

function Favoritos(){
    const [filmes, setFilmes] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []); 

        const minhaListaSeries = localStorage.getItem("@primeflix-series");
        setSeries(JSON.parse(minhaListaSeries) || []);

    },[])

    function removeFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return(item.id !== id)
        })

        setFilmes(filtroFilmes);

        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
        toast.success('Filme removido com sucesso!');

    }

    function removeSerie(id){
        let filtroSeries = series.filter((item) => {
            return(item.id !== id)
        })

        setSeries(filtroSeries);

        localStorage.setItem("@primeflix-series", JSON.stringify(filtroSeries))

    }

    return(
        <div className="favoritos">
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo!</span>}
            
            <ul>
                {filmes.map((filme) => {
                    return(
                        <div className="favoritos-lista">
                            <div key={filme.id} className="conteudo">
                                <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="" />
                                <div className="info">
                                    <span>{filme.title} </span>
                                    <Link to={`/filme/${filme.id}`}>Ir ao Filme</Link>
                                    <button onClick={() => removeFilme(filme.id)}>Remover</button>
                                </div>
                            </div>
                        </div> 
                    )
                })}
            </ul>

            <h1>Minhas Séries</h1>
            {series.length === 0 && <span>Você não possui nenhunha série salva!</span>}
            
            <ul>
                {series.map((serie) => {
                    return(
                        <div className="favoritos-lista">
                            <li key={serie.id}>
                                <div className="conteudo">
                                    <img src={`http://image.tmdb.org/t/p/original/${serie.backdrop_path}`} alt="" />
                                    <div className="info">
                                        <span>{serie.original_name} </span>
                                        <Link to={`/serie/${serie.id}`}>Ir a Série</Link>
                                        <button onClick={() => removeSerie(serie.id)}>Remover</button> 
                                    </div>
                                </div>     
                            </li>
                        </div> 
                    )
                })}
            </ul>
                   
        </div>
    )
}

export default Favoritos;