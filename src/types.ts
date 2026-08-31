export interface Shlokas {
  pranam: string;
  invocation: string;
  vratKatha: string;
  morya: string;
  greeting: string;
}

export interface CelebrationDetail {
  id: string;
  title: string;
  time: string;
  subtext: string;
  iconType: 'darshan' | 'aarti' | 'prasad' | 'visarjan';
  highlight?: boolean;
}

export interface DarshanImage {
  id: string;
  title: string;
  tag: string;
  description: string;
  url: string;
  aspect?: 'wide' | 'portrait' | 'square';
}

export interface SacredMoment {
  id: string;
  num: string;
  title: string;
  desc: string;
  imageUrl: string;
  badge: string;
}

export interface InvitationData {
  shlokas: Shlokas;
  hostName: string;
  familyMembers: string;
  hostSubtext: string;
  date: string;
  dateDetail: string;
  gregorianDate: string; // YYYY-MM-DD for countdown
  darshanTime: string;
  darshanSubtext: string;
  aartiMorningTime: string;
  aartiEveningTime: string;
  prasadDetail: string;
  venueName: string;
  venueAddress: string;
  landmark: string;
  city: string;
  phoneContact?: string;
  mapsUrl: string;
  whatsappNumber?: string;
  timeline: CelebrationDetail[];
  darshanGallery: DarshanImage[];
  sacredMoments: SacredMoment[];
}
