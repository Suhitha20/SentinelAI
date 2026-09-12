/**
 * SENTINEL AI — Disaster Response Ground Truth Dataset
 * Region: Tamil Nadu State Disaster Management Network (38 Districts)
 */

window.SENTINEL_DATA = {
  // Pre-configured User Profiles
  users: {
    official: {
      email: "officer.raman@tnsdma.gov.in",
      password: "EmergencyAdmin@2026",
      dob: "1982-06-15",
      name: "Commander V. Raman, IAS",
      designation: "District Disaster Control Officer / Incident Commander",
      officialId: "TNSDMA-COV-0941",
      role: "official",
      assignedDistrict: "Coimbatore"
    },
    volunteer: {
      email: "volunteer.kavitha@tnvolunteers.org",
      password: "VolunteerPass@2026",
      dob: "1998-11-23",
      name: "Kavitha Sundaram",
      designation: "Sector 4 Emergency Response Volunteer Lead",
      officialId: "TNV-VOL-8821",
      role: "volunteer",
      assignedDistrict: "Coimbatore"
    }
  },

  // ALL 38 DISTRICTS OF TAMIL NADU
  tamilNaduDistricts: [
    { id: "Ariyalur", name: "Ariyalur", coords: [11.1401, 79.0786], temp: 29.2, weather: "Scattered Showers", rainRate: "4.2 mm/hr", humidity: 76, risk: "LOW", reservoirs: ["Marudaiyaru Basin"], shelters: 14, population: "754,894" },
    { id: "Chengalpattu", name: "Chengalpattu", coords: [12.6819, 79.9836], temp: 30.5, weather: "Heavy Rain / Coastal Inflow", rainRate: "18.5 mm/hr", humidity: 88, risk: "HIGH", reservoirs: ["Palar River Estuary"], shelters: 38, population: "2,556,244" },
    { id: "Chennai", name: "Chennai", coords: [13.0827, 80.2707], temp: 29.8, weather: "Torrential Inundation Warning", rainRate: "34.0 mm/hr", humidity: 92, risk: "CRITICAL", reservoirs: ["Chembarambakkam Lake", "Poondi Reservoir", "Red Hills"], shelters: 85, population: "7,088,000" },
    { id: "Coimbatore", name: "Coimbatore", coords: [11.0168, 76.9558], temp: 24.6, weather: "Heavy Inflow / Monsoon Active", rainRate: "28.4 mm/hr", humidity: 89, risk: "HIGH", reservoirs: ["Siruvani Reservoir", "Noyyal River Basin", "Aliyar Dam"], shelters: 42, population: "3,458,045" },
    { id: "Cuddalore", name: "Cuddalore", coords: [11.7480, 79.7714], temp: 28.9, weather: "Coastal Surge Alert", rainRate: "22.1 mm/hr", humidity: 91, risk: "CRITICAL", reservoirs: ["Gadilam River", "Pennaiyar River"], shelters: 56, population: "2,605,914" },
    { id: "Dharmapuri", name: "Dharmapuri", coords: [12.1211, 78.1582], temp: 27.4, weather: "Moderate Rain", rainRate: "8.6 mm/hr", humidity: 74, risk: "MEDIUM", reservoirs: ["Vaniyar Dam", "Thoppaiyar Dam"], shelters: 18, population: "1,506,843" },
    { id: "Dindigul", name: "Dindigul", coords: [10.3673, 77.9803], temp: 26.8, weather: "Heavy Runoff from Hills", rainRate: "16.4 mm/hr", humidity: 82, risk: "HIGH", reservoirs: ["Kamarajar Sagar Dam", "Parappalar Dam"], shelters: 26, population: "2,159,775" },
    { id: "Erode", name: "Erode", coords: [11.3410, 77.7172], temp: 26.1, weather: "Dam Discharge Inflow", rainRate: "19.2 mm/hr", humidity: 85, risk: "HIGH", reservoirs: ["Bhavani Sagar Dam", "Cauvery Confluence"], shelters: 34, population: "2,251,744" },
    { id: "Kallakurichi", name: "Kallakurichi", coords: [11.7384, 78.9639], temp: 28.1, weather: "Passing Storms", rainRate: "9.5 mm/hr", humidity: 79, risk: "MEDIUM", reservoirs: ["Gomukhi Dam", "Manimuktha Dam"], shelters: 19, population: "1,377,883" },
    { id: "Kancheepuram", name: "Kancheepuram", coords: [12.8342, 79.7036], temp: 29.4, weather: "Lake Overflow Warning", rainRate: "21.0 mm/hr", humidity: 87, risk: "HIGH", reservoirs: ["Vegavathi River", "Madurantakam Lake"], shelters: 32, population: "1,650,000" },
    { id: "Kanyakumari", name: "Kanyakumari", coords: [8.0883, 77.5385], temp: 27.9, weather: "High Sea Swell Alert", rainRate: "14.8 mm/hr", humidity: 86, risk: "HIGH", reservoirs: ["Pechiparai Dam", "Perunchani Dam"], shelters: 40, population: "1,870,374" },
    { id: "Karur", name: "Karur", coords: [10.9601, 78.0766], temp: 30.1, weather: "River Spate Alert", rainRate: "11.2 mm/hr", humidity: 78, risk: "MEDIUM", reservoirs: ["Amaravathi River Confluence", "Mayanur Barrage"], shelters: 21, population: "1,064,493" },
    { id: "Krishnagiri", name: "Krishnagiri", coords: [12.5186, 78.2137], temp: 25.8, weather: "Moderate Showers", rainRate: "7.8 mm/hr", humidity: 75, risk: "MEDIUM", reservoirs: ["Krishnagiri Reservoir Project (KRP Dam)"], shelters: 24, population: "1,879,809" },
    { id: "Madurai", name: "Madurai", coords: [9.9252, 78.1198], temp: 28.5, weather: "Vaigai Overflow Warning", rainRate: "15.6 mm/hr", humidity: 80, risk: "HIGH", reservoirs: ["Vaigai River Bed", "Sathiyar Dam"], shelters: 45, population: "3,038,252" },
    { id: "Mayiladuthurai", name: "Mayiladuthurai", coords: [11.1075, 79.6524], temp: 29.0, weather: "Delta Coastal Alert", rainRate: "23.4 mm/hr", humidity: 90, risk: "CRITICAL", reservoirs: ["Cauvery Delta Tail-End"], shelters: 30, population: "918,356" },
    { id: "Nagapattinam", name: "Nagapattinam", coords: [10.7672, 79.8449], temp: 28.7, weather: "Cyclone Warning Phase 2", rainRate: "26.5 mm/hr", humidity: 93, risk: "CRITICAL", reservoirs: ["Vettar River", "Vedaranyam Canal"], shelters: 48, population: "1,614,069" },
    { id: "Namakkal", name: "Namakkal", coords: [11.2189, 78.1674], temp: 27.2, weather: "Moderate Runoff", rainRate: "6.9 mm/hr", humidity: 72, risk: "LOW", reservoirs: ["Cauvery Channel Left Bank"], shelters: 17, population: "1,726,601" },
    { id: "Nilgiris", name: "Nilgiris", coords: [11.4102, 76.6950], temp: 15.2, weather: "Landslide & Flash Flood Warning", rainRate: "42.5 mm/hr", humidity: 96, risk: "CRITICAL", reservoirs: ["Pykara Dam", "Avalanche Lake", "Emerald Dam"], shelters: 36, population: "735,394" },
    { id: "Perambalur", name: "Perambalur", coords: [11.2342, 78.8803], temp: 29.6, weather: "Light Showers", rainRate: "3.5 mm/hr", humidity: 70, risk: "LOW", reservoirs: ["Chinnar Reservoir"], shelters: 12, population: "565,223" },
    { id: "Pudukkottai", name: "Pudukkottai", coords: [10.3797, 78.8208], temp: 29.1, weather: "Passing Rain Band", rainRate: "8.1 mm/hr", humidity: 78, risk: "MEDIUM", reservoirs: ["Vellar Basin Tanks"], shelters: 22, population: "1,618,345" },
    { id: "Ramanathapuram", name: "Ramanathapuram", coords: [9.3639, 78.8395], temp: 30.2, weather: "Coastal Wind Surge", rainRate: "12.0 mm/hr", humidity: 84, risk: "HIGH", reservoirs: ["Gundar River Estuary", "Big Tank"], shelters: 35, population: "1,353,445" },
    { id: "Ranipet", name: "Ranipet", coords: [12.9272, 79.3330], temp: 28.9, weather: "Palar Runoff Inflow", rainRate: "13.5 mm/hr", humidity: 81, risk: "MEDIUM", reservoirs: ["Palar Anicut"], shelters: 20, population: "1,210,277" },
    { id: "Salem", name: "Salem", coords: [11.6643, 78.1460], temp: 26.5, weather: "Dam Discharge Influx", rainRate: "17.0 mm/hr", humidity: 83, risk: "HIGH", reservoirs: ["Mettur Dam (Stanley Reservoir)"], shelters: 40, population: "3,482,056" },
    { id: "Sivaganga", name: "Sivaganga", coords: [9.8433, 78.4809], temp: 29.3, weather: "Moderate Cloud Cover", rainRate: "5.4 mm/hr", humidity: 76, risk: "LOW", reservoirs: ["Vaigai Canal Feeders"], shelters: 19, population: "1,339,101" },
    { id: "Tenkasi", name: "Tenkasi", coords: [8.9594, 77.3150], temp: 24.8, weather: "Ghats Flash Flood Alert", rainRate: "31.2 mm/hr", humidity: 92, risk: "CRITICAL", reservoirs: ["Karuppanathi Dam", "Adavinainar Dam"], shelters: 28, population: "1,407,627" },
    { id: "Thanjavur", name: "Thanjavur", coords: [10.7870, 79.1378], temp: 28.4, weather: "Delta Canal Full Crest", rainRate: "19.8 mm/hr", humidity: 89, risk: "HIGH", reservoirs: ["Grand Anicut (Kallanai)", "Vennar Basin"], shelters: 46, population: "2,405,890" },
    { id: "Theni", name: "Theni", coords: [10.0104, 77.4768], temp: 24.2, weather: "Mullaperiyar Discharge Alert", rainRate: "29.6 mm/hr", humidity: 91, risk: "CRITICAL", reservoirs: ["Vaigai Dam", "Manjalar Dam", "Sothuparai Dam"], shelters: 31, population: "1,245,920" },
    { id: "Thoothukudi", name: "Thoothukudi", coords: [8.7642, 78.1348], temp: 29.7, weather: "Port Tidal Surge Warning", rainRate: "20.4 mm/hr", humidity: 89, risk: "HIGH", reservoirs: ["Thamirabarani Estuary"], shelters: 41, population: "1,750,176" },
    { id: "Tiruchirappalli", name: "Tiruchirappalli", coords: [10.7905, 78.7047], temp: 28.0, weather: "Cauvery Cresting at Mukkombu", rainRate: "18.3 mm/hr", humidity: 86, risk: "HIGH", reservoirs: ["Upper Anicut (Mukkombu)", "Cauvery River"], shelters: 38, population: "2,722,290" },
    { id: "Tirunelveli", name: "Tirunelveli", coords: [8.7139, 77.7567], temp: 27.5, weather: "Thamirabarani Overflow Warning", rainRate: "27.8 mm/hr", humidity: 90, risk: "CRITICAL", reservoirs: ["Manimuthar Dam", "Papanasam Dam"], shelters: 44, population: "1,665,253" },
    { id: "Tirupathur", name: "Tirupathur", coords: [12.4925, 78.5678], temp: 27.8, weather: "Moderate Rain", rainRate: "6.8 mm/hr", humidity: 75, risk: "LOW", reservoirs: ["Yelagiri Foothill Tanks"], shelters: 16, population: "1,111,812" },
    { id: "Tiruppur", name: "Tiruppur", coords: [11.1085, 77.3411], temp: 25.5, weather: "Noyyal Downstream Flash Flood", rainRate: "22.6 mm/hr", humidity: 87, risk: "HIGH", reservoirs: ["Amaravathi Dam Outflow", "Nanjarayan Tank"], shelters: 33, population: "2,479,052" },
    { id: "Tiruvallur", name: "Tiruvallur", coords: [13.1432, 79.9082], temp: 29.5, weather: "Kosasthalaiyar Flood Sluices Open", rainRate: "25.2 mm/hr", humidity: 91, risk: "CRITICAL", reservoirs: ["Poondi Reservoir", "Kosasthalaiyar River"], shelters: 42, population: "3,728,104" },
    { id: "Tiruvannamalai", name: "Tiruvannamalai", coords: [12.2253, 79.0747], temp: 28.3, weather: "Sathanur Dam Full Level", rainRate: "16.1 mm/hr", humidity: 82, risk: "HIGH", reservoirs: ["Sathanur Dam"], shelters: 27, population: "2,464,875" },
    { id: "Tiruvarur", name: "Tiruvarur", coords: [10.7725, 79.6365], temp: 28.8, weather: "Delta Inundation Alert", rainRate: "21.9 mm/hr", humidity: 90, risk: "HIGH", reservoirs: ["Vennar River", "Pamaniyar River"], shelters: 32, population: "1,264,277" },
    { id: "Vellore", name: "Vellore", coords: [12.9165, 79.1325], temp: 28.7, weather: "Palar High Discharge", rainRate: "14.2 mm/hr", humidity: 80, risk: "MEDIUM", reservoirs: ["Otteri Lake", "Mordhana Dam"], shelters: 25, population: "1,614,242" },
    { id: "Viluppuram", name: "Viluppuram", coords: [11.9401, 79.4861], temp: 29.0, weather: "Thenpennai River Overflow", rainRate: "19.4 mm/hr", humidity: 87, risk: "HIGH", reservoirs: ["Veedur Dam", "Gingee River Basin"], shelters: 31, population: "2,093,003" },
    { id: "Virudhunagar", name: "Virudhunagar", coords: [9.5872, 77.9514], temp: 29.8, weather: "Moderate Runoff", rainRate: "8.4 mm/hr", humidity: 77, risk: "MEDIUM", reservoirs: ["Kullursandai Reservoir", "Pilavakkal Dam"], shelters: 20, population: "1,942,288" }
  ],

  // EMERGENCY SMS TEMPLATES FOR GPS-FENCED BROADCAST (Dual Language)
  smsTemplates: {
    pre_disaster: {
      title: "Pre-Disaster Early Warning Alert",
      badge: "badge-warning",
      english: "EMERGENCY ALERT [TNSDMA]: Water level rising rapidly in your area. Flash flood warning active. Prepare essential items, medications, and documents. Follow official evacuation updates on SENTINEL. Emergency Helpline: 1077 / 112.",
      tamil: "அவசர எச்சரிக்கை [TNSDMA]: உங்கள் பகுதியில் நீர்மட்டம் வேகமாக உயர்கிறது. உடனடி வெள்ள எச்சரிக்கை விடப்பட்டுள்ளது. அத்தியாவசிய மருந்துகள் மற்றும் ஆவணங்களை தயார் நிலையில் வைக்கவும். அவசர உதவி எண்: 1077 / 112."
    },
    post_disaster: {
      title: "Immediate Disaster Evacuation Order",
      badge: "badge-critical",
      english: "URGENT EVACUATION ORDER [TNSDMA]: High flood risk in your GPS zone. Immediate evacuation ordered to designated relief shelters via verified safe corridors. Do NOT use flooded low-level roads. NDRF teams active. Helpline: 1077 / 112.",
      tamil: "உடனடி வெளியேற்ற உத்தரவு [TNSDMA]: உங்கள் ஜிபிஎஸ் பகுதியில் கடுமையான வெள்ள அபாயம். உடனடியாக பாதுகாப்பான நிவாரண முகாம்களுக்கு செல்லவும். நீரில் மூழ்கிய தாழ்வான சாலைகளை பயன்படுத்த வேண்டாம். உதவி எண்: 1077 / 112."
    }
  },

  // Retain existing detailed Coimbatore response operational data
  kpis: {
    activeIncidents: 7,
    peopleAtRisk: 2481,
    criticalZones: 4,
    criticalInfrastructure: 12,
    activeRescueTeams: 18
  },

  zones: [
    {
      id: "B2",
      name: "Zone B2 — Singanallur Basin",
      riskScore: 81,
      previousRiskScore: 62,
      riskLevel: "HIGH",
      priority: "P1",
      peopleAtRisk: 1240,
      facilities: 3,
      facilityList: ["District General Hospital (Annex)", "Electric Substation B2", "St. Jude Secondary School"],
      mainDriver: "Rapid water level rise from Noyyal feeder overflow",
      statusReason: "High water risk + Large exposed population + Hospital nearby + Limited road access",
      recommendedActions: [
        "Deploy 2 rescue teams immediately",
        "Open Shelter S2 & dispatch transport buses",
        "Enforce Route R7 as primary evacuation corridor"
      ],
      coordinates: [11.0045, 76.9926],
      polygon: [
        [11.0120, 76.9850],
        [11.0140, 77.0010],
        [10.9980, 77.0050],
        [10.9950, 76.9890]
      ],
      accessibility: "Restricted (R4 Submerged)",
      evacuationProgress: 45
    },
    {
      id: "C1",
      name: "Zone C1 — Ramanathapuram Lowlands",
      riskScore: 76,
      previousRiskScore: 71,
      riskLevel: "HIGH",
      priority: "P1",
      peopleAtRisk: 820,
      facilities: 2,
      facilityList: ["Primary Health Centre C1", "Municipal Water Pumping Station"],
      mainDriver: "Drainage backflow and low elevation water logging",
      statusReason: "Dense residential settlement + elderly population pocket",
      recommendedActions: [
        "Deploy Medical Unit Alpha 02",
        "Set up temporary staging raft at Trichy Road Junction"
      ],
      coordinates: [10.9930, 76.9750],
      polygon: [
        [10.9990, 76.9680],
        [11.0010, 76.9820],
        [10.9870, 76.9840],
        [10.9850, 76.9710]
      ],
      accessibility: "Cautionary (High Clearance only)",
      evacuationProgress: 60
    },
    {
      id: "A4",
      name: "Zone A4 — Perur West Ward",
      riskScore: 69,
      previousRiskScore: 65,
      riskLevel: "MEDIUM",
      priority: "P2",
      peopleAtRisk: 430,
      facilities: 1,
      facilityList: ["Govt Community Hall A4"],
      mainDriver: "Riverbank silt accumulation and moderate runoff",
      statusReason: "Moderate slope runoff; evacuation staging ready",
      recommendedActions: [
        "Deploy Bravo 01 for precautionary perimeter monitoring",
        "Alert Shelter S1 of incoming intake"
      ],
      coordinates: [10.9780, 76.9250],
      polygon: [
        [10.9850, 76.9180],
        [10.9870, 76.9320],
        [10.9720, 76.9350],
        [10.9700, 76.9200]
      ],
      accessibility: "Open",
      evacuationProgress: 80
    },
    {
      id: "D2",
      name: "Zone D2 — Ukkadam Lake North",
      riskScore: 61,
      previousRiskScore: 58,
      riskLevel: "MEDIUM",
      priority: "P2",
      peopleAtRisk: 210,
      facilities: 2,
      facilityList: ["Sub-station Feed D", "Bus Terminal Depot"],
      mainDriver: "Embankment seepage under sustained crest pressure",
      statusReason: "Controlled sluice discharge in progress",
      recommendedActions: [
        "Position sandbag stabilization crews along north embankment",
        "Monitor sluice gate 3 release volume"
      ],
      coordinates: [10.9890, 76.9580],
      polygon: [
        [10.9950, 76.9500],
        [10.9960, 76.9650],
        [10.9830, 76.9670],
        [10.9820, 76.9520]
      ],
      accessibility: "Open",
      evacuationProgress: 90
    }
  ],

  waterBodies: [
    {
      id: "mettur",
      name: "Mettur Dam",
      type: "Reservoir & Dam",
      currentLevel: 112.4,
      unit: "m",
      normalLevel: 108.0,
      maxLevel: 120.0,
      capacityPercent: 82,
      delta6h: "+1.8 m",
      delta24h: "+3.2 m",
      rateOfRise: "+0.30 m/hr",
      status: "WATCH",
      forecast: "Expected to rise under persistent upstream catchment inflow.",
      downstreamZones: ["B2", "B3", "C1"],
      recommendedAction: "Prepare evacuation teams for downstream zones & alert sluice engineers.",
      coordinates: [11.7960, 77.8010],
      history: [109.2, 109.8, 110.4, 110.9, 111.5, 112.4]
    },
    {
      id: "bhavanisagar",
      name: "Bhavani Sagar Dam",
      type: "Dam",
      currentLevel: 102.1,
      unit: "m",
      normalLevel: 105.0,
      maxLevel: 115.0,
      capacityPercent: 78,
      delta6h: "+0.9 m",
      delta24h: "+1.6 m",
      rateOfRise: "+0.15 m/hr",
      status: "WATCH",
      forecast: "Steady inflow from Nilgiris basin; approaching caution threshold.",
      downstreamZones: ["C1", "D2"],
      recommendedAction: "Verify secondary canals for backflow clearance.",
      coordinates: [11.4720, 77.1150],
      history: [100.5, 100.8, 101.2, 101.6, 101.8, 102.1]
    },
    {
      id: "siruvani",
      name: "Siruvani Reservoir",
      type: "Water Supply Reservoir",
      currentLevel: 875.2,
      unit: "m",
      normalLevel: 877.0,
      maxLevel: 885.0,
      capacityPercent: 64,
      delta6h: "+0.2 m",
      delta24h: "+0.4 m",
      rateOfRise: "+0.03 m/hr",
      status: "NORMAL",
      forecast: "Stable. Runoff controlled through intake spillways.",
      downstreamZones: ["A4"],
      recommendedAction: "Routine hourly telemetry inspection.",
      coordinates: [10.9410, 76.6870],
      history: [874.6, 874.8, 874.9, 875.0, 875.1, 875.2]
    },
    {
      id: "noyyal",
      name: "Noyyal River Basin",
      type: "Active River Basin",
      currentLevel: 6.8,
      unit: "m",
      normalLevel: 4.2,
      maxLevel: 7.2,
      capacityPercent: 91,
      delta6h: "+1.1 m",
      delta24h: "+2.4 m",
      rateOfRise: "+0.18 m/hr",
      status: "WARNING",
      forecast: "Critical flood crest anticipated within 3 hours.",
      downstreamZones: ["B2", "C1"],
      recommendedAction: "Immediate deployment of inflatable flood barriers at low bunds.",
      coordinates: [10.9990, 76.9950],
      history: [4.8, 5.2, 5.7, 6.1, 6.4, 6.8]
    },
    {
      id: "aliyar",
      name: "Aliyar Reservoir",
      type: "Reservoir",
      currentLevel: 118.5,
      unit: "m",
      normalLevel: 120.0,
      maxLevel: 130.0,
      capacityPercent: 71,
      delta6h: "+0.4 m",
      delta24h: "+0.7 m",
      rateOfRise: "+0.06 m/hr",
      status: "NORMAL",
      forecast: "Safe margins maintained across primary shutters.",
      downstreamZones: ["D2"],
      recommendedAction: "Maintain standard flood discharge logs.",
      coordinates: [10.4900, 76.9700],
      history: [117.8, 118.0, 118.1, 118.2, 118.4, 118.5]
    }
  ],

  rescueTeams: [
    {
      id: "ALPHA-01",
      name: "Alpha 01",
      zone: "B2",
      members: 6,
      vehicle: "Rescue Boat + High Clearance Support",
      currentLocation: "Zone B2 — Singanallur Sector 4",
      status: "Active",
      assignment: "Evacuate high-density residential blocks",
      peopleRemaining: 64,
      recommendedRoute: "R7",
      roadCondition: "Safe via elevated corridor",
      contact: "Command VHF Ch-04 / +91 94421 00101",
      coordinates: [11.0040, 76.9930]
    },
    {
      id: "ALPHA-02",
      name: "Alpha 02",
      zone: "C1",
      members: 5,
      vehicle: "Rapid Medical 4x4 + Triage Kit",
      currentLocation: "Trichy Road Flyover Junction",
      status: "En Route",
      assignment: "Medical triage & essential dialysis evac",
      peopleRemaining: 18,
      recommendedRoute: "R2",
      roadCondition: "Caution (15cm water on shoulder)",
      contact: "Command VHF Ch-04 / +91 94421 00102",
      coordinates: [10.9950, 76.9790]
    },
    {
      id: "BRAVO-01",
      name: "Bravo 01",
      zone: "A4",
      members: 8,
      vehicle: "High-Clearance Amphibious Transport",
      currentLocation: "Perur Staging Base",
      status: "Available",
      assignment: "Standby for P1 rapid escalation dispatch",
      peopleRemaining: 0,
      recommendedRoute: "R1",
      roadCondition: "Safe & clear",
      contact: "Command VHF Ch-05 / +91 94421 00103",
      coordinates: [10.9780, 76.9240]
    },
    {
      id: "BRAVO-02",
      name: "Bravo 02",
      zone: "B3",
      members: 4,
      vehicle: "Inflatable Jet Boat",
      currentLocation: "Noyyal Channel Bridge 2",
      status: "Active",
      assignment: "Perimeter search for stranded farmers",
      peopleRemaining: 12,
      recommendedRoute: "R7",
      roadCondition: "Safe",
      contact: "Command VHF Ch-05 / +91 94421 00104",
      coordinates: [11.0090, 77.0120]
    }
  ],

  shelters: [
    {
      id: "S1",
      name: "S1 — Central Community Hall",
      capacity: 500,
      occupied: 312,
      available: 188,
      distance: "2.1 km",
      travelTime: "6 min",
      risk: "Low",
      accessibility: true,
      medical: true,
      food: true,
      status: "Operational",
      address: "Cross Cut Road, Gandhipuram",
      coordinates: [11.0180, 76.9680]
    },
    {
      id: "S2",
      name: "S2 — Government Polytechnic",
      capacity: 300,
      occupied: 276,
      available: 24,
      distance: "3.1 km",
      travelTime: "9 min",
      risk: "Medium",
      accessibility: true,
      medical: true,
      food: true,
      status: "Near Capacity (92%)",
      address: "Civil Aerodrome Post, Peelamedu",
      coordinates: [11.0310, 77.0120]
    },
    {
      id: "S3",
      name: "S3 — Indoor Sports Stadium",
      capacity: 800,
      occupied: 421,
      available: 379,
      distance: "3.8 km",
      travelTime: "11 min",
      risk: "Low",
      accessibility: true,
      medical: true,
      food: true,
      status: "Operational",
      address: "VOC Park Grounds, Central Ward",
      coordinates: [11.0060, 76.9740]
    }
  ],

  routes: [
    {
      id: "R4",
      type: "FASTEST",
      name: "Route R4 (Canal Road Corridor)",
      from: "Zone B2",
      to: "Shelter S3",
      travelTime: "8 min",
      distance: "2.9 km",
      hazardLevel: "HIGH HAZARD",
      badgeClass: "badge-critical",
      roadCondition: "⚠ Low-lying section submerged by 35cm flowing water near canal bridge.",
      isRecommended: false,
      polyline: [
        [11.0045, 76.9926],
        [11.0020, 76.9840],
        [11.0035, 76.9780],
        [11.0060, 76.9740]
      ],
      color: "#DC2626",
      dashArray: "6, 6"
    },
    {
      id: "R7",
      type: "RECOMMENDED",
      name: "Route R7 (Elevated Bypass)",
      from: "Zone B2",
      to: "Shelter S3",
      travelTime: "11 min",
      distance: "3.8 km",
      hazardLevel: "LOW HAZARD",
      badgeClass: "badge-normal",
      roadCondition: "✓ Fully paved, elevated flyover bypass, dry surface, clear of storm debris.",
      isRecommended: true,
      rationale: "Selected because the faster R4 route currently passes through a high-risk flood zone with active water ingress.",
      polyline: [
        [11.0045, 76.9926],
        [11.0110, 76.9910],
        [11.0130, 76.9780],
        [11.0060, 76.9740]
      ],
      color: "#16A34A",
      dashArray: null
    },
    {
      id: "R9",
      type: "ALTERNATIVE",
      name: "Route R9 (Northern Ring Corridor)",
      from: "Zone B2",
      to: "Shelter S3",
      travelTime: "14 min",
      distance: "4.7 km",
      hazardLevel: "LOW HAZARD",
      badgeClass: "badge-normal",
      roadCondition: "✓ Safe perimeter corridor with secondary medical staging checkpoint.",
      isRecommended: false,
      polyline: [
        [11.0045, 76.9926],
        [11.0180, 76.9980],
        [11.0210, 76.9800],
        [11.0060, 76.9740]
      ],
      color: "#6B7280",
      dashArray: null
    }
  ],

  volunteerTasks: [
    {
      id: "VT-101",
      title: "Evacuation Support",
      category: "Evacuation",
      zone: "Zone B2",
      peopleAffected: 126,
      distance: "2.4 km away",
      priority: "HIGH",
      priorityBadge: "badge-p1",
      estimatedTime: "45 mins",
      description: "Assist elderly and families with luggage boarding emergency feeder buses at St. Jude School assembly point.",
      accepted: false
    },
    {
      id: "VT-102",
      title: "Food & Potable Water Distribution",
      category: "Food & Water",
      zone: "Shelter S2",
      peopleAffected: 42,
      distance: "3.1 km away",
      priority: "MEDIUM",
      priorityBadge: "badge-p2",
      estimatedTime: "30 mins",
      description: "Distribute emergency ration kits (packet 2B) and seal potable 20L water cans in Sector 3 ward.",
      accepted: false
    },
    {
      id: "VT-103",
      title: "Medical Triage Escort",
      category: "Medical Support",
      zone: "Zone C1",
      peopleAffected: 8,
      distance: "4.2 km away",
      priority: "HIGH",
      priorityBadge: "badge-p1",
      estimatedTime: "25 mins",
      description: "Accompany paramedics from Alpha 02 to carry portable oxygen kits to 3 residential units.",
      accepted: false
    },
    {
      id: "VT-104",
      title: "Shelter Intake Registration",
      category: "Shelter Support",
      zone: "Shelter S3",
      peopleAffected: 75,
      distance: "3.8 km away",
      priority: "LOW",
      priorityBadge: "badge-p3",
      estimatedTime: "60 mins",
      description: "Digital roster entry for newly arrived evacuees and wristband issuance.",
      accepted: false
    },
    {
      id: "VT-105",
      title: "Sandbag Barrier Reinforcement",
      category: "Search & Rescue",
      zone: "Noyyal Embankment",
      peopleAffected: 200,
      distance: "1.8 km away",
      priority: "HIGH",
      priorityBadge: "badge-p1",
      estimatedTime: "50 mins",
      description: "Assist Public Works Department team loading sandbags onto pallet line along vulnerable bund.",
      accepted: false
    }
  ],

  changeToActionAlert: {
    title: "Risk Level Escalation Alert",
    zone: "Zone B2",
    oldScore: 62,
    newScore: 81,
    reason: "Water level rising rapidly (+1.8m in 6h at Mettur / Noyyal cresting)",
    impact: "1,240 people potentially exposed in low-elevation wards",
    priorityPromotion: "Promoted to Priority 1 (P1)",
    immediateAction: "Deploy 2 rescue teams and prepare Shelter S2 for immediate intake.",
    suggestedActions: [
      { id: "review", label: "Review Telemetry", actionType: "inspectZone", param: "B2" },
      { id: "assign", label: "Assign Rescue Team", actionType: "assignTeam", param: "B2" },
      { id: "route", label: "Inspect Route R7", actionType: "planRoute", param: "B2" }
    ]
  },

  recoveryData: {
    affectedZones: "08",
    damagedInfra: 23,
    displacedPeople: "2,481",
    reliefRequired: 14,
    items: [
      {
        id: "REC-01",
        infrastructure: "Bridge B4 (Singanallur Canal Crossing)",
        damageLevel: "Severe Structural Damage",
        damageBadge: "badge-critical",
        communityImpact: "High (Isolates East residential pocket)",
        accessImpact: "Severe — Detour required +4.2 km",
        priority: "01",
        status: "Engineering Inspection Scheduled",
        action: "Deploy Mobile Bailey Bridge Kit"
      },
      {
        id: "REC-02",
        infrastructure: "Road R4 (Canal Road Corridor)",
        damageLevel: "Flood Damaged / Tarmac Erosion",
        damageBadge: "badge-warning",
        communityImpact: "Blocks direct access to Shelter S2",
        accessImpact: "Moderate — Traffic diverted to R7",
        priority: "02",
        status: "Pumping in Progress",
        action: "Deploy High-Volume De-watering Pumps"
      },
      {
        id: "REC-03",
        infrastructure: "Power Substation P2",
        damageLevel: "Partial Transformer Water Ingress",
        damageBadge: "badge-warning",
        communityImpact: "4,000 household connections without grid power",
        accessImpact: "Low",
        priority: "03",
        status: "Grid Isolation Active",
        action: "Dispatch Generator Contingency Units"
      },
      {
        id: "REC-04",
        infrastructure: "Primary Municipal Sluice Gate 3",
        damageLevel: "Debris Jam on Secondary Hoist",
        damageBadge: "badge-watch",
        communityImpact: "Impairs controlled drainage velocity",
        accessImpact: "Low",
        priority: "04",
        status: "Diver Crane Assigned",
        action: "Clear Log Obstruction"
      }
    ]
  },

  historicalEvents: [
    {
      id: "HIST-2018",
      year: "2018",
      title: "Great Western Catchment Inundation",
      conditions: "340 mm precipitation in 24 hours; Mettur discharge 185,000 cusecs; Noyyal river overtopped crest by 1.4 m.",
      observedImpact: "8,200 displaced across 12 wards; 4 bridges washed out; 36 hours delay in shelter coordination.",
      similarityScore: "84% match to current sensor signature",
      lessonsLearned: [
        "Predict: Upstream sensor deltas give 4.5 hour advance notice before downstream urban cresting.",
        "Prioritize: Hospital annex in Zone B2 requires pre-emptive evacuation before R4 reaches 20cm inundation.",
        "Respond: Route R7 elevated bypass prevents convoy entrapment experienced in 2018."
      ]
    },
    {
      id: "HIST-2021",
      year: "2021",
      title: "Monsoon Surge & Sluice Siltation",
      conditions: "Continuous heavy runoff (190mm / 18h) compounded by siltation at secondary check dams.",
      observedImpact: "Zone C1 waterlogging persisted for 48 hours; power infrastructure shut down prematurely.",
      similarityScore: "68% match to current sensor signature",
      lessonsLearned: [
        "Detect: Real-time telemetry prevents premature grid shutdowns.",
        "Recover: Pre-positioning submersible pumps reduces recovery timeframe from 4 days to 14 hours."
      ]
    }
  ]
};
