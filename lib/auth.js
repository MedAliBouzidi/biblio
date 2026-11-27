import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signToken, verifyToken } from "./jwt";

export async function createSession(user) {
  const token = await signToken(user);
  const store = await cookies();
  store.set("mySession", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  (await cookies()).delete("mySession");
}

export async function getSession() {
  return verifyToken((await cookies()).get("mySession")?.value);
}

export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export async function requireAdmin() {
  const session = await requireUser();
  if (session.role !== "admin") redirect("/livres");
  return session;
}
