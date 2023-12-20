import {fetchAPI} from "@/utils/fetch-api";

export async function getData(path: string): Promise<any> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  
    if (!token) throw new Error("The Strapi API Token environment variable is not set.");
  
    const options = { headers: { Authorization: `Bearer ${token}` } };
  
    const urlParamsObject = {
      populate: '*',
    };
    return await fetchAPI(path, urlParamsObject, options);
  }