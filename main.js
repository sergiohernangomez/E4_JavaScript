const form = document.getElementById("form")
const number = document.getElementById("number")
const button = document.getElementById("button")
const contenedor = document.getElementById("render")
const baseURL = "https://pokeapi.co/api/v2/pokemon"
const pesoEstatura = restar => (restar / 10)
const inputVacio = () =>{
    contenedor.innerHTML = `
    <div class="render-error">
        <h2 class="render-h2"> El contenedor esta vacio </h2>
        <h3 class="render-h3"> Por favor ingrese un numero </h3>
    </div> `;
};
const valorInexistente = () =>{
    contenedor.innerHTML = `
    <div class="render-error">
        <h2 class="render-h2"> Este pokemon no existe</h2>
        <h3 class="render-h3"> Por favor ingrese otro numero </h3>
    </div> `;
};
const getBuscarPokemonHtml = (render)=> {
    return `
    <div class="render-contenedor">
        <img src="${render.sprites.other.home.front_default}" class"render_img"/>
        <h2 class="render_nombre">${render.name.toUpperCase()}</h2>
        <h3 class="render_type">${render.types.map((tipo) =>{
        return`<span> ${tipo.type.name.toUpperCase()}`}).join("")} </span></h3>
        <h3 class="render_altura">Altura: ${pesoEstatura(render.height)} Mts </h3>
        <h3 class="render_peso">Peso: ${pesoEstatura(render.weight)} Kg </h3>
    </div>`
};
const traerPokemon = async (number) => {
    try {
    const response = await fetch(`${baseURL}/${number.value}`);
    const data = await response.json();
    return data;
    } catch (error) {
        valorInexistente()
        form.reset()   
    }
}
function recargar (){
    const devolver = JSON.parse(localStorage.getItem("pokemon")) || [];
    const devolverHtml = devolver.map(render => getBuscarPokemonHtml(render)).join(``);
    contenedor.innerHTML = devolverHtml;
} 

function init() { 
    recargar ()
    form.addEventListener("submit", async (evento)=> {
    evento.preventDefault();
    if (!number.value.length){
        inputVacio()
        return;
    }else {
    const BuscarPokemon = await traerPokemon(number)
    const pokemons = [BuscarPokemon]
    const renderHtml = pokemons.map(render => getBuscarPokemonHtml(render)).join(``)
    contenedor.innerHTML = renderHtml;
    localStorage.setItem("pokemon",JSON.stringify(pokemons))
    form.reset()
}       
}
)
}
init()