const titles = ['Desert Mirage', 'The Last Frame', 'Threshold', 'Echoes of Silence', 'Neon Protocol', 'Void Horizon', 'The Recursive City', 'Labyrinth of Echoes', 'The Last Whisper', 'Comedy Club Noir', 'Terminal Echo', 'Beyond the Sun', 'Silent Zenith', 'Neon Genesis: Origin'];
const directors = ['Elias Thorne', 'Marcus Vane', 'Sienna Ro', 'John Smith', 'Jane Doe'];
const genresList = ['Action', 'Comedy', 'Thriller', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Romance', 'Mystery', 'Indie', 'Noir'];
const types = ['movie', 'series', 'short'];
const ratings = ['PG-13', 'R', 'TV-MA', 'G'];
const languages = ['English', 'Spanish', 'French', 'Korean', 'Japanese'];
const moods = ['thrill', 'laugh', 'cry', 'think', 'romance', 'action'];
const castList = ['Elias Thorne', 'Marcus Vane', 'Sienna Ro', 'Emma Frost', 'Noah Centineo', 'Anya Taylor'];

const generateReviews = (id) => {
  return [
    {
      id: `r_${id}_1`,
      username: 'filmcritic88',
      avatar: 'https://i.pravatar.cc/36?u=filmcritic88',
      date: '2024-03-14',
      stars: 4.5,
      spoiler: false,
      body: 'The production design alone is worth the price of admission. It feels tactile, lived-in, and terrifyingly plausible. Thorne has outdone himself.',
      likes: 234
    },
    {
       id: `r_${id}_2`,
       username: 'Cinephile_Sarah',
       avatar: 'https://i.pravatar.cc/36?u=Cinephile_Sarah',
       date: '2024-03-12',
       stars: 5,
       spoiler: true,
       body: 'A masterful exploration of memory and identity. The third act twist left me reeling. Sienna Ro\'s arc is hauntingly good. Definitely an all-time classic.',
       likes: 189
    },
    {
       id: `r_${id}_3`,
       username: 'indie_lover',
       avatar: 'https://i.pravatar.cc/36?u=indie_lover',
       date: '2024-03-10',
       stars: 3.5,
       spoiler: false,
       body: 'Solid premise but drags in the middle. Still, the cinematography in the rain-slicked neon streets is undeniably gorgeous.',
       likes: 42
    }
  ]
};

export const CONTENT_ITEMS = Array.from({ length: 60 }, (_, i) => {
  const idStr = String(i + 1).padStart(3, '0');
  const title = titles[i % titles.length] + (i >= titles.length ? ` ${Math.floor(i/titles.length) + 1}` : '');
  
  return {
    id: `cv${idStr}`,
    title: title,
    type: types[i % types.length],
    year: 2024 - (i % 10),
    rating: ratings[i % ratings.length],
    runtime: 80 + (i % 80),
    genres: [genresList[i % genresList.length], genresList[(i + 1) % genresList.length]],
    language: languages[i % languages.length],
    director: directors[i % directors.length],
    synopsis: 'In a world where memories are currency, one man must find the person who stole his past. As the line between his own reality and his digital fabrications blurs, he must decide if some truths are better left forgotten.',
    cast: [castList[i % 6], castList[(i+1)%6], castList[(i+2)%6], castList[(i+3)%6]],
    score: 3 + ((i % 20) / 10), // varies 3.0 to 4.9
    ratingCount: 1000 + (i * 123),
    mood: [moods[i % moods.length], moods[(i+2) % moods.length]],
    progress: ((i % 7 === 0) || (i % 5 === 0)) ? ((i * 12) % 100) || 50 : null,
    trending: (i < 10) ? i + 1 : false, 
    reviews: generateReviews(`cv${idStr}`)
  };
});
