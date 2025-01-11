export async function logout() {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    const result = { success: true, message: "Logout successful!" };

    return result;
  } catch (error) {
    console.error("Error during logout:", error);
    return { success: false, message: "Something went wrong during logout." };
  }
}
