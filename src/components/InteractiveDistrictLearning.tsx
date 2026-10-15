import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import L from 'leaflet';
import { 
  Compass, 
  MapPin, 
  Play, 
  BookOpen, 
  Sparkles, 
  Flame, 
  Award, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronRight, 
  Layers, 
  Trees, 
  Landmark, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  ArrowRight,
  Maximize2,
  Minimize2,
  Mountain,
  Waves,
  Eye,
  Copy,
  Check,
  Map as MapIcon,
  Globe,
  FileText,
  Info,
  X,
  Castle,
  ShieldAlert,
  ArrowUpDown,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { 
  MAHARASHTRA_DISTRICTS_DATA, 
  MAHARASHTRA_DIVISIONS, 
  MaharashtraDistrict, 
  AdministrativeDivisionId 
} from '../data/maharashtraDistrictsData';
import { 
  DISTRICT_GEO_DATA, 
  DIVISION_MAP_BOUNDS, 
  DIVISION_COLORS, 
  MPSC_ATLAS_LANDMARKS, 
  MAHARASHTRA_DIVISION_POLYGONS,
  MPSC_ATLAS_RIVERS,
  MPSC_ATLAS_MOUNTAIN_RANGES,
  DistrictGeoPoint,
  MpscAtlasLandmark
} from '../data/maharashtraGeoData';
import { generateDistrictQuestions } from '../data/districtSpecificQuestions';
import { Question } from '../types';
import { AdBanner } from './AdBanner';
import { soundFx } from '../utils/audio';

// Atlas Basemap Tile Styles
export type MapTileStyle = 'natgeo' | 'physical' | 'opentopo' | 'carto' | 'satellite';

// Thematic Atlas Presets for MPSC Aspirants
export type AtlasThematicPreset = 'all' | 'admin' | 'physical' | 'rivers' | 'heritage' | 'unesco_energy';

interface InteractiveDistrictLearningProps {
  language?: 'mr' | 'en';
  onLaunchPractice: (questions: Question[], title: string, districtId: string) => void;
  onOpenAdSenseManager?: () => void;
  className?: string;
}

export const InteractiveDistrictLearning: React.FC<InteractiveDistrictLearningProps> = ({
  language = 'mr',
  onLaunchPractice,
  onOpenAdSenseManager,
  className = '',
}) => {
  const isMr = language === 'mr';
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('pune');
  const [selectedDivision, setSelectedDivision] = useState<AdministrativeDivisionId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProfileTab, setActiveProfileTab] = useState<'all' | 'geo' | 'hist' | 'econ'>('all');
  const [questionCount, setQuestionCount] = useState<10 | 15 | 20>(10);
  
  // Basemap & Thematic Layer States (Defaulting to genuine NatGeo School Atlas!)
  const [activeMapStyle, setActiveMapStyle] = useState<MapTileStyle>('natgeo');
  const [activeThematicPreset, setActiveThematicPreset] = useState<AtlasThematicPreset>('all');
  const [showDivisionsPolygon, setShowDivisionsPolygon] = useState<boolean>(true);
  const [showRivers, setShowRivers] = useState<boolean>(true);
  const [showMountainRanges, setShowMountainRanges] = useState<boolean>(true);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [selectedLandmarkType, setSelectedLandmarkType] = useState<'all' | 'peak' | 'lake_dam' | 'ghat' | 'wildlife' | 'fort' | 'heritage' | 'unesco' | 'energy'>('all');
  
  // UI states & modals
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);
  const [showAtlasNotesModal, setShowAtlasNotesModal] = useState<boolean>(false);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [compareDistrictIdA, setCompareDistrictIdA] = useState<string>('ahilyanagar');
  const [compareDistrictIdB, setCompareDistrictIdB] = useState<string>('pune');

  // Map DOM and instance references
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const districtMarkersRef = useRef<Map<string, L.Marker>>(new Map());
  const divisionPolygonsGroupRef = useRef<L.LayerGroup | null>(null);
  const riversLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const mountainsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const landmarkLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // Currently selected district object
  const activeDistrict = useMemo(() => {
    return (
      MAHARASHTRA_DISTRICTS_DATA.find((d) => d.id === selectedDistrictId) ||
      MAHARASHTRA_DISTRICTS_DATA[0]
    );
  }, [selectedDistrictId]);

  // Comparison districts
  const compareDistrictA = useMemo(() => {
    return MAHARASHTRA_DISTRICTS_DATA.find((d) => d.id === compareDistrictIdA) || MAHARASHTRA_DISTRICTS_DATA[0];
  }, [compareDistrictIdA]);

  const compareDistrictB = useMemo(() => {
    return MAHARASHTRA_DISTRICTS_DATA.find((d) => d.id === compareDistrictIdB) || MAHARASHTRA_DISTRICTS_DATA[1];
  }, [compareDistrictIdB]);

  // Questions for current district (customized by selected count)
  const districtQuestions = useMemo(() => {
    return generateDistrictQuestions(activeDistrict, questionCount);
  }, [activeDistrict, questionCount]);

  // Districts for current division (or all 36)
  const currentDivisionDistricts = useMemo(() => {
    if (selectedDivision === 'all') {
      return DISTRICT_GEO_DATA;
    }
    return DISTRICT_GEO_DATA.filter((d) => d.divisionId === selectedDivision);
  }, [selectedDivision]);

  // Filtered district list for search input
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return DISTRICT_GEO_DATA.filter(
      (d) => d.nameMr.toLowerCase().includes(q) || d.nameEn.toLowerCase().includes(q) || d.hqMr.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Create custom HTML icon for a district marker
  const createDistrictIcon = useCallback((
    point: DistrictGeoPoint, 
    isSelected: boolean,
    isFilteredOut: boolean
  ) => {
    const colors = DIVISION_COLORS[point.divisionId];
    const pulseRing = isSelected 
      ? '<span class="absolute -inset-2 rounded-full animate-ping bg-amber-500 opacity-60 pointer-events-none"></span>' 
      : '';

    const html = `
      <div class="relative flex items-center justify-center cursor-pointer select-none group" style="opacity: ${isFilteredOut ? 0.35 : 1}; transition: all 0.25s ease;">
        ${pulseRing}
        <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg transition-transform duration-200 ${
          isSelected 
            ? 'bg-amber-600 text-white ring-2 ring-white ring-offset-2 ring-offset-amber-800 scale-110 z-40 font-black' 
            : 'bg-white/95 text-stone-900 border border-stone-300 hover:border-amber-500 hover:scale-105 z-10 font-bold'
        }" style="border-left: 4px solid ${colors.primary}; box-shadow: 0 4px 12px rgba(0,0,0,0.25);">
          <span class="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs" style="background-color: ${isSelected ? '#ffffff' : colors.primary};"></span>
          <span class="text-[11px] leading-tight whitespace-nowrap tracking-tight">${point.nameMr}</span>
          <span class="text-[9px] font-mono px-1 py-0.5 rounded ${isSelected ? 'bg-amber-700 text-amber-100' : 'bg-stone-100 text-stone-600'}">${point.rtoCode.split(',')[0]}</span>
        </div>
      </div>
    `;

    return L.divIcon({
      className: 'atlas-district-pin',
      iconSize: [120, 36],
      iconAnchor: [60, 18],
      html,
    });
  }, []);

  // Create custom HTML icon for MPSC landmarks
  const createLandmarkIcon = useCallback((landmark: MpscAtlasLandmark) => {
    let iconChar = '⛰️';
    let bgColor = '#065f46'; // emerald for peaks
    if (landmark.type === 'lake_dam') {
      iconChar = '💧';
      bgColor = '#0284c7'; // sky/blue for dams
    } else if (landmark.type === 'ghat') {
      iconChar = '🛤️';
      bgColor = '#b45309'; // amber for ghats
    } else if (landmark.type === 'wildlife') {
      iconChar = '🐅';
      bgColor = '#be123c'; // rose for tiger reserves
    } else if (landmark.type === 'fort') {
      iconChar = '🏰';
      bgColor = '#7c2d12'; // deep rust for forts
    } else if (landmark.type === 'heritage') {
      iconChar = '🕉️';
      bgColor = '#ea580c'; // saffron for jyotirlingas
    } else if (landmark.type === 'unesco') {
      iconChar = '🏛️';
      bgColor = '#6d28d9'; // purple for UNESCO / Ramsar
    } else if (landmark.type === 'energy') {
      iconChar = '⚡';
      bgColor = '#b45309'; // amber/orange for power
    }

    const html = `
      <div class="flex items-center gap-1 px-2 py-0.5 rounded-full text-white shadow-md cursor-pointer hover:scale-115 transition-transform text-[10px] font-bold border border-white/70 select-none whitespace-nowrap" style="background-color: ${bgColor}; box-shadow: 0 2px 8px rgba(0,0,0,0.35);">
        <span class="text-xs">${iconChar}</span>
        <span class="truncate max-w-[110px]">${landmark.nameMr.split(' ')[0]}</span>
      </div>
    `;

    return L.divIcon({
      className: 'atlas-landmark-pin',
      iconSize: [140, 26],
      iconAnchor: [70, 13],
      html,
    });
  }, []);

  // Function to switch tile layers smoothly
  const updateTileLayer = useCallback((style: MapTileStyle) => {
    if (!leafletMapRef.current) return;

    if (tileLayerRef.current) {
      leafletMapRef.current.removeLayer(tileLayerRef.current);
    }

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
    let attribution = 'National Geographic, Esri World Atlas';
    let maxZoom = 16;
    let subdomains = 'abc';

    if (style === 'natgeo') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
      attribution = 'National Geographic, Esri Atlas';
      maxZoom = 16;
      subdomains = 'abc';
    } else if (style === 'physical') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Esri World Topographic Physical';
      maxZoom = 18;
      subdomains = 'abc';
    } else if (style === 'opentopo') {
      url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenTopoMap contributors';
      maxZoom = 17;
      subdomains = 'abc';
    } else if (style === 'carto') {
      url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      attribution = '&copy; CARTO &copy; OpenStreetMap';
      maxZoom = 19;
      subdomains = 'abcd';
    } else if (style === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = 'Esri World Imagery';
      maxZoom = 18;
      subdomains = 'abc';
    }

    const newLayer = L.tileLayer(url, {
      attribution,
      maxZoom,
      subdomains,
    });

    newLayer.addTo(leafletMapRef.current);
    tileLayerRef.current = newLayer;
  }, []);

  // Handle Preset Changes
  const handleApplyPreset = (preset: AtlasThematicPreset) => {
    setActiveThematicPreset(preset);
    soundFx.playClickSound();

    if (preset === 'admin') {
      setActiveMapStyle('natgeo');
      setShowDivisionsPolygon(true);
      setShowRivers(false);
      setShowMountainRanges(false);
      setShowLandmarks(false);
    } else if (preset === 'physical') {
      setActiveMapStyle('physical');
      setShowDivisionsPolygon(false);
      setShowRivers(true);
      setShowMountainRanges(true);
      setShowLandmarks(true);
      setSelectedLandmarkType('peak');
    } else if (preset === 'rivers') {
      setActiveMapStyle('physical');
      setShowDivisionsPolygon(false);
      setShowRivers(true);
      setShowMountainRanges(false);
      setShowLandmarks(true);
      setSelectedLandmarkType('lake_dam');
    } else if (preset === 'heritage') {
      setActiveMapStyle('natgeo');
      setShowDivisionsPolygon(true);
      setShowRivers(false);
      setShowMountainRanges(false);
      setShowLandmarks(true);
      setSelectedLandmarkType('fort');
    } else if (preset === 'unesco_energy') {
      setActiveMapStyle('natgeo');
      setShowDivisionsPolygon(true);
      setShowRivers(true);
      setShowMountainRanges(false);
      setShowLandmarks(true);
      setSelectedLandmarkType('unesco');
    } else {
      // All
      setActiveMapStyle('natgeo');
      setShowDivisionsPolygon(true);
      setShowRivers(true);
      setShowMountainRanges(true);
      setShowLandmarks(true);
      setSelectedLandmarkType('all');
    }
  };

  // Zoom helpers
  const handleZoomIn = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.zoomIn();
      soundFx.playClickSound();
    }
  };

  const handleZoomOut = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.zoomOut();
      soundFx.playClickSound();
    }
  };

  const handleResetMap = () => {
    if (leafletMapRef.current) {
      setSelectedDivision('all');
      leafletMapRef.current.flyTo([19.5, 75.8], 6.8, { duration: 1.2 });
      soundFx.playClickSound();
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (leafletMapRef.current) return; // Prevent duplicate instantiation

    const initialCenter: [number, number] = [19.5, 75.8];
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 6.8,
      minZoom: 6,
      maxZoom: 14,
      zoomControl: false, // We render clean floating custom controls
      attributionControl: true,
    });

    // Add metric scale line (standard in printed school atlases)
    L.control.scale({ imperial: false, metric: true, position: 'bottomleft' }).addTo(map);

    map.setMaxBounds([
      [14.0, 70.0],
      [23.5, 83.5]
    ]);

    leafletMapRef.current = map;

    // Add default NatGeo tile layer
    updateTileLayer(activeMapStyle);

    // Create Layer Groups
    divisionPolygonsGroupRef.current = L.layerGroup().addTo(map);
    riversLayerGroupRef.current = L.layerGroup().addTo(map);
    mountainsLayerGroupRef.current = L.layerGroup().addTo(map);
    landmarkLayerGroupRef.current = L.layerGroup().addTo(map);

    // Add 36 District Markers
    DISTRICT_GEO_DATA.forEach((district) => {
      const isSelected = district.id === selectedDistrictId;
      const isFilteredOut = selectedDivision !== 'all' && district.divisionId !== selectedDivision;
      const icon = createDistrictIcon(district, isSelected, isFilteredOut);

      const marker = L.marker([district.lat, district.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 100,
        title: `${district.nameMr} (${district.nameEn})`,
      });

      // Bind interactive tooltip
      marker.bindTooltip(`
        <div class="p-1 font-sans">
          <div class="font-extrabold text-stone-900">${district.nameMr} (${district.nameEn})</div>
          <div class="text-[11px] text-amber-700 font-semibold">${district.taglineMr}</div>
          <div class="text-[10px] text-stone-600 mt-0.5">मुख्यालय: ${district.hqMr} | तालुके: ${district.talukasCount}</div>
        </div>
      `, {
        direction: 'top',
        offset: [0, -18],
        opacity: 0.95,
        className: 'rounded-xl shadow-lg border border-amber-300'
      });

      // On marker click: select, fly to and show popup
      marker.on('click', () => {
        setSelectedDistrictId(district.id);
        soundFx.playClickSound();
        map.flyTo([district.lat, district.lng], Math.max(map.getZoom(), 8.5), {
          duration: 1.0,
          easeLinearity: 0.25,
        });
      });

      marker.addTo(map);
      districtMarkersRef.current.set(district.id, marker);
    });

    setTimeout(() => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize();
      }
    }, 250);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Update map tile layer when activeMapStyle changes
  useEffect(() => {
    updateTileLayer(activeMapStyle);
  }, [activeMapStyle, updateTileLayer]);

  // Render Division Colored Polygons
  useEffect(() => {
    if (!divisionPolygonsGroupRef.current || !leafletMapRef.current) return;
    divisionPolygonsGroupRef.current.clearLayers();

    if (showDivisionsPolygon) {
      (Object.keys(MAHARASHTRA_DIVISION_POLYGONS) as AdministrativeDivisionId[]).forEach((divId) => {
        const coords = MAHARASHTRA_DIVISION_POLYGONS[divId];
        const colors = DIVISION_COLORS[divId];
        const isDivSelected = selectedDivision === divId;
        const isOtherDivSelected = selectedDivision !== 'all' && selectedDivision !== divId;

        const polygon = L.polygon(coords, {
          color: colors.primary,
          weight: isDivSelected ? 3 : 1.5,
          opacity: isOtherDivSelected ? 0.3 : 0.85,
          fillColor: colors.fillColor,
          fillOpacity: isDivSelected ? 0.45 : isOtherDivSelected ? 0.08 : 0.22,
          smoothFactor: 1.5,
        });

        const divMeta = MAHARASHTRA_DIVISIONS.find((d) => d.id === divId);

        polygon.bindTooltip(`
          <div class="p-1 font-sans">
            <div class="font-black text-xs" style="color: ${colors.primary};">${divMeta?.nameMr}</div>
            <div class="text-[10px] text-stone-600">मुख्यालय: ${divMeta?.hqMr} | जिल्हे: ${divMeta?.districtsCount}</div>
          </div>
        `, { sticky: true, opacity: 0.95 });

        polygon.on('click', () => {
          handleSelectDivision(divId);
        });

        divisionPolygonsGroupRef.current?.addLayer(polygon);
      });
    }
  }, [showDivisionsPolygon, selectedDivision]);

  // Render Rivers Overlay
  useEffect(() => {
    if (!riversLayerGroupRef.current || !leafletMapRef.current) return;
    riversLayerGroupRef.current.clearLayers();

    if (showRivers) {
      MPSC_ATLAS_RIVERS.forEach((river) => {
        const polyline = L.polyline(river.points, {
          color: river.color,
          weight: 4,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round',
        });

        polyline.bindTooltip(`
          <div class="p-1.5 font-sans max-w-[220px]">
            <div class="font-black text-xs text-blue-900 flex items-center gap-1">
              <span>🌊 ${river.nameMr}</span>
            </div>
            <div class="text-[10px] text-stone-600 mt-0.5 leading-snug">${river.descriptionMr}</div>
          </div>
        `, { sticky: true, opacity: 0.95 });

        riversLayerGroupRef.current?.addLayer(polyline);
      });
    }
  }, [showRivers]);

  // Render Mountain Ranges Overlay
  useEffect(() => {
    if (!mountainsLayerGroupRef.current || !leafletMapRef.current) return;
    mountainsLayerGroupRef.current.clearLayers();

    if (showMountainRanges) {
      MPSC_ATLAS_MOUNTAIN_RANGES.forEach((range) => {
        const polyline = L.polyline(range.points, {
          color: '#78350f',
          weight: 4,
          opacity: 0.8,
          dashArray: '8, 6',
          lineCap: 'round',
        });

        polyline.bindTooltip(`
          <div class="p-1.5 font-sans max-w-[220px]">
            <div class="font-black text-xs text-amber-950 flex items-center gap-1">
              <span>⛰️ ${range.nameMr}</span>
            </div>
            <div class="text-[10px] text-stone-600 mt-0.5 leading-snug">${range.descriptionMr}</div>
          </div>
        `, { sticky: true, opacity: 0.95 });

        mountainsLayerGroupRef.current?.addLayer(polyline);
      });
    }
  }, [showMountainRanges]);

  // Update district markers appearance
  useEffect(() => {
    if (!leafletMapRef.current) return;

    districtMarkersRef.current.forEach((marker, distId) => {
      const distData = DISTRICT_GEO_DATA.find((d) => d.id === distId);
      if (!distData) return;

      const isSelected = distId === selectedDistrictId;
      const isFilteredOut = selectedDivision !== 'all' && distData.divisionId !== selectedDivision;
      
      marker.setIcon(createDistrictIcon(distData, isSelected, isFilteredOut));
      marker.setZIndexOffset(isSelected ? 1000 : isFilteredOut ? 10 : 200);
    });
  }, [selectedDistrictId, selectedDivision, createDistrictIcon]);

  // Update MPSC Landmarks layer
  useEffect(() => {
    if (!landmarkLayerGroupRef.current || !leafletMapRef.current) return;
    landmarkLayerGroupRef.current.clearLayers();

    if (showLandmarks) {
      const filtered = selectedLandmarkType === 'all'
        ? MPSC_ATLAS_LANDMARKS
        : MPSC_ATLAS_LANDMARKS.filter((l) => l.type === selectedLandmarkType);

      filtered.forEach((landmark) => {
        const icon = createLandmarkIcon(landmark);
        const marker = L.marker([landmark.lat, landmark.lng], {
          icon,
          zIndexOffset: 300,
        });

        marker.bindTooltip(`
          <div class="p-1.5 font-sans max-w-[220px]">
            <div class="font-extrabold text-amber-900 flex items-center gap-1">
              <span>⭐ ${landmark.nameMr}</span>
            </div>
            <div class="text-[10px] text-stone-500 font-bold">${landmark.districtMr}</div>
            <div class="text-[11px] text-stone-700 mt-1 leading-snug">${landmark.factMr}</div>
          </div>
        `, {
          direction: 'top',
          offset: [0, -14],
          opacity: 0.95,
          className: 'rounded-xl shadow-md border border-amber-300'
        });

        marker.on('click', () => {
          soundFx.playClickSound();
          leafletMapRef.current?.flyTo([landmark.lat, landmark.lng], 9.5, { duration: 1.0 });
        });

        landmarkLayerGroupRef.current?.addLayer(marker);
      });
    }
  }, [showLandmarks, selectedLandmarkType, createLandmarkIcon]);

  // When division filter changes
  const handleSelectDivision = (divId: AdministrativeDivisionId | 'all') => {
    setSelectedDivision(divId);
    soundFx.playClickSound();

    if (leafletMapRef.current) {
      const bounds = DIVISION_MAP_BOUNDS[divId];
      leafletMapRef.current.flyToBounds(bounds, {
        padding: [40, 40],
        duration: 1.2,
        maxZoom: divId === 'all' ? 7.2 : 8.5,
      });
    }

    // If active district not in selected division, pick first district of that division
    if (divId !== 'all') {
      const match = DISTRICT_GEO_DATA.find((d) => d.divisionId === divId);
      if (match && match.divisionId !== activeDistrict.divisionId) {
        setSelectedDistrictId(match.id);
      }
    }
  };

  // When a district is selected via search or list
  const handleSelectDistrict = (distId: string) => {
    setSelectedDistrictId(distId);
    soundFx.playClickSound();

    const distPoint = DISTRICT_GEO_DATA.find((d) => d.id === distId);
    if (distPoint && leafletMapRef.current) {
      leafletMapRef.current.flyTo([distPoint.lat, distPoint.lng], 9, {
        duration: 1.1,
      });
    }
  };

  // Launch targeted district test
  const handleStartExam = () => {
    soundFx.playDingSound();
    const title = `${activeDistrict.nameMr} - ${questionCount} प्रश्न सराव चाचणी (भूगोल, इतिहास, अर्थव्यवस्था)`;
    onLaunchPractice(districtQuestions, title, activeDistrict.id);
  };

  // Launch Division Mega Test or Grand State Test
  const handleLaunchDivisionTest = () => {
    soundFx.playDingSound();
    if (selectedDivision === 'all') {
      const allQs = MAHARASHTRA_DISTRICTS_DATA.flatMap((d) => generateDistrictQuestions(d, 5));
      const shuffled = [...allQs].sort(() => 0.5 - Math.random()).slice(0, 50);
      onLaunchPractice(shuffled, 'महाराष्ट्र ३६ जिल्हे राज्यस्तरीय महा-सराव चाचणी (५० प्रश्न)', 'all_36_districts');
    } else {
      const divMeta = MAHARASHTRA_DIVISIONS.find((d) => d.id === selectedDivision);
      const divDistricts = MAHARASHTRA_DISTRICTS_DATA.filter((d) => d.divisionId === selectedDivision);
      const divQs = divDistricts.flatMap((d) => generateDistrictQuestions(d, 5));
      const shuffled = [...divQs].sort(() => 0.5 - Math.random()).slice(0, 25);
      onLaunchPractice(shuffled, `${divMeta?.nameMr || 'विभागीय'} विशेष महा-चाचणी (२५ प्रश्न)`, `division_${selectedDivision}`);
    }
  };

  // Copy district factfile to clipboard
  const handleCopyDistrictFacts = () => {
    const text = `🗺️ ${activeDistrict.nameMr} (${activeDistrict.nameEn}) - MPSC जिल्हा विशेष:\n` +
      `• विभाग: ${activeDistrict.divisionNameMr} (मुख्यालय: ${activeDistrict.hqMr})\n` +
      `• RTO: ${activeDistrict.rtoCode} | क्षेत्रफळ: ${activeDistrict.areaSqKm.toLocaleString('en-IN')} चौ.किमी\n` +
      `• तालुके (${activeDistrict.talukasCount}): ${activeDistrict.prominentTalukasMr.join(', ')}\n` +
      `• प्रमुख नद्या: ${activeDistrict.majorRiversMr.join(', ')}\n` +
      `• किल्ले: ${activeDistrict.historicalFortsMr.join(', ')}\n` +
      `• पिके: ${activeDistrict.majorCropsMr.join(', ')}\n` +
      `• अभयारण्ये: ${activeDistrict.sanctuariesAndParksMr.join(', ')}\n` +
      `⭐ MPSC परीक्षेचे सुवर्ण मुद्दे:\n${activeDistrict.mpscGoldenFactsMr.map(f => ` - ${f}`).join('\n')}\n` +
      `\n🔗 MPSC Aspirant Prep App`;

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    soundFx.playClickSound();
    setTimeout(() => setCopiedSuccess(false), 2200);
  };

  // Invalidate map size on expand toggle
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setTimeout(() => {
      leafletMapRef.current?.invalidateSize();
    }, 250);
  };

  return (
    <div className={`bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden text-stone-800 ${className}`}>
      
      {/* Top Header Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-[11px] font-black uppercase tracking-wider text-amber-100 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-amber-200" />
              <span>{isMr ? 'महाराष्ट्र ऍटलास नकाशा (Atlas Map)' : 'Maharashtra Atlas Map'}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-200 text-[10px] font-mono font-bold">
              NatGeo • Topo Relief • Rivers • 36 Districts
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black mt-1 flex items-center gap-2 tracking-tight">
            <span>🗺️ महाराष्ट्राचे ३६ जिल्हे - खरा ऍटलास नकाशा व जिल्हा विशेष</span>
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-2xl font-medium">
            {isMr 
              ? 'शालेय ऍटलासप्रमाणे नकाशे (NatGeo / Topographic / Relief), ६ प्रशासकीय विभाग, प्रमुख नद्यांची खोरी, सह्याद्री पर्वतरांगा, युनेस्को वारसा स्थळे व ३६ जिल्हे.'
              : 'Authentic physical & political Atlas map with division polygons, river systems, mountain ranges, peaks, and 36 districts.'}
          </p>
        </div>

        {/* Quick Launch & Comparison Actions */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setShowCompareModal(true)}
            className="px-3 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 text-white border border-amber-300/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm active:scale-95 shadow-sm"
            title="दोन जिल्ह्यांची थेट तुलना करा (क्षेत्रफळ, तालुके, साक्षरता)"
          >
            <ArrowUpDown className="w-4 h-4 text-amber-300" />
            <span>{isMr ? '⚖️ दोन जिल्ह्यांची तुलना' : 'Compare Districts'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAtlasNotesModal(true)}
            className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm active:scale-95"
            title="एमपीएससी ऍटलास वाचन तक्ता व महत्वाचे नकाशे"
          >
            <BookOpen className="w-4 h-4 text-amber-200" />
            <span>{isMr ? '📖 ऍटलास तक्ता' : 'Atlas Notes'}</span>
          </button>

          <button
            type="button"
            onClick={handleLaunchDivisionTest}
            className="px-3.5 py-2 rounded-xl bg-stone-900/90 hover:bg-black text-amber-300 border border-amber-400/40 text-xs font-black flex items-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 whitespace-nowrap"
            title="सर्व ३६ जिल्ह्यांची ५० प्रश्नांची किंवा या विभागाची २५ प्रश्नांची महा-चाचणी"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>
              {selectedDivision === 'all'
                ? (isMr ? '🌟 ३६ जिल्हे महा-चाचणी (५० प्रश्न)' : '🌟 36 Districts Test (50 Qs)')
                : (isMr ? `🏆 ${MAHARASHTRA_DIVISIONS.find(d => d.id === selectedDivision)?.nameMr.split(' ')[0]} चाचणी (२५ Qs)` : 'Division Test (25 Qs)')}
            </span>
          </button>
        </div>
      </div>

      {/* Thematic Atlas Preset Selector Ribbon (MPSC Aspirant Special) */}
      <div className="px-3 sm:px-4 py-2 bg-amber-50/80 border-b border-amber-200/80 flex items-center justify-between gap-2 overflow-x-auto text-xs">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="font-black text-amber-900 flex items-center gap-1 shrink-0 text-[11px]">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>ऍटलास थीम:</span>
          </span>

          <button
            type="button"
            onClick={() => handleApplyPreset('all')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
              activeThematicPreset === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            🌟 सर्व थर (Full)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset('admin')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
              activeThematicPreset === 'admin'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            🗺️ प्रशासकीय विभाग (Admin)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset('physical')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
              activeThematicPreset === 'physical'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            🏔️ प्राकृतिक व शिखरे (Physical)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset('rivers')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
              activeThematicPreset === 'rivers'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            🌊 नद्या व धरणे (Rivers & Dams)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset('heritage')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
              activeThematicPreset === 'heritage'
                ? 'bg-orange-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            🏰 किल्ले व ज्योतिर्लिंगे (Heritage)
          </button>

          <button
            type="button"
            onClick={() => handleApplyPreset('unesco_energy')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-xs ${
              activeThematicPreset === 'unesco_energy'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            🏛️ युनेस्को व ऊर्जा प्रकल्प (UNESCO)
          </button>
        </div>

        <span className="text-[10px] text-amber-800 font-bold hidden md:inline-block shrink-0">
          💡 टीप: नकाशावरील कोणत्याही चिन्हावर क्लिक करताच थेट माहिती दिसते
        </span>
      </div>

      {/* Control Bar: Division Buttons + Search */}
      <div className="p-3 sm:p-4 bg-stone-50 border-b border-stone-200 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Division Selector Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
            <button
              type="button"
              onClick={() => handleSelectDivision('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                selectedDivision === 'all'
                  ? 'bg-stone-900 text-amber-300 shadow-xs ring-2 ring-stone-900'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>{isMr ? 'सर्व ३६ जिल्हे' : 'All 36 Districts'}</span>
            </button>

            {MAHARASHTRA_DIVISIONS.map((div) => {
              const isSelected = selectedDivision === div.id;
              const colors = DIVISION_COLORS[div.id];
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => handleSelectDivision(div.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shadow-2xs flex items-center gap-1.5 ${
                    isSelected
                      ? `${colors.badgeBg} text-white shadow-xs ring-2 ring-offset-1 ring-amber-500`
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                  <span>{div.nameMr.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Search District Input with Autocomplete */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isMr ? "जिल्हा शोधा (उदा. सातारा, नागपूर)..." : "Search district..."}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />

            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl border border-stone-200 shadow-xl z-50 max-h-52 overflow-y-auto p-1 space-y-1">
                {searchResults.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      handleSelectDistrict(d.id);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 text-xs font-bold text-stone-800 flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{d.nameMr}</span>
                      <span className="text-[10px] text-stone-500 font-mono">({d.rtoCode.split(',')[0]})</span>
                    </span>
                    <span className="text-[10px] font-semibold text-stone-500">{d.hqMr}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick District Navigation Chips Ribbon (Instant jump to district!) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-thin">
          <span className="text-[10px] font-black text-stone-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-600" />
            <span>झटपट निवड:</span>
          </span>

          {currentDivisionDistricts.map((d) => {
            const isSelected = d.id === selectedDistrictId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => handleSelectDistrict(d.id)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-xs ring-1 ring-amber-700'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                <span>{d.nameMr}</span>
                <span className={`text-[9px] font-mono px-1 rounded ${isSelected ? 'bg-amber-700 text-amber-100' : 'bg-stone-100 text-stone-500'}`}>
                  {d.rtoCode.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container: Map (Left) + District Factfile & Practice Launcher (Right) */}
      <div className={`grid grid-cols-1 ${isExpanded ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-0`}>
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: REAL LEAFLET ATLAS MAP (7 COLS or FULL)       */}
        {/* ========================================================= */}
        <div className={`${isExpanded ? 'w-full' : 'lg:col-span-7'} border-b lg:border-b-0 lg:border-r border-stone-200 relative flex flex-col bg-stone-100 min-h-[490px]`}>
          
          {/* Floating Atlas Toolbar on Map */}
          <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            
            {/* Atlas Basemap Style Switcher Pills */}
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-stone-200 shadow-md pointer-events-auto">
              <button
                type="button"
                onClick={() => setActiveMapStyle('natgeo')}
                className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                  activeMapStyle === 'natgeo' 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                title="प्रसिद्ध नॅशनल जिओग्राफिक स्कूल ऍटलास नकाशा (NatGeo School Atlas)"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{isMr ? '📜 ऍटलास' : 'NatGeo Atlas'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMapStyle('physical')}
                className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                  activeMapStyle === 'physical' 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                title="प्राकृतिक भूरूप नकाशा (Topographic Relief)"
              >
                <Mountain className="w-3.5 h-3.5" />
                <span>{isMr ? '🏔️ प्राकृतिक' : 'Relief'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMapStyle('opentopo')}
                className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                  activeMapStyle === 'opentopo' 
                    ? 'bg-teal-700 text-white shadow-xs' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                title="ओपन-टोपो समोच्च रेषा नकाशा (Contour OpenTopo)"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isMr ? '📐 टोपो' : 'Topo'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMapStyle('satellite')}
                className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${
                  activeMapStyle === 'satellite' 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                title="उपग्रह नकाशा (Esri Satellite)"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{isMr ? '🛰️ सॅटेलाईट' : 'Satellite'}</span>
              </button>
            </div>

            {/* Layer Toggles & Fullscreen Controls */}
            <div className="flex items-center gap-1.5 pointer-events-auto flex-wrap">
              
              {/* Toggle Division Polygons */}
              <button
                type="button"
                onClick={() => setShowDivisionsPolygon(!showDivisionsPolygon)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md border ${
                  showDivisionsPolygon
                    ? 'bg-amber-800 text-white border-amber-900'
                    : 'bg-white/95 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title="६ प्रशासकीय विभागांचे रंगीत क्षेत्र दर्शवा/लपवा"
              >
                <span>{showDivisionsPolygon ? '🗺️ विभाग चालू' : '🗺️ विभाग बंद'}</span>
              </button>

              {/* Toggle Rivers */}
              <button
                type="button"
                onClick={() => setShowRivers(!showRivers)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md border ${
                  showRivers
                    ? 'bg-blue-700 text-white border-blue-800'
                    : 'bg-white/95 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title="गोदावरी, भीमा, कृष्णा, तापी व वैनगंगा नद्या दर्शवा/लपवा"
              >
                <span>{showRivers ? '🌊 नद्या चालू' : '🌊 नद्या बंद'}</span>
              </button>

              {/* Toggle Mountain Ranges */}
              <button
                type="button"
                onClick={() => setShowMountainRanges(!showMountainRanges)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md border ${
                  showMountainRanges
                    ? 'bg-amber-900 text-white border-amber-950'
                    : 'bg-white/95 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title="सह्याद्री, सातपुडा, हरिश्चंद्र-बालाघाट रांगा दर्शवा/लपवा"
              >
                <span>{showMountainRanges ? '⛰️ रांगा चालू' : '⛰️ रांगा बंद'}</span>
              </button>

              {/* Toggle Landmarks Filter */}
              <button
                type="button"
                onClick={() => setShowLandmarks(!showLandmarks)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-md border ${
                  showLandmarks
                    ? 'bg-emerald-800 text-white border-emerald-900'
                    : 'bg-white/95 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
                title="शिखरे, धरणे, किल्ले, ज्योतिर्लिंगे, युनेस्को वारसा दर्शवा/लपवा"
              >
                <span>{showLandmarks ? '⭐ ठिकाणे चालू' : '⭐ ठिकाणे बंद'}</span>
              </button>

              {/* Reset View */}
              <button
                type="button"
                onClick={handleResetMap}
                className="p-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 shadow-md cursor-pointer"
                title="नकाशा पूर्ववत करा (Reset View / Center Maharashtra)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Fullscreen Expand Toggle */}
              <button
                type="button"
                onClick={toggleExpand}
                className="p-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 shadow-md cursor-pointer"
                title={isExpanded ? "मूळ आकार (Collapse)" : "नकाशा मोठा करा (Expand)"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Dedicated Zoom & Compass Overlay in Map View */}
          <div className="absolute right-3 top-16 z-[1000] flex flex-col gap-1.5 pointer-events-auto">
            <button
              type="button"
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md border border-stone-300 shadow-md flex items-center justify-center text-stone-800 hover:bg-stone-100 font-black cursor-pointer text-base active:scale-95"
              title="मोठे करा (Zoom In)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md border border-stone-300 shadow-md flex items-center justify-center text-stone-800 hover:bg-stone-100 font-black cursor-pointer text-base active:scale-95"
              title="लहान करा (Zoom Out)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Top-Left Authentic Atlas Compass Rose Needle */}
          <div className="absolute left-3 top-16 z-[990] pointer-events-none hidden sm:flex flex-col items-center p-1 rounded-xl bg-white/80 backdrop-blur-xs border border-stone-200/80 shadow-xs">
            <span className="text-[9px] font-black text-rose-600 leading-none">N</span>
            <Compass className="w-4 h-4 text-stone-700" />
            <span className="text-[8px] font-bold text-stone-500 leading-none">उ</span>
          </div>

          {/* Leaflet Map Div Container */}
          <div 
            ref={mapContainerRef} 
            className={`w-full ${isExpanded ? 'h-[640px]' : 'h-[500px] sm:h-[560px]'} z-0`}
            style={{ touchAction: 'pan-x pan-y' }}
          />

          {/* Bottom Floating Legend & Atlas Hints */}
          <div className="p-2.5 bg-white/95 backdrop-blur-md border-t border-stone-200 flex items-center justify-between flex-wrap gap-2 text-[11px] text-stone-700 z-10">
            <div className="flex items-center gap-2 font-bold text-stone-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse shrink-0" />
              <span>{isMr ? 'नकाशावरील कोणत्याही जिल्ह्यावर किंवा चिन्हावर क्लिक करा' : 'Click on district pin or icon to view facts'}</span>
            </div>

            {/* Division Color Key */}
            <div className="flex items-center gap-2 flex-wrap">
              {MAHARASHTRA_DIVISIONS.map((div) => {
                const colors = DIVISION_COLORS[div.id];
                return (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => handleSelectDivision(div.id)}
                    className="flex items-center gap-1 font-semibold text-[10px] hover:text-amber-700 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                    <span>{div.nameMr.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: DISTRICT PROFILE & TARGETED PRACTICE TEST   */}
        {/* ========================================================= */}
        <div className={`${isExpanded ? 'w-full' : 'lg:col-span-5'} p-4 sm:p-5 flex flex-col justify-between space-y-4 bg-white`}>
          
          {/* Active District Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50/50 border border-amber-300/80 shadow-xs space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {activeDistrict.nameMr}
                  </h3>
                  <span className="text-xs font-mono text-stone-500 font-bold">
                    ({activeDistrict.nameEn})
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                    RTO: {activeDistrict.rtoCode}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-600 text-white shadow-2xs">
                    {activeDistrict.divisionNameMr}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                    मुख्यालय: {activeDistrict.hqMr}
                  </span>
                </div>
              </div>

              {/* Copy Facts Button */}
              <button
                type="button"
                onClick={handleCopyDistrictFacts}
                className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-amber-50 text-stone-700 shadow-2xs cursor-pointer flex items-center gap-1 text-xs font-bold shrink-0 transition-all active:scale-95"
                title="MPSC फॅक्ट्स कॉपी करा"
              >
                {copiedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 text-[10px]">कॉपी झाले!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-700" />
                    <span className="text-[10px]">कॉपी</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Stat Badges: Talukas, Area, Literacy, Sex Ratio */}
            <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-amber-200/60 text-center">
              <div className="p-1.5 rounded-xl bg-white/80 border border-stone-200/80">
                <div className="text-[10px] text-stone-500 font-bold">तालुके</div>
                <div className="text-xs sm:text-sm font-black text-stone-900">{activeDistrict.talukasCount}</div>
              </div>
              <div className="p-1.5 rounded-xl bg-white/80 border border-stone-200/80">
                <div className="text-[10px] text-stone-500 font-bold">क्षेत्रफळ</div>
                <div className="text-[11px] font-black text-stone-900 truncate">{activeDistrict.areaSqKm.toLocaleString('en-IN')} चौ.किमी</div>
              </div>
              <div className="p-1.5 rounded-xl bg-white/80 border border-stone-200/80">
                <div className="text-[10px] text-stone-500 font-bold">साक्षरता</div>
                <div className="text-[11px] font-black text-stone-900">{activeDistrict.literacyRatePercent}%</div>
              </div>
              <div className="p-1.5 rounded-xl bg-white/80 border border-stone-200/80">
                <div className="text-[10px] text-stone-500 font-bold">स्त्री-पुरुष</div>
                <div className="text-[11px] font-black text-stone-900">{activeDistrict.sexRatio}</div>
              </div>
            </div>
          </div>

          {/* District Factfile Category Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-1 border-b border-stone-200 pb-1 overflow-x-auto text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveProfileTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeProfileTab === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                ⭐ सर्व मुद्दे
              </button>
              <button
                type="button"
                onClick={() => setActiveProfileTab('geo')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeProfileTab === 'geo'
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                🌍 भूगोल व नद्या
              </button>
              <button
                type="button"
                onClick={() => setActiveProfileTab('hist')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeProfileTab === 'hist'
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                🏛️ इतिहास व किल्ले
              </button>
              <button
                type="button"
                onClick={() => setActiveProfileTab('econ')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeProfileTab === 'econ'
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                💼 पिके व उद्योग
              </button>
            </div>

            {/* Factfile Content Box */}
            <div className="max-h-56 sm:max-h-64 overflow-y-auto space-y-2.5 pr-1 text-xs">
              
              {/* MPSC Golden Facts (Always shown on 'all') */}
              {(activeProfileTab === 'all' || activeProfileTab === 'geo') && (
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
                  <div className="font-black text-amber-900 flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>MPSC सुवर्ण मुद्दे (High-Yield Facts):</span>
                  </div>
                  <ul className="space-y-1 text-stone-700 leading-relaxed">
                    {activeDistrict.mpscGoldenFactsMr.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold shrink-0">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Geography: Rivers, Sanctuaries, Talukas */}
              {(activeProfileTab === 'all' || activeProfileTab === 'geo') && (
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>प्रमुख नद्या:</span>
                    <span className="font-normal text-stone-700">{activeDistrict.majorRiversMr.join(', ')}</span>
                  </div>
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Trees className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>अभयारण्ये / उद्याने:</span>
                    <span className="font-normal text-stone-700">{activeDistrict.sanctuariesAndParksMr.join(', ')}</span>
                  </div>
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>तालुके:</span>
                    <span className="font-normal text-stone-700">{activeDistrict.prominentTalukasMr.join(', ')}</span>
                  </div>
                </div>
              )}

              {/* History: Forts & Monuments */}
              {(activeProfileTab === 'all' || activeProfileTab === 'hist') && (
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>ऐतिहासिक किल्ले व स्थळे:</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {activeDistrict.historicalFortsMr.join(', ')}
                  </p>
                </div>
              )}

              {/* Economy: Crops & Minerals/Industries */}
              {(activeProfileTab === 'all' || activeProfileTab === 'econ') && (
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>प्रमुख पिके:</span>
                    <span className="font-normal text-stone-700">{activeDistrict.majorCropsMr.join(', ')}</span>
                  </div>
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <span className="text-amber-800">🏭 खनिजे व उद्योग:</span>
                    <span className="font-normal text-stone-700">{activeDistrict.mineralsAndIndustriesMr.join(', ')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Targeted Practice Launcher Section */}
          <div className="pt-3 border-t border-stone-200 space-y-3">
            
            {/* Question Count Selector (10, 15, or 20) */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>सराव प्रश्न संख्या निवडा:</span>
              </span>

              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                {([10, 15, 20] as const).map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      setQuestionCount(count);
                      soundFx.playClickSound();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      questionCount === count
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {count} प्रश्न
                  </button>
                ))}
              </div>
            </div>

            {/* Test Launcher CTA Button */}
            <button
              type="button"
              onClick={handleStartExam}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-orange-500/25 transition-all cursor-pointer active:scale-98"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{activeDistrict.nameMr} - {questionCount} प्रश्न सराव परीक्षा सुरू करा</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* AdSense Passive Income Banner inside component */}
          {onOpenAdSenseManager && (
            <div className="pt-1">
              <AdBanner 
                slot="district_learning_bottom" 
                format="horizontal" 
                className="max-h-20"
                onOpenSettings={onOpenAdSenseManager}
              />
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. DISTRICT COMPARISON MODAL (दोन जिल्ह्यांची थेट तुलना)    */}
      {/* ========================================================= */}
      {showCompareModal && (
        <div className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ArrowUpDown className="w-5 h-5 text-amber-200" />
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    ⚖️ दोन जिल्ह्यांची थेट तुलना (District Head-to-Head Comparison)
                  </h3>
                  <p className="text-xs text-amber-100 font-medium">
                    क्षेत्रफळ, साक्षरता, स्त्री-पुरुष प्रमाण व भौगोलिक वैशिष्ट्यांची झटपट तुलना
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selectors Bar */}
            <div className="p-4 bg-amber-50/70 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="w-full sm:w-1/2 flex items-center gap-2">
                <span className="font-extrabold text-xs text-stone-700 shrink-0">जिल्हा १:</span>
                <select
                  value={compareDistrictIdA}
                  onChange={(e) => setCompareDistrictIdA(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-300 font-bold text-xs focus:ring-2 focus:ring-amber-500"
                >
                  {MAHARASHTRA_DISTRICTS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nameMr} ({d.nameEn}) - {d.divisionNameMr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                VS
              </div>

              <div className="w-full sm:w-1/2 flex items-center gap-2">
                <span className="font-extrabold text-xs text-stone-700 shrink-0">जिल्हा २:</span>
                <select
                  value={compareDistrictIdB}
                  onChange={(e) => setCompareDistrictIdB(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border border-stone-300 font-bold text-xs focus:ring-2 focus:ring-amber-500"
                >
                  {MAHARASHTRA_DISTRICTS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nameMr} ({d.nameEn}) - {d.divisionNameMr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Table Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                
                {/* District A Card */}
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <div className="border-b border-amber-200 pb-2">
                    <h4 className="text-base sm:text-lg font-black text-stone-900">{compareDistrictA.nameMr}</h4>
                    <span className="text-xs text-amber-700 font-bold">{compareDistrictA.divisionNameMr} | RTO: {compareDistrictA.rtoCode}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">क्षेत्रफळ</span>
                      <span className="font-black text-stone-900 text-sm">
                        {compareDistrictA.areaSqKm.toLocaleString('en-IN')} चौ.किमी
                      </span>
                      {compareDistrictA.areaSqKm > compareDistrictB.areaSqKm && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">मोठा</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">तालुके संख्या</span>
                      <span className="font-black text-stone-900 text-sm">{compareDistrictA.talukasCount} तालुके</span>
                      <p className="text-[11px] text-stone-600 truncate mt-0.5">{compareDistrictA.prominentTalukasMr.join(', ')}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">साक्षरता दर</span>
                      <span className="font-black text-stone-900 text-sm">{compareDistrictA.literacyRatePercent}%</span>
                      {compareDistrictA.literacyRatePercent > compareDistrictB.literacyRatePercent && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">अधिक</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">स्त्री-पुरुष प्रमाण (Sex Ratio)</span>
                      <span className="font-black text-stone-900 text-sm">{compareDistrictA.sexRatio}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">प्रमुख नद्या</span>
                      <span className="font-semibold text-stone-800">{compareDistrictA.majorRiversMr.join(', ')}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">प्रमुख किल्ले व स्थळे</span>
                      <span className="font-semibold text-stone-800">{compareDistrictA.historicalFortsMr.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* District B Card */}
                <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-3">
                  <div className="border-b border-orange-200 pb-2">
                    <h4 className="text-base sm:text-lg font-black text-stone-900">{compareDistrictB.nameMr}</h4>
                    <span className="text-xs text-orange-700 font-bold">{compareDistrictB.divisionNameMr} | RTO: {compareDistrictB.rtoCode}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">क्षेत्रफळ</span>
                      <span className="font-black text-stone-900 text-sm">
                        {compareDistrictB.areaSqKm.toLocaleString('en-IN')} चौ.किमी
                      </span>
                      {compareDistrictB.areaSqKm > compareDistrictA.areaSqKm && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">मोठा</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">तालुके संख्या</span>
                      <span className="font-black text-stone-900 text-sm">{compareDistrictB.talukasCount} तालुके</span>
                      <p className="text-[11px] text-stone-600 truncate mt-0.5">{compareDistrictB.prominentTalukasMr.join(', ')}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">साक्षरता दर</span>
                      <span className="font-black text-stone-900 text-sm">{compareDistrictB.literacyRatePercent}%</span>
                      {compareDistrictB.literacyRatePercent > compareDistrictA.literacyRatePercent && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">अधिक</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">स्त्री-पुरुष प्रमाण (Sex Ratio)</span>
                      <span className="font-black text-stone-900 text-sm">{compareDistrictB.sexRatio}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">प्रमुख नद्या</span>
                      <span className="font-semibold text-stone-800">{compareDistrictB.majorRiversMr.join(', ')}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 font-bold block">प्रमुख किल्ले व स्थळे</span>
                      <span className="font-semibold text-stone-800">{compareDistrictB.historicalFortsMr.join(', ')}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedDistrictId(compareDistrictIdA);
                  setShowCompareModal(false);
                  const p = DISTRICT_GEO_DATA.find(d => d.id === compareDistrictIdA);
                  if (p && leafletMapRef.current) leafletMapRef.current.flyTo([p.lat, p.lng], 9);
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                {compareDistrictA.nameMr} नकाशावर पहा
              </button>
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-all cursor-pointer"
              >
                बंद करा
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. MPSC ATLAS REFERENCE & QUICK REVISION MODAL             */}
      {/* ========================================================= */}
      {showAtlasNotesModal && (
        <div className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-amber-200" />
                <div>
                  <h3 className="text-base sm:text-lg font-black">
                    📖 एमपीएससी ऍटलास संदर्भ तक्ता (MPSC Atlas Revision Notes)
                  </h3>
                  <p className="text-xs text-amber-100 font-medium">
                    वारंवार विचारले जाणारे नकाशे, शिखरे, नद्या, घाट, युनेस्को व ज्योतिर्लिंगे
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAtlasNotesModal(false)}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-stone-800 text-xs sm:text-sm">
              
              {/* 1. Peaks Order (उत्तरेकडून दक्षिणेकडे) */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h4 className="font-black text-amber-900 flex items-center gap-1.5 text-sm">
                  <Mountain className="w-4 h-4 text-amber-700" />
                  <span>१. महाराष्ट्रातील सर्वोच्च शिखरे (उंची व क्रम):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span><strong>१. कळसूबाई</strong> (१,६४६ मी)</span>
                    <span className="text-stone-500 font-semibold">अहिल्यानगर/नाशिक</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span><strong>२. साल्हेर</strong> (१,५६७ मी)</span>
                    <span className="text-stone-500 font-semibold">नाशिक (सटाणा)</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span><strong>३. महाबळेश्वर</strong> (१,४३८ मी)</span>
                    <span className="text-stone-500 font-semibold">सातारा (उगम ५ नद्या)</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span><strong>४. हरिश्चंद्रगड</strong> (१,४२४ मी)</span>
                    <span className="text-stone-500 font-semibold">अहिल्यानगर (कोकणकडा)</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span><strong>५. तोरणमाळ</strong> (१,१५५ मी)</span>
                    <span className="text-stone-500 font-semibold">नंदुरबार (सातपुडा)</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span><strong>६. चिखलदरा</strong> (१,११८ मी)</span>
                    <span className="text-stone-500 font-semibold">अमरावती (गावीलगड)</span>
                  </div>
                </div>
              </div>

              {/* 2. Ghats & Passes (प्रमुख घाट व जोडणारे मार्ग) */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <h4 className="font-black text-stone-900 flex items-center gap-1.5 text-sm">
                  <Compass className="w-4 h-4 text-orange-600" />
                  <span>२. प्रमुख घाट व जोडणारे शहरे (MPSC फेवरेट प्रश्न):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900">थळघाट (कसारा घाट):</span>
                    <p className="text-stone-600 mt-0.5">मुंबई ➔ नाशिक (NH-3)</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900">बोरघाट (खंडाळा घाट):</span>
                    <p className="text-stone-600 mt-0.5">मुंबई ➔ पुणे (द्रुतगती महामार्ग)</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900">वरंधा घाट:</span>
                    <p className="text-stone-600 mt-0.5">भोर (पुणे) ➔ महाड (रायगड)</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900">कुंभार्ली घाट:</span>
                    <p className="text-stone-600 mt-0.5">कराड (सातारा) ➔ चिपळूण (रत्नागिरी)</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900">आंबोली घाट:</span>
                    <p className="text-stone-600 mt-0.5">सावंतवाडी (सिंधुदुर्ग) ➔ बेळगाव (कर्नाटक)</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                    <span className="font-bold text-stone-900">फोंडा घाट:</span>
                    <p className="text-stone-600 mt-0.5">कोल्हापूर ➔ कणकवली (सिंधुदुर्ग)</p>
                  </div>
                </div>
              </div>

              {/* 3. Five Jyotirlingas in Maharashtra */}
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-2">
                <h4 className="font-black text-orange-950 flex items-center gap-1.5 text-sm">
                  <span>🕉️ ३. महाराष्ट्रातील ५ पवित्र ज्योतिर्लिंगे:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-orange-200">
                    <strong>१. त्र्यंबकेश्वर</strong>
                    <div className="text-stone-500">नाशिक (गोदावरी उगम)</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-orange-200">
                    <strong>२. भीमाशंकर</strong>
                    <div className="text-stone-500">पुणे (भीमा उगम, शेकरू)</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-orange-200">
                    <strong>३. घृष्णेश्वर</strong>
                    <div className="text-stone-500">छ. संभाजीनगर (वेरूळ)</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-orange-200">
                    <strong>४. औंढा नागनाथ</strong>
                    <div className="text-stone-500">हिंगोली (८ वे ज्योतिर्लिंग)</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-orange-200">
                    <strong>५. परळी वैजनाथ</strong>
                    <div className="text-stone-500">बीड (थर्मल स्टेशन)</div>
                  </div>
                </div>
              </div>

              {/* 4. River Basins Comparison */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <h4 className="font-black text-blue-950 flex items-center gap-1.5 text-sm">
                  <Waves className="w-4 h-4 text-blue-700" />
                  <span>४. नद्यांची खोरी व टक्केवारी (River Drainage):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                    <span className="font-bold text-blue-900">गोदावरी खोरे:</span>
                    <span className="ml-1 text-stone-700">४९.५% क्षेत्र (सर्वात मोठे, दक्षिण गंगा)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                    <span className="font-bold text-blue-900">भीमा व कृष्णा खोरे:</span>
                    <span className="ml-1 text-stone-700">२२.६% क्षेत्र (दुसरे मोठे खोरे)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                    <span className="font-bold text-blue-900">तापी-पूर्णा खोरे:</span>
                    <span className="ml-1 text-stone-700">१६.७% क्षेत्र (खचदरीतून पश्चिमेस वाहते)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                    <span className="font-bold text-blue-900">कोकणातील नद्या:</span>
                    <span className="ml-1 text-stone-700">१०.२% क्षेत्र (पश्चिम वाहिनी, तीव्र उतार)</span>
                  </div>
                </div>
              </div>

              {/* 5. UNESCO World Heritage & Ramsar Sites */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                <h4 className="font-black text-purple-950 flex items-center gap-1.5 text-sm">
                  <Landmark className="w-4 h-4 text-purple-700" />
                  <span>५. युनेस्को जागतिक वारसा व रामसार पाणथळ स्थळे:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-purple-200">
                    <strong>अजिंठा व वेरूळ लेणी (१९८३)</strong>
                    <div className="text-stone-500">छत्रपती संभाजीनगर - बौद्ध, हिंदू, जैन स्थापत्य</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-purple-200">
                    <strong>एलिफंटा लेणी / घारापुरी (१९८७)</strong>
                    <div className="text-stone-500">रायगड / मुंबई - त्रिमूर्ती सदाशिव शिल्पकला</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-purple-200">
                    <strong>कास पठार (२०१२)</strong>
                    <div className="text-stone-500">सातारा - पश्चिम घाट जागतिक नैसर्गिक वारसा</div>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-purple-200">
                    <strong>नांदूर मध्यमेश्वर व लोणार सरोवर</strong>
                    <div className="text-stone-500">पहिले व दुसरे रामसार पाणथळ स्थळ (२०२०)</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowAtlasNotesModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all cursor-pointer shadow-xs"
              >
                समजले, नकाशावर परत जा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
