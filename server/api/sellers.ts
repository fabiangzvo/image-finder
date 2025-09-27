import axios from "axios";

export default defineEventHandler(async () => {
  const { alegraApiUrl, alegraToken } = useRuntimeConfig();

  try {
    const response = await axios.get(`${alegraApiUrl}/sellers`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${alegraToken}`,
      },
    });

    return {
      data: response.data ?? [],
    };
  } catch (error) {
    console.error("error: ", error);

    return { error: "Error getting sellers." };
  }
});
