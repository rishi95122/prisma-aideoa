import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addDonation = async (req, res) => {
  console.log(req.body)
  try {
    const { donationAmount, name, mobileNumber, transactionId:utrNo } = req.body;
    const newDonation = await prisma.donation.create({
      data: {
        donationAmount,
        name,
        mobileNumber,
        utrNo,
      },
    });
  
    res.status(200).json({message:"Donation Added"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Unable to add donation" });
  }
};

// Get all donations with pagination
export const getDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const skip = (page - 1) * limit; // Calculate the offset

    // Fetch paginated donations
    const donations = await prisma.donation.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    // Get the total count of donations to calculate total pages
    const totalDonations = await prisma.donation.count();
    const totalPages = Math.ceil(totalDonations / limit);

    res.status(200).json({
      donations,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalDonations,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch donations" });
  }
};

