
export type AddApplicationType = {
  company: string;
  status: string;
  position: string;
  location: string;
  applied: string;
  interview?: string;
  notes?: string;
};

type UserType = {
  username: string;
  email: string;
  password: string;
};

export default async function addApplication(application: AddApplicationType) {
  try {
    const response = await fetch("http://localhost:3000/applications", {
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

export async function getApplicationById(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/applications/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch application data");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteApplication(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/applications/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete");
    }
  } catch (e) {
    console.error(e);
  }
}

export async function registerUser(newUser: UserType) {
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}