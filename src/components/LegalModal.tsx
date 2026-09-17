import React from 'react';
import { ShieldCheck, FileText, Info, X } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'about' | null;
  onClose: () => void;
}

export function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            {type === 'privacy' && <ShieldCheck className="w-5 h-5 text-amber-600" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-amber-600" />}
            {type === 'about' && <Info className="w-5 h-5 text-amber-600" />}
            <h2 className="text-lg font-bold text-stone-800">
              {type === 'privacy' && 'Privacy Policy (गोपनीयता धोरण)'}
              {type === 'terms' && 'Terms of Service (अटी व शर्ती)'}
              {type === 'about' && 'About MPSC Sarathi (आमच्याबद्दल)'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-sm text-stone-700 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p>
                <strong>MPSC Sarathi</strong> (mpscsarathi.online व exam.mpscsarathi.online) वर आपल्या गोपनीयतेचा आदर राखणे हे आमचे प्रथम कर्तव्य आहे.
              </p>
              <h3 className="font-semibold text-stone-900 mt-3">१. माहिती संकलन:</h3>
              <p>
                आम्ही केवळ विद्यार्थ्यांची परीक्षा प्रगती, स्कोअर आणि लीडरबोर्डसाठी आवश्यक असलेली बेसिक प्रोफाईल माहिती सुरक्षितपणे संकलित करतो.
              </p>
              <h3 className="font-semibold text-stone-900 mt-3">२. Google AdSense व कुकीज (Cookies):</h3>
              <p>
                आम्ही आमच्या पोर्टलवर Google AdSense द्वारे जाहिराती दाखवतो. Google सह तृतीय-पक्ष विक्रेते (Third-party vendors) वापरकर्त्यांच्या पूर्वीच्या भेटींच्या आधारे जाहिराती देण्यासाठी कुकीज वापरतात. वापरकर्ते Google Ad Settings द्वारे वैयक्तिकृत जाहिराती बंद करू शकतात.
              </p>
              <h3 className="font-semibold text-stone-900 mt-3">३. डेटा सुरक्षा:</h3>
              <p>
                आम्ही कोणताही वैयक्तिक डेटा तृतीय पक्षांना विकत किंवा शेअर करत नाही. अधिक माहितीसाठी आपण आमच्याशी <strong>support@mpscsarathi.online</strong> वर संपर्क साधू शकता.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>MPSC Sarathi Online Portal</strong> वापरताना खालील अटी व शर्ती लागू होतात:
              </p>
              <h3 className="font-semibold text-stone-900 mt-3">१. शैक्षणिक उद्देश:</h3>
              <p>
                हे पोर्टल केवळ स्पर्धा परीक्षांच्या (MPSC, राज्यसेवा, संयुक्त गट ब व क) अभ्यासासाठी आणि सरावासाठी मोफत उपलब्ध करून दिले आहे.
              </p>
              <h3 className="font-semibold text-stone-900 mt-3">२. बौद्धिक संपदा (Intellectual Property):</h3>
              <p>
                पोर्टलवरील सर्व प्रश्नसंच, स्पष्टीकरणे आणि डिझाईन ही MPSC Sarathi ची मालमत्ता आहे. कोणत्याही व्यावसायिक फायद्यासाठी अनधिकृत कॉपी करण्यास मनाई आहे.
              </p>
              <h3 className="font-semibold text-stone-900 mt-3">३. मर्यादा:</h3>
              <p>
                आम्ही सर्व प्रश्न आयोगाच्या अभ्यासक्रमानुसार अद्ययावत ठेवण्याचा प्रयत्न करतो, तरीही परीक्षार्थींनी अधिकृत राजपत्रांचा संदर्भ घेणे गरजेचे आहे.
              </p>
            </>
          )}

          {type === 'about' && (
            <>
              <p>
                <strong>MPSC Sarathi</strong> हा महाराष्ट्रातील ग्रामीण व शहरी भागातील सर्व गरजू व होतकरू MPSC विद्यार्थ्यांसाठी मोफत गुणवत्तापूर्ण सराव देणारा उपक्रम आहे.
              </p>
              <h3 className="font-semibold text-stone-900 mt-3">आमचे उद्दिष्ट:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>सर्व स्पर्धा परीक्षांसाठी आधुनिक संगणक आधारित चाचणी (CBT) चा प्रत्यक्ष अनुभव देणे.</li>
                <li>विषयनिहाय विश्लेषण आणि सविस्तर मराठी स्पष्टीकरणासह सराव उपलब्ध करणे.</li>
                <li>स्पर्धेच्या युगात प्रत्येक विद्यार्थ्याला स्वतःची अचूक पातळी (Percentile & Accuracy) समजण्यास मदत करणे.</li>
              </ul>
              <p className="mt-3 text-xs text-stone-500">
                वेबसाइट: https://mpscsarathi.online | संपर्क: support@mpscsarathi.online
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition"
          >
            बंद करा (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
