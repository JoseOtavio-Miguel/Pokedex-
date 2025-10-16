# 🧭 Pokédex Interativa com PokéAPI

Este projeto é uma **Pokédex web interativa**, desenvolvida em **HTML, CSS e JavaScript puro**, que consome dados em tempo real da [PokéAPI v2](https://pokeapi.co/).  
A aplicação exibe informações detalhadas sobre os Pokémon, como **tipos, habilidades, altura, peso, gênero e estatísticas base (Base Stats)** — tudo em um layout organizado com **abas navegáveis**.

---

## 🚀 Funcionalidades

✅ Listagem dos Pokémon com imagens e tipos  
✅ Exibição detalhada de cada Pokémon ao clicar  
✅ Abas interativas:
- **About:** informações gerais (altura, peso, habilidades, gênero etc.)
- **Base Stats:** mostra os atributos (HP, Attack, Defense, etc.) com barras coloridas
- **Evolution:** espaço reservado para futuras evoluções
- **Moves:** espaço reservado para movimentos

✅ Conversão automática:
- **Altura:** metros → centímetros e pés  
- **Peso:** quilogramas → libras  

✅ Interface responsiva e moderna  
✅ Dados consumidos diretamente da **PokéAPI**

---

## 🧱 Estrutura do Projeto

📁 pokedex/
│
├── 📄 index.html
├── 📄 style.css
├── 📄 script.js
├── 📄 pokemon-model.js
└── 📄 README.md


---

## ⚙️ Tecnologias Utilizadas

- **HTML5**
- **CSS3 (Flexbox e animações)**
- **JavaScript (ES6+)**
- **PokéAPI v2** → [https://pokeapi.co/api/v2/](https://pokeapi.co/api/v2/)

---

## 🧩 Estrutura das Classes

### `Pokemon`
Representa um Pokémon individual.
```js
class Pokemon {
  name;
  num;
  type;
  types = [];
  photo;
  height;
  weight;
  abilities = [];
  egg_groups = [];
  gender;
  stats = []; // { base_stat, stat: { name } }
}

💡 Próximos Passos

 📦 Implementar a aba Evolution com dados da evolution-chain

 📦 Exibir moves do Pokémon

 📦 Adicionar modo escuro (dark mode)

 📦 Adicionar campo de busca por nome ou ID

🧠 Créditos

  🧑‍💻 Dados fornecidos por PokéAPI [ pokeapi.co ]

  🧑‍💻 Layout inspirado no estilo da Pokémon Database / Pokédex oficial

  🧑‍💻 Desenvolvido por [José Otávio dos Santos Miguel]

📄 Licença

  Este projeto é de código aberto, licenciado sob a MIT License — você pode usar, modificar e distribuir livremente.
