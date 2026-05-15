const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Load models
const Price = require('../src/models/Price');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Read JSON files
const dataPath = path.join(__dirname, '../../human_capital_project.json');

const importData = async () => {
  try {
    console.log('Loading JSON file... This might take a moment.');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const prices = JSON.parse(rawData);

    console.log(`Parsed ${prices.length} records. Formatting data...`);

    const formattedData = prices.map((item) => {
      // Handle the Value field: Convert empty strings to null, else parse as Float
      let val = null;
      if (item.Value !== undefined && item.Value !== null && item.Value !== '') {
        val = parseFloat(item.Value);
      }

      return {
        freq: item.FREQ,
        country: item.REF_AREA,
        countryLabel: item.REF_AREA_LABEL,
        indicator: item.INDICATOR,
        indicatorLabel: item.INDICATOR_LABEL,
        value: val,
        year: parseInt(item.Year, 10),
        month: parseInt(item.Month, 10)
      };
    });

    console.log('Clearing existing data...');
    await Price.deleteMany();

    console.log('Importing new data in batches of 5000...');
    const batchSize = 5000;
    
    for (let i = 0; i < formattedData.length; i += batchSize) {
      const batch = formattedData.slice(i, i + batchSize);
      await Price.insertMany(batch);
      console.log(`Inserted records ${i + 1} to ${Math.min(i + batchSize, formattedData.length)}...`);
    }

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Price.deleteMany();
    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
