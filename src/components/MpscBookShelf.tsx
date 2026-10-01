import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  GraduationCap, 
  Bookmark, 
  ChevronRight, 
  Library,
  Star,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ExamPatternId, SubjectId } from '../types';

interface MpscBookShelfProps {
  language: 'mr' | 'en';
  onStartExam: (patternId: ExamPatternId, subjectId?: SubjectId, title?: string) => void;
  onOpenGrammarRules?: () => void;
}

interface MpscReferenceBook {
  id: string;
  subjectId: SubjectId;
  patternId: ExamPatternId;
  titleMr: string;
  titleEn: string;
  authorMr: string;
  authorEn: string;
  coverImage: string;
  importanceMr: string;
  importanceEn: string;
  weightage: string;
  chaptersCount: number;
  badgeMr: string;
  badgeEn: string;
  tags: string[];
}

const MPSC_RECOMMENDED_BOOKS: MpscReferenceBook[] = [
  {
    id: 'polity_laxmikanth',
    subjectId: 'polity',
    patternId: 'rajyaseva_gs',
    titleMr: 'भारतीय राज्यव्यवस्था (Indian Polity)',
    titleEn: 'Indian Polity - 6th/7th Edition',
    authorMr: 'एम. लक्ष्मीकांत (M. Laxmikanth)',
    authorEn: 'M. Laxmikanth',
    coverImage: '/constitution_of_india.jpg',
    importanceMr: 'राज्यसेवा पूर्व व मुख्य सामान्य अध्ययन-२ चा "बायबल" मानला जाणारा सर्वांत महत्त्वाचा संदर्भ ग्रंथ.',
    importanceEn: 'The absolute gold-standard reference for Indian Constitution, Governance & Rights.',
    weightage: '१५-२० प्रश्न (३०-४० गुण)',
    chaptersCount: 80,
    badgeMr: '⭐ अनिवार्य संदर्भ ग्रंथ',
    badgeEn: '⭐ Must-Read Standard',
    tags: ['कलमे', 'घटनादुरुस्त्या', 'संसद', 'न्यायव्यवस्था', 'पंचायतराज'],
  },
  {
    id: 'marathi_walambe',
    subjectId: 'marathi_grammar',
    patternId: 'combine_group_b_c',
    titleMr: 'सुगम मराठी व्याकरण व लेखन',
    titleEn: 'Sugam Marathi Vyakaran & Lekhan',
    authorMr: 'मो. रा. वाळंबे (M. R. Walambe)',
    authorEn: 'M. R. Walambe',
    coverImage: '/open_reference_book.jpg',
    importanceMr: 'मराठी व्याकरण, वर्णविचार, संधी, समास, प्रयोग आणि शब्दसंग्रहाचा सर्वाधिक विश्वासार्ह संदर्भ.',
    importanceEn: 'Comprehensive Marathi grammar reference for Rajyaseva & Combine Mains Paper 1.',
    weightage: '५० गुण (मुख्य परीक्षा)',
    chaptersCount: 32,
    badgeMr: '📚 व्याकरण शिरोमणी',
    badgeEn: '📚 Grammar Master',
    tags: ['वर्णविचार', 'प्रयोग', 'समास', 'विभक्ती', 'संधी', 'शब्दसंग्रह'],
  },
  {
    id: 'history_mahajan',
    subjectId: 'maharashtra_history',
    patternId: 'rajyaseva_gs',
    titleMr: 'आधुनिक भारताचा व महाराष्ट्राचा इतिहास',
    titleEn: 'History of Modern India & Maharashtra',
    authorMr: 'समाधान महाजन / बिपिन चंद्र / के. सागर',
    authorEn: 'Samadhan Mahajan / Bipan Chandra',
    coverImage: '/vintage_reference_books.jpg',
    importanceMr: '१८५७ चा उठाव, राष्ट्रीय चळवळ, समाजसुधारक आणि संयुक्त महाराष्ट्र चळवळीचे संपूर्ण विश्लेषण.',
    importanceEn: 'Detailed coverage of Indian Freedom Struggle, Social Reformers, and Maharashtra history.',
    weightage: '१५ प्रश्न (३० गुण)',
    chaptersCount: 45,
    badgeMr: '🏛️ इतिहास संदर्भ',
    badgeEn: '🏛️ History Volume',
    tags: ['समाजसुधारक', 'स्वातंत्र्य लढा', '१८५७ उठाव', 'काँग्रेस अधिवेशने'],
  },
  {
    id: 'geography_saudi',
    subjectId: 'maharashtra_geography',
    patternId: 'rajyaseva_gs',
    titleMr: 'महाराष्ट्राचा व भारताचा समग्र भूगोल',
    titleEn: 'Comprehensive Geography of Maharashtra',
    authorMr: 'प्रा. ए. बी. सवदी (सौदी) व कोळंबे',
    authorEn: 'Prof. A.B. Saudi & Kolambe',
    coverImage: '/mpsc_textbooks.jpg',
    importanceMr: 'महाराष्ट्राची प्राकृतिक रचना, नद्या, जलप्रणाली, हवामान, खनिजे आणि लोकसंख्याशास्त्राचे संपूर्ण पुस्तक.',
    importanceEn: 'Complete geographical analysis of rivers, climate, soil, population, and districts.',
    weightage: '१५ प्रश्न (३० गुण)',
    chaptersCount: 38,
    badgeMr: '🗺️ भूगोल प्रमाण ग्रंथ',
    badgeEn: '🗺️ Geography Master',
    tags: ['प्राकृतिक रचना', 'नद्या', 'हवामान', 'खनिजे', 'जिल्हानिहाय माहिती'],
  },
  {
    id: 'science_bhaske',
    subjectId: 'general_science',
    patternId: 'rajyaseva_gs',
    titleMr: 'सामान्य विज्ञान व तंत्रज्ञान (GS Science)',
    titleEn: 'General Science & Technology',
    authorMr: 'सचिन भस्के / डॉ. चंद्रशेखर',
    authorEn: 'Sachin Bhaske / Dr. Chandrashekhar',
    coverImage: '/stack_of_books.jpg',
    importanceMr: 'भौतिकशास्त्र, रसायनशास्त्र, वनस्पतीशास्त्र, प्राणीशास्त्र आणि मानवी आरोग्यशास्त्राचे सर्व संकल्पना.',
    importanceEn: 'Physics, Chemistry, Botany, Zoology, Human Anatomy, and Disease prevention.',
    weightage: '१५-२० प्रश्न (पूर्व परीक्षा)',
    chaptersCount: 50,
    badgeMr: '🔬 विज्ञान मार्गदर्शक',
    badgeEn: '🔬 Science Compendium',
    tags: ['मानवी आरोग्य', 'रोगप्रतिकार', 'भौतिक नियम', 'आवर्तसारणी', 'वनस्पती'],
  },
  {
    id: 'csat_dhawale',
    subjectId: 'csat',
    patternId: 'daily_10_challenge',
    titleMr: 'अंकगणित, बुद्धिमत्ता व तर्कक्षमता (CSAT)',
    titleEn: 'CSAT Quantitative Aptitude & Reasoning',
    authorMr: 'सचिन ढवळे / आर. एस. अग्रवाल',
    authorEn: 'Sachin Dhawale / R.S. Aggarwal',
    coverImage: '/pile_of_books.jpg',
    importanceMr: 'MPSC CSAT पेपर-२ मधील ६६+ गुण मिळवून पात्र (Qualify) होण्यासाठी सर्वांत जलद शॉर्टकट सूत्रे.',
    importanceEn: 'Quick calculation shortcuts, puzzles, data interpretation, and syllogisms.',
    weightage: '६६+ गुण (Qualifying पेपर)',
    chaptersCount: 35,
    badgeMr: '⚡ CSAT क्लृप्त्या',
    badgeEn: '⚡ CSAT Shortcuts',
    tags: ['काळ-काम-वेग', 'वयवारी', 'तर्कक्षमता', 'वेन आकृत्या', 'शेकडेवारी'],
  },
];

export const MpscBookShelf: React.FC<MpscBookShelfProps> = ({
  language,
  onStartExam,
  onOpenGrammarRules,
}) => {
  const isMr = language === 'mr';
  const [selectedBook, setSelectedBook] = useState<MpscReferenceBook>(MPSC_RECOMMENDED_BOOKS[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'gs' | 'language' | 'csat'>('all');

  const filteredBooks = MPSC_RECOMMENDED_BOOKS.filter((b) => {
    if (activeFilter === 'language') return b.subjectId === 'marathi_grammar';
    if (activeFilter === 'csat') return b.subjectId === 'csat';
    if (activeFilter === 'gs') return b.subjectId !== 'marathi_grammar' && b.subjectId !== 'csat';
    return true;
  });

  const handleStartBookPractice = (book: MpscReferenceBook) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    if (book.id === 'marathi_walambe' && onOpenGrammarRules) {
      onOpenGrammarRules();
    } else {
      onStartExam(book.patternId, book.subjectId, isMr ? `📚 ${book.titleMr} आधारित सराव चाचणी` : `Practice Test: ${book.titleEn}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
            <BookOpen className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-stone-900">
                {isMr ? 'MPSC प्रमाण संदर्भ ग्रंथ दालन (Recommended Bookshelf)' : 'MPSC Standard Reference Bookshelf'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black uppercase border border-amber-200">
                {isMr ? '६ अधिकृत संदर्भ पुस्तके' : '6 Standard Volumes'}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {isMr 
                ? 'एम. लक्ष्मीकांत, मो. रा. वाळंबे, सौदी, महाजन व ढवळे — MPSC टॉपर्सचे मूळ संदर्भ ग्रंथ व त्यांची छायाचित्रे.' 
                : 'Photographic showcase of top-recommended MPSC textbooks, authors, and chapter MCQs.'}
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'all', labelMr: 'सर्व पुस्तके', labelEn: 'All Books' },
            { id: 'gs', labelMr: 'सामान्य अध्ययन', labelEn: 'GS Books' },
            { id: 'language', labelMr: 'भाषा व व्याकरण', labelEn: 'Language' },
            { id: 'csat', labelMr: 'CSAT बुद्धिमत्ता', labelEn: 'CSAT' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {isMr ? f.labelMr : f.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main 6 Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => {
          const isSelected = selectedBook.id === book.id;
          return (
            <div
              key={book.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/5 shadow-md ring-1 ring-amber-400/40'
                  : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-xs'
              }`}
            >
              {/* Book Top Image Banner */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-950 border-b border-stone-100">
                <img
                  src={book.coverImage}
                  alt={book.titleMr}
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 uppercase shadow-sm">
                    {isMr ? book.badgeMr : book.badgeEn}
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <div className="text-[11px] font-mono text-amber-300 font-bold">
                    {isMr ? book.authorMr : book.authorEn}
                  </div>
                  <h4 className="text-sm sm:text-base font-black leading-snug drop-shadow-md">
                    {isMr ? book.titleMr : book.titleEn}
                  </h4>
                </div>
              </div>

              {/* Book Details Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {/* Importance & Weightage */}
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {isMr ? book.importanceMr : book.importanceEn}
                  </p>

                  {/* Vitals Strip */}
                  <div className="flex items-center justify-between text-xs py-1.5 border-y border-stone-100">
                    <span className="text-stone-500 font-medium">
                      {isMr ? 'गुण भारांश:' : 'Weightage:'}
                    </span>
                    <span className="font-bold text-amber-800 font-mono">
                      {book.weightage}
                    </span>
                  </div>

                  {/* Key Topic Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    {book.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => handleStartBookPractice(book)}
                  className="w-full mt-3 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-500 text-white hover:text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer group-hover:bg-amber-500 group-hover:text-stone-950"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {book.id === 'marathi_walambe'
                      ? (isMr ? 'व्याकरण नियम व सूत्रे उघडा ➜' : 'Open Grammar Rules ➜')
                      : (isMr ? 'या पुस्तकातील प्रश्न सोडवा ➜' : 'Practice this Book ➜')}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Library Banner Footer */}
      <div className="relative rounded-xl overflow-hidden border border-amber-500/25 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 p-4 sm:p-5 text-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-14 h-12 rounded-lg overflow-hidden border border-amber-400/40 shrink-0 bg-stone-950 hidden sm:block">
            <img
              src="/library_books.jpg"
              alt="MPSC Library"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
              <Library className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'पुणे व महाराष्ट्र अभ्यासिका वाचन संस्कृती' : 'Aspirant Study Library Culture'}</span>
            </h4>
            <p className="text-xs text-stone-300 mt-0.5">
              {isMr 
                ? 'वरील सर्व संदर्भ ग्रंथांच्या आधारे तयार केलेला ३,५००+ प्रश्नांचा सराव संच या ॲपमध्ये उपलब्ध आहे.' 
                : 'Access 3,500+ standard MCQs formulated directly from these reference volumes.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onStartExam('daily_10_challenge')}
          className="relative z-10 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs shrink-0 transition-all shadow-md cursor-pointer hover:scale-105"
        >
          {isMr ? 'आजचा स्वाध्याय सुरू करा ➜' : 'Start Today’s Practice ➜'}
        </button>
      </div>
    </div>
  );
};
