import { useEffect, useState } from "react";

const API_URL = "http://74.208.112.10:5000/api/Catalogo/Pastel";

export default function App() {
  const [pasteles, setPasteles] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  // Obtener la lista de pasteles
  useEffect(() => {
    fetch(`${API_URL}/obtener-pasteles`)
      .then((res) => res.json())
      .then((data) => setPasteles(data));
  }, []);

  // Guardar o modificar un pastel
  const guardarPastel = () => {
    const pastel = {
      nombre,
      PrecioCompra: parseFloat(precioCompra),
      PrecioVenta: parseFloat(precioVenta),
    };
    if (idEditando) pastel.id = idEditando;

    fetch(`${API_URL}/guardar-pastel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pastel),
    }).then(() => {
      setIdEditando(null);
      setNombre("");
      setPrecioCompra("");
      setPrecioVenta("");
      actualizarLista();
    });
  };

  // Eliminar un pastel
  const eliminarPastel = (id) => {
    fetch(`${API_URL}/eliminar-pastel/${id}`, { method: "DELETE" }).then(() => {
      actualizarLista();
    });
  };

  // Actualizar la lista después de una acción
  const actualizarLista = () => {
    fetch(`${API_URL}/obtener-pasteles`)
      .then((res) => res.json())
      .then((data) => setPasteles(data));
  };

  // Cargar pastel en el formulario para editar
  const editarPastel = (pastel) => {
    setIdEditando(pastel.id);
    setNombre(pastel.nombre);
    setPrecioCompra(pastel.PrecioCompra);
    setPrecioVenta(pastel.PrecioVenta);
  };

  return (
    <div>
      <h1>Gestión de Pasteles</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio de compra"
        value={precioCompra}
        onChange={(e) => setPrecioCompra(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio de venta"
        value={precioVenta}
        onChange={(e) => setPrecioVenta(e.target.value)}
      />
      <button onClick={guardarPastel}>{idEditando ? "Actualizar" : "Agregar"}</button>

      <ul>
        {pasteles.map((pastel) => (
          <li key={pastel.id}>
            {pastel.nombre} - Compra: ${pastel.PrecioCompra} - Venta: ${pastel.PrecioVenta}
            <button onClick={() => editarPastel(pastel)}>Editar</button>
            <button onClick={() => eliminarPastel(pastel.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
