import { useState, useMemo, useRef, useEffect } from "react";

// ─── COUNTRIES DATA ──────────────────────────────────────────────────────────────
// Format: [name, lat, lng, type] where types: "capital" | "former" | "city" | "unesco" | "nature" | "sightseeing" | "water" | "mountain"
const COUNTRIES = [
  {
    name: "Afghanistan",
    wiki: "Afghanistan",
    cap: [34.5281, 69.1723],
    locs: [
      ["Kabul", 34.5281, 69.1723, "capital"],
      ["Kandahar", 31.6133, 65.7073, "former"],
      ["Mazar-i-Sharif", 36.7069, 67.1124, "city"],
      ["Band-e Amir National Park", 34.8306, 67.2297, "nature"],
      ["Panjshir Valley", 35.2333, 69.4667, "sightseeing"],
      ["Hindu Kush Mountains", 35.5, 71.0, "mountain"],
    ]
  },
  {
    name: "Albania",
    wiki: "Albania",
    cap: [41.3317, 19.8319],
    locs: [
      ["Tirana", 41.3317, 19.8319, "capital"],
      ["Gjirokastër", 40.0758, 20.1389, "unesco"],
      ["Berat", 40.7058, 19.9522, "unicode"],
      ["Valbona Valley National Park", 42.1606, 19.8733, "nature"],
      ["Kotor Bay", 42.4247, 18.7712, "water"],
      ["Mount Korab", 41.8669, 20.6633, "mountain"],
    ]
  },
  {
    name: "Algeria",
    wiki: "Algeria",
    cap: [36.7372, 3.0865],
    locs: [
      ["Algiers", 36.7372, 3.0865, "capital"],
      ["Timgad", 35.4869, 6.4680, "unicode"],
      ["Tassili n'Ajjer", 25.5, 9.0, "nature"],
      ["Sahara Desert", 25.0, 5.0, "sightseeing"],
      ["Mount Tahat", 23.6, 5.5, "mountain"],
    ]
  },
  {
    name: "Andorra",
    wiki: "Andorra",
    cap: [42.5063, 1.5218],
    locs: [
      ["Andorra la Vella", 42.5063, 1.5218, "capital"],
      ["Ordino", 42.5722, 1.5333, "sightseeing"],
      ["Coma Pedrosa", 42.6333, 1.4333, "mountain"],
    ]
  },
  {
    name: "Angola",
    wiki: "Angola",
    cap: [-8.8390, 13.2894],
    locs: [
      ["Luanda", -8.8390, 13.2894, "capital"],
      ["Iona National Park", -17.0, 12.5, "nature"],
      ["Kalandula Falls", -9.2333, 14.9667, "sightseeing"],
      ["Mount Moco", -7.6667, 15.0833, "mountain"],
    ]
  },
  {
    name: "Argentina",
    wiki: "Argentina",
    cap: [-34.6037, -58.3816],
    locs: [
      ["Buenos Aires", -34.6037, -58.3816, "capital"],
      ["Los Glaciares", -49.3167, -72.9167, "unicode"],
      ["Iguazú Falls", -25.6953, -54.4367, "unicode"],
      ["Nahuel Huapi National Park", -41.1333, -71.4667, "nature"],
      ["Mount Aconcagua", -32.6532, -70.0109, "mountain"],
    ]
  },
  {
    name: "Armenia",
    wiki: "Armenia",
    cap: [40.1872, 44.5152],
    locs: [
      ["Yerevan", 40.1872, 44.5152, "capital"],
      ["Dilijan National Park", 40.7333, 44.85, "nature"],
      ["Lake Sevan", 40.5, 44.8333, "water"],
      ["Mount Aragats", 40.5067, 44.2067, "mountain"],
    ]
  },
  {
    name: "Australia",
    wiki: "Australia",
    cap: [-35.2835, 149.1281],
    locs: [
      ["Canberra", -35.2835, 149.1281, "capital"],
      ["Sydney", -33.8688, 151.2093, "city"],
      ["Melbourne", -37.8136, 144.9631, "city"],
      ["Kakadu National Park", -12.7, 132.5, "nature"],
      ["Sydney Opera House", -33.8568, 151.2153, "sightseeing"],
      ["Mount Kosciuszko", -36.4519, 148.2636, "mountain"],
    ]
  },
  {
    name: "Austria",
    wiki: "Austria",
    cap: [48.2082, 16.3738],
    locs: [
      ["Vienna", 48.2082, 16.3738, "capital"],
      ["Salzburg", 47.8095, 13.0550, "unicode"],
      ["Hohe Tauern National Park", 47.5, 12.5, "nature"],
      ["Schönbrunn Palace", 48.1844, 16.3119, "sightseeing"],
      ["Grossglockner", 47.1197, 12.7164, "mountain"],
    ]
  },
  {
    name: "Azerbaijan",
    wiki: "Azerbaijan",
    cap: [40.4093, 49.8671],
    locs: [
      ["Baku", 40.4093, 49.8671, "capital"],
      ["Gobustan National Park", 40.1667, 48.9667, "nature"],
      ["Mount Bazardüzü", 41.1606, 48.8467, "mountain"],
    ]
  },
  {
    name: "Bahamas",
    wiki: "The_Bahamas",
    cap: [25.0480, -77.3554],
    locs: [
      ["Nassau", 25.0480, -77.3554, "capital"],
      ["Atlantis Resort", 25.0899, -76.8434, "sightseeing"],
    ]
  },
  {
    name: "Bahrain",
    wiki: "Bahrain",
    cap: [26.2154, 50.5832],
    locs: [
      ["Manama", 26.2154, 50.5832, "capital"],
      ["Bahrain National Museum", 26.2167, 50.5667, "sightseeing"],
    ]
  },
  {
    name: "Bangladesh",
    wiki: "Bangladesh",
    cap: [23.8103, 90.4125],
    locs: [
      ["Dhaka", 23.8103, 90.4125, "capital"],
      ["Sundarbans National Park", 21.9667, 89.1667, "nature"],
      ["Meghalaya Hills", 25.3, 91.8, "sightseeing"],
    ]
  },
  {
    name: "Barbados",
    wiki: "Barbados",
    cap: [13.0969, -59.6145],
    locs: [
      ["Bridgetown", 13.0969, -59.6145, "capital"],
      ["Bathsheba", 13.2047, -59.4742, "sightseeing"],
    ]
  },
  {
    name: "Belarus",
    wiki: "Belarus",
    cap: [53.9006, 27.5590],
    locs: [
      ["Minsk", 53.9006, 27.5590, "capital"],
      ["Belovezhskaya Pushcha National Park", 52.4833, 24.0167, "nature"],
      ["Pripyat", 51.4, 30.05, "sightseeing"],
      ["Mount Dzyarzhynskaya Hill", 53.6, 24.5, "mountain"],
    ]
  },
  {
    name: "Belgium",
    wiki: "Belgium",
    cap: [50.8503, 4.3517],
    locs: [
      ["Brussels", 50.8503, 4.3517, "capital"],
      ["Bruges", 51.2093, 3.2247, "unicode"],
      ["Meuse Valley", 50.4, 5.5, "nature"],
      ["Atomium", 50.8945, 4.3361, "sightseeing"],
      ["Signal de Botrange", 50.5021, 6.0436, "mountain"],
    ]
  },
  {
    name: "Belize",
    wiki: "Belize",
    cap: [17.2510, -88.7590],
    locs: [
      ["Belmopan", 17.2510, -88.7590, "capital"],
      ["Caracol", 16.7333, -89.2, "sightseeing"],
    ]
  },
  {
    name: "Benin",
    wiki: "Benin",
    cap: [6.3676, 2.4252],
    locs: [
      ["Porto-Novo", 6.3676, 2.4252, "capital"],
      ["Pendjari National Park", 10.3, 1.6, "nature"],
      ["Ganvié Stilt Village", 6.4667, 2.4333, "sightseeing"],
    ]
  },
  {
    name: "Bhutan",
    wiki: "Bhutan",
    cap: [27.4728, 89.6390],
    locs: [
      ["Thimphu", 27.4728, 89.6390, "capital"],
      ["Jigme Dorji National Park", 27.8, 89.3, "nature"],
      ["Tiger's Nest Monastery", 27.4208, 89.4165, "sightseeing"],
      ["Mount Jomolhari", 27.9667, 89.4667, "mountain"],
    ]
  },
  {
    name: "Bolivia",
    wiki: "Bolivia",
    cap: [-16.5000, -68.1501],
    locs: [
      ["La Paz", -16.5000, -68.1501, "capital"],
      ["Madidi National Park", -14.0, -68.5, "nature"],
      ["Salar de Uyuni", -19.3, -66.8, "sightseeing"],
      ["Mount Nevado Sajama", -18.1, -68.9, "mountain"],
    ]
  },
  {
    name: "Bosnia and Herzegovina",
    wiki: "Bosnia_and_Herzegovina",
    cap: [43.8486, 18.3564],
    locs: [
      ["Sarajevo", 43.8486, 18.3564, "capital"],
      ["Mostar", 43.3438, 17.8078, "unicode"],
      ["Sutjeska National Park", 43.55, 18.75, "nature"],
      ["Stari Most Bridge", 43.3372, 17.8047, "sightseeing"],
      ["Mount Maglic", 43.7067, 19.0389, "mountain"],
    ]
  },
  {
    name: "Botswana",
    wiki: "Botswana",
    cap: [-24.6282, 25.9231],
    locs: [
      ["Gaborone", -24.6282, 25.9231, "capital"],
      ["Central Kalahari National Park", -21.5, 23.5, "nature"],
      ["Makgadikgadi Pans", -21.5, 24.5, "sightseeing"],
    ]
  },
  {
    name: "Brazil",
    wiki: "Brazil",
    cap: [-15.7795, -47.9297],
    locs: [
      ["Brasília", -15.7795, -47.9297, "capital"],
      ["Rio de Janeiro", -22.9068, -43.1729, "city"],
      ["São Paulo", -23.5558, -46.6396, "city"],
      ["Atlantic Forest", -25.5, -48.8, "nature"],
      ["Christ the Redeemer", -22.9519, -43.2105, "sightseeing"],
      ["Mount Pico da Neblina", 0.8, -66.0, "mountain"],
    ]
  },
  {
    name: "Brunei",
    wiki: "Brunei",
    cap: [4.9031, 114.9398],
    locs: [
      ["Bandar Seri Begawan", 4.9031, 114.9398, "capital"],
      ["Temburong National Park", 4.5, 115.1667, "nature"],
    ]
  },
  {
    name: "Bulgaria",
    wiki: "Bulgaria",
    cap: [42.6977, 23.3219],
    locs: [
      ["Sofia", 42.6977, 23.3219, "capital"],
      ["Plitvice Lakes", 44.8654, 15.5820, "nature"],
      ["Alexander Nevsky Cathedral", 42.6977, 23.3219, "sightseeing"],
      ["Mount Musala", 42.1857, 23.5847, "mountain"],
    ]
  },
  {
    name: "Burkina Faso",
    wiki: "Burkina_Faso",
    cap: [12.3714, -1.5197],
    locs: [
      ["Ouagadougou", 12.3714, -1.5197, "capital"],
      ["W National Park", 11.8667, 2.0, "nature"],
    ]
  },
  {
    name: "Burundi",
    wiki: "Burundi",
    cap: [-3.4271, 29.9249],
    locs: [
      ["Gitega", -3.4271, 29.9249, "capital"],
      ["Rusizi National Park", -3.5, 29.2, "nature"],
      ["Mount Heha", -3.4, 29.7, "mountain"],
    ]
  },
  {
    name: "Cabo Verde",
    wiki: "Cape_Verde",
    cap: [14.9330, -23.5133],
    locs: [
      ["Praia", 14.9330, -23.5133, "capital"],
      ["Pico do Fogo", 14.945, -24.35, "mountain"],
    ]
  },
  {
    name: "Cambodia",
    wiki: "Cambodia",
    cap: [11.5625, 104.9160],
    locs: [
      ["Phnom Penh", 11.5625, 104.9160, "capital"],
      ["Angkor", 13.4125, 103.8670, "unicode"],
      ["Tonlé Sap National Park", 12.5, 104.0, "nature"],
      ["Tonlé Sap Lake", 12.5, 104.5, "water"],
    ]
  },
  {
    name: "Cameroon",
    wiki: "Cameroon",
    cap: [3.8667, 11.5167],
    locs: [
      ["Yaoundé", 3.8667, 11.5167, "capital"],
      ["Mount Cameroon", 4.2033, 9.1658, "mountain"],
    ]
  },
  {
    name: "Canada",
    wiki: "Canada",
    cap: [45.4215, -75.6972],
    locs: [
      ["Ottawa", 45.4215, -75.6972, "capital"],
      ["Toronto", 43.6532, -79.3832, "city"],
      ["Montreal", 45.5017, -73.5673, "city"],
      ["Banff National Park", 51.4833, -115.95, "nature"],
      ["Niagara Falls", 43.0896, -79.0849, "sightseeing"],
      ["Mount Robson", 53.1167, -119.1667, "mountain"],
    ]
  },
  {
    name: "Central African Republic",
    wiki: "Central_African_Republic",
    cap: [4.3612, 18.5550],
    locs: [
      ["Bangui", 4.3612, 18.5550, "capital"],
      ["Dzanga-Ndoki National Park", 2.3, 16.2, "nature"],
    ]
  },
  {
    name: "Chad",
    wiki: "Chad",
    cap: [12.1048, 15.0444],
    locs: [
      ["N'Djamena", 12.1048, 15.0444, "capital"],
      ["Zakouma National Park", 10.6, 19.0, "nature"],
      ["Mount Illi", 19.8, 22.5, "mountain"],
    ]
  },
  {
    name: "Chile",
    wiki: "Chile",
    cap: [-33.4489, -70.6693],
    locs: [
      ["Santiago", -33.4489, -70.6693, "capital"],
      ["Torres del Paine National Park", -51.0, -73.0, "nature"],
      ["Atacama Desert", -22.0, -68.0, "sightseeing"],
      ["Mount Ojos del Salado", -24.1, -68.4, "mountain"],
    ]
  },
  {
    name: "China",
    wiki: "China",
    cap: [39.9042, 116.4074],
    locs: [
      ["Beijing", 39.9042, 116.4074, "capital"],
      ["Shanghai", 31.2304, 121.4737, "city"],
      ["Zhangjiajie National Forest Park", 29.3, 110.5, "nature"],
      ["Forbidden City", 39.9163, 116.3965, "sightseeing"],
      ["Mount Everest", 27.9881, 86.9250, "mountain"],
    ]
  },
  {
    name: "Colombia",
    wiki: "Colombia",
    cap: [4.7110, -74.0721],
    locs: [
      ["Bogotá", 4.7110, -74.0721, "capital"],
      ["Medellín", 6.2442, -75.5812, "city"],
      ["Serranía de la Macarena National Park", 3.5, -73.8, "nature"],
      ["Coffee Triangle", 4.8, -75.5, "sightseeing"],
      ["Mount Pico Cristóbal Colón", 10.8333, -73.5833, "mountain"],
    ]
  },
  {
    name: "Comoros",
    wiki: "Comoros",
    cap: [-11.7022, 43.2551],
    locs: [
      ["Moroni", -11.7022, 43.2551, "capital"],
      ["Mount Karthala", -11.7458, 43.3825, "mountain"],
    ]
  },
  {
    name: "Congo (DRC)",
    wiki: "Democratic_Republic_of_the_Congo",
    cap: [-4.3276, 15.3136],
    locs: [
      ["Kinshasa", -4.3276, 15.3136, "capital"],
      ["Okapi Wildlife Reserve", 1.4, 28.3, "nature"],
      ["Mount Stanley", -0.8, 29.9, "mountain"],
    ]
  },
  {
    name: "Congo (Republic)",
    wiki: "Republic_of_the_Congo",
    cap: [-4.2661, 15.2832],
    locs: [
      ["Brazzaville", -4.2661, 15.2832, "capital"],
      ["Odzala-Kokoua National Park", 1.0, 20.5, "nature"],
    ]
  },
  {
    name: "Costa Rica",
    wiki: "Costa_Rica",
    cap: [9.9281, -84.0907],
    locs: [
      ["San José", 9.9281, -84.0907, "capital"],
      ["Monteverde Cloud Forest", 10.3, -84.8, "nature"],
      ["Arenal Volcano", 10.463, -84.703, "sightseeing"],
      ["Mount Cerro Chirripó", 9.1833, -83.4833, "mountain"],
    ]
  },
  {
    name: "Côte d'Ivoire",
    wiki: "Ivory_Coast",
    cap: [6.8276, -5.2893],
    locs: [
      ["Yamoussoukro", 6.8276, -5.2893, "capital"],
      ["Tai National Park", 5.8333, -7.3333, "nature"],
    ]
  },
  {
    name: "Croatia",
    wiki: "Croatia",
    cap: [45.8150, 15.9819],
    locs: [
      ["Zagreb", 45.8150, 15.9819, "capital"],
      ["Dubrovnik", 42.6507, 18.0944, "unicode"],
      ["Paklenica National Park", 44.3667, 15.1, "nature"],
      ["Dalmatian Coast", 42.8, 17.0, "sightseeing"],
      ["Mount Dinara", 44.7, 16.2, "mountain"],
    ]
  },
  {
    name: "Cuba",
    wiki: "Cuba",
    cap: [23.1136, -82.3666],
    locs: [
      ["Havana", 23.1136, -82.3666, "capital"],
      ["Trinidad", 21.8028, -79.9841, "unicode"],
      ["Viñales National Park", 22.5667, -83.6333, "nature"],
      ["Playa del Este", 23.1667, -82.1833, "sightseeing"],
      ["Mount Turquino", 19.9667, -76.9, "mountain"],
    ]
  },
  {
    name: "Cyprus",
    wiki: "Cyprus",
    cap: [35.1856, 33.3823],
    locs: [
      ["Nicosia", 35.1856, 33.3823, "capital"],
      ["Akamas Peninsula", 34.9, 32.4, "nature"],
      ["Mount Olympus", 34.9167, 33.0333, "mountain"],
    ]
  },
  {
    name: "Czech Republic",
    wiki: "Czech_Republic",
    cap: [50.0755, 14.4378],
    locs: [
      ["Prague", 50.0755, 14.4378, "capital"],
      ["Bohemian Switzerland National Park", 50.8, 14.3, "nature"],
      ["Charles Bridge", 50.0862, 14.4146, "sightseeing"],
      ["Mount Sněžka", 50.7356, 15.7369, "mountain"],
    ]
  },
  {
    name: "Denmark",
    wiki: "Denmark",
    cap: [55.6761, 12.5683],
    locs: [
      ["Copenhagen", 55.6761, 12.5683, "capital"],
      ["Kalø Vig Nature Reserve", 56.25, 10.3, "nature"],
      ["Tivoli Gardens", 55.6753, 12.5673, "sightseeing"],
      ["Møn Klint", 54.9333, 12.6833, "mountain"],
    ]
  },
  {
    name: "Djibouti",
    wiki: "Djibouti",
    cap: [11.8251, 42.5903],
    locs: [
      ["Djibouti City", 11.8251, 42.5903, "capital"],
      ["Day Forest National Park", 11.5, 42.8, "nature"],
    ]
  },
  {
    name: "Dominica",
    wiki: "Dominica",
    cap: [15.3017, -61.3881],
    locs: [
      ["Roseau", 15.3017, -61.3881, "capital"],
      ["Morne Trois Pitons National Park", 15.3167, -61.2667, "nature"],
      ["Mount Diablotins", 15.4833, -61.3667, "mountain"],
    ]
  },
  {
    name: "Dominican Republic",
    wiki: "Dominican_Republic",
    cap: [18.4861, -69.9312],
    locs: [
      ["Santo Domingo", 18.4861, -69.9312, "capital"],
      ["Los Haitises National Park", 19.25, -69.25, "nature"],
      ["Punta Cana", 18.5, -68.4, "sightseeing"],
      ["Mount Duarte", 19.2167, -70.75, "mountain"],
    ]
  },
  {
    name: "Ecuador",
    wiki: "Ecuador",
    cap: [-0.2298, -78.5249],
    locs: [
      ["Quito", -0.2298, -78.5249, "capital"],
      ["Yasuní National Park", -0.6, -76.0, "nature"],
      ["Amazon Rainforest", -1.0, -75.0, "sightseeing"],
      ["Mount Cotopaxi", -0.8669, -78.4414, "mountain"],
    ]
  },
  {
    name: "Egypt",
    wiki: "Egypt",
    cap: [30.0444, 31.2357],
    locs: [
      ["Cairo", 30.0444, 31.2357, "capital"],
      ["Wadi el-Gemal National Park", 25.0, 34.5, "nature"],
      ["Giza Pyramids", 29.9753, 31.1349, "sightseeing"],
      ["Mount Sinai", 28.5333, 33.9667, "mountain"],
    ]
  },
  {
    name: "El Salvador",
    wiki: "El_Salvador",
    cap: [13.6929, -89.2182],
    locs: [
      ["San Salvador", 13.6929, -89.2182, "capital"],
      ["Los Volcanes National Park", 13.8, -89.6, "nature"],
      ["Mount Santa Ana", 13.8333, -89.6333, "mountain"],
    ]
  },
  {
    name: "Equatorial Guinea",
    wiki: "Equatorial_Guinea",
    cap: [3.7500, 8.7833],
    locs: [
      ["Malabo", 3.7500, 8.7833, "capital"],
      ["Monte Alen National Park", 1.5, 10.5, "nature"],
      ["Mount Basile", 3.4167, 8.6333, "mountain"],
    ]
  },
  {
    name: "Eritrea",
    wiki: "Eritrea",
    cap: [15.3229, 38.9251],
    locs: [
      ["Asmara", 15.3229, 38.9251, "capital"],
      ["Dahlak Archipelago", 15.5, 40.3, "nature"],
    ]
  },
  {
    name: "Estonia",
    wiki: "Estonia",
    cap: [59.4370, 24.7536],
    locs: [
      ["Tallinn", 59.4370, 24.7536, "capital"],
      ["Lahemaa National Park", 59.5, 25.5, "nature"],
      ["Mount Munamägi", 57.9619, 27.1858, "mountain"],
    ]
  },
  {
    name: "Eswatini",
    wiki: "Eswatini",
    cap: [-26.3054, 31.1367],
    locs: [
      ["Mbabane", -26.3054, 31.1367, "capital"],
      ["Mlilwane Wildlife Sanctuary", -26.0667, 31.1833, "nature"],
      ["Usushwana Mountain", -26.05, 32.0, "mountain"],
    ]
  },
  {
    name: "Ethiopia",
    wiki: "Ethiopia",
    cap: [8.9806, 38.7578],
    locs: [
      ["Addis Ababa", 8.9806, 38.7578, "capital"],
      ["Simien Mountains National Park", 13.3, 38.3, "nature"],
      ["Blue Nile Falls", 11.4, 37.9, "sightseeing"],
      ["Mount Ras Dashen", 14.3333, 39.4333, "mountain"],
    ]
  },
  {
    name: "Fiji",
    wiki: "Fiji",
    cap: [-18.1416, 178.4419],
    locs: [
      ["Suva", -18.1416, 178.4419, "capital"],
      ["Fiji Islands National Heritage Park", -18.0, 178.5, "nature"],
    ]
  },
  {
    name: "Finland",
    wiki: "Finland",
    cap: [60.1699, 24.9384],
    locs: [
      ["Helsinki", 60.1699, 24.9384, "capital"],
      ["Nuuksio National Park", 60.3167, 24.8333, "nature"],
      ["Santa Claus Village", 66.5333, 25.7167, "sightseeing"],
      ["Mount Halti", 67.7333, 26.9333, "mountain"],
    ]
  },
  {
    name: "France",
    wiki: "France",
    cap: [48.8566, 2.3522],
    locs: [
      ["Paris", 48.8566, 2.3522, "capital"],
      ["Camargue National Park", 43.5, 4.5, "nature"],
      ["Eiffel Tower", 48.8584, 2.2945, "sightseeing"],
      ["Mont Blanc", 45.8325, 6.8652, "mountain"],
    ]
  },
  {
    name: "Gabon",
    wiki: "Gabon",
    cap: [0.3901, 9.4500],
    locs: [
      ["Libreville", 0.3901, 9.4500, "capital"],
      ["Lopé National Park", -0.2, 10.6, "nature"],
      ["Mount Iboundji", 0.2, 10.1, "mountain"],
    ]
  },
  {
    name: "Gambia",
    wiki: "The_Gambia",
    cap: [13.4531, -16.5775],
    locs: [
      ["Banjul", 13.4531, -16.5775, "capital"],
      ["Kiang West National Park", 13.4667, -16.3333, "nature"],
    ]
  },
  {
    name: "Georgia",
    wiki: "Georgia_(country)",
    cap: [41.6938, 44.8015],
    locs: [
      ["Tbilisi", 41.6938, 44.8015, "capital"],
      ["Mtirala National Park", 41.5, 41.7, "nature"],
      ["Gergeti Trinity Church", 42.5467, 44.6344, "sightseeing"],
      ["Mount Kazbek", 42.6889, 44.7919, "mountain"],
    ]
  },
  {
    name: "Germany",
    wiki: "Germany",
    cap: [52.5200, 13.4050],
    locs: [
      ["Berlin", 52.5200, 13.4050, "capital"],
      ["Black Forest National Park", 48.5, 8.2, "nature"],
      ["Neuschwanstein Castle", 47.5576, 10.7498, "sightseeing"],
      ["Mount Zugspitze", 47.4743, 10.9861, "mountain"],
    ]
  },
  {
    name: "Ghana",
    wiki: "Ghana",
    cap: [5.5600, -0.2057],
    locs: [
      ["Accra", 5.5600, -0.2057, "capital"],
      ["Kakum National Park", 5.3167, -1.3167, "nature"],
    ]
  },
  {
    name: "Greece",
    wiki: "Greece",
    cap: [37.9838, 23.7275],
    locs: [
      ["Athens", 37.9838, 23.7275, "capital"],
      ["Pindus National Park", 39.7, 21.5, "nature"],
      ["Mykonos", 37.4467, 25.3283, "sightseeing"],
      ["Mount Olympus", 39.7356, 22.3565, "mountain"],
    ]
  },
  {
    name: "Grenada",
    wiki: "Grenada",
    cap: [12.0561, -61.7488],
    locs: [
      ["Saint George's", 12.0561, -61.7488, "capital"],
      ["Grand Anse", 12.0167, -61.7333, "sightseeing"],
      ["Mount Saint Catherine", 12.1667, -61.7167, "mountain"],
    ]
  },
  {
    name: "Guatemala",
    wiki: "Guatemala",
    cap: [14.6349, -90.5069],
    locs: [
      ["Guatemala City", 14.6349, -90.5069, "capital"],
      ["Sierra del Lacandón National Park", 17.2, -91.0, "nature"],
      ["Lake Atitlán", 14.65, -91.25, "water"],
      ["Mount Tajumulco", 14.7944, -91.8967, "mountain"],
    ]
  },
  {
    name: "Guinea",
    wiki: "Guinea",
    cap: [9.6412, -13.5784],
    locs: [
      ["Conakry", 9.6412, -13.5784, "capital"],
      ["Mount Nimba Strict Nature Reserve", 7.6, -8.4, "nature"],
    ]
  },
  {
    name: "Guinea-Bissau",
    wiki: "Guinea-Bissau",
    cap: [11.8636, -15.5977],
    locs: [
      ["Bissau", 11.8636, -15.5977, "capital"],
      ["Cacheu National Park", 12.3, -15.0, "nature"],
    ]
  },
  {
    name: "Guyana",
    wiki: "Guyana",
    cap: [6.8013, -58.1553],
    locs: [
      ["Georgetown", 6.8013, -58.1553, "capital"],
      ["Kaieteur National Park", 5.2, -59.5, "nature"],
      ["Kaiteur Falls", 5.1644, -59.4958, "sightseeing"],
    ]
  },
  {
    name: "Haiti",
    wiki: "Haiti",
    cap: [18.5944, -72.3074],
    locs: [
      ["Port-au-Prince", 18.5944, -72.3074, "capital"],
    ]
  },
  {
    name: "Honduras",
    wiki: "Honduras",
    cap: [14.0723, -87.2062],
    locs: [
      ["Tegucigalpa", 14.0723, -87.2062, "capital"],
      ["Pico Bonito National Park", 15.5, -87.7, "nature"],
      ["Mount Cerro Las Minas", 14.8, -88.0, "mountain"],
    ]
  },
  {
    name: "Hungary",
    wiki: "Hungary",
    cap: [47.4979, 19.0402],
    locs: [
      ["Budapest", 47.4979, 19.0402, "capital"],
      ["Hortobágy National Park", 47.5, 20.8, "nature"],
      ["Thermal Bath", 47.5, 19.0, "sightseeing"],
      ["Mount Kékes", 47.8333, 19.75, "mountain"],
    ]
  },
  {
    name: "Iceland",
    wiki: "Iceland",
    cap: [64.1466, -21.9426],
    locs: [
      ["Reykjavik", 64.1466, -21.9426, "capital"],
      ["Vatnajökull National Park", 64.0, -16.8, "nature"],
      ["Geysir Hot Spring", 64.31, -20.305, "sightseeing"],
      ["Mount Hvannadalshnúkur", 64.0, -16.9, "mountain"],
    ]
  },
  {
    name: "India",
    wiki: "India",
    cap: [28.6139, 77.2090],
    locs: [
      ["New Delhi", 28.6139, 77.2090, "capital"],
      ["Calcutta (Kolkata)", 22.5726, 88.3639, "former"],
      ["Mumbai", 19.0760, 72.8777, "city"],
      ["Jim Corbett National Park", 29.5, 79.2, "nature"],
      ["Taj Mahal", 27.1751, 78.0421, "sightseeing"],
      ["Mount Kangchenjunga", 27.7, 88.1, "mountain"],
    ]
  },
  {
    name: "Indonesia",
    wiki: "Indonesia",
    cap: [-1.0000, 117.0000],
    locs: [
      ["Nusantara", -1.0000, 117.0000, "capital"],
      ["Mount Leuser National Park", 3.0, 97.6, "nature"],
      ["Mount Bromo", -7.9425, 112.9528, "sightseeing"],
      ["Mount Kerinci", -1.6944, 101.2639, "mountain"],
    ]
  },
  {
    name: "Iran",
    wiki: "Iran",
    cap: [35.6892, 51.3890],
    locs: [
      ["Tehran", 35.6892, 51.3890, "capital"],
      ["Golestan National Park", 37.4, 55.3, "nature"],
      ["Naqsh-e Jahan Square", 32.6561, 51.6785, "sightseeing"],
      ["Mount Damavand", 35.9422, 51.3306, "mountain"],
    ]
  },
  {
    name: "Iraq",
    wiki: "Iraq",
    cap: [33.3152, 44.3661],
    locs: [
      ["Baghdad", 33.3152, 44.3661, "capital"],
      ["Marshlands", 31.0, 47.0, "nature"],
    ]
  },
  {
    name: "Ireland",
    wiki: "Republic_of_Ireland",
    cap: [53.3498, -6.2603],
    locs: [
      ["Dublin", 53.3498, -6.2603, "capital"],
      ["Killarney National Park", 52.0, -9.5, "nature"],
      ["Cliffs of Moher", 52.7347, -9.4369, "sightseeing"],
      ["Carrantuohill", 52.0111, -9.7225, "mountain"],
    ]
  },
  {
    name: "Israel",
    wiki: "Israel",
    cap: [31.7683, 35.2137],
    locs: [
      ["Jerusalem", 31.7683, 35.2137, "capital"],
      ["Judean Desert National Park", 31.8, 35.6, "nature"],
      ["Western Wall", 31.7769, 35.2345, "sightseeing"],
      ["Mount Hermon", 33.4167, 35.75, "mountain"],
    ]
  },
  {
    name: "Italy",
    wiki: "Italy",
    cap: [41.9028, 12.4964],
    locs: [
      ["Rome", 41.9028, 12.4964, "capital"],
      ["Amalfi Coast", 40.6333, 14.6, "nature"],
      ["Colosseum", 41.8902, 12.4923, "sightseeing"],
      ["Mount Mont Blanc", 45.8325, 6.8652, "mountain"],
    ]
  },
  {
    name: "Jamaica",
    wiki: "Jamaica",
    cap: [17.9714, -76.7937],
    locs: [
      ["Kingston", 17.9714, -76.7937, "capital"],
      ["Montego Bay", 18.4891, -77.9481, "sightseeing"],
      ["Blue Mountain Peak", 18.0333, -76.7333, "mountain"],
    ]
  },
  {
    name: "Japan",
    wiki: "Japan",
    cap: [35.6762, 139.6503],
    locs: [
      ["Tokyo", 35.6762, 139.6503, "capital"],
      ["Yakushima", 30.3833, 130.5, "nature"],
      ["Mount Fuji", 35.3606, 138.7274, "sightseeing"],
      ["Mount Fuji", 35.3606, 138.7274, "mountain"],
    ]
  },
  {
    name: "Jordan",
    wiki: "Jordan",
    cap: [31.9566, 35.9456],
    locs: [
      ["Amman", 31.9566, 35.9456, "capital"],
      ["Dana Nature Reserve", 31.6, 35.7, "nature"],
      ["Mount Umm Qais", 32.3, 35.8, "mountain"],
    ]
  },
  {
    name: "Kazakhstan",
    wiki: "Kazakhstan",
    cap: [51.1801, 71.4460],
    locs: [
      ["Astana", 51.1801, 71.4460, "capital"],
      ["Charyn National Park", 43.4, 76.6, "nature"],
      ["Mount Khan Tengri", 42.1944, 79.9722, "mountain"],
    ]
  },
  {
    name: "Kenya",
    wiki: "Kenya",
    cap: [-1.2921, 36.8219],
    locs: [
      ["Nairobi", -1.2921, 36.8219, "capital"],
      ["Mount Kenya National Park", -0.0497, 37.3002, "nature"],
      ["Great Rift Valley", -1.0, 36.0, "sightseeing"],
      ["Mount Kenya", -0.0497, 37.3002, "mountain"],
    ]
  },
  {
    name: "Kiribati",
    wiki: "Kiribati",
    cap: [1.3290, 172.9790],
    locs: [
      ["South Tarawa", 1.3290, 172.9790, "capital"],
      ["Phoenix Islands", 3.6667, -172.0, "nature"],
    ]
  },
  {
    name: "Kuwait",
    wiki: "Kuwait",
    cap: [29.3759, 47.9774],
    locs: [
      ["Kuwait City", 29.3759, 47.9774, "capital"],
      ["Kuwait Towers", 29.3765, 47.9774, "sightseeing"],
    ]
  },
  {
    name: "Kyrgyzstan",
    wiki: "Kyrgyzstan",
    cap: [42.8746, 74.5698],
    locs: [
      ["Bishkek", 42.8746, 74.5698, "capital"],
      ["Ala-Archa National Park", 42.5167, 74.5167, "nature"],
      ["Mount Jengish Chokusu", 42.7308, 80.1234, "mountain"],
    ]
  },
  {
    name: "Laos",
    wiki: "Laos",
    cap: [17.9757, 102.6331],
    locs: [
      ["Vientiane", 17.9757, 102.6331, "capital"],
      ["Phu Quoc National Park", 10.2, 104.0, "nature"],
      ["Mount Phu Bia", 19.8, 102.7, "mountain"],
    ]
  },
  {
    name: "Latvia",
    wiki: "Latvia",
    cap: [56.9496, 24.1052],
    locs: [
      ["Riga", 56.9496, 24.1052, "capital"],
      ["Gauja National Park", 57.2, 24.8, "nature"],
      ["Mount Gaizinkains", 57.0, 25.3, "mountain"],
    ]
  },
  {
    name: "Lebanon",
    wiki: "Lebanon",
    cap: [33.8886, 35.4955],
    locs: [
      ["Beirut", 33.8886, 35.4955, "capital"],
      ["Cedars of God National Park", 33.85, 35.85, "nature"],
      ["Grotto of Jeita", 33.9667, 35.65, "sightseeing"],
      ["Mount Lebanon", 33.85, 35.5, "mountain"],
    ]
  },
  {
    name: "Lesotho",
    wiki: "Lesotho",
    cap: [-29.3167, 27.4833],
    locs: [
      ["Maseru", -29.3167, 27.4833, "capital"],
      ["Sehlabathebe National Park", -29.9667, 28.6833, "nature"],
      ["Mount Thabana Ntlenyana", -29.4, 28.5, "mountain"],
    ]
  },
  {
    name: "Liberia",
    wiki: "Liberia",
    cap: [6.3005, -10.7969],
    locs: [
      ["Monrovia", 6.3005, -10.7969, "capital"],
      ["Sapo National Park", 4.5, -9.0, "nature"],
    ]
  },
  {
    name: "Libya",
    wiki: "Libya",
    cap: [32.9006, 13.1862],
    locs: [
      ["Tripoli", 32.9006, 13.1862, "capital"],
      ["Sahara Desert", 25.0, 15.0, "nature"],
    ]
  },
  {
    name: "Liechtenstein",
    wiki: "Liechtenstein",
    cap: [47.1410, 9.5215],
    locs: [
      ["Vaduz", 47.1410, 9.5215, "capital"],
      ["Malbun", 47.2667, 9.6333, "sightseeing"],
      ["Mount Grauspitz", 47.2333, 9.65, "mountain"],
    ]
  },
  {
    name: "Lithuania",
    wiki: "Lithuania",
    cap: [54.6872, 25.2797],
    locs: [
      ["Vilnius", 54.6872, 25.2797, "capital"],
      ["Dzūkija National Park", 54.0, 24.5, "nature"],
      ["Trakai Island Castle", 54.6461, 24.9475, "sightseeing"],
      ["Mount Aukštasis Kalnas", 56.0, 25.0, "mountain"],
    ]
  },
  {
    name: "Luxembourg",
    wiki: "Luxembourg",
    cap: [49.6116, 6.1319],
    locs: [
      ["Luxembourg City", 49.6116, 6.1319, "capital"],
      ["Müllerthal Region", 49.7, 6.3, "nature"],
    ]
  },
  {
    name: "Madagascar",
    wiki: "Madagascar",
    cap: [-18.9137, 47.5361],
    locs: [
      ["Antananarivo", -18.9137, 47.5361, "capital"],
      ["Masoala National Park", -15.7, 49.8, "nature"],
      ["Mount Maromokotro", -14.4, 49.5, "mountain"],
    ]
  },
  {
    name: "Malawi",
    wiki: "Malawi",
    cap: [-13.9669, 33.7873],
    locs: [
      ["Lilongwe", -13.9669, 33.7873, "capital"],
      ["Nyika National Park", -10.5, 33.5, "nature"],
      ["Mount Mulanje", -15.9667, 35.5833, "mountain"],
    ]
  },
  {
    name: "Malaysia",
    wiki: "Malaysia",
    cap: [3.1390, 101.6869],
    locs: [
      ["Kuala Lumpur", 3.1390, 101.6869, "capital"],
      ["Taman Negara National Park", 4.0, 102.3, "nature"],
      ["Petronas Twin Towers", 3.1577, 101.6876, "sightseeing"],
      ["Mount Kinabalu", 6.0836, 116.5527, "mountain"],
    ]
  },
  {
    name: "Maldives",
    wiki: "Maldives",
    cap: [4.1755, 73.5093],
    locs: [
      ["Malé", 4.1755, 73.5093, "capital"],
      ["Baa Atoll", 5.2667, 72.8667, "sightseeing"],
    ]
  },
  {
    name: "Mali",
    wiki: "Mali",
    cap: [12.6392, -8.0029],
    locs: [
      ["Bamako", 12.6392, -8.0029, "capital"],
      ["Air and Ténéré", 18.5000, 8.5000, "nature"],
    ]
  },
  {
    name: "Malta",
    wiki: "Malta",
    cap: [35.9042, 14.5189],
    locs: [
      ["Valletta", 35.9042, 14.5189, "capital"],
      ["Dingli Cliffs", 35.8533, 14.3969, "sightseeing"],
    ]
  },
  {
    name: "Marshall Islands",
    wiki: "Marshall_Islands",
    cap: [7.1167, 171.3667],
    locs: [
      ["Majuro", 7.1167, 171.3667, "capital"],
      ["Kwajalein Atoll", 8.7, 167.5, "nature"],
    ]
  },
  {
    name: "Mauritania",
    wiki: "Mauritania",
    cap: [18.0735, -15.9582],
    locs: [
      ["Nouakchott", 18.0735, -15.9582, "capital"],
      ["Sahara Desert", 20.0, -10.0, "nature"],
    ]
  },
  {
    name: "Mauritius",
    wiki: "Mauritius",
    cap: [-20.1608, 57.4989],
    locs: [
      ["Port Louis", -20.1608, 57.4989, "capital"],
      ["Black River Gorges", -20.3667, 57.4167, "nature"],
    ]
  },
  {
    name: "Mexico",
    wiki: "Mexico",
    cap: [19.4326, -99.1332],
    locs: [
      ["Mexico City", 19.4326, -99.1332, "capital"],
      ["Calakmul Biosphere Reserve", 17.5, -89.5, "nature"],
      ["Copper Canyon", 27.8, -107.5, "sightseeing"],
      ["Mount Pico de Orizaba", 19.0342, -97.2706, "mountain"],
    ]
  },
  {
    name: "Micronesia",
    wiki: "Federated_States_of_Micronesia",
    cap: [6.9248, 158.1618],
    locs: [
      ["Palikir", 6.9248, 158.1618, "capital"],
      ["Pohnpei", 6.85, 158.21, "nature"],
    ]
  },
  {
    name: "Moldova",
    wiki: "Moldova",
    cap: [47.0105, 28.8638],
    locs: [
      ["Chișinău", 47.0105, 28.8638, "capital"],
      ["Mount Balan", 47.0, 28.5, "mountain"],
    ]
  },
  {
    name: "Monaco",
    wiki: "Monaco",
    cap: [43.7384, 7.4246],
    locs: [
      ["Monaco", 43.7384, 7.4246, "capital"],
      ["Monte Carlo Casino", 43.7384, 7.4246, "sightseeing"],
    ]
  },
  {
    name: "Mongolia",
    wiki: "Mongolia",
    cap: [47.8864, 106.9057],
    locs: [
      ["Ulaanbaatar", 47.8864, 106.9057, "capital"],
      ["Khustain Nuruu National Park", 47.9, 106.5, "nature"],
      ["Gobi Desert", 42.0, 108.0, "sightseeing"],
      ["Mount Khuiten Peak", 50.8667, 87.65, "mountain"],
    ]
  },
  {
    name: "Montenegro",
    wiki: "Montenegro",
    cap: [42.4304, 19.2594],
    locs: [
      ["Podgorica", 42.4304, 19.2594, "capital"],
      ["Durmitor National Park", 43.1, 19.0, "nature"],
      ["Bay of Kotor", 42.42, 18.72, "water"],
      ["Mount Durmitor", 43.1333, 19.0333, "mountain"],
    ]
  },
  {
    name: "Morocco",
    wiki: "Morocco",
    cap: [33.9716, -6.8498],
    locs: [
      ["Rabat", 33.9716, -6.8498, "capital"],
      ["Sahara Desert", 27.0, -4.0, "nature"],
      ["Jemaa el-Fnaa", 31.6295, -8.0082, "sightseeing"],
      ["Mount Toubkal", 31.0596, -5.5511, "mountain"],
    ]
  },
  {
    name: "Mozambique",
    wiki: "Mozambique",
    cap: [-25.9692, 32.5732],
    locs: [
      ["Maputo", -25.9692, 32.5732, "capital"],
      ["Gorongosa National Park", -18.5, 34.5, "nature"],
      ["Inhaca Island", -23.8, 35.3, "sightseeing"],
      ["Mount Binga", -23.9, 33.7, "mountain"],
    ]
  },
  {
    name: "Myanmar",
    wiki: "Myanmar",
    cap: [19.7633, 96.0785],
    locs: [
      ["Naypyidaw", 19.7633, 96.0785, "capital"],
      ["Inle Lake", 20.5, 96.9, "water"],
      ["Shwedagon Pagoda", 16.8668, 96.2017, "sightseeing"],
      ["Mount Hkakabo Razi", 28.3, 98.1, "mountain"],
    ]
  },
  {
    name: "Namibia",
    wiki: "Namibia",
    cap: [-22.5597, 17.0832],
    locs: [
      ["Windhoek", -22.5597, 17.0832, "capital"],
      ["Etosha National Park", -18.8667, 16.3, "nature"],
      ["Skeleton Coast", -22.0, 13.5, "sightseeing"],
      ["Mount Brandberg", -21.85, 14.5833, "mountain"],
    ]
  },
  {
    name: "Nauru",
    wiki: "Nauru",
    cap: [-0.5477, 166.9209],
    locs: [
      ["Yaren", -0.5477, 166.9209, "capital"],
    ]
  },
  {
    name: "Nepal",
    wiki: "Nepal",
    cap: [27.7172, 85.3240],
    locs: [
      ["Kathmandu", 27.7172, 85.3240, "capital"],
      ["Langtang National Park", 28.2, 85.6, "nature"],
      ["Pashupatinath Temple", 27.7311, 85.3431, "sightseeing"],
      ["Mount Sagarmatha (Everest)", 27.9881, 86.9250, "mountain"],
    ]
  },
  {
    name: "Netherlands",
    wiki: "Netherlands",
    cap: [52.3676, 4.9041],
    locs: [
      ["Amsterdam", 52.3676, 4.9041, "capital"],
      ["Hoge Veluwe National Park", 52.1, 5.8, "nature"],
      ["Anne Frank House", 52.3753, 4.8840, "sightseeing"],
      ["Mount Vaalserberg", 50.85, 6.0083, "mountain"],
    ]
  },
  {
    name: "New Zealand",
    wiki: "New_Zealand",
    cap: [-41.2865, 174.7762],
    locs: [
      ["Wellington", -41.2865, 174.7762, "capital"],
      ["Tongariro National Park", -38.7, 175.5, "nature"],
      ["Milford Sound", -44.6719, -168.0, "sightseeing"],
      ["Mount Cook", -43.5933, 170.1833, "mountain"],
    ]
  },
  {
    name: "Nicaragua",
    wiki: "Nicaragua",
    cap: [12.1364, -86.2514],
    locs: [
      ["Managua", 12.1364, -86.2514, "capital"],
      ["Indio Maíz Biological Reserve", 10.9, -84.3, "nature"],
      ["Mount San Cristóbal", 12.7, -87.1, "mountain"],
    ]
  },
  {
    name: "Niger",
    wiki: "Niger",
    cap: [13.5137, 2.1098],
    locs: [
      ["Niamey", 13.5137, 2.1098, "capital"],
      ["Air and Ténéré", 18.5000, 8.5000, "nature"],
    ]
  },
  {
    name: "Nigeria",
    wiki: "Nigeria",
    cap: [9.0579, 7.4951],
    locs: [
      ["Abuja", 9.0579, 7.4951, "capital"],
      ["Lagos", 6.5244, 3.3792, "city"],
      ["Cross-Sanaga-Bioko coastal forests", 5.0, 9.0, "nature"],
      ["Mount Chappal Waddi", 7.0667, 12.3, "mountain"],
    ]
  },
  {
    name: "North Korea",
    wiki: "North_Korea",
    cap: [39.0194, 125.7381],
    locs: [
      ["Pyongyang", 39.0194, 125.7381, "capital"],
      ["Mount Paektu", 41.9992, 128.0593, "mountain"],
    ]
  },
  {
    name: "North Macedonia",
    wiki: "North_Macedonia",
    cap: [41.9973, 21.4280],
    locs: [
      ["Skopje", 41.9973, 21.4280, "capital"],
      ["Pelister National Park", 41.1, 21.2, "nature"],
      ["Lake Ohrid", 41.15, 20.75, "water"],
      ["Mount Korab", 41.8669, 20.6633, "mountain"],
    ]
  },
  {
    name: "Norway",
    wiki: "Norway",
    cap: [59.9139, 10.7522],
    locs: [
      ["Oslo", 59.9139, 10.7522, "capital"],
      ["Svalbard", 78.0, 15.0, "nature"],
      ["Geirangerfjord", 62.1, 7.2, "sightseeing"],
      ["Mount Galdhøpiggen", 61.6367, 8.6150, "mountain"],
    ]
  },
  {
    name: "Oman",
    wiki: "Oman",
    cap: [23.5880, 58.3829],
    locs: [
      ["Muscat", 23.5880, 58.3829, "capital"],
      ["Musandam National Park", 26.2, 56.5, "nature"],
      ["Wadi Darbat", 23.8, 58.6, "sightseeing"],
      ["Mount Shams", 22.85, 57.1, "mountain"],
    ]
  },
  {
    name: "Pakistan",
    wiki: "Pakistan",
    cap: [33.6844, 73.0479],
    locs: [
      ["Islamabad", 33.6844, 73.0479, "capital"],
      ["Khunjerab National Park", 36.8, 75.4, "nature"],
      ["Mount K2", 35.8825, 76.5133, "mountain"],
    ]
  },
  {
    name: "Palau",
    wiki: "Palau",
    cap: [7.5149, 134.5825],
    locs: [
      ["Ngerulmud", 7.5149, 134.5825, "capital"],
      ["Belau National Museum", 7.3333, 134.4833, "sightseeing"],
    ]
  },
  {
    name: "Panama",
    wiki: "Panama",
    cap: [8.9936, -79.5197],
    locs: [
      ["Panama City", 8.9936, -79.5197, "capital"],
      ["La Amistad National Park", 9.0, -82.5, "nature"],
      ["Panama Canal", 9.0, -79.5, "sightseeing"],
      ["Mount Barú", 8.8167, -82.65, "mountain"],
    ]
  },
  {
    name: "Papua New Guinea",
    wiki: "Papua_New_Guinea",
    cap: [-9.4438, 147.1803],
    locs: [
      ["Port Moresby", -9.4438, 147.1803, "capital"],
      ["Varirata National Park", -9.4667, 147.3667, "nature"],
      ["Coral Triangle", -6.0, 130.0, "sightseeing"],
    ]
  },
  {
    name: "Paraguay",
    wiki: "Paraguay",
    cap: [-25.2867, -57.6470],
    locs: [
      ["Asunción", -25.2867, -57.6470, "capital"],
      ["Iguazú National Park", -26.5, -55.5, "nature"],
    ]
  },
  {
    name: "Peru",
    wiki: "Peru",
    cap: [-12.0464, -77.0428],
    locs: [
      ["Lima", -12.0464, -77.0428, "capital"],
      ["Manu National Park", -11.0, -71.0, "nature"],
      ["Amazon Rainforest", -6.0, -73.0, "sightseeing"],
      ["Mount Huascarán", -9.1197, -77.5994, "mountain"],
    ]
  },
  {
    name: "Philippines",
    wiki: "Philippines",
    cap: [14.5995, 120.9842],
    locs: [
      ["Manila", 14.5995, 120.9842, "capital"],
      ["Ifugao Rice Terraces", 16.75, 121.15, "nature"],
      ["Boracay Island", 11.9667, 121.9, "sightseeing"],
      ["Mount Apo", 6.9, 125.35, "mountain"],
    ]
  },
  {
    name: "Poland",
    wiki: "Poland",
    cap: [52.2297, 21.0122],
    locs: [
      ["Warsaw", 52.2297, 21.0122, "capital"],
      ["Białowieża National Park", 52.7, 23.8, "nature"],
      ["Tatra Mountains", 49.2, 19.8, "sightseeing"],
      ["Mount Rysy", 49.1989, 19.9908, "mountain"],
    ]
  },
  {
    name: "Portugal",
    wiki: "Portugal",
    cap: [38.7223, -9.1393],
    locs: [
      ["Lisbon", 38.7223, -9.1393, "capital"],
      ["Peneda-Gerês National Park", 41.7, -8.2, "nature"],
      ["Belém Tower", 38.6621, -9.2155, "sightseeing"],
      ["Mount Torre", 40.1667, -8.3333, "mountain"],
    ]
  },
  {
    name: "Qatar",
    wiki: "Qatar",
    cap: [25.2854, 51.5310],
    locs: [
      ["Doha", 25.2854, 51.5310, "capital"],
      ["Khor al Adaid", 24.5, 51.2, "nature"],
    ]
  },
  {
    name: "Romania",
    wiki: "Romania",
    cap: [44.4268, 26.1025],
    locs: [
      ["Bucharest", 44.4268, 26.1025, "capital"],
      ["Danube Delta National Park", 45.2, 29.0, "nature"],
      ["Bran Castle", 45.5122, 25.3667, "sightseeing"],
      ["Mount Moldoveanu", 45.3667, 24.6333, "mountain"],
    ]
  },
  {
    name: "Russia",
    wiki: "Russia",
    cap: [55.7558, 37.6173],
    locs: [
      ["Moscow", 55.7558, 37.6173, "capital"],
      ["Kamchatka National Park", 56.0, 159.0, "nature"],
      ["Hermitage Museum", 59.9311, 30.3036, "sightseeing"],
      ["Mount Elbrus", 43.3556, 42.4444, "mountain"],
    ]
  },
  {
    name: "Rwanda",
    wiki: "Rwanda",
    cap: [-1.9403, 29.8739],
    locs: [
      ["Kigali", -1.9403, 29.8739, "capital"],
      ["Volcanoes National Park", -1.5, 29.5, "nature"],
      ["Mount Karisimbi", -1.95, 29.5833, "mountain"],
    ]
  },
  {
    name: "Saint Kitts and Nevis",
    wiki: "Saint_Kitts_and_Nevis",
    cap: [17.3026, -62.7177],
    locs: [
      ["Basseterre", 17.3026, -62.7177, "capital"],
    ]
  },
  {
    name: "Saint Lucia",
    wiki: "Saint_Lucia",
    cap: [14.0101, -60.9875],
    locs: [
      ["Castries", 14.0101, -60.9875, "capital"],
    ]
  },
  {
    name: "Saint Vincent and the Grenadines",
    wiki: "Saint_Vincent_and_the_Grenadines",
    cap: [13.1600, -61.2248],
    locs: [
      ["Kingstown", 13.1600, -61.2248, "capital"],
      ["La Soufrière Volcano", 13.3333, -61.1833, "sightseeing"],
    ]
  },
  {
    name: "Samoa",
    wiki: "Samoa",
    cap: [-13.8506, -171.7513],
    locs: [
      ["Apia", -13.8506, -171.7513, "capital"],
    ]
  },
  {
    name: "San Marino",
    wiki: "San_Marino",
    cap: [43.9424, 12.4578],
    locs: [
      ["San Marino City", 43.9424, 12.4578, "capital"],
    ]
  },
  {
    name: "São Tomé and Príncipe",
    wiki: "São_Tomé_and_Príncipe",
    cap: [0.3365, 6.7273],
    locs: [
      ["São Tomé", 0.3365, 6.7273, "capital"],
      ["Obo National Park", 1.5, 7.2, "nature"],
    ]
  },
  {
    name: "Saudi Arabia",
    wiki: "Saudi_Arabia",
    cap: [24.6877, 46.7219],
    locs: [
      ["Riyadh", 24.6877, 46.7219, "capital"],
      ["Asir National Park", 18.3, 42.5, "nature"],
      ["Kaaba", 21.4225, 39.8262, "sightseeing"],
      ["Mount Sawda", 18.95, 42.7, "mountain"],
    ]
  },
  {
    name: "Senegal",
    wiki: "Senegal",
    cap: [14.7167, -17.4677],
    locs: [
      ["Dakar", 14.7167, -17.4677, "capital"],
      ["Djoudj National Park", 16.25, -15.8333, "nature"],
    ]
  },
  {
    name: "Serbia",
    wiki: "Serbia",
    cap: [44.8176, 20.4633],
    locs: [
      ["Belgrade", 44.8176, 20.4633, "capital"],
      ["Kopaonik National Park", 43.8, 20.8, "nature"],
      ["Mount Midzor", 43.6167, 22.4167, "mountain"],
    ]
  },
  {
    name: "Seychelles",
    wiki: "Seychelles",
    cap: [-4.6191, 55.4513],
    locs: [
      ["Victoria", -4.6191, 55.4513, "capital"],
      ["Aldabra Atoll", -9.4, 46.4, "nature"],
    ]
  },
  {
    name: "Sierra Leone",
    wiki: "Sierra_Leone",
    cap: [8.4657, -13.2317],
    locs: [
      ["Freetown", 8.4657, -13.2317, "capital"],
      ["Outamba-Kilimi National Park", 9.5, -11.5, "nature"],
    ]
  },
  {
    name: "Singapore",
    wiki: "Singapore",
    cap: [1.3521, 103.8198],
    locs: [
      ["Singapore", 1.3521, 103.8198, "capital"],
      ["Gardens by the Bay", 1.2855, 103.8667, "sightseeing"],
    ]
  },
  {
    name: "Slovakia",
    wiki: "Slovakia",
    cap: [48.1486, 17.1077],
    locs: [
      ["Bratislava", 48.1486, 17.1077, "capital"],
      ["High Tatras National Park", 49.15, 20.15, "nature"],
      ["Dunajec River Gorge", 49.35, 20.3, "sightseeing"],
      ["Mount Gerlachov", 49.1673, 20.1167, "mountain"],
    ]
  },
  {
    name: "Slovenia",
    wiki: "Slovenia",
    cap: [46.0569, 14.5058],
    locs: [
      ["Ljubljana", 46.0569, 14.5058, "capital"],
      ["Triglav National Park", 46.4, 13.8, "nature"],
      ["Lake Bled", 46.3623, 14.1115, "water"],
      ["Mount Triglav", 46.3734, 13.8767, "mountain"],
    ]
  },
  {
    name: "Solomon Islands",
    wiki: "Solomon_Islands",
    cap: [-9.4456, 160.0327],
    locs: [
      ["Honiara", -9.4456, 160.0327, "capital"],
    ]
  },
  {
    name: "Somalia",
    wiki: "Somalia",
    cap: [2.0469, 45.3182],
    locs: [
      ["Mogadishu", 2.0469, 45.3182, "capital"],
      ["Daallo Mountains", 8.0, 44.0, "nature"],
    ]
  },
  {
    name: "South Africa",
    wiki: "South_Africa",
    cap: [-25.7479, 28.2293],
    locs: [
      ["Pretoria", -25.7479, 28.2293, "capital"],
      ["Kruger National Park", -23.5, 31.5, "nature"],
      ["Table Mountain", -33.9629, 18.3957, "sightseeing"],
      ["Mount Thabana Ntlenyana", -29.4, 28.5, "mountain"],
    ]
  },
  {
    name: "South Korea",
    wiki: "South_Korea",
    cap: [37.5665, 126.9780],
    locs: [
      ["Seoul", 37.5665, 126.9780, "capital"],
      ["Seoraksan National Park", 37.7333, 128.45, "nature"],
      ["Jeju Island", 33.3, 126.5, "sightseeing"],
      ["Mount Hallasan", 33.3608, 126.5331, "mountain"],
    ]
  },
  {
    name: "South Sudan",
    wiki: "South_Sudan",
    cap: [4.8594, 31.5713],
    locs: [
      ["Juba", 4.8594, 31.5713, "capital"],
      ["Boma National Park", 3.5, 32.0, "nature"],
    ]
  },
  {
    name: "Spain",
    wiki: "Spain",
    cap: [40.4168, -3.7038],
    locs: [
      ["Madrid", 40.4168, -3.7038, "capital"],
      ["Barcelona", 41.3851, 2.1734, "city"],
      ["Picos de Europa National Park", 43.1667, -4.8333, "nature"],
      ["Sagrada Familia", 41.4036, 2.1744, "sightseeing"],
      ["Mount Teide", 28.3721, -16.6420, "mountain"],
    ]
  },
  {
    name: "Sri Lanka",
    wiki: "Sri_Lanka",
    cap: [6.9008, 79.9013],
    locs: [
      ["Sri Jayawardenepura Kotte", 6.9008, 79.9013, "capital"],
      ["Horton Plains National Park", 6.8167, 80.75, "nature"],
      ["Galle Fort", 6.0342, 80.2169, "sightseeing"],
      ["Mount Pidurutalagala", 6.9333, 80.8, "mountain"],
    ]
  },
  {
    name: "Sudan",
    wiki: "Sudan",
    cap: [15.5007, 32.5599],
    locs: [
      ["Khartoum", 15.5007, 32.5599, "capital"],
      ["Nile Valley", 17.0, 33.0, "nature"],
    ]
  },
  {
    name: "Suriname",
    wiki: "Suriname",
    cap: [5.8520, -55.2038],
    locs: [
      ["Paramaribo", 5.8520, -55.2038, "capital"],
      ["Central Suriname Nature Reserve", 3.0, -56.0, "nature"],
    ]
  },
  {
    name: "Sweden",
    wiki: "Sweden",
    cap: [59.3293, 18.0686],
    locs: [
      ["Stockholm", 59.3293, 18.0686, "capital"],
      ["Sarek National Park", 67.4, 17.5, "nature"],
      ["Northern Lights", 68.0, 19.0, "sightseeing"],
      ["Mount Kebnekaise", 67.8878, 18.5592, "mountain"],
    ]
  },
  {
    name: "Switzerland",
    wiki: "Switzerland",
    cap: [46.9480, 7.4474],
    locs: [
      ["Bern", 46.9480, 7.4474, "capital"],
      ["Aletsch Glacier", 46.4, 8.0, "nature"],
      ["Matterhorn", 45.9763, 7.6589, "sightseeing"],
      ["Mount Dufour", 45.9553, 7.8743, "mountain"],
    ]
  },
  {
    name: "Syria",
    wiki: "Syria",
    cap: [33.5138, 36.2765],
    locs: [
      ["Damascus", 33.5138, 36.2765, "capital"],
      ["Palmyra", 34.5519, 38.2663, "sightseeing"],
    ]
  },
  {
    name: "Taiwan",
    wiki: "Taiwan",
    cap: [25.0330, 121.5654],
    locs: [
      ["Taipei", 25.0330, 121.5654, "capital"],
      ["Yushan National Park", 23.4, 120.9, "nature"],
      ["Sun Moon Lake", 23.8667, 120.9, "water"],
      ["Mount Yu Shan", 23.4691, 120.9575, "mountain"],
    ]
  },
  {
    name: "Tajikistan",
    wiki: "Tajikistan",
    cap: [38.5598, 68.7870],
    locs: [
      ["Dushanbe", 38.5598, 68.7870, "capital"],
      ["Khujarang National Park", 37.2, 71.5, "nature"],
      ["Mount Khan Tengri", 36.9, 72.0, "mountain"],
    ]
  },
  {
    name: "Tanzania",
    wiki: "Tanzania",
    cap: [-6.1630, 35.7516],
    locs: [
      ["Dodoma", -6.1630, 35.7516, "capital"],
      ["Serengeti National Park", -2.3333, 34.8333, "nature"],
      ["Great Rift Valley", -1.0, 36.0, "sightseeing"],
      ["Mount Kilimanjaro", -3.0674, 37.3556, "mountain"],
    ]
  },
  {
    name: "Thailand",
    wiki: "Thailand",
    cap: [13.7563, 100.5018],
    locs: [
      ["Bangkok", 13.7563, 100.5018, "capital"],
      ["Khao Yai National Park", 14.3, 101.4, "nature"],
      ["Floating Markets", 13.4, 100.0, "sightseeing"],
      ["Mount Doi Inthanon", 18.3603, 98.4841, "mountain"],
    ]
  },
  {
    name: "Timor-Leste",
    wiki: "East_Timor",
    cap: [-8.5569, 125.5603],
    locs: [
      ["Dili", -8.5569, 125.5603, "capital"],
      ["Nino Konis Santana National Park", -9.0, 124.2, "nature"],
    ]
  },
  {
    name: "Togo",
    wiki: "Togo",
    cap: [6.1375, 1.2123],
    locs: [
      ["Lomé", 6.1375, 1.2123, "capital"],
      ["Koutammakou", 9.4, 1.3, "nature"],
    ]
  },
  {
    name: "Tonga",
    wiki: "Tonga",
    cap: [-21.1393, -175.2046],
    locs: [
      ["Nukuʻalofa", -21.1393, -175.2046, "capital"],
    ]
  },
  {
    name: "Trinidad and Tobago",
    wiki: "Trinidad_and_Tobago",
    cap: [10.6918, -61.2225],
    locs: [
      ["Port of Spain", 10.6918, -61.2225, "capital"],
      ["Asa Wright Nature Centre", 10.5, -61.3, "nature"],
    ]
  },
  {
    name: "Tunisia",
    wiki: "Tunisia",
    cap: [36.8190, 10.1658],
    locs: [
      ["Tunis", 36.8190, 10.1658, "capital"],
      ["Djerba Island", 33.8, 11.0, "sightseeing"],
      ["Mount Chambi", 35.2, 9.1, "mountain"],
    ]
  },
  {
    name: "Turkey",
    wiki: "Turkey",
    cap: [39.9334, 32.8597],
    locs: [
      ["Ankara", 39.9334, 32.8597, "capital"],
      ["Istanbul", 41.0082, 28.9784, "city"],
      ["Göreme National Park", 38.6431, 34.8289, "nature"],
      ["Blue Mosque", 41.0054, 28.9768, "sightseeing"],
      ["Mount Ararat", 39.7, 44.3, "mountain"],
    ]
  },
  {
    name: "Turkmenistan",
    wiki: "Turkmenistan",
    cap: [37.9601, 58.3261],
    locs: [
      ["Ashgabat", 37.9601, 58.3261, "capital"],
      ["Yangykala Canyon", 38.8, 62.2, "nature"],
      ["Mount Kugitang", 37.15, 65.25, "mountain"],
    ]
  },
  {
    name: "Tuvalu",
    wiki: "Tuvalu",
    cap: [-8.5200, 179.1980],
    locs: [
      ["Funafuti", -8.5200, 179.1980, "capital"],
    ]
  },
  {
    name: "Uganda",
    wiki: "Uganda",
    cap: [0.3476, 32.5825],
    locs: [
      ["Kampala", 0.3476, 32.5825, "capital"],
      ["Queen Elizabeth National Park", -0.4, 30.0, "nature"],
      ["Mount Rwenzori", 0.4, 29.9, "mountain"],
    ]
  },
  {
    name: "Ukraine",
    wiki: "Ukraine",
    cap: [50.4501, 30.5234],
    locs: [
      ["Kyiv", 50.4501, 30.5234, "capital"],
      ["Carpathian Mountains", 48.5, 24.0, "nature"],
      ["Mount Hoverla", 48.1567, 24.6658, "mountain"],
    ]
  },
  {
    name: "United Arab Emirates",
    wiki: "United_Arab_Emirates",
    cap: [24.4539, 54.3773],
    locs: [
      ["Abu Dhabi", 24.4539, 54.3773, "capital"],
      ["Hajar Mountains", 24.2, 55.8, "nature"],
      ["Burj Khalifa", 25.1972, 55.2744, "sightseeing"],
    ]
  },
  {
    name: "United Kingdom",
    wiki: "United_Kingdom",
    cap: [51.5074, -0.1278],
    locs: [
      ["London", 51.5074, -0.1278, "capital"],
      ["Scottish Highlands", 57.3, -4.5, "nature"],
      ["Big Ben", 51.4994, -0.1246, "sightseeing"],
      ["Mount Ben Nevis", 56.7960, -5.0039, "mountain"],
    ]
  },
  {
    name: "United States",
    wiki: "United_States",
    cap: [38.9072, -77.0369],
    locs: [
      ["Washington, D.C.", 38.9072, -77.0369, "capital"],
      ["New York City", 40.7128, -74.0060, "city"],
      ["Los Angeles", 34.0522, -118.2437, "city"],
      ["Yellowstone National Park", 44.4280, -110.5885, "nature"],
      ["Statue of Liberty", 40.6892, -74.0445, "sightseeing"],
      ["Mount Denali", 63.0688, -151.0093, "mountain"],
    ]
  },
  {
    name: "Uruguay",
    wiki: "Uruguay",
    cap: [-34.9011, -56.1915],
    locs: [
      ["Montevideo", -34.9011, -56.1915, "capital"],
      ["Esteros de Ibera", -31.8, -56.8, "nature"],
    ]
  },
  {
    name: "Uzbekistan",
    wiki: "Uzbekistan",
    cap: [41.2995, 69.2401],
    locs: [
      ["Tashkent", 41.2995, 69.2401, "capital"],
      ["Aydarkul Lake", 40.2, 68.5, "water"],
      ["Mount Chimgan", 41.5, 69.2, "mountain"],
    ]
  },
  {
    name: "Vanuatu",
    wiki: "Vanuatu",
    cap: [-17.7333, 168.3167],
    locs: [
      ["Port Vila", -17.7333, 168.3167, "capital"],
      ["Mount Yasur", -19.5206, 169.4425, "sightseeing"],
    ]
  },
  {
    name: "Venezuela",
    wiki: "Venezuela",
    cap: [10.4806, -66.9036],
    locs: [
      ["Caracas", 10.4806, -66.9036, "capital"],
      ["Canaima National Park", 5.9, -61.4, "nature"],
      ["Angel Falls", 5.9679, -62.5889, "sightseeing"],
      ["Mount Roraima", 5.8, -60.8, "mountain"],
    ]
  },
  {
    name: "Vietnam",
    wiki: "Vietnam",
    cap: [21.0285, 105.8542],
    locs: [
      ["Hanoi", 21.0285, 105.8542, "capital"],
      ["Cat Ba National Park", 20.8, 106.9, "nature"],
      ["Ha Long Bay", 20.9101, 107.1839, "sightseeing"],
      ["Mount Fansipan", 22.3075, 103.8440, "mountain"],
    ]
  },
  {
    name: "Yemen",
    wiki: "Yemen",
    cap: [15.5527, 48.5164],
    locs: [
      ["Sana'a", 15.3694, 44.1910, "capital"],
      ["Socotra Island", 12.5, 54.3, "nature"],
      ["Mount Jabal Hadhur", 15.9, 48.6, "mountain"],
    ]
  },
  {
    name: "Zambia",
    wiki: "Zambia",
    cap: [-15.3875, 28.3228],
    locs: [
      ["Lusaka", -15.3875, 28.3228, "capital"],
      ["South Luangwa National Park", -13.5, 31.8, "nature"],
      ["Victoria Falls", -17.9243, 25.8572, "sightseeing"],
    ]
  },
  {
    name: "Zimbabwe",
    wiki: "Zimbabwe",
    cap: [-17.8252, 31.0335],
    locs: [
      ["Harare", -17.8252, 31.0335, "capital"],
      ["Hwange National Park", -18.5, 26.5, "nature"],
      ["Victoria Falls", -17.9243, 25.8572, "sightseeing"],
      ["Mount Nyangani", -17.5, 32.75, "mountain"],
    ]
  },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const toRad = d => (d * Math.PI) / 180;
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
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

function getPuzzleForDate(dateStr) {
  const hash = Array.from(dateStr).reduce((h, c) => ((h << 5) - h) + c.charCodeAt(0), 0);
  return Math.abs(hash) % COUNTRIES.length;
}

function getDailyPuzzle() {
  const now = new Date();
  const utcDateStr = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
  const countryIdx = getPuzzleForDate(utcDateStr);
  const country = COUNTRIES[countryIdx];
  // Use date hash to pick location deterministically
  const locIdx = getPuzzleForDate(utcDateStr + "loc") % country.locs.length;
  const loc = country.locs[locIdx];
  return { country, loc, dateStr: utcDateStr };
}

// ─── WIKIPEDIA CAROUSEL ────────────────────────────────────────────────────────
function useWikiImages(locationName) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setImages([]);

    async function fetchImages() {
      try {
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(locationName)}&srlimit=1&format=json&origin=*`;
        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();
        const results = searchData?.query?.search;
        if (!results?.length) { if (!cancelled) setLoading(false); return; }

        const title = results[0].title;
        const imagesUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=images&format=json&origin=*`;
        const imagesRes = await fetch(imagesUrl);
        const imagesData = await imagesRes.json();
        const pages = imagesData?.query?.pages;
        const page = pages ? Object.values(pages)[0] : null;
        const images_list = page?.images || [];

        const imageUrls = [];
        for (const img of images_list.slice(0, 10)) {
          const imgTitle = img.title;
          if (!/\.svg$/i.test(imgTitle)) {
            const imgInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(imgTitle)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
            const imgInfoRes = await fetch(imgInfoUrl);
            const imgInfoData = await imgInfoRes.json();
            const imgPages = imgInfoData?.query?.pages;
            const imgPage = imgPages ? Object.values(imgPages)[0] : null;
            const url = imgPage?.imageinfo?.[0]?.url;
            if (url && imageUrls.length < 3) imageUrls.push(url);
            if (imageUrls.length === 3) break;
          }
        }

        if (!cancelled) { setImages(imageUrls); setLoading(false); }
      } catch (e) {
        if (!cancelled) { setLoading(false); }
      }
    }

    fetchImages();
    return () => { cancelled = true; };
  }, [locationName]);

  return { images, loading };
}

// ─── IMAGE CAROUSEL ────────────────────────────────────────────────────────────
function ImageCarousel({ images, loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) {
    return (
      <div style={{
        width: "100%", height: 220, background: "#111118",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 8
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          border: "3px solid #333", borderTopColor: "#6366f1",
          animation: "spin 0.8s linear infinite"
        }} />
        <span style={{ color: "#444", fontSize: 13 }}>Loading photos…</span>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div style={{
        width: "100%", height: 220, background: "#111118",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48
      }}>
        🌍
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%", height: 220, background: "#111118",
        position: "relative", overflow: "hidden", display: "flex",
        alignItems: "center", justifyContent: "center"
      }}
      onTouchStart={(e) => {
        const startX = e.touches[0].clientX;
        const handleTouchEnd = (e2) => {
          const endX = e2.changedTouches[0].clientX;
          if (startX - endX > 50) setCurrentIndex((i) => (i + 1) % images.length);
          else if (endX - startX > 50) setCurrentIndex((i) => (i - 1 + images.length) % images.length);
          document.removeEventListener("touchend", handleTouchEnd);
        };
        document.addEventListener("touchend", handleTouchEnd);
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`Photo ${currentIndex + 1}`}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div style={{
        position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 6
      }}>
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: 6, height: 6, borderRadius: "50%",
              background: i === currentIndex ? "#fff" : "rgba(255,255,255,0.4)"
            }}
          />
        ))}
      </div>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 40,
        background: "linear-gradient(transparent, #1e1e2e)"
      }} />
    </div>
  );
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
export default function WITWorld() {
  const [puzzle, setPuzzle] = useState(() => {
    try {
      const now = new Date();
      const today = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
      const stored = localStorage.getItem("witworld_puzzle_date");
      if (stored === today) {
        const p = localStorage.getItem("witworld_puzzle");
        if (p) return JSON.parse(p);
      }
      const newPuzzle = getDailyPuzzle();
      localStorage.setItem("witworld_puzzle_date", today);
      localStorage.setItem("witworld_puzzle", JSON.stringify(newPuzzle));
      return newPuzzle;
    } catch {
      return getDailyPuzzle();
    }
  });
  const [guesses, setGuesses] = useState(Array(6).fill(""));
  const [submitted, setSubmitted] = useState(Array(6).fill(false));
  const [currentRow, setCurrentRow] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [copied, setCopied] = useState(false);
  const { country, loc } = puzzle;
  const { images, loading: imgLoading } = useWikiImages(loc[0]);

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

  const [copied, setCopied] = useState(false);

  function shareResults() {
    const guessCount = submitted.findIndex(s => !s);
    const finalCount = guessCount === -1 ? 6 : guessCount + 1;
    const text = `Where In The World? ${finalCount}/6 🎯\nPlay: https://witworld.vercel.app`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => alert(text));
  }

  const TYPE_LABELS = { capital: "🏛️ Capital", former: "🕰️ Former", city: "🌆 City", unicode: "🏛️ UNESCO", nature: "🌳 Nature", sightseeing: "🎭 Sightseeing", water: "💧 Lake", mountain: "⛰️ Mountain" };
  const TYPE_COLORS = { capital: "#4ade80", former: "#fb923c", city: "#60a5fa", unicode: "#e879f9", nature: "#10b981", sightseeing: "#f59e0b", water: "#0ea5e9", mountain: "#8b5cf6" };

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
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 900, letterSpacing: -1, color: "#f8f8f2", marginBottom: 4 }}>
          Where In The World?
        </h1>
        <p style={{ margin: 0, color: "#666", fontSize: 13 }}>
          Guess the country
        </p>
      </div>

      {/* Location card */}
      <div style={{
        background: "linear-gradient(135deg, #1e1e2e, #16162a)",
        border: `1px solid ${typeColor}44`, borderRadius: 16,
        overflow: "hidden", marginBottom: 28, width: "100%", maxWidth: 520,
        boxShadow: `0 0 32px ${typeColor}22`
      }}>
        <ImageCarousel images={images} loading={imgLoading} />
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
            Which country is this in?
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
              <div style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                background: isCorrect ? "#4ade80" : isWrong ? "#f87171" : isActive ? "#6366f1" : "#2a2a3e",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#fff"
              }}>
                {i + 1}
              </div>

              <SearchDropdown
                value={guesses[i]}
                onChange={v => { const g = [...guesses]; g[i] = v; setGuesses(g); }}
                disabled={!isActive}
                placeholder={isActive ? "Select…" : submitted[i] ? guesses[i] || "—" : "—"}
              />

              {isActive && (
                <button
                  onClick={() => handleGuess(i)}
                  disabled={!guesses[i]}
                  style={{
                    padding: "10px 16px", borderRadius: 8, border: "none",
                    background: guesses[i] ? "#6366f1" : "#2a2a3e",
                    color: "#fff", fontWeight: 700, fontSize: 13,
                    cursor: guesses[i] ? "pointer" : "not-allowed", flexShrink: 0,
                  }}
                >
                  Guess
                </button>
              )}

              {hint && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 5, flexShrink: 0,
                  background: "#1e1e2e", border: "1px solid #333", borderRadius: 8,
                  padding: "6px 10px", fontSize: 12, color: "#fb923c", minWidth: 0
                }}>
                  <span>
                    {hint.dir === "N" ? "⬆️" : hint.dir === "S" ? "⬇️" : hint.dir === "E" ? "➡️" : hint.dir === "W" ? "⬅️" :
                     hint.dir === "NE" ? "↗️" : hint.dir === "NW" ? "↖️" : hint.dir === "SE" ? "↘️" : "↙️"}
                  </span>
                  <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{hint.dist}km</span>
                </div>
              )}

              {isCorrect && (
                <div style={{
                  flexShrink: 0, background: "#4ade8022", border: "1px solid #4ade80",
                  borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#4ade80", fontWeight: 700
                }}>✓</div>
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
              href={`https://simple.wikipedia.org/wiki/${loc[0].replace(/\s+/g, '_')}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: "10px 18px", borderRadius: 8,
                background: "#1d4ed8", color: "#fff", textDecoration: "none",
                fontWeight: 700, fontSize: 13
              }}
            >
              📖 Learn about {loc[0]}
            </a>
            <button
              onClick={() => shareResults()}
              style={{
                padding: "10px 18px", borderRadius: 8,
                background: copied ? "#059669" : "#10b981", color: "#fff", border: "none",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                transition: "background 0.3s"
              }}
            >
              {copied ? "✓ Copied!" : "📤 Share"}
            </button>
          </div>
        </div>
      )}

      {/* Come back tomorrow message */}
      {(won || lost) && (
        <div style={{
          marginTop: 16, textAlign: "center", color: "#666", fontSize: 13
        }}>
          Come back tomorrow. New game every day.
        </div>
      )}
    </div>
  );
}
