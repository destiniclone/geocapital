import { useState, useMemo, useRef, useEffect } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────
// Each entry: [country, wikiSlug, capitalLat, capitalLng, locations:[name,lat,lng,type]]
// types: "capital" | "former" | "city" | "unesco"
const COUNTRIES = [
  {
    name: "Afghanistan", wiki: "Afghanistan",
    cap: [34.5281, 69.1723],
    locs: [
      ["Kabul", 34.5281, 69.1723, "capital"],
      ["Kandahar", 31.6133, 65.7073, "former"],
      ["Mazar-i-Sharif", 36.7069, 67.1124, "city"],
      ["Herat", 34.3482, 62.2041, "city"],
      ["Jalalabad", 34.4415, 70.4360, "city"],
    ]
  },
  {
    name: "Albania", wiki: "Albania",
    cap: [41.3317, 19.8319],
    locs: [
      ["Tirana", 41.3317, 19.8319, "capital"],
      ["Durrës", 41.3246, 19.4565, "former"],
      ["Gjirokastër", 40.0758, 20.1389, "unesco"],
      ["Berat", 40.7058, 19.9522, "unesco"],
      ["Shkodër", 42.0683, 19.5126, "city"],
    ]
  },
  {
    name: "Algeria", wiki: "Algeria",
    cap: [36.7372, 3.0865],
    locs: [
      ["Algiers", 36.7372, 3.0865, "capital"],
      ["Oran", 35.6969, -0.6331, "city"],
      ["Constantine", 36.3650, 6.6147, "city"],
      ["Timgad", 35.4869, 6.4680, "unesco"],
      ["Tipasa", 36.5900, 2.4478, "unesco"],
    ]
  },
  {
    name: "Andorra", wiki: "Andorra",
    cap: [42.5063, 1.5218],
    locs: [
      ["Andorra la Vella", 42.5063, 1.5218, "capital"],
      ["Escaldes-Engordany", 42.5063, 1.5395, "city"],
    ]
  },
  {
    name: "Angola", wiki: "Angola",
    cap: [-8.8390, 13.2894],
    locs: [
      ["Luanda", -8.8390, 13.2894, "capital"],
      ["Lubango", -14.9177, 13.4920, "city"],
      ["Huambo", -12.7758, 15.7392, "city"],
      ["Lobito", -12.3647, 13.5459, "city"],
    ]
  },
  {
    name: "Antigua and Barbuda", wiki: "Antigua_and_Barbuda",
    cap: [17.1274, -61.8468],
    locs: [
      ["Saint John's", 17.1274, -61.8468, "capital"],
    ]
  },
  {
    name: "Argentina", wiki: "Argentina",
    cap: [-34.6037, -58.3816],
    locs: [
      ["Buenos Aires", -34.6037, -58.3816, "capital"],
      ["Córdoba", -31.4201, -64.1888, "city"],
      ["Rosario", -32.9442, -60.6505, "city"],
      ["Los Glaciares", -49.3167, -72.9167, "unesco"],
      ["Iguazú Falls", -25.6953, -54.4367, "unesco"],
    ]
  },
  {
    name: "Armenia", wiki: "Armenia",
    cap: [40.1872, 44.5152],
    locs: [
      ["Yerevan", 40.1872, 44.5152, "capital"],
      ["Vagharshapat (Etchmiadzin)", 40.1619, 44.2939, "unesco"],
      ["Gyumri", 40.7942, 43.8453, "city"],
      ["Vanadzor", 40.8128, 44.4879, "city"],
    ]
  },
  {
    name: "Australia", wiki: "Australia",
    cap: [-35.2835, 149.1281],
    locs: [
      ["Canberra", -35.2835, 149.1281, "capital"],
      ["Sydney", -33.8688, 151.2093, "city"],
      ["Melbourne", -37.8136, 144.9631, "city"],
      ["Uluru-Kata Tjuta", -25.3444, 131.0369, "unesco"],
      ["Great Barrier Reef", -18.2871, 147.6992, "unesco"],
    ]
  },
  {
    name: "Austria", wiki: "Austria",
    cap: [48.2082, 16.3738],
    locs: [
      ["Vienna", 48.2082, 16.3738, "capital"],
      ["Salzburg", 47.8095, 13.0550, "unesco"],
      ["Graz", 47.0707, 15.4395, "unesco"],
      ["Innsbruck", 47.2692, 11.4041, "city"],
      ["Linz", 48.3064, 14.2858, "city"],
    ]
  },
  {
    name: "Azerbaijan", wiki: "Azerbaijan",
    cap: [40.4093, 49.8671],
    locs: [
      ["Baku", 40.4093, 49.8671, "capital"],
      ["Ganja", 40.6828, 46.3606, "city"],
      ["Walled City of Baku", 40.3667, 49.8333, "unesco"],
    ]
  },
  {
    name: "Bahamas", wiki: "The_Bahamas",
    cap: [25.0480, -77.3554],
    locs: [
      ["Nassau", 25.0480, -77.3554, "capital"],
    ]
  },
  {
    name: "Bahrain", wiki: "Bahrain",
    cap: [26.2154, 50.5832],
    locs: [
      ["Manama", 26.2154, 50.5832, "capital"],
      ["Qal'at al-Bahrain", 26.2333, 50.5167, "unesco"],
    ]
  },
  {
    name: "Bangladesh", wiki: "Bangladesh",
    cap: [23.8103, 90.4125],
    locs: [
      ["Dhaka", 23.8103, 90.4125, "capital"],
      ["Chittagong", 22.3569, 91.7832, "city"],
      ["Sylhet", 24.8949, 91.8687, "city"],
      ["Historic Mosque City of Bagerhat", 22.6600, 89.7600, "unesco"],
    ]
  },
  {
    name: "Barbados", wiki: "Barbados",
    cap: [13.0969, -59.6145],
    locs: [
      ["Bridgetown", 13.0969, -59.6145, "capital"],
      ["Bridgetown Historic Area", 13.0975, -59.6167, "unesco"],
    ]
  },
  {
    name: "Belarus", wiki: "Belarus",
    cap: [53.9006, 27.5590],
    locs: [
      ["Minsk", 53.9006, 27.5590, "capital"],
      ["Mir Castle", 53.4519, 26.4728, "unesco"],
      ["Nesvizh Castle", 53.2208, 26.6917, "unesco"],
      ["Brest", 52.0976, 23.7341, "city"],
      ["Grodno", 53.6884, 23.8258, "city"],
    ]
  },
  {
    name: "Belgium", wiki: "Belgium",
    cap: [50.8503, 4.3517],
    locs: [
      ["Brussels", 50.8503, 4.3517, "capital"],
      ["Bruges", 51.2093, 3.2247, "unesco"],
      ["Ghent", 51.0543, 3.7174, "city"],
      ["Antwerp", 51.2194, 4.4025, "city"],
      ["Liège", 50.6326, 5.5797, "city"],
    ]
  },
  {
    name: "Belize", wiki: "Belize",
    cap: [17.2510, -88.7590],
    locs: [
      ["Belmopan", 17.2510, -88.7590, "capital"],
      ["Belize City", 17.4998, -88.1962, "former"],
      ["Belize Barrier Reef", 17.5000, -87.8333, "unesco"],
    ]
  },
  {
    name: "Benin", wiki: "Benin",
    cap: [6.3676, 2.4252],
    locs: [
      ["Porto-Novo", 6.3676, 2.4252, "capital"],
      ["Cotonou", 6.3654, 2.4183, "city"],
      ["Abomey", 7.1841, 1.9888, "unesco"],
    ]
  },
  {
    name: "Bhutan", wiki: "Bhutan",
    cap: [27.4728, 89.6390],
    locs: [
      ["Thimphu", 27.4728, 89.6390, "capital"],
      ["Paro", 27.4287, 89.4164, "city"],
      ["Punakha", 27.5906, 89.8678, "former"],
    ]
  },
  {
    name: "Bolivia", wiki: "Bolivia",
    cap: [-16.5000, -68.1501],
    locs: [
      ["Sucre", -19.0478, -65.2592, "capital"],
      ["La Paz", -16.5000, -68.1501, "former"],
      ["Santa Cruz", -17.8146, -63.1561, "city"],
      ["Tiwanaku", -16.5544, -68.6731, "unesco"],
      ["Potosí", -19.5836, -65.7531, "unesco"],
    ]
  },
  {
    name: "Bosnia and Herzegovina", wiki: "Bosnia_and_Herzegovina",
    cap: [43.8486, 18.3564],
    locs: [
      ["Sarajevo", 43.8486, 18.3564, "capital"],
      ["Mostar", 43.3438, 17.8078, "unesco"],
      ["Banja Luka", 44.7722, 17.1910, "city"],
    ]
  },
  {
    name: "Botswana", wiki: "Botswana",
    cap: [-24.6282, 25.9231],
    locs: [
      ["Gaborone", -24.6282, 25.9231, "capital"],
      ["Francistown", -21.1658, 27.5103, "city"],
      ["Okavango Delta", -19.2833, 22.9167, "unesco"],
    ]
  },
  {
    name: "Brazil", wiki: "Brazil",
    cap: [-15.7795, -47.9297],
    locs: [
      ["Brasília", -15.7795, -47.9297, "capital"],
      ["Rio de Janeiro", -22.9068, -43.1729, "former"],
      ["São Paulo", -23.5558, -46.6396, "city"],
      ["Salvador", -12.9714, -38.5014, "city"],
      ["Olinda", -8.0089, -34.8553, "unesco"],
    ]
  },
  {
    name: "Brunei", wiki: "Brunei",
    cap: [4.9031, 114.9398],
    locs: [
      ["Bandar Seri Begawan", 4.9031, 114.9398, "capital"],
    ]
  },
  {
    name: "Bulgaria", wiki: "Bulgaria",
    cap: [42.6977, 23.3219],
    locs: [
      ["Sofia", 42.6977, 23.3219, "capital"],
      ["Plovdiv", 42.1354, 24.7453, "former"],
      ["Varna", 43.2141, 27.9147, "city"],
      ["Boyana Church", 42.6431, 23.2672, "unesco"],
      ["Rila Monastery", 42.1333, 23.3417, "unesco"],
    ]
  },
  {
    name: "Burkina Faso", wiki: "Burkina_Faso",
    cap: [12.3714, -1.5197],
    locs: [
      ["Ouagadougou", 12.3714, -1.5197, "capital"],
      ["Bobo-Dioulasso", 11.1771, -4.2979, "city"],
    ]
  },
  {
    name: "Burundi", wiki: "Burundi",
    cap: [-3.3818, 29.3622],
    locs: [
      ["Gitega", -3.4271, 29.9249, "capital"],
      ["Bujumbura", -3.3818, 29.3622, "former"],
    ]
  },
  {
    name: "Cabo Verde", wiki: "Cape_Verde",
    cap: [14.9330, -23.5133],
    locs: [
      ["Praia", 14.9330, -23.5133, "capital"],
      ["Cidade Velha", 14.9167, -23.6000, "unesco"],
    ]
  },
  {
    name: "Cambodia", wiki: "Cambodia",
    cap: [11.5625, 104.9160],
    locs: [
      ["Phnom Penh", 11.5625, 104.9160, "capital"],
      ["Angkor", 13.4125, 103.8670, "unesco"],
      ["Siem Reap", 13.3671, 103.8448, "city"],
      ["Battambang", 13.0957, 103.2022, "city"],
    ]
  },
  {
    name: "Cameroon", wiki: "Cameroon",
    cap: [3.8667, 11.5167],
    locs: [
      ["Yaoundé", 3.8667, 11.5167, "capital"],
      ["Douala", 4.0511, 9.7679, "city"],
      ["Dja Wildlife Reserve", 2.8333, 12.5167, "unesco"],
    ]
  },
  {
    name: "Canada", wiki: "Canada",
    cap: [45.4215, -75.6972],
    locs: [
      ["Ottawa", 45.4215, -75.6972, "capital"],
      ["Toronto", 43.6532, -79.3832, "city"],
      ["Montreal", 45.5017, -73.5673, "city"],
      ["Vancouver", 49.2827, -123.1207, "city"],
      ["Old Town Lunenburg", 44.3782, -64.3122, "unesco"],
    ]
  },
  {
    name: "Central African Republic", wiki: "Central_African_Republic",
    cap: [4.3612, 18.5550],
    locs: [
      ["Bangui", 4.3612, 18.5550, "capital"],
      ["Manovo-Gounda St Floris", 9.6000, 21.8167, "unesco"],
    ]
  },
  {
    name: "Chad", wiki: "Chad",
    cap: [12.1048, 15.0444],
    locs: [
      ["N'Djamena", 12.1048, 15.0444, "capital"],
      ["Moundou", 8.5667, 16.0833, "city"],
    ]
  },
  {
    name: "Chile", wiki: "Chile",
    cap: [-33.4489, -70.6693],
    locs: [
      ["Santiago", -33.4489, -70.6693, "capital"],
      ["Valparaíso", -33.0472, -71.6127, "unesco"],
      ["Easter Island (Rapa Nui)", -27.1127, -109.3497, "unesco"],
      ["Antofagasta", -23.6509, -70.3954, "city"],
      ["Concepción", -36.8201, -73.0444, "city"],
    ]
  },
  {
    name: "China", wiki: "China",
    cap: [39.9042, 116.4074],
    locs: [
      ["Beijing", 39.9042, 116.4074, "capital"],
      ["Nanjing", 32.0603, 118.7969, "former"],
      ["Shanghai", 31.2304, 121.4737, "city"],
      ["Guangzhou", 23.1291, 113.2644, "city"],
      ["The Great Wall", 40.4319, 116.5704, "unesco"],
    ]
  },
  {
    name: "Colombia", wiki: "Colombia",
    cap: [4.7110, -74.0721],
    locs: [
      ["Bogotá", 4.7110, -74.0721, "capital"],
      ["Medellín", 6.2442, -75.5812, "city"],
      ["Cali", 3.4516, -76.5320, "city"],
      ["Cartagena", 10.3910, -75.4794, "unesco"],
      ["Mompox", 9.2419, -74.4267, "unesco"],
    ]
  },
  {
    name: "Comoros", wiki: "Comoros",
    cap: [-11.7022, 43.2551],
    locs: [
      ["Moroni", -11.7022, 43.2551, "capital"],
    ]
  },
  {
    name: "Congo (Democratic Republic)", wiki: "Democratic_Republic_of_the_Congo",
    cap: [-4.3276, 15.3136],
    locs: [
      ["Kinshasa", -4.3276, 15.3136, "capital"],
      ["Lubumbashi", -11.6600, 27.4794, "city"],
      ["Virunga National Park", -0.6167, 29.5000, "unesco"],
    ]
  },
  {
    name: "Congo (Republic)", wiki: "Republic_of_the_Congo",
    cap: [-4.2661, 15.2832],
    locs: [
      ["Brazzaville", -4.2661, 15.2832, "capital"],
      ["Pointe-Noire", -4.7692, 11.8664, "city"],
    ]
  },
  {
    name: "Costa Rica", wiki: "Costa_Rica",
    cap: [9.9281, -84.0907],
    locs: [
      ["San José", 9.9281, -84.0907, "capital"],
      ["Área de Conservación Guanacaste", 10.9333, -85.5667, "unesco"],
    ]
  },
  {
    name: "Côte d'Ivoire", wiki: "Ivory_Coast",
    cap: [6.8276, -5.2893],
    locs: [
      ["Yamoussoukro", 6.8276, -5.2893, "capital"],
      ["Abidjan", 5.3600, -4.0083, "former"],
      ["Tai National Park", 5.8333, -7.3333, "unesco"],
    ]
  },
  {
    name: "Croatia", wiki: "Croatia",
    cap: [45.8150, 15.9819],
    locs: [
      ["Zagreb", 45.8150, 15.9819, "capital"],
      ["Dubrovnik", 42.6507, 18.0944, "unesco"],
      ["Split", 43.5081, 16.4402, "unesco"],
      ["Plitvice Lakes", 44.8654, 15.5820, "unesco"],
      ["Trogir", 43.5158, 16.2511, "unesco"],
    ]
  },
  {
    name: "Cuba", wiki: "Cuba",
    cap: [23.1136, -82.3666],
    locs: [
      ["Havana", 23.1136, -82.3666, "capital"],
      ["Old Havana", 23.1319, -82.3571, "unesco"],
      ["Trinidad", 21.8028, -79.9841, "unesco"],
      ["Santiago de Cuba", 20.0243, -75.8219, "city"],
      ["Camagüey", 21.3803, -77.9169, "city"],
    ]
  },
  {
    name: "Cyprus", wiki: "Cyprus",
    cap: [35.1856, 33.3823],
    locs: [
      ["Nicosia", 35.1856, 33.3823, "capital"],
      ["Paphos", 34.7754, 32.4254, "unesco"],
      ["Limassol", 34.6786, 33.0413, "city"],
    ]
  },
  {
    name: "Czech Republic", wiki: "Czech_Republic",
    cap: [50.0755, 14.4378],
    locs: [
      ["Prague", 50.0755, 14.4378, "capital"],
      ["Český Krumlov", 48.8127, 14.3175, "unesco"],
      ["Kutná Hora", 49.9480, 15.2681, "unesco"],
      ["Brno", 49.1951, 16.6068, "city"],
      ["Olomouc", 49.5938, 17.2509, "unesco"],
    ]
  },
  {
    name: "Denmark", wiki: "Denmark",
    cap: [55.6761, 12.5683],
    locs: [
      ["Copenhagen", 55.6761, 12.5683, "capital"],
      ["Roskilde", 55.6415, 12.0803, "former"],
      ["Aarhus", 56.1629, 10.2039, "city"],
      ["Jelling Mounds", 55.7553, 9.4208, "unesco"],
    ]
  },
  {
    name: "Djibouti", wiki: "Djibouti",
    cap: [11.8251, 42.5903],
    locs: [
      ["Djibouti City", 11.8251, 42.5903, "capital"],
    ]
  },
  {
    name: "Dominica", wiki: "Dominica",
    cap: [15.3017, -61.3881],
    locs: [
      ["Roseau", 15.3017, -61.3881, "capital"],
    ]
  },
  {
    name: "Dominican Republic", wiki: "Dominican_Republic",
    cap: [18.4861, -69.9312],
    locs: [
      ["Santo Domingo", 18.4861, -69.9312, "capital"],
      ["Colonial City of Santo Domingo", 18.4730, -69.8820, "unesco"],
      ["Santiago de los Caballeros", 19.4517, -70.6970, "city"],
    ]
  },
  {
    name: "Ecuador", wiki: "Ecuador",
    cap: [-0.2298, -78.5249],
    locs: [
      ["Quito", -0.2298, -78.5249, "capital"],
      ["Galápagos Islands", -0.9538, -90.9656, "unesco"],
      ["Guayaquil", -2.1962, -79.8862, "city"],
      ["Cuenca", -2.9001, -79.0059, "unesco"],
    ]
  },
  {
    name: "Egypt", wiki: "Egypt",
    cap: [30.0444, 31.2357],
    locs: [
      ["Cairo", 30.0444, 31.2357, "capital"],
      ["Alexandria", 31.1975, 29.8925, "former"],
      ["Memphis", 29.8442, 31.2527, "former"],
      ["Luxor/Thebes", 25.6872, 32.6396, "unesco"],
      ["Abu Simbel", 22.3372, 31.6258, "unesco"],
    ]
  },
  {
    name: "El Salvador", wiki: "El_Salvador",
    cap: [13.6929, -89.2182],
    locs: [
      ["San Salvador", 13.6929, -89.2182, "capital"],
      ["Joya de Cerén", 13.7169, -89.5728, "unesco"],
    ]
  },
  {
    name: "Equatorial Guinea", wiki: "Equatorial_Guinea",
    cap: [3.7500, 8.7833],
    locs: [
      ["Malabo", 3.7500, 8.7833, "capital"],
      ["Bata", 1.8639, 9.7661, "city"],
    ]
  },
  {
    name: "Eritrea", wiki: "Eritrea",
    cap: [15.3229, 38.9251],
    locs: [
      ["Asmara", 15.3229, 38.9251, "capital"],
      ["Asmara Modernist City", 15.3389, 38.9311, "unesco"],
    ]
  },
  {
    name: "Estonia", wiki: "Estonia",
    cap: [59.4370, 24.7536],
    locs: [
      ["Tallinn", 59.4370, 24.7536, "capital"],
      ["Old Town Tallinn", 59.4369, 24.7453, "unesco"],
      ["Tartu", 58.3780, 26.7290, "city"],
    ]
  },
  {
    name: "Eswatini", wiki: "Eswatini",
    cap: [-26.3054, 31.1367],
    locs: [
      ["Mbabane", -26.3054, 31.1367, "capital"],
      ["Lobamba", -26.4667, 31.2000, "former"],
    ]
  },
  {
    name: "Ethiopia", wiki: "Ethiopia",
    cap: [8.9806, 38.7578],
    locs: [
      ["Addis Ababa", 8.9806, 38.7578, "capital"],
      ["Aksum", 14.1310, 38.7256, "unesco"],
      ["Lalibela", 12.0319, 39.0472, "unesco"],
      ["Gondar", 12.6000, 37.4667, "former"],
      ["Harar Jugol", 9.3134, 42.1302, "unesco"],
    ]
  },
  {
    name: "Fiji", wiki: "Fiji",
    cap: [-18.1416, 178.4419],
    locs: [
      ["Suva", -18.1416, 178.4419, "capital"],
      ["Nadi", -17.7765, 177.4356, "city"],
    ]
  },
  {
    name: "Finland", wiki: "Finland",
    cap: [60.1699, 24.9384],
    locs: [
      ["Helsinki", 60.1699, 24.9384, "capital"],
      ["Turku", 60.4518, 22.2666, "former"],
      ["Suomenlinna Sea Fortress", 60.1453, 24.9880, "unesco"],
      ["Tampere", 61.4978, 23.7610, "city"],
    ]
  },
  {
    name: "France", wiki: "France",
    cap: [48.8566, 2.3522],
    locs: [
      ["Paris", 48.8566, 2.3522, "capital"],
      ["Versailles", 48.8048, 2.1203, "unesco"],
      ["Lyon", 45.7640, 4.8357, "city"],
      ["Mont-Saint-Michel", 48.6361, -1.5115, "unesco"],
      ["Strasbourg", 48.5734, 7.7521, "unesco"],
    ]
  },
  {
    name: "Gabon", wiki: "Gabon",
    cap: [0.3901, 9.4500],
    locs: [
      ["Libreville", 0.3901, 9.4500, "capital"],
      ["Port-Gentil", -0.7193, 8.7815, "city"],
    ]
  },
  {
    name: "Gambia", wiki: "The_Gambia",
    cap: [13.4531, -16.5775],
    locs: [
      ["Banjul", 13.4531, -16.5775, "capital"],
      ["Kunta Kinteh Island", 13.5333, -16.5333, "unesco"],
    ]
  },
  {
    name: "Georgia", wiki: "Georgia_(country)",
    cap: [41.6938, 44.8015],
    locs: [
      ["Tbilisi", 41.6938, 44.8015, "capital"],
      ["Mtskheta", 41.8452, 44.7188, "unesco"],
      ["Kutaisi", 42.2679, 42.7057, "former"],
      ["Batumi", 41.6168, 41.6367, "city"],
    ]
  },
  {
    name: "Germany", wiki: "Germany",
    cap: [52.5200, 13.4050],
    locs: [
      ["Berlin", 52.5200, 13.4050, "capital"],
      ["Bonn", 50.7374, 7.0982, "former"],
      ["Cologne Cathedral", 50.9413, 6.9583, "unesco"],
      ["Hamburg", 53.5753, 10.0153, "city"],
      ["Munich", 48.1351, 11.5820, "city"],
    ]
  },
  {
    name: "Ghana", wiki: "Ghana",
    cap: [5.5600, -0.2057],
    locs: [
      ["Accra", 5.5600, -0.2057, "capital"],
      ["Kumasi", 6.6884, -1.6244, "city"],
      ["Forts and Castles of Ghana", 5.1033, -1.2825, "unesco"],
    ]
  },
  {
    name: "Greece", wiki: "Greece",
    cap: [37.9838, 23.7275],
    locs: [
      ["Athens", 37.9838, 23.7275, "capital"],
      ["Thessaloniki", 40.6401, 22.9444, "city"],
      ["Acropolis of Athens", 37.9715, 23.7267, "unesco"],
      ["Delphi", 38.4824, 22.5011, "unesco"],
      ["Meteora", 39.7217, 21.6306, "unesco"],
    ]
  },
  {
    name: "Grenada", wiki: "Grenada",
    cap: [12.0561, -61.7488],
    locs: [
      ["Saint George's", 12.0561, -61.7488, "capital"],
    ]
  },
  {
    name: "Guatemala", wiki: "Guatemala",
    cap: [14.6349, -90.5069],
    locs: [
      ["Guatemala City", 14.6349, -90.5069, "capital"],
      ["Antigua Guatemala", 14.5586, -90.7295, "unesco"],
      ["Tikal", 17.2220, -89.6237, "unesco"],
      ["Quetzaltenango", 14.8444, -91.5175, "city"],
    ]
  },
  {
    name: "Guinea", wiki: "Guinea",
    cap: [9.6412, -13.5784],
    locs: [
      ["Conakry", 9.6412, -13.5784, "capital"],
    ]
  },
  {
    name: "Guinea-Bissau", wiki: "Guinea-Bissau",
    cap: [11.8636, -15.5977],
    locs: [
      ["Bissau", 11.8636, -15.5977, "capital"],
      ["Bijagós Archipelago", 11.2667, -16.1000, "unesco"],
    ]
  },
  {
    name: "Guyana", wiki: "Guyana",
    cap: [6.8013, -58.1553],
    locs: [
      ["Georgetown", 6.8013, -58.1553, "capital"],
    ]
  },
  {
    name: "Haiti", wiki: "Haiti",
    cap: [18.5944, -72.3074],
    locs: [
      ["Port-au-Prince", 18.5944, -72.3074, "capital"],
      ["National History Park", 19.7000, -72.2667, "unesco"],
    ]
  },
  {
    name: "Honduras", wiki: "Honduras",
    cap: [14.0723, -87.2062],
    locs: [
      ["Tegucigalpa", 14.0723, -87.2062, "capital"],
      ["Copán", 14.8333, -89.1333, "unesco"],
      ["San Pedro Sula", 15.5000, -88.0333, "city"],
    ]
  },
  {
    name: "Hungary", wiki: "Hungary",
    cap: [47.4979, 19.0402],
    locs: [
      ["Budapest", 47.4979, 19.0402, "capital"],
      ["Budapest (Danube Banks)", 47.4979, 19.0402, "unesco"],
      ["Debrecen", 47.5316, 21.6273, "city"],
      ["Pécs", 46.0727, 18.2330, "unesco"],
      ["Hollókő", 47.9975, 19.5839, "unesco"],
    ]
  },
  {
    name: "Iceland", wiki: "Iceland",
    cap: [64.1466, -21.9426],
    locs: [
      ["Reykjavik", 64.1466, -21.9426, "capital"],
      ["Þingvellir National Park", 64.2558, -21.1300, "unesco"],
      ["Akureyri", 65.6885, -18.1262, "city"],
    ]
  },
  {
    name: "India", wiki: "India",
    cap: [28.6139, 77.2090],
    locs: [
      ["New Delhi", 28.6139, 77.2090, "capital"],
      ["Calcutta (Kolkata)", 22.5726, 88.3639, "former"],
      ["Mumbai", 19.0760, 72.8777, "city"],
      ["Agra (Taj Mahal)", 27.1767, 78.0081, "unesco"],
      ["Jaipur", 26.9124, 75.7873, "unesco"],
    ]
  },
  {
    name: "Indonesia", wiki: "Indonesia",
    cap: [-6.2088, 106.8456],
    locs: [
      ["Jakarta", -6.2088, 106.8456, "former"],
      ["Nusantara", -1.0000, 117.0000, "capital"],
      ["Borobudur", -7.6079, 110.2038, "unesco"],
      ["Prambanan", -7.7520, 110.4915, "unesco"],
      ["Bali", -8.3405, 115.0920, "city"],
    ]
  },
  {
    name: "Iran", wiki: "Iran",
    cap: [35.6892, 51.3890],
    locs: [
      ["Tehran", 35.6892, 51.3890, "capital"],
      ["Isfahan", 32.6539, 51.6660, "former"],
      ["Persepolis", 29.9350, 52.8912, "unesco"],
      ["Mashhad", 36.2971, 59.6062, "city"],
      ["Shiraz", 29.5918, 52.5836, "city"],
    ]
  },
  {
    name: "Iraq", wiki: "Iraq",
    cap: [33.3152, 44.3661],
    locs: [
      ["Baghdad", 33.3152, 44.3661, "capital"],
      ["Babylon", 32.5355, 44.4275, "former"],
      ["Hatra", 35.5875, 42.7186, "unesco"],
      ["Basra", 30.5085, 47.7804, "city"],
      ["Mosul", 36.3350, 43.1189, "city"],
    ]
  },
  {
    name: "Ireland", wiki: "Republic_of_Ireland",
    cap: [53.3498, -6.2603],
    locs: [
      ["Dublin", 53.3498, -6.2603, "capital"],
      ["Brú na Bóinne", 53.6947, -6.4756, "unesco"],
      ["Sceilg Mhichíl", 51.7717, -10.5397, "unesco"],
      ["Cork", 51.8985, -8.4756, "city"],
      ["Galway", 53.2707, -9.0568, "city"],
    ]
  },
  {
    name: "Israel", wiki: "Israel",
    cap: [31.7683, 35.2137],
    locs: [
      ["Jerusalem", 31.7683, 35.2137, "capital"],
      ["Tel Aviv", 32.0853, 34.7818, "city"],
      ["Old City of Acre", 32.9252, 35.0686, "unesco"],
      ["White City of Tel Aviv", 32.0803, 34.7806, "unesco"],
      ["Masada", 31.3156, 35.3534, "unesco"],
    ]
  },
  {
    name: "Italy", wiki: "Italy",
    cap: [41.9028, 12.4964],
    locs: [
      ["Rome", 41.9028, 12.4964, "capital"],
      ["Florence", 43.7696, 11.2558, "unesco"],
      ["Venice", 45.4408, 12.3155, "unesco"],
      ["Milan", 45.4642, 9.1900, "city"],
      ["Pompeii", 40.7462, 14.4989, "unesco"],
    ]
  },
  {
    name: "Jamaica", wiki: "Jamaica",
    cap: [17.9714, -76.7937],
    locs: [
      ["Kingston", 17.9714, -76.7937, "capital"],
      ["Spanish Town", 17.9912, -76.9564, "former"],
    ]
  },
  {
    name: "Japan", wiki: "Japan",
    cap: [35.6762, 139.6503],
    locs: [
      ["Tokyo", 35.6762, 139.6503, "capital"],
      ["Kyoto", 35.0116, 135.7681, "former"],
      ["Hiroshima Peace Memorial", 34.3955, 132.4536, "unesco"],
      ["Historic Kyoto", 35.0116, 135.7681, "unesco"],
      ["Nara", 34.6851, 135.8048, "unesco"],
    ]
  },
  {
    name: "Jordan", wiki: "Jordan",
    cap: [31.9566, 35.9456],
    locs: [
      ["Amman", 31.9566, 35.9456, "capital"],
      ["Petra", 30.3285, 35.4444, "unesco"],
      ["Wadi Rum", 29.5869, 35.4231, "unesco"],
      ["Jerash", 32.2760, 35.8980, "unesco"],
      ["Zarqa", 32.0728, 36.0880, "city"],
    ]
  },
  {
    name: "Kazakhstan", wiki: "Kazakhstan",
    cap: [51.1801, 71.4460],
    locs: [
      ["Astana", 51.1801, 71.4460, "capital"],
      ["Almaty", 43.2220, 76.8512, "former"],
      ["Mausoleum of Khoja Ahmed Yasawi", 43.2997, 68.2744, "unesco"],
    ]
  },
  {
    name: "Kenya", wiki: "Kenya",
    cap: [-1.2921, 36.8219],
    locs: [
      ["Nairobi", -1.2921, 36.8219, "capital"],
      ["Mombasa", -4.0435, 39.6682, "city"],
      ["Lamu Old Town", -2.2717, 40.9023, "unesco"],
      ["Kisumu", -0.1022, 34.7617, "city"],
    ]
  },
  {
    name: "Kiribati", wiki: "Kiribati",
    cap: [1.3290, 172.9790],
    locs: [
      ["South Tarawa", 1.3290, 172.9790, "capital"],
    ]
  },
  {
    name: "Kuwait", wiki: "Kuwait",
    cap: [29.3759, 47.9774],
    locs: [
      ["Kuwait City", 29.3759, 47.9774, "capital"],
    ]
  },
  {
    name: "Kyrgyzstan", wiki: "Kyrgyzstan",
    cap: [42.8746, 74.5698],
    locs: [
      ["Bishkek", 42.8746, 74.5698, "capital"],
      ["Osh", 40.5283, 72.7985, "former"],
      ["Sulaiman-Too Mountain", 40.5234, 72.7833, "unesco"],
    ]
  },
  {
    name: "Laos", wiki: "Laos",
    cap: [17.9757, 102.6331],
    locs: [
      ["Vientiane", 17.9757, 102.6331, "capital"],
      ["Luang Prabang", 19.8833, 102.1328, "unesco"],
      ["Vat Phou", 14.8417, 105.8186, "unesco"],
    ]
  },
  {
    name: "Latvia", wiki: "Latvia",
    cap: [56.9496, 24.1052],
    locs: [
      ["Riga", 56.9496, 24.1052, "capital"],
      ["Historic Centre of Riga", 56.9489, 24.1064, "unesco"],
      ["Daugavpils", 55.8747, 26.5361, "city"],
    ]
  },
  {
    name: "Lebanon", wiki: "Lebanon",
    cap: [33.8886, 35.4955],
    locs: [
      ["Beirut", 33.8886, 35.4955, "capital"],
      ["Byblos", 34.1236, 35.6481, "unesco"],
      ["Baalbek", 34.0039, 36.2120, "unesco"],
      ["Tyre", 33.2705, 35.1985, "unesco"],
    ]
  },
  {
    name: "Lesotho", wiki: "Lesotho",
    cap: [-29.3167, 27.4833],
    locs: [
      ["Maseru", -29.3167, 27.4833, "capital"],
    ]
  },
  {
    name: "Liberia", wiki: "Liberia",
    cap: [6.3005, -10.7969],
    locs: [
      ["Monrovia", 6.3005, -10.7969, "capital"],
    ]
  },
  {
    name: "Libya", wiki: "Libya",
    cap: [32.9006, 13.1862],
    locs: [
      ["Tripoli", 32.9006, 13.1862, "capital"],
      ["Leptis Magna", 32.6395, 14.2908, "unesco"],
      ["Cyrene", 32.8228, 21.8575, "unesco"],
      ["Benghazi", 32.1154, 20.0686, "city"],
    ]
  },
  {
    name: "Liechtenstein", wiki: "Liechtenstein",
    cap: [47.1410, 9.5215],
    locs: [
      ["Vaduz", 47.1410, 9.5215, "capital"],
    ]
  },
  {
    name: "Lithuania", wiki: "Lithuania",
    cap: [54.6872, 25.2797],
    locs: [
      ["Vilnius", 54.6872, 25.2797, "capital"],
      ["Old Town Vilnius", 54.6796, 25.2778, "unesco"],
      ["Kaunas", 54.8985, 23.9036, "former"],
      ["Curonian Spit", 55.2000, 20.9667, "unesco"],
    ]
  },
  {
    name: "Luxembourg", wiki: "Luxembourg",
    cap: [49.6116, 6.1319],
    locs: [
      ["Luxembourg City", 49.6116, 6.1319, "capital"],
      ["Old Quarters of Luxembourg", 49.6103, 6.1303, "unesco"],
    ]
  },
  {
    name: "Madagascar", wiki: "Madagascar",
    cap: [-18.9137, 47.5361],
    locs: [
      ["Antananarivo", -18.9137, 47.5361, "capital"],
      ["Toamasina", -18.1492, 49.4023, "city"],
      ["Tsingy de Bemaraha", -18.4383, 44.7836, "unesco"],
    ]
  },
  {
    name: "Malawi", wiki: "Malawi",
    cap: [-13.9669, 33.7873],
    locs: [
      ["Lilongwe", -13.9669, 33.7873, "capital"],
      ["Zomba", -15.3833, 35.3167, "former"],
      ["Blantyre", -15.7861, 35.0058, "city"],
      ["Lake Malawi National Park", -14.0000, 34.9167, "unesco"],
    ]
  },
  {
    name: "Malaysia", wiki: "Malaysia",
    cap: [3.1390, 101.6869],
    locs: [
      ["Kuala Lumpur", 3.1390, 101.6869, "capital"],
      ["Putrajaya", 2.9264, 101.6964, "former"],
      ["George Town", 5.4141, 100.3288, "unesco"],
      ["Malacca City", 2.1896, 102.2501, "unesco"],
    ]
  },
  {
    name: "Maldives", wiki: "Maldives",
    cap: [4.1755, 73.5093],
    locs: [
      ["Malé", 4.1755, 73.5093, "capital"],
    ]
  },
  {
    name: "Mali", wiki: "Mali",
    cap: [12.6392, -8.0029],
    locs: [
      ["Bamako", 12.6392, -8.0029, "capital"],
      ["Timbuktu", 16.7735, -3.0074, "unesco"],
      ["Djenné", 13.9054, -4.5547, "unesco"],
      ["Cliff of Bandiagara", 14.3667, -3.5833, "unesco"],
    ]
  },
  {
    name: "Malta", wiki: "Malta",
    cap: [35.9042, 14.5189],
    locs: [
      ["Valletta", 35.9042, 14.5189, "capital"],
      ["Valletta Historic Centre", 35.8978, 14.5125, "unesco"],
      ["Ħal Saflieni Hypogeum", 35.8722, 14.5053, "unesco"],
      ["Megalithic Temples", 35.8270, 14.4430, "unesco"],
    ]
  },
  {
    name: "Marshall Islands", wiki: "Marshall_Islands",
    cap: [7.1167, 171.3667],
    locs: [
      ["Majuro", 7.1167, 171.3667, "capital"],
      ["Bikini Atoll", 11.5667, 165.3833, "unesco"],
    ]
  },
  {
    name: "Mauritania", wiki: "Mauritania",
    cap: [18.0735, -15.9582],
    locs: [
      ["Nouakchott", 18.0735, -15.9582, "capital"],
      ["Ancient Ksour of Ouadane", 20.9333, -11.6167, "unesco"],
    ]
  },
  {
    name: "Mauritius", wiki: "Mauritius",
    cap: [-20.1608, 57.4989],
    locs: [
      ["Port Louis", -20.1608, 57.4989, "capital"],
      ["Aapravasi Ghat", -20.1637, 57.5058, "unesco"],
    ]
  },
  {
    name: "Mexico", wiki: "Mexico",
    cap: [19.4326, -99.1332],
    locs: [
      ["Mexico City", 19.4326, -99.1332, "capital"],
      ["Guadalajara", 20.6597, -103.3496, "city"],
      ["Oaxaca", 17.0732, -96.7266, "unesco"],
      ["Chichen Itza", 20.6843, -88.5678, "unesco"],
      ["Teotihuacan", 19.6925, -98.8438, "unesco"],
    ]
  },
  {
    name: "Micronesia", wiki: "Federated_States_of_Micronesia",
    cap: [6.9248, 158.1618],
    locs: [
      ["Palikir", 6.9248, 158.1618, "capital"],
      ["Nan Madol", 6.8436, 158.3469, "unesco"],
    ]
  },
  {
    name: "Moldova", wiki: "Moldova",
    cap: [47.0105, 28.8638],
    locs: [
      ["Chișinău", 47.0105, 28.8638, "capital"],
      ["Bălți", 47.7617, 27.9297, "city"],
    ]
  },
  {
    name: "Monaco", wiki: "Monaco",
    cap: [43.7384, 7.4246],
    locs: [
      ["Monaco", 43.7384, 7.4246, "capital"],
    ]
  },
  {
    name: "Mongolia", wiki: "Mongolia",
    cap: [47.8864, 106.9057],
    locs: [
      ["Ulaanbaatar", 47.8864, 106.9057, "capital"],
      ["Karakorum", 47.2028, 102.8400, "former"],
      ["Orkhon Valley", 47.2222, 102.5778, "unesco"],
      ["Erdenet", 49.0278, 104.0742, "city"],
    ]
  },
  {
    name: "Montenegro", wiki: "Montenegro",
    cap: [42.4304, 19.2594],
    locs: [
      ["Podgorica", 42.4304, 19.2594, "capital"],
      ["Cetinje", 42.3931, 18.9225, "former"],
      ["Old Town of Bar", 42.0957, 19.0906, "unesco"],
      ["Kotor", 42.4247, 18.7712, "unesco"],
    ]
  },
  {
    name: "Morocco", wiki: "Morocco",
    cap: [33.9716, -6.8498],
    locs: [
      ["Rabat", 33.9716, -6.8498, "capital"],
      ["Fez", 34.0181, -5.0078, "former"],
      ["Marrakesh", 31.6295, -7.9811, "unesco"],
      ["Casablanca", 33.5731, -7.5898, "city"],
      ["Meknes", 33.8960, -5.5473, "unesco"],
    ]
  },
  {
    name: "Mozambique", wiki: "Mozambique",
    cap: [-25.9692, 32.5732],
    locs: [
      ["Maputo", -25.9692, 32.5732, "capital"],
      ["Island of Mozambique", -15.0338, 40.7316, "unesco"],
      ["Beira", -19.8436, 34.8389, "city"],
    ]
  },
  {
    name: "Myanmar", wiki: "Myanmar",
    cap: [19.7633, 96.0785],
    locs: [
      ["Naypyidaw", 19.7633, 96.0785, "capital"],
      ["Rangoon (Yangon)", 16.8661, 96.1951, "former"],
      ["Mandalay", 21.9162, 96.0891, "former"],
      ["Pyu Ancient Cities", 18.5167, 95.6333, "unesco"],
      ["Bagan", 21.1717, 94.8585, "city"],
    ]
  },
  {
    name: "Namibia", wiki: "Namibia",
    cap: [-22.5597, 17.0832],
    locs: [
      ["Windhoek", -22.5597, 17.0832, "capital"],
      ["Walvis Bay", -22.9575, 14.5053, "city"],
      ["Namib Sand Sea", -24.7667, 15.9333, "unesco"],
    ]
  },
  {
    name: "Nauru", wiki: "Nauru",
    cap: [-0.5477, 166.9209],
    locs: [
      ["Yaren", -0.5477, 166.9209, "capital"],
    ]
  },
  {
    name: "Nepal", wiki: "Nepal",
    cap: [27.7172, 85.3240],
    locs: [
      ["Kathmandu", 27.7172, 85.3240, "capital"],
      ["Kathmandu Valley", 27.7000, 85.3167, "unesco"],
      ["Chitwan National Park", 27.5000, 84.3333, "unesco"],
      ["Sagarmatha (Everest)", 27.9878, 86.9250, "unesco"],
      ["Pokhara", 28.2096, 83.9856, "city"],
    ]
  },
  {
    name: "Netherlands", wiki: "Netherlands",
    cap: [52.3676, 4.9041],
    locs: [
      ["Amsterdam", 52.3676, 4.9041, "capital"],
      ["The Hague", 52.0705, 4.3007, "former"],
      ["Schokland", 52.6361, 5.8311, "unesco"],
      ["Rotterdam", 51.9225, 4.4792, "city"],
      ["Kinderdijk Windmills", 51.8817, 4.6389, "unesco"],
    ]
  },
  {
    name: "New Zealand", wiki: "New_Zealand",
    cap: [-41.2865, 174.7762],
    locs: [
      ["Wellington", -41.2865, 174.7762, "capital"],
      ["Auckland", -36.8485, 174.7633, "city"],
      ["Christchurch", -43.5321, 172.6362, "city"],
      ["Te Wahipounamu", -44.4000, 168.6667, "unesco"],
    ]
  },
  {
    name: "Nicaragua", wiki: "Nicaragua",
    cap: [12.1364, -86.2514],
    locs: [
      ["Managua", 12.1364, -86.2514, "capital"],
      ["León", 12.4359, -86.8782, "former"],
      ["Ruins of León Viejo", 12.4228, -86.9200, "unesco"],
    ]
  },
  {
    name: "Niger", wiki: "Niger",
    cap: [13.5137, 2.1098],
    locs: [
      ["Niamey", 13.5137, 2.1098, "capital"],
      ["Air and Ténéré", 18.5000, 8.5000, "unesco"],
      ["Zinder", 13.8076, 8.9881, "former"],
    ]
  },
  {
    name: "Nigeria", wiki: "Nigeria",
    cap: [9.0579, 7.4951],
    locs: [
      ["Abuja", 9.0579, 7.4951, "capital"],
      ["Lagos", 6.5244, 3.3792, "former"],
      ["Kano", 12.0022, 8.5920, "city"],
      ["Ibadan", 7.3775, 3.9470, "city"],
      ["Sukur Cultural Landscape", 10.7167, 13.5667, "unesco"],
    ]
  },
  {
    name: "North Korea", wiki: "North_Korea",
    cap: [39.0194, 125.7381],
    locs: [
      ["Pyongyang", 39.0194, 125.7381, "capital"],
      ["Kaesong", 37.9706, 126.5565, "former"],
      ["Historic Monuments of Kaesong", 37.9706, 126.5565, "unesco"],
    ]
  },
  {
    name: "North Macedonia", wiki: "North_Macedonia",
    cap: [41.9973, 21.4280],
    locs: [
      ["Skopje", 41.9973, 21.4280, "capital"],
      ["Ohrid", 41.1231, 20.8016, "unesco"],
    ]
  },
  {
    name: "Norway", wiki: "Norway",
    cap: [59.9139, 10.7522],
    locs: [
      ["Oslo", 59.9139, 10.7522, "capital"],
      ["Bergen", 60.3913, 5.3221, "unesco"],
      ["Bryggen", 60.3975, 5.3236, "unesco"],
      ["Urnes Stave Church", 61.3033, 7.3139, "unesco"],
      ["Røros Mining Town", 62.5744, 11.3858, "unesco"],
    ]
  },
  {
    name: "Oman", wiki: "Oman",
    cap: [23.5880, 58.3829],
    locs: [
      ["Muscat", 23.5880, 58.3829, "capital"],
      ["Bahla Fort", 22.9633, 57.2994, "unesco"],
      ["Archaeological Sites of Bat", 23.2700, 56.7400, "unesco"],
      ["Sohar", 24.3658, 56.7283, "former"],
    ]
  },
  {
    name: "Pakistan", wiki: "Pakistan",
    cap: [33.6844, 73.0479],
    locs: [
      ["Islamabad", 33.6844, 73.0479, "capital"],
      ["Karachi", 24.8607, 67.0011, "former"],
      ["Lahore", 31.5204, 74.3587, "city"],
      ["Mohenjo-daro", 27.3241, 68.1376, "unesco"],
      ["Taxila", 33.7469, 72.8381, "unesco"],
    ]
  },
  {
    name: "Palau", wiki: "Palau",
    cap: [7.5149, 134.5825],
    locs: [
      ["Ngerulmud", 7.5149, 134.5825, "capital"],
      ["Rock Islands", 7.2167, 134.3833, "unesco"],
    ]
  },
  {
    name: "Panama", wiki: "Panama",
    cap: [8.9936, -79.5197],
    locs: [
      ["Panama City", 8.9936, -79.5197, "capital"],
      ["Darién National Park", 7.8333, -77.6667, "unesco"],
      ["Fortifications of Caribbean Coast", 9.3578, -79.9011, "unesco"],
    ]
  },
  {
    name: "Papua New Guinea", wiki: "Papua_New_Guinea",
    cap: [-9.4438, 147.1803],
    locs: [
      ["Port Moresby", -9.4438, 147.1803, "capital"],
      ["Kokoda", -8.8667, 147.7333, "city"],
    ]
  },
  {
    name: "Paraguay", wiki: "Paraguay",
    cap: [-25.2867, -57.6470],
    locs: [
      ["Asunción", -25.2867, -57.6470, "capital"],
      ["Jesuit Missions of La Santísima Trinidad", -27.1386, -55.6897, "unesco"],
    ]
  },
  {
    name: "Peru", wiki: "Peru",
    cap: [-12.0464, -77.0428],
    locs: [
      ["Lima", -12.0464, -77.0428, "capital"],
      ["Machu Picchu", -13.1631, -72.5450, "unesco"],
      ["Cusco", -13.5319, -71.9675, "former"],
      ["Chan Chan", -8.1027, -79.0777, "unesco"],
      ["Arequipa", -16.4090, -71.5375, "city"],
    ]
  },
  {
    name: "Philippines", wiki: "Philippines",
    cap: [14.5995, 120.9842],
    locs: [
      ["Manila", 14.5995, 120.9842, "capital"],
      ["Quezon City", 14.6760, 121.0437, "former"],
      ["Historic City of Vigan", 17.5747, 120.3876, "unesco"],
      ["Puerto-Princesa Subterranean River", 10.1556, 118.8083, "unesco"],
      ["Cebu City", 10.3157, 123.8854, "city"],
    ]
  },
  {
    name: "Poland", wiki: "Poland",
    cap: [52.2297, 21.0122],
    locs: [
      ["Warsaw", 52.2297, 21.0122, "capital"],
      ["Kraków", 50.0647, 19.9450, "former"],
      ["Auschwitz-Birkenau", 50.0341, 19.1779, "unesco"],
      ["Wieliczka Salt Mine", 49.9836, 20.0563, "unesco"],
      ["Wrocław", 51.1079, 17.0385, "city"],
    ]
  },
  {
    name: "Portugal", wiki: "Portugal",
    cap: [38.7223, -9.1393],
    locs: [
      ["Lisbon", 38.7223, -9.1393, "capital"],
      ["Porto", 41.1579, -8.6291, "city"],
      ["Historic Centre of Porto", 41.1451, -8.6114, "unesco"],
      ["Sintra", 38.7985, -9.3877, "unesco"],
      ["Évora", 38.5664, -7.9072, "unesco"],
    ]
  },
  {
    name: "Qatar", wiki: "Qatar",
    cap: [25.2854, 51.5310],
    locs: [
      ["Doha", 25.2854, 51.5310, "capital"],
      ["Al Zubarah", 25.9667, 50.8667, "unesco"],
    ]
  },
  {
    name: "Romania", wiki: "Romania",
    cap: [44.4268, 26.1025],
    locs: [
      ["Bucharest", 44.4268, 26.1025, "capital"],
      ["Cluj-Napoca", 46.7712, 23.6236, "city"],
      ["Dacian Fortresses", 45.6167, 22.9167, "unesco"],
      ["Sighișoara", 46.2197, 24.7962, "unesco"],
    ]
  },
  {
    name: "Russia", wiki: "Russia",
    cap: [55.7558, 37.6173],
    locs: [
      ["Moscow", 55.7558, 37.6173, "capital"],
      ["Saint Petersburg", 59.9343, 30.3351, "former"],
      ["Kremlin and Red Square", 55.7517, 37.6178, "unesco"],
      ["Historic Centre of St. Petersburg", 59.9389, 30.3162, "unesco"],
      ["Lake Baikal", 53.5587, 108.1650, "unesco"],
    ]
  },
  {
    name: "Rwanda", wiki: "Rwanda",
    cap: [-1.9403, 29.8739],
    locs: [
      ["Kigali", -1.9403, 29.8739, "capital"],
    ]
  },
  {
    name: "Saint Kitts and Nevis", wiki: "Saint_Kitts_and_Nevis",
    cap: [17.3026, -62.7177],
    locs: [
      ["Basseterre", 17.3026, -62.7177, "capital"],
      ["Brimstone Hill Fortress", 17.3605, -62.8306, "unesco"],
    ]
  },
  {
    name: "Saint Lucia", wiki: "Saint_Lucia",
    cap: [14.0101, -60.9875],
    locs: [
      ["Castries", 14.0101, -60.9875, "capital"],
      ["Pitons Management Area", 13.8167, -61.0667, "unesco"],
    ]
  },
  {
    name: "Saint Vincent and the Grenadines", wiki: "Saint_Vincent_and_the_Grenadines",
    cap: [13.1600, -61.2248],
    locs: [
      ["Kingstown", 13.1600, -61.2248, "capital"],
    ]
  },
  {
    name: "Samoa", wiki: "Samoa",
    cap: [-13.8506, -171.7513],
    locs: [
      ["Apia", -13.8506, -171.7513, "capital"],
    ]
  },
  {
    name: "San Marino", wiki: "San_Marino",
    cap: [43.9424, 12.4578],
    locs: [
      ["San Marino City", 43.9424, 12.4578, "capital"],
      ["Historic Centre of San Marino", 43.9381, 12.4469, "unesco"],
    ]
  },
  {
    name: "São Tomé and Príncipe", wiki: "São_Tomé_and_Príncipe",
    cap: [0.3365, 6.7273],
    locs: [
      ["São Tomé", 0.3365, 6.7273, "capital"],
    ]
  },
  {
    name: "Saudi Arabia", wiki: "Saudi_Arabia",
    cap: [24.6877, 46.7219],
    locs: [
      ["Riyadh", 24.6877, 46.7219, "capital"],
      ["Mecca", 21.3891, 39.8579, "former"],
      ["Al-Hijr (Madain Salih)", 26.7830, 37.9524, "unesco"],
      ["At-Turaif District in Ad-Dir'iyah", 24.7344, 46.5741, "unesco"],
      ["Jeddah", 21.2854, 39.2376, "city"],
    ]
  },
  {
    name: "Senegal", wiki: "Senegal",
    cap: [14.7167, -17.4677],
    locs: [
      ["Dakar", 14.7167, -17.4677, "capital"],
      ["Island of Saint-Louis", 16.0333, -16.5000, "unesco"],
      ["Island of Gorée", 14.6647, -17.3997, "unesco"],
    ]
  },
  {
    name: "Serbia", wiki: "Serbia",
    cap: [44.8176, 20.4633],
    locs: [
      ["Belgrade", 44.8176, 20.4633, "capital"],
      ["Studenica Monastery", 43.4825, 20.5306, "unesco"],
      ["Novi Sad", 45.2671, 19.8335, "city"],
      ["Gamzigrad-Romuliana", 43.8906, 22.1836, "unesco"],
    ]
  },
  {
    name: "Seychelles", wiki: "Seychelles",
    cap: [-4.6191, 55.4513],
    locs: [
      ["Victoria", -4.6191, 55.4513, "capital"],
      ["Vallée de Mai Nature Reserve", -4.3286, 55.7333, "unesco"],
    ]
  },
  {
    name: "Sierra Leone", wiki: "Sierra_Leone",
    cap: [8.4657, -13.2317],
    locs: [
      ["Freetown", 8.4657, -13.2317, "capital"],
    ]
  },
  {
    name: "Singapore", wiki: "Singapore",
    cap: [1.3521, 103.8198],
    locs: [
      ["Singapore", 1.3521, 103.8198, "capital"],
    ]
  },
  {
    name: "Slovakia", wiki: "Slovakia",
    cap: [48.1486, 17.1077],
    locs: [
      ["Bratislava", 48.1486, 17.1077, "capital"],
      ["Banská Štiavnica", 48.4594, 18.8964, "unesco"],
      ["Vlkolínec", 48.9633, 19.2289, "unesco"],
      ["Košice", 48.7164, 21.2611, "city"],
    ]
  },
  {
    name: "Slovenia", wiki: "Slovenia",
    cap: [46.0569, 14.5058],
    locs: [
      ["Ljubljana", 46.0569, 14.5058, "capital"],
      ["Škocjan Caves", 45.6642, 13.9928, "unesco"],
      ["Maribor", 46.5547, 15.6467, "city"],
    ]
  },
  {
    name: "Solomon Islands", wiki: "Solomon_Islands",
    cap: [-9.4456, 160.0327],
    locs: [
      ["Honiara", -9.4456, 160.0327, "capital"],
    ]
  },
  {
    name: "Somalia", wiki: "Somalia",
    cap: [2.0469, 45.3182],
    locs: [
      ["Mogadishu", 2.0469, 45.3182, "capital"],
      ["Hargeisa", 9.5597, 44.0650, "city"],
    ]
  },
  {
    name: "South Africa", wiki: "South_Africa",
    cap: [-25.7479, 28.2293],
    locs: [
      ["Pretoria", -25.7479, 28.2293, "capital"],
      ["Cape Town", -33.9249, 18.4241, "former"],
      ["Bloemfontein", -29.1199, 26.2148, "former"],
      ["Johannesburg", -26.2041, 28.0473, "city"],
      ["Robben Island", -33.8032, 18.3647, "unesco"],
    ]
  },
  {
    name: "South Korea", wiki: "South_Korea",
    cap: [37.5665, 126.9780],
    locs: [
      ["Seoul", 37.5665, 126.9780, "capital"],
      ["Changdeokgung Palace", 37.5814, 126.9910, "unesco"],
      ["Gyeongju Historic Areas", 35.8562, 129.2247, "unesco"],
      ["Jongmyo Shrine", 37.5740, 126.9942, "unesco"],
      ["Busan", 35.1796, 129.0756, "city"],
    ]
  },
  {
    name: "South Sudan", wiki: "South_Sudan",
    cap: [4.8594, 31.5713],
    locs: [
      ["Juba", 4.8594, 31.5713, "capital"],
    ]
  },
  {
    name: "Spain", wiki: "Spain",
    cap: [40.4168, -3.7038],
    locs: [
      ["Madrid", 40.4168, -3.7038, "capital"],
      ["Barcelona", 41.3851, 2.1734, "city"],
      ["Alhambra, Granada", 37.1760, -3.5882, "unesco"],
      ["Historic Toledo", 39.8581, -4.0226, "unesco"],
      ["Santiago de Compostela", 42.8782, -8.5448, "unesco"],
    ]
  },
  {
    name: "Sri Lanka", wiki: "Sri_Lanka",
    cap: [6.9271, 79.8612],
    locs: [
      ["Sri Jayawardenepura Kotte", 6.9008, 79.9013, "capital"],
      ["Colombo", 6.9271, 79.8612, "former"],
      ["Sigiriya", 7.9572, 80.7603, "unesco"],
      ["Anuradhapura", 8.3114, 80.4037, "former"],
      ["Kandy", 7.2906, 80.6337, "unesco"],
    ]
  },
  {
    name: "Sudan", wiki: "Sudan",
    cap: [15.5007, 32.5599],
    locs: [
      ["Khartoum", 15.5007, 32.5599, "capital"],
      ["Omdurman", 15.6145, 32.4800, "former"],
      ["Meroe Pyramids", 16.9379, 33.7494, "unesco"],
    ]
  },
  {
    name: "Suriname", wiki: "Suriname",
    cap: [5.8520, -55.2038],
    locs: [
      ["Paramaribo", 5.8520, -55.2038, "capital"],
      ["Historic Inner City of Paramaribo", 5.8337, -55.1683, "unesco"],
    ]
  },
  {
    name: "Sweden", wiki: "Sweden",
    cap: [59.3293, 18.0686],
    locs: [
      ["Stockholm", 59.3293, 18.0686, "capital"],
      ["Gammelstad Church Town", 65.6342, 22.0028, "unesco"],
      ["Göthenburg (Gothenburg)", 57.7089, 11.9746, "city"],
      ["Birka and Hovgården", 59.3356, 17.5456, "unesco"],
      ["Drottningholm Palace", 59.3222, 17.8864, "unesco"],
    ]
  },
  {
    name: "Switzerland", wiki: "Switzerland",
    cap: [46.9480, 7.4474],
    locs: [
      ["Bern", 46.9480, 7.4474, "capital"],
      ["Zürich", 47.3769, 8.5417, "city"],
      ["Geneva", 46.2044, 6.1432, "city"],
      ["Old City of Bern", 46.9481, 7.4474, "unesco"],
      ["Jungfrau-Aletsch", 46.5333, 7.9833, "unesco"],
    ]
  },
  {
    name: "Syria", wiki: "Syria",
    cap: [33.5138, 36.2765],
    locs: [
      ["Damascus", 33.5138, 36.2765, "capital"],
      ["Aleppo", 36.2021, 37.1343, "former"],
      ["Ancient City of Damascus", 33.5072, 36.3083, "unesco"],
      ["Palmyra", 34.5519, 38.2663, "unesco"],
      ["Krak des Chevaliers", 34.7556, 36.2608, "unesco"],
    ]
  },
  {
    name: "Tajikistan", wiki: "Tajikistan",
    cap: [38.5598, 68.7870],
    locs: [
      ["Dushanbe", 38.5598, 68.7870, "capital"],
      ["Proto-urban Site of Sarazm", 39.5333, 67.8167, "unesco"],
      ["Khujand", 40.2864, 69.6222, "city"],
    ]
  },
  {
    name: "Tanzania", wiki: "Tanzania",
    cap: [-6.1630, 35.7516],
    locs: [
      ["Dodoma", -6.1630, 35.7516, "capital"],
      ["Dar es Salaam", -6.7924, 39.2083, "former"],
      ["Serengeti National Park", -2.3333, 34.8333, "unesco"],
      ["Stone Town Zanzibar", -6.1636, 39.1997, "unesco"],
      ["Ngorongoro Conservation Area", -3.2333, 35.5000, "unesco"],
    ]
  },
  {
    name: "Thailand", wiki: "Thailand",
    cap: [13.7563, 100.5018],
    locs: [
      ["Bangkok", 13.7563, 100.5018, "capital"],
      ["Ayutthaya", 14.3532, 100.5676, "former"],
      ["Historic Town of Sukhothai", 17.0125, 99.8239, "unesco"],
      ["Historic City of Ayutthaya", 14.3532, 100.5676, "unesco"],
      ["Chiang Mai", 18.7883, 98.9853, "city"],
    ]
  },
  {
    name: "Timor-Leste", wiki: "East_Timor",
    cap: [-8.5569, 125.5603],
    locs: [
      ["Dili", -8.5569, 125.5603, "capital"],
    ]
  },
  {
    name: "Togo", wiki: "Togo",
    cap: [6.1375, 1.2123],
    locs: [
      ["Lomé", 6.1375, 1.2123, "capital"],
    ]
  },
  {
    name: "Tonga", wiki: "Tonga",
    cap: [-21.1393, -175.2046],
    locs: [
      ["Nukuʻalofa", -21.1393, -175.2046, "capital"],
    ]
  },
  {
    name: "Trinidad and Tobago", wiki: "Trinidad_and_Tobago",
    cap: [10.6918, -61.2225],
    locs: [
      ["Port of Spain", 10.6918, -61.2225, "capital"],
    ]
  },
  {
    name: "Tunisia", wiki: "Tunisia",
    cap: [36.8190, 10.1658],
    locs: [
      ["Tunis", 36.8190, 10.1658, "capital"],
      ["Medina of Tunis", 36.7992, 10.1678, "unesco"],
      ["Carthage", 36.8528, 10.3233, "former"],
      ["El Djem", 35.2969, 10.7069, "unesco"],
      ["Kairouan", 35.6756, 10.1033, "unesco"],
    ]
  },
  {
    name: "Turkey", wiki: "Turkey",
    cap: [39.9334, 32.8597],
    locs: [
      ["Ankara", 39.9334, 32.8597, "capital"],
      ["Istanbul", 41.0082, 28.9784, "former"],
      ["Göreme National Park", 38.6431, 34.8289, "unesco"],
      ["Hattusha", 40.0186, 34.6153, "former"],
      ["Ephesus", 37.9394, 27.3417, "unesco"],
    ]
  },
  {
    name: "Turkmenistan", wiki: "Turkmenistan",
    cap: [37.9601, 58.3261],
    locs: [
      ["Ashgabat", 37.9601, 58.3261, "capital"],
      ["Ancient Merv", 37.6667, 62.1833, "unesco"],
      ["Köneürgench", 42.3333, 59.1333, "unesco"],
    ]
  },
  {
    name: "Tuvalu", wiki: "Tuvalu",
    cap: [-8.5200, 179.1980],
    locs: [
      ["Funafuti", -8.5200, 179.1980, "capital"],
    ]
  },
  {
    name: "Uganda", wiki: "Uganda",
    cap: [0.3476, 32.5825],
    locs: [
      ["Kampala", 0.3476, 32.5825, "capital"],
      ["Kasubi Royal Tombs", 0.3417, 32.5500, "unesco"],
      ["Entebbe", 0.0614, 32.4619, "city"],
    ]
  },
  {
    name: "Ukraine", wiki: "Ukraine",
    cap: [50.4501, 30.5234],
    locs: [
      ["Kyiv", 50.4501, 30.5234, "capital"],
      ["Lviv", 49.8397, 24.0297, "former"],
      ["Saint-Sophia Cathedral Kyiv", 50.4543, 30.5138, "unesco"],
      ["Historic Centre of Lviv", 49.8397, 24.0297, "unesco"],
      ["Kharkiv", 49.9935, 36.2304, "city"],
    ]
  },
  {
    name: "United Arab Emirates", wiki: "United_Arab_Emirates",
    cap: [24.4539, 54.3773],
    locs: [
      ["Abu Dhabi", 24.4539, 54.3773, "capital"],
      ["Dubai", 25.2048, 55.2708, "city"],
      ["Al Ain Oasis", 24.1302, 55.8023, "unesco"],
      ["Sharjah", 25.3463, 55.4209, "city"],
    ]
  },
  {
    name: "United Kingdom", wiki: "United_Kingdom",
    cap: [51.5074, -0.1278],
    locs: [
      ["London", 51.5074, -0.1278, "capital"],
      ["Edinburgh", 55.9533, -3.1883, "city"],
      ["Stonehenge", 51.1789, -1.8262, "unesco"],
      ["Canterbury", 51.2802, 1.0789, "unesco"],
      ["Bath", 51.3811, -2.3590, "unesco"],
    ]
  },
  {
    name: "United States", wiki: "United_States",
    cap: [38.9072, -77.0369],
    locs: [
      ["Washington, D.C.", 38.9072, -77.0369, "capital"],
      ["Philadelphia", 39.9526, -75.1652, "former"],
      ["New York City", 40.7128, -74.0060, "city"],
      ["Los Angeles", 34.0522, -118.2437, "city"],
      ["Yellowstone National Park", 44.4280, -110.5885, "unesco"],
    ]
  },
  {
    name: "Uruguay", wiki: "Uruguay",
    cap: [-34.9011, -56.1915],
    locs: [
      ["Montevideo", -34.9011, -56.1915, "capital"],
      ["Colonia del Sacramento", -34.4729, -57.8453, "unesco"],
    ]
  },
  {
    name: "Uzbekistan", wiki: "Uzbekistan",
    cap: [41.2995, 69.2401],
    locs: [
      ["Tashkent", 41.2995, 69.2401, "capital"],
      ["Samarkand", 39.6270, 66.9750, "former"],
      ["Samarkand Crossroads of Cultures", 39.6547, 66.9758, "unesco"],
      ["Historic Centre of Bukhara", 39.7681, 64.4272, "unesco"],
      ["Itchan Kala (Khiva)", 41.3786, 60.3583, "unesco"],
    ]
  },
  {
    name: "Vanuatu", wiki: "Vanuatu",
    cap: [-17.7333, 168.3167],
    locs: [
      ["Port Vila", -17.7333, 168.3167, "capital"],
      ["Chief Roi Mata's Domain", -17.6500, 168.3667, "unesco"],
    ]
  },
  {
    name: "Venezuela", wiki: "Venezuela",
    cap: [10.4806, -66.9036],
    locs: [
      ["Caracas", 10.4806, -66.9036, "capital"],
      ["Coro", 11.4069, -69.6697, "unesco"],
      ["Maracaibo", 10.6666, -71.6124, "city"],
      ["Valencia", 10.1620, -67.9999, "city"],
    ]
  },
  {
    name: "Vietnam", wiki: "Vietnam",
    cap: [21.0285, 105.8542],
    locs: [
      ["Hanoi", 21.0285, 105.8542, "capital"],
      ["Saigon (Ho Chi Minh City)", 10.8231, 106.6297, "former"],
      ["Hội An Ancient Town", 15.8794, 108.3350, "unesco"],
      ["Hue Imperial Citadel", 16.4637, 107.5909, "unesco"],
      ["Ha Long Bay", 20.9101, 107.1839, "unesco"],
    ]
  },
  {
    name: "Yemen", wiki: "Yemen",
    cap: [15.5527, 48.5164],
    locs: [
      ["Sana'a", 15.3694, 44.1910, "capital"],
      ["Aden", 12.7797, 45.0367, "former"],
      ["Old City of Sana'a", 15.3556, 44.2089, "unesco"],
      ["Historic Town of Zabid", 14.1944, 43.3172, "unesco"],
    ]
  },
  {
    name: "Zambia", wiki: "Zambia",
    cap: [-15.3875, 28.3228],
    locs: [
      ["Lusaka", -15.3875, 28.3228, "capital"],
      ["Mosi-oa-Tunya / Victoria Falls", -17.9243, 25.8572, "unesco"],
    ]
  },
  {
    name: "Zimbabwe", wiki: "Zimbabwe",
    cap: [-17.8252, 31.0335],
    locs: [
      ["Harare", -17.8252, 31.0335, "capital"],
      ["Great Zimbabwe Monument", -20.2667, 30.9333, "unesco"],
      ["Mosi-oa-Tunya / Victoria Falls", -17.9243, 25.8572, "unesco"],
      ["Bulawayo", -20.1325, 28.6264, "city"],
    ]
  },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const toRad = d => (d * Math.PI) / 180;
function haversine(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function bearing(lat1, lon1, lat2, lon2) {
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon)*Math.cos(toRad(lat2));
  const x = Math.cos(toRad(lat1))*Math.sin(toRad(lat2)) - Math.sin(toRad(lat1))*Math.cos(toRad(lat2))*Math.cos(dLon);
  let b = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(b / 45) % 8];
}

function pickRandom() {
  const c = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  const loc = c.locs[Math.floor(Math.random() * c.locs.length)];
  return { country: c, loc };
}

const TYPE_LABELS = { capital: "🏛️ Capital", former: "🕰️ Former Capital", city: "🌆 Major City", unesco: "🏛️ UNESCO Site" };
const TYPE_COLORS = { capital: "#4ade80", former: "#fb923c", city: "#60a5fa", unesco: "#e879f9" };

// ─── WIKIPEDIA IMAGE HOOK ───────────────────────────────────────────────────────
function useWikiImage(locationName) {
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setImgUrl(null);
    setLoading(true);

    async function fetchImage() {
      try {
        // Search for the article
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(locationName)}&srlimit=1&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        const results = searchData?.query?.search;
        if (!results || results.length === 0) { if (!cancelled) setLoading(false); return; }

        const title = results[0].title;
        // Fetch page image
        const imgApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&pithumbsize=600&format=json&origin=*`;
        const imgRes = await fetch(imgApiUrl);
        const imgData = await imgRes.json();
        const pages = imgData?.query?.pages;
        const page = pages ? Object.values(pages)[0] : null;
        const url = page?.thumbnail?.source || null;
        if (!cancelled) { setImgUrl(url); setLoading(false); }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    fetchImage();
    return () => { cancelled = true; };
  }, [locationName]);

  return { imgUrl, loading };
}

// ─── SEARCHABLE DROPDOWN ────────────────────────────────────────────────────────
function SearchDropdown({ value, onChange, disabled, placeholder }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);
  const countryNames = useMemo(() => COUNTRIES.map(c => c.name).sort(), []);
  const filtered = useMemo(() =>
    query.length === 0 ? countryNames : countryNames.filter(n => n.toLowerCase().includes(query.toLowerCase())),
    [query, countryNames]
  );

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (name) => { onChange(name); setQuery(""); setOpen(false); };

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <div
        onClick={() => { if (!disabled) { setOpen(o => !o); setQuery(""); } }}
        style={{
          padding: "10px 14px", borderRadius: 8, border: `1px solid ${disabled ? "#333" : "#555"}`,
          background: disabled ? "#1a1a1a" : "#1e1e2e", color: value ? "#f8f8f2" : "#6b7280",
          cursor: disabled ? "not-allowed" : "pointer", display: "flex", justifyContent: "space-between",
          alignItems: "center", fontSize: 14, userSelect: "none", minWidth: 0,
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || placeholder}
        </span>
        <span style={{ marginLeft: 8, opacity: 0.5 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 999,
          background: "#1e1e2e", border: "1px solid #555", borderRadius: 8,
          maxHeight: 220, overflow: "hidden", display: "flex", flexDirection: "column",
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)"
        }}>
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search country…"
            style={{
              padding: "8px 12px", background: "#2a2a3e", border: "none", borderBottom: "1px solid #444",
              color: "#f8f8f2", fontSize: 13, outline: "none"
            }}
          />
          <div style={{ overflowY: "auto", flex: 1 }}>
            {filtered.length === 0 && (
              <div style={{ padding: "10px 14px", color: "#666", fontSize: 13 }}>No results</div>
            )}
            {filtered.map(n => (
              <div
                key={n}
                onClick={() => select(n)}
                style={{
                  padding: "8px 14px", cursor: "pointer", fontSize: 13, color: "#f8f8f2",
                  background: n === value ? "#2a2a5e" : "transparent",
                  borderBottom: "1px solid #2a2a2a"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#2a2a4e"}
                onMouseLeave={e => e.currentTarget.style.background = n === value ? "#2a2a5e" : "transparent"}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN GAME ─────────────────────────────────────────────────────────────────
export default function GeoCitiesGame() {
  const [puzzle, setPuzzle] = useState(() => pickRandom());
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [submitted, setSubmitted] = useState(Array(6).fill(false));
  const [currentRow, setCurrentRow] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const { country, loc } = puzzle;
  const { imgUrl, loading: imgLoading } = useWikiImage(loc[0]);

  function handleGuess(idx) {
    const guess = guesses[idx];
    if (!guess || submitted[idx]) return;
    const newSub = [...submitted];
    newSub[idx] = true;
    setSubmitted(newSub);
    if (guess === country.name) {
      setWon(true);
    } else if (idx === 5) {
      setLost(true);
    } else {
      setCurrentRow(idx + 1);
    }
  }

  function getHint(idx) {
    if (!submitted[idx] || guesses[idx] === country.name) return null;
    const gc = COUNTRIES.find(c => c.name === guesses[idx]);
    if (!gc) return null;
    const dist = Math.round(haversine(loc[1], loc[2], gc.cap[0], gc.cap[1]));
    const dir = bearing(gc.cap[0], gc.cap[1], loc[1], loc[2]);
    return { dist, dir };
  }

  function reset() {
    setPuzzle(pickRandom());
    setGuesses(Array(6).fill(""));
    setSubmitted(Array(6).fill(false));
    setCurrentRow(0);
    setWon(false);
    setLost(false);
  }

  const typeColor = TYPE_COLORS[loc[3]];
  const typeLabel = TYPE_LABELS[loc[3]];

  return (
    <div style={{
      minHeight: "100vh", background: "#0f0f17", color: "#f8f8f2",
      fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex",
      flexDirection: "column", alignItems: "center", padding: "24px 16px 48px"
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#6366f1", fontWeight: 700, marginBottom: 6 }}>
          WHERE IN THE WORLD?
        </div>
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900, letterSpacing: -1, color: "#f8f8f2" }}>
          GeoCities
        </h1>
        <p style={{ margin: "6px 0 0", color: "#666", fontSize: 13 }}>
          Guess the country from its location
        </p>
      </div>

      {/* Location card */}
      <div style={{
        background: "linear-gradient(135deg, #1e1e2e, #16162a)",
        border: `1px solid ${typeColor}44`, borderRadius: 16,
        overflow: "hidden", marginBottom: 28, width: "100%", maxWidth: 520,
        boxShadow: `0 0 32px ${typeColor}22`
      }}>
        {/* Photo area */}
        <div style={{
          width: "100%", height: 220, background: "#111118",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden"
        }}>
          {imgLoading && (
            <div style={{ color: "#444", fontSize: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                border: "3px solid #333", borderTopColor: typeColor,
                animation: "spin 0.8s linear infinite"
              }} />
              <span>Loading photo…</span>
            </div>
          )}
          {!imgLoading && imgUrl && (
            <img
              src={imgUrl}
              alt={loc[0]}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
          {!imgLoading && !imgUrl && (
            <div style={{ color: "#333", fontSize: 48 }}>🌍</div>
          )}
          {/* Gradient overlay at bottom */}
          {imgUrl && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
              background: "linear-gradient(transparent, #1e1e2e)"
            }} />
          )}
        </div>

        <div style={{ padding: "16px 24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{
              background: `${typeColor}22`, color: typeColor, borderRadius: 6,
              padding: "3px 10px", fontSize: 12, fontWeight: 700, letterSpacing: 0.5
            }}>
              {typeLabel}
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, color: "#f8f8f2" }}>
            {loc[0]}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
            Which country does this location belong to?
          </div>
        </div>
      </div>

      {/* Guess rows */}
      <div style={{ width: "100%", maxWidth: 520, display: "flex", flexDirection: "column", gap: 10 }}>
        {Array.from({ length: 6 }, (_, i) => {
          const hint = getHint(i);
          const isActive = i === currentRow && !won && !lost;
          const isCorrect = submitted[i] && guesses[i] === country.name;
          const isWrong = submitted[i] && guesses[i] !== country.name;

          return (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", opacity: i > currentRow && !won && !lost ? 0.35 : 1 }}>
              {/* Row number */}
              <div style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                background: isCorrect ? "#4ade80" : isWrong ? "#f87171" : isActive ? "#6366f1" : "#2a2a3e",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#fff"
              }}>
                {i + 1}
              </div>

              {/* Dropdown */}
              <SearchDropdown
                value={guesses[i]}
                onChange={v => {
                  const g = [...guesses];
                  g[i] = v;
                  setGuesses(g);
                }}
                disabled={!isActive}
                placeholder={isActive ? "Select a country…" : submitted[i] ? guesses[i] || "—" : "—"}
              />

              {/* Submit */}
              {isActive && (
                <button
                  onClick={() => handleGuess(i)}
                  disabled={!guesses[i]}
                  style={{
                    padding: "10px 16px", borderRadius: 8, border: "none",
                    background: guesses[i] ? "#6366f1" : "#2a2a3e",
                    color: "#fff", fontWeight: 700, fontSize: 13,
                    cursor: guesses[i] ? "pointer" : "not-allowed", flexShrink: 0,
                    transition: "background 0.2s"
                  }}
                >
                  Guess
                </button>
              )}

              {/* Hint */}
              {hint && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 5, flexShrink: 0,
                  background: "#1e1e2e", border: "1px solid #333", borderRadius: 8,
                  padding: "6px 10px", fontSize: 12, color: "#fb923c"
                }}>
                  <span style={{ fontSize: 14 }}>
                    {hint.dir === "N" ? "⬆️" : hint.dir === "S" ? "⬇️" : hint.dir === "E" ? "➡️" : hint.dir === "W" ? "⬅️" :
                     hint.dir === "NE" ? "↗️" : hint.dir === "NW" ? "↖️" : hint.dir === "SE" ? "↘️" : "↙️"}
                  </span>
                  <span style={{ fontWeight: 700 }}>{hint.dir}</span>
                  <span style={{ color: "#666" }}>·</span>
                  <span>{hint.dist.toLocaleString()} mi</span>
                </div>
              )}

              {/* Correct badge */}
              {isCorrect && (
                <div style={{
                  flexShrink: 0, background: "#4ade8022", border: "1px solid #4ade80",
                  borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#4ade80", fontWeight: 700
                }}>✓ Correct!</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Win/Lose banner */}
      {(won || lost) && (
        <div style={{
          marginTop: 28, width: "100%", maxWidth: 520,
          background: won ? "linear-gradient(135deg,#052e16,#14532d)" : "linear-gradient(135deg,#1c0a0a,#450a0a)",
          border: `1px solid ${won ? "#4ade80" : "#f87171"}`,
          borderRadius: 16, padding: "20px 24px", textAlign: "center"
        }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{won ? "🎉" : "💡"}</div>
          <div style={{ fontWeight: 800, fontSize: 20, color: won ? "#4ade80" : "#f87171", marginBottom: 4 }}>
            {won ? "Brilliant!" : "Better luck next time!"}
          </div>
          {lost && (
            <div style={{ color: "#aaa", marginBottom: 4, fontSize: 14 }}>
              The answer was <strong style={{ color: "#f8f8f2" }}>{country.name}</strong>
            </div>
          )}
          <div style={{ color: "#aaa", fontSize: 13, marginBottom: 16 }}>
            {loc[0]} is in <strong style={{ color: "#f8f8f2" }}>{country.name}</strong>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={`https://simple.wikipedia.org/wiki/${country.wiki}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: "10px 18px", borderRadius: 8,
                background: "#1d4ed8", color: "#fff", textDecoration: "none",
                fontWeight: 700, fontSize: 13
              }}
            >
              📖 Learn about {country.name}
            </a>
            <button
              onClick={reset}
              style={{
                padding: "10px 18px", borderRadius: 8,
                background: "#6366f1", color: "#fff", border: "none",
                fontWeight: 700, fontSize: 13, cursor: "pointer"
              }}
            >
              🔄 New Puzzle
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{
        marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center"
      }}>
        {Object.entries(TYPE_LABELS).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#888" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: TYPE_COLORS[k], display: "inline-block" }} />
            {v}
          </div>
        ))}
      </div>
    </div>
  );
}
