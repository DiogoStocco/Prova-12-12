import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListarIMCs: React.FC = () => {
  const [imcs, setImcs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIMCs = async () => {
      try {
        const response = await axios.get("http://localhost:5168/imc/listar");
        setImcs(response.data);
      } catch (error) {
        alert("Erro ao carregar IMCs");
        console.error(error);
      }
    };

    fetchIMCs();
  }, []);

  const handleAlterar = (id: number) => {
    navigate('/imcs/alterar/${id}');
  };

  return (
    <div>
      <h1>Lista de IMCs</h1>
      <ul>
        {imcs.map((imc: any) => (
          <li key={imc.id}>
            {imc.id} - Usuário: {imc.usuario?.nome} - Altura: {imc.altura}m - Peso: {imc.peso}kg - 
            IMC: {imc.indice.toFixed(2)} - Categoria: {imc.categoria}
            <button onClick={() => handleAlterar(imc.id)}>Alterar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarIMCs;