import { useEffect, useState } from "react";
import { ApiResponse, ErrorResponse } from "../models/api";
  
async function apiCall<T, K>  (url: string, method: 'GET' | 'POST', body?: T): Promise<ApiResponse<K>> {
    try {
      const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== 'GET' ?JSON.stringify(body) : null, // body data type must match "Content-Type" header
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

function postCall <T, K> (body: T, url: string): Promise<ApiResponse<K>> {
    return apiCall<T, K>( url, 'POST', body);
}

function getCall <K> (url: string): Promise<ApiResponse<K>> {
    return apiCall<null, K>(url, 'GET');
}

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

 export function useGetApi<K>(url: string) {
    const [response, setResponse] = useState<ApiResponse<K>>();

    useEffect(() => {
        if(url) {
            getCall<K>(url).then((data) => {
                setResponse(data) 
            })
        }
    }, [url])

    return response;
 }