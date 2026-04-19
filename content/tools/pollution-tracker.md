---
name: "Pollution Tracker"
tagline: "Real-time air quality across Indian cities — made legible."
description: "A real-time air quality monitor that visualises pollution levels across Indian cities. Built to make environmental data legible for everyday decisions."
platform: "Web App"
status: "Live"
version: "1.1.0"
color: "#1e3a2f"
url: null
image: null
builtWith: ["Next.js", "TypeScript", "Google Maps API"]
features:
  - "Live AQI data across major Indian cities"
  - "Colour-coded map with zoomable city clusters"
  - "Plain-language air quality descriptions — not just numbers"
  - "Pollutant breakdown: PM2.5, PM10, NO₂, O₃"
  - "No account required — just open and check"
next:
  - "Historical data charts (7-day and 30-day views)"
  - "Location-based alerts when AQI crosses a threshold"
  - "Expanded coverage beyond metro cities"
changelog:
  - version: "1.1.0"
    date: "2026-03-20T10:00:00"
    notes:
      - "Added pollutant breakdown panel per city"
      - "Improved cluster rendering at mid-zoom levels"
      - "Switched to a more reliable data source for 12 cities"
  - version: "1.0.0"
    date: "2026-02-05T16:00:00"
    notes:
      - "Initial release with live AQI map"
      - "Colour-coded markers across 25 Indian cities"
      - "Plain-language descriptions for each AQI tier"
---

## What it is

Pollution Tracker is a real-time air quality map for India. It pulls live AQI data and displays it on an interactive map, colour-coded by severity — from green (clean) to deep red (hazardous).

The goal was to make environmental data actually usable. Most air quality dashboards show you a number. Pollution Tracker shows you what that number means: whether you should open your windows, go for a run, or keep your kids indoors.

## Why I built it

India has some of the worst air quality in the world, and the data exists — it's publicly available from government monitoring stations. The problem is accessibility. The official dashboards are built for researchers and regulators, not people making everyday decisions.

I wanted a tool that answered one question clearly: *is the air okay right now, where I am or where I'm going?*

## How it works

The app queries real-time AQI feeds for cities across India and overlays them on a Google Maps base layer. At wide zoom levels, cities cluster together with an averaged reading. Zoom in and individual monitoring stations appear.

Colour coding follows the standard AQI tiers (Good / Satisfactory / Moderate / Poor / Very Poor / Severe), but each marker also shows a plain-language label so you don't have to remember what the numbers mean.

The pollutant breakdown panel shows the specific contributors — PM2.5 tends to dominate in winter months, while ozone peaks in summer afternoons. Knowing which pollutant is driving the reading matters if you're making decisions about outdoor exposure.
