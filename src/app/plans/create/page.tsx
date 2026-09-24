"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPlan } from "@/services/auth";
import { getSession } from "@/services/session";

export default function CreatePlanPage() {
  const router = useRouter();
  const [foto, setFoto] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Validaciones
    if (nombre.length < 2 || nombre.length > 50) {
      setError("El nombre debe tener entre 2 y 50 caracteres");
      return;
    }

    if (parseFloat(precio) <= 0) {
      setError("El precio estimado debe ser mayor a 0");
      return;
    }

    if (!Number.isInteger(parseFloat(duracion))) {
      setError("La duración debe ser un número entero");
      return;
    }

    if (descripcion.length >= 600) {
      setError("La descripción del plan debe tener menos de 600 caracteres");
      return;
    }

    try {
      const idsession = getSession().id;
      if (!idsession) {
        setError("Debes iniciar sesión para crear un plan");
        return;
      }

      const name = nombre;
      const description = descripcion;
      const estimatedPrice = parseFloat(precio);
      const estimatedTime = parseInt(duracion);
      const recommendations = recomendaciones;
      const address = direccion;
      const image = foto;

      console.log("Datos del plan a enviar:", { name, description, estimatedPrice, estimatedTime, recommendations, address, image });
      console.log("ID de sesión:", idsession);

      const newPlan = await createPlan(idsession, name, description, estimatedPrice, estimatedTime, recommendations, address, image);
      console.log("Plan creado:", newPlan);
      router.push("/plans");
    } catch (error) {
      console.error("Error al crear el plan:", error);
      setError(error instanceof Error ? error.message : "Error al crear el plan");
    }


  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-5xl font-bold text-slate-900 mt-6">Crear un nuevo plan</h1>
      <p className="text-lg text-slate-600 mt-2">
        Organiza, invita a tus amigos o abre plazas para que otros miembros se sumen....
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 mt-10 w-full max-w-md"
      >
        <label className="block text-sm font-semibold text-slate-700">
          Foto de portada del plan
        </label>
        <input
          id="foto"
          type="url"
          name="foto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
        />

        <label className="block text-sm font-semibold text-slate-700 mt-4">
          Nombre del plan
        </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
        />

        <label className="block text-sm font-semibold text-slate-700 mt-4">
          Dirección
        </label>
        <input
          id="direccion"
          type="text"
          name="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
        />

        <label className="block text-sm font-semibold text-slate-700 mt-4">
          Precio estimado
        </label>
        <input
          id="precio"
          type="number"
          name="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
        />

        <label className="block text-sm font-semibold text-slate-700 mt-4">
          Duración (minutos)
        </label>
        <input
          id="duracion"
          type="number"
          name="duracion"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
        />

        <label className="block text-sm font-semibold text-slate-700 mt-4">
          Descripción del plan
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
        />

        <label className="block text-sm font-semibold text-slate-700 mt-4">
          Recomendaciones para los asistentes
        </label>
        <textarea
          id="recomendaciones"
                  name="recomendaciones"
                  value={recomendaciones}
                  onChange={(e) => setRecomendaciones(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                />
        
            {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

            <div className="flex justify-end mt-8"> 
                <button
                type="button"
                className="w-full bg-gray-700 text-white font-semibold rounded-xl py-4 mt-8"
                >
                Cancelar
                </button>

                <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold rounded-xl py-4 mt-8"
                >
                Crear Plan
                </button>
            </div>
      </form>
    </div>
  );
}