import React, {useState, useCallback, useEffect}  from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
 
import { useDispatch} from 'react-redux';
import { setData } from "../redux/countrySlice";

import useDebounce from '../hooks/useDebounce';
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const debouncedValue = useDebounce(searchTerm, 500)

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    
}, [])
 
  useEffect(() => {
    let url;
    if (searchTerm.trim() === "") {
      url = "https://restcountries.com/v3.1/all";
    } else {
      url = `https://restcountries.com/v3.1/name/${searchTerm}`;
    }
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Not Found");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          dispatch(setData(data));
        }
      })
      .catch((err) => {
        if (err) {
          dispatch(setData([]));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])



  return (
    <nav className="flex justify-between bg-primary-300 text-white py-3 px-4 items-center">
      <div className="flex gap-3 items-center">
        <MenuIcon fontSize="large" />
        <p className="font-semibold ">Country</p>
      </div>
      <form
        action=""
        className="bg-primary-200 py-1 px-3 hover:bg-primary-100 rounded "
      >
        <SearchIcon />

        <input
          type="text"
          // value={searchTerm}
          placeholder="Search Country"
          className="bg-transparent placeholder:text-white/80  pl-2 focus:outline-none "
          onChange={handleSearch}
        />
      </form>
    </nav>
  );
}

export default React.memo(Navbar)
