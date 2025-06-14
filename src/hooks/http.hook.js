import { useState, useCallback } from "react";

export const useHttp = () =>{
     const [loading, setLoading] = useState(false);
     const[error,setError] = useState(null);


     const request = useCallback( async(url, method='GET', body = null, headers ={'Content-Type': 'application/json'})=>{
        setLoading(true);

        try{
            const response = await fetch(url, {method,body,headers});

            if (!res.ok){ throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
            const data = await response.json();

            return res.json();

            }catch(e){
                setLoading(false);
                setError(e.message);
                

        }
         
     },[]);

}