const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const USGS_API_URL = 'https://earthexplorer.usgs.gov/inventory/json/v/1.4.1';

class USGSService {
  constructor() {
    this.apiKey = process.env.USGS_API_KEY;
  }

  async login() {
    try {
      const response = await axios.post(`${USGS_API_URL}/login`, {
        username: process.env.USGS_USERNAME,
        password: process.env.USGS_PASSWORD,
      });
      this.apiKey = response.data.data;
      return this.apiKey;
    } catch (error) {
      console.error('Error logging in to USGS:', error);
      throw error;
    }
  }

  async searchScenes(datasetName, spatialFilter, temporalFilter) {
    try {
      const response = await axios.post(`${USGS_API_URL}/search`, {
        apiKey: this.apiKey,
        datasetName: datasetName,
        spatialFilter: spatialFilter,
        temporalFilter: temporalFilter,
        maxResults: 50000  // Adjust as needed
      });
      return response.data.data.results;
    } catch (error) {
      console.error('Error searching scenes:', error);
      throw error;
    }
  }

  async predictFutureAcquisitions(datasetName, spatialFilter, daysInFuture = 30) {
    try {
      const now = new Date();
      const futureDate = new Date(now.getTime() + daysInFuture * 24 * 60 * 60 * 1000);
      
      const temporalFilter = {
        start: now.toISOString().split('T')[0],
        end: futureDate.toISOString().split('T')[0]
      };

      const scenes = await this.searchScenes(datasetName, spatialFilter, temporalFilter);
      
      // Process scenes to extract unique acquisition dates
      const acquisitionDates = [...new Set(scenes.map(scene => scene.acquisitionDate))];
      
      return acquisitionDates.sort();
    } catch (error) {
      console.error('Error predicting future acquisitions:', error);
      throw error;
    }
  }
}

module.exports = new USGSService();