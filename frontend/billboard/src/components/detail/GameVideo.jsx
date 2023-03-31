import { React, useState, useEffect } from "react";
import style from "./GameVideo.module.css";
import axios from "axios";
import YouTube from "react-youtube";

const GameVide = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const KEY = import.meta.env.VITE_APP_YOUTUBE_API_KEY;

  // 유튜브 긁어오기 api

  useEffect(() => {
    const youtube = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${KEY}&type=video&maxResults=1&regionCode=KR&q=board+game+splend+instruction` //board+game+{게임이름}+instruction
        );

        setVideoUrl(response.data.items[0].id.videoId);
      } catch (e) {
        console.log(e);
      }
    };
    youtube();
  }, []);
  // 유튜브 옵션
  const opts = {
    height: "390",
    width: "640",
    // playerVars: {
    //   autoplay: 1,
    // },
  };

  return (
    <div>
      <span className={style.font}>Video</span>
      <YouTube videoId={videoUrl} opts={opts} />
    </div>
  );
};

export default GameVide;
