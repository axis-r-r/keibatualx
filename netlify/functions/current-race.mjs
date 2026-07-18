const RACE_INTERVAL_MS = 120_000;

function mixSeed(value) {
  let x = Number(value) >>> 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x7feb352d);
  x ^= x >>> 15;
  x = Math.imul(x, 0x846ca68b);
  x ^= x >>> 16;
  return x >>> 0;
}

export default async () => {
  const serverNow = Date.now();
  // Always advertise the next 2-minute boundary. Every browser receives the
  // same race number, start time and seed without needing a database.
  const startsAt = Math.ceil((serverNow + 1) / RACE_INTERVAL_MS) * RACE_INTERVAL_MS;
  const raceNumber = Math.floor(startsAt / RACE_INTERVAL_MS);
  const seed = mixSeed(raceNumber ^ 0x4b454942); // "KEIB" salt

  return new Response(JSON.stringify({
    serverNow,
    startsAt,
    raceNumber,
    seed,
    intervalMs: RACE_INTERVAL_MS,
    generatedAt: new Date(serverNow).toISOString()
  }), {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate",
      "access-control-allow-origin": "*"
    }
  });
};

export const config = {
  path: "/.netlify/functions/current-race"
};
