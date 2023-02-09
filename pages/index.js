
import React from 'react';
import Image from 'next/image'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import {onGetWhereBar,onGetUpdateBar} from '../services/barServices';
import Navnar from '../components/layouts/Navbar'
export default function Home() {
  const [ bardataone, setbardataone ] = useState(1);
  const [ bardatatwo, setbardatatwo ] = useState(2);
  const [ loopLM, setLoopLM ] = useState(1);
  useEffect(() => {
    if (loopLM !== 2) {
      onGetWhereBar(bardataone).then((responseone) => {  
        setbardataone(responseone);
          });
      onGetWhereBar(bardatatwo).then((responsetwo) => {  
        setbardatatwo(responsetwo);
          });
      setLoopLM( loopLM + 1)
    }
},)
const view = async(e) => {
  e.audience = e.audience + 1
  console.log(e)
  if(e.id == 1){
    onGetUpdateBar(e).then((response) => { 
      setbardataone(e);
    })
  }else{
    onGetUpdateBar(e).then((response) => {  
      setbardatatwo(e);
    })
    }  
    Swal.fire({
      title: `${e.name}`,
      text: `${e.detail}`,
      imageUrl: e.image,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
}
  if (bardataone !== undefined) {
    if (bardatatwo !== undefined) {
return (
    <>
    <title> BAR US </title>
    <div className='box-cover'>
      <Navnar/>
      <h1 className='decoration s-41px center top-m-2p'>BAR US</h1>
      <div className='box-cover2'>
        <div className='box-food-one'>
        <img src= {bardataone.image} alt="Bar_one" width='1058' height='720'/>
          <p className='s-10px'>BAR US</p>
            <div className='box-food2'>
                <h1 className='decoration s-41px center '>{bardataone.name}</h1>
                <p className='indent-50px obliqu fornt_kanit'>{bardataone.data}</p>
              <button className='box-data-bar fornt_kanit' onClick={() => view(bardataone)}>
                <h1 className='box-data-food-one white-h fornt_kanit'>View</h1>
              </button>
                <div className='audience'>
                  <Image src="/assets/images/icon-user-35.png" alt="Vercel Logo" width={35} height={35} />
                </div>
                <div className='people'>
                  {bardataone.audience} เข้าชม
                </div>
            </div>
        </div>
      <div className='box-food-two'>
      <img src= {bardatatwo.image} alt="Bar_one" width='1058' height= '750'/>
        <p className='s-10px'>BAR US</p>
          <div className='box-food3'>
            <h1 className='decoration s-41px center '>{bardatatwo.name}</h1>
              <p className='indent-50px obliqu fornt_kanit'>{bardatatwo.data}</p>
            <button className='box-data-bar fornt_kanit' onClick={() => view(bardatatwo)} >
              <h1 className='box-data-food-one white-h fornt_kanit'>View</h1>
            </button>
            <div className='audience'>
                <Image src="/assets/images/icon-user-35.png" alt="Vercel Logo" width={35} height={35} />
            </div>
            <div className='people'>
                {bardatatwo.audience} เข้าชม
            </div>
          </div>
        </div>
      </div>
      <div className='box-end'></div>
    </div>
    </>
)
}
}
}