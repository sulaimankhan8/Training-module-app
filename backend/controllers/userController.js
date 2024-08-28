const User = require('../models/User');

exports.updateProgress = async (req, res) => {
  const { userId, moduleId, pageId, watchedDuration } = req.body;

  const user = await User.findById(userId);
  const module = user.progress.find((mod) => mod.moduleId.toString() === moduleId);

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
};
