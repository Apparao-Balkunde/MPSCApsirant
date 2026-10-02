import React, { useState, useEffect, useRef } from 'react';
import { 
  Landmark, 
  BookOpen, 
  Award, 
  Compass, 
  Eye, 
  Sparkles, 
  Shield, 
  Library, 
  CheckCircle2, 
  Crown, 
  Flag, 
  Plus, 
  Upload, 
  Trash2, 
  X, 
  Image as ImageIcon 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AspirantInspirationCardProps {
  language: 'mr' | 'en';
}

interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  src: string;
  badge: string;
  tag: string;
  isCustom?: boolean;
}

const DEFAULT_PHOTOS: GalleryPhoto[] = [
  {
    id: 'shivaji_maharaj',
    title: 'छत्रपती शिवाजी महाराज',
    subtitle: 'प्रशासकीय नीती व लोककल्याणकारी स्वराज्य',
    description: 'अष्टप्रधान मंडळ, कार्यक्षम महसूल व्यवस्था, दुर्ग व्यवस्थापन आणि निष्कलंक प्रशासनाचे शाश्वत प्रेरणास्थान.',
    src: '/chhatrapati_shivaji_maharaj.jpg',
    badge: '👑 स्वराज्य प्रेरणा',
    tag: 'आदर्श राज्यकारभार व नीती',
  },
  {
    id: 'ambedkar',
    title: 'भारतरत्न डॉ. बाबासाहेब आंबेडकर',
    subtitle: 'भारतीय संविधानाचे शिल्पकार • प्रज्ञासूर्य',
    description: 'देशाची लोकशाही, मूलभूत हक्क आणि कायद्याच्या राज्याची पायाभरणी करणारे मार्गदर्शक विचार.',
    src: '/dr_babasaheb_ambedkar.jpg',
    badge: '📖 संविधान शिल्पकार',
    tag: 'समानता, न्याय व बंधुता',
  },
  {
    id: 'raigad',
    title: 'किल्ले रायगड (नगारखाना)',
    subtitle: 'स्वराज्याची राजधानी • ऐतिहासिक वारसा',
    description: 'छत्रपती शिवाजी महाराजांचा राज्याभिषेक सोहळा आणि महाराष्ट्राच्या असीम स्वाभिमानाचे पवित्र प्रतीक.',
    src: '/raigad_fort.jpg',
    badge: '🚩 स्वराज्याची राजधानी',
    tag: 'महाराष्ट्र इतिहास व वारसा',
  },
  {
    id: 'open_book',
    title: 'MPSC संदर्भ ग्रंथ व स्वाध्याय',
    subtitle: 'उघडलेले संदर्भ पुस्तक • वस्तुनिष्ठ सराव',
    description: 'राज्यव्यवस्था, इतिहास, भूगोल आणि व्याकरण विषयांचे मानक संदर्भ ग्रंथ, नोट्स आणि मागील वर्षांच्या प्रश्नांचे (PYQs) विश्लेषण.',
    src: '/open_reference_book.jpg',
    badge: '📚 संदर्भ ग्रंथ',
    tag: 'MPSC सर्व विषय सराव',
  },
  {
    id: 'mantralaya',
    title: 'मंत्रालय, मुंबई',
    subtitle: 'महाराष्ट्र शासनाचे प्रशासकीय मुख्यालय',
    description: 'राजपत्रित वर्ग-१ व वर्ग-२ अधिकाऱ्यांच्या प्रशासकीय धोरणांचे आणि लोकसेवेचे सर्वोच्च केंद्रस्थान.',
    src: '/mantralaya.jpg',
    badge: '🏛️ सचिवालय',
    tag: 'ध्येय: उपजिल्हाधिकारी / DYSP',
  },
  {
    id: 'constitution',
    title: 'भारतीय संविधान',
    subtitle: 'मूळ ऐतिहासिक प्रत • सुवर्ण कॅलिग्राफी',
    description: 'MPSC सामान्य अध्ययन-२ (राज्यव्यवस्था व कायदे) चा मूळ गाभा आणि देशाचा सर्वोच्च कायदा.',
    src: '/constitution_of_india.jpg',
    badge: '📜 सर्वोच्च कायदा',
    tag: 'कलमे, अनुसूची व कायदे',
  },
  {
    id: 'library',
    title: 'अभ्यासिका व ग्रंथालय',
    subtitle: 'पुस्तकांचे दालन • अखंड सातत्य',
    description: 'हजारो पुस्तकांनी समृद्ध अभ्यासिका — जिथे स्पर्धा परीक्षेच्या यशाची मजबूत पायाभरणी होते.',
    src: '/library_books.jpg',
    badge: '🏛️ ग्रंथालय',
    tag: 'सातत्यपूर्ण वाचन',
  },
  {
    id: 'gateway',
    title: 'गेटवे ऑफ इंडिया',
    subtitle: 'महाराष्ट्राचा ऐतिहासिक मानबिंदू',
    description: 'महाराष्ट्राच्या समृद्ध वारसा, इतिहास आणि स्पर्धा परीक्षेतील उच्च ध्येयाचे शाश्वत प्रतीक.',
    src: '/gateway_of_india.jpg',
    badge: '🚩 मानबिंदू',
    tag: 'राज्यसेवा व संयुक्त परीक्षा',
  },
];

const CUSTOM_IMAGES_STORAGE_KEY = 'mpsc_custom_gallery_images';

// Helper to compress uploaded image using Canvas
function compressImage(file: File, maxWidth = 1200, maxHeight = 900, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export const AspirantInspirationCard: React.FC<AspirantInspirationCardProps> = ({ language }) => {
  const isMr = language === 'mr';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load custom photos from localStorage
  const [customPhotos, setCustomPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_IMAGES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Keep custom photos synced when images are added or deleted in CustomImageManagerModal
  useEffect(() => {
    const handleUpdate = () => {
      try {
        const raw = localStorage.getItem(CUSTOM_IMAGES_STORAGE_KEY);
        setCustomPhotos(raw ? JSON.parse(raw) : []);
      } catch {}
    };
    window.addEventListener('mpsc_images_updated', handleUpdate);
    return () => window.removeEventListener('mpsc_images_updated', handleUpdate);
  }, []);

  const [selectedPhoto, setSelectedPhoto] = useState<number>(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Combined photo list: custom user images first, then default images
  const allPhotos: GalleryPhoto[] = [...customPhotos, ...DEFAULT_PHOTOS];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const dataUrl = await compressImage(file);
      setUploadPreview(dataUrl);
      if (!newTitle) {
        setNewTitle(file.name.replace(/\.[^/.]+$/, '').slice(0, 30));
      }
    } catch (err) {
      console.error('Image compression error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveCustomImage = () => {
    if (!uploadPreview) return;

    const newPhoto: GalleryPhoto = {
      id: 'custom_' + Date.now(),
      title: newTitle.trim() || (isMr ? 'माझे अभ्यास छायाचित्र' : 'My Study Photo'),
      subtitle: newSubtitle.trim() || (isMr ? 'विद्यार्थी संदर्भ नोट्स व साहित्य' : 'Personal Study Material'),
      description: newDescription.trim() || (isMr ? 'माझ्या MPSC तयारीसाठी अपलोड केलेले वैयक्तिक प्रेरणा छायाचित्र.' : 'Personal study image uploaded for MPSC preparation.'),
      src: uploadPreview,
      badge: isMr ? '✨ माझी इमेज' : '✨ My Image',
      tag: isMr ? 'वैयक्तिक अभ्यास साहित्य' : 'Personal Study Notes',
      isCustom: true,
    };

    const updated = [newPhoto, ...customPhotos];
    setCustomPhotos(updated);
    try {
      localStorage.setItem(CUSTOM_IMAGES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage quota warning:', e);
    }

    // Reset modal & select newly added photo
    setIsAddModalOpen(false);
    setUploadPreview(null);
    setNewTitle('');
    setNewSubtitle('');
    setNewDescription('');
    setSelectedPhoto(0);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleDeleteCustomPhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customPhotos.filter((p) => p.id !== id);
    setCustomPhotos(updated);
    try {
      localStorage.setItem(CUSTOM_IMAGES_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    setSelectedPhoto(0);
  };

  const currentPhoto = allPhotos[selectedPhoto] || allPhotos[0];

  return (
    <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-2xl border border-amber-500/35 p-5 sm:p-6 shadow-xl text-stone-100 space-y-4 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
            <Landmark className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white">
                {isMr ? 'एमपीएससी प्रेरणा व ऐतिहासिक व्हिज्युअल दालन' : 'MPSC Heritage & Inspiration Visual Gallery'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/30">
                {allPhotos.length} {isMr ? 'छायाचित्रे उपलब्ध' : 'Photos'}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {isMr 
                ? 'छत्रपती शिवाजी महाराज, डॉ. आंबेडकर, किल्ले रायगड, संदर्भ पुस्तके किंवा तुमची स्वतःची इमेज जोडा.' 
                : 'Chhatrapati Shivaji Maharaj, Dr. Ambedkar, Raigad Fort, books, or add your custom images.'}
            </p>
          </div>
        </div>

        {/* Action Buttons: Add Image + Selected Badge */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{isMr ? 'माझी इमेज जोडा' : 'Add My Image'}</span>
          </button>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-bold border border-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentPhoto.badge}</span>
          </div>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Large Featured Photo View */}
        <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-amber-500/30 bg-stone-950 shadow-lg group aspect-[16/10] sm:aspect-[16/9]">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95 transition-all duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/20 to-transparent pointer-events-none" />

          {/* Delete Button for Custom Image */}
          {currentPhoto.isCustom && (
            <button
              type="button"
              onClick={(e) => handleDeleteCustomPhoto(currentPhoto.id, e)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-white border border-rose-500/50 text-xs font-bold flex items-center gap-1 transition-all shadow-lg cursor-pointer"
              title={isMr ? "ही इमेज हटवा" : "Delete Image"}
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-300" />
              <span>{isMr ? 'हटवा' : 'Delete'}</span>
            </button>
          )}

          {/* Bottom Floating Info Pill */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl bg-stone-950/90 backdrop-blur-md border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-black uppercase">
                  {currentPhoto.badge}
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  {currentPhoto.tag}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-white mt-1">
                {currentPhoto.title}
              </h4>
              <p className="text-[11px] text-stone-300 leading-relaxed mt-0.5 line-clamp-2">
                {currentPhoto.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5 text-stone-400 text-[11px] font-semibold">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentPhoto.isCustom ? (isMr ? 'तुमची इमेज' : 'Your Upload') : (isMr ? 'मूळ छायाचित्र' : 'Original Photo')}</span>
            </div>
          </div>
        </div>

        {/* Right Photo Selector Cards (Scrollable list) */}
        <div className="lg:col-span-4 flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1.5 custom-scrollbar">
          {/* Quick Add Image Card at Top of list */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full p-2.5 rounded-xl border border-dashed border-amber-500/50 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/15 text-amber-300 text-left transition-all cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5 text-amber-400 stroke-[3]" />
            </div>
            <div>
              <h5 className="text-xs font-black text-white">
                {isMr ? '+ माझी स्वतःची इमेज जोडा' : '+ Upload Custom Image'}
              </h5>
              <p className="text-[10px] text-amber-300/80">
                {isMr ? 'पुस्तके, नोट्स किंवा ध्येयाचे छायाचित्र' : 'Books, notes, or vision board photo'}
              </p>
            </div>
          </button>

          {allPhotos.map((item, idx) => {
            const isSelected = selectedPhoto === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPhoto(idx)}
                className={`w-full p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                    : 'bg-stone-850/70 border-stone-800 hover:bg-stone-800/80 hover:border-stone-700'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-14 h-12 sm:w-16 sm:h-14 rounded-lg overflow-hidden border border-stone-700 shrink-0 relative bg-stone-900">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-400 rounded-lg pointer-events-none" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase truncate">
                      {item.badge}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                    )}
                  </div>
                  <h5 className="text-xs sm:text-sm font-black text-white truncate mt-0.5">
                    {item.title}
                  </h5>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: UPLOAD CUSTOM IMAGE (माझी इमेज जोडा) */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border border-amber-500/40 rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl space-y-4 text-stone-100 relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Upload className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isMr ? 'गॅलरीत नवीन इमेज जोडा' : 'Add Image to Gallery'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Drop / Select Image Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer transition-all ${
                uploadPreview
                  ? 'border-amber-400 bg-stone-900/60'
                  : 'border-stone-700 hover:border-amber-400 hover:bg-stone-850/50'
              }`}
            >
              {uploadPreview ? (
                <div className="space-y-3">
                  <div className="w-full h-44 rounded-lg overflow-hidden border border-stone-700 bg-stone-950">
                    <img
                      src={uploadPreview}
                      alt="Upload Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isMr ? 'दुसरी इमेज निवडा' : 'Change Image'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
                    <ImageIcon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {isMr ? 'मोबाईल / संगणकावरून इमेज निवडा' : 'Choose Image from Device / Camera'}
                  </h4>
                  <p className="text-xs text-stone-400">
                    {isMr ? 'JPG, PNG, WebP (पुस्तके, नोट्स किंवा ध्येयाचा फोटो)' : 'JPG, PNG, WebP format supported'}
                  </p>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {isMr ? 'इमेजचे नाव / शीर्षक *' : 'Title / Caption *'}
                </label>
                <input
                  type="text"
                  placeholder={isMr ? "उदा. माझे अभ्यास टेबल / हस्तलिखित नोट्स" : "e.g. My Study Desk / Polity Notes"}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {isMr ? 'उपशीर्षक (Subtitle)' : 'Subtitle'}
                </label>
                <input
                  type="text"
                  placeholder={isMr ? "उदा. सामान्य अध्ययन रिव्हिजन" : "e.g. GS-2 Revision Material"}
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold cursor-pointer"
              >
                {isMr ? 'रद्द करा' : 'Cancel'}
              </button>
              <button
                type="button"
                disabled={!uploadPreview || isUploading}
                onClick={handleSaveCustomImage}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs disabled:opacity-50 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isMr ? 'इमेज गॅलरीत जोडा' : 'Add to Gallery'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
