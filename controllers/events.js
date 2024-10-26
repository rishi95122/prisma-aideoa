import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addEvent = async (req, res) => {
  const { days, title, starttime, endtime, location, description, date } =
    req.body;
  console.log(req.body);

  try {
    const newEvent = await prisma.event.create({
      data: {
        days,
        title,
        location,
        description,
        date,
        time: `${starttime}-${endtime}`,
      },
    });

    return res.status(200).json({ message: "Event Added", newEvent });
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ message: "Failed to add event", error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const skip = (page - 1) * limit; // Calculate the offset

    // Fetch paginated events
    const events = await prisma.event.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    // Get the total count of events to calculate total pages
    const totalEvents = await prisma.event.count();
    const totalPages = Math.ceil(totalEvents / limit);

    console.log("Events:", events);

    res.status(200).json({
      events,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalEvents,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve events",
      error: error.message,
    });
  }
};


export const updateEvent = async (req, res) => {
  const {data}=req.body
  const { days, title, starttime, endtime, location, description, date}=data

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(data.id) },
      data: {
        days,
        title,
        location,
        description,
        date,
        time: `${starttime}-${endtime}`,
      }
    });

    res.status(200).json({message:"Event Updated"});
  } catch (error) {
    console.log(error)
    if (error.code === "P2025") {
      res.status(404).json({ message: "Event not found" });
    } else {
      res
        .status(400)
        .json({ message: "Failed to update event", error: error.message });
    }
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await prisma.event.delete({
      where: { id: parseInt(req.params.id) },
    });

    res
      .status(200)
      .json({ message: "Event deleted successfully", deletedEvent });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Event not found" });
    } else {
      res
        .status(500)
        .json({ message: "Failed to delete event", error: error.message });
    }
  }
};
