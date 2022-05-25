import { processWeather } from "../process-weather";
import clear from "./fixtures/clear.json";
import rain from "./fixtures/rain.json";
import snow from "./fixtures/snow.json";
import si from "./fixtures/si.json";
import noIcon from "./fixtures/no-icon.json";

describe("processWeather", () => {
  test("clear", () => {
    expect(processWeather(clear)).toEqual({
      status_emoji: ":sunny:",
      status_text: "Clear for the hour. 51℉",
    });
  });

  test("rain", () => {
    expect(processWeather(rain)).toEqual({
      status_emoji: ":rain_cloud:",
      status_text:
        "Light rain stopping in 13 min., starting again 30 min. later. 66℉",
    });
  });

  test("snow", () => {
    expect(processWeather(snow)).toEqual({
      status_emoji: ":snowflake:",
      status_text: "Light snow for the hour. 27℉ (feels like 16℉)",
    });
  });

  test("si", () => {
    expect(processWeather(si)).toEqual({
      status_emoji: ":sunny:",
      status_text: "Clear for the hour. 51℃",
    });
  });

  test("no icon", () => {
    expect(processWeather(noIcon)).toEqual({
      status_emoji: ":question:",
      status_text: "Clear for the hour. 51℃",
    });
  });
});
