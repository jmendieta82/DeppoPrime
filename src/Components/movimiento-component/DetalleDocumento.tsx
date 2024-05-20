import {useMovimientosStore} from "../../Store/useMovimientoStore.ts";
import React, { useState} from "react";


export function DetalleDocumento() {
  const {detalleMovimiento} = useMovimientosStore();
  const formatPVCurrency = (rowData:any) => {
    return rowData.vrUnitario?rowData.vrUnitario.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }):'';
  }
  const formatTotalCurrency = (rowData:any) => {
    return rowData.total?rowData.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }):'';
  }
  const header = () => {
    return (
      <div className="header-table">
        <span className="p-input-icon-left">
          <i className="fa-solid fa-search"/>
          {/*<InputText className="p-inputtext-sm" value={globalFilterValue} onChange={onGlobalFilterChange}
                     placeholder="Buscar"/>*/}
        </span>
      </div>
    );
  };
  return (
    <>
      <div className='table-container'>
       {/* <DataTable value={detalleMovimiento} size={'small'} stripedRows showGridlines header={header}>
          <Column alignHeader='center' field="codigo" header="Código"></Column>
          <Column alignHeader='center' field="producto" header="Producto"></Column>
          <Column alignHeader='center'  field="unidad" className='col-text-center' header="Unidad"></Column>
          <Column alignHeader='center' field="stock" className='col-numero' header="Stock"></Column>
          <Column alignHeader='center' field="stockAntes" className='col-numero' header="Cant.Antes"></Column>
          <Column alignHeader='center' field="cantidad" className='col-numero' header="Cantidad"></Column>
          <Column alignHeader='center' field="stockDespues" className='col-numero' header="Cant.Despues"></Column>
          <Column alignHeader='center' field="vrUnitario" className='col-numero' body={formatPVCurrency} header="P.venta"></Column>
          <Column alignHeader='center' field="total" className='col-numero' body={formatTotalCurrency} header="P.venta"></Column>
        </DataTable>*/}
      </div>
    </>
  );
}