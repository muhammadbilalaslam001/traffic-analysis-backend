import prisma from "../db";

export const getCountryTrafficService = async () => {
  const result = await prisma.traffic.groupBy({
    by: ["country"],
    _sum: { count: true },
  });

  return result.map((item) => ({
    country: item.country,
    count: item._sum.count || 0,
  }));
};

export const getVehicleTypeTrafficService = async () => {
  const result = await prisma.traffic.groupBy({
    by: ["vehicleType"],
    _sum: { count: true },
  });

  return result.map((item) => ({
    vehicleType: item.vehicleType,
    count: item._sum.count || 0,
  }));
};

export const getAllTrafficEntriesService = async () => {
  return await prisma.traffic.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getTrafficEntryByIdService = async (id: number) => {
  return await prisma.traffic.findUnique({
    where: { id },
  });
};

export const createTrafficEntriesService = async (entries: any[]) => {
  return await prisma.traffic.createMany({
    data: entries.map((entry) => ({
      country: entry.country,
      vehicleType: entry.vehicleType,
      count: parseInt(entry.count),
    })),
    skipDuplicates: false,
  });
};

export const updateTrafficEntryService = async (
  id: number,
  data: { country?: string; vehicleType?: string; count?: number }
) => {
  return await prisma.traffic.update({
    where: { id },
    data,
  });
};

export const deleteTrafficEntryService = async (id: number) => {
  return await prisma.traffic.delete({
    where: { id },
  });
};
