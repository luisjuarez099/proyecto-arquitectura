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
  const [message, setMessage] = useState("");
  const [countInTimeout, setCountInTimeout] = useState(0);
  const [dataFilter, setDataFilter] = useState([]); //creamos nuestro useState para actualizar nuestros datos filtrados
  const [Umarcas, setUmarcas] = useState<[]>([]); //marcas unicas
  const [Umodelos, setUModelos] = useState<[]>([]); //modelos unicos
  const [Ufechas, setUFechas] = useState<[]>([]); //modelos unicos
  //time out para la alerta de que no hay informacion****************
  useEffect(() => {
    const time = setTimeout(() => {
      setMessage("No se encontraron pedidos");
      setCountInTimeout(countInTimeout + 1);
    }, 1000);
    return () => clearTimeout(time);
  }, [countInTimeout]);
  //**************************************************************** */
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3000/api/amortiguador")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          //********************************** */
          // hacer el filtrado de datos que no se repita la informacion.
          const marcass = data.items.map((shock: any) => shock.Marca); //obtenemos todas las marcas
          // console.log(marcass);

          const uniqueMarcas = marcass.filter((value: any, index: any) => {
            return marcass.indexOf(value) === index;
          }); //filtramos las marcas que no se repitan

          //********************************** */
          // filtramos los modelos de acuerdo a la marca seleccionada
          const modelosU = data.items
            .filter((marca: any) => marca.Marca === marcaSelect)
            .map((mod: any) => mod.Modelo);
          const uniqueModelos = modelosU.filter((value: any, index: any) => {
            return modelosU.indexOf(value) === index;
          }); //filtramos los modelos que no se repitan
          console.log(modelosU);
          //********************************** */
          const fechaFin = data.items
            .filter((marca: any) => marca.Marca === marcaSelect)
            .filter((modelo: any) => modelo.Modelo === modeloSelect)
            .map((fin: any) => fin.Inicio);

          setUmarcas(uniqueMarcas); //seteamos las marcas
          setUModelos(uniqueModelos); //seteamos los modelos
          setUFechas(fechaFin); //seteamos las fechas de fin
          setShocks(data);
        });
    };
    getTodos();
  }, [marcaSelect, modeloSelect, fechaSelect]); //cada vez que cambie la marca o modelo se ejecuta el useEffect

  //filtramos los datos de acuerdo a la marca, modelo y fecha de fin
  const getData = (marcaS: any, modeloS: any) => {
    fetch("http://localhost:3000/api/amortiguador")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let datas = data.items.filter(
          (item: any) => item.Marca === marcaS && item.Modelo === modeloS
        );
        console.log(datas);
        setDataFilter(datas);
      });
  };
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
            defaultValue={marcaSelect}
            onChange={(e) => {
              const marca = e.target.value.toString();
              setMarcaSelect(marca);
            }}
          >
            <option value="">----Marca----</option>
            {Umarcas?.map((marca: string, index: number) => (
              <option key={index}>{marca}</option>
            ))}
          </select>
        </div>
        {/* Modelos */}
        <div>
          <select
            defaultValue={modeloSelect}
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
        {/* <div>
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
        </div> */}
        <div>
          <button
            type="submit"
            className="rounded-full bg-blue-500 text-white p-2 hover:bg-blue-700"
            onClick={() => {
              // setMarcaSelect(""); //seteamos las marcas
              // setModeloSelect(""); //seteamos los modelos
              getData(marcaSelect, modeloSelect);
            }}
          >
            Buscar
          </button>
        </div>
      </div>
      <div></div>
      {/* mostrar datos */}
      <div className=" max-w-sm p-6 bg-white border border-gray-200 mt-3 mb-10 rounded  shadow-md  w-full ml-10">
      {countInTimeout > 0 ? (  <div>
          {dataFilter.map((val: any, index) => (
            <div key={index}>
              <div>
                
              </div>
              <div className="flex flex-col">
                <div>
                  <p>Modelo: {val.Modelo}</p>
                  <p>Marca: {val.Marca}</p>
                </div>
                <div>
                  <p>Inicio: {val.Inicio}</p>
                  <p>Fin: {val.Fin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>) : (
          <div>
            <p>{message}</p>
          </div>
        )}
      
      </div>
    </div>
  );
}
