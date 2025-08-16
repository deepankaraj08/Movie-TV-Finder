import { useEffect, useState } from "react";

export default function Home() {
  const API_KEY = "76cccd233c3e944ab9d07e0a495acfd9";
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState(null);
  const [category, setCategory] = useState("trending");

  // Genre IDs
  const GENRE_IDS = {
    romance: 10749,
    documentary: 99,
    action: 28,
    comedy: 35,
    scifi: 878,
    fantasy: 10765,
    kids: 10751,
    mystery: 9648,
    thriller: 53,
    crime: 80,
    drama: 18,
  };

  useEffect(() => {
    if (search.trim()) return;

    let url = "";

    switch (category) {
      case "trending":
        url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
        break;

      case "hollywood":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=popularity.desc`;
        break;

      case "bollywood":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`;
        break;

      case "most-watched-show":
        url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
        break;

      case "romantic":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_IDS.romance}&sort_by=popularity.desc`;
        break;

      case "korean-drama":
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc`;
        break;

      case "new-gen-tv":
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=first_air_date.desc`;
        break;

      case "top-rated-movies":
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        break;

      case "upcoming":
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
        break;

      case "documentary":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_IDS.documentary}&sort_by=popularity.desc`;
        break;

      case "action-adventure":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_IDS.action}&sort_by=popularity.desc`;
        break;

      case "comedy":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_IDS.comedy}&sort_by=popularity.desc`;
        break;

      case "sci-fi-fantasy":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_IDS.scifi},${GENRE_IDS.fantasy}&sort_by=popularity.desc`;
        break;

      case "kids-family":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_IDS.kids}&sort_by=popularity.desc`;
        break;

      case "anime":
        // Anime isn't an official genre, but we can search with keyword or genre 16 (animation)
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`;
        break;

      case "mystery-thriller":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_IDS.mystery},${GENRE_IDS.thriller}&sort_by=popularity.desc`;
        break;

      case "crime-drama":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${GENRE_IDS.crime},${GENRE_IDS.drama}&sort_by=popularity.desc`;
        break;

      case "foreign-language":
        // Example: French (fr), you can extend with dropdown or something later
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=fr&sort_by=popularity.desc`;
        break;

      case "classic":
        // Movies released before 1980
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_date.lte=1980-01-01&sort_by=popularity.desc`;
        break;

      case "tv-by-network":
        // Example for Netflix network id = 213 (you can add UI to pick network)
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213&sort_by=popularity.desc`;
        break;

      default:
        url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));
  }, [category, API_KEY, search]);

  const searchMovies = () => {
    if (!search.trim()) return;
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
        search
      )}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch(() => setMovies([]));
  };

  const openModal = async (item) => {
    try {
      const type = item.media_type || (item.first_air_date ? "tv" : "movie");
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const trailer = data.results.find((v) => v.type === "Trailer");
      setModalData({
        ...item,
        trailer: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : "#",
      });
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  };

  const categoryLabels = {
    trending: "Trending",
    hollywood: "Hollywood",
    bollywood: "Bollywood",
    "most-watched-show": "Most Watched Shows",
    romantic: "Romantic",
    "korean-drama": "Korean Drama",
    "new-gen-tv": "New Generation TV Shows",
    "top-rated-movies": "Top Rated Movies",
    upcoming: "Upcoming Releases",
    documentary: "Documentaries",
    "action-adventure": "Action & Adventure",
    comedy: "Comedy",
    "sci-fi-fantasy": "Sci-Fi & Fantasy",
    "kids-family": "Kids & Family",
    anime: "Anime",
    "mystery-thriller": "Mystery & Thriller",
    "crime-drama": "Crime & Drama",
    "foreign-language": "Foreign Language",
    classic: "Classic Movies",
    "tv-by-network": "TV Shows by Network",
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 flex flex-col">
      {/* Category Tabs */}
      <section className="p-4 flex flex-wrap justify-center gap-3 overflow-x-auto">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setCategory(key);
              setSearch("");
            }}
            className={`px-4 py-2 rounded whitespace-nowrap ${
              category === key
                ? "bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </section>

      {/* Search Section */}
      <section className="p-4 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovies()}
          placeholder="Search movies or TV shows..."
          className="w-full max-w-xl px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 outline-none"
        />
        <button
          onClick={searchMovies}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </section>

      {/* Movies Grid */}
      <section className="p-4 flex-grow overflow-auto">
        <h2 className="text-xl font-semibold mb-4">
          {search.trim() ? `Search Results for "${search}"` : categoryLabels[category]}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map(
            (item) =>
              item.poster_path && (
                <div
                  key={item.id}
                  onClick={() => openModal(item)}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transform transition cursor-pointer"
                >
                  <img
                    src={IMG_BASE + item.poster_path}
                    alt={item.title || item.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="font-semibold truncate">{item.title || item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ⭐ {item.vote_average} | {item.release_date || item.first_air_date || "N/A"}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setModalData(null)}
              className="absolute top-2 right-2 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={IMG_BASE + modalData.poster_path}
              alt={modalData.title || modalData.name}
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2">{modalData.title || modalData.name}</h3>
              <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
                ⭐ {modalData.vote_average} | {modalData.release_date || modalData.first_air_date || "N/A"}
              </p>
              <p className="mb-4">{modalData.overview}</p>
              {modalData.trailer && modalData.trailer !== "#" ? (
                <a
                  href={modalData.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Watch Trailer
                </a>
              ) : (
                <p className="text-red-500 font-semibold">Sorry, trailer is not available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 text-center text-gray-700 dark:text-gray-300 py-4 mt-auto shadow-inner">
        <p>© {new Date().getFullYear()} Movie & TV Finder. All rights reserved.</p>
      </footer>
    </div>
  );
}
