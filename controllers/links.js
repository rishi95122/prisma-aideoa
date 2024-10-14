import linksSchema from '../models/commonLinksSchema.js'
export const addSocialMediaLink = async (req, res) => {
  console.log(req.body)
  try {
    const { title, url } = req.body;
    const newLink = new linksSchema({ title, url });
    await newLink.save();
    res.status(200).json({ message: 'Social media link added successfully', data: newLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add social media link' });
  }
};


export const getAllSocialMediaLinks = async (req, res) => {
  try {
    const links = await linksSchema.find();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve social media links' });
  }
};


export const updateSocialMediaLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const updatedLink = await linksSchema.findByIdAndUpdate(id, { title, url }, { new: true });

    if (!updatedLink) {
      return res.status(404).json({ error: 'Social media link not found' });
    }

    res.status(200).json({ message: 'Social media link updated successfully', data: updatedLink });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update social media link' });
  }
};


export const deleteSocialMediaLink = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLink = await linksSchema.findByIdAndDelete(id);

    if (!deletedLink) {
      return res.status(404).json({ error: 'Social media link not found' });
    }

    res.status(200).json({ message: 'Social media link deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete social media link' });
  }
};
