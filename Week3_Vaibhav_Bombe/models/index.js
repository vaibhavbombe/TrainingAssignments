require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Weather } = require('./models');

const app = express();
app.use(express.json());

const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Q.1 

app.post('/api/SaveWeatherMapping', async (req, res) => {
  const cities = req.body;

  try {
    const weatherData = await Promise.all(cities.map(async (cityObj) => {
      const geoResponse = await axios.get('https://api.api-ninjas.com/v1/geocoding', {
        params: { city: cityObj.city, country: cityObj.country },
        headers: { 'X-Api-Key': GEOCODING_API_KEY }
      });

      const { latitude, longitude } = geoResponse.data[0];

      const weatherResponse = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
        params: { q: `${latitude},${longitude}` },
        headers: {
          'X-RapidAPI-Key': WEATHER_API_KEY,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      });

      const weather = weatherResponse.data.current.condition.text;
      const time = new Date();

      const weatherRecord = {
        city: cityObj.city,
        country: cityObj.country,
        weather,
        time,
        latitude,
        longitude
      };

      await Weather.create(weatherRecord);
      return weatherRecord;
    }));

    res.status(200).json(weatherData);
  } catch (error) {
    debugger;
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// Q.2 
app.get('/api/weatherDashboard', async (req, res) => {
  const { city } = req.query;

  try {
    let weatherData;

    if (city) {
      debugger;
      
      weatherData = await Weather.findAll({
        where: { city },
        order: [['time', 'DESC']]
      });
    } else {
      debugger;
      weatherData = await Weather.findAll({
        attributes: [
          [sequelize.fn('DISTINCT', sequelize.col('city')), 'city'],
          'country',
          [sequelize.fn('MAX', sequelize.col('time')), 'latestTime']
        ],
        group: ['city', 'country'],
        order: [['latestTime', 'DESC']],
        raw: true
      });

     
      const latestWeatherConditions = await Promise.all(weatherData.map(async (data) => {
        const latestRecord = await Weather.findOne({
          where: {
            city: data.city,
            country: data.country,
            time: data.latestTime
          }
        });
        return latestRecord;
      }));

      weatherData = latestWeatherConditions;
    }

    debugger;
    const response = weatherData.map(record => ({
      id: record.id,
      city: record.city,
      country: record.country,
      date: record.time,
      weather: record.weather
    }));

    // Q.3 (Migration issues)

    const emailTable = `
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Country</th>
            <th>Date</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          ${emailContent.map(record => `
            <tr>
              <td>${record.id}</td>
              <td>${record.city}</td>
              <td>${record.country}</td>
              <td>${record.date}</td>
              <td>${record.weather}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false, 
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: "Weather App" `<${EMAIL_USER}>`, 
      to: 'vaibhav@gmail.com', 
      subject: 'Weather Data', 
      html: emailTable 
    });

    res.status(200).json({message: 'Email sent successfully.'});
  } catch (error) {
    debugger;
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});