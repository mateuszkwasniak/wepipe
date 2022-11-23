import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState({});
  const [similarVideos, setSimilarVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const data = await fetchFromAPI(
        `videos?part=snippet,statistics&id=${id}`
      );
      setVideoDetail(data.items[0]);

      const additionalData = await fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${id}&type=video`
      );
      setSimilarVideos(additionalData.items);
    };

    fetchVideo().catch((error) => console.log(error));
  }, [id]);

  if (!videoDetail.snippet || !videoDetail.statistics) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              top: "86px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls={true}
              className="react-player"
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant="h6" color="#fff">
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opactiy: "0.7" }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opactiy: "0.7" }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ xs: 5, md: 1 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {similarVideos && (
            <Videos videos={similarVideos} direction="column"></Videos>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
