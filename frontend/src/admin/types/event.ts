export const EVENT_TYPES = ["Fair / Expo", "In-Store", "Pop-up", "Online"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const EVENT_STATUSES = ["Published", "Scheduled", "Draft"] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

export type EventRow = {
  id: string;
  monthYear: string;
  standSubtitle: string;
  title: string;
  dateRange: string;
  location: string;
  type: EventType;
  status: EventStatus;
  description: string;
  venueCallout: string;
  bulletPoints: string[];
  posterImage: string | null;
  heroImage: string | null;
  galleryThumbnails: string[];
};

export const emptyEvent: EventRow = {
  id: "",
  monthYear: "",
  standSubtitle: "",
  title: "",
  dateRange: "",
  location: "",
  type: "Fair / Expo",
  status: "Draft",
  description: "",
  venueCallout: "",
  bulletPoints: [],
  posterImage: null,
  heroImage: null,
  galleryThumbnails: [],
};
