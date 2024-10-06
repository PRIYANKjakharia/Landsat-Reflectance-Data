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
      });
      return response.data.data;
    } catch (error) {
      console.error('Error searching scenes:', error);
      throw error;
    }
  }

  async getAcquisitionSchedule(datasetName, spatialFilter, temporalFilter) {
    try {
      const response = await axios.post(`${USGS_API_URL}/schedule`, {
        apiKey: this.apiKey,
        datasetName: datasetName,
        spatialFilter: spatialFilter,
        temporalFilter: temporalFilter,
      });
      return response.data.data;
    } catch (error) {
      console.error('Error getting acquisition schedule:', error);
      throw error;
    }
  }
}

module.exports = new USGSService();