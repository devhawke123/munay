import { useMemo } from "react";
import { api } from "../lib/api";
import { useApiResource } from "./useApiResource";

export type ApiEventType = "FAIR_EXPO" | "IN_STORE" | "POP_UP" | "ONLINE";
export type ApiEventStatus = "PUBLISHED" | "SCHEDULED" | "DRAFT";

export interface ApiEvent {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  standSubtitle: string | null;
  venueCallout: string | null;
  bulletPoints: string[];
  type: ApiEventType;
  status: ApiEventStatus;
  startsAt: string;
  endsAt: string | null;
  monthYear: string;
  dateRange: string;
  posterImage: string | null;
  heroImage: string | null;
  galleryImages: string[];
}

/** GET /api/admin/events */
export function useEventsApi(status?: ApiEventStatus) {
  const path = useMemo(() => (status ? `/events?status=${status}` : "/events"), [status]);
  return useApiResource<ApiEvent[]>(path);
}

/** GET /api/admin/events/:id */
export function useEventApi(id: string | null) {
  return useApiResource<ApiEvent>(id ? `/events/${id}` : null);
}

export interface EventWriteInput {
  title: string;
  description?: string;
  location?: string;
  standSubtitle?: string;
  venueCallout?: string;
  bulletPoints?: string[];
  type?: ApiEventType;
  status?: ApiEventStatus;
  startsAt: string;
  endsAt?: string | null;
  posterImage?: string;
  heroImage?: string;
  galleryImages?: string[];
}

export const eventsApi = {
  create: (data: EventWriteInput) => api.post<ApiEvent>("/events", data),
  update: (id: string, data: Partial<EventWriteInput>) => api.patch<ApiEvent>(`/events/${id}`, data),
  remove: (id: string) => api.delete<void>(`/events/${id}`),
};
