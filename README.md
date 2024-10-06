# Landsat-Reflectance-Data
# Project Overview:
Landsat missions have continuously captured Earth’s land surface data for nearly five decades, providing an invaluable dataset for remote sensing, environmental monitoring, and scientific research. The ability to compare satellite-based Landsat Surface Reflectance (SR) data with ground-based spectral measurements offers numerous educational and practical benefits, such as promoting experiential learning, enhancing scientific exploration, and fostering interdisciplinary and spatial thinking skills.

Our project aims to bridge the gap between satellite and ground-based observations by developing a user-friendly web application. This platform allows users to define specific geographic locations and receive real-time notifications of when the Landsat satellite will pass over those areas. Users can then access and analyze the corresponding Landsat SR data collected during that overpass, facilitating an effective comparison between satellite and on-ground observations.

# Key Objectives:
## 1. User Location Specification:
Enable users to specify geographic locations of interest through an intuitive interface, either by entering coordinates or selecting points on a map.
## 2. Notification System:
Implement a notification system that alerts users when Landsat is scheduled to pass over the specified location. This real-time notification feature ensures users can prepare for simultaneous ground-based spectral measurements.
## 3. Data Access and Visualization:
Provide easy access to the collected Landsat SR data for the specific time and location. The data will be displayed on the platform, offering options for users to visualize, download, and compare the satellite SR data with their ground-based readings.
## 4. Interdisciplinary Learning and Research:
Encourage experiential learning by giving users hands-on experience with comparing ground measurements with satellite data. This opens opportunities for educators, students, environmentalists, and researchers to explore interdisciplinary concepts in environmental science, geography, and technology.
## 5. Global Awareness and Citizen Empowerment:
By making satellite data accessible and understandable to a wide audience, the platform empowers individuals to explore global environmental changes and become informed global citizens.

# Functionality Breakdown:
## 1. Location Input: 
Users can manually input GPS coordinates or use a map interface to pinpoint a specific location on Earth. The application will store these locations for future use and notify users of upcoming Landsat overpasses.

## 2. Overpass Prediction and Alerts: 

The system will connect with satellite data APIs to predict the time and date of the next Landsat overpass over the user’s selected location. Users will receive notifications (email or app-based) reminding them of the upcoming satellite pass, so they can prepare for ground-based spectral measurements.

## 3. Data Retrieval: 
After the overpass, users can quickly access the Landsat SR data captured for their selected location. The data will be displayed on the platform with options for downloading it in formats suitable for further analysis.

## 4. Visualization and Comparison Tools: 
The platform will include tools for visualizing the Landsat SR data, such as spectral graphs and layered map views. Users can upload their ground-based measurements for direct comparison with the Landsat data, helping them identify patterns and correlations.

# Technologies and Tools:
Frontend: React.js for an interactive user interface with a dynamic map and location input feature.
Backend: Node.js and Express.js for handling user requests, API connections, and managing notifications.
APIs: NASA’s Earthdata API for accessing Landsat SR data and prediction algorithms for overpass timing.
Database: MongoDB or PostgreSQL for storing user preferences, selected locations, and historical data.
Notification System: Integration with services like Firebase or Twilio to send alerts via SMS or email.
Visualization Libraries: D3.js or Plotly for visualizing satellite data and user measurements.

# Impact and Use Cases:
Educational Tool: The platform serves as a valuable resource for educators to teach satellite data analysis, spectral comparisons, and geographic information systems (GIS). Students can engage with real-world data to learn about environmental monitoring, climate change, and the scientific method.

Scientific Research: Researchers in environmental science, ecology, and remote sensing can use this platform to easily compare their field observations with satellite data, enhancing their research capabilities without needing complex software.

Citizen Science and Environmental Awareness: The application can empower citizens to monitor environmental changes in their own regions, contributing to broader efforts in tracking climate change, deforestation, urbanization, and more.

# Future Development:
Expanding Satellite Coverage: Integrating additional satellite datasets (e.g., Sentinel-2) to allow users to compare data from multiple sources and broaden the range of use cases.

Mobile Application: Developing a mobile version of the platform for easier field use, allowing users to receive notifications and compare data on the go.

Advanced Analysis Tools: Incorporating machine learning algorithms for anomaly detection, automated pattern recognition, and more sophisticated analysis of satellite data trends.

# Conclusion:
Our project "Landsat Reflectance Data: On the Fly and at Your Fingertips" democratizes access to satellite data and encourages hands-on engagement with Earth observation tools. By facilitating the comparison between ground-based measurements and Landsat SR data, our platform not only enhances educational experiences but also empowers global citizens and researchers alike to explore and contribute to understanding the planet's environmental health.
