import React, { useState, useEffect } from "react";
import axios from "axios";

interface Usuario 
{
  id: number;
  nome: string;
}

const CadastrarIMC: React.FC = () => {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioId, setUsuarioId] = useState<string>("");
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5168/imc/cadastrar", {
        altura: parseFloat(altura),
        peso: parseFloat(peso),
        usuarioId: parseInt(usuarioId),
      });
      alert("IMC cadastrado com sucesso!");
      console.log(response.data);
    } catch (error) {
      alert("Erro ao cadastrar IMC");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cadastrar IMC</h1>
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
        <div>
          <label>Usuário:</label>
          <select
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            required
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nome} 
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarIMC;