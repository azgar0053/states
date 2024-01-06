import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry]=useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState]=useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity]=useState('');
  
  
  const fetchCountries=async()=>{
    try {
      const data = await fetch('https://crio-location-selector.onrender.com/countries');
      const res = await data.json()
      setCountries(res) 
    } catch (error) {
      console.log('Fetching country error', error)      
    }
   
  }

  const fetchStates=async()=>{
    try {
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
      const res = await data.json()
      setStates(res) ;
    } catch (error) {
      console.log('Fetching states error', error)      
    }
   
  }

  const fetchCities=async()=>{
    try {
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
      const res = await data.json()
      setCities(res) ;
    } catch (error) {
      console.log('Fetching states error', error)      
    }
   
  }

  const handleCountryChange=(e)=>{
    setSelectedCountry(e.target.value)
    setSelectedState('')
    setSelectedCity('')
  }

  const handleStateChange=(e)=>{
    setSelectedState(e.target.value);
    setSelectedCity('')
  }

  const handleCityChange=(e)=>{
    setSelectedCity(e.target.value);
  }

  useEffect(()=>{
    fetchCountries()
  },[])


  useEffect(()=>{
    if(selectedCountry){
      fetchStates() 
    } 
  },[selectedCountry])

  useEffect(()=>{
    if(selectedState){
      fetchCities()
      console.log(cities)
    } 
  },[selectedState])




  return (
    <div className="App">
      <h1>Select Location</h1>

      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value={''}>Select Country</option>
        {countries.map((item, idx)=> <option value={item} key={idx}>{item}</option>)}
      </select>

      <select value={selectedState} onChange={handleStateChange}>
        <option value={''} disabled>Select State</option>
        {states.map((item, idx)=><option value={item} key={idx}>{item}</option> )}
      </select>

      <select value={selectedCity} onChange={handleCityChange}>
        <option value={''} disabled>Select City</option>
        {cities.map((item, idx)=> <option value={item} key={idx}>{item}</option>)}
      </select>
      {selectedCity?<p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>:''}

    </div>
  );
}

export default App;
