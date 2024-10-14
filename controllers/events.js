import eventSchema from "../models/eventSchema.js";

export const addEvent = async (req, res) => {
  const { days, title, starttime, endtime, location, description, date } =
    req.body;
    console.log(req.body)
  try {
    const newEvent = new eventSchema(
  {    days,
      title,
      location,
      description,
      date,
      time:starttime+"-"+endtime}
    );
    await newEvent.save();
   return res.status(200).json({message:"Event Added"});
  } catch (error) {
  
    res
      .status(400)
      .json({ message: "Failed to add event", error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve events", error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update event", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete event", error: error.message });
  }
};
