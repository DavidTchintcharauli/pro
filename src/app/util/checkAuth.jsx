import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const checkAuth = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  const isAuthenicated = !(accessToken === null || refreshToken === null);

  if (!isAuthenicated) {
    redirect("/login");
  }
};
