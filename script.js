
const filmes = [
  { id: 0, nome: 'Harry Potter', genero: 'fantasia', lancamento: 2001 },
  { id: 1, nome: 'Avatar', genero: 'fantasia', lancamento: 2010 },
  { id: 2, nome: 'O senhor dos Anéis', genero: 'fantasia', lancamento: 2000 },
  { id: 3, nome: 'Branquelas', genero: 'comédia', lancamento: 2007 },
  { id: 4, nome: 'A Lagoa Azul', genero: 'romance', lancamento: 1983 }
];


let filmesFavoritos = [];


const btn1 = document.querySelector('#adicionarFilme');
const listaFilmes = document.querySelector('#listaFilmes');


window.onload = () => {
  carregarFavoritosDoLocalStorage();
  renderizarLista();
}


const renderizarLista = () => {
  listaFilmes.innerHTML = ""; // Limpa a lista antes de renderizar
  filmes.forEach((filme) => {
    const itemLista = document.createElement('li');
    listaFilmes.append(itemLista);
    itemLista.innerHTML = `Meu filme: ${filme.nome}`;

    const favorito = document.createElement('img');
    const isFavorito = filmesFavoritos.find(fav => fav.id === filme.id);
    favorito.src = isFavorito ? 'img/heart-fill.svg' : 'img/heart.svg';

    favorito.style.cursor = 'pointer';
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme);
    });

    itemLista.append(favorito);
  });
}


const carregarFavoritosDoLocalStorage = () => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
}


btn1.addEventListener('click', () => {
  const inputUsuario = document.querySelector('#filmeInput');
  let id = filmes.length; // Define o próximo ID
  if (inputUsuario.value.trim()) {
    filmes.push({ id: id, nome: inputUsuario.value, genero: '', lancamento: '' });
    renderizarLista(); // Atualiza a lista
    inputUsuario.value = ''; // Limpa o campo de texto
  } else {
    alert('Por favor, insira o nome do filme.');
  }
});


const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  };

  if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
    eventoDeClique.target.src = favoriteState.favorited;
    saveToLocalStorage(objetoFilme);
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited;
    removeFromLocalStorage(objetoFilme.id);
  }
}


const saveToLocalStorage = (objetoFilme) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos.push(objetoFilme);
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
}


const removeFromLocalStorage = (id) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos = filmesFavoritos.filter(fav => fav.id !== id);
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos));
}
