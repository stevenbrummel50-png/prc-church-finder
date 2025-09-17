
// ===== 1. Your LocationIQ API key =====
const LOCATIONIQ_KEY = "pk.a421fb4f7cdb6c8f8cb0bbf90f92aba4";

// ===== 2. Churches list =====
const churches = [
  { name: "Byron Center PRC", lat: 42.82772167, lng: -85.72487963, link: "https://www.prca.org/churches-missions/byron-center-prc", sermons: "https://www.prca.org/resources/sermons?organization=byron-center-prc" },
  { name: "Cornerstone PRC (Dyer, IN)", lat: 41.42038853, lng: -87.49510702, link: "https://www.prca.org/churches-missions/cornerstone-prc-dyer-in", sermons: "https://www.prca.org/resources/sermons?organization=cornerstone-prc-dyer-in" },
  { name: "Faith PRC (Jenison, MI)", lat: 42.89947204, lng: -85.83015205, link: "https://www.prca.org/churches-missions/faith-prc-jenison-mi", sermons: "https://www.prca.org/resources/sermons?organization=faith-prc-jenison-mi" },
  { name: "First PRC (Grand Rapids, MI)", lat: 42.96910651, lng: -85.59974017, link: "https://www.prca.org/churches-missions/first-prc-grand-rapids-mi", sermons: "https://www.prca.org/resources/sermons?organization=first-prc-grand-rapids-mi" },
  { name: "First PRC (Holland, MI)", lat: 42.83495137, lng: -86.04015187, link: "https://www.prca.org/churches-missions/first-prc-holland-mi", sermons: "https://www.prca.org/resources/sermons?organization=first-prc-holland-mi" },
  { name: "Georgetown PRC (Hudsonville, MI)", lat: 42.89846653, lng: -85.90002256, link: "https://www.prca.org/churches-missions/georgetown-prc-hudsonville-mi", sermons: "https://www.prca.org/resources/sermons?organization=georgetown-prc-hudsonville-mi" },
  { name: "Grandville PRC", lat: 42.89078801, lng: -85.77032796, link: "https://www.prca.org/churches-missions/grandville-prc", sermons: "https://www.prca.org/resources/sermons?organization=grandville-prc" },
  { name: "Hope PRC (Walker, MI)", lat: 42.9381, lng: -85.7103, link: "https://www.prca.org/churches-missions/hope-prc-walker-mi", sermons: "https://www.prca.org/resources/sermons?organization=hope-prc-walker-mi" },
  { name: "Hudsonville PRC", lat: 42.86108252, lng: -85.85719596, link: "https://www.prca.org/churches-missions/hudsonville-prc", sermons: "https://www.prca.org/resources/sermons?organization=hudsonville-prc" },
  { name: "Kalamazoo PRC", lat: 42.29185526, lng: -85.64457334, link: "https://www.prca.org/churches-missions/kalamazoo-prc", sermons: "https://www.prca.org/resources/sermons?organization=kalamazoo-prc" },
  { name: "Providence PRC (Hudsonville, MI)", lat: 42.88522445, lng: -85.82103244, link: "https://www.prca.org/churches-missions/providence-prc-hudsonville-mi", sermons: "https://www.prca.org/resources/sermons?organization=providence-prc-hudsonville-mi" },
  { name: "Southeast PRC (Grand Rapids, MI)", lat: 42.86411607, lng: -85.72396248, link: "https://www.prca.org/churches-missions/southeast-prc-grand-rapids-mi", sermons: "https://www.prca.org/resources/sermons?organization=southeast-prc-grand-rapids-mi" },
  { name: "Southwest PRC (Wyoming, MI)", lat: 42.87614082, lng: -85.74383687, link: "https://www.prca.org/churches-missions/southwest-prc-wyoming-mi", sermons: "https://www.prca.org/resources/sermons?organization=southwest-prc-wyoming-mi" },
  { name: "Trinity PRC (Hudsonville, MI)", lat: 42.87125847, lng: -85.86557964, link: "https://www.prca.org/churches-missions/trinity-prc-hudsonville-prc", sermons: "https://www.prca.org/resources/sermons?organization=trinity-prc-hudsonville-prc" },
  { name: "Wingham PRC", lat: 43.88795609, lng: -81.31332734, link: "https://www.prca.org/churches-missions/wingham-prc", sermons: "https://www.prca.org/resources/sermons?organization=wingham-prc" },
  { name: "Calvary PRC (Hull, IA)", lat: 43.19040528, lng: -96.11911863, link: "https://www.prca.org/churches-missions/calvary-prc-hull-ia", sermons: "https://www.prca.org/resources/sermons?organization=calvary-prc-hull-ia" },
  { name: "Hull PRC", lat: 43.18783573, lng: -96.1465266, link: "https://www.prca.org/churches-missions/hull-prc", sermons: "https://www.prca.org/resources/sermons?organization=hull-prc" },
  { name: "Edgerton PRC", lat: 43.87349882, lng: -96.13347174, link: "https://www.prca.org/churches-missions/edgerton-prc", sermons: "https://www.prca.org/resources/sermons?organization=edgerton-prc" },
  { name: "Heritage PRC (Sioux Falls, SD)", lat: 43.54110603, lng: -96.68002537, link: "https://www.prca.org/churches-missions/heritage-prc-sioux-falls-sd", sermons: "https://www.prca.org/resources/sermons?organization=heritage-prc-sioux-falls-sd" },
  { name: "Immanuel PRC (Lacomba, AB)", lat: 52.4770889, lng: -113.7483309, link: "https://www.prca.org/churches-missions/immanuel-prc-lacombe-ab", sermons: "https://www.prca.org/resources/sermons?organization=immanuel-prc-lacombe-ab" },
  { name: "Lynden PRC", lat: 48.95157201, lng: -122.4532367, link: "https://www.prca.org/churches-missions/lynden-prc", sermons: "https://www.prca.org/resources/sermons?organization=lynden-prc" },
  { name: "Loveland PRC", lat: 40.45183475, lng: -105.0671417, link: "https://www.prca.org/churches-missions/loveland-prc", sermons: "https://www.prca.org/resources/sermons?organization=loveland-prc" },
  { name: "Peace PRC", lat: 41.43664561, lng: -87.51385628, link: "https://www.prca.org/churches-missions/peace-prc-dyer-in", sermons: "https://www.prca.org/resources/sermons?organization=peace-prc-dyer-in" },
  { name: "Pittsburgh PRC", lat: 40.41706537, lng: -79.84577336, link: "https://www.prca.org/churches-missions/pittsburgh-prc", sermons: "https://www.prca.org/resources/sermons?organization=pittsburgh-prc" },
  { name: "Randolph PRC", lat: 43.54428987, lng: -90.00347557, link: "https://www.prca.org/churches-missions/randolph-prc", sermons: "https://www.prca.org/resources/sermons?organization=randolph-prc" },
  { name: "Zion PRC (Jenison, MI)", lat: 42.90629327, lng: -85.81239838, link: "https://www.prca.org/churches-missions/zion-prc-jenison-mi", sermons: "https://www.prca.org/resources/sermons?organization=zion-prc-jenison-mi" }
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

    // Compute distances
    const nearbyChurches = churches
      .map(ch => ({
        ...ch,
        distance: getDistance(userLat, userLng, ch.lat, ch.lng)
      }))
      .filter(ch => ch.distance <= 100) // Only within 100 miles
      .sort((a, b) => a.distance - b.distance);

    const resultsDiv = document.getElementById("results");

    if (nearbyChurches.length === 0) {
      resultsDiv.innerHTML = `
        <p>No churches nearby within 100 miles. Please check out our 
        <a href="https://www.prca.org/churches-missions" target="_blank">live streams & churches</a>.</p>
      `;
    } else {
      resultsDiv.innerHTML = nearbyChurches
        .slice(0, 3) // show up to 3 nearest
        .map(ch => `
          <h2>
            <a href="${ch.link}" target="_blank">${ch.name}</a>
            &nbsp;|&nbsp;
            <a href="${ch.sermons}" target="_blank" class="sermons-link">Sermons</a>
            &nbsp;(${ch.distance.toFixed(1)} miles)
          </h2>
        `)
        .join("");
    }

  } catch (err) {
    console.error("Error:", err);
    alert("Error finding location.");
  }
}

