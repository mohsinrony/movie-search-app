import React, { useEffect } from 'react';
import { genreList, langList } from '../FilterOptions';

interface Props {
  selectedGenreId?: string[];
  selectedLang?: string;
  handleGenreSelection?: (genre: { id: string | number; name: string }, checked: boolean) => void;
  handleLanguageChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setPublishYear?: (year: number) => void;
  setSortValue: (value: string) => void;
  currentYear?: number;
  viewMode: string;
  toggleViewMode: () => void;
}

const TopBar: React.FC<Props> = ({
  selectedGenreId,
  selectedLang,
  handleGenreSelection,
  handleLanguageChange,
  setPublishYear,
  setSortValue,
  currentYear,
  viewMode,
  toggleViewMode,
}) => {
    useEffect(() => {
        document.title = 'Movies | T3 MovieDB App';
        // Save viewMode to localStorage
        localStorage.setItem('viewMode', viewMode);
      }, [viewMode]);

  return (
    <div className="topBar">
      {/* FILTER STARTS */}
      <div className="filters">
        <h2 className='legend'><span>Filter Movies</span></h2>
        <div className="filterGroup">
          {/* Filter for Genres */}
          <div className="filter">
            {/* Filter for Genres */}
            <label htmlFor="genres">Genres:</label>
            <div id="genres">
              <select
                value={selectedGenreId}
                onChange={(e) => {
                  const selectedGenreId = e.target.value;
                  const selectedGenre = genreList.find(genre => genre.id === Number(selectedGenreId));
                  if (selectedGenre) {
                    handleGenreSelection(selectedGenre, true);
                  }
                }}
                multiple={true}
              >
                {genreList.map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            </div>
        </div>

        <div className="filterGroup">

          {/* Filter for Language */}
          <div className="filter">
            <label htmlFor="languages">Language:</label>
            <div id="language">
              <select id="languages" value={selectedLang} onChange={handleLanguageChange} multiple={false}>
                <option value="">Select</option>
                {langList.map((language, index) => (
                  <option key={index} value={language.code}>{language.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter for Publish Year */}
          <div className="filter">
            <label htmlFor="publishYear">Year:</label>
            <input type="number" id="publishYear" placeholder={`${currentYear}`} min={1900} max={currentYear} onChange={(e) => setPublishYear(Number(e.target.value))} />
          </div>
        
        </div>
      </div> {/* END OF FILTER */}

      {/* SORTING STARTS */}
      <div className="filters">
        <h4 className='legend'><span>Sort Movies</span></h4>
        <div className="filterGroup">
        <div className="filter">
            <select className='sortMovies' id="sort_by" onChange={(e) => setSortValue(e.target.value)}>
              <option>Select</option>
              <option value="popularity.desc">Most Popular First (Default)</option>
              <option value="popularity.asc">Least Popular First</option>
              <option value="revenue.desc">Highest Revenue First</option>
              <option value="revenue.asc">Lowest Revenue First</option>
              <option value="primary_release_date.desc">Recent Movies First</option>
              <option value="primary_release_date.asc">Old Movies First</option>
              <option value="title.asc">Name A - Z</option>
              <option value="title.desc">Name Z - A</option>
              <option value="vote_average.desc">Highest Ratings First</option>
              <option value="vote_average.asc">Lowest Ratings First</option>
              <option value="vote_count.asc">Most Voted First</option>
              <option value="vote_count.desc">Least Voted First</option>
            </select>
          </div>
        </div>
      </div>
      {/* END OF SORTING */}

      {/* View Mode Button */}
      <span className={'material-symbols-outlined viewBtn'} onClick={toggleViewMode}>
        {`${viewMode === 'grid' ? 'lists' : 'grid_view'}`}
      </span>
    </div>
  );
};

export default TopBar;