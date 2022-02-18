import fetch from "node-fetch";
import { getInput } from "@actions/core";
import { Status } from "./process-weather";

export default async function updateSlackStatus(profile: Status) {
  try {
    const response = await fetch(
      `https://slack.com/api/users.profile.set?token=${getInput(
        "SlackAccessToken"
      )}&profile=${encodeURIComponent(JSON.stringify(profile))}&user=${getInput(
        "SlackUser"
      )}`
    );
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
