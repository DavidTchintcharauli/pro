"use client";
import { useEffect, useState } from "react";

export const useTokens = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const retrieveTokens = () => {
    const accessToken = localStorage.getItem("refreshToken");
    const refreshToken = localStorage.getItem("accessTOken");

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  useEffect(() => {
    retrieveTokens();
  }, []);

  return { accessToken, refreshToken };
};
