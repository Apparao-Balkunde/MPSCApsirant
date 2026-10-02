import React, { useState, useRef } from 'react';
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
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { updateStudentProfile } from '../lib/firebase';

interface CustomImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'mr' | 'en';
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

  // Input modes: 'file' | 'url' | 'preset'
  const [inputMode, setInputMode] = useState<'file' | 'url' | 'preset'>('file');
  
  // Selected image state
  const [imageSrc, setImageSrc] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Target destination: 'gallery' | 'pass' | 'hero' | 'all'
  const [targetDestination, setTargetDestination] = useState<'gallery' | 'pass' | 'hero' | 'all'>('gallery');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
        const existing = raw ? JSON.parse(raw) : [];
        const newPhoto = {
          id: 'custom_' + Date.now(),
          title: finalTitle,
          subtitle: finalSubtitle,
          description: finalDesc,
          src: imageSrc,
          badge: isMr ? '✨ माझी इमेज' : '✨ My Image',
          tag: isMr ? 'वैयक्तिक इमेज' : 'Custom Image',
          isCustom: true,
        };
        localStorage.setItem('mpsc_custom_gallery_images', JSON.stringify([newPhoto, ...existing]));
      } catch (e) {
        console.warn('Gallery save error:', e);
      }
    }

    // 2. If destination includes 'pass' or 'all'
    if (targetDestination === 'pass' || targetDestination === 'all') {
      try {
        localStorage.setItem('mpsc_aspirant_photo', imageSrc);
        updateStudentProfile('MPSC Aspirant', '', imageSrc);
      } catch (e) {
        console.warn('Pass save error:', e);
      }
    }

    // 3. If destination includes 'hero' or 'all'
    if (targetDestination === 'hero' || targetDestination === 'all') {
      try {
        localStorage.setItem('mpsc_custom_hero_banner', imageSrc);
      } catch (e) {
        console.warn('Hero save error:', e);
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
                  ? 'मोबाईलमधून अपलोड करा, इंटरनेटवरून लिंक पेस्ट करा किंवा गॅलरीतून निवडा.' 
                  : 'Upload from files, paste any image URL, or choose inspiring presets.'}
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

        {/* Input Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-stone-950 p-1.5 rounded-xl border border-stone-800">
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
            <span>{isMr ? '१. फाइल / कॅमेरा' : '1. Upload File'}</span>
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
            <span>{isMr ? '२. इमेज लिंक (URL)' : '2. Paste Link'}</span>
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
        {/* LIVE PREVIEW BOX */}
        {/* ========================================================================= */}
        {imageSrc && (
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
        {/* DESTINATION SELECTION: WHERE TO APPLY */}
        {/* ========================================================================= */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-stone-300">
            {isMr ? 'ही इमेज कुठे दिसायला हवी? (Choose Placement) *' : 'Where should this image appear? *'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
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

        {/* Success Message Banner */}
        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-bold flex items-center gap-2">
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
            {isMr ? 'रद्द करा' : 'Cancel'}
          </button>

          <button
            type="button"
            disabled={!imageSrc || isLoading}
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs disabled:opacity-50 transition-all shadow-md cursor-pointer flex items-center gap-2 hover:scale-105"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isMr ? '💾 ही इमेज लगेच सेव्ह करा' : '💾 Save Image Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
