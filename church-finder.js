
// ===== 1. Your LocationIQ API key =====
const LOCATIONIQ_KEY = "pk.a421fb4f7cdb6c8f8cb0bbf90f92aba4";

// ===== 2. Churches list =====
const churches = [
  { name: "Byron Center PRC", lat: 42.82772167, lng: -85.72487963, link: "https://www.prca.org/churches-missions/byron-center-prc" },
  { name: "Cornerstone PRC", lat: 41.42038853, lng: -87.49510702, link: "https://www.prca.org/churches-missions/cornerstone-prc" },
  { name: "Faith PRC", lat: 42.89947204, lng: -85.83015205, link: "https://www.prca.org/churches-missions/faith-prc" },
  { name: "First PRC (Grand Rapids, MI)", lat: 42.96910651, lng: -85.59974017, link: "https://www.prca.org/churches-missions/first-prc-grand-rapids" },
  { name: "First PRC (Holland, MI)", lat: 42.83495137, lng: -86.04015187, link: "https://www.prca.org/churches-missions/first-prc-holland" },
  { name: "Georgetown PRC", lat: 42.89846653, lng: -85.90002256, link: "https://www.prca.org/churches-missions/georgetown-prc" },
  { name: "Grandville PRC", lat: 42.89078801, lng: -85.77032796, link: "https://www.prca.org/churches-missions/grandville-prc" },
  { name: "Hope PRC (Walker, MI)", lat: 42.9381, lng: -85.7103, link: "https://www.prca.org/churches-missions/hope-prc" },
  { name: "Hudsonville PRC", lat: 42.86108252, lng: -85.85719596, link: "https://www.prca.org/churches-missions/hudsonville-prc" },
  { name: "Kalamazoo PRC", lat: 42.29185526, lng: -85.64457334, link: "https://www.prca.org/churches-missions/kalamazoo-prc" },
  { name: "Providence PRC", lat: 42.88522445, lng: -85.82103244, link: "https://www.prca.org/churches-missions/providence-prc" },
  { name: "Southeast PRC", lat: 42.86411607, lng: -85.72396248, link: "https://www.prca.org/churches-missions/southeast-prc" },
  { name: "Southwest PRC", lat: 42.87614082, lng: -85.74383687, link: "https://www.prca.org/churches-missions/southwest-prc" },
  { name: "Trinity PRC", lat: 42.87125847, lng: -85.86557964, link: "https://www.prca.org/churches-missions/trinity-prc" },
  { name: "Wingham PRC", lat: 43.88795609, lng: -81.31332734, link: "https://www.prca.org/churches-missions/wingham-prc" },
  { name: "Calvary PRC", lat: 43.19040528, lng: -96.11911863, link: "https://www.prca.org/churches-missions/calvary-prc" },
  { name: "Hull PRC", lat: 43.18783573, lng: -96.1465266, link: "https://www.prca.org/churches-missions/hull-prc" },
  { name: "Edgerton PRC", lat: 43.87349882, lng: -96.13347174, link: "https://www.prca.org/churches-missions/edgerton-prc" },
  { name: "Heritage PRC", lat: 43.54110603, lng: -96.68002537, link: "https://www.prca.org/churches-missions/heritage-prc" },
  { name: "Immanuel PRC", lat: 52.4770889, lng: -113.7483309, link: "https://www.prca.org/churches-missions/immanuel-prc" },
  { name: "Lynden PRC", lat: 48.95157201, lng: -122.4532367, link: "https://www.prca.org/churches-missions/lynden-prc" },
  { name: "Loveland PRC", lat: 40.45183475, lng: -105.0671417, link: "https://www.prca.org/churches-missions/loveland-prc" },
  { name: "Peace PRC", lat: 41.43664561, lng: -87.51385628, link: "https://www.prca.org/churches-missions/peace-prc" },
  { name: "Pittsburgh PRC", lat: 40.41706537, lng: -79.84577336, link: "https://www.prca.org/churches-missions/pittsburgh-prc" },
  { name: "Randolph PRC", lat: 43.54428987, lng: -90.00347557, link: "https://www.prca.org/churches-missions/randolph-prc" },
  { name: "Zion PRC", lat: 42.90629327, lng: -85.81239838, link: "https://www.prca.org/churches-missions/zion-prc" }
];

// ===== 3. Haversine formula (distance calculator) =====
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// ===== 4. Geocoding function (ZIP → lat/lng) =====
async function geocodeZip(zip) {
  const url = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_KEY}&q=${zip}&countrycodes=us&format=json&limit=1`;

  const response = await fetch(url);
  const data = await response.json();

  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } else {
    throw new Error("Could not find location for ZIP");
  }
}

// ===== 5. Main function: find nearest churches =====
async function findChurches() {
  const zip = document.getElementById("address-input").value;
  if (!zip) return alert("Please enter a ZIP code.");

  try {
    const { lat: userLat, lng: userLng } = await geocodeZip(zip);

    const sorted = churches.map(ch => ({
      ...ch,
      distance: getDistance(userLat, userLng, ch.lat, ch.lng)
    })).sort((a, b) => a.distance - b.distance);

    document.getElementById("results").innerHTML = sorted.slice(0, 10)
      .map(ch => `<li><a href="${ch.link}" target="_blank">${ch.name}</a> — ${ch.distance.toFixed(1)} miles</li>`)
      .join("");
  } catch (err) {
    console.error("Error:", err);
    alert("Error finding location.");
  }
}

