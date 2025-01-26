import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material"
import { Videos, Loader } from "./";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/FetchFromAPI"

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm])

  // checking if API key is correct
  // console.log(process.env.REACT_APP_RAPID_API_KEY);

  if (!videos?.length) return <Loader />;

  return (
    <Box p={2} sx={{
      overflow: "auto",
      height: "90vh", flex: 2
    }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
      Search Results for: <span style={{ color: '#FC1503' }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  )
}

export default SearchFeed
