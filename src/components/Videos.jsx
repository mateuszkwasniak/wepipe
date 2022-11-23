import { Stack, Box } from "@mui/material";

import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";

const Videos = ({ videos, channelDetailsPage, direction }) => {
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      alignItems="center"
      overflow="auto"
      gap={2}
      sx={{
        justifyContent: channelDetailsPage
          ? "center"
          : { xs: "center", md: "start" },
      }}
    >
      {videos?.map((item, index) => {
        if (item.id.playlistId) return;
        return (
          <Box
            key={index}
            sx={{ width: { xs: "100%", md: "320px" }, mx: { xs: 1, md: 0 } }}
          >
            {item.id.videoId && <VideoCard video={item} />}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Videos;
