import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addDonation = async (req, res) => {
  try {
    const { donationAmount, name, mobileNumber, utrNo } = req.body;
    const newDonation = await prisma.donation.create({
      data: {
        donationAmount,
        name,
        mobileNumber,
        utrNo,
      },
    });
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ error: "Unable to add donation" });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch donations" });
  }
};
