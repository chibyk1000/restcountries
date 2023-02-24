import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { country } from './Home';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, CircularProgress } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Country = () => {
    const { name } = useParams()
    const [data, setData] = useState([]) 
    
    
    useEffect(() => {

        const controller = new AbortController()
        fetch(`https://restcountries.com/v3.1/name/${name}`, {signal: controller.signal})
      .then((res)=>{
return res.json()
      })  
            .then((data) => {
         
setData(data)
      })  
            .catch((err) => {
                
            }) 
        
        return () => {
            controller.abort()
        }
      
        
        
    }, [name])

 


      if (data.length <1)
        return (
          <Box sx={{ display: "flex" , justifyContent:"center",  height: "50vh", alignItems:'center'  }}>
            <CircularProgress />
          </Box>
        );
const country:country = data[0]

  return (
    <div className="">
      <nav className=" flex justify-between items-center py-2 border-b px-4">
        <div className=" flex items-center gap-4">
          <div className="bg-orange-700 w-10 h-10 flex items-center justify-center rounded-full  font-bold text-white text-2xl">
            <p>{name?.slice(0, 1)}</p>
          </div>
          <div>
            <h2 className="font-bold">{name?.toUpperCase()}</h2>
            <p>{country.capital}</p>
          </div>
        </div>
        <MoreVertIcon />
      </nav>

      <section className="grid h-[90vh] mx-auto gap-4 shadow-md p-2 w-1/2 grid-rows-2">
        <div>
          <LazyLoadImage
            src={country?.flags.png}
                      alt={country.name.common}
                      placeholderSrc='/placeholderimage.webp'
                      width='100%'
                      height='100%'
         className='w-full h-full'
          />
        </div>
        <div>
          <p>
            The country belongs{" "}
            <span className="text-primary-300 font-semibold">
              {country?.region}
            </span>{" "}
            and{" "}
            <span className="text-primary-300 font-semibold">
              {" "}
              {country?.subregion}
            </span>
            . Located at{" "}
            <span className="text-primary-300 font-semibold">
              {country.latlng[0]}
            </span>{" "}
            °N and{" "}
            <span className="text-primary-300 font-semibold">
              {country?.latlng[1]}
            </span>{" "}
            °W, this country has a popluation of{" "}
            <span className="text-primary-300 font-semibold">
              {" "}
              {country?.population}
            </span>{" "}
            and it has gained the independent, according to the CIA World
            Factbook
          </p>
        </div>
      </section>
    </div>
  );
}

export default Country
