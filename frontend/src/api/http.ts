const apiURL = import.meta.env.VITE_VITE_API_URL;

export type AddApplicationType = {
  company: string;
  status: string;
  position: string;
  location: string;
  applied: string;
  interview?: string | null;
  notes?: string;
};

type UserType = {
  username: string;
  email: string;
  password: string;
};

export default async function addApplication(application: AddApplicationType) {
  try {
    const response = await fetch(`${apiURL.env.VITE_API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...application,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding application:", error);
    throw error;
  }
}

export async function updateApplication(
  id: string,
  updatedData: AddApplicationType,
) {
  try {
    const response = await fetch(`${apiURL}/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedData }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating application:", error);
    throw error;
  }
}

export async function getApplicationById(id: string) {
  try {
    const res = await fetch(`${apiURL}/applications/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch application data!!!");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getUserApplications(userId: string) {
  const res = await fetch(`${apiURL}/applications/user/${userId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch applications");
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format from server");
  }

  if (data.length === 0) {
    return [];
  }
  return data;
}

export async function deleteApplication(id: string) {
  try {
    const res = await fetch(`${apiURL}/applications/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete");
    }
  } catch (e) {
    console.error(e);
  }
}

async function parseResponse(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { message: text || "Unexpected server response" };
  }
}

export async function registerUser(newUser: UserType) {
  try {
    const response = await fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    const data = await parseResponse(response);
    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(`${apiURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await parseResponse(response);
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
