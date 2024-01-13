"use client";
import clientPromise from "@/lib/mongodb";
import { set } from "mongoose";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function Shocks() {
  const [shocks, setShocks] = useState<any>();
  const [marcaSelect, setMarcaSelect] = useState<any>();
  const [modeloSelect, setModeloSelect] = useState<any>();
  const [fechaSelect, setFechaSelect] = useState<any>();
  const [Umarcas, setUmarcas] = useState<[]>([]); //marcas unicas
  const [Umodelos, setUModelos] = useState<[]>([]); //modelos unicos
  const [Ufechas, setUFechas] = useState<[]>([]); //modelos unicos
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3000/api/amortiguador")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          // hacer el filtrado de datos que no se repita la informacion.
          const marcass = data.items.map((shock: any) => shock.Marca); //obtenemos todas las marcas
          // console.log(marcass);

          const uniqueMarcas = marcass.filter((value: any, index: any) => {
            return marcass.indexOf(value) === index;
          }); //filtramos las marcas que no se repitan

          // filtramos los modelos de acuerdo a la marca seleccionada
          const modelosU = data.items
            .filter((marca: any) => marca.Marca === marcaSelect)
            .map((mod: any) => mod.Modelo);

          const fechaFin = data.items
            .filter((marca: any) => marca.Marca === marcaSelect)
            .filter((modelo: any) => modelo.Modelo === modeloSelect)
            .map((fin: any) => fin.Fin);

          setUmarcas(uniqueMarcas); //seteamos las marcas
          setUModelos(modelosU); //seteamos los modelos
          setUFechas(fechaFin); //seteamos las fechas de fin
          setShocks(data);
        });
    };
    getTodos();
  }, [marcaSelect, modeloSelect, fechaSelect]); //cada vez que cambie la marca o modelo se ejecuta el useEffect

  // console.log(marcaSelect);
  // console.log(modeloSelect);
  // console.log(fechaSelect);
  console.log(marcaSelect + " " + modeloSelect + " " + fechaSelect)
 
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Articulos</h1>
      <p className="text-sm mb-2">
        <small>Amortiguadores disponibles</small>
      </p>
      {/* colocamos los combobox para marca, modelo y fecha de fin */}
      <div className="flex justify-between">
        {/* Marcas */}
        <div>
          <select
            onChange={(e) => {
              const marca = e.target.value.toString();
              setMarcaSelect(marca);
            }}
          >
            <option value="">----Marca----</option>
            {Umarcas?.map((marca: string, index: number) => (
              <option key={index} value={marca}>
                {marca}
              </option>
            ))}
          </select>
        </div>
        {/* Modelos */}
        <div>
          <select
            onChange={(e) => {
              const modelo = e.target.value.toString();
              setModeloSelect(modelo);
            }}
          >
            <option value="">----Modelo----</option>

            {Umodelos?.map((modelos: any, index: number) => (
              <option key={index}>{modelos}</option>
            ))}
          </select>
        </div>
        {/* Fecha de fin */}
        <div>
          <select
            // defaultValue={""}
            onChange={(e) => {
              const fecha = e.target.value.toString();
              setFechaSelect(fecha);
            }}
          >
            <option value="">----Fecha----</option>
            {Ufechas?.map((fechaFin: any, index: number) => (
              <option key={index}>{fechaFin}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="rounded-full bg-blue-500 text-white p-2 hover:bg-blue-700"
            onClick={() => {
              setMarcaSelect("");
              setModeloSelect("");
              setFechaSelect("");
            }}
          >
            Buscar
          </button>
        </div>
      </div>
      {/* mostrar datos */}
      {shocks ? (
        <ul className="list-disc pl-4">
          {shocks?.items.map((shock: any) => (
            <li key={shock._id} className="mb-4">
              <div className="bg-white shadow-md p-4 rounded-md">
                <h2 className="text-xl font-bold mb-2">
                  {shock.Marca} {shock.Modelo}
                </h2>
                <p className="text-gray-600 mb-2">{shock.Caracteristica}</p>
                <p className="text-sm text-gray-500 mb-2">{`Inicio: ${shock.Inicio} - Fin: ${shock.Fin}`}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
