"use client";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";

export default function Shocks() {
  const [shocks, setShocks] = useState<any>();
  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3000/api/amortiguador");
      const data = await response.json();
      console.log(data);
      setShocks(data);
    };
    getTodos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Articulos</h1>
      <p className="text-sm mb-2">
        <small>Amortiguadores disponibles</small>
      </p>
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
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
}
