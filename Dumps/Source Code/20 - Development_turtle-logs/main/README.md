[![codecov](https://codecov.io/gh/Geigerkind/LegacyPlayersV3/branch/master/graph/badge.svg)](https://codecov.io/gh/Geigerkind/LegacyPlayersV3)
[![codecov](https://codecov.io/gh/Geigerkind/LegacyPlayersV3/branch/dev/graph/badge.svg)](https://codecov.io/gh/Geigerkind/LegacyPlayersV3)

## LegacyPlayers v3
LegacyPlayers is a community driven project to establish a platform where people
playing on all kind of expansions of World of Warcraft can share raid logs, PvP logs
and armory data. It aims to persist all data of all coming and going private servers,
as well as to provide easy access to them.

The project started 2016 as LegacyLogs, which was the website counterpart to show logs 
collected by the in-game addon [DPSMate](https://github.com/Geigerkind/DPSMate).
This solution gained popularity really fast
and proved to not scale very well. At the same time, RealmPlayers, the competing
project at this time, came to an end. Dilatazu and me initially decided to merge these two
projects, where LegacyPlayers was born on the 21.03.2017. Unfortunately, did Dilatazu
leave the team rather early in the development phase. [LegacyPlayers](https://github.com/Geigerkind/Legacyplayers)
is a huge success harboring Vanilla, TBC and WOTLK PvE and PvP logs as well as a stable armory.
However, also this architecture proved to not scale well and many bugs were introduced due
to it. Now it is at a point were it is hard to maintain and to add new wanted features.
This is why LegacyPlayers V3 was born. It is a complete rewrite and remodel of the
architecture and aims to scale to thousands of visitors. 

The goal is to unite the Legacy-WoW community in this hub and persist all the memories
of raids, characters and PvP as well as to provide useful tools.

## Licence
* LegacyPlayersV3 is licensed under the AGPLv3 license for all open source applications. 
* Anyone can host your own version of LegacyPlayers
* Any form of monetization is not allowed through the site
* Any changes that improve existing code must be fed back into the main repo and shared with everyone

## Deployment
1. Install **docker** and **docker-compose**
2. run `docker-compose up -d`
3. Website is now available under port 80
4. For integration into your custom environment, changes must be made to the environment

## Performance
* A big bottleneck is the database container currently. You should tune the configurations of the database. See the deployment folder for a comparable configuration that was used on the official site.
* The backend may be resource starved depending on your docker configuration. It eats lots of RAM :)

## Existing Bugs
There are a lot of existing bugs. Many raids are not parsed correctly in all cases. 
The parsers are a big part that could be improved. The ModelViewer is currently not integrated. 
It could be integrated easily but you have to fetch the resources yourself as I can't host them. 
Scripts are provided in the respecti folder.

# Development
## Installation
1. Install **docker**, **docker-compose**, **rustup**
2. Using rustup, install the **nightly** toolchain and set it to default
3. Make sure that no service is running on the following ports: 3306, 443, 80, 25, 4200 and 8000

### GNU/Linux
4. Go into the Environment directory and start it using `docker-compose up`. (If you want to run it as daemon, append -d)
5. Go into the Backend directory and start the server using `cargo run`
6. Go into the Webclient directory and install packages `npm ci`
7. Start the webclient using `npm run start`

### Windows/Mac
4. Go into the Environment directory and start it using `docker-compose -f docker-compose.mac_windows.yml up`. (If you want to run it as daemon, append -d)
5. Go into the Backend directory and start the server using `ROCKET_ENV=stage cargo run`
6. Go into the Webclient directory and install packages `npm ci`
7. Start the webclient using `npm run start:mac`/`npm run start:windows` in the **Git shell or some other bash**
