const landsatData = require('../landsatData');

exports.getLatestScenes = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Find the nearest scene to the given coordinates
    const nearestScene = landsatData.reduce((nearest, scene) => {
      const distance = Math.sqrt(
        Math.pow(scene.center.lat - latitude, 2) +
        Math.pow(scene.center.lon - longitude, 2)
      );
      return distance < nearest.distance ? { scene, distance } : nearest;
    }, { scene: null, distance: Infinity }).scene;

    if (nearestScene) {
      res.json(nearestScene);
    } else {
      res.status(404).json({ message: 'No scenes found for the given coordinates' });
    }
  } catch (error) {
    console.error('Error getting latest scenes:', error);
    res.status(500).json({ message: 'Error fetching latest scenes' });
  }
};

exports.getUpcomingPasses = async (req, res) => {
  // For simplicity, we'll return mock data
  const mockPasses = [
    { acquisitionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), satelliteName: 'Landsat 8' },
    { acquisitionDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), satelliteName: 'Landsat 8' },
    { acquisitionDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(), satelliteName: 'Landsat 9' },
  ];

  res.json(mockPasses);
};