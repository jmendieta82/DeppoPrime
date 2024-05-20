import {useProductosStore} from "../../Store/useProductosStore.tsx";
import {get, post} from "../shared-components/deppoApi.tsx";
import {Dialog} from "primereact/dialog";
import {useModalStore} from "../../Store/useModalStore.ts";
import {FormProducto} from "./FormProducto.tsx";
import {InputText} from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import {Button} from "primereact/button";
import {useVoiceToTextStore} from "../../Store/useVoiceToTextStore.ts";
import {VoiceToText} from "./VoiceToText.tsx";
import {text} from "@fortawesome/fontawesome-svg-core";
import { Tooltip } from 'primereact/tooltip';
import {useState} from "react";


export function Producto() {
  const {productos,setProductos} = useProductosStore();
  const {modalProducto,setModalProducto} = useModalStore();
  const [option,setOption] = useState(false);
  const {
    transcription,
    modalVoiceToText,
    setmodalVoiceToText,
    setTranscription
  } = useVoiceToTextStore();

  const getProductos = async (text:String) => {
    try{
      if(text.length > 3){
        const response = await get(`productos_by_name/?empresa=2&prod_name=${text}`);
        setProductos(response)
      }else (
        setProductos([])
      )
    }catch (error) {
      const message = (error as Error).message;
      console.log(message)
    }
  }
  const getProductosFromVoice = async () =>{
    try{
      let obj = {
        text:transcription,
      }
      if(text.length > 3){
          const response = option
            ?await post('product-voice-query/',obj)
            :await get(`productos_by_name/?empresa=2&prod_name=${transcription}`);

        setProductos(response)
      }else (
        setProductos([])
      )
      setmodalVoiceToText(false);
      setTranscription('');
    }catch (error) {
      const message = (error as Error).message;
      console.log(message)
    }
  }

  function formatCurrency(value:any, currency = 'COP', locale = 'es-CO') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  }
  return (
    <>
      <Dialog header="Productos" visible={modalProducto} style={{width: '30vw'}} onHide={() => setModalProducto(false)}>
        <FormProducto getProductos={getProductos}/>
      </Dialog>
      <Dialog header="Deppo Voice" visible={modalVoiceToText} style={{width: '30vw'}} onHide={() => setmodalVoiceToText(false)}>
        <VoiceToText onSubmit={()=>getProductosFromVoice()}/>
      </Dialog>
      <div className='flex w-full flex-column align-items-center gap-6'>
        <div className='w-6 flex flex-row gap-2'>
          <IconField className='w-10' iconPosition="left">
            <InputIcon className="fa-solid fa-magnifying-glass"> </InputIcon>
            <InputText onChange={(e) => getProductos(e.target.value)} placeholder='Ingrese el nombre del producto.'/>
          </IconField>
          <Tooltip target=".addButton" />
          <Button className='addButton' icon='fa-solid fa-plus' data-pr-tooltip='Crear producto'
                  onClick={()=>setModalProducto(true)}/>
          <Tooltip target=".filterByName" />
          <Button className='filterByName' icon='fa-solid fa-microphone' severity='secondary'
                  data-pr-tooltip='Filtrar por nombre' onClick={()=> {
            setmodalVoiceToText(true);
            setOption(true);
          }}/>
          <Tooltip target=".filter" />
          <Button className='filter' icon='fa-solid fa-filter' severity='secondary'
                  data-pr-tooltip='Filtrar' onClick={()=> {
            setmodalVoiceToText(true);
            setOption(false);
          }}/>
        </div>
        <div className="grid gap-2 ml-3 w-full flex justify-content-center">
        {productos.map((producto, index) => (
              <div className='col-4 bg-white p-4 border md:border-round-md' key={index}>
                <div className='flex flex-row justify-content-between'>
                  <div className='flex flex-column align-items-start gap-2 mb-4'>
                    <span className='font-bold text-xl'>{producto.nombre}</span>
                    <span>Codigo :{producto.codigo}</span>
                  </div>
                  <Tooltip target=".editIcon" />
                  <i className='fa-solid fa-pencil editIcon cursor-pointer' data-pr-tooltip={ `Editar ${producto.nombre}`}/>
                </div>
                <div className='flex justify-content-between align-content-center'>
                  <div className='flex flex-column gap-2'>
                    <span className='font-bold text-sm'>{formatCurrency(producto.precioCompra)}</span>
                    <span className=' text-sm'>Precio compra</span>
                  </div>
                  <div className='flex flex-column gap-2'>
                    <span className='font-bold text-sm'>{formatCurrency(producto.precioVenta)}</span>
                    <span className=' text-sm'>Precio venta</span>
                  </div>
                  <div className='flex flex-column gap-2'>
                    <span className='font-bold text-sm'>{producto.stock}</span>
                    <span className=' text-sm'>Stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </>
  );
}