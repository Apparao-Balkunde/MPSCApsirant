// Maharashtra 36 Districts Exact Geographic Coordinates, Divisions & MPSC Atlas Landmarks
// Real geographic latitude & longitude for authentic interactive Atlas map rendering

import { AdministrativeDivisionId } from './maharashtraDistrictsData';

export interface DistrictGeoPoint {
  id: string;
  nameMr: string;
  nameEn: string;
  divisionId: AdministrativeDivisionId;
  lat: number;
  lng: number;
  hqMr: string;
  rtoCode: string;
  taglineMr: string;
  talukasCount: number;
}

export const DISTRICT_GEO_DATA: DistrictGeoPoint[] = [
  // 1. कोकण विभाग (७ जिल्हे)
  { id: 'mumbai_city', nameMr: 'मुंबई शहर', nameEn: 'Mumbai City', divisionId: 'konkan', lat: 18.9388, lng: 72.8354, hqMr: 'मुंबई', rtoCode: 'MH-01', taglineMr: 'महाराष्ट्राची राजधानी व आर्थिक केंद्र', talukasCount: 0 },
  { id: 'mumbai_suburban', nameMr: 'मुंबई उपनगर', nameEn: 'Mumbai Suburban', divisionId: 'konkan', lat: 19.0760, lng: 72.8777, hqMr: 'वांद्रे', rtoCode: 'MH-02, 03, 47', taglineMr: 'सर्वाधिक साक्षर जिल्हा (८९.९१%)', talukasCount: 3 },
  { id: 'thane', nameMr: 'ठाणे', nameEn: 'Thane', divisionId: 'konkan', lat: 19.2183, lng: 72.9781, hqMr: 'ठाणे', rtoCode: 'MH-04, 05', taglineMr: 'तलावांचे शहर (City of Lakes)', talukasCount: 7 },
  { id: 'palghar', nameMr: 'पालघर', nameEn: 'Palghar', divisionId: 'konkan', lat: 19.6967, lng: 72.7699, hqMr: 'पालघर', rtoCode: 'MH-48', taglineMr: 'महाराष्ट्राचा ३६ वा जिल्हा (१ ऑगस्ट २०१४)', talukasCount: 8 },
  { id: 'raigad', nameMr: 'रायगड', nameEn: 'Raigad', divisionId: 'konkan', lat: 18.6414, lng: 72.8722, hqMr: 'अलिबाग', rtoCode: 'MH-06', taglineMr: 'छत्रपती शिवरायांची राजधानी (किल्ले रायगड)', talukasCount: 15 },
  { id: 'ratnagiri', nameMr: 'रत्नागिरी', nameEn: 'Ratnagiri', divisionId: 'konkan', lat: 16.9902, lng: 73.3120, hqMr: 'रत्नागिरी', rtoCode: 'MH-08', taglineMr: 'हापूस आंबा, रत्ने व समाजसुधारकांची भूमी', talukasCount: 9 },
  { id: 'sindhudurg', nameMr: 'सिंधुदुर्ग', nameEn: 'Sindhudurg', divisionId: 'konkan', lat: 16.1264, lng: 73.6997, hqMr: 'ओरोस', rtoCode: 'MH-07', taglineMr: 'महाराष्ट्रातील पहिला पर्यटन जिल्हा', talukasCount: 8 },

  // 2. उत्तर महाराष्ट्र / नाशिक विभाग (५ जिल्हे)
  { id: 'nashik', nameMr: 'नाशिक', nameEn: 'Nashik', divisionId: 'nashik', lat: 19.9975, lng: 73.7898, hqMr: 'नाशिक', rtoCode: 'MH-15, 51', taglineMr: 'द्राक्षांची पंढरी व गोदावरी उगमस्थान', talukasCount: 15 },
  { id: 'ahilyanagar', nameMr: 'अहिल्यानगर', nameEn: 'Ahilyanagar', divisionId: 'nashik', lat: 19.0948, lng: 74.7480, hqMr: 'अहिल्यानगर', rtoCode: 'MH-16, 17', taglineMr: 'क्षेत्रफळाने राज्यातील सर्वात मोठा जिल्हा', talukasCount: 14 },
  { id: 'dhule', nameMr: 'धुळे', nameEn: 'Dhule', divisionId: 'nashik', lat: 20.9042, lng: 74.7749, hqMr: 'धुळे', rtoCode: 'MH-18', taglineMr: 'पावरा व भिल्ल संस्कृती, दुधा-तुपाचा जिल्हा', talukasCount: 4 },
  { id: 'nandurbar', nameMr: 'नंदुरबार', nameEn: 'Nandurbar', divisionId: 'nashik', lat: 21.3724, lng: 74.2403, hqMr: 'नंदुरबार', rtoCode: 'MH-39', taglineMr: 'आदिवासी बहुल जिल्हा व तोरणमाळ थंड हवेचे ठिकाण', talukasCount: 6 },
  { id: 'jalgaon', nameMr: 'जळगाव', nameEn: 'Jalgaon', divisionId: 'nashik', lat: 21.0077, lng: 75.5626, hqMr: 'जळगाव', rtoCode: 'MH-19', taglineMr: 'केळीची बाजारपेठ व सुवर्ण नगरी', talukasCount: 15 },

  // 3. पश्चिम महाराष्ट्र / पुणे विभाग (५ जिल्हे)
  { id: 'pune', nameMr: 'पुणे', nameEn: 'Pune', divisionId: 'pune', lat: 18.5204, lng: 73.8567, hqMr: 'पुणे', rtoCode: 'MH-12, 14, 54', taglineMr: 'विद्येचे माहेरघर व सांस्कृतिक राजधानी', talukasCount: 14 },
  { id: 'satara', nameMr: 'सातारा', nameEn: 'Satara', divisionId: 'pune', lat: 17.6805, lng: 74.0183, hqMr: 'सातारा', rtoCode: 'MH-11, 50', taglineMr: 'शूरवीरांची भूमी, कास पठार व कोयना धरण', talukasCount: 11 },
  { id: 'sangli', nameMr: 'सांगली', nameEn: 'Sangli', divisionId: 'pune', lat: 16.8524, lng: 74.5815, hqMr: 'सांगली', rtoCode: 'MH-10', taglineMr: 'हळदीचे शहर व नाट्यपंढरी', talukasCount: 10 },
  { id: 'kolhapur', nameMr: 'कोल्हापूर', nameEn: 'Kolhapur', divisionId: 'pune', lat: 16.7050, lng: 74.2433, hqMr: 'कोल्हापूर', rtoCode: 'MH-09, 53', taglineMr: 'कुस्तीची पंढरी, ऐतिहासिक महालक्ष्मी मंदिर व गूळ', talukasCount: 12 },
  { id: 'solapur', nameMr: 'सोलापूर', nameEn: 'Solapur', divisionId: 'pune', lat: 17.6599, lng: 75.9064, hqMr: 'सोलापूर', rtoCode: 'MH-13, 45, 52', taglineMr: 'चादर, ज्वारीचे कोठार व सिद्धेश्वर नगरी', talukasCount: 11 },

  // 4. मराठवाडा / छत्रपती संभाजीनगर विभाग (८ जिल्हे)
  { id: 'chhatrapati_sambhajinagar', nameMr: 'छ. संभाजीनगर', nameEn: 'Chhatrapati Sambhajinagar', divisionId: 'chhatrapati_sambhajinagar', lat: 19.8762, lng: 75.3433, hqMr: 'छ. संभाजीनगर', rtoCode: 'MH-20', taglineMr: 'पर्यटन राजधानी, अजिंठा-वेरूळ लेणी', talukasCount: 9 },
  { id: 'jalna', nameMr: 'जालना', nameEn: 'Jalna', divisionId: 'chhatrapati_sambhajinagar', lat: 19.8347, lng: 75.8816, hqMr: 'जालना', rtoCode: 'MH-21', taglineMr: 'मोसंबीचे शहर व स्टील सिटी', talukasCount: 8 },
  { id: 'parbhani', nameMr: 'परभणी', nameEn: 'Parbhani', divisionId: 'chhatrapati_sambhajinagar', lat: 19.2644, lng: 76.7725, hqMr: 'परभणी', rtoCode: 'MH-22', taglineMr: 'वसंतराव नाईक मराठवाडा कृषी विद्यापीठ', talukasCount: 9 },
  { id: 'hingoli', nameMr: 'हिंगोली', nameEn: 'Hingoli', divisionId: 'chhatrapati_sambhajinagar', lat: 19.7173, lng: 77.1491, hqMr: 'हिंगोली', rtoCode: 'MH-38', taglineMr: 'औंढा नागनाथ (८ वे ज्योतिर्लिंग) व हळद', talukasCount: 5 },
  { id: 'nanded', nameMr: 'नांदेड', nameEn: 'Nanded', divisionId: 'chhatrapati_sambhajinagar', lat: 19.1383, lng: 77.3210, hqMr: 'नांदेड', rtoCode: 'MH-26', taglineMr: 'पवित्र सचखंड गुरुद्वारा व १६ तालुके', talukasCount: 16 },
  { id: 'beed', nameMr: 'बीड', nameEn: 'Beed', divisionId: 'chhatrapati_sambhajinagar', lat: 18.9891, lng: 75.7601, hqMr: 'बीड', rtoCode: 'MH-23, 44', taglineMr: 'ऊसतोड कामगारांचा जिल्हा व परळी वैजनाथ', talukasCount: 11 },
  { id: 'latur', nameMr: 'लातूर', nameEn: 'Latur', divisionId: 'chhatrapati_sambhajinagar', lat: 18.4088, lng: 76.5604, hqMr: 'लातूर', rtoCode: 'MH-24', taglineMr: 'शिक्षण व डाळींची प्रमुख बाजारपेठ (लातूर पॅटर्न)', talukasCount: 10 },
  { id: 'dharashiv', nameMr: 'धाराशिव', nameEn: 'Dharashiv', divisionId: 'chhatrapati_sambhajinagar', lat: 18.1856, lng: 76.0423, hqMr: 'धाराशिव', rtoCode: 'MH-25', taglineMr: 'तुळजाभवानी माता व तेरचे ऐतिहासिक केंद्र', talukasCount: 8 },

  // 5. पश्चिम विदर्भ / अमरावती विभाग (५ जिल्हे)
  { id: 'amravati', nameMr: 'अमरावती', nameEn: 'Amravati', divisionId: 'amravati', lat: 20.9374, lng: 77.7796, hqMr: 'अमरावती', rtoCode: 'MH-27', taglineMr: 'मेळघाट व्याघ्र प्रकल्प व अंबादेवी मंदिर', talukasCount: 14 },
  { id: 'akola', nameMr: 'अकोला', nameEn: 'Akola', divisionId: 'amravati', lat: 20.7002, lng: 77.0082, hqMr: 'अकोला', rtoCode: 'MH-30', taglineMr: 'कापूस नगरी व डॉ. पंजाबराव देशमुख कृषी विद्यापीठ', talukasCount: 7 },
  { id: 'buldhana', nameMr: 'बुलढाणा', nameEn: 'Buldhana', divisionId: 'amravati', lat: 20.5312, lng: 76.1834, hqMr: 'बुलढाणा', rtoCode: 'MH-28', taglineMr: 'जागतिक ख्यातीचे उल्काजन्य लोणार सरोवर व शेगाव', talukasCount: 13 },
  { id: 'washim', nameMr: 'वाशीम', nameEn: 'Washim', divisionId: 'amravati', lat: 20.1095, lng: 77.1350, hqMr: 'वाशीम', rtoCode: 'MH-37', taglineMr: 'पद्मतीर्थ, बालाजी मंदिर व वाकाटक कालीन इतिहास', talukasCount: 6 },
  { id: 'yavatmal', nameMr: 'यवतमाळ', nameEn: 'Yavatmal', divisionId: 'amravati', lat: 20.3888, lng: 78.1204, hqMr: 'यवतमाळ', rtoCode: 'MH-29', taglineMr: 'पांढरे सोने (कापूस) जिल्हा व १६ तालुके', talukasCount: 16 },

  // 6. पूर्व विदर्भ / नागपूर विभाग (६ जिल्हे)
  { id: 'nagpur', nameMr: 'नागपूर', nameEn: 'Nagpur', divisionId: 'nagpur', lat: 21.1458, lng: 79.0882, hqMr: 'नागपूर', rtoCode: 'MH-31, 40, 49', taglineMr: 'उपराजधानी, संत्री नगरी व भारताचे झीरो माईल', talukasCount: 14 },
  { id: 'wardha', nameMr: 'वर्धा', nameEn: 'Wardha', divisionId: 'nagpur', lat: 20.7453, lng: 78.6022, hqMr: 'वर्धा', rtoCode: 'MH-32', taglineMr: 'सेवाग्राम (महात्मा गांधी) व पवनार (विनोबा भावे)', talukasCount: 8 },
  { id: 'bhandara', nameMr: 'भंडारा', nameEn: 'Bhandara', divisionId: 'nagpur', lat: 21.1667, lng: 79.6500, hqMr: 'भंडारा', rtoCode: 'MH-36', taglineMr: 'तलावांचा जिल्हा (Brass City)', talukasCount: 7 },
  { id: 'gondia', nameMr: 'गोंदिया', nameEn: 'Gondia', divisionId: 'nagpur', lat: 21.4624, lng: 80.1961, hqMr: 'गोंदिया', rtoCode: 'MH-35', taglineMr: 'तांदळाचा जिल्हा व नवेगाव राष्ट्रीय उद्यान', talukasCount: 8 },
  { id: 'chandrapur', nameMr: 'चंद्रपूर', nameEn: 'Chandrapur', divisionId: 'nagpur', lat: 19.9615, lng: 79.2961, hqMr: 'चंद्रपूर', rtoCode: 'MH-34', taglineMr: 'काळ्या सोन्याचे (कोळसा) शहर व ताडोबा व्याघ्र प्रकल्प', talukasCount: 15 },
  { id: 'gadchiroli', nameMr: 'गडचिरोली', nameEn: 'Gadchiroli', divisionId: 'nagpur', lat: 20.1809, lng: 80.0000, hqMr: 'गडचिरोली', rtoCode: 'MH-33', taglineMr: 'सर्वाधिक वने असलेला जिल्हा (६८.८%) व घनता सर्वात कमी', talukasCount: 12 },
];

export const DIVISION_MAP_BOUNDS: Record<AdministrativeDivisionId | 'all', [[number, number], [number, number]]> = {
  all: [[15.5, 72.4], [22.2, 81.1]],
  konkan: [[15.7, 72.6], [20.3, 73.5]],
  pune: [[15.7, 73.6], [18.9, 76.3]],
  nashik: [[18.8, 73.4], [22.1, 76.1]],
  chhatrapati_sambhajinagar: [[17.9, 74.8], [20.6, 77.8]],
  amravati: [[19.5, 76.0], [21.6, 78.6]],
  nagpur: [[18.7, 78.4], [21.8, 81.1]],
};

export const DIVISION_COLORS: Record<AdministrativeDivisionId, { 
  primary: string; 
  secondary: string; 
  accent: string;
  badgeBg: string;
  badgeText: string;
  pinBorder: string;
  fillColor: string;
}> = {
  konkan: { primary: '#0284c7', secondary: '#38bdf8', accent: '#0369a1', badgeBg: 'bg-sky-500', badgeText: 'text-white', pinBorder: '#0369a1', fillColor: '#38bdf8' },
  pune: { primary: '#16a34a', secondary: '#4ade80', accent: '#15803d', badgeBg: 'bg-emerald-600', badgeText: 'text-white', pinBorder: '#14532d', fillColor: '#4ade80' },
  nashik: { primary: '#d97706', secondary: '#fbbf24', accent: '#b45309', badgeBg: 'bg-amber-600', badgeText: 'text-white', pinBorder: '#78350f', fillColor: '#fbbf24' },
  chhatrapati_sambhajinagar: { primary: '#ea580c', secondary: '#fb923c', accent: '#c2410c', badgeBg: 'bg-orange-600', badgeText: 'text-white', pinBorder: '#7c2d12', fillColor: '#fb923c' },
  amravati: { primary: '#9333ea', secondary: '#c084fc', accent: '#7e22ce', badgeBg: 'bg-purple-600', badgeText: 'text-white', pinBorder: '#581c87', fillColor: '#c084fc' },
  nagpur: { primary: '#dc2626', secondary: '#f87171', accent: '#b91c1c', badgeBg: 'bg-rose-600', badgeText: 'text-white', pinBorder: '#881337', fillColor: '#f87171' },
};

// =========================================================================
// REALISTIC GEOGRAPHIC DIVISION BOUNDARY POLYGONS
// (For genuine Atlas shading of Maharashtra's 6 Administrative Divisions)
// =========================================================================
export const MAHARASHTRA_DIVISION_POLYGONS: Record<AdministrativeDivisionId, [number, number][]> = {
  // 1. कोकण (Coastal strip west of Sahyadri crestline)
  konkan: [
    [20.25, 72.75], [20.20, 73.10], [19.85, 73.30], [19.25, 73.40],
    [18.85, 73.45], [18.35, 73.55], [17.85, 73.70], [17.20, 73.80],
    [16.50, 73.95], [15.80, 74.25], [15.75, 73.70], [16.30, 73.30],
    [17.00, 73.20], [17.90, 72.95], [18.70, 72.75], [19.30, 72.75],
    [19.80, 72.65], [20.25, 72.75]
  ],

  // 2. उत्तर महाराष्ट्र / नाशिक विभाग
  nashik: [
    [22.05, 74.00], [21.80, 74.80], [21.50, 75.80], [21.20, 76.10],
    [20.70, 75.60], [20.30, 75.10], [19.80, 74.80], [19.00, 75.10],
    [18.70, 74.60], [19.10, 73.80], [19.50, 73.50], [20.00, 73.60],
    [20.50, 73.80], [21.10, 73.90], [21.70, 73.90], [22.05, 74.00]
  ],

  // 3. पश्चिम महाराष्ट्र / पुणे विभाग
  pune: [
    [19.10, 73.80], [18.70, 74.60], [18.50, 75.20], [18.20, 75.90],
    [17.80, 76.40], [17.30, 76.10], [16.80, 75.40], [16.60, 74.60],
    [15.80, 74.25], [16.50, 73.95], [17.20, 73.80], [17.85, 73.70],
    [18.35, 73.55], [18.85, 73.45], [19.10, 73.80]
  ],

  // 4. मराठवाडा / छत्रपती संभाजीनगर विभाग
  chhatrapati_sambhajinagar: [
    [20.30, 75.10], [20.70, 75.60], [20.40, 76.20], [19.90, 76.70],
    [19.80, 77.30], [19.40, 77.80], [18.80, 77.60], [18.30, 77.10],
    [18.00, 76.40], [18.20, 75.90], [18.50, 75.20], [19.00, 75.10],
    [19.80, 74.80], [20.30, 75.10]
  ],

  // 5. पश्चिम विदर्भ / अमरावती विभाग
  amravati: [
    [21.70, 76.70], [21.75, 77.50], [21.40, 78.20], [20.80, 78.40],
    [20.10, 78.80], [19.60, 78.40], [19.60, 77.60], [19.90, 76.70],
    [20.40, 76.20], [20.70, 75.60], [21.20, 76.10], [21.70, 76.70]
  ],

  // 6. पूर्व विदर्भ / नागपूर विभाग
  nagpur: [
    [21.75, 78.20], [21.70, 79.20], [21.80, 80.30], [21.40, 80.90],
    [20.50, 80.80], [19.30, 80.60], [18.70, 80.30], [18.90, 79.80],
    [19.50, 79.20], [20.10, 78.80], [20.80, 78.40], [21.40, 78.20],
    [21.75, 78.20]
  ]
};

// =========================================================================
// MPSC HIGH-YIELD RIVER SYSTEMS (नद्यांची खोरी)
// =========================================================================
export interface MpscAtlasRiver {
  id: string;
  nameMr: string;
  nameEn: string;
  color: string;
  descriptionMr: string;
  points: [number, number][];
}

export const MPSC_ATLAS_RIVERS: MpscAtlasRiver[] = [
  {
    id: 'godavari',
    nameMr: 'गोदावरी नदी (दक्षिण गंगा)',
    nameEn: 'Godavari River (Dakshin Ganga)',
    color: '#0284c7',
    descriptionMr: 'महाराष्ट्रातील सर्वात मोठी नदी (खोरे ४९.५%). उगम: त्र्यंबकेश्वर (नाशिक).',
    points: [
      [19.93, 73.53], [19.99, 73.79], [19.88, 74.48], [19.49, 75.38],
      [19.26, 75.98], [19.14, 76.62], [19.13, 77.32], [18.86, 77.85],
      [18.75, 78.30], [18.82, 79.00]
    ]
  },
  {
    id: 'bhima',
    nameMr: 'भीमा नदी (चंद्रभागा)',
    nameEn: 'Bhima River (Chandrabhaga)',
    color: '#0891b2',
    descriptionMr: 'उगम: भीमाशंकर (पुणे). पंढरपूर येथे चंद्रकोरीसारखा आकार धारण करते म्हणून चंद्रभागा.',
    points: [
      [19.07, 73.53], [18.66, 74.05], [18.46, 74.58], [18.07, 75.12],
      [17.67, 75.33], [17.35, 75.85], [17.15, 76.50]
    ]
  },
  {
    id: 'krishna',
    nameMr: 'कृष्णा नदी',
    nameEn: 'Krishna River',
    color: '#2563eb',
    descriptionMr: 'उगम: महाबळेश्वर (सातारा). वेण्णा, कोयना, वारणा व पंचगंगा प्रमुख उपनद्या.',
    points: [
      [17.92, 73.65], [17.94, 73.75], [17.68, 74.01], [17.28, 74.20],
      [16.85, 74.58], [16.68, 74.60], [16.58, 74.85]
    ]
  },
  {
    id: 'tapi',
    nameMr: 'तापी नदी (पश्चिम वाहिनी)',
    nameEn: 'Tapi River (West-flowing)',
    color: '#0d9488',
    descriptionMr: 'महाराष्ट्रातील प्रमुख पश्चिम वाहिनी नदी. खचदरीतून वाहते. पूर्णा प्रमुख उपनदी.',
    points: [
      [21.35, 76.20], [21.15, 75.80], [21.05, 75.35], [21.25, 74.80],
      [21.40, 74.30], [21.45, 73.75]
    ]
  },
  {
    id: 'wainganga',
    nameMr: 'वैनगंगा नदी (पूर्व विदर्भ)',
    nameEn: 'Wainganga River',
    color: '#4f46e5',
    descriptionMr: 'उगम: मध्य प्रदेश (शिवनी). वर्धा नदीला मिळून प्राणहिता नदी बनते.',
    points: [
      [21.65, 79.55], [21.25, 79.65], [20.80, 79.70], [20.30, 79.80],
      [19.70, 79.90], [18.80, 79.95]
    ]
  }
];

// =========================================================================
// MPSC HIGH-YIELD MOUNTAIN RANGES (पर्वतरांगा व डोंगररांगा)
// =========================================================================
export interface MpscAtlasMountainRange {
  id: string;
  nameMr: string;
  nameEn: string;
  descriptionMr: string;
  points: [number, number][];
}

export const MPSC_ATLAS_MOUNTAIN_RANGES: MpscAtlasMountainRange[] = [
  {
    id: 'sahyadri',
    nameMr: 'सह्याद्री मुख्य पर्वतरांग (पश्चिम घाट)',
    nameEn: 'Sahyadri Main Crest (Western Ghats)',
    descriptionMr: 'उत्तर-दक्षिण पसरलेली प्रमुख जलविभाजक रांग (लांबी सुमारे ४४० किमी).',
    points: [
      [20.50, 73.80], [19.99, 73.60], [19.60, 73.70], [19.10, 73.65],
      [18.70, 73.40], [18.20, 73.55], [17.60, 73.75], [17.10, 73.85],
      [16.40, 74.05], [15.80, 74.25]
    ]
  },
  {
    id: 'satpura',
    nameMr: 'सातपुडा पर्वतरांग (तोरणमाळ व गावीलगड)',
    nameEn: 'Satpura Mountain Range',
    descriptionMr: 'महाराष्ट्राच्या उत्तर सीमेवर. तोरणमाळ डोंगर (अक्राणी) व गावीलगड टेकड्या (अमरावती).',
    points: [
      [21.90, 74.10], [21.80, 74.60], [21.50, 75.30], [21.45, 76.50],
      [21.50, 77.30], [21.45, 78.10]
    ]
  },
  {
    id: 'satmala_ajanta',
    nameMr: 'सातमाळा-अजिंठा डोंगररांग',
    nameEn: 'Satmala - Ajanta Range',
    descriptionMr: 'गोदावरी व तापी नद्यांची खोरी वेगळी करणारी रांग. अजिंठा येथे प्रसिद्ध लेणी.',
    points: [
      [20.30, 74.00], [20.25, 74.70], [20.50, 75.40], [20.55, 76.00],
      [20.45, 76.80]
    ]
  },
  {
    id: 'harishchandra_balaghat',
    nameMr: 'हरिश्चंद्र-बालाघाट डोंगररांग',
    nameEn: 'Harishchandra - Balaghat Range',
    descriptionMr: 'गोदावरी व भीमा नद्यांचे खोरे वेगळे करणारी रांग. अहिल्यानगर, बीड, उस्मानाबाद/धाराशिव, लातूर.',
    points: [
      [19.40, 73.75], [19.15, 74.50], [19.00, 75.50], [18.60, 76.20],
      [18.30, 76.90]
    ]
  },
  {
    id: 'shambhu_mahadev',
    nameMr: 'शंभू महादेव डोंगररांग',
    nameEn: 'Shambhu Mahadev Range',
    descriptionMr: 'भीमा व कृष्णा नद्यांचे खोरे वेगळे करणारी रांग. सातारा, सांगली, सोलापूर.',
    points: [
      [18.10, 73.70], [17.80, 74.20], [17.50, 74.80], [17.20, 75.40]
    ]
  }
];

// =========================================================================
// MPSC ATLAS LANDMARKS (Peaks, Dams, Ghats, Wildlife, Forts, Jyotirlingas, UNESCO, Power)
// =========================================================================
export interface MpscAtlasLandmark {
  id: string;
  nameMr: string;
  nameEn: string;
  lat: number;
  lng: number;
  type: 'peak' | 'lake_dam' | 'ghat' | 'wildlife' | 'fort' | 'heritage' | 'unesco' | 'energy';
  districtMr: string;
  factMr: string;
}

export const MPSC_ATLAS_LANDMARKS: MpscAtlasLandmark[] = [
  // 1. प्रमुख शिखरे (Highest Peaks)
  { id: 'kalsubai', nameMr: 'कळसूबाई शिखर (१,६४६ मी)', nameEn: 'Kalsubai Peak (1,646m)', lat: 19.6014, lng: 73.7128, type: 'peak', districtMr: 'अहिल्यानगर/नाशिक सीमा', factMr: 'महाराष्ट्रातील सर्वोच्च शिखर (सह्याद्री पर्वत)' },
  { id: 'salher', nameMr: 'साल्हेर शिखर (१,५६७ मी)', nameEn: 'Salher Peak (1,567m)', lat: 20.7234, lng: 73.9431, type: 'peak', districtMr: 'नाशिक (सटाणा)', factMr: 'महाराष्ट्रातील दुसरे सर्वोच्च शिखर व किल्ला' },
  { id: 'mahabaleshwar', nameMr: 'महाबळेश्वर शिखर (१,४३८ मी)', nameEn: 'Mahabaleshwar (1,438m)', lat: 17.9237, lng: 73.6586, type: 'peak', districtMr: 'सातारा', factMr: 'कृष्णा, वेण्णा, कोयना, गायत्री, सावित्री या ५ नद्यांचे उगमस्थान' },
  { id: 'harishchandra', nameMr: 'हरिश्चंद्रगड (१,४२४ मी)', nameEn: 'Harishchandragad (1,424m)', lat: 19.3888, lng: 73.7788, type: 'peak', districtMr: 'अहिल्यानगर', factMr: 'विशाल कोकणकडा व केदारेश्वर गुंफा' },
  { id: 'toranmal', nameMr: 'तोरणमाळ पठार (१,१५५ मी)', nameEn: 'Toranmal (1,155m)', lat: 21.8767, lng: 74.4533, type: 'peak', districtMr: 'नंदुरबार (सातपुडा)', factMr: 'सातपुडा पर्वतातील थंड हवेचे ठिकाण व यशवंत तलाव' },
  { id: 'chikhaldara', nameMr: 'चिखलदरा (१,११८ मी)', nameEn: 'Chikhaldara', lat: 21.4034, lng: 77.3275, type: 'peak', districtMr: 'अमरावती (सातपुडा)', factMr: 'विदर्भातील एकमेव थंड हवेचे ठिकाण व कॉफी मळे' },

  // 2. प्रमुख धरणे व सरोवरे (Major Dams & Lakes)
  { id: 'lonar', nameMr: 'लोणार सरोवर (उल्का सरोवर)', nameEn: 'Lonar Crater Lake', lat: 19.9763, lng: 76.5074, type: 'lake_dam', districtMr: 'बुलढाणा', factMr: 'उल्कापाताने तयार झालेले खाऱ्या पाण्याचे जागतिक वारसा व रामसार स्थळ (२०२०)' },
  { id: 'koyna', nameMr: 'कोयना धरण (शिवसागर)', nameEn: 'Koyna Dam (Shivsagar)', lat: 17.3976, lng: 73.7501, type: 'lake_dam', districtMr: 'सातारा', factMr: 'महाराष्ट्राची भाग्यलक्ष्मी - १९६० मेगावॅट जलविद्युत निर्मिती' },
  { id: 'jayakwadi', nameMr: 'जायकवाडी धरण (नाथसागर)', nameEn: 'Jayakwadi Dam (Nathsagar)', lat: 19.4967, lng: 75.3853, type: 'lake_dam', districtMr: 'छ. संभाजीनगर (पैठण)', factMr: 'गोदावरी नदीवरील आशियातील मोठे मातीचे धरण व पक्षी अभयारण्य' },
  { id: 'ujjani', nameMr: 'उजनी धरण (यशवंतसागर)', nameEn: 'Ujjani Dam (Yashwantsagar)', lat: 18.0772, lng: 75.1197, type: 'lake_dam', districtMr: 'सोलापूर (माढा)', factMr: 'भीमा नदीवरील धरण व रोहित (फ्लेमिंगो) पक्षांचे आश्रयस्थान' },
  { id: 'totladoh', nameMr: 'तोतलाडोह धरण (मेघदूत जलाशय)', nameEn: 'Totladoh Dam', lat: 21.5278, lng: 79.2289, type: 'lake_dam', districtMr: 'नागपूर (पेंच)', factMr: 'पेंच नदीवरील आंतरराज्य जलप्रकल्प' },
  { id: 'wilson_dam', nameMr: 'विल्सन डॅम / आर्थर लेक (भंडारदरा)', nameEn: 'Wilson Dam (Bhandardara)', lat: 19.5317, lng: 73.7570, type: 'lake_dam', districtMr: 'अहिल्यानगर', factMr: 'प्रवरा नदीवरील रंधा धबधबा व ऐतिहासिक धरण' },

  // 3. प्रमुख घाट (Western Ghats Passes)
  { id: 'thalghat', nameMr: 'थळ घाट (कसारा घाट)', nameEn: 'Thalghat (Kasara)', lat: 19.6750, lng: 73.4900, type: 'ghat', districtMr: 'ठाणे-नाशिक सीमा', factMr: 'मुंबई ते नाशिक व आग्रा राष्ट्रीय महामार्ग' },
  { id: 'bhorghat', nameMr: 'बोर घाट (खंडाळा घाट)', nameEn: 'Bhorghat (Khandala)', lat: 18.7618, lng: 73.3768, type: 'ghat', districtMr: 'रायगड-पुणे सीमा', factMr: 'मुंबई ते पुणे द्रुतगती महामार्ग व रेल्वे घाट' },
  { id: 'amboli_ghat', nameMr: 'आंबोली घाट', nameEn: 'Amboli Ghat', lat: 15.9610, lng: 73.9990, type: 'ghat', districtMr: 'सिंधुदुर्ग', factMr: 'महाराष्ट्रातील सर्वाधिक पर्जन्यमान (७५० सें.मी.) - सावंतवाडी ते बेळगाव' },
  { id: 'kumbharli', nameMr: 'कुंभार्ली घाट', nameEn: 'Kumbharli Ghat', lat: 17.4120, lng: 73.6840, type: 'ghat', districtMr: 'कराड ते चिपळूण', factMr: 'पश्चिम महाराष्ट्र व कोकण जोडणारा प्रमुख घाट' },
  { id: 'varandha_ghat', nameMr: 'वरंधा घाट', nameEn: 'Varandha Ghat', lat: 18.1060, lng: 73.6120, type: 'ghat', districtMr: 'पुणे-रायगड सीमा', factMr: 'भोर (पुणे) ते महाड (रायगड) जोडणारा ऐतिहासिक निसर्गरम्य घाट' },
  { id: 'phonda_ghat', nameMr: 'फोंडा घाट', nameEn: 'Phonda Ghat', lat: 16.3810, lng: 73.8050, type: 'ghat', districtMr: 'कोल्हापूर ते सिंधुदुर्ग', factMr: 'कोल्हापूर ते कणकवली दरम्यानचा महत्वाचा व्यापारी घाट' },

  // 4. प्रमुख राष्ट्रीय उद्याने व व्याघ्र प्रकल्प (Wildlife & Reserves)
  { id: 'tadoba', nameMr: 'ताडोबा-अंधारी व्याघ्र प्रकल्प', nameEn: 'Tadoba-Andhari Tiger Reserve', lat: 20.2450, lng: 79.3080, type: 'wildlife', districtMr: 'चंद्रपूर', factMr: 'महाराष्ट्रातील सर्वात जुने राष्ट्रीय उद्यान (१९५५)' },
  { id: 'sanjay_gandhi', nameMr: 'संजय गांधी राष्ट्रीय उद्यान', nameEn: 'Sanjay Gandhi National Park', lat: 19.2215, lng: 72.9128, type: 'wildlife', districtMr: 'मुंबई उपनगर/ठाणे', factMr: 'शहरी हद्दीत असलेले जगातील मोठे राष्ट्रीय उद्यान व कान्हेरी गुंफा' },
  { id: 'melghat', nameMr: 'मेळघाट व्याघ्र प्रकल्प', nameEn: 'Melghat Tiger Reserve', lat: 21.5000, lng: 77.1500, type: 'wildlife', districtMr: 'अमरावती', factMr: 'महाराष्ट्रातील पहिला व्याघ्र प्रकल्प (१९७३-७४)' },
  { id: 'radhanagari', nameMr: 'राधानगरी गवे अभयारण्य', nameEn: 'Radhanagari Bison Sanctuary', lat: 16.4250, lng: 73.9850, type: 'wildlife', districtMr: 'कोल्हापूर', factMr: 'महाराष्ट्रातील पहिले वन्यजीव अभयारण्य (गव्यांसाठी प्रसिद्ध)' },
  { id: 'pench', nameMr: 'पेंच राष्ट्रीय उद्यान (पंडित जवाहरलाल नेहरू)', nameEn: 'Pench National Park', lat: 21.6667, lng: 79.2500, type: 'wildlife', districtMr: 'नागपूर', factMr: 'रुडयार्ड किपलिंग यांच्या "द जंगल बुक" चे प्रेरणास्थान' },
  { id: 'navegaon', nameMr: 'नवेगाव-नागझिरा व्याघ्र प्रकल्प', nameEn: 'Navegaon-Nagzira Tiger Reserve', lat: 20.9333, lng: 80.1667, type: 'wildlife', districtMr: 'गोंदिया/भंडारा', factMr: 'माधवराव पाटील जलाशय व पक्षी तीर्थ' },

  // 5. ऐतिहासिक किल्ले (Historical Hill & Sea Forts)
  { id: 'raigad_fort', nameMr: 'किल्ले रायगड (स्वराज्याची राजधानी)', nameEn: 'Raigad Fort', lat: 18.2346, lng: 73.4414, type: 'fort', districtMr: 'रायगड', factMr: 'छत्रपती शिवाजी महाराजांचा राज्याभिषेक (६ जून १६७४) व समाधी' },
  { id: 'shivneri_fort', nameMr: 'किल्ले शिवनेरी (जन्मस्थान)', nameEn: 'Shivneri Fort', lat: 19.1970, lng: 73.8580, type: 'fort', districtMr: 'पुणे (जुन्नर)', factMr: 'छत्रपती शिवाजी महाराजांचे जन्मस्थान (१९ फेब्रुवारी १६३०)' },
  { id: 'pratapgad_fort', nameMr: 'किल्ले प्रतापगड', nameEn: 'Pratapgad Fort', lat: 17.9333, lng: 73.5833, type: 'fort', districtMr: 'सातारा (महाबळेश्वर)', factMr: 'अफझलखान वध ऐतिहासिक लढाई (१० नोव्हेंबर १६५९)' },
  { id: 'sindhudurg_fort', nameMr: 'किल्ले सिंधुदुर्ग (सागरी किल्ला)', nameEn: 'Sindhudurg Fort', lat: 16.0425, lng: 73.4686, type: 'fort', districtMr: 'सिंधुदुर्ग (मालवण)', factMr: 'छत्रपती शिवाजी महाराजांनी कुरटे बेटावर बांधलेला अभेद्य जलदुर्ग व शिवमंदिर' },
  { id: 'janjira_fort', nameMr: 'मुरुड-जंजिरा किल्ला (अजिंक्य जलदुर्ग)', nameEn: 'Murud-Janjira Fort', lat: 18.2997, lng: 72.9631, type: 'fort', districtMr: 'रायगड (मुरुड)', factMr: 'सिद्दी घराण्याचा अजिंक्य जलदुर्ग, कलाल बांगडी तोफ' },
  { id: 'panhala_fort', nameMr: 'किल्ले पन्हाळा', nameEn: 'Panhala Fort', lat: 16.8117, lng: 74.1089, type: 'fort', districtMr: 'कोल्हापूर', factMr: 'बाजीप्रभू देशपांडे व पावनखिंडीचा शौर्य इतिहास' },
  { id: 'sinhagad_fort', nameMr: 'किल्ले सिंहगड (कोंढाणा)', nameEn: 'Sinhagad Fort', lat: 18.3663, lng: 73.7558, type: 'fort', districtMr: 'पुणे (हवेली)', factMr: 'नरवीर तानाजी मालुसरे यांचे बलिदान (गड आला पण सिंह गेला)' },
  { id: 'daulatabad_fort', nameMr: 'दौलताबाद किल्ला (देवगिरी)', nameEn: 'Daulatabad Fort (Devagiri)', lat: 19.9427, lng: 75.2125, type: 'fort', districtMr: 'छ. संभाजीनगर', factMr: 'यादवांची अभेद्य राजधानी, चांद मिनार व अंधारी वाट' },

  // 6. ज्योतिर्लिंगे (5 Jyotirlingas in Maharashtra)
  { id: 'trimbak', nameMr: 'त्र्यंबकेश्वर ज्योतिर्लिंग', nameEn: 'Trimbakeshwar Jyotirlinga', lat: 19.9328, lng: 73.5306, type: 'heritage', districtMr: 'नाशिक', factMr: '१२ ज्योतिर्लिंगांपैकी एक व गोदावरी उगमस्थान' },
  { id: 'bhimashankar', nameMr: 'भीमाशंकर ज्योतिर्लिंग', nameEn: 'Bhimashankar Jyotirlinga', lat: 19.0722, lng: 73.5356, type: 'heritage', districtMr: 'पुणे', factMr: 'भीमा नदीचे उगमस्थान व शेकरू (राज्य प्राणी) अभयारण्य' },
  { id: 'grishneshwar', nameMr: 'घृष्णेश्वर ज्योतिर्लिंग', nameEn: 'Grishneshwar Jyotirlinga', lat: 20.0242, lng: 75.1718, type: 'heritage', districtMr: 'छ. संभाजीनगर (वेरूळ)', factMr: 'भारतातील १२ वे अंतिम ज्योतिर्लिंग व अहिल्याबाई होळकर जिर्णोद्धार' },
  { id: 'aundha', nameMr: 'औंढा नागनाथ ज्योतिर्लिंग', nameEn: 'Aundha Nagnath Jyotirlinga', lat: 19.5375, lng: 77.0392, type: 'heritage', districtMr: 'हिंगोली', factMr: '८ वे ज्योतिर्लिंग, पांडवकालीन स्थापत्य' },
  { id: 'parli', nameMr: 'परळी वैजनाथ ज्योतिर्लिंग', nameEn: 'Parli Vaijnath Jyotirlinga', lat: 18.8475, lng: 76.5367, type: 'heritage', districtMr: 'बीड', factMr: 'वैजनाथ ज्योतिर्लिंग व थर्मल पॉवर स्टेशन' },

  // 7. युनेस्को जागतिक वारसा व रामसार पाणथळ स्थळे (UNESCO World Heritage & Ramsar Sites)
  { id: 'ajanta_caves', nameMr: 'अजिंठा लेणी (UNESCO १९८३)', nameEn: 'Ajanta Caves (UNESCO World Heritage)', lat: 20.5519, lng: 75.7033, type: 'unesco', districtMr: 'छ. संभाजीनगर', factMr: 'वाघूर नदीच्या खोऱ्यात बौद्ध भित्तीचित्रे व जातक कथा (२९ लेणी)' },
  { id: 'ellora_caves', nameMr: 'वेरूळ लेणी व कैलास मंदिर (UNESCO १९८३)', nameEn: 'Ellora Caves & Kailasa Temple', lat: 20.0258, lng: 75.1790, type: 'unesco', districtMr: 'छ. संभाजीनगर', factMr: 'एकाच पाषाणात कोरलेले कैलास मंदिर (राष्ट्रकूट राजा कृष्ण १ ला)' },
  { id: 'elephanta_caves', nameMr: 'घारापुरी लेणी / एलिफंटा (UNESCO १९८७)', nameEn: 'Elephanta Caves', lat: 18.9633, lng: 72.9315, type: 'unesco', districtMr: 'रायगड/मुंबई बंदर', factMr: 'त्रिमूर्ती सदाशिव शिल्पकला (कल्याण-बंदर)' },
  { id: 'kaas_plateau', nameMr: 'कास पठार (UNESCO २०१२)', nameEn: 'Kaas Plateau (Valley of Flowers)', lat: 17.7214, lng: 73.8181, type: 'unesco', districtMr: 'सातारा', factMr: 'महाराष्ट्राचे व्हॅली ऑफ फ्लॉवर्स - पश्चिम घाट जागतिक नैसर्गिक वारसा' },
  { id: 'nandur_madhmeshwar', nameMr: 'नांदूर मध्यमेश्वर (पहिले रामसार स्थळ २०२०)', nameEn: 'Nandur Madhmeshwar (1st Ramsar Site)', lat: 20.0333, lng: 74.1167, type: 'unesco', districtMr: 'नाशिक (निफाड)', factMr: 'महाराष्ट्राचे "भरतपूर" - गोदावरी व कादवा संगम पक्षीतीर्थ' },
  { id: 'thane_creek', nameMr: 'ठाणे खाडी फ्लेमिंगो (३ रे रामसार स्थळ २०२२)', nameEn: 'Thane Creek Flamingo Sanctuary', lat: 19.1550, lng: 72.9780, type: 'unesco', districtMr: 'ठाणे/मुंबई उपनगर', factMr: 'फ्लेमिंगो पक्षांचे जागतिक पाणथळ अधिवास (Ramsar Site)' },

  // 8. प्रमुख ऊर्जा प्रकल्प (Thermal, Hydro & Nuclear Power Projects)
  { id: 'tarapur_atomic', nameMr: 'तारापूर अणुऊर्जा केंद्र (TAPS)', nameEn: 'Tarapur Atomic Power Station', lat: 19.8290, lng: 72.6560, type: 'energy', districtMr: 'पालघर', factMr: 'भारतातील पहिली अणुभट्टी (१९६९) - युएसए चे सहकार्य' },
  { id: 'chandrapur_thermal', nameMr: 'चंद्रपूर महा-औष्णिक विद्युत केंद्र (CSTPS)', nameEn: 'Chandrapur Super Thermal Power Station', lat: 19.9800, lng: 79.2800, type: 'energy', districtMr: 'चंद्रपूर', factMr: 'महाराष्ट्रातील सर्वात मोठे कोळशावर चालणारे औष्णिक ऊर्जा केंद्र (२९२० मेगावॅट)' },
  { id: 'koradi_thermal', nameMr: 'कोराडी औष्णिक विद्युत प्रकल्प', nameEn: 'Koradi Thermal Power Station', lat: 21.2480, lng: 79.0960, type: 'energy', districtMr: 'नागपूर', factMr: 'विदर्भातील महत्वाचे औष्णिक वीज केंद्र' }
];

