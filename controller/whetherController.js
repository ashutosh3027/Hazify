const axios = require("axios");
const db = require("./../db");

exports.getWhetherByCityName = async (req, res, next) => {
  try {
    const { q:city } = req.query;
    const { data } = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.APPID}&query=${city}`
    );
    const lat = data.location.lat, lon = data.location.lon;
      const weather_description = data.current.weather_descriptions[0],weatherIcon = data.current.weather_icons[0];
      let locationId, weatherId;
    // check if city is already in the table or not;
    const cityData = await db.Location.findAll({ where: { city } });
    // Check if current weather data already exist or not.
    const weatherData = await db.Weather.findAll({
      where: { weather_description, weatherIcon },
    });
    let currentCityData,currentWeatherData;
    if (cityData.length > 0) {
      locationId = cityData[0].dataValues.id;
    }
    else{

      const { dataValues:temp } = await db.Location.create({ city, lat, lon });
      currentCityData = temp;
      locationId = currentCityData.id;
    }
    if (weatherData.length>0) {
      weatherId = weatherData[0].dataValues.id;
    }
    
    else{
      const { dataValues:temp } = await db.Weather.create({
        weather_description,
        weatherIcon,
      });
      currentWeatherData = temp;
      weatherId = currentWeatherData.id;
    }
 
    const local_time = data.location.localtime;
    const { dataValues:weatherHistory} = await db.History.create({
      local_time,
      WeatherId: weatherId,
      LocationId: locationId,
    });
    const result = await db.History.findAll({include:[{model:db.Location}, {model:db.Weather}], where:{LocationId:locationId}, order: [
      ['local_time', 'DESC']]});    
    res.status(200).json({
      status: "success",
      result
    });
  } catch (error) {
    console.log(error);
  }
};

