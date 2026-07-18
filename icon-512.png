const RACE_INTERVAL_MS = 120_000;
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

function mixSeed(value) {
  let x = Number(value) >>> 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x7feb352d);
  x ^= x >>> 15;
  x = Math.imul(x, 0x846ca68b);
  x ^= x >>> 16;
  return x >>> 0;
}

function jstRaceInfo(startsAt) {
  const jst = new Date(startsAt + JST_OFFSET_MS);
  const hour = jst.getUTCHours();
  const minute = jst.getUTCMinutes();
  const displayRaceNumber = hour * 30 + Math.floor(minute / 2) + 1;
  const raceDate = [
    jst.getUTCFullYear(),
    String(jst.getUTCMonth() + 1).padStart(2, "0"),
    String(jst.getUTCDate()).padStart(2, "0")
  ].join("-");
  return { displayRaceNumber, raceDate };
}

export default async () => {
  const serverNow = Date.now();
  const startsAt = Math.ceil((serverNow + 1) / RACE_INTERVAL_MS) * RACE_INTERVAL_MS;
  // This large ID remains internal so every race stays globally unique.
  const raceNumber = Math.floor(startsAt / RACE_INTERVAL_MS);
  const seed = mixSeed(raceNumber ^ 0x4b454942);
  const { displayRaceNumber, raceDate } = jstRaceInfo(startsAt);

  return new Response(JSON.stringify({
    serverNow,
    startsAt,
    raceNumber,
    displayRaceNumber,
    raceDate,
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
