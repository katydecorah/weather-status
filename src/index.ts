import { setFailed } from "@actions/core";
import getWeather from "./get-weather";
import { processWeather } from "./process-weather";
import updateSlackStatus from "./slack";

async function status() {
  try {
    const weather = await getWeather();
    const report = processWeather(weather);
    await updateSlackStatus(report);
  } catch (error) {
    setFailed(error.message);
  }
}

export default status();
