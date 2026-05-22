import { Service, GalleryCase, Doctor } from './types';

export const SERVICES: Service[] = [
  {
    id: 'veneers',
    title: 'Minimal-Prep Ceramic Veneers',
    category: 'cosmetic',
    description: 'Custom-designed ultra-thin porcelain shells that cover the front surface of teeth to correct spacing, discoloration, and structural alignment.',
    longDescription: 'Our signature minimal-preparation porcelain veneers are sculpted by world-class ceramists to blend hyper-realistically with your facial profile. Engineered with E-Max lithium disilicate for maximal luminescence and structural durability.',
    duration: '2 appointments (7-10 days apart)',
    recovery: 'Immediate, minor tooth sensitivity for 48 hours',
    priceRange: 'Premium / Bespoke',
    iconName: 'Sparkles',
    benefits: [
      'Individually sculpted optical light transparency',
      'Extremely stain-resistant premium grade porcelain',
      'Conservative preparation preserving 95% of healthy enamel',
      'Transforms shape, alignment, spacing, and shade instantly'
    ]
  },
  {
    id: 'whitening',
    title: 'Zoom® Laser Teeth Whitening',
    category: 'cosmetic',
    description: 'Advanced laser-activated medical whitening safely dissolving deep-set dynamic stains without damaging enamel integrity.',
    longDescription: 'A clinical-strength whitening procedure combining a proprietary hydrogen peroxide gel activated by low-heat laser wave illumination. Achieves up to 8 shades of lifting in a single, deeply comfortable, monitored session.',
    duration: '60 - 90 minutes',
    recovery: 'Zero recovery, mild transient thermal sensitivity',
    priceRange: 'Slightly Above Average',
    iconName: 'Zap',
    benefits: [
      'Immediate clinical results in under 1.5 hours',
      'Integrates ACP (amorphous calcium phosphate) enamel protection',
      'Customized desensitizing therapy included for sensitive smiles',
      'Long-lasting outcome with complimentary home maintenance kit'
    ]
  },
  {
    id: 'aligners',
    title: 'AuraAlign™ Clear Aligners',
    category: 'cosmetic',
    description: 'Next-generation custom removable orthodontic trays that gently guide teeth into optimal structural positioning virtually invisibly.',
    longDescription: 'Utilizing AI-driven biomechanical smile prediction software, AuraAlign custom crafts a sequence of crystal-clear smart polymer aligners. Each set gently and predictably shifts teeth with minimized force and optimized oral hygiene hygiene.',
    duration: '6 - 15 months (case dependent)',
    recovery: 'No downtime, minor tightness upon switching sets',
    priceRange: 'Fixed Price Investment',
    iconName: 'Grid',
    benefits: [
      'Nearly invisible clinical-grade SmartTrack polymers',
      'Removable for effortless eating and thorough oral hygiene',
      'AI-backed regular progress monitoring checks',
      'Includes complimentary post-treatment retention systems'
    ]
  },
  {
    id: 'implants',
    title: 'Premium Straumann® Implants',
    category: 'implants',
    description: 'Swiss-engineered medical titanium roots that integrate seamlessly with your jawbone, topped with bespoke handcrafted ceramic crowns.',
    longDescription: 'The gold standard in tooth replacement therapy. Using computer-guided 3D navigation, we place elite Straumann SLA active titanium implants that bond with living bone. This preserves facial structure and completely restores full biting strength.',
    duration: '3 - 6 months total (multi-phase)',
    recovery: '3-5 days general healing time',
    priceRange: 'Advanced Clinical Value',
    iconName: 'Shield',
    benefits: [
      'Lifetime warranty titanium-zirconia implants',
      'Digitally guided surgically precise computer placement',
      'Restores biting power and prevents long-term jawbone resorption',
      'Finished with a custom CAD/CAM colored crown matched to adjacent teeth'
    ]
  },
  {
    id: 'crowns',
    title: 'Same-day CAD/CAM Ceramic Crowns',
    category: 'implants',
    description: 'Advanced restoration of chipped, severely cracked, or root-canal-treated teeth using state-of-the-art ceramic milling.',
    longDescription: 'We completely bypass messy putty impressions. Utilizing full digital oral scanning, our in-house computer-aided CEREC mill creates a flawless monolithic zirconia crown designed to withstand a lifetime of daily function.',
    duration: 'Single Visit (2 hours total)',
    recovery: 'Immediate return to work and diet',
    priceRange: 'Standard restorative price',
    iconName: 'Award',
    benefits: [
      'No messy putty impressions or uncomfortable temporary crowns',
      'Ultra-precise laser scanner margin fit down to 10 microns',
      'Constructed with biological neutral monolithic zirconia',
      'Color-matched and polished to perfection on-site'
    ]
  },
  {
    id: 'checkup',
    title: 'AuraCare™ Signature Checkup',
    category: 'general',
    description: 'Painless, highly thorough oral diagnostics including high-resolution 3D intraoral imaging, cancer screening, and precision hygiene therapy.',
    longDescription: 'Our signature comprehensive health protocol. This diagnostic system includes ultra-low-radiation digital panoramic x-rays, visual magnifying intraoral photography, an early oral cancer screening, and gentle, piezo-electronic water scaling cleanings.',
    duration: '60 minutes',
    recovery: 'Zero downtime, feelings of pristine freshness',
    priceRange: 'Affordable / Core Care',
    iconName: 'HeartPulse',
    benefits: [
      'Comprehensive 3D digital walkthrough of your mouth',
      'Comfortable piezo-electronic micro-cavitation scaling (no scraping noise)',
      'Velocity fluoride or mineral-rich enamel polishing',
      'Customized oral microbiome health coaching'
    ]
  },
  {
    id: 'rootcanal',
    title: 'Microscope-assisted Endodontics',
    category: 'general',
    description: 'Extremely gentle, high-precision treatment using high-magnification microscopes to eliminate deep tooth infections while preserving natural teeth.',
    longDescription: 'We have transformed root canals into a fundamentally comfortable, painless, standard therapy. Operating under a 20x surgical magnification microscope, we cleanly sterilize complex micro-canals with flexible nickel-titanium instruments and warm bio-ceramic seals.',
    duration: '1 - 2 visits (90 mins each)',
    recovery: 'Very mild soreness for 24-48 hours',
    priceRange: 'Standard specialist',
    iconName: 'Activity',
    benefits: [
      'Fully localized micro-anesthesia guarantees a painless treatment',
      '20x optical magnification locates and treats hidden accessory canals',
      'Significantly higher success rates compared to standard non-microscope treatment',
      'Saves the natural tooth from extraction, preserving alignment'
    ]
  }
];

export const GALLERY_CASES: GalleryCase[] = [
  {
    id: 'harmony-makeover',
    title: 'Full Smiling Harmony',
    treatment: '8 Premium Minimal-Prep Veneers',
    description: 'Patient presented with severe childhood tetracycline staining, minor surface chipping, and asymmetrical margins. We designed a bright, lifelike Smile Makeover that matches her dynamic personality.',
    beforeImage: 'https://images.unsplash.com/photo-1516201309311-d0b5e29fa4bc?auto=format&fit=crop&q=80&w=600&h=450', // We can style these or use specific visual references!
    afterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600&h=450',
    timeframe: '2 visits over 9 days',
    difficulty: 'Advanced'
  },
  {
    id: 'orthodontic-fix',
    title: 'Alignment & Color Revival',
    treatment: 'AuraAlign™ Trays + Laser Zoom Whitening',
    description: 'Targeted correction of crossbite and crowding of the front incisors, paired with an dynamic in-office whitening to lift aged stubborn stains.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600&h=450',
    afterImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=450',
    timeframe: '7 months alignment, 1 hr whitening',
    difficulty: 'Moderate'
  },
  {
    id: 'single-replacement',
    title: 'Perfect Lateral Reconstruction',
    treatment: 'Crown-Guided Titanium Implant',
    description: 'Replacement of a historically missing congenitally lateral incisor that caused dynamic bone loss. Implemented bone graft, premium Straumann titanium crown root, and handcrafted ceramic finish.',
    beforeImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600&h=450',
    afterImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600&h=450',
    timeframe: '5 months osseointegration',
    difficulty: 'Advanced'
  }
];

export const CLINICIANS: Doctor[] = [
  {
    id: 'vance',
    name: 'Dr. Marcus Vance, DDS',
    role: 'Aesthetic Dental Director',
    specialty: 'Cosmetic Veneers & Advanced Prosthodontics',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Dr. Vance has spent the past 14 years perfecting smile geometry on global patients, blending deep biomechanics, materials science, and custom fine-art aesthetics.',
    education: 'Columbia University School of Dental Medicine, Fellow of AACD'
  },
  {
    id: 'rostova',
    name: 'Dr. Elena Rostova, PhD, DDS',
    role: 'Chief Implant Surgeon',
    specialty: 'Oral Implantology & Guided Implant Placements',
    image: 'https://images.unsplash.com/photo-1594824813573-246434e3b96f?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'An international academic speaker and clinical researcher, Dr. Rostova specializes in minimally traumatic tissue-friendly tooth replacement and 3D computer guided micro-surgeries.',
    education: 'University of Munich School of Dentistry, Board Certified Oral Surgeon'
  },
  {
    id: 'tanaka',
    name: 'Dr. Kenji Tanaka, DDS',
    role: 'Lead Preventive & Endodontic Specialist',
    specialty: 'Microscopic Endodontics & Biomimetic Restorations',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
    bio: 'Dr. Tanaka believes in saving natural tooth structures wherever biologically possible. He leverages top optical microscopes and dental laser systems to repair teeth inside-out painlessly.',
    education: 'University of Tokyo, Advanced Endodontics residency at Northwestern'
  }
];

export const TIME_SLOTS = [
  { time: '08:30 AM', available: true },
  { time: '09:30 AM', available: true },
  { time: '10:30 AM', available: false },
  { time: '11:00 AM', available: true },
  { time: '01:30 PM', available: true },
  { time: '02:30 PM', available: false },
  { time: '03:30 PM', available: true },
  { time: '04:30 PM', available: true }
];
