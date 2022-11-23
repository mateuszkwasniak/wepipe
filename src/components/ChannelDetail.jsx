import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const channelData = await fetchFromAPI(
        `channels?part=statistics&id=${id}`
      );
      setChannelDetail(channelData?.items[0]);

      const videoData = await fetchFromAPI(
        `search?channelId=${id}&part=snippet&order=date`
      );
      setVideos(videoData?.items);
    };

    fetchDetails();
  }, [id]);

  console.log(videos);

  return (
    <Box minHeight="95vh">
      <div
        style={{
          background:
            "linear-gradient(50deg, rgba(0,0,0,1) 0%, rgba(220,40,0,1) 100%)",
          height: "300px",
        }}
      />
      <ChannelCard
        channelDetail={channelDetail}
        marginTop="-100px"
        marginBottom="25px"
      ></ChannelCard>

      <Videos videos={videos} channelDetailsPage={true}></Videos>
    </Box>
  );
};

export default ChannelDetail;
