# Introduction
LegacyPlayers gives you the ability to export and manage your server specific data yourself!
* Keep the data up to date, delete or modify it
* Maintain a history of your player's character's developments
* Provide more detailed data that is otherwise not accessible through player uploads
* Use LPs armory, PvP and PvE log viewer as a service by your server for your players
* Let player manage consent such that GDPR compliance is ensured

# Disclaimer
This is merely a suggestion of an implementation for the export mechanism with privacy in mind.
Feel free to fork this exporter and modify it such that it suits your needs. You can also implement
of fully custom system using the API specified on the website's swagger UI.

# How does it work?
LegacyPlayers requires you to implement two endpoints and mount a docker container in your server environment.
* A plugin for your world server that exports raid and pvp data to the container
* An endpoint for the consent manager that maps an account token to the account id, which is used to link
character ids to an account

The docker container requires access to character DB, such that it can export the data of players that gave
consent. The picture below outlines its functionality.

![LP-Export-Functionality](LP-Export-Functionality.png)

You need to implement in your website's account panel a link to the docker container's consent manager
(how is specified below). The consent manager takes care of the rest:  

![ConsentManager](ConsentManager.png)

The player can specify the characters that the player wants to export.

Given these information, exported data through the armory or world server exporter is filtered
and then optionally send to LegacyPlayers, where the player can view its data immediately. 

# Installation
```shell script
git clone https://github.com/Geigerkind/LegacyPlayersV3
cd LegacyPlayersV3/Exporter
# Adjust variables in the docker-compose.yml
# If you want to run the Frontend and Backend on different server, you have to adjust the frontend and backend ymls.
# Currently, in the example, the docker containers are linked to each other. In production the correct domain has to be used.
# If you split them you probably also want to configure the backend to use https instead. Please provide your certificates via volume then.
# Please hit me up if you encounter difficulties setting this up.
docker-compose up
```
I suggest to create a systemd service to start the containers on startup.  

Before linking to the consent manager page, set in the local storage for the key `API_TOKEN` the
serialized JSON object `{ token: string; account_id: number; }`.

Specify the environment variable `URL_AUTHORIZATION_ENDPOINT` in the docker-compose.yml file.

The endpoint verifies the key,value pair specified in `API_TOKEN`. The backend server will attempt to
post to `URL_AUTHORIZATION_ENDPOINT`. The endpoint should return either 
`true` or `false`. Please check out the sample frontend and endpoint in the export repository for more
information.

The consent manager expects to be embedded under the path prefix `/rpll/`. Please check out the `sample_nginx_host` configuration for more information.
Also a sample configuration has been set up in the `docker-compose.sample.yml` file.

The container requires `read-only access` to your WoW-server's `character database`. Please 
create a database user for this purpose and specify the DNS in the environment variable 
`CHARACTER_MYSQL_DNS` in the docker-compose.yml file.
The user needs access to the following tables: characters, arena_team_member, arena_team, guild, guild_member, guild_rank, character_inventory, item_instance,
character_skills, character_spell, instance_reset

Further you need to specify the following environment variables in the `configuration.sh` file:
* `LP_API_TOKEN` - The Legacyplayers Account token, which is hard bound to the server (i.e. if you want to contribute with 2 servers, you need 2 accounts and 2 tokens)
* `EXPANSION_ID` - Vanilla => 1; TBC => 2; WOTLK => 3. If your server harbors a custom implementation 
of WoW or your expansion is not among these, please contact me via Discord.
* `UID_SALT` - Your character und guild guids are not send directly to LP. They are hashed 
using the provided salt, as it is only required for you to identify these characters. Please 
do not loose this salt, because it is not recoverable, nor can any character be re-guided.
* `CHARACTER_FETCH_INTERVAL_IN_SEC` - Per default, every 10 minutes your character database is fetched
for characters that went offline since the last fetch. You can specify this interval here.
* `CHARACTER_MYSQL_DNS` - The docker environment operates in bridge mode. In order to access the host 
this variable needs to be configured accordingly. In ArchLinux for example you can obtain the host 
docker ip by typing `ip address`, in my case it was `172.17.0.1`. Tying all together the DNS should look 
like this: `mysql://<db_user>:<db_pass>@<docker_bridge>/<character_db_name>`, e.g. `mysql://root:secret@172.17.0.1/characters`. 
Also make sure to adjust in your mysql config to also bind `172.17.0.1`. Open for this your config and configure
`bind-address` for example like this: `bind-address=127.0.0.1,172.17.0.1`. MariaDB does not allow to set
multiple addresses at `bind-address` currently. To work around this, we can let MariaDB bind to all addresses 
using `bind-address=0.0.0.0` and restrict access using the firewall. Make sure `skip-networking` is commented 
out. Update your iptables rules to drop all connections to `3306` except from `127.0.0.1` and `172.34.0.1/24`
(or to be more restrictive only the backend's docker container's ip address): 
```shell script
iptables -N db_access
iptables -A db_access --src 127.0.0.1 -j ACCEPT
iptables -A db_access --src 172.34.0.1/24 -j ACCEPT
iptables -A db_access -j DROP
iptables -I INPUT -m tcp -p tcp --dport 3306 -j db_access
iptables-save -f /etc/iptables/iptables.rules
```
Note: That `172.34.0.1/24` must not be the correct IP range of the container.
Use `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' CONTAINER_ID` and `docker ps` to find the IP of `default_lpcmbackend_1`.

Once everything is done, you can start the container using `docker-compose up`. If your 
server is often subject to a restart, you should also create a systemd service that starts 
the consent manager as well. 

Initially the armory exporter will fully fetch all offline characters and queue them to be 
send to LegacyPlayers, so there may be a small spike. 