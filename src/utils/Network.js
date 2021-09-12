import { BASE_URL, ROOMS } from "../common/constants";

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
