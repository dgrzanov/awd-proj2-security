//@ts-ignore
import conn from "../../../lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  const { username, password } = data;

  try {
    //@ts-ignore
    const result = await conn.query(
      `SELECT * FROM proj2.users_unsafe WHERE username=$1`,
      [username]
    );
    if (result.rows[0].password == password)
      return Response.json({
        success: true,
        message: "Uspjesno ste prijavljeni.",
      });
    else
      return Response.json({
        success: false,
        message: "Pogresno korisnicko ime ili lozinka!",
      });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Pogresno korisnicko ime ili lozinka!",
    });
  }
}
