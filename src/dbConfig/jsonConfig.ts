import path from "path";
import fsPromises from "fs/promises";
export const usersFilePath = path.join(process.cwd(), "src/data/users.json");

export async function userMock() {
  const usersMock = await fsPromises.readFile(usersFilePath, "utf-8");
  const users = JSON.parse(usersMock);
  return users;
}
