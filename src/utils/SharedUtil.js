export const buildMetricsData = (userId, networkStats, roomName) => {
  const { stats } = networkStats;
  const {
    videoRecvBitsPerSecond,
    videoRecvPacketLoss,
    videoSendBitsPerSecond,
    videoSendPacketLoss,
  } = stats.latest;

  return {
    id: userId,
    name: roomName,
    videoRecvBitsPerSecond: videoRecvBitsPerSecond,
    videoRecvPacketLoss: videoRecvPacketLoss,
    videoSendBitsPerSecond: videoSendBitsPerSecond,
    videoSendPacketLoss: videoSendPacketLoss,
  };
};
