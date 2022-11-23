import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import Sidebar from "./Sidebar";
import Videos from "./Videos";

import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchFromAPI(
        `search?part=snippet&q=${selectedCategory}`
      );
      setVideos(data.items);
    };

    fetchVideos();
  }, [selectedCategory]);

  return (
    <Stack direction={{ xs: "column", md: "row" }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2022 JSM Media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 1 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
        </Typography>
        <Videos videos={videos} channelDetailsPage={false} />
      </Box>
    </Stack>
  );
};

export default Feed;
