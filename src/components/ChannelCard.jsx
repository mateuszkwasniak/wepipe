import { Box, Typography } from "@mui/material";
import { CheckCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, marginTop, marginBottom }) => {
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop,
        marginBottom,
      }}
    >
      <Link
        to={`/channel/${channelDetail?.id?.channelId}`}
        style={{ textAlign: "center" }}
      >
        <img
          src={
            channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
          }
          alt={channelDetail?.snippet?.title}
          style={{
            borderRadius: "50%",
            height: "180px",
            width: "180px",
            marginBottom: "16px",
          }}
        ></img>
        <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
          {channelDetail?.snippet?.title}
          <CheckCircle
            style={{
              fontSize: 20,
              color: "gray",
              marginLeft: "5px",
            }}
          ></CheckCircle>
        </Typography>
        {channelDetail?.statistics?.subscriberCount && (
          <Typography sx={{ color: "gray", textAlign: "center" }}>
            {parseInt(
              channelDetail?.statistics?.subscriberCount
            ).toLocaleString()}{" "}
            Subscribers
          </Typography>
        )}
      </Link>
    </Box>
  );
};

export default ChannelCard;
