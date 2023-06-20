import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.rawg.io/api/games?key=2fe3b511fb4642928d0659ec54238802',
  headers: {
    'X-RapidAPI-Key': '257d3d9ae1msh88af69b90b98106p1bed6cjsn6207d6d97b56',
    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
  if (response.data.results) {
    const novo = response.data.results.map(({id, name, background_image,genres,platforms}) => ({
      id,
      name,
      background_image,
      genres: genres.map((genre) => genre.name).join(', '),
      platforms: platforms.map((platform) => platform.platform.name).join(', ')
    }));
    console.log(novo);
  }
} catch (error) {
	console.error(error);
}