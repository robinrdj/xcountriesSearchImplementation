// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
function App() {
  const url = "https://restcountries.com/v3.1/all";
  
  const [countryData, setCountryData] = useState([]);
  const [searchword, setSearchword] = useState("");
  const [filteredCountryData, setFilteredCountryData] = useState([]);

   useEffect(()=>{
    const getData = async () =>{
      try{
        const data = await axios.get(url);
        setCountryData(data.data);
        setFilteredCountryData(data.data);
     }catch(error){
       console.error("Error fetching data: ",error)
     }
    }
    getData();
   
   },[]);

   
  const Card = ({country})=>{
    return(
      <>
      <div className="countryCard" style={{
        flexDirection:"column",
        border:"1px solid gray",
        borderRadius:"8px",
        width:"150px",
        display:"inline-block",
        margin:"10px",
        padding:"5px"
      }}>
      
      <img src={country.flags.png} alt={country.name.common} width="150px" height="100px"/>
      <p style={{textAlign:"center"}}>{country.name.common}</p>
      </div>
      </>
    )
    
  }
  return (
    <>
          <input type="text" placeholder="Search for countries" value={searchword} onChange={(e)=>{
             setSearchword(e.target.value.toLowerCase());
             setFilteredCountryData(countryData.filter((item)=>item.name.common.toLowerCase().includes(e.target.value.toLowerCase())))
      }} />
        <div className="App">

      {filteredCountryData.map((country)=>{
        return <Card key={country.cca3} country={country} />
      })}
      
    </div>
    </>

  );
 
}

export default App;
