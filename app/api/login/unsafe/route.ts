//@ts-ignore
import conn from "../../../lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  const { username, password } = data;

  //@ts-ignore
  const result = await conn.query(
    `SELECT * FROM proj2.users_unsafe WHERE username=${username}`
  );
  if (result.rows[0].password == data.password)
    return Response.json({ success: true });
  else return Response.json({ success: false });
}
