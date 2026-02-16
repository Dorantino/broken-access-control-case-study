import { users } from "./data";

export function getServerUser(username: string) {
    return users.find((u) => u.username === username) || null;
}
