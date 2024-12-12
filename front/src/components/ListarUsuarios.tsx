import React, { useEffect, useState } from "react";
import axios from "axios";

const ListarUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5168/usuario/listar");
        setUsuarios(response.data);
      } catch (error) {
        alert("Erro ao carregar usuários");
        console.error(error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((usuario: any) => (
          <li key={usuario.id}>
            {usuario.id} - {usuario.nome} - {usuario.sobrenome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarUsuarios;
