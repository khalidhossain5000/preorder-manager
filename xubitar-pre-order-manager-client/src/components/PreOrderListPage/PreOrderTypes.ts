export const tabs = ["All", "Active", "Inactive"] as const;

export type Tab = (typeof tabs)[number];



export type SortField = "name" | "createdAt" | "startsAt" | "endsAt";
export type SortDirection = "asc" | "desc";