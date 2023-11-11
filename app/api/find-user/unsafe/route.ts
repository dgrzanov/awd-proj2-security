//@ts-ignore
import conn from "../../../lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  const { username } = data;
  console.log("Data:", data);

  //@ts-ignore
  const result = await conn.query(
    `SELECT first_name, last_name, dob FROM proj2.users_unsafe WHERE username='${username}'`
  );
  console.log("Result: ", result);
  return Response.json(result.rows);
}

export async function GET() {
  return Response.json({ test: "testujem" });
}
