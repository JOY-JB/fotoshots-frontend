import jwtDecode from "jwt-decode";

export const decodeData = (data: string) => {
  return jwtDecode(data);
};
