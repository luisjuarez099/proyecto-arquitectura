"use client";
import React, { useState } from 'react'
import { useCarrito } from "@/utils/context/shops";

const Compra = () => {
  const items = JSON.parse(localStorage.getItem('carrito') as string || '[]');
  console.log(items); 
  return (
    <div>{
      items.map((item: any, index:any) => (
        <div key={index}>
          <h1>{item.Marca}</h1>
          <h2>{item.Modelo}</h2>
          <h2>{item.Inicio}</h2>
          <h2>{item.Fin}</h2>
          <h2>{item.Caracteristica}</h2>
        </div>
      ))
      }</div>
  )
}

export default Compra