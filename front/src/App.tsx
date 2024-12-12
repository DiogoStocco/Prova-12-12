import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ListarUsuarios from "./components/ListarUsuarios";
import CadastrarUsuario from "./components/CadastrarUsuario";
import ListarIMCs from "./components/ListarIMCs";
import CadastrarIMC from "./components/CadastrarIMC";
import AlterarIMC from "./components/AlterarIMC";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/usuarios/cadastrar">Cadastrar Usuário</Link></li>
            <li><Link to="/usuarios">Listar Usuários</Link></li>
            <li><Link to="/imcs/cadastrar">Cadastrar IMC</Link></li>
            <li><Link to="/imcs">Listar IMCs</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ListarUsuarios />} />
          <Route path="/usuarios" element={<ListarUsuarios />} />
          <Route path="/usuarios/cadastrar" element={<CadastrarUsuario />} />

          <Route path="/imcs" element={<ListarIMCs />} />
          <Route path="/imcs/cadastrar" element={<CadastrarIMC />} />
          <Route path="/imcs/alterar/:id" element={<AlterarIMC />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;