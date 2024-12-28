import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import FilterSection from "./components/FilterSection/FilterSection";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [topAlbumSongs, setTopAlbumSongs] = useState([])
  const [newAlbumSongs, setNewAlbumSongs] = useState([])
  const [filteredDataValues, setFilteredDataValues] = useState([''])
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(0);

  const generateSongsData = (value) => {
   console.log(value);
   
    let songData = newAlbumSongs[0].songs;

    let key;
    if (value === 0) {

      setFilteredDataValues(songData)
      return;
    }

    else if (value === 1) {
      key = 'rock'

    }

    else if (value === 2) {
      key = 'pop'
    }

    else if (value === 3) {
      key = 'jazz'
    }

    else if (value === 4) {
      key = 'blues'
    }

    const data = songData.filter((item) => {
      return item.genre.key === key

    })
    setFilteredDataValues(data)

  }

  const handleChange = (event, newValue) => {
    setValue(newValue)

    generateSongsData(newValue)

  }
  const handleToggle = () => {
    setToggle(!toggle)
  }

  const filteredData = (val) => {
    generateSongsData(val)
    
  }

  const generateTopAlbumSongs = async () => {
    try {
      const topAlbumSongs = await fetchTopAlbums()
      setTopAlbumSongs(topAlbumSongs)
    }
    catch (error) {
      console.log(error)
      return null
    }

  }


  const generateNewAlbumSongs = async () => {
    try {
      const newAlbumSongs = await fetchNewAlbums()
      setNewAlbumSongs(newAlbumSongs);
     
    }
    catch (error) {
      console.log(error)
      return null
    }
  }


  const generateFilterSongs = async () => {

    try {
      const newAlbumSongs = await fetchSongs()
      setFilteredDataValues(newAlbumSongs);
    }

    catch (error) {
      console.log(error)
      return null 

    }
  }

  useEffect(() => {
    // eslint-disable-next-line
  }, [value])

  useEffect(() => {
    
    generateTopAlbumSongs();
    generateNewAlbumSongs();
    generateFilterSongs();
    // setFilteredDataValues(newAlbumSongs);

  }, [])
   const BACKEND_ENPOINT = "https://qtify-backend-labs.crio.do"

 const fetchTopAlbums = async() => {
    try{
        const res = await axios.get(`${BACKEND_ENPOINT}/albums/top`);
        console.log(res.data)
        return res.data
    }catch(error){
        console.log(error)
        return null
    }
}
 const fetchNewAlbums = async() => {
    try{
        const res = await axios.get(`${BACKEND_ENPOINT}/albums/new`);
        return res.data
    }
    catch(error){
        console.log(error)
        return null
    }
}

 const fetchSongs = async() => {
    try{
        const res = await axios.get(`${BACKEND_ENPOINT}/songs`);
        return res.data
    }
    catch(error){
        console.log(error)
        return null
    }
}
  
  return (
    <>
      <Navbar />
      <Hero />
      <div className="section">
        <Section type='album' title='Top Albums' data={topAlbumSongs} />
        <Section type='album' title='New Albums' data={newAlbumSongs} />
        <FilterSection data={newAlbumSongs} type='songFilter' title='Songs' filteredData={filteredData} filteredDataValues={filteredDataValues} value={value} handleChange={handleChange} handleToggle={handleToggle}/>
      </div>
    </>
  )
}

export default App