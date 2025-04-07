export interface TrafficEntry {
  country: string;
  vehicleType: string;
  count: number | string;
}

export interface TrafficEntryResponse {
  id: number;
  country: string;
  vehicleType: string;
  count: number;
  createdAt: Date;
}

export interface TrafficGroupByResponse {
  country?: string;
  vehicleType?: string;
  _sum: {
    count: number | null;
  };
} 