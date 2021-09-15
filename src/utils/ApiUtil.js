import {
  BASE_URL,
  ROOMS,
  PARTICIPANTS,
  METRICS,
  HEADERS,
} from "../common/constants";

export const createRoom = async (name) => {
  return await fetch(`${BASE_URL}${ROOMS}/${name}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ name: name, privacy: "public" }),
  });
};

export const getRooms = async () => {
  return await fetch(`${BASE_URL}${ROOMS}`);
};

export const deleteRoom = async (name) => {
  return await fetch(`${BASE_URL}${ROOMS}/${name}`, {
    method: "DELETE",
    headers: HEADERS,
  });
};

export const updateParticipant = async (name, userid) => {
  console.log("updateParticipant");
  return await fetch(`${BASE_URL}${PARTICIPANTS}/${name}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify({ userid: userid }),
  });
};

export const addMetric = async (metricData) => {
  return await fetch(`${BASE_URL}${METRICS}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(metricData),
  });
};

export const getMetrics = async (userid, roomname) => {
  return await fetch(`${BASE_URL}${METRICS}/${userid}/${roomname}`);
};
