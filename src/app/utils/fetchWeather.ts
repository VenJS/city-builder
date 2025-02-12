export const fetchWeather = async ({
    queryKey,
  }: {
    queryKey: [string, number, number];
  }) => {
    const [, latitude, longitude] = queryKey;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return response.json();
  };