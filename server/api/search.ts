import axios from "axios";

export default defineEventHandler(async (event) => {
  const { q, page = 1 } = getQuery<{ q: string; page: number }>(event);
  const { googleApiKey, googleApiUrl, googleSearchEngineId } =
    useRuntimeConfig();

  if (!q) return { error: "query param is mandatory." };

  try {
    const response = await axios.get(googleApiUrl, {
      params: {
        key: googleApiKey,
        q,
        start: page * 10 + 1,
        cx: googleSearchEngineId,
        num: 10,
        searchType: "image",
        imgSize: "large",
      },
    });

    return {
      data: response?.data?.items ?? [],
      total: response.data.queries.request[0].totalResults ?? 0,
    };
  } catch (error) {
    console.error("error: ", (error as any)?.response?.data);

    return { error: "Error when searching in Google." };
  }
});
