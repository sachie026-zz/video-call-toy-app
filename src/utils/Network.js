import { BASE_URL, ROOMS, PARTICIPANTS, METRICS } from "../common/constants";

export const createRoom = async (name) => {
  return await fetch(`${BASE_URL}${ROOMS}/${name}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, privacy: "public" }),
  });
};

export const getRooms = async () => {
  return await fetch(`${BASE_URL}${ROOMS}`);
};

export const deleteRoom = async (name) => {
  return await fetch(`${BASE_URL}${ROOMS}/${name}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const updateParticipant = async (name, userid) => {
  console.log('updateParticipant');
  return await fetch(`${BASE_URL}${PARTICIPANTS}/${name}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userid: userid }),
  });
};

export const addMetric = async (data) => {
  const metricData = {
    id: data.userid,
    name: data.roomname,
    videoRecvBitsPerSecond: data.videoRecvBitsPerSecond,
    videoRecvPacketLoss: data.videoRecvPacketLoss,
    videoSendBitsPerSecond: data.videoSendBitsPerSecond,
    videoSendPacketLoss: data.videoSendPacketLoss,
  };

  return await fetch(`${BASE_URL}${METRICS}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metricData),
  });
};

export const getMetrics = async (userid, roomname) => {
  return await fetch(`${BASE_URL}${METRICS}/${userid}/${roomname}`);
};
