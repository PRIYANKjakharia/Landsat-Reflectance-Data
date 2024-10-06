const schedule = require('node-schedule');
const USGSService = require('./usgsService');

class NotificationService {
  constructor() {
    this.jobs = new Map();
  }

  async scheduleNotification(userId, location, date) {
    const job = schedule.scheduleJob(date, async function() {
      // Here you would typically send a notification to the user
      // For this example, we'll just log it
      console.log(`Notification for user ${userId}: Landsat pass upcoming for location ${location.name}`);
      
      // You could also trigger an email, push notification, etc. here
    });

    // Store the job so we can cancel it later if needed
    this.jobs.set(`${userId}-${location._id}`, job);
  }

  cancelNotification(userId, locationId) {
    const jobKey = `${userId}-${locationId}`;
    const job = this.jobs.get(jobKey);
    if (job) {
      job.cancel();
      this.jobs.delete(jobKey);
    }
  }

  async updateNotificationsForLocation(userId, location) {
    // Cancel existing notification for this location
    this.cancelNotification(userId, location._id);

    // Get upcoming passes for this location
    const upcomingPasses = await USGSService.getAcquisitionSchedule(
      'LANDSAT_8_C2_L2',
      {
        filterType: "mbr",
        lowerLeft: {
          latitude: location.latitude - 0.1,
          longitude: location.longitude - 0.1
        },
        upperRight: {
          latitude: location.latitude + 0.1,
          longitude: location.longitude + 0.1
        }
      },
      {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      }
    );

    // Schedule a notification for each upcoming pass
    for (let pass of upcomingPasses) {
      await this.scheduleNotification(userId, location, new Date(pass.acquisitionDate));
    }
  }
}

module.exports = new NotificationService();