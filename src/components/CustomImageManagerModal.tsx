import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  CheckCircle2, 
  Sparkles, 
  Trash2, 
  Eye, 
  Camera,
  Layers,
  Compass,
  AlertCircle,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { updateStudentProfile, getLocalStudentSession } from '../lib/firebase';
import { soundFx } from '../utils/audio';

interface CustomImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
}

interface SavedCustomPhoto {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  src: string;
  badge?: string;
  tag?: string;
  isCustom?: boolean;
}

// Compress uploaded file to data URL
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

export const CustomImageManagerModal: React.FC<CustomImageManagerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isMr = language === 'mr';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Input modes: 'file' | 'url' | 'preset' | 'manage'
  const [inputMode, setInputMode] = useState<'file' | 'url' | 'preset' | 'manage'>('file');
  
  // Selected image state
  const [imageSrc, setImageSrc] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Target destination: 'gallery' | 'pass' | 'hero' | 'background' | 'all'
  const [targetDestination, setTargetDestination] = useState<'gallery' | 'pass' | 'hero' | 'background' | 'all'>('gallery');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Saved uploaded images list state
  const [savedCustomImages, setSavedCustomImages] = useState<SavedCustomPhoto[]>(() => {
    try {
      const raw = localStorage.getItem('mpsc_custom_gallery_images');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Track if custom pass photo or hero banner is set
  const [hasPassPhoto, setHasPassPhoto] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem('mpsc_aspirant_photo');
    } catch {
      return false;
    }
  });

  const [hasHeroBanner, setHasHeroBanner] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem('mpsc_custom_hero_banner');
    } catch {
      return false;
    }
  });

  // Keep saved images synchronized
  useEffect(() => {
    const syncSavedImages = () => {
      try {
        const raw = localStorage.getItem('mpsc_custom_gallery_images');
        setSavedCustomImages(raw ? JSON.parse(raw) : []);
        setHasPassPhoto(!!localStorage.getItem('mpsc_aspirant_photo'));
        setHasHeroBanner(!!localStorage.getItem('mpsc_custom_hero_banner'));
      } catch {}
    };

    if (isOpen) {
      syncSavedImages();
    }

    window.addEventListener('mpsc_images_updated', syncSavedImages);
    return () => window.removeEventListener('mpsc_images_updated', syncSavedImages);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const dataUrl = await compressImage(file);
      setImageSrc(dataUrl);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').slice(0, 30));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    setImageSrc(urlInput.trim());
    if (!title) {
      setTitle(isMr ? 'वेबवरून जोडलेली इमेज' : 'Web Image');
    }
  };

  const handleSelectPreset = (src: string, presetTitle: string) => {
    setImageSrc(src);
    setTitle(presetTitle);
  };

  const handleSave = () => {
    if (!imageSrc) return;

    const finalTitle = title.trim() || (isMr ? 'माझी आवडती इमेज' : 'My Custom Image');
    const finalSubtitle = subtitle.trim() || (isMr ? 'विद्यार्थी स्वाध्याय संदर्भ' : 'Study Reference');
    const finalDesc = description.trim() || (isMr ? 'MPSC तयारीसाठी जोडलेली वैयक्तिक इमेज.' : 'Custom image added for MPSC study.');

    // 1. If destination includes 'gallery' or 'all'
    if (targetDestination === 'gallery' || targetDestination === 'all') {
      try {
        const raw = localStorage.getItem('mpsc_custom_gallery_images');
        const existing: SavedCustomPhoto[] = raw ? JSON.parse(raw) : [];
        const newPhoto: SavedCustomPhoto = {
          id: 'custom_' + Date.now(),
          title: finalTitle,
          subtitle: finalSubtitle,
          description: finalDesc,
          src: imageSrc,
          badge: isMr ? '✨ माझी इमेज' : '✨ My Image',
          tag: isMr ? 'वैयक्तिक इमेज' : 'Custom Image',
          isCustom: true,
        };
        const updated = [newPhoto, ...existing];
        localStorage.setItem('mpsc_custom_gallery_images', JSON.stringify(updated));
        setSavedCustomImages(updated);
      } catch (e) {
        console.warn('Gallery save error:', e);
      }
    }

    // 2. If destination includes 'pass' or 'all'
    if (targetDestination === 'pass' || targetDestination === 'all') {
      try {
        localStorage.setItem('mpsc_aspirant_photo', imageSrc);
        const session = getLocalStudentSession();
        updateStudentProfile(session?.displayName || (isMr ? 'एमपीएससी उमेदवार' : 'MPSC Aspirant'), session?.email || null, imageSrc);
        setHasPassPhoto(true);
      } catch (e) {
        console.warn('Pass save error:', e);
      }
    }

    // 3. If destination includes 'hero' or 'all'
    if (targetDestination === 'hero' || targetDestination === 'all') {
      try {
        localStorage.setItem('mpsc_custom_hero_banner', imageSrc);
        setHasHeroBanner(true);
      } catch (e) {
        console.warn('Hero save error:', e);
      }
    }

    // 4. If destination includes 'background' or 'all'
    if (targetDestination === 'background' || targetDestination === 'all') {
      try {
        localStorage.setItem('mpsc_portal_background_config', JSON.stringify({
          presetId: 'custom',
          customUrl: imageSrc,
          opacity: 0.20,
          blur: 1,
          overlayMode: 'vignette',
          enabled: true,
        }));
        window.dispatchEvent(new Event('mpsc_background_changed'));
      } catch (e) {
        console.warn('Background save error:', e);
      }
    }

    // Dispatch global event for instant UI update
    window.dispatchEvent(new Event('mpsc_images_updated'));

    // Celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setSuccessMessage(isMr ? '🎉 इमेज यशस्वीरीत्या जोडली आहे!' : '🎉 Image successfully applied!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  // Delete an individual custom uploaded image from the gallery
  const handleDeleteGalleryImage = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      soundFx.playClickSound();
      const updated = savedCustomImages.filter((img) => img.id !== id);
      setSavedCustomImages(updated);
      localStorage.setItem('mpsc_custom_gallery_images', JSON.stringify(updated));
      window.dispatchEvent(new Event('mpsc_images_updated'));
      setSuccessMessage(isMr ? '🗑️ इमेज यशस्वीरीत्या हटवली आहे!' : '🗑️ Image successfully deleted!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Delete image error:', err);
    }
  };

  // Reset aspirant pass photo to default
  const handleResetPassPhoto = () => {
    try {
      soundFx.playClickSound();
      localStorage.removeItem('mpsc_aspirant_photo');
      const session = getLocalStudentSession();
      updateStudentProfile(session?.displayName || 'Guest User', session?.email || null, null);
      setHasPassPhoto(false);
      window.dispatchEvent(new Event('mpsc_images_updated'));
      setSuccessMessage(isMr ? '🪪 डिजिटल पास फोटो पूर्ववत (Default) केला आहे.' : '🪪 Pass photo reset to default.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Reset hero banner to default
  const handleResetHeroBanner = () => {
    try {
      soundFx.playClickSound();
      localStorage.removeItem('mpsc_custom_hero_banner');
      setHasHeroBanner(false);
      window.dispatchEvent(new Event('mpsc_images_updated'));
      setSuccessMessage(isMr ? '🏛️ मुख्य बॅनर पूर्ववत केला आहे.' : '🏛️ Hero banner reset to default.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border-2 border-amber-500/50 rounded-2xl w-full max-w-xl p-5 sm:p-6 shadow-2xl text-stone-100 space-y-4 max-h-[92vh] overflow-y-auto custom-scrollbar relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-black">
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {isMr ? '📸 तुम्हाला पाहिजे तशी इमेज ॲड करा' : '📸 Add Any Image You Want'}
              </h3>
              <p className="text-xs text-stone-400">
                {isMr 
                  ? 'मोबाईलमधून अपलोड करा, इंटरनेटवरून लिंक पेस्ट करा किंवा इमेजेस व्यवस्थापित करा.' 
                  : 'Upload from files, paste any image URL, or manage uploaded images.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Mode Selector Tabs (including Manage/Delete tab) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-stone-950 p-1.5 rounded-xl border border-stone-800">
          <button
            type="button"
            onClick={() => setInputMode('file')}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              inputMode === 'file'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-850'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isMr ? '१. फाइल / कॅमेरा' : '1. Upload'}</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              inputMode === 'url'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-850'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>{isMr ? '२. लिंक' : '2. URL'}</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('preset')}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              inputMode === 'preset'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-850'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isMr ? '३. प्रसिद्ध फोटो' : '3. Presets'}</span>
          </button>

          <button
            type="button"
            id="tab-manage-uploaded-images"
            onClick={() => setInputMode('manage')}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              inputMode === 'manage'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-850'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isMr ? '४. व्यवस्थापन' : '4. Manage'}</span>
            {savedCustomImages.length > 0 && (
              <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                inputMode === 'manage' 
                  ? 'bg-stone-950 text-amber-400' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {savedCustomImages.length}
              </span>
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: FILE / CAMERA UPLOAD */}
        {/* ========================================================================= */}
        {inputMode === 'file' && (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-stone-700 hover:border-amber-400 bg-stone-900/60 rounded-xl p-5 text-center cursor-pointer transition-all hover:bg-stone-850/60"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-2">
                <Upload className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-sm font-black text-white">
                {isMr ? 'मोबाईल गॅलरी किंवा कॉम्प्युटरमधून फोटो निवडा' : 'Click to select image file'}
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                {isMr ? 'JPG, PNG, WebP (पुस्तके, नोट्स, टेबल किंवा तुमचा स्वतःचा फोटो)' : 'Supports JPG, PNG, WebP'}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PASTE IMAGE URL */}
        {/* ========================================================================= */}
        {inputMode === 'url' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isMr ? 'इंटरनेटवरील कोणत्याही इमेजची थेट लिंक (Image URL) टाका:' : 'Paste Direct Image URL:'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... किंवा https://...jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400 font-mono"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-black text-xs hover:bg-amber-400 transition-all cursor-pointer shrink-0"
                >
                  {isMr ? 'प्रिव्ह्यू पहा' : 'Preview'}
                </button>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 italic">
              {isMr 
                ? 'टीप: Google वर इमेज शोधून तिची "Copy Image Link" करून येथे पेस्ट करा.' 
                : 'Tip: Right click any image online and click "Copy Image Address" then paste here.'}
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CHOOSE FROM PRESETS */}
        {/* ========================================================================= */}
        {inputMode === 'preset' && (
          <div className="space-y-2">
            <span className="text-xs font-bold text-stone-300">
              {isMr ? 'खालील प्रेरणादायी छायाचित्रांवर क्लिक करा:' : 'Choose from Library:'}
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {[
                { name: 'छत्रपती शिवाजी महाराज', src: '/chhatrapati_shivaji_maharaj.jpg' },
                { name: 'डॉ. आंबेडकर', src: '/dr_babasaheb_ambedkar.jpg' },
                { name: 'किल्ले रायगड', src: '/raigad_fort.jpg' },
                { name: 'मंत्रालय, मुंबई', src: '/mantralaya.jpg' },
                { name: 'भारतीय संविधान', src: '/constitution_of_india.jpg' },
                { name: 'संदर्भ पुस्तक', src: '/open_reference_book.jpg' },
                { name: 'पाठ्यपुस्तके', src: '/mpsc_textbooks.jpg' },
                { name: 'अभ्यासिका ग्रंथालय', src: '/library_books.jpg' },
              ].map((item) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => handleSelectPreset(item.src, item.name)}
                  className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    imageSrc === item.src
                      ? 'bg-amber-500/25 border-amber-400 ring-2 ring-amber-400/50'
                      : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-700 bg-stone-950">
                    <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-stone-300 truncate w-full">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MANAGE & DELETE UPLOADED IMAGES */}
        {/* ========================================================================= */}
        {inputMode === 'manage' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Trash2 className="w-4 h-4 text-amber-400" />
                <span>
                  {isMr 
                    ? `जोडलेल्या इमेजेसचे व्यवस्थापन (${savedCustomImages.length})` 
                    : `Manage Uploaded Images (${savedCustomImages.length})`}
                </span>
              </h4>
              <button
                type="button"
                onClick={() => setInputMode('file')}
                className="text-[11px] text-amber-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isMr ? 'नवीन इमेज जोडा' : 'Add New'}</span>
              </button>
            </div>

            {/* List of custom gallery images */}
            {savedCustomImages.length === 0 && !hasPassPhoto && !hasHeroBanner ? (
              <div className="p-8 rounded-xl bg-stone-950 border border-stone-800 text-center space-y-2">
                <ImageIcon className="w-10 h-10 text-stone-600 mx-auto" />
                <p className="text-sm font-bold text-stone-300">
                  {isMr ? 'सध्या कोणतीही अपलोड केलेली इमेज नाही.' : 'No uploaded images yet.'}
                </p>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  {isMr 
                    ? 'तुम्ही फाइल अपलोड करून किंवा लिंक जोडून आपल्या आवडीनुसार इमेजेस सेव्ह करू शकता.' 
                    : 'You can upload images or paste URLs to personalize your study gallery.'}
                </p>
                <button
                  type="button"
                  onClick={() => setInputMode('file')}
                  className="mt-2 px-4 py-2 bg-amber-500 text-stone-950 font-black rounded-lg text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  {isMr ? 'पहिली इमेज ॲड करा' : 'Upload First Image'}
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                {savedCustomImages.map((img) => (
                  <div 
                    key={img.id}
                    className="p-3 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 flex items-center justify-between gap-3 group transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-stone-800 bg-stone-900 shrink-0">
                        <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{img.title}</h5>
                        <p className="text-[11px] text-stone-400 truncate">{img.subtitle}</p>
                        <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {isMr ? '🖼️ प्रेरणा दालन' : '🖼️ Gallery'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setImageSrc(img.src);
                          setTitle(img.title);
                          setSubtitle(img.subtitle);
                          setInputMode('file');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        title={isMr ? 'एडिटरमध्ये उघडा' : 'Edit / Preview'}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isMr ? 'पहा' : 'View'}</span>
                      </button>

                      {/* Prominent Delete Button */}
                      <button
                        type="button"
                        id={`btn-delete-image-${img.id}`}
                        onClick={(e) => handleDeleteGalleryImage(img.id, e)}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 hover:text-rose-100 border border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                        title={isMr ? 'ही इमेज कायमची काढून टाका' : 'Delete this image'}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>{isMr ? 'हटवा' : 'Delete'}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Additional System Image Resets if custom ones exist */}
                {hasPassPhoto && (
                  <div className="p-3 rounded-xl bg-stone-950 border border-amber-500/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                        🪪
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          {isMr ? 'डिजिटल पासवरील वैयक्तिक फोटो' : 'Digital Pass Custom Photo'}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {isMr ? 'अधिकृत ओळखपत्रावर सक्रिय आहे' : 'Active on Aspirant Pass'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetPassPhoto}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 hover:text-rose-100 border border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>{isMr ? 'हटवा' : 'Delete'}</span>
                    </button>
                  </div>
                )}

                {hasHeroBanner && (
                  <div className="p-3 rounded-xl bg-stone-950 border border-amber-500/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                        🏛️
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          {isMr ? 'मुख्य बॅनरवरील वैयक्तिक इमेज' : 'Hero Banner Custom Image'}
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {isMr ? 'मुख्य पृष्ठाच्या शीर्षकावर सक्रिय आहे' : 'Active on Home Hero'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetHeroBanner}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 hover:text-rose-100 border border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>{isMr ? 'हटवा' : 'Delete'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* LIVE PREVIEW BOX (for File, URL, Preset modes) */}
        {/* ========================================================================= */}
        {inputMode !== 'manage' && imageSrc && (
          <div className="p-3 rounded-xl bg-stone-950 border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{isMr ? 'निवडलेल्या इमेजचा प्रिव्ह्यू' : 'Selected Image Preview'}</span>
              </span>
              <button
                type="button"
                onClick={() => setImageSrc('')}
                className="text-[11px] text-rose-400 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>{isMr ? 'हटवा' : 'Remove'}</span>
              </button>
            </div>

            <div className="w-full h-44 rounded-lg overflow-hidden border border-stone-800 bg-stone-900 relative">
              <img
                src={imageSrc}
                alt="Preview"
                className="w-full h-full object-contain"
                onError={() => {
                  alert(isMr ? 'इमेज लिंक अवैध आहे. कृपया थेट इमेज URL वापरा.' : 'Invalid image URL');
                  setImageSrc('');
                }}
              />
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DESTINATION SELECTION & FORM (for File, URL, Preset modes) */}
        {/* ========================================================================= */}
        {inputMode !== 'manage' && (
          <>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-300">
                {isMr ? 'ही इमेज कुठे दिसायला हवी? (Choose Placement) *' : 'Where should this image appear? *'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {[
                  { id: 'background', labelMr: '🎨 पार्श्वभूमी वॉलपेपर', labelEn: 'Background Wallpaper' },
                  { id: 'gallery', labelMr: '🖼️ प्रेरणा दालन', labelEn: 'Gallery' },
                  { id: 'pass', labelMr: '🪪 डिजिटल पास', labelEn: 'Digital Pass' },
                  { id: 'hero', labelMr: '🏛️ मुख्य बॅनर', labelEn: 'Hero Banner' },
                  { id: 'all', labelMr: '✨ सर्व ठिकाणी', labelEn: 'All Everywhere' },
                ].map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setTargetDestination(dest.id as any)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      targetDestination === dest.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/40'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-850'
                    }`}
                  >
                    {isMr ? dest.labelMr : dest.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {isMr ? 'इमेजचे नाव / शीर्षक' : 'Title / Caption'}
                </label>
                <input
                  type="text"
                  placeholder={isMr ? "उदा. माझे ध्येय / आवडते पुस्तक" : "e.g. My Goal / Favourite Book"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">
                  {isMr ? 'उपशीर्षक / कॅटेगरी' : 'Subtitle / Category'}
                </label>
                <input
                  type="text"
                  placeholder={isMr ? "उदा. अभ्यास नोट्स" : "e.g. Study Notes"}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs focus:outline-hidden focus:border-amber-400"
                />
              </div>
            </div>
          </>
        )}

        {/* ========================================================================= */}
        {/* INLINE UPLOADED IMAGES LIST VIEW (Visible in all tabs when user has uploaded images) */}
        {/* ========================================================================= */}
        {inputMode !== 'manage' && savedCustomImages.length > 0 && (
          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-stone-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {isMr 
                    ? `तुम्ही आधी जोडलेल्या इमेजेस (${savedCustomImages.length}):` 
                    : `Your Uploaded Images (${savedCustomImages.length}):`}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setInputMode('manage')}
                className="text-[11px] text-amber-400 hover:underline cursor-pointer"
              >
                {isMr ? 'सर्व व्यवस्थापित करा ➜' : 'Manage All ➜'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {savedCustomImages.slice(0, 4).map((img) => (
                <div 
                  key={img.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={img.src} alt={img.title} className="w-9 h-9 rounded object-cover border border-stone-800 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{img.title}</p>
                      <p className="text-[10px] text-stone-400 truncate">{img.subtitle}</p>
                    </div>
                  </div>

                  {/* Inline Delete Button */}
                  <button
                    type="button"
                    onClick={(e) => handleDeleteGalleryImage(img.id, e)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 hover:text-rose-100 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer shrink-0"
                    title={isMr ? 'ही इमेज हटवा' : 'Delete image'}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success Message Banner */}
        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold cursor-pointer"
          >
            {isMr ? 'बंद करा' : 'Close'}
          </button>

          {inputMode !== 'manage' ? (
            <button
              type="button"
              disabled={!imageSrc || isLoading}
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs disabled:opacity-50 transition-all shadow-md cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isMr ? '💾 ही इमेज लगेच सेव्ह करा' : '💾 Save Image Now'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setInputMode('file')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{isMr ? 'नवीन इमेज जोडा' : 'Add New Image'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
