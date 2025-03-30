// pages/api/artists.js

import { getArtists } from "../../lib/preferences"

export async function GET() {

  const res = await getArtists();

  return Response.json(res)
}
