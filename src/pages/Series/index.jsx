import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Serie(){
    const {id} = useParams();
    const [serie, setSerie] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadSerie() {
            await api.get(`/tv/${id}`,{
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    language: "pt-BR",
                }
            }) 
            .then((response) => {
                    setSerie(response.data);
                    setLoading(false);
            })
            .catch(() => {
                console.log('Deu errado :(')
                navigate(`/serie/${serie.id}`, {replace: true})
                return;
            })
            
        }
        
        loadSerie();

    }, [navigate, id]);

    function salvarSerie(){
        const minhaLista = localStorage.getItem("@primeflix-series");

        let seriesSalvos = JSON.parse(minhaLista) || [];

        const hasSerie = seriesSalvos.some((seriesSalvo) => seriesSalvo.id === serie.id)

        if(hasSerie){
            alert("ESSA SERIE JÁ ESTÁ NA LISTA");
            return;
        }

        seriesSalvos.push(serie);
        localStorage.setItem("@primeflix-series", JSON.stringify(seriesSalvos));
        alert("SERIE SALVA COM SUCESSO")
    }
    
    if(loading){
        <div className="serie-info">
            <h1>Carregando detalhes...</h1>
        </div>
    }

    return(
        <div className="serie-info">
            <h1>{serie.original_name}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${serie.backdrop_path}`} alt="" />
            <h3>Sinopse:</h3> <br />
            <p>{serie.overview}</p>
            <strong>{`Nota: ${Number(serie.vote_average).toFixed(1)} / 10`}</strong>

            <div className="area-butons">
                <button onClick={salvarSerie}>Salvar</button>
                <button>
                    <a href={`http://youtube.com/results?search_query=trailer ${serie.original_name}`} target="blank"  rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Serie;
