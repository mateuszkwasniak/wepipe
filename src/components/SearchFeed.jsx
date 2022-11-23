import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";

import Videos from "../components/Videos";
import { Box, Typography } from "@mui/material";

const SearchFeed = () => {
  const [searchFeed, setSearchFeed] = useState([]);

  const { searchTerm } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetchFromAPI(`search?part=snippet&q=${searchTerm}`);
      setSearchFeed(data.items);
    };

    fetchVideos().catch((error) => console.log(error));
  }, [searchTerm]);

  if (!searchFeed) return "Loading";

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search results for:{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span>
      </Typography>
      <Videos videos={searchFeed} channelDetailsPage={true} />
    </Box>
  );
};

export default SearchFeed;
