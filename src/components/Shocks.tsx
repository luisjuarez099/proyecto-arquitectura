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
  const [kyss, setKyss] = useState<any>([]);
  const [valss, setValss] = useState<any>([]);
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
          setKyss(Object.keys([])); //obtenemos los encabezados de la tabla
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
          console.log("modelos unicos");
          console.log(modelosU);
          //********************************** */
          const fechaFin = data.items
            .filter((marca: any) => marca.Marca === marcaSelect)
            .filter((modelo: any) => modelo.Modelo == modeloSelect)
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
          (item: any) => item.Marca === marcaS && item.Modelo == modeloS
        );
        for (let i = 0; i < datas.length; i++) {
          setKyss(Object.keys(datas[i])); //obtenemos los encabezados de la tabla
          setValss(Object.values(datas[i])); //obtenemos los valores de la tabla
        }
        console.log("datos filtrados");
        console.log(datas);
        setDataFilter(datas);
      });
  };

  //*** ********************** */
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
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
            // defaultValue={modeloSelect}
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
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              {/* MAPEAMOS LOS ENCABEZADOS */}
              {kyss.map((val: any, index: number) => (
                <th key={index} className="py-3 px-6">
                  {val}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {/* MAPEAMOS EL CONTENIDO DE LOS ENCAMBEZADOS */}
            <tr>
              {valss.map((val: any, index: number) => (
                <td key={index} className="py-3 px-6">{val}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
