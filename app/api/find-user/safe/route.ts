//@ts-ignore
import conn from "../../../lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  const { username } = data;

  //@ts-ignore
  const result = await conn.query(
    `SELECT first_name, last_name, dob FROM proj2.users_unsafe WHERE username=$1`,
    [username]
  );
  return Response.json(result.rows);
}
