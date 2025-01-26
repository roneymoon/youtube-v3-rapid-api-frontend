import {useState, useEffect} from "react";
import {Box, Stack, Typography} from "@mui/material"
import {SideBar, Videos, Loader} from "./";
import {fetchFromAPI} from "../utils/FetchFromAPI"

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
    .then((data) => setVideos(data.items))
  }, [selectedCategory])

  // checking if API key is correct
  // console.log(process.env.REACT_APP_RAPID_API_KEY);

  if(!videos?.length) return <Loader/>;
  
  return (
    
    <Stack sx={{flexDirection: { sx: "column", md: "row"}}}>
      <Box sx={{height: {sx: "auto", md: "92vh"}, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2}}}>
        <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

        <Typography 
        className="copyright" 
        variant="body2"
        sx={{mt: 2, color: "#fff"}}>
        Copyright 2024 Roney Moon Dev
        </Typography>
      </Box>

      <Box p={2} sx={{overflow: "auto", 
        height: "90vh", flex: 2}}>
          <Typography variant="h4" fontWeight="bold" mb={2} sx={{color: "white"}}>
            {selectedCategory} <span style={{color: '#FC1503'}}>Videos</span>
          </Typography>
          <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed
