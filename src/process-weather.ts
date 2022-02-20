import { Weather } from "./get-weather";

export function processWeather(report: Weather): Status {
  return {
    status_emoji: getIcon(report.minutely.icon),
    status_text: getMessage(report),
  };
}

export function getIcon(icon: string) {
  if (!icon) return ":question:";
  const icons = {
    "clear-day": ":sunny:",
    "clear-night": ":crescent_moon:",
    "partly-cloudy-day": ":partly_sunny:",
    "partly-cloudy-night": ":partly_sunny:",
    cloudy: ":cloud:",
    rain: ":rain_cloud:",
    sleet: ":snow_cloud:",
    snow: ":snowflake:",
    wind: ":wind_blowing_face:",
    fog: ":fog:",
  };
  return icons[icon] ? icons[icon] : ":question:";
}

export function getMessage(report: Weather) {
  const units = report.flags.units == "us" ? "℉" : "℃";
  let message = `${report.minutely.summary} ${Math.round(
    report.currently.temperature
  )}${units}`;

  // let us know if actual temperature differs from apparent temperature
  if (
    Math.round(report.currently.apparentTemperature) !==
    Math.round(report.currently.temperature)
  ) {
    message += ` (feels like ${Math.round(
      report.currently.apparentTemperature
    )}${units})`;
  }
  return message;
}

export type Status = {
  status_emoji: string;
  status_text: string;
};
