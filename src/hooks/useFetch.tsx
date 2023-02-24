import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setData, setError, setLoading } from '../redux/countrySlice'

import { RootState } from '../redux/store'

const useFetch = (url:RequestInfo) => {

    const {data, error, loading} = useSelector((state:RootState) => state.country)

    const dispatch = useDispatch()
 
   
    
    useEffect(() => {
     
      (async () => {
        try {
          dispatch(setLoading(true));
          const res = await fetch(url);
          const data = await res.json();
          if (data?.status === 404) {
            dispatch(setData([]));
            return;
          }
          if (data) {
            dispatch(setData(data));
            dispatch(setLoading(false));
            dispatch(setError(false));
          }
        } catch (error) {
          if (error) {
            dispatch(setError(true));
          }
        }
      })();

  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])


    return { data, error, loading } 
    
}

export default useFetch
