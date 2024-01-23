"use client";
import React, { useState } from "react";
import { useCarrito } from "@/utils/context/shops";

const Compra = () => {
  const [carrito, setCarrito] = useState<any>([]);
  const items = JSON.parse((localStorage.getItem("carrito") as string) || "[]");
  
  return (
    <div>
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
              {items.map((item: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Modelo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Inicio}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Fin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.Caracteristica}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.D}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.T}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.DD}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.DI}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.TD}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.TI}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        const newCarrito = [...items];
                        newCarrito.splice(idx, 1);
                        localStorage.setItem(
                          "carrito",
                          JSON.stringify(newCarrito)
                        );
                        setCarrito(newCarrito);
                      } }
                      className="bg-green-400 rounded-lg text-white p-1"
                    >
                      Eliminar
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
};

export default Compra;
