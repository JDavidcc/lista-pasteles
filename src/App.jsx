import { useEffect, useState } from "react";

const API_BASE = "http://74.208.112.10:5000/api/Catalogo/Pastel";

export default function App() {
  const [pasteles, setPasteles] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/obtener-pasteles`)
      .then((res) => res.json())
      .then((data) => setPasteles(data));
  }, []);

  const handleGuardar = () => {
    const pastel = {
      nombre,
    };
    if (editId) pastel.id = editId;

    fetch(`${API_BASE}/guardar-pastel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pastel),
    }).then(() => {
      setEditId(null);
      setNombre("");
      fetch(`${API_BASE}/obtener-pasteles`)
        .then((res) => res.json())
        .then((data) => setPasteles(data));
    });
  };

  const handleEditar = (pastel) => {
    setEditId(pastel.id);
    setNombre(pastel.nombre);
  };

  const handleEliminar = (id) => {
    fetch(`${API_BASE}/eliminar-pastel/${id}`, { method: "DELETE" }).then(() => {
      setPasteles(pasteles.filter((p) => p.id !== id));
    });
  };

  return (
    <div>
      <h1>lista de Pasteles</h1>
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <button onClick={handleGuardar}>{editId ? "Actualizar" : "Guardar"}</button>
      <ul>
        {pasteles.map((pastel) => (
          <li key={pastel.id}>
            {pastel.nombre}
            <button onClick={() => handleEditar(pastel)}>Editar</button>
            <button onClick={() => handleEliminar(pastel.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
