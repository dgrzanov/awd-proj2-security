//@ts-ignore
import conn from "../../../lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  const { username, password } = data;

  //@ts-ignore
  const result = await conn.query(
    `INSERT INTO users_safe (name, win, draw, defeat) VALUES ($1, $2, $3, $4) RETURNING id`,
    [compData.name, compData.win, compData.draw, compData.defeat]
  );
  const newId = result.rows[0].id;
  console.log(newId);
  generateCompetition(compData.competitors, newId);
  return Response.json({ success: true });
}

export async function GET() {
  return Response.json({ test: "testujem" });
}
