// ============================================================================
// MPSC PORTAL EARNING & MONETIZATION MASTER DATASET
// Complete earning guide, revenue pillars, projection calculator,
// Telegram/WhatsApp broadcast strategies, and UPI payment support.
// ============================================================================

export interface EarningPillar {
  id: string;
  titleMr: string;
  titleEn: string;
  categoryMr: string;
  categoryEn: string;
  potentialMonthlyMr: string;
  potentialMonthlyEn: string;
  commissionOrCpmMr: string;
  commissionOrCpmEn: string;
  difficultyLevel: 'easy' | 'medium' | 'advanced';
  icon: string;
  badgeColor: string;
  summaryMr: string;
  summaryEn: string;
  actionStepsMr: string[];
  actionStepsEn: string[];
  proTipsMr: string[];
  proTipsEn: string[];
}

export interface RevenueProjectionTier {
  tierNameMr: string;
  tierNameEn: string;
  monthlyVisitors: number;
  dailyActiveStudents: number;
  estimatedAdSenseEarnings: number; // in INR
  estimatedAffiliateBookSales: number; // books count
  estimatedAffiliateEarnings: number; // in INR
  estimatedGearAndOtherSales: number; // in INR
  totalMonthlyEarnings: number; // in INR
  totalAnnualEarnings: number; // in INR
  keyPrerequisiteMr: string;
}

export interface TelegramMonetizationStrategy {
  strategyTitleMr: string;
  strategyTitleEn: string;
  postTemplateMr: string;
  postTemplateEn: string;
  recommendedTimeMr: string;
  expectedConversionMr: string;
  proTipsMr: string;
}

// ----------------------------------------------------------------------------
// 1. FIVE MASTER PILLARS OF PORTAL EARNINGS
// ----------------------------------------------------------------------------
export const EARNING_PILLARS_DATA: EarningPillar[] = [
  {
    id: 'amazon_associates',
    titleMr: 'अ‍ॅमेझॉन ॲफिलिएट (Amazon Associates India)',
    titleEn: 'Amazon Associates India (Books & Study Gear)',
    categoryMr: 'पुस्तके व अभ्यास साहित्य कमिशन',
    categoryEn: 'Books & Study Gear Affiliate',
    potentialMonthlyMr: '₹१५,००० ते ₹६०,००० / महिना',
    potentialMonthlyEn: '₹15,000 to ₹60,000 / month',
    commissionOrCpmMr: '५% ते १०% थेट कमिशन दर',
    commissionOrCpmEn: '5% to 10% direct commission',
    difficultyLevel: 'easy',
    icon: '📦',
    badgeColor: 'border-amber-500/60 bg-amber-500/10 text-amber-300',
    summaryMr:
      'MPSC परीक्षार्थी दरमहा किमान १ ते ३ संदर्भ पुस्तके (उदा. लक्ष्मीकांत, सौदी, कोळंबे, वाळंबे) आणि OMR शीट्स खरेदी करतात. तुमच्या ॲपमधील खरेदी लिंकवरून त्यांनी पुस्तक घेतल्यास ५% ते ८% आणि स्टडी गियरवर ९% कमिशन थेट बँक खात्यात जमा होते.',
    summaryEn:
      'Every MPSC student buys 1-3 reference books and OMR pads monthly. When they purchase via your app\'s links, 5% to 10% commission is credited directly to your bank account via NEFT.',
    actionStepsMr: [
      'affiliate-program.amazon.in वर मोफत ॲफिलिएट खाते उघडा.',
      'तुमचा ट्रॅकिंग टॅग (उदा. "mpscaspirant-21") ॲपमधील ॲफिलिएट सेटिंग्समध्ये सेव्ह करा.',
      'तुमच्या पोर्टलच्या पुस्तकांच्या लिंकवर २४ तासांचा कुकी नियम लागू होतो (विद्यार्थ्याने पुस्तक विकत घेताना लॅपटॉप किंवा बॅग घेतली तरी त्यावरही तुम्हाला पूर्ण कमिशन मिळते!).',
      'दरमहा किमान ₹१,०००/- झाल्यावर Amazon थेट तुमच्या बँक खात्यात पैसे पाठवते.'
    ],
    actionStepsEn: [
      'Register free at affiliate-program.amazon.in using your Amazon account.',
      'Enter your unique Associate Tag in this portal\'s settings tab.',
      'Leverage the 24-hour cookie window (earn commission even if user buys electronics, bags, or stationery).',
      'Automated monthly NEFT transfer to your bank once earnings cross ₹1,000 threshold.'
    ],
    proTipsMr: [
      'ज्या वेळी नवीन परीक्षा जाहिरात येते (उदा. कम्बाईन किंवा राज्यसेवा), त्या आठवड्यात बुकशेल्फची लिंक टेलिग्राम व व्हॉट्सॲपवर शेअर करा; या काळात विक्री ३ पट वाढते!',
      'पुस्तकांवर Amazon ची मूळ २०-३०% सवलत विद्यार्थ्यांना मिळत असल्याने विद्यार्थी आनंदाने खरेदी करतात.'
    ],
    proTipsEn: [
      'Spike alert: Share book links during new MPSC notification release weeks; book sales surge 3x.',
      'Students get Amazon\'s 20-30% discount, making it a win-win proposition.'
    ]
  },
  {
    id: 'google_adsense',
    titleMr: 'गूगल ॲडसेन्स जाहिराती (Google AdSense)',
    titleEn: 'Google AdSense (Display, In-Feed & Anchor Ads)',
    categoryMr: 'वेबसाईट ट्रॅफिक व जाहिराती (CPC / CPM)',
    categoryEn: 'Display Advertising (CPC / CPM)',
    potentialMonthlyMr: '₹१०,००० ते ₹४५,००० / महिना',
    potentialMonthlyEn: '₹10,000 to ₹45,000 / month',
    commissionOrCpmMr: '₹४० ते ₹१२० प्रति १००० इंप्रेशन्स (CPM)',
    commissionOrCpmEn: '₹40 to ₹120 per 1,000 impressions',
    difficultyLevel: 'easy',
    icon: '📊',
    badgeColor: 'border-blue-500/60 bg-blue-500/10 text-blue-300',
    summaryMr:
      'पोर्टलवर विद्यार्थी दररोज प्रश्नपत्रिका सोडवण्यासाठी १० ते ३० मिनिटे घालवतात. या दीर्घ वेळेमुळे (High Session Duration) Google AdSense चे जाहिरात इंप्रेशन्स आणि CTR अतिशय जास्त राहतात.',
    summaryEn:
      'Students spend 10-30 minutes per session solving mock exams and reading notes. High session duration yields premium CPM rates and high viewability.',
    actionStepsMr: [
      'google.com/adsense वर जाऊन तुमच्या वेबसाईट डोमेनसाठी अर्ज करा.',
      'पोर्टलच्या ॲडसेन्स मॅनेजरमध्ये तुमचा Publisher ID (pub-xxxxxxxxxxxx) टाका.',
      'हेडर बॅनर, रिझल्ट पेज आणि इन-फीड जाहिराती आपोआप सुरू होतील.',
      '$100 (सुमारे ₹८,५००/-) पूर्ण झाल्यावर Google थेट दरमहा २१ ते २६ तारखेला बँक खात्यात पैसे ट्रान्सफर करते.'
    ],
    actionStepsEn: [
      'Apply with your custom domain at google.com/adsense.',
      'Save your Publisher ID in the portal\'s AdSense Space Manager.',
      'Header Leaderboards, Exam Screen interstitial, and In-Feed native units activate automatically.',
      'Threshold payout ($100 / ~₹8,500) wired directly to your bank account monthly between 21st-26th.'
    ],
    proTipsMr: [
      'परीक्षेच्या काळात जेव्हा विद्यार्थी सराव चाचण्या जास्त सोडवतात, तेव्हा AdSense ची कमाई दुप्पट होते.',
      'अनावश्यक जाहिरातींचा मारा करू नका; दर्जेदार अभ्यासाचा अनुभव ठेवा जेणेकरून विद्यार्थी रोज पुन्हा येतील.'
    ],
    proTipsEn: [
      'Ad revenue doubles during peak exam seasons due to surge in daily mock attempts.',
      'Maintain clean UI density so students return daily without distraction.'
    ]
  },
  {
    id: 'direct_upi_support',
    titleMr: 'थेट UPI सपोर्ट व गुरू-दक्षिणा देणगी (Direct UPI Tips)',
    titleEn: 'Direct UPI Student Support & Voluntary Donation',
    categoryMr: 'थेट बँक खात्यात शून्य टक्के कपात',
    categoryEn: 'Zero Commission Direct UPI Receipts',
    potentialMonthlyMr: '₹५,००० ते ₹२५,००० / महिना',
    potentialMonthlyEn: '₹5,000 to ₹25,000 / month',
    commissionOrCpmMr: '१००% रक्कम थेट तुमच्या खात्यात (0% कपात)',
    commissionOrCpmEn: '100% direct credit to your bank',
    difficultyLevel: 'easy',
    icon: '📱',
    badgeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
    summaryMr:
      'अनेक कृतज्ञ विद्यार्थी मोफत सराव आणि १००,०००+ प्रश्न बँकेमुळे पोर्टलला स्वेच्छेने ₹२९, ₹४९ किंवा ₹९९ चे सहकार्य (Tip/Donation) करतात. कोणत्याही गेटवे कमिशनशिवाय थेट तुमच्या Google Pay / PhonePe वर पैसे जमा होतात.',
    summaryEn:
      'Grateful aspirants frequently contribute small voluntary tips (₹29, ₹49, ₹99) to keep the portal server active. Zero payment gateway cuts — 100% hits your UPI bank account.',
    actionStepsMr: [
      'खालील UPI सेटिंग्समध्ये तुमचा PhonePe/GooglePay UPI आयडी (उदा. youremail@okaxis किंवा mobile@ybl) प्रविष्ट करा.',
      'पोर्टलवर विद्यार्थ्यांसाठी सुंदर QR कोड व "सपोर्ट करा" कार्ड सक्रिय होईल.',
      'विद्यार्थी थेट ॲपवरून स्कॅन करून रक्कम पाठवतील जी एका सेकंदात तुमच्या खात्यात येईल.'
    ],
    actionStepsEn: [
      'Enter your active UPI ID (e.g. yourname@oksbi or phone@ybl) in the Direct Support setting below.',
      'Portal displays an instant QR code card inviting students to support free education.',
      'Funds reflect immediately in your primary bank account.'
    ],
    proTipsMr: [
      'निकाल जाहीर झाल्यावर जेव्हा विद्यार्थी पास होतात, तेव्हा ते आनंदाने देणगी देतात!',
      'किमान ₹२९ किंवा ₹४९ चा छोटा पर्याय ठेवल्यास जास्तीत जास्त विद्यार्थी सहकार्य करतात.'
    ],
    proTipsEn: [
      'Post-result celebrations trigger peak voluntary donations.',
      'Keep micro-contribution options (₹29 / ₹49) to maximize volume.'
    ]
  },
  {
    id: 'coaching_sponsorship',
    titleMr: 'पुणे-मुंबई स्पर्धा परीक्षा क्लासेस प्रायोजकत्व (Academy Sponsorships)',
    titleEn: 'Coaching Academy Sponsored Banners & Test Series',
    categoryMr: 'स्थानिक क्लासेस पार्टनरशिप्स',
    categoryEn: 'Sponsored Institutional Tie-ups',
    potentialMonthlyMr: '₹२०,००० ते ₹७५,००० / महिना',
    potentialMonthlyEn: '₹20,000 to ₹75,000 / month',
    commissionOrCpmMr: '₹५,००० ते ₹१५,००० प्रति क्लास/महिना फिक्स',
    commissionOrCpmEn: '₹5,000 to ₹15,000 fixed per academy/month',
    difficultyLevel: 'medium',
    icon: '🏛️',
    badgeColor: 'border-purple-500/60 bg-purple-500/10 text-purple-300',
    summaryMr:
      'पुणे (सदाशिव पेठ/नवी पेठ), औरंगाबाद, कोल्हापूर आणि नाशिकमधील नामवंत MPSC अकॅडमींना नवीन बॅचेससाठी विद्यार्थी हवे असतात. तुमच्या पोर्टलवर त्यांच्या बॅचचे बॅनर किंवा विशेष टेस्ट सिरीज लावून तुम्ही निश्चित मासिक मानधन मिळवू शकता.',
    summaryEn:
      'Top MPSC coaching centers in Pune, Chhatrapati Sambhajinagar, and Kolhapur pay top dollar for direct access to serious aspirants. Place their banner or sponsored test series for fixed monthly retainer fees.',
    actionStepsMr: [
      'पोर्टलवरील दैनिक सक्रिय विद्यार्थ्यांचा (Daily Active Users) स्क्रिनशॉट तयार करा.',
      'क्लासेसच्या संचालकांशी संपर्क साधून "MPSC Aspirant Portal Banner Space" ची ऑफर द्या.',
      'ॲपमधील कस्टम बॅनर स्लॉटमध्ये त्यांच्या ॲडमिशन चौकशीची लिंक (Google Form / WhatsApp) जोडा.'
    ],
    actionStepsEn: [
      'Capture your active student engagement metrics.',
      'Pitch local academy directors with exclusive portal banner sponsorships.',
      'Host direct lead forms linking to their WhatsApp admission desk.'
    ],
    proTipsMr: [
      'नवीन बॅचेस सुरू होण्याच्या महिन्यात (जानेवारी, जून आणि ऑक्टोबर) क्लासेस जाहिरातींवर भरपूर खर्च करतात.'
    ],
    proTipsEn: [
      'Academy admission cycles peak during January, June, and October.'
    ]
  },
  {
    id: 'telegram_whatsapp_broadcast',
    titleMr: 'टेलिग्राम व व्हॉट्सॲप चॅनेल ब्रॉडकास्ट (Channel Monetization)',
    titleEn: 'Telegram & WhatsApp Community Monetization',
    categoryMr: 'सोशल मीडिया ट्रॅफिक ड्राईव्ह व रोजची कमाई',
    categoryEn: 'Community Traffic Funneling',
    potentialMonthlyMr: '₹१०,००० ते ₹३५,००० / महिना',
    potentialMonthlyEn: '₹10,000 to ₹35,000 / month',
    commissionOrCpmMr: 'दैनिक ॲफिलिएट क्लिक्स व सराव लिंक',
    commissionOrCpmEn: 'Daily affiliate links + study drives',
    difficultyLevel: 'easy',
    icon: '🚀',
    badgeColor: 'border-rose-500/60 bg-rose-500/10 text-rose-300',
    summaryMr:
      'दररोज सकाळी आणि संध्याकाळी ५ चालू घडामोडी प्रश्न व सोबत ‘पुस्तकाची थेट लिंक’ टेलिग्राम किंवा व्हॉट्सॲप चॅनेलवर शेअर करा. विद्यार्थी टेस्ट सोडवण्यासाठी पोर्टलवर येतात आणि पुस्तके खरेदी करतात.',
    summaryEn:
      'Post daily morning & evening 5-question quick teasers with book purchase recommendations on your Telegram / WhatsApp community to funnel daily recurring affiliate revenue.',
    actionStepsMr: [
      'तुमचा "MPSC सारथी / MPSC Aspirant" टेलिग्राम चॅनेल सुरू करा.',
      'पोर्टलच्या "शेअर प्रश्न" बटणाने रोज ३ महत्त्वाचे प्रश्न चॅनेलवर पोस्ट करा.',
      'प्रश्नाच्या शेवटी "या विषयाचे सर्वोत्तम पुस्तक येथे सवलतीत उपलब्ध:" अशी तुमची ॲफिलिएट लिंक जोडा.'
    ],
    actionStepsEn: [
      'Set up your dedicated Telegram channel & WhatsApp announcement group.',
      'Share 3 daily high-frequency questions using the portal share utility.',
      'Append your Amazon book link with "Get recommended standard book with 25% discount here".'
    ],
    proTipsMr: [
      'दररोज नियमित २ पोस्ट करणाऱ्या चॅनेलची विक्री कधीही थांबत नाही; ती चक्रवाढ व्याजाप्रमाणे वाढत जाते!'
    ],
    proTipsEn: [
      'Consistency is king: 2 posts daily compounds student trust and repeat purchasing.'
    ]
  },
  {
    id: 'paid_test_pass',
    titleMr: 'सशुल्क सराव चाचणी प्रो पास (MPSC Test Pass & QR Payments)',
    titleEn: 'Premium Test Series Pass & Direct UPI Revenue',
    categoryMr: 'थेट डिजिटल सबस्क्रिप्शन (१००% नफा)',
    categoryEn: 'Digital Test Series Subscription',
    potentialMonthlyMr: '₹२५,००० ते ₹९०,००० / महिना',
    potentialMonthlyEn: '₹25,000 to ₹90,000 / month',
    commissionOrCpmMr: '१००% थेट तुमच्या UPI वर (₹४९ किंवा ₹९९ प्रति विद्यार्थी)',
    commissionOrCpmEn: '100% direct revenue (₹49 - ₹99 per student)',
    difficultyLevel: 'easy',
    icon: '🎟️',
    badgeColor: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300',
    summaryMr:
      'विद्यार्थ्यांना १००,०००+ प्रश्नांची पूर्ण विश्लेषण चाचणी, राज्यसेवा व कम्बाईन फुल-लेंथ ५० टेस्ट्स सोडवण्यासाठी केवळ ₹४९ किंवा ₹९९ चा मासिक "MPSC सराव प्रो पास" ऑफर करा. एका महिन्यात ५०० विद्यार्थ्यांनी पास घेतला तरी ₹४९,५००/- थेट नफा!',
    summaryEn:
      'Offer students a nominal ₹49 or ₹99 "MPSC Test Pass" to unlock 50+ full-length exam simulations and advanced rank analytics. 500 subscriptions generate ₹49,500/month with zero recurring production cost.',
    actionStepsMr: [
      'ॲपमध्ये तुमचा PhonePe/GooglePay UPI QR कोड सक्रिय ठेवा.',
      'विद्यार्थ्यांना "फक्त ₹४९ मध्ये १ वर्षभर अमर्याद सराव चाचण्या" अशी ऑफर द्या.',
      'पेमेंटचा स्क्रीनशॉट व्हॉट्सॲपवर पाठवताच त्यांचा प्रो पास सक्रिय करा किंवा ऑटोमॅटिक अनलॉक कोड द्या.'
    ],
    actionStepsEn: [
      'Activate your PhonePe/Google Pay UPI QR in the direct collection box.',
      'Launch "Unlimited MPSC Mock Drill for 1 Year at ₹49" promotional campaign.',
      'Verify student payment screenshot on WhatsApp and grant instant premium access.'
    ],
    proTipsMr: [
      'परीक्षेच्या १ महिना आधी (हॉलतिकीट आल्यावर) या पासची मागणी १० पटीने वाढते; या काळात विशेष "हॉलतिकीट डिस्काउंट" ठेवा.'
    ],
    proTipsEn: [
      'Spike alert: Subscriptions skyrocket 10x once official MPSC exam hall tickets are released.'
    ]
  },
  {
    id: 'handwritten_micro_notes',
    titleMr: 'टॉपर्स हँडरायटिंग मायक्रो-नोट्स ई-स्टोअर (Digital PDF Notes)',
    titleEn: 'Toppers Handwritten Micro-Notes & Mind-Maps Store',
    categoryMr: 'डिजिटल ई-बुक्स व इन्स्टंट डाऊनलोड्स',
    categoryEn: 'Digital PDF Notes & Mind-Maps',
    potentialMonthlyMr: '₹१५,००० ते ₹५५,००० / महिना',
    potentialMonthlyEn: '₹15,000 to ₹55,000 / month',
    commissionOrCpmMr: '१००% नफा (₹१९ ते ₹३९ प्रति PDF बंडल)',
    commissionOrCpmEn: '100% margin (₹19 - ₹39 per PDF bundle)',
    difficultyLevel: 'easy',
    icon: '📝',
    badgeColor: 'border-cyan-500/60 bg-cyan-500/10 text-cyan-300',
    summaryMr:
      'राज्यघटना कलमे चार्ट, पंचायतराज समित्या तक्ते, महाराष्ट्रातील समाजसुधारक मायक्रो-नोट्स आणि विज्ञानाचे शॉर्ट ट्रिक्स PDF बंडल ₹१९ ते ₹२९ च्या नाममात्र दरात विका. डिजिटल उत्पादन असल्याने एकदाच तयार करायचे आणि लाखो वेळा विकायचे!',
    summaryEn:
      'Package quick-revision PDF mind maps (Constitution Articles, Social Reformers matrix, Panchayati Raj comparison charts) at micro-pricing of ₹19-₹29. Zero inventory, zero shipping, 100% pure profit.',
    actionStepsMr: [
      'तुमच्या पोर्टलवरील उच्च दर्जाच्या डेटाचे (उदा. पंचायत राज तक्ता, समाजसुधारक) सुबक PDF बनवा.',
      'पोर्टलवर "PDF डाऊनलोड स्टोअर" मध्ये ₹१९ ची किंमत ठेवा.',
      'पेमेंट होताच ऑटोमॅटिक PDF डाऊनलोड लिंक किंवा व्हॉट्सॲपवर फाइल पाठवा.'
    ],
    actionStepsEn: [
      'Export high-yield portal study tables (Panchayati Raj, Reformers) into sleek PDF sheets.',
      'List on the portal notes shelf with micro-pricing of ₹19.',
      'Automate instant PDF download upon UPI confirmation.'
    ],
    proTipsMr: [
      'विद्यार्थी ₹२०-३० ची रक्कम विचार न करता लगेच खर्च करतात; दररोज २० विद्यार्थ्यांनी डाऊनलोड केले तरी दरमहा ₹१८,०००/- ची सहज कमाई होते!'
    ],
    proTipsEn: [
      'Frictionless micro-pricing: Students don\'t hesitate for ₹19. 20 downloads daily generates ₹18,000 monthly.'
    ]
  },
  {
    id: 'play_store_admob',
    titleMr: 'Google Play Store ॲप व AdMob व्हिडिओ ॲड्स (Android App)',
    titleEn: 'Google Play Store App Launch & AdMob Rewarded Ads',
    categoryMr: 'अँड्रॉइड ॲप जाहिराती (eCPM & Interstitial)',
    categoryEn: 'Android App Monetization (eCPM)',
    potentialMonthlyMr: '₹३०,००० ते ₹१,२०,००० / महिना',
    potentialMonthlyEn: '₹30,000 to ₹1,20,000 / month',
    commissionOrCpmMr: '₹८० ते ₹२५० प्रति १००० व्हिडिओ व्ह्यूज (eCPM)',
    commissionOrCpmEn: '₹80 - ₹250 eCPM per 1,000 impressions',
    difficultyLevel: 'medium',
    icon: '📲',
    badgeColor: 'border-indigo-500/60 bg-indigo-500/10 text-indigo-300',
    summaryMr:
      'या पोर्टलचे TWA (Trusted Web Activity) किंवा PWA द्वारे Google Play Store वर Android ॲप बनवा. Google AdMob च्या Rewarded Video ॲड्स (उदा. "टेस्टचे स्पष्टीकरण पाहण्यासाठी ५ सेकंद ॲड पाहा") द्वारे ॲडसेन्सपेक्षा तिप्पट eCPM मिळतो.',
    summaryEn:
      'Package this responsive portal as an Android App via PWA/TWA on Google Play Store. Implement Google AdMob rewarded video ads (e.g., watch a 5-sec sponsor clip to unlock 10 bonus questions) for 3x higher eCPM than mobile web.',
    actionStepsMr: [
      'PWABuilder.com वापरून या पोर्टलची Android APK / AAB फाईल १० मिनिटांत तयार करा.',
      'Google Play Console वर ($25 वन-टाइम फी) ॲप पब्लिश करा.',
      'AdMob खाते जोडून चाचणी संपल्यानंतर ५ सेकंदाची इंटरस्टिशियल जाहिरात लावा.'
    ],
    actionStepsEn: [
      'Generate Android AAB bundle using PWABuilder.com in 10 minutes.',
      'Publish to Google Play Store via Google Play Console.',
      'Integrate Google AdMob interstitial units between completed quiz sessions.'
    ],
    proTipsMr: [
      'Play Store वर "MPSC प्रश्नसंच सराव" असे कीवर्ड्स शोधून हजारो विद्यार्थी ॲप मोफत डाऊनलोड करतात, यामुळे ट्रॅफिकसाठी जाहिरात खर्च करावा लागत नाही.'
    ],
    proTipsEn: [
      'Organic Play Store ASO generates thousands of free active students without ad spend.'
    ]
  },
  {
    id: 'youtube_mpsc_shorts',
    titleMr: 'YouTube MPSC शॉर्ट्स व कम्युनिटी पोस्ट्स (Video Monetization)',
    titleEn: 'YouTube MPSC Shorts & Community Revenue Engine',
    categoryMr: 'व्हिडिओ व्ह्यूज, शॉर्ट्स फंड व स्पॉन्सरशिप',
    categoryEn: 'Video Views & Creator Sponsorships',
    potentialMonthlyMr: '₹२०,००० ते ₹७०,००० / महिना',
    potentialMonthlyEn: '₹20,000 to ₹70,000 / month',
    commissionOrCpmMr: 'YouTube AdSense + स्पॉन्सरशिप + बायो मधील ॲफिलिएट लिंक्स',
    commissionOrCpmEn: 'AdSense + Brand sponsorships + bio links',
    difficultyLevel: 'medium',
    icon: '🎥',
    badgeColor: 'border-red-500/60 bg-red-500/10 text-red-300',
    summaryMr:
      'पोर्टलवरील महत्त्वाच्या प्रश्नांचे आणि ट्रिक्सचे दररोज १-२ साठ-सेकंदाचे शॉर्ट्स (Shorts) तयार करा. व्हिडिओच्या पहिल्या कमेंटमध्ये व चॅनेलच्या बायोमध्ये पोर्टलची लिंक व पुस्तकांची ॲमेझॉन लिंक जोडा. एकाच व्हायरल शॉर्ट्सवरून लाखो व्ह्यूज आणि शेकडो पुस्तक विक्री होते.',
    summaryEn:
      'Create 60-second shorts featuring tricky MPSC questions and elimination tips. Pin your portal link and Amazon book referral in the top comment. A single viral short with 100k views delivers instant student surge.',
    actionStepsMr: [
      '"MPSC कट्टा" किंवा "स्पर्धा परीक्षा मंत्र" नावाने YouTube चॅनेल सुरू करा.',
      'पोर्टलच्या स्क्रीन रेकॉर्डिंगवरून ६० सेकंदांचा प्रश्न-उत्तर शॉर्ट्स व्हिडिओ बनवा.',
      'पिन केलेल्या कमेंटमध्ये "या पुस्तकाची अधिकृत खरेदी लिंक:" आणि पोर्टल लिंक टाका.'
    ],
    actionStepsEn: [
      'Launch an MPSC dedicated YouTube channel.',
      'Screen record 60-second interactive question-solving walkthroughs.',
      'Pin your portal web link and Amazon book affiliate URL in top comment.'
    ],
    proTipsMr: [
      'यूट्यूबच्या कम्युनिटी टॅबमध्ये दररोज १ पोल प्रश्न टाका; यामुळे चॅनेलचे व्ह्यूज व ॲफिलिएट क्लिक्स विना-व्हिडिओही वाढत राहतात.'
    ],
    proTipsEn: [
      'Community tab MCQ polls trigger massive algorithmic impressions and recurring referral clicks.'
    ]
  },
  {
    id: 'student_referral_network',
    titleMr: 'विद्यार्थी कम्युनिटी रेफरल व रिवॉर्ड्स (Viral Growth Loop)',
    titleEn: 'Student Peer Referral & Viral Growth Network',
    categoryMr: 'व्हायरल ऑर्गॅनिक ट्रॅफिक व युझर ग्रोथ',
    categoryEn: 'Organic Viral Traffic Loop',
    potentialMonthlyMr: '₹१०,००० ते ₹४०,००० / महिना',
    potentialMonthlyEn: '₹10,000 to ₹40,000 / month',
    commissionOrCpmMr: 'रेफरलद्वारे नवीन युझर्स वाढल्याने AdSense व ॲफिलिएट महसुलात ३ पट वाढ',
    commissionOrCpmEn: '3x boost in AdSense & book sales through viral student invites',
    difficultyLevel: 'easy',
    icon: '👥',
    badgeColor: 'border-yellow-500/60 bg-yellow-500/10 text-yellow-300',
    summaryMr:
      'विद्यार्थ्यांना "आपल्या ३ अभ्यास मित्रांना ॲप शेअर करा आणि मोफत सराव टेस्ट अनलॉक करा" असा रेफरल प्रोग्राम द्या. विद्यार्थी स्वतःहून व्हॉट्सॲप ग्रुप्समध्ये पोर्टलची लिंक शेअर करतात, ज्यामुळे तुमचा ट्रॅफिक आपोआप झपाट्याने वाढतो.',
    summaryEn:
      'Incentivize aspirants with "Invite 3 study partners to unlock premium mock sets". Students naturally share links in their WhatsApp and Telegram study circles, creating exponential organic traffic.',
    actionStepsMr: [
      'पोर्टलमध्ये व्हॉट्सॲप आणि टेलिग्राम शेअर बटण वापरा.',
      'विद्यार्थ्यांनी मित्राला पाठवल्यावर त्यांना "स्टार अचिव्हर बॅज" किंवा बोनस टेस्ट सेट द्या.',
      'वाढलेल्या ट्रॅफिकवर आपोआप ॲडसेन्स जाहिरात व पुस्तक विक्रीचे कमिशन वाढते.'
    ],
    actionStepsEn: [
      'Deploy 1-click WhatsApp & Telegram invitation triggers.',
      'Reward referring students with Star Achiever badges and unlocked tests.',
      'Harvest 3x increased ad impressions and affiliate conversions from invited peers.'
    ],
    proTipsMr: [
      'कम्बाईन पूर्व परीक्षेचा फॉर्म भरण्याच्या काळात विद्यार्थी एकमेकांना भरपूर अभ्यास साहित्य शेअर करतात; या काळात रेफरल मोहिमा सर्वाधिक यशस्वी होतात.'
    ],
    proTipsEn: [
      'Referral campaigns achieve highest conversion during official exam registration windows.'
    ]
  }
];

// ----------------------------------------------------------------------------
// 2. REVENUE PROJECTIONS MATRIX (BASED ON STUDENT TRAFFIC)
// ----------------------------------------------------------------------------
export const REVENUE_PROJECTIONS_DATA: RevenueProjectionTier[] = [
  {
    tierNameMr: 'सुरुवातीचा टप्पा (Starter Tier)',
    tierNameEn: 'Starter Tier (500 Daily Users)',
    monthlyVisitors: 15000,
    dailyActiveStudents: 500,
    estimatedAdSenseEarnings: 2200,
    estimatedAffiliateBookSales: 35,
    estimatedAffiliateEarnings: 1540,
    estimatedGearAndOtherSales: 800,
    totalMonthlyEarnings: 4540,
    totalAnnualEarnings: 54480,
    keyPrerequisiteMr: 'मित्र, टेलिग्राम ग्रुप्स आणि कॉलेज मित्रांमध्ये पोर्टलची लिंक शेअर करणे.'
  },
  {
    tierNameMr: 'वाढता टप्पा (Growth Tier)',
    tierNameEn: 'Growth Tier (1,500 Daily Users)',
    monthlyVisitors: 45000,
    dailyActiveStudents: 1500,
    estimatedAdSenseEarnings: 7500,
    estimatedAffiliateBookSales: 110,
    estimatedAffiliateEarnings: 4840,
    estimatedGearAndOtherSales: 2200,
    totalMonthlyEarnings: 14540,
    totalAnnualEarnings: 174480,
    keyPrerequisiteMr: 'दररोज किमान ५० ते १०० प्रश्न सोडवणाऱ्या नियमित विद्यार्थ्यांचा गट तयार होणे.'
  },
  {
    tierNameMr: 'सक्रिय स्पर्धा परीक्षा हब (Active Hub)',
    tierNameEn: 'Active Hub (5,000 Daily Users)',
    monthlyVisitors: 150000,
    dailyActiveStudents: 5000,
    estimatedAdSenseEarnings: 26000,
    estimatedAffiliateBookSales: 380,
    estimatedAffiliateEarnings: 16720,
    estimatedGearAndOtherSales: 8500,
    totalMonthlyEarnings: 51220,
    totalAnnualEarnings: 614640,
    keyPrerequisiteMr: 'MPSC परीक्षांचे काउंटडाउन, चालू घडामोडी आणि १००,००० प्रश्न बँकेमुळे व्हायरल ट्रॅफिक.'
  },
  {
    tierNameMr: 'महाराष्ट्र प्रो लीडर (Mega Scale)',
    tierNameEn: 'Maharashtra Mega Scale (15,000 Daily Users)',
    monthlyVisitors: 450000,
    dailyActiveStudents: 15000,
    estimatedAdSenseEarnings: 82000,
    estimatedAffiliateBookSales: 1250,
    estimatedAffiliateEarnings: 55000,
    estimatedGearAndOtherSales: 28000,
    totalMonthlyEarnings: 165000,
    totalAnnualEarnings: 1980000,
    keyPrerequisiteMr: 'राज्यभरातील १ लाखांहून अधिक MPSC विद्यार्थ्यांचा नंबर १ सराव प्लॅटफॉर्म बनणे.'
  },
  {
    tierNameMr: 'महाराष्ट्र महा-अधिपती (Elite Scale)',
    tierNameEn: 'Maharashtra Mega Crown (25,000+ Daily Users)',
    monthlyVisitors: 750000,
    dailyActiveStudents: 25000,
    estimatedAdSenseEarnings: 140000,
    estimatedAffiliateBookSales: 2200,
    estimatedAffiliateEarnings: 95000,
    estimatedGearAndOtherSales: 45000,
    totalMonthlyEarnings: 280000,
    totalAnnualEarnings: 3360000,
    keyPrerequisiteMr: 'सर्व स्पर्धा परीक्षा (राज्यसेवा, कम्बाईन, वनसेवा, कृषी) विद्यार्थ्यांचे मुख्य अभ्यास केंद्र बनणे.'
  }
];

// ----------------------------------------------------------------------------
// 3. READY-TO-USE TELEGRAM & WHATSAPP BROADCAST TEMPLATES
// ----------------------------------------------------------------------------
export const TELEGRAM_MONETIZATION_TEMPLATES: TelegramMonetizationStrategy[] = [
  {
    strategyTitleMr: 'दैनिक MPSC पोल व शिफारस पुस्तक पोस्ट',
    strategyTitleEn: 'Daily High-Yield MCQ Poll & Book Referral',
    postTemplateMr: `🎯 **आजचा MPSC सराव प्रश्न (राज्यव्यवस्था GS-2)**

📌 **प्रश्न:** भारतीय संविधानातील कोणत्या कलमान्वये प्रत्येक ग्रामपंचायतीसाठी ‘ग्रामसभा’ स्थापन करण्याची तरतूद आहे?
A) कलम २४३
B) कलम २४३ A ✅
C) कलम २४३ B
D) कलम २४३ D

💡 **स्पष्टीकरण:** कलम २४३ A मध्ये ग्रामसभेची तरतूद आहे. महाराष्ट्रात वर्षातून किमान ४ ग्रामसभा अनिवार्य आहेत.

📖 **या घटकाच्या १००% तयारीसाठी लक्ष्मीकांत सरांचे अधिकृत पुस्तक (२८% सवलतीत):**
👉 https://www.amazon.in/dp/9355325876?tag=YOUR_TAG-21

📲 **असे १००,०००+ प्रश्न मोफत सोडवण्यासाठी आमच्या पोर्टलला भेट द्या:**
🌐 mpscsarathi.online`,
    postTemplateEn: `Daily Telegram MCQ post template formatted to maximize link clicks and book sales.`,
    recommendedTimeMr: 'सकाळी ८:३० ते ९:३० (अभ्यास सुरू होण्याची वेळ)',
    expectedConversionMr: 'प्रति १००० व्ह्यूजवर सुमारे २५ ते ४० क्लिक्स आणि ३ ते ५ पुस्तकांची विक्री.',
    proTipsMr: 'प्रश्नासोबत थेट पुस्तकाची ॲमेझॉन लिंक जोडल्यास विद्यार्थी लगेच खरेदीचा निर्णय घेतात.'
  },
  {
    strategyTitleMr: 'नवीन परीक्षा जाहिरात व बुकलिस्ट कॉम्बो पोस्ट',
    strategyTitleEn: 'Exam Notification & Standard Booklist Combo',
    postTemplateMr: `🔥 **MPSC संयुक्त पूर्व परीक्षा २०२६: संपूर्ण अधिकृत बुकलिस्ट!**

कम्बाईन पूर्व परीक्षेत ६०+ गुण हमखास मिळवण्यासाठी टॉपर्सची प्रमाण पुस्तके:
१. 🏛️ **राज्यव्यवस्था:** एम. लक्ष्मीकांत (२८% ऑफ) ➔ amazon.in/dp/...
२. 🗺️ **भूगोल:** ए. बी. सवदी (२४% ऑफ) ➔ amazon.in/dp/...
३. 📈 **अर्थव्यवस्था:** रंजन कोळंबे (२१% ऑफ) ➔ amazon.in/dp/...
४. 🔬 **सामान्य विज्ञान:** डॉ. सचिन भस्के (२३% ऑफ) ➔ amazon.in/dp/...
५. 📖 **मराठी व्याकरण:** मो. रा. वाळंबे (२२% ऑफ) ➔ amazon.in/dp/...
६. 📝 **OMR सराव शीट्स पॅड (१०० शीट्स):** ➔ amazon.in/dp/...

⚡ **सर्व पुस्तके घरपोच मागवण्यासाठी वरील लिंक्सवर क्लिक करा!**`,
    postTemplateEn: `Notification-driven complete syllabus booklist bundle maximizing multi-item basket size.`,
    recommendedTimeMr: 'दुपारी १२:०० ते २:०० (परीक्षेचे नोटिफिकेशन आल्यावर)',
    expectedConversionMr: 'अत्यंत उच्च (प्रति १०० क्लिक्सवर ८ ते १२ पुस्तकांची बंडल विक्री).',
    proTipsMr: 'विद्यार्थी एकाच वेळी ३ ते ४ पुस्तके कार्टमध्ये टाकतात, त्यामुळे एकाच विद्यार्थ्याकडून ₹१५० ते ₹२५० कमिशन मिळते!'
  },
  {
    strategyTitleMr: 'रविवार महा-रिव्हिजन सराव चाचणी व पुस्तक लिंक',
    strategyTitleEn: 'Sunday Mega-Drill & Books Flash Offer',
    postTemplateMr: `⚡ **रविवार स्पेशल: MPSC १०० गुणांची ऑनलाईन महा-सराव टेस्ट!**

मित्रांनो, आज रविवारी स्वतःचा अभ्यास तपासण्यासाठी १०० प्रश्नांची मोफत टेस्ट सोडवा:
👉 https://mpscsarathi.online

🎯 **आजच्या टेस्टमध्ये कमजोर राहिलेल्या विषयांसाठी टॉपर्सची शिफारस पुस्तके:**
• गणित-बुद्धिमत्ता (सचिन ढवळे): https://www.amazon.in/dp/...
• आधुनिक महाराष्ट्र इतिहास (समाधान महाजन): https://www.amazon.in/dp/...
• अधिकृत OMR सराव पॅड (१०० शीट्स - ३८% ऑफ): https://www.amazon.in/dp/...

🏆 *आजच आपली रँक तपासा आणि रिव्हिजन सुरू करा!*`,
    postTemplateEn: `Sunday mock drill funnel triggering high portal visits and study gear orders.`,
    recommendedTimeMr: 'रविवारी सकाळी ९:०० वाजता (टेस्ट सोडवण्याची वेळ)',
    expectedConversionMr: 'मध्यम ते उच्च (रविवारच्या दिवशी विद्यार्थी पुस्तक ऑर्डर्स सर्वाधिक करतात).',
    proTipsMr: 'रविवारी विद्यार्थी लायब्ररीत शांतपणे अभ्यास करतात आणि आठवड्याची खरेदी करतात.'
  },
  {
    strategyTitleMr: 'मुख्य परीक्षा भाषा पेपर कॉम्बो (मराठी + इंग्रजी व्याकरण)',
    strategyTitleEn: 'Mains Language Paper Combo (Marathi & English Grammar)',
    postTemplateMr: `📝 **MPSC मुख्य परीक्षा १०० गुणांचा भाषा पेपर: मेरिट ठरवणारा घटक!**

भाषा विषयात ८०+ गुण मिळवण्यासाठी दोनच पुस्तके पुरेशी आहेत:
१. 📖 **सुगम मराठी व्याकरण व शब्दरत्न** - मो. रा. वाळंबे ➔ amazon.in/dp/...
२. 🅰️ **संपूर्ण इंग्रजी व्याकरण** - बाळासाहेब शिंदे ➔ amazon.in/dp/...

💡 **टॉपर टीप:** रोज १ तास व्याकरण नियमांना दिल्यास पोस्ट १००% निश्चित होते!
घरपोच मागवण्यासाठी आजच ऑर्डर करा.`,
    postTemplateEn: `Language mains pair promotion targeting high-intent qualifying students.`,
    recommendedTimeMr: 'संध्याकाळी ६:०० ते ८:०० वाजता',
    expectedConversionMr: 'प्रति ५० क्लिक्सवर ४ ते ६ कॉम्बो संचांची विक्री.',
    proTipsMr: 'मुख्य परीक्षेच्या तारखा जाहीर झाल्यावर या दोन्ही पुस्तकांची विक्री विक्रमी होते.'
  },
  {
    strategyTitleMr: 'लायब्ररी एकाग्रता व स्टडी गियर किट (९% कमिशन)',
    strategyTitleEn: 'Library Focus & Study Gear Kit (9% Commission)',
    postTemplateMr: `🎒 **MPSC विद्यार्थ्यांसाठी आवश्यक लायब्ररी स्टडी गियर (Top 4 Tools):**

१. ⏱️ **म्युट सायलेंट रिव्हिजन स्टॉपवॉच (४४% ऑफ)** ➔ amazon.in/dp/...
२. 📖 **मेटल ॲडजस्टेबल बुक रीडिंग स्टँड (मानदुखीपासून सुटका)** ➔ amazon.in/dp/...
३. 📝 **MPSC २०० प्रश्न प्रॅक्टिस OMR पॅड (१०० शीट्स)** ➔ amazon.in/dp/...
४. 💡 **रिचार्ज करण्यायोग्य आय-केअर LED स्टडी लॅम्प** ➔ amazon.in/dp/...

✅ **कमी खर्चात अभ्यासाचा वेग व एकाग्रता दुप्पट करा!**`,
    postTemplateEn: `Study gear high-commission promotion focusing on ergonomic tools.`,
    recommendedTimeMr: 'रात्री ९:०० ते १०:३० (लायब्ररीतून घरी जाताना)',
    expectedConversionMr: 'खूप जास्त (गॅजेट्सवर विद्यार्थी त्वरित ऑर्डर करतात, कमिशन थेट ९%).',
    proTipsMr: 'स्टडी गियरवर ॲमेझॉन सर्वाधिक ९% कमिशन देते, त्यामुळे केवळ २-३ वस्तूंमधून ₹१५०-₹३०० नफा मिळतो!'
  }
];

// ----------------------------------------------------------------------------
// 3.1 AMAZON COMMISSION SLABS FOR PORTAL MONETIZATION
// ----------------------------------------------------------------------------
export interface AmazonCommissionSlab {
  categoryMr: string;
  categoryEn: string;
  commissionRate: string;
  commissionPercent: number;
  highlightMr: string;
  bestProductsMr: string;
}

export const AMAZON_COMMISSION_SLABS_DATA: AmazonCommissionSlab[] = [
  {
    categoryMr: 'स्टडी गियर, लगेज, बॅग्ज व होम',
    categoryEn: 'Luggage, Bags, Study Accessories & Office',
    commissionRate: '९% कमिशन (सर्वाधिक नफा)',
    commissionPercent: 9,
    highlightMr: 'ॲमेझॉनवरील सर्वाधिक कमिशन दर',
    bestProductsMr: 'OMR पॅड्स, स्टॉपवॉच, बुक स्टँड, स्टडी लॅम्प, बॅकपॅक, हायलायटर किट'
  },
  {
    categoryMr: 'पुस्तके व अभ्यास संदर्भ ग्रंथ (Books)',
    categoryEn: 'Books & Educational Texts',
    commissionRate: '५% ते ८% कमिशन (कंटिन्युअस विक्री)',
    commissionPercent: 8,
    highlightMr: 'सतत खपणारे व विद्यार्थ्यांचे मस्ट-हॅव साहित्य',
    bestProductsMr: 'लक्ष्मीकांत, सौदी, कोळंबे, वाळंबे, भस्के, देसले, तात्यांचा ठोकळा'
  },
  {
    categoryMr: 'ई-लर्निंग टॅब्लेट्स व किंडल (Tablets & E-Readers)',
    categoryEn: 'Tablets, Kindle & E-Learning Tech',
    commissionRate: '५% कमिशन (हाय-तिकीट नफा)',
    commissionPercent: 5,
    highlightMr: 'एकाच विक्रीवर ₹५०० ते ₹१,२०० पर्यंत मोठी कमाई',
    bestProductsMr: 'सॅमसंग गॅलेक्सी टॅब A9, किंडल पेपरव्हाइट, लेनोव्हो टॅब'
  },
  {
    categoryMr: 'हेडफोन्स, इलेक्ट्रॉनिक्स व कॅल्क्युलेटर',
    categoryEn: 'Headphones, Peripherals & Electronics',
    commissionRate: '५% ते ६% कमिशन',
    commissionPercent: 6,
    highlightMr: 'लायब्ररी एकाग्रतेसाठी आवश्यक गॅजेट्स',
    bestProductsMr: 'नॉईज कॅन्सलिंग हेडफोन, कॅसिओ सायंटिफिक कॅल्क्युलेटर, पॉवर बँक'
  }
];

// ----------------------------------------------------------------------------
// 4. STORAGE HELPERS FOR PORTAL OWNER'S DIRECT UPI EARNINGS
// ----------------------------------------------------------------------------
const STORAGE_UPI_ID_KEY = 'mpsc_portal_owner_upi_id';
const STORAGE_UPI_NAME_KEY = 'mpsc_portal_owner_upi_name';

export const getStoredUpiId = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_UPI_ID_KEY) || 'apparaobalkunde901@okaxis';
};

export const saveStoredUpiId = (upiId: string, name?: string): void => {
  if (typeof window === 'undefined') return;
  const clean = upiId.trim();
  if (clean) {
    localStorage.setItem(STORAGE_UPI_ID_KEY, clean);
    if (name) localStorage.setItem(STORAGE_UPI_NAME_KEY, name.trim());
  } else {
    localStorage.removeItem(STORAGE_UPI_ID_KEY);
    localStorage.removeItem(STORAGE_UPI_NAME_KEY);
  }
};

export const getStoredUpiName = (): string => {
  if (typeof window === 'undefined') return 'MPSC Aspirant Prep';
  return localStorage.getItem(STORAGE_UPI_NAME_KEY) || 'Apparao Balkunde';
};
