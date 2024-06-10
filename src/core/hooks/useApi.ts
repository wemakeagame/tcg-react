import { useEffect, useState } from "react";
import { ApiResponse, ErrorResponse } from "../models/api";
  
async function postCall<T, K> (body: T, url: string): Promise<ApiResponse<K>> {
    try {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // body data type must match "Content-Type" header
      });
  
      let data;
  
      if(response.status !== 200) {
        data = (await response.json()) as ErrorResponse;
        throw Error(data.error);
      } else {
         data = (await response.json()) as K;
      }
  
      const resolved: ApiResponse<K> = {
        data,
      };
  
      return resolved;
    } catch (e) {
      const error = e as Error;
      const resolved: ApiResponse<K> = {
        data: null,
        error,
      };
  
      return resolved;
    }
  };

 export function usePostApi<T, K>(url: string) {
    const [body, setBody] = useState<T>();
    const [response, setResponse] = useState<ApiResponse<K>>();

    useEffect(() => {
        if(url && body) {
            postCall<T, K>(body, url).then((data) => {
                setResponse(data) 
            })
        }
    }, [body, url])

    return [response, setBody] as const;
 }