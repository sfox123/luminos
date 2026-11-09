// Refreshes client/src/data/oni.json from NOAA CPC's Oceanic Niño Index file.
// Run with: npm run data:oni   (needs Node 18+ for fetch)
import { writeFile } from 'node:fs/promises';

const SOURCE = 'https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt';
const SEASONS = ['DJF', 'JFM', 'FMA', 'MAM', 'AMJ', 'MJJ', 'JJA', 'JAS', 'ASO', 'SON', 'OND', 'NDJ'];

const text = await (await fetch(SOURCE)).text();
const rows = text.trim().split('\n').slice(1).map((line) => {
  const [seas, yr, total, anom] = line.trim().split(/\s+/);
  return [Number(yr), SEASONS.indexOf(seas), Number(total), Number(anom), 0];
}).filter((r) => r[1] >= 0 && !Number.isNaN(r[3]));

// Classify: 5+ consecutive seasons at or beyond ±0.5 °C form an El Niño (1) or La Niña (-1) episode.
let i = 0;
while (i < rows.length) {
  const sign = rows[i][3] >= 0.5 ? 1 : rows[i][3] <= -0.5 ? -1 : 0;
  let j = i;
  if (sign) while (j + 1 < rows.length && rows[j + 1][3] * sign >= 0.5) j++;
  if (sign && j - i + 1 >= 5) for (let k = i; k <= j; k++) rows[k][4] = sign;
  i = j + 1;
}

const out = { source: `NOAA Climate Prediction Center, Oceanic Niño Index (ERSST.v5), ${SOURCE}`, seasons: SEASONS, rows };
await writeFile(new URL('../client/src/data/oni.json', import.meta.url), JSON.stringify(out));
console.log(`Saved ${rows.length} seasons, latest ${SEASONS[rows.at(-1)[1]]} ${rows.at(-1)[0]}: ${rows.at(-1)[3]}`);
