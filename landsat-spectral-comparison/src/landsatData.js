const landsatData = [
    {
      id: 'LC08_L1TP_144051_20210515_20210524_01_T1',
      date: '2021-05-15',
      path: 144,
      row: 51,
      cloudCover: 0.08,
      center: { lat: 22.5, lon: 88.3 }, // Approximate center for Kolkata
      boundingBox: {
        nw: { lat: 23.5, lon: 87.3 },
        se: { lat: 21.5, lon: 89.3 }
      },
      bands: {
        B4: "D:\d_drive\NASA\LC09_L2SP_070017_20241005_20241006_02_T1 (1)",
        B3: "D:\d_drive\NASA\LC09_L2SP_070017_20241005_20241006_02_T1 (1)",
        B2: "D:\d_drive\NASA\LC09_L2SP_070017_20241005_20241006_02_T1 (1)"
      }
    },
    {
      id: 'LC08_L1TP_146038_20210517_20210526_01_T1',
      date: '2021-05-17',
      path: 146,
      row: 38,
      cloudCover: 0.12,
      center: { lat: 28.6, lon: 77.2 }, // Approximate center for Delhi
      boundingBox: {
        nw: { lat: 29.6, lon: 76.2 },
        se: { lat: 27.6, lon: 78.2 }
      },
      bands: {
        B4: "D:\\d_drive\\NASA\\LC09_L2SP_070017_20241005_20241006_02_T1 (1)",
        B3: "D:\\d_drive\\NASA\\LC09_L2SP_070017_20241005_20241006_02_T1 (1)",
        B2: "D:\\d_drive\\NASA\\LC09_L2SP_070017_20241005_20241006_02_T1 (1)"
      }
    },
    // Add more sample data for other regions in India
  ];
  
  module.exports = landsatData;