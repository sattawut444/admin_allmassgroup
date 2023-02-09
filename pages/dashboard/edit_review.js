
import React from 'react';
import Image from 'next/image'
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import {onGetWhereBar,onGetUpdateBar,onGetDeleteBar} from '../../services/barServices';
import Navnar from '../../components/layouts/Navbar'
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
const delete_bar = async(e) => {
  switch (e) {
    case "":
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: "กรุณาลองใหม่อีกครั้ง",
        icon: 'error',
        showConfirmButton: false,
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#FFA688'
        })
      break;
    default:
      Swal.fire({
        title: 'Are you sure ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Delete!',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#E74C3C',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.isConfirmed){
          onGetDeleteBar(e)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          })
           Toast.fire({
            icon: 'success',
            title: 'Success'
          })
        }
      })
      break;
    }
}
  // Edit Bar ***
const edit_bar = async(e) => {
  e.audience = e.audience + 1
    onGetUpdateBar(e).then((response) => { 
      setbardataone(e);
    })
    const { value: formValues } = await Swal.fire({
      title: 'Edit_Bat',
      html:
        `<input type ="url" class="image_bar" id="image_bar" value = ${e.image} required placeholder= 'https://' >` +
        `<input type ="name" class="name_bar" id="name_bar" value = ${e.name} required placeholder= 'Name' >` +
        `<textarea class="detail_bar" id="detail_bar" rows="4" cols="50">${e.data}</textarea>` +
        `<p class='people_view'>เข้าชม ${e.audience} ครั้ง </p>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#E74C3C',
        inputPlaceholder: 'Enter the URL',
        showCloseButton: true,
        showLoaderOnConfirm: true,
      preConfirm: () => {
        return {
          id:e.id,
          name:document.getElementById('name_bar').value,
          data:document.getElementById('detail_bar').value,
          image:document.getElementById('image_bar').value,
        }
      }
    })
    if (formValues) {
      onGetUpdateBar(formValues)
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    }
  }
/*-----------------------------------------------------*/
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
        <img src= {bardataone.image} alt="Bar_one" width='521' height='521'/>
          <p className='s-10px'>BAR US</p>
            <div className='box-food2'>
                <h1 className='decoration s-41px center '>{bardataone.name}</h1>
                <div className=''>
                <p className='indent-50px obliqu'>{bardataone.data}</p>
              <button className='box-food-edit' onClick={() => edit_bar(bardataone)}>
                <h1 className='box-data-food-edit white-h'>Edit</h1>
              </button>
              <button className='box-food-delete' onClick={() => delete_bar(bardataone)}>
                <h1 className='box-data-food-delete white-h'>Delete</h1>
              </button>
              </div>
                
            </div>
        </div>
      <div className='box-food-two'>
      <img src= {bardatatwo.image} alt="Bar_one" width='521' height= '521'/>
        <p className='s-10px'>BAR US</p>
          <div className='box-food3'>
            <h1 className='decoration s-41px center '>{bardatatwo.name}</h1>
              <p className='indent-50px obliqu'>{bardatatwo.data}</p>
              <button className='box-food-edit' onClick={() => edit_bar(bardatatwo)}>
                <h1 className='box-data-food-edit white-h'>Edit</h1>
              </button>
              <button className='box-food-delete' onClick={() => delete_bar(bardatatwo)}>
                <h1 className='box-data-food-delete white-h'>Delete</h1>
              </button>
            
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