"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import { shocksTypes } from "@/types"; //traemos nuestros tipos de datos.

//SE MODIFICAN LAS VARIABLES/TIPO DEL CONTEXT
/**
 * 
*/
type userContext = [
  shocksTypes[], //este es un arreglo de pedidosType S
  React.Dispatch<React.SetStateAction<shocksTypes[]>>
];


const ValueContext = createContext<userContext>([[], () => null]);
ValueContext.displayName = "ValueContext";

//DECLARAS TU USECONTEXT CON EL NOMBRE QUE DESEES
/**
 * useInfoPedido es lo que vamos a importar en cada pagina
 * para poderlo usar sus estados.
 * ejemplo : import {useInfoPedido} form '@/utils/context/infoPedido (nombre que tiene la extension tsx)'
 */
export const useCarrito = () => {
  const context = useContext(ValueContext);
  if (context === undefined) {
    throw new Error("useValue must be used within a ValueProvider");
  }
  return context;
};

//Props no se modifica
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

//DECLARACION DE PROVEEDOR Y USESTATE CON LOS QUE SE VA A TRABAJAR 
/**Este es el nombre del proveedor que usaremos para poder compartir info entre paginas.
 * Esa palabra va para PedidoPrv va en Mayus. 
 * tambien se cambia el export default <NombrePRV>
 * y esta misma variable se incluye en layout o, ejemplo
 * <PedidoPrv>
 *      {children}
 * </PedidoPrv>
 */
const PedidoCarrito = ({ children, ...props }: Props) => {
//este es el estado (infoP, setInfoP) donde vamos a usar en los otras pages.
  const [carrito, setCarrito] = useState<shocksTypes[]>([]);
  return (
    <ValueContext.Provider value={[carrito, setCarrito]}>
      {children}{" "}
    </ValueContext.Provider>
  );
};
export default PedidoCarrito;