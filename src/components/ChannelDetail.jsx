import React from 'react'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from '@mui/material'

import { ChannelCard, Videos } from "./"
import { fetchFromAPI } from '../utils/FetchFromAPI'


const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  // console.log(channelDetail)
  // console.log(videos)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items))
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: "linear-gradient(90deg, rgba(41,0,90,1) 0%, rgba(6,6,162,1) 35%, rgba(255,0,108,1) 100%)",
          zIndex: 10,
          height: "300px"
        }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-110px", // Adjust to overlap slightly with the background
            marginRight: "500px"
          }}
        >
          <ChannelCard channelDetail={channelDetail} />
        </Box>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" }, ml: { sm: "100px" } }} />
        <Videos videos={videos} />

      </Box>
    </Box>
  )
}

export default ChannelDetail
