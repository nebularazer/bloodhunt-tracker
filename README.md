# bloodhunt-tracker

Fetches [Vampire: The Masquerade - Bloodhunt](https://store.steampowered.com/app/760160/Vampire_The_Masquerade__Bloodhunt/) stats from [tracker.gg](https://tracker.gg/bloodhunt) and stores them into *.txt files for further use e.x. OBS for stream overlays.

⚠️ Currently in alpha.  
⚠️ Stats are hardcored to [TheSpudHunter](https://www.twitch.tv/thespudhunter) in `src/stats.js`.

## How it works

tracker.gg uses cloudflare to protect their site against bots and automated attempts to read data.  
They offer an developer API, but sadly not for all games (yet?).  
This tool uses [puppeteer](https://pptr.dev/) to get data from a headless chrome, which is not detected by cloudflares protection.  
The code is bundled in a single executable with [vercel/pkg](https://github.com/vercel/pkg).

## How to run
Download the binary for your operating system from the [releases](https://github.com/nebularazer/bloodhunt-tracker/releases) page.

- Open a terminal in the folder where you downloaded the binary.
- run `bloodhunt-tracker-[os] <path/to/chrome.exe>`  
  ex. Windows: `bloodhunt-tracker-win.exe "C:\Program Files\Google\Chrome\Application\chrome.exe"`
- The cli will create *.txt files in the same directory with the values.

![Windows Example](images/windows_cli.png?raw=true)

## Build the binaries from source

Requirements:
- [nodejs](https://nodejs.org/en/) >= 16.15

- clone this repository or download the sources and unpack them
- run `npm install` to install dependencies
- run `npm run build` to create the binaries in the build folder
