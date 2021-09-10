import { KEY } from "../common/constants";

export const createRoom = async (name) => {
  return await fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${KEY}`,
    },
    body: `{"name":${name},"privacy":"public"}`,
  });
};

export const getRooms = async () => {
  return await fetch("https://api.daily.co/v1/rooms", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${KEY}`,
    },
  });
};
