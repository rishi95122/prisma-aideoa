import Mission from "../models/missionSchema.js";


export const getMissions = async (req, res) => {
    try {
        const missions = await Mission.find({});
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving missions', error });
    }
};




export const addMission = async (req, res) => {
    const { title:mission } = req.body;
 console.log(mission)

    try {
        const newMission = new Mission({ mission });
        await newMission.save();
        console.log("DSadas")
        res.status(200).json({message:"Mission Added"});
    } catch (error) {
        res.status(500).json({ error: 'Error creating mission', error });
    }
};


export const updateMission = async (req, res) => {
    const { mission } = req.body;
    try {
        const updatedMission = await Mission.findByIdAndUpdate(
            req.params.id,
            { mission },
            { new: true, runValidators: true }
        );

        if (!updatedMission) {
            return res.status(404).json({ message: 'Mission not found' });
        }
        res.status(200).json(updatedMission);
    } catch (error) {
        res.status(500).json({ message: 'Error updating mission', error });
    }
};

export const deleteMission = async (req, res) => {
    try {
        const mission = await Mission.findByIdAndDelete(req.params.id);
        if (!mission) {
            return res.status(404).json({ message: 'Mission not found' });
        }
        res.status(200).json({ message: 'Mission deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mission', error });
    }
};
