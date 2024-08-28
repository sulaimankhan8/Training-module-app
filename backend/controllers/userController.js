const User = require('../models/User');

exports.updateProgress = async (req, res) => {
  const { userId, moduleId, pageId, watchedDuration } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let module = user.progress.find((mod) => mod.moduleId.toString() === moduleId);

    if (module) {
      const video = module.videos.find((vid) => vid.pageId.toString() === pageId);

      if (video) {
        video.watchedDuration = watchedDuration;
      } else {
        module.videos.push({ pageId, watchedDuration });
      }
    } else {
      user.progress.push({
        moduleId,
        videos: [{ pageId, watchedDuration }],
      });
    }

    await user.save();
    res.json({ message: 'Progress updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update progress' });
  }
};
