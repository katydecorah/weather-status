import { info, setFailed } from "@actions/core";
import getWeather from "./get-weather";
import { processWeather } from "./process-weather";
import updateSlackStatus from "./slack";

async function status() {
  try {
    const weather = await getWeather();
    const report = processWeather(weather);
    const response = (await updateSlackStatus(report)) as {
      ok: boolean;
      error?: string;
      profile?: {
        status_text?: string;
      };
    };
    if (!response.ok) {
      throw new Error(response.error);
    } else {
      info(`Updated status: ${response.profile.status_text}`);
    }
  } catch (error) {
    setFailed(error.message);
  }
}

export default status();
