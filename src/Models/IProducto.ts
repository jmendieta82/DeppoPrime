export interface IProducto {
  id?:number,
  nombre:String,
  precioCompra:number,
  precioVenta:number,
  stock:number,
  codigo:String,
  created_at?:String,
  updated_at?:String,
}