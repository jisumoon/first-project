import api from "../api";

const API_KEY = import.meta.env.VITE_API_KEY;

const getTVShows = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_TV_SHOWS_REQUEST",
      });

      const popularTVApi = api.get(
        `tv/popular?api_key=${API_KEY}&language=ko-KR&page=1`
      );
      const topRatedTVApi = api.get(
        `tv/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`
      );
      const onAirTVApi = api.get(
        `tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=1`
      );

      const [popularTV, topRatedTV, onAirTV] = await Promise.all([
        popularTVApi,
        topRatedTVApi,
        onAirTVApi,
      ]);

      console.log(popularTV);

      dispatch({
        type: "GET_TV_SHOWS_SUCCESS",
        payload: {
          popularTV: popularTV.data,
          topRatedTV: topRatedTV.data,
          onAirTV: onAirTV.data,
        },
      });
    } catch (error) {
      dispatch({
        type: "GET_TV_SHOWS_FAILURE",
      });
    }
  };
};

export const tvShowAction = { getTVShows };
