const initialState = {
  popularMovie: {},
  topRatedMovie: {},
  upComingMovie: {},
  genreList: [],
  popularTV: {},
  topRatedTV: {},
  onAirTV: {},
  loading: true,
};

const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_MOVIES_REQUEST":
    case "GET_TV_SHOWS_REQUEST":
      return { ...state, loading: true };

    case "GET_MOVIES_SUCCESS":
      return {
        ...state,
        popularMovie: payload.popularMovie,
        topRatedMovie: payload.topRatedMovie,
        upComingMovie: payload.upComingMovie,
        genreList: payload.genreList,
        loading: false,
      };

    case "GET_TV_SHOWS_SUCCESS":
      return {
        ...state,
        popularTV: payload.popularTV,
        topRatedTV: payload.topRatedTV,
        onAirTV: payload.onAirTV,
        loading: false,
      };

    case "GET_MOVIES_FAILURE":
    case "GET_TV_SHOWS_FAILURE":
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default movieReducer;
