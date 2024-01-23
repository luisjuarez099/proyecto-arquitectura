"use client";
import clientPromise from "@/lib/mongodb";
import { set } from "mongoose";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
export default function Shocks() {
  const [shocks, setShocks] = useState<any>();
  const [marcaSelect, setMarcaSelect] = useState<any>();
  const [modeloSelect, setModeloSelect] = useState<any>();
  const [fechaSelect, setFechaSelect] = useState<any>();
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [kyss, setKyss] = useState<any>([]);
  const [valss, setValss] = useState<any>([]);
  const [countInTimeout, setCountInTimeout] = useState(0);
  const [dataFilter, setDataFilter] = useState([]); //creamos nuestro useState para actualizar nuestros datos filtrados
  const [Umarcas, setUmarcas] = useState<[]>([]); //marcas unicas
  const [Umodelos, setUModelos] = useState<[]>([]); //modelos unicos
  const [Ufechas, setUFechas] = useState<[]>([]); //modelos unicos
  const [carrito, setCarrito] = useState<any>([]);
  //time out para la alerta de que no hay informacion****************
  let stock = 0;
  let mess = "Porfavor selecciona un modelo o una marca";
  useEffect(() => {
    const time = setTimeout(() => {
      setMessage("No se encontraron pedidos");
      setCountInTimeout(countInTimeout + 1);
    }, 1000);
    return () => clearTimeout(time);
  }, [countInTimeout]);
  //**************************** agregar al carrito usando local storage */

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

  //filtramos los datos de acuerdo a la marca, modelo seleccionado
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
        try {
          if (marcaS == "") {
            setErr(mess);
          } else {
            setValss(Object.values(datas[0])); //obtenemos los encabezados de la tabla
            setDataFilter(datas);
          }
        } catch (error) {
          console.log(error);
        }

        console.log("datos filtrados");
        console.log(datas);
      });
  };

  //*** ********************** */
  function compareCarrito(item:any, itemNew:any){
    //tomamos los dos valores
    const entrie1 = Object.entries(item);
    const entrie2 = Object.entries(itemNew);
    //hacemos la comparacion de largo del arreglo
    if(entrie1.length !== entrie2.length){
      console.log("diferentes");
      return false;
    }
    //recorremos el arreglo para comparar los valores y llaves
    for (let i = 0; i < entrie1.length; ++i) {
      // Keys
      if (entrie1[i][0] !== entrie2[i][0]) {
        return false;
      }
      // Values
      if (entrie1[i][1] !== entrie2[i][1]) {
        return false;
      }
    }
    console.log("iguales");
    return true;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Articulos</h1>
      <label className="text-sm mb-2">
        <small>Amortiguadores disponibles</small>
      </label>
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
              setModeloSelect("");
            }}
          >
            <option value="" hidden>
              ----Marca----
            </option>
            {Umarcas?.map((marca: string, index: number) => (
              <option key={index}>{marca}</option>
            ))}
          </select>
        </div>
        {/* Modelos */}
        <div>
          <select
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      {/* mostrar datos */}

      {err}
      <div className="flex justify-center items-center">
        <div className="mt-12 shadow-sm border rounded-lg ">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Marca</th>
                <th className="py-3 px-6">Modelo</th>
                <th className="py-3 px-6">Inicio</th>
                <th className="py-3 px-6">Fin</th>
                <th className="py-3 px-6">Caracteristica</th>
                <th className="py-3 px-6">D</th>
                <th className="py-3 px-6">T</th>
                <th className="py-3 px-6">DD</th>
                <th className="py-3 px-6">DI</th>
                <th className="py-3 px-6">TD</th>
                <th className="py-3 px-6">TI</th>
                <th className="py-3 px-6">Accion</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {dataFilter.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Modelo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Inicio}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Fin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Caracteristica}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.D}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.T}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.DD}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.DI}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.TD}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.TI}</td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <button
                      key={idx}
                      onClick={() => {
                        const carritos = localStorage.getItem("carrito") || "[]";
                        const carritoNew = {
                          Marca: item.Marca,
                          Modelo: item.Modelo,
                          Inicio: item.Inicio,
                          Fin: item.Fin,
                          Caracteristica: item.Caracteristica,
                          T: item.T,
                          D: item.D,
                          DD: item.DD,
                          DI: item.DI,
                          TD: item.TD,
                          TI: item.TI,
                        };
                        const carritoTemp = JSON.parse(carritos);
                        console.log(carritoTemp);
                        const nuevoCarrito = [...carritoTemp, carritoNew];
                        setCarrito(nuevoCarrito);
                        localStorage.setItem("carrito",JSON.stringify(nuevoCarrito));
                      }}
                      className="py-2 px-3 bg-blue-500 font-medium text-white hover:bg-blue-900 duration-150  rounded-lg"
                    >
                      Agregar
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
