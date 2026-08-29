const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yba-backend-production.up.railway.app/api';

export async function login(username, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login gagal");
  }

  localStorage.setItem("user", JSON.stringify(result.data));

  return result;
}

export function logout() {
  localStorage.removeItem("user");
}