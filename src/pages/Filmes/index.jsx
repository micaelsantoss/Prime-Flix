import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filmes.css'
import { toast } from "react-toastify";

function Filme(){
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    //const [trailer, setTrailer] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
       /* async function carregarTrailer() {
            await api.get(`https://api.themoviedb.org/3/movie/1125899/videos?api_key=db744f0ab09663b7c3961c079759a65b&language=pt-BR&page=1"`, {
            })
            .then((response) => {
                setTrailer(response)
                console.log(response)
            })
            .catch(() => {
                alert('deu erro')
            })
        } 

        carregarTrailer(); */

        async function loadFilme() {
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "db744f0ab09663b7c3961c079759a65b",
                    language: "pt-BR",
                }
            }) 
            .then((response) => {
                    setFilme(response.data);
                    console.log(response)
                    setLoading(false);
            })
            .catch(() => {
                console.log('Deu errado :(')
                navigate(`/serie/${filme.id}`, {replace: true})
                return;
            })
            
        }
        
        loadFilme();

    }, [navigate, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("ESSE FILME JÁ ESTÁ NA LISTA");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("FILME SALVO COM SUCESSO");
    }
    
    if(loading){
        <div className="filme-info">
            <h1>Carregando detalhes...</h1>
        </div>
    }

    return(
        <div className="container-filme" id="container-filme">
            <div className="imgfundo">
                <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="" />
            </div>
            <div className="informacoes"> 
                <div className="itens">
                    <h1>{filme.title}</h1> <br />
                    <h3>Sinopse:</h3> 
                    <p>{filme.overview}</p><br />
                    <strong>{`Nota: ${Number(filme.vote_average).toFixed(1)} / 10`}</strong> <br />
                    <div className="area-butons">

                        <a onClick={salvarFilme}>Salvar</a>       
                        <a href={`http://youtube.com/results?search_query=trailer ${filme.title}`} target="blank"  rel="external">
                            Trailer
                        </a>
                
                    </div> 
                </div>
                <img src={`http://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="" />  
            </div>
        </div>
    )
    
}

export default Filme;

  /* <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="blank"  rel="external">
                        Trailer
                    </a> */