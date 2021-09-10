import React from "react";
import DailyIframe from "@daily-co/daily-js";

const JoinRoom = () => {
  const iframe = DailyIframe.createFrame({
    iframeStyle: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  });
  //iframe.join({ url: "https://sachie026.daily.co/FirstRoom" });
  console.log("iframe", iframe);

  return <div>JoinRoom</div>;
};

export default JoinRoom;
