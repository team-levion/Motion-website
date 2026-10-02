export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  location: string;
  area: string;
  mainImage: string;
  secondaryImage: string;
  detailImage: string;
  aspectRatio: string;
  description: string;
  story: string[];
  specs: {
    architect: string;
    client: string;
    materials: string[];
    timeline: string;
  };
}

export type CursorType = 'DEFAULT' | 'VIEW' | 'DRAG' | 'EXPLORE' | 'CLOSE';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  deliverables: string[];
}
