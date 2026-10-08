import { ExamPatternId, Question, SubjectId } from '../types';
import { MPSC_QUESTIONS } from './mpscQuestions';

export type SubjectMarathonId =
  | 'marathon_geo_forest'
  | 'marathon_science'
  | 'marathon_current_affairs'
  | 'marathon_polity';

export interface SubjectMarathonTopicWeightage {
  topicMr: string;
  topicEn: string;
  questionCount: number;
  percentage: number;
}

export interface SubjectMarathonMeta {
  id: SubjectMarathonId;
  patternId: ExamPatternId;
  subjectId: SubjectId | 'environment';
  titleMr: string;
  titleEn: string;
  shortTitleMr: string;
  shortTitleEn: string;
  badgeMr: string;
  badgeEn: string;
  categoryIcon: string;
  tagColor: string;
  bannerGradient: string;
  borderColor: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarkRate: number;
  targetCutoff: {
    open: number;
    obc: number;
    sc: number;
    st: number;
    female: number;
  };
  syllabusCoverageMr: string[];
  syllabusCoverageEn: string[];
  keyStrategiesMr: string[];
  topicBreakdown: SubjectMarathonTopicWeightage[];
  questionIds: string[];
}

export const MARATHON_GEO_FOREST_IDS: string[] = [
  "mh_geo_01",
  "mh_geo_02",
  "mh_geo_03",
  "mh_geo_04",
  "env_01",
  "env_02",
  "mpsc_geog_fb_003",
  "mpsc_geog_fb_015",
  "mpsc_geog_fb_016",
  "mpsc_geog_fb_017",
  "geo_101",
  "geo_102",
  "geo_103",
  "geo_104",
  "geo_105",
  "geo_106",
  "geo_107",
  "geo_108",
  "geo_109",
  "geo_110",
  "env_101",
  "env_102",
  "env_103",
  "env_104",
  "env_105",
  "env_106",
  "env_107",
  "env_108",
  "env_109",
  "env_110",
  "env_111",
  "env_112",
  "env_113",
  "env_114",
  "env_115",
  "env_116",
  "env_117",
  "env_118",
  "env_119",
  "env_120",
  "env_121",
  "env_122",
  "env_123",
  "env_124",
  "env_125",
  "mh_geo_201",
  "mh_geo_202",
  "mh_geo_203",
  "mh_geo_204",
  "geo_301",
  "geo_302",
  "geo_303",
  "mh_geo_401",
  "mh_geo_402",
  "mh_wild_501",
  "mh_wild_502",
  "mh_geo_601",
  "mh_geo_602",
  "env_601",
  "env_602",
  "mh_trans_701",
  "mh_trans_702",
  "mh_trans_703",
  "mh_cult_802",
  "mh_geo_901",
  "mh_geo_902",
  "mh_min_1001",
  "mh_min_1002",
  "mh_soil_1101",
  "mh_soil_1102",
  "mh_riv_1201",
  "mh_riv_1202",
  "mh_geo_1301",
  "mh_geo_1302",
  "mh_geo_1401",
  "mh_geo_1402",
  "hard_geo_01",
  "hard_geo_02",
  "hard_env_01",
  "mpsc_2026_geo_01",
  "mpsc_2026_geo_02",
  "mpsc_2026_env_01",
  "mpsc_2026_env_02",
  "mpsc_2026_geo_03",
  "mpsc_2026_geo_04",
  "mpsc_2026_geo_05",
  "mpsc_2026_env_03",
  "mpsc_2026_env_04",
  "mpsc_geog_2027_05",
  "mh_geog_1605",
  "mh_geog_1606",
  "mh_geog_1705",
  "mh_geog_1706",
  "mh_geog_1903",
  "mh_geo_2403",
  "mh_geo_2404",
  "mh_env_2412",
  "mh_geo_2503",
  "mh_geo_2504",
  "mh_geo_2603"
];

export const MARATHON_SCIENCE_IDS: string[] = [
  "sci_01",
  "sci_02",
  "sci_03",
  "mpsc_sci_fb_006",
  "mpsc_sci_fb_021",
  "mpsc_sci_fb_022",
  "mpsc_sci_fb_023",
  "sci_101",
  "sci_102",
  "sci_103",
  "sci_104",
  "sci_105",
  "sci_106",
  "sci_107",
  "sci_108",
  "sci_109",
  "sci_110",
  "sci_201",
  "sci_202",
  "sci_301",
  "sci_302",
  "sci_303",
  "sci_401",
  "sci_402",
  "sci_501",
  "sci_502",
  "sci_rad_701",
  "sci_rad_702",
  "sci_901",
  "sci_opt_1001",
  "sci_opt_1002",
  "sci_chem_1101",
  "sci_chem_1102",
  "sci_bio_1201",
  "sci_bio_1202",
  "sci_snd_1301",
  "sci_snd_1302",
  "sci_met_1401",
  "sci_met_1402",
  "hard_sci_01",
  "hard_sci_02",
  "mpsc_2026_sci_01",
  "mpsc_2026_sci_02",
  "mpsc_2026_sci_03",
  "mpsc_2026_sci_04",
  "mpsc_sci_2027_07",
  "mh_env_1501",
  "mh_env_1502",
  "mh_sci_1509",
  "mh_sci_1510",
  "csat_reas_1607",
  "csat_reas_1608",
  "mh_sci_1707",
  "csat_quant_1708",
  "mh_sci_1805",
  "mh_sci_1806",
  "csat_quant_1808",
  "mh_sci_1905",
  "mh_env_1906",
  "csat_quant_1908",
  "mh_sci_2408",
  "mh_sci_2507",
  "mh_sci_2608",
  "mh_sci_2708",
  "mh_sci_2808",
  "info_it_2905",
  "info_ict_2906",
  "info_sci_2910",
  "info_it_3003",
  "info_gov_3008",
  "pyq_combine_26_66",
  "pyq_combine_26_67",
  "pyq_combine_26_68",
  "pyq_combine_26_69",
  "pyq_combine_26_70",
  "pyq_combine_26_71",
  "pyq_combine_26_72",
  "pyq_combine_26_73",
  "pyq_combine_26_74",
  "pyq_combine_26_75",
  "pyq_combine_26_76",
  "pyq_combine_26_77",
  "pyq_combine_26_78",
  "pyq_combine_26_79",
  "pyq_combine_26_80",
  "pyq_2024_51",
  "pyq_2024_52",
  "pyq_2024_53",
  "pyq_2024_54",
  "pyq_2024_55",
  "pyq_2024_56",
  "pyq_2024_57",
  "pyq_2024_58",
  "pyq_2024_59",
  "pyq_2024_60",
  "pyq_2024_61",
  "pyq_2024_62",
  "pyq_2024_63",
  "pyq_2024_64",
  "pyq_2024_65"
];

export const MARATHON_CURRENT_AFFAIRS_IDS: string[] = [
  "mpsc_curr_fb_005",
  "mpsc_curr_fb_024",
  "mpsc_curr_fb_025",
  "mpsc_curr_fb_026",
  "ca_2026_01",
  "ca_2026_02",
  "ca_2026_03",
  "ca_2026_04",
  "ca_2026_05",
  "ca_2026_06",
  "ca_2026_07",
  "ca_2026_08",
  "ca_2026_09",
  "ca_2026_10",
  "ca_2026_11",
  "ca_2026_12",
  "ca_2026_13",
  "ca_2026_14",
  "ca_2026_15",
  "ca_2026_16",
  "ca_2026_17",
  "ca_2026_18",
  "ca_2026_19",
  "ca_2026_20",
  "ca_2026_21",
  "ca_2026_22",
  "ca_2026_23",
  "ca_2026_24",
  "ca_2026_25",
  "ca_2026_26",
  "ca_2026_27",
  "ca_2026_28",
  "ca_2026_29",
  "ca_2026_30",
  "ca_2026_31",
  "ca_2026_32",
  "ca_2026_33",
  "ca_2026_34",
  "ca_2026_35",
  "ca_2026_36",
  "ca_2026_37",
  "ca_2026_38",
  "ca_2026_39",
  "ca_2026_40",
  "ca_2026_0001",
  "ca_2026_0002",
  "ca_2026_0003",
  "ca_2026_0004",
  "ca_2026_0005",
  "ca_2026_0006",
  "ca_2026_0007",
  "ca_2026_0008",
  "ca_2026_0009",
  "ca_2026_0010",
  "ca_2026_0011",
  "ca_2026_0012",
  "ca_2026_0013",
  "ca_2026_0014",
  "ca_2026_0015",
  "ca_2026_0016",
  "ca_2026_0017",
  "ca_2026_0018",
  "ca_2026_0019",
  "ca_2026_0020",
  "ca_2026_0021",
  "ca_2026_0022",
  "ca_2026_0023",
  "ca_2026_0024",
  "ca_2026_0025",
  "ca_2026_0026",
  "ca_2026_0027",
  "ca_2026_0028",
  "ca_2026_0029",
  "ca_2026_0030",
  "ca_2026_0031",
  "ca_2026_0032",
  "ca_2026_0033",
  "ca_2026_0034",
  "ca_2026_0035",
  "ca_2026_0036",
  "ca_2026_0037",
  "ca_2026_0038",
  "ca_2026_0039",
  "ca_2026_0040",
  "ca_2026_0041",
  "ca_2026_0042",
  "ca_2026_0043",
  "ca_2026_0044",
  "ca_2026_0045",
  "ca_2026_0046",
  "ca_2026_0047",
  "ca_2026_0048",
  "ca_2026_0049",
  "ca_2026_0053",
  "ca_2026_0056",
  "ca_2026_0057",
  "ca_2026_0058",
  "ca_2026_0059",
  "ca_2026_0060",
  "ca_2026_0064"
];

export const MARATHON_POLITY_IDS: string[] = [
  "pol_01",
  "pol_02",
  "pol_03",
  "pol_04",
  "mpsc_polity_fb_001",
  "mpsc_polity_fb_009",
  "mpsc_polity_fb_010",
  "mpsc_polity_fb_011",
  "polity_101",
  "polity_102",
  "polity_103",
  "polity_104",
  "polity_105",
  "polity_106",
  "polity_107",
  "polity_108",
  "polity_109",
  "polity_110",
  "pol_201",
  "pol_202",
  "pol_203",
  "pr_301",
  "pr_302",
  "pr_303",
  "pr_304",
  "pol_401",
  "pol_402",
  "pol_501",
  "pol_502",
  "pol_601",
  "pol_602",
  "pol_cit_701",
  "pol_cit_702",
  "pol_901",
  "pol_902",
  "pol_emg_1001",
  "pol_emg_1002",
  "pol_duty_1101",
  "pol_art_1201",
  "pol_art_1202",
  "pol_amen_1301",
  "pol_amen_1302",
  "pol_loc_1401",
  "pol_loc_1402",
  "hard_pol_01",
  "hard_pol_02",
  "mpsc_2026_pol_01",
  "mpsc_2026_pol_02",
  "mpsc_2026_pol_03",
  "mpsc_2026_pol_04",
  "mpsc_2026_pol_05",
  "mpsc_2026_pol_06",
  "mpsc_polity_2027_01",
  "mpsc_polity_2027_02",
  "mh_panch_1503",
  "mh_panch_1504",
  "mh_pol_1603",
  "mh_pol_1604",
  "mh_pol_1701",
  "mh_pol_1702",
  "mh_pol_1803",
  "mh_pol_1901",
  "mh_pol_2405",
  "mh_pol_2406",
  "mh_pol_2505",
  "mh_pol_2605",
  "mh_pol_2606",
  "mh_pol_2705",
  "mh_pol_2706",
  "mh_pol_2805",
  "mh_pol_2806",
  "info_rti_2901",
  "info_rti_2902",
  "info_rti_2903",
  "info_it_2904",
  "info_act_2908",
  "info_dpdp_2909",
  "info_rti_3001",
  "info_rti_3002",
  "info_it_3004",
  "info_rts_3005",
  "info_mpsc_3006",
  "info_mpsc_3007",
  "info_gov_3009",
  "info_rti_3010",
  "pyq_combine_26_45",
  "pyq_combine_26_46",
  "pyq_combine_26_51",
  "pyq_combine_26_52",
  "pyq_combine_26_53",
  "pyq_combine_26_54",
  "pyq_combine_26_55",
  "pyq_combine_26_56",
  "pyq_combine_26_57",
  "pyq_combine_26_58",
  "pyq_combine_26_59",
  "pyq_combine_26_60",
  "pyq_combine_26_61",
  "pyq_combine_26_62",
  "pyq_combine_26_63"
];

export const SUBJECT_MARATHON_SETS_CATALOG: SubjectMarathonMeta[] = [
  {
    id: 'marathon_geo_forest',
    patternId: 'marathon_geo_forest_100',
    subjectId: 'maharashtra_geography',
    titleMr: 'फक्त 'महाराष्ट्र भूगोल व वने' १०० प्रश्न मॅरेथॉन',
    titleEn: 'Only 'Maharashtra Geography & Forests' 100 Qs Marathon Paper',
    shortTitleMr: 'महाराष्ट्र भूगोल व वने',
    shortTitleEn: 'MH Geography & Forests',
    badgeMr: '१०० प्रश्न • १०० गुण • ६० मिनिटे',
    badgeEn: '100 Qs • 100 Marks • 60 Mins',
    categoryIcon: 'Trees',
    tagColor: 'emerald',
    bannerGradient: 'from-emerald-600 via-teal-600 to-emerald-700',
    borderColor: 'border-emerald-500/40',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarkRate: 0.25,
    targetCutoff: {
      open: 72,
      obc: 68,
      sc: 64,
      st: 58,
      female: 66,
    },
    syllabusCoverageMr: [
      'महाराष्ट्राची प्राकृतिक रचना: सह्याद्री पर्वतरांग, प्रमुख शिखरे, कोकण (खलाटी-वलाटी), महाराष्ट्र पठार',
      'महाराष्ट्राची नदी प्रणाली: गोदावरी, भीमा, कृष्णा, तापी व कोकणातील नद्या, संगम, धरणे व जलप्रकल्प',
      'हवामान, पर्जन्यमान, मान्सून वितरण व दुष्काळी पट्टे (पर्जन्यछायेचा प्रदेश)',
      'महाराष्ट्र वनसंपत्ती: उष्णकटिबंधीय निम-सदाहरित, आर्द्र व शुष्क पानझडी, काटेरी वने, खारफुटी (ISFR रिपोर्ट)',
      'राष्ट्रीय उद्याने (६) व व्याघ्र प्रकल्प (६): ताडोबा, पेंच, मेळघाट, सह्याद्री, नवेगाव, बोर',
      'वन्यजीव अभयारण्ये, राखीव संवर्धन क्षेत्रे व रामसर पाणथळ स्थळे (नांदूर मध्यमेश्वर, लोणार, ठाणे खाडी)',
      'मृदा प्रकार: काळी/रेगूर मृदा, तांबडी-पिवळसर, जांभी मृदा व क्षारयुक्त मृदा',
      'खनिज संपत्ती (बॉक्साईट, मॅंगनीज, लोहखनिज, कोळसा) व ऊर्जा निर्मिती प्रकल्प (जलविद्युत व औष्णिक)'
    ],
    syllabusCoverageEn: [
      'Physiography of Maharashtra: Sahyadri ranges, high peaks, Konkan relief, Deccan Plateau',
      'Drainage Systems: Godavari, Bhima, Krishna, Tapi, and Konkan west-flowing rivers, dams & confluences',
      'Climate, rainfall distribution, agro-climatic zones, and drought-prone shadow regions',
      'Forest Wealth of Maharashtra: ISFR forest survey, tropical semi-evergreen, moist/dry deciduous, mangroves',
      '6 National Parks & 6 Tiger Reserves: Tadoba, Melghat, Pench, Sahyadri, Nawegaon, Bor',
      'Wildlife Sanctuaries, Ramsar Wetlands (Nandur Madhmeshwar, Lonar crater, Thane Creek)',
      'Soil types: Black regur soil, Laterite soil, alluvial, and red soil distributions',
      'Mineral distribution (Bauxite, Manganese, Coal, Iron ore) & Hydro/Thermal energy stations'
    ],
    keyStrategiesMr: [
      'नकाशाधारित प्रश्नांवर भर द्या - उत्तरेकडून दक्षिणेकडे किंवा पश्चिमेकडून पूर्वेकडे नद्या/घाटांचा क्रम हमखास विचारला जातो.',
      'वन सर्वेक्षण अहवाल (ISFR) नुसार गडचिरोलीत सर्वाधिक वने व लातूरमध्ये सर्वात कमी वने ही आकडेवारी लक्षात ठेवा.',
      '६ राष्ट्रीय उद्याने व ६ व्याघ्र प्रकल्पांचे जिल्हे व त्यांची स्थापना वर्ष वारंवार विचारली जातात.'
    ],
    topicBreakdown: [
      { topicMr: 'प्राकृतिक भूगोल, सह्याद्री व घाट', topicEn: 'Physiography & Sahyadri Passes', questionCount: 22, percentage: 22 },
      { topicMr: 'नदी प्रणाली, संगम व जलप्रकल्प', topicEn: 'Rivers, Confluences & Dams', questionCount: 24, percentage: 24 },
      { topicMr: 'महाराष्ट्र वनसंपत्ती व प्रकार (ISFR)', topicEn: 'Forest Resources & Types', questionCount: 18, percentage: 18 },
      { topicMr: 'राष्ट्रीय उद्याने, व्याघ्र प्रकल्प व रामसर', topicEn: 'Parks, Tiger Reserves & Ramsar', questionCount: 16, percentage: 16 },
      { topicMr: 'हवामान, मान्सून व मृदा प्रकार', topicEn: 'Climate, Rainfall & Soils', questionCount: 12, percentage: 12 },
      { topicMr: 'खनिजे, उद्योग व ऊर्जा प्रकल्प', topicEn: 'Minerals, Industry & Energy', questionCount: 8, percentage: 8 }
    ],
    questionIds: MARATHON_GEO_FOREST_IDS
  },
  {
    id: 'marathon_science',
    patternId: 'marathon_science_100',
    subjectId: 'general_science',
    titleMr: 'फक्त 'सामान्य विज्ञान' १०० प्रश्न मॅरेथॉन',
    titleEn: 'Only 'General Science' 100 Qs Marathon Paper',
    shortTitleMr: 'सामान्य विज्ञान',
    shortTitleEn: 'General Science',
    badgeMr: '१०० प्रश्न • १०० गुण • ६० मिनिटे',
    badgeEn: '100 Qs • 100 Marks • 60 Mins',
    categoryIcon: 'FlaskConical',
    tagColor: 'purple',
    bannerGradient: 'from-purple-600 via-indigo-600 to-purple-700',
    borderColor: 'border-purple-500/40',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarkRate: 0.25,
    targetCutoff: {
      open: 66,
      obc: 62,
      sc: 58,
      st: 52,
      female: 60,
    },
    syllabusCoverageMr: [
      'मानवी शरीरशास्त्र: पचनसंस्था, रक्ताभिसरण (रक्तगट, Rh फॅक्टर), श्वसन, उत्सर्जन, चेतासंस्था व अंतःस्रावी ग्रंथी',
      'रोग, संसर्गजन्य आजार, जिवाणू/विषाणू/आदिजीव, लसीकरण व जीवनसत्त्वे (अभावजन्य रोग)',
      'वनस्पती व प्राणी वर्गीकरण: विटाकरची ५-सृष्टी पद्धती, ब्रायोफायटा, टेरिडोफायटा, अपृष्ठवंशी व पृष्ठवंशी प्राणी',
      'भौतिकशास्त्र: प्रकाश (परावर्तन, अपवर्तन, दृष्टीदोष व भिंग), ध्वनी (वारंवारता, डाॅप्लर परिणाम, सोनार)',
      'गतीचे नियम, कार्य-ऊर्जा, उष्णता, चुंबकत्व, विद्युतधारा (ओहमचा नियम, रोध, ट्रान्सफॉर्मर)',
      'रसायनशास्त्र: अणू रचना (डाल्टन, थॉमसन, रुदरफोर्ड, बोहर), आधुनिक आवर्तसारणी (मोसले)',
      'आम्ल, आम्लारी व क्षार (pH मापन श्रेणी), रोजच्या वापरातील रसायने (खाण्याचा सोडा, धुण्याचा सोडा, पीओपी)',
      'धातू-अधातू, संमिश्रे (पितळ, कासे, स्टेनलेस स्टील) व सेंद्रिय रसायनशास्त्र (हायड्रोकार्बन्स, कार्बन बहुरूपे)',
      'अवकाश व संरक्षण विज्ञान: इस्रो मोहिमा (चांद्रयान, आदित्य-L1, गगनयान) व डीआरडीओ क्षेपणास्त्रे'
    ],
    syllabusCoverageEn: [
      'Human Physiology: Digestive system, circulation (ABO blood groups), respiration, nervous system, glands',
      'Diseases, pathogens (Bacteria, Virus, Protozoa), immunisation, and Vitamin deficiency disorders',
      'Plant & Animal Classification: Whittaker 5-kingdom, Cryptogams, Phanerogams, Invertebrates, Chordates',
      'Physics - Optics (Reflection, refraction, lenses, eye defects), Acoustics (Frequency, Doppler, SONAR)',
      'Mechanics, Newton laws, Gravitation, Work-Energy, Thermodynamics, Ohm's law, electromagnetism',
      'Chemistry - Atomic structure, Modern Periodic Table, valence electrons, periodic trends',
      'Acids, Bases, Salts, pH scale, everyday chemicals (Baking soda, POP, Bleaching powder)',
      'Metals, Non-metals, Alloys (Brass, Bronze, Steel) and Carbon allotropes (Diamond, Graphite, Fullerenes)',
      'Space & Defence Tech: ISRO space programmes (Chandrayaan-3, Aditya-L1) & DRDO missile systems'
    ],
    keyStrategiesMr: [
      'MPSC विज्ञानामध्ये स्टेट बोर्ड ८ वी ते १२ वी व NCERT च्या थेट संकल्पनांवर प्रश्न विचारते.',
      'रोग, त्यांचे कारक (Virus vs Bacteria vs Protozoa) व जीवनसत्त्वांची शास्त्रीय नावे हमखास पाठ असावीत.',
      'भौतिकशास्त्रातील सूत्रांवर आधारित सोपे संख्यात्मक प्रश्न सोडवण्याचा सराव करा.'
    ],
    topicBreakdown: [
      { topicMr: 'मानवी शरीरशास्त्र व पोषण/आरोग्य', topicEn: 'Human Physiology & Health', questionCount: 28, percentage: 28 },
      { topicMr: 'वनस्पती व प्राणी वर्गीकरण (बायोलॉजी)', topicEn: 'Plant & Animal Taxonomy', questionCount: 20, percentage: 20 },
      { topicMr: 'भौतिकशास्त्र (प्रकाश, ध्वनी, गती, विद्युत)', topicEn: 'Physics (Optics, Sound, Electricity)', questionCount: 24, percentage: 24 },
      { topicMr: 'रसायनशास्त्र (अणू, आवर्तसारणी, आम्ल-क्षार)', topicEn: 'Chemistry (Periodic Table, Acids, Salts)', questionCount: 18, percentage: 18 },
      { topicMr: 'अवकाश, संरक्षण व नवनिर्मिती तंत्रज्ञान', topicEn: 'Space, Defence & Emerging Tech', questionCount: 10, percentage: 10 }
    ],
    questionIds: MARATHON_SCIENCE_IDS
  },
  {
    id: 'marathon_current_affairs',
    patternId: 'marathon_current_affairs_100',
    subjectId: 'current_affairs',
    titleMr: 'फक्त 'चालू घडामोडी २०२६-२७' १०० प्रश्न मॅरेथॉन',
    titleEn: 'Only 'Current Affairs 2026-27' 100 Qs Marathon Paper',
    shortTitleMr: 'चालू घडामोडी २०२६-२७',
    shortTitleEn: 'Current Affairs 2026-27',
    badgeMr: '१०० प्रश्न • १०० गुण • ६० मिनिटे',
    badgeEn: '100 Qs • 100 Marks • 60 Mins',
    categoryIcon: 'Sparkles',
    tagColor: 'amber',
    bannerGradient: 'from-amber-600 via-orange-600 to-amber-700',
    borderColor: 'border-amber-500/40',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarkRate: 0.25,
    targetCutoff: {
      open: 74,
      obc: 70,
      sc: 66,
      st: 60,
      female: 68,
    },
    syllabusCoverageMr: [
      'महाराष्ट्र विशेष: मुख्यमंत्री माझी लाडकी बहीण योजना, शक्तिपीठ महामार्ग, मुंबई ट्रान्स हार्बर लिंक (अटल सेतू)',
      'नवी मुंबई आंतरराष्ट्रीय विमानतळ, वाढवण बंदर प्रकल्प, महाराष्ट्र भूषण व राज्य शासन पुरस्कार',
      'राष्ट्रीय घडामोडी: १०६ वी घटनादुरुस्ती (नारी शक्ती वंदन अधिनियम), नवीन फौजदारी कायदे (BNS, BNSS, BSA)',
      'प्रमुख राष्ट्रीय व आंतरराष्ट्रीय पुरस्कार: भारतरत्न, पद्म पुरस्कार, ज्ञानपीठ, ऑस्कर, नोबेल पुरस्कार',
      'क्रीडा: पॅरिस ऑलिम्पिक व पॅरालिम्पिक विजेते, T20 विश्वचषक, राष्ट्रीय खेळ (महाराष्ट्राचे अव्वल स्थान)',
      'बुद्धीबळ (डी. गुकेश, प्रज्ञानंद), खेलो इंडिया युथ गेम्स व राष्ट्रीय क्रीडा पुरस्कार (खेलरत्न, अर्जुन)',
      'आर्थिक घडामोडी: केंद्रीय व महाराष्ट्र अर्थसंकल्प २०२६-२७, जीडीपी वाढ, नीती आयोग निर्देशांक',
      'विज्ञान, तंत्रज्ञान व अंतराळ: इस्रोचे प्रक्षेपण, संरक्षण सराव, जागतिक हवामान परिषदा (COP)',
      'महत्त्वाच्या नियुक्त्या: सरन्यायाधीश, मुख्य निवडणूक आयुक्त, राज्यपाल, कॅग, युपीएससी अध्यक्ष'
    ],
    syllabusCoverageEn: [
      'Maharashtra Focus: Majhi Ladki Bahin Scheme, Shaktipeeth Expressway, Atal Setu (MTHL), Wadhawan Port',
      'Navi Mumbai Airport, Maharashtra Bhushan Awards, state cultural & welfare initiatives',
      'National Legal Reforms: 106th CAA (Nari Shakti Vandan), New Criminal Codes (BNS, BNSS, BSA)',
      'Major Awards: Bharat Ratna, Padma Awards, Jnanpith Award, Nobel Prizes, Oscars, National Film Awards',
      'Sports: Paris Olympics & Paralympics, ICC T20 World Cup, National Games (Maharashtra champions)',
      'Chess champions (D. Gukesh, Praggnanandhaa), Khelo India, Major Dhyan Chand Khel Ratna',
      'Economy: Union & Maharashtra Budget 2026-27, RBI monetary policy, NITI Aayog indices',
      'Science & Defence: ISRO missions, military joint drills, global climate summits (COP)',
      'Key Appointments: Chief Justice of India, Chief Election Commissioner, CAG, Governor of Maharashtra'
    ],
    keyStrategiesMr: [
      'महाराष्ट्राशी संबंधित योजना, आकडेवारी व पुरस्कारार्थींवर MPSC विशेष भर देते.',
      'ऑलिम्पिक व पॅरालिम्पिकमधील महाराष्ट्राच्या खेळाडूंची नावे व पदके अचूक लक्षात ठेवा.',
      'नवीन कायदे व घटनादुरुस्ती संदर्भातील कलमे आणि तारखा अतिशय महत्त्वाच्या ठरतात.'
    ],
    topicBreakdown: [
      { topicMr: 'महाराष्ट्र विशेष घडामोडी व शासकीय योजना', topicEn: 'Maharashtra Govt Schemes & Focus', questionCount: 26, percentage: 26 },
      { topicMr: 'पुरस्कार, सन्मान व साहित्य (पद्म, नोबेल, ज्ञानपीठ)', topicEn: 'Awards & Honors (Padma, Nobel, Jnanpith)', questionCount: 20, percentage: 20 },
      { topicMr: 'क्रीडा विश्व (ऑलिम्पिक, टी२०, राष्ट्रीय खेळ)', topicEn: 'Sports (Olympics, T20, National Games)', questionCount: 20, percentage: 20 },
      { topicMr: 'राष्ट्रीय कायदे, घटनादुरुस्ती व कल्याणकारी योजना', topicEn: 'National Laws, Amendments & Policies', questionCount: 16, percentage: 16 },
      { topicMr: 'अर्थव्यवस्था, पर्यावरण व पायाभूत प्रकल्प', topicEn: 'Economy, Infrastructure & Environment', questionCount: 10, percentage: 10 },
      { topicMr: 'महत्त्वाच्या राष्ट्रीय-आंतरराष्ट्रीय नियुक्त्या', topicEn: 'Major Appointments & Dignitaries', questionCount: 8, percentage: 8 }
    ],
    questionIds: MARATHON_CURRENT_AFFAIRS_IDS
  },
  {
    id: 'marathon_polity',
    patternId: 'marathon_polity_100',
    subjectId: 'polity',
    titleMr: 'फक्त 'भारतीय राज्यव्यवस्था' १०० प्रश्न मॅरेथॉन',
    titleEn: 'Only 'Indian Polity & Panchayati Raj' 100 Qs Marathon Paper',
    shortTitleMr: 'भारतीय राज्यव्यवस्था व पंचायतराज',
    shortTitleEn: 'Indian Polity & Governance',
    badgeMr: '१०० प्रश्न • १०० गुण • ६० मिनिटे',
    badgeEn: '100 Qs • 100 Marks • 60 Mins',
    categoryIcon: 'Landmark',
    tagColor: 'blue',
    bannerGradient: 'from-blue-600 via-cyan-600 to-blue-700',
    borderColor: 'border-blue-500/40',
    totalQuestions: 100,
    totalMarks: 100,
    durationMinutes: 60,
    negativeMarkRate: 0.25,
    targetCutoff: {
      open: 76,
      obc: 72,
      sc: 68,
      st: 62,
      female: 70,
    },
    syllabusCoverageMr: [
      'संविधान निर्मिती: घटना समिती, मसुदा समिती (डॉ. बाबासाहेब आंबेडकर), स्रोत, उद्देशपत्रिका (Preamble)',
      'मूलभूत हक्क (कलम १२-३५): समतेचा हक्क, स्वातंत्र्याचा हक्क, शोषणाविरुद्ध, धार्मिक स्वातंत्र्य, घटनात्मक उपाय (५ रिट्स)',
      'मार्गदर्शक तत्त्वे (कलम ३६-५१): समाजवादी, गांधीवादी व उदारमतवादी तत्त्वे, मूलभूत कर्तव्ये (कलम ५१A - ११ कर्तव्ये)',
      'केंद्रीय कार्यकारी मंडळ: राष्ट्रपती (निवडणूक, महाभियोग, अधिकार), उपराष्ट्रपती, पंतप्रधान व केंद्रीय मंत्रिमंडळ',
      'संसद: लोकसभा, राज्यसभा, विधेयक मंजुरी प्रक्रिया, धनविधेयक (कलम ११०), संयुक्त बैठक, संसदीय समित्या',
      'सर्वोच्च न्यायालय व उच्च न्यायालये: न्यायाधीश नियुक्ती, न्यायालयीन पुनर्विलोकन, मूळ व अपीलीय अधिकारिता',
      'राज्य शासन: राज्यपाल (अधिकार, स्वेच्छाधीन अधिकार), मुख्यमंत्री, विधानसभा व विधानपरिषद (कलम १६९)',
      'स्थानिक स्वराज्य संस्था: ७३ वी घटनादुरुस्ती (ग्रामपंचायत, पं. स., जि. प.), ७४ वी दुरुस्ती (नगरपालिका, मनपा), पेसा कायदा',
      'घटनात्मक व वैधानिक संस्था: निवडणूक आयोग (कलम ३२४), वित्त आयोग (२८०), CAG (१४८), MPSC/UPSC (३१५)',
      'प्रमुख घटनादुरुस्त्या: ४२ वी, ४४ वी, ५२ वी (पक्षान्तर बंदी), ७३ वी, ८६ वी (शिक्षणाचा हक्क), १०३ वी (EWS), १०६ वी'
    ],
    syllabusCoverageEn: [
      'Constituent Assembly: Drafting Committee, sources of Constitution, Preamble & Basic Structure doctrine',
      'Fundamental Rights (Art 12-35): Equality, Freedom, Against Exploitation, Religion, Writs under Art 32',
      'Directive Principles of State Policy (Art 36-51) & Fundamental Duties (Art 51A - 11 Duties)',
      'Union Executive: President of India (Election, Impeachment, Veto, Pardon), Vice President, Prime Minister',
      'Parliament: Lok Sabha, Rajya Sabha, Legislative procedure, Money Bill (Art 110), Joint Sitting, PAC/Estimates',
      'Judiciary: Supreme Court of India, Collegium system, Judicial Review, High Courts & Subordinate Courts',
      'State Government: Governor powers, Chief Minister, Vidhan Sabha & Vidhan Parishad creation/abolition',
      'Panchayati Raj & Urban Local Bodies: 73rd & 74th Amendments, Gram Sabha, 50% reservation in MH, PESA 1996',
      'Constitutional Bodies: Election Commission, Finance Commission, CAG, UPSC & MPSC, National Commissions',
      'Landmark Amendments: 42nd (Mini Constitution), 44th, 52nd (Anti-defection), 86th, 103rd, 106th CAA'
    ],
    keyStrategiesMr: [
      'मूलभूत हक्क (भाग ३) आणि मार्गदर्शक तत्त्वे (भाग ४) मधील कलमे तंतोतंत पाठ असणे आवश्यक आहे.',
      'महाराष्ट्रातील पंचायत राज रचनेत ५०% महिला आरक्षण आणि व्ही. पी. नाईक समितीच्या शिफारशींवर प्रश्न येतात.',
      'संसदीय समित्या (लोकलेखा, अंदाज, सार्वजनिक उपक्रम) व त्यांचे अध्यक्ष यांच्यावरील नियम काळजीपूर्वक वाचा.'
    ],
    topicBreakdown: [
      { topicMr: 'मूलभूत हक्क, मार्गदर्शक तत्त्वे व कर्तव्ये', topicEn: 'FRs, DPSPs & Fundamental Duties', questionCount: 26, percentage: 26 },
      { topicMr: 'संसद, कायदेप्रक्रिया व संसदीय समित्या', topicEn: 'Parliament, Bills & Committees', questionCount: 22, percentage: 22 },
      { topicMr: 'स्थानिक स्वराज्य व पंचायतराज (७३-७४ वी दुरुस्ती)', topicEn: 'Local Self Govt & Panchayati Raj', questionCount: 18, percentage: 18 },
      { topicMr: 'संघ व राज्य कार्यकारी मंडळ (राष्ट्रपती, राज्यपाल)', topicEn: 'Union & State Executive', questionCount: 16, percentage: 16 },
      { topicMr: 'न्यायव्यवस्था (सर्वोच्च व उच्च न्यायालये)', topicEn: 'Judiciary (Supreme & High Courts)', questionCount: 10, percentage: 10 },
      { topicMr: 'संविधान निर्मिती, आयोग व घटनादुरुस्त्या', topicEn: 'Constituent Assembly & Amendments', questionCount: 8, percentage: 8 }
    ],
    questionIds: MARATHON_POLITY_IDS
  }
];

export function getSubjectMarathonMeta(idOrPattern: string): SubjectMarathonMeta | undefined {
  return SUBJECT_MARATHON_SETS_CATALOG.find(
    (item) => item.id === idOrPattern || item.patternId === idOrPattern
  );
}

export function getSubjectMarathonQuestions(
  patternIdOrMarathonId: string,
  pool?: Question[]
): Question[] {
  const meta = getSubjectMarathonMeta(patternIdOrMarathonId);
  const activePool = pool && pool.length > 0 ? pool : MPSC_QUESTIONS;
  
  if (!meta) {
    return activePool.slice(0, 100);
  }

  const poolMap = new Map<string, Question>();
  activePool.forEach((q) => {
    if (q && q.id) poolMap.set(q.id, q);
  });

  const selectedQuestions: Question[] = [];
  const selectedIds = new Set<string>();

  // 1. First retrieve curated questions in order
  for (const id of meta.questionIds) {
    const q = poolMap.get(id);
    if (q && !selectedIds.has(q.id)) {
      selectedIds.add(q.id);
      selectedQuestions.push(q);
    }
  }

  // 2. If pool does not have all 100 (e.g. filtered pool), fill from active pool matching subject
  if (selectedQuestions.length < 100) {
    const subjectFallbacks = activePool.filter((q) => {
      if (selectedIds.has(q.id)) return false;
      if (meta.id === 'marathon_geo_forest') {
        return q.subjectId === 'maharashtra_geography' || q.subjectId === 'environment';
      }
      if (meta.id === 'marathon_science') {
        return q.subjectId === 'general_science';
      }
      if (meta.id === 'marathon_current_affairs') {
        return q.subjectId === 'current_affairs';
      }
      if (meta.id === 'marathon_polity') {
        return q.subjectId === 'polity';
      }
      return false;
    });

    for (const fb of subjectFallbacks) {
      if (selectedQuestions.length >= 100) break;
      selectedIds.add(fb.id);
      selectedQuestions.push(fb);
    }
  }

  return selectedQuestions.slice(0, 100);
}
