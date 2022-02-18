import fetch from "node-fetch";
import { getInput } from "@actions/core";
import { Status } from "./process-weather";

export default async function updateSlackStatus(profile: Status) {
  try {
    const response = await fetch(`https://slack.com/api/users.profile.set`, {
      method: "post",
      body: JSON.stringify({
        profile: profile,
      }),
      headers: {
        Authorization: `Bearer ${getInput("SlackAccessToken")}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
