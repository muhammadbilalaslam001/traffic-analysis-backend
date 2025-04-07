import prisma from "../db";
import { TrafficEntry, TrafficEntryResponse, TrafficGroupByResponse } from "../types/traffic.types";

export const getCountryTrafficService = async (): Promise<{ country: string; count: number }[]> => {
  const result = await prisma.traffic.groupBy({
    by: ["country"],
    _sum: { count: true },
  });

  return result.map((item: TrafficGroupByResponse) => ({
    country: item.country!,
    count: item._sum.count || 0,
  }));
};

export const getVehicleTypeTrafficService = async (): Promise<{ vehicleType: string; count: number }[]> => {
  const result = await prisma.traffic.groupBy({
    by: ["vehicleType"],
    _sum: { count: true },
  });

  return result.map((item: TrafficGroupByResponse) => ({
    vehicleType: item.vehicleType!,
    count: item._sum.count || 0,
  }));
};

export const getAllTrafficEntriesService = async (): Promise<TrafficEntryResponse[]> => {
  return await prisma.traffic.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getTrafficEntryByIdService = async (id: number): Promise<TrafficEntryResponse | null> => {
  return await prisma.traffic.findUnique({
    where: { id },
  });
};

export const createTrafficEntriesService = async (entries: TrafficEntry[]) => {
  return await prisma.traffic.createMany({
    data: entries.map((entry) => ({
      country: entry.country,
      vehicleType: entry.vehicleType,
      count: typeof entry.count === 'string' ? parseInt(entry.count) : entry.count,
    })),
    skipDuplicates: false,
  });
};

export const updateTrafficEntryService = async (
  id: number,
  data: Partial<TrafficEntry>
): Promise<TrafficEntryResponse> => {
  return await prisma.traffic.update({
    where: { id },
    data: {
      ...data,
      count: data.count !== undefined ? (typeof data.count === 'string' ? parseInt(data.count) : data.count) : undefined,
    },
  });
};

export const deleteTrafficEntryService = async (id: number): Promise<TrafficEntryResponse> => {
  return await prisma.traffic.delete({
    where: { id },
  });
};
