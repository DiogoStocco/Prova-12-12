import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AlterarIMC: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [altura, setAltura] = useState<string>("");
  const [peso, setPeso] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:5168/imc/alterar/${id}`, {
        altura: parseFloat(altura),
        peso: parseFloat(peso),
      });
      alert("IMC atualizado com sucesso!");
      navigate("/imc/listar");
    } catch (error) {
      alert("Erro ao atualizar IMC");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Alterar IMC</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Altura em metros:</label>
          <input
            type="number"
            step="0.01"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Peso em quilos:</label>
          <input
            type="number"
            step="0.1"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </div>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default AlterarIMC;