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
    res
      .status(400)
      .json({ message: "Failed to add event", error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve events", error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
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
      where: { id: req.params.id },
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
