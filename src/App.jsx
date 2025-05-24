import React from 'react';
import { useState , useCallback , useEffect , useRef } from 'react';


const App = () => {
  
   const [length, setLength] = useState(8);
   const [numAllow , setNumAllow] = useState(false);
   const [charAllow , setCharAllow] = useState(false);
   const [password, setPassword] = useState("");
    
   const passwordRef = useRef(null);
  
   const passGenerator = useCallback(()=>{
      let pass = "" ;
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrsutvwxyz";
      if(numAllow) str += "1234567890";
      if(charAllow) str +="!@#$%^&*()";
      for(let i=1; i<=length; i++){
           let char = Math.floor(Math.random()* str.length + 1);
           pass += str.charAt(char);
      }
      setPassword(pass);
      
   } ,[length,numAllow,charAllow,setPassword]);

   const passwordCopytoClipboard = useCallback(()=>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,88);
        window.navigator.clipboard.writeText(password);
   },[password])
  
   useEffect(()=>{
       passGenerator();
   },[length , numAllow , charAllow , setPassword])
  
  return (
      <>
        <div className='flex w-full h-screen bg-black justify-center items-center'>
               <div className='w-[500px] flex flex-col  items-center   rounded-2xl bg-gray-700 h-[300px]'>
                 <div className='mt-20 flex justify-center'>
                   <input ref={passwordRef} value={password} className='bg-white px-4 py-2 outline-0 rounded-l text-gray-800' readOnly placeholder="password" type="text" name="" id="" />
                   <button  onClick={passwordCopytoClipboard}  className='bg-blue-600 hover:bg-blue-500 rounded-r text-white  px-4 py-2'>copy</button>
                 </div>
                 <div className='mt-5 flex gap-5  justify-center'>
                     <input className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}  min={1} max={100} value={length} type="range" name="" id="1" />
                     <label htmlFor="1" className='text-white'>length:{length}</label>
                     
                     <input defaultChecked={numAllow} onChange={(prev)=>{
              
                      setNumAllow((prev)=>!prev)}} type="checkbox" name="" id="2" />
                     <label className='text-white' htmlFor="2">Number</label>
                     
                     <input defaultChecked={charAllow} onChange={(prev)=>{setCharAllow((prev)=>!prev)}}  type="checkbox" id="3" />
                     <label className='text-white' htmlFor="3">Character</label>
                 </div>

                 

               </div>
        </div>  
      </>
  )
}

export default App
