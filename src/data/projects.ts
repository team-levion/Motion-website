import { Project, ServiceItem } from '../types';

import heroBrutalistVilla from '../assets/images/hero_brutalist_villa_1790938264179.jpg';
import beforeRawSpace from '../assets/images/before_raw_space_1790938355754.jpg';
import afterRefinedSpace from '../assets/images/after_refined_space_1790938371424.jpg';
import studioPortraitArchitect from '../assets/images/studio_portrait_architect_1790938403078.jpg';
import projectCourtyardHouse from '../assets/images/project_courtyard_house_1790938282470.jpg';
import projectMonolith from '../assets/images/project_monolith_1790938299070.jpg';
import projectCasaNoir from '../assets/images/project_casa_noir_1790938316588.jpg';
import projectStillHouse from '../assets/images/project_still_house_1790938336657.jpg';
import serviceSpacePlanning from '../assets/images/service_space_planning_1790938387130.jpg';

export const HERO_IMAGE = heroBrutalistVilla;
export const BEFORE_IMAGE = beforeRawSpace;
export const AFTER_IMAGE = afterRefinedSpace;
export const STUDIO_IMAGE = studioPortraitArchitect;

export const PROJECTS: Project[] = [
  {
    id: 'the-courtyard-house',
    number: '01',
    title: 'THE COURTYARD HOUSE',
    subtitle: 'A sanctuary sculpted around shifting light and central stillness.',
    category: 'Residential',
    year: '2026',
    location: 'Kozhikode, India',
    area: '680 m²',
    mainImage: projectCourtyardHouse,
    secondaryImage: heroBrutalistVilla,
    detailImage: afterRefinedSpace,
    aspectRatio: 'aspect-[16/10]',
    description: 'Conceived as an introverted sanctuary, The Courtyard House inverts traditional residential envelopes by directing all ocular and acoustic attention toward a central open-air atrium.',
    story: [
      'The Courtyard House emerged from an interrogation of tropical climate architecture. We utilized monolithic rammed-earth walls alongside natural teak louvers to achieve passive thermal cooling throughout the warmest seasons.',
      'A solitary Acer palmatum stands at the geometric axis of the atrium, mirrored across reflecting pools that temper the coastal air. The transitions between interior living quarters and exterior courtyard are deliberately ambiguous, dissolving borders through ten-meter frameless pocket glass planes.'
    ],
    specs: {
      architect: 'Elias Lindqvist & Maya Varma',
      client: 'Private Residence',
      materials: ['Rammed Earth', 'Honed Travertine', 'Burmese Teak', 'Cast Bronze'],
      timeline: '24 Months'
    }
  },
  {
    id: 'monolith',
    number: '02',
    title: 'MONOLITH',
    subtitle: 'Sculptural basalt volumes framing cultural dialogue and monumental void.',
    category: 'Commercial',
    year: '2025',
    location: 'Berlin, Germany',
    area: '2,400 m²',
    mainImage: projectMonolith,
    secondaryImage: serviceSpacePlanning,
    detailImage: heroBrutalistVilla,
    aspectRatio: 'aspect-[4/5]',
    description: 'An uncompromising cultural forum designed to anchor a historic intersection. Monolith balances massive fluted basalt cantilevers with ethereal, light-filled internal light shafts.',
    story: [
      'Commissioned as an exhibition pavilion and civic gallery, Monolith rejects lightweight glass curtain walls in favor of heavy massing. Its 18-meter cantilevers cast dramatic diagonal shadows across the public plaza below.',
      'Inside, an internal concrete canyon guides visitors upward via a continuous spiral ramp, revealing curated glimpses of the city through precise slit fenestrations.'
    ],
    specs: {
      architect: 'David Chen & FORMA Atelier',
      client: 'Kulturforum Mitte',
      materials: ['Charred Basalt', 'Fair-Faced Concrete', 'Anodized Steel', 'Acoustic Felt'],
      timeline: '36 Months'
    }
  },
  {
    id: 'casa-noir',
    number: '03',
    title: 'CASA NOIR',
    subtitle: 'Nocturnal materiality, smoked timber, and tactile domestic serenity.',
    category: 'Interior',
    year: '2026',
    location: 'Milan, Italy',
    area: '420 m²',
    mainImage: projectCasaNoir,
    secondaryImage: afterRefinedSpace,
    detailImage: projectCourtyardHouse,
    aspectRatio: 'aspect-[4/3]',
    description: 'An exercise in deep chromatic discipline. Casa Noir uses smoked oak millwork, honed Nero Marquina stone, and bespoke directional illumination to craft an intimate penthouse retreat.',
    story: [
      'Rather than relying on conventional bright white gallery walls, Casa Noir envelops its occupants in warm, darkened tonal layers. The space calms the nervous system through acoustic dampening and tactility.',
      'Every piece of millwork conceals service equipment, keeping sightlines pure. The central monolithic hearth acts as both sculptural anchor and atmospheric pivot.'
    ],
    specs: {
      architect: 'Alessia Bianchi',
      client: 'Private Collector',
      materials: ['Smoked Oak', 'Nero Marquina Marble', 'Raw Linen', 'Dark Patinated Brass'],
      timeline: '14 Months'
    }
  },
  {
    id: 'still-house',
    number: '04',
    title: 'STILL HOUSE',
    subtitle: 'A cliffside retreat suspended between rugged rock and misted pines.',
    category: 'Residential',
    year: '2025',
    location: 'Kyoto Hills, Japan',
    area: '540 m²',
    mainImage: projectStillHouse,
    secondaryImage: heroBrutalistVilla,
    detailImage: serviceSpacePlanning,
    aspectRatio: 'aspect-[16/9]',
    description: 'Embedded into a steep forested ridge, Still House serves as a quiet sanctuary. Cast concrete textures echo the surrounding rock strata while wide glass apertures invite natural elements inward.',
    story: [
      'Still House respects the topography by stepping downward with the mountain gradient. Three terraced levels follow the slope, reducing earthwork and protecting ancient cedar roots.',
      'The morning mist rolls across the low-e thermal glass, dissolving the visual perimeter between interior hearth and the wild cedar forest.'
    ],
    specs: {
      architect: 'Kenzo Mori & Elias Lindqvist',
      client: 'Private Foundation',
      materials: ['Board-Formed Concrete', 'Japanese Hinoki Wood', 'Blackened Zinc', 'Thermal Low-E Glass'],
      timeline: '28 Months'
    }
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'architecture',
    number: '01',
    title: 'ARCHITECTURE',
    description: 'From monumental cultural commissions to bespoke private residences, we shape physical volumes that engage topography, climate, and structural longevity.',
    image: heroBrutalistVilla,
    deliverables: ['Concept & Feasibility', 'Building Massing & Envelopes', 'Permit Documentation', 'Site Construction Supervision']
  },
  {
    id: 'interior-design',
    number: '02',
    title: 'INTERIOR DESIGN',
    description: 'Curating the tactile threshold where architecture touches human skin. We design bespoke joinery, master material palettes, and craft holistic atmospheric serenity.',
    image: projectCasaNoir,
    deliverables: ['Custom Millwork Design', 'Lighting Orchestration', 'Tactile Material Curation', 'FF&E Specification']
  },
  {
    id: 'space-planning',
    number: '03',
    title: 'SPACE PLANNING',
    description: 'Rigorous spatial choreography that eliminates friction, guides ocular rhythm, and optimizes structural circulation with natural daylight paths.',
    image: serviceSpacePlanning,
    deliverables: ['Volumetric Zoning', 'Circulation Modeling', 'Daylight Optimization', 'Acoustic Mapping']
  },
  {
    id: '3d-visualization',
    number: '04',
    title: '3D VISUALIZATION',
    description: 'Photorealistic architectural CGI and cinematic spatial walkthroughs that communicate unbuilt visions with light, shadow, and hyper-fidelity before ground breaks.',
    image: afterRefinedSpace,
    deliverables: ['Cinematic CGI Imagery', 'Virtual Reality Previews', 'Material Simulation', 'Atmospheric Lighting Studies']
  }
];

export const MARQUEE_IMAGES = [
  { src: heroBrutalistVilla, label: 'Villa Nube / 2026', aspect: 'w-80 md:w-96 aspect-[16/10]' },
  { src: projectCasaNoir, label: 'Salon Noir / Milan', aspect: 'w-64 md:w-80 aspect-[4/5]' },
  { src: serviceSpacePlanning, label: 'Helix Gallery / Berlin', aspect: 'w-96 md:w-[28rem] aspect-[16/9]' },
  { src: projectStillHouse, label: 'Kyoto Sanctuary', aspect: 'w-72 md:w-88 aspect-[4/3]' },
  { src: studioPortraitArchitect, label: 'Atelier Archive', aspect: 'w-64 md:w-80 aspect-[3/4]' },
  { src: afterRefinedSpace, label: 'Pavilion Hearth', aspect: 'w-80 md:w-96 aspect-[16/10]' },
];
