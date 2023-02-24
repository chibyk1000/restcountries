import React from 'react'
import { Link } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,

} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from '../components/Navbar'
import useFetch from '../hooks/useFetch'
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from '../components/Loader';

export interface country {
  name: {
    common: string;
    official: string;
  };

  population: number;
  flags: {
    png: string;
  };
  region: string;
  subregion: string;
  latlng: Array<number>;
  languages: {};
  capital: Array<string>;
  status: number

}
const Home = () => {
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);

   const handleChangePage = (event: unknown, newPage: number) => {
     setPage(newPage);
   };

   const handleChangeRowsPerPage = (
     event: React.ChangeEvent<HTMLInputElement>
   ) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
   };
  const { data, loading, error } = useFetch('https://restcountries.com/v3.1/all')


  if (loading || error) return (
   <Loader/>
  );

  if (data.length < 1) {
    return (
      <div>
        <Navbar />
        <Typography variant="h4" align="center">
          No country data available
        </Typography>
      </div>
    )
  }


  const sortedData = [...data].sort((a: any, b: any) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }

    return 0;
  });



  return (
    <div>
      <Navbar />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer style={{maxHeight: "100vh"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Flags</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Region</TableCell>
                <TableCell align="left">Population</TableCell>
                <TableCell align="left">Languages</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((country: country) => {
                  console.log()
                  const languages = country?.languages !== undefined?  Object.values(country?.languages) as Array<string> : [];
                     return (
                       <TableRow key={country.name.common}>
                         <TableCell component="th" scope="row">
                           <LazyLoadImage
                             src={country.flags.png}
                             alt={country.name.common}
                             width="100%"
                             height="100%"
                             className="w-20 h-15"
                             placeholderSrc="/placeholderimage.webp"
                           />
                         </TableCell>
                         <TableCell align="left">
                           <Link
                             to={`/country/${country.name.common}`}
                             className="hover:underline "
                           >
                             {" "}
                             {country.name.common}
                           </Link>
                         </TableCell>
                         <TableCell align="left">{country.region}</TableCell>
                         <TableCell align="left">
                           {country.population}
                         </TableCell>
                         <TableCell align="left">
                           {languages.length === 1 ? (
                             <p> {languages[0]}</p>
                           ) : (
                             <Accordion style={{ boxShadow: "none" }}>
                               <AccordionSummary
                                 expandIcon={<ExpandMoreIcon />}
                                 aria-controls="panel1a-content"
                                 id="panel1a-header"
                                 style={{ padding: 0 }}
                               >
                                 <p> {languages[0]}</p>
                               </AccordionSummary>
                               <AccordionDetails style={{ padding: 0 }}>
                                 <ul>
                                   {Object.values(languages).map(
                                     (language: any) => {
                                       return (
                                         <li key={language}>{language}</li>
                                       );
                                     }
                                   )}
                                 </ul>
                               </AccordionDetails>
                             </Accordion>
                           )}
                         </TableCell>
                       </TableRow>
                     );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Home
