REPOSITORY_NAME='LegacyPlayersV3'
HOST_USER='root'
BACKEND_USER='rpll'
HOST_IP='78.46.41.90'
NUM_CORES=$(nproc)
DB_PASSWORD=$(cat /root/Keys/db_password)

function cleanAssetCache {
  cd /root/cache/assets/
  for filename in $(find . -name "*.png") $(find . -name "*.jpg") $(find . -name "*.jpeg"); do
    if [ $(echo ${filename} | grep "wow_icon" | wc -l) -eq 1 ] || [ ! -f "${filename}" ]; then
        continue
    fi

    FILENAME_WITHOUT_PREFIX=${filename:2}

    if [[ ! -f "/root/${REPOSITORY_NAME}/Webclient/src/assets/${FILENAME_WITHOUT_PREFIX}" ]]; then
      rm ${FILENAME_WITHOUT_PREFIX}
      rm ${FILENAME_WITHOUT_PREFIX}.webp &> /dev/null # Ignore error if it had been deleted already
    fi
    DIR=$(dirname "${FILENAME_WITHOUT_PREFIX}")
    if [ -z "$(ls -A ${DIR})" ]; then
      rm -rf ${DIR}
    fi
  done
  cd /root/
}
function optimizeJpg {
  cd /root/${REPOSITORY_NAME}/Webclient/src/assets/
  MEDIA_DIR='/root/cache/assets/'
  for filename in $(find . -name "*.jpg") $(find . -name "*.jpeg"); do
    if [ $(echo ${filename} | grep "wow_icon" | wc -l) -eq 1 ] || [ ! -f "${filename}" ]; then
        continue
    fi

    while [ $(pgrep -c -P$$) -gt ${NUM_CORES} ]; do
        sleep 0.5;
    done

    BASEFILENAME=$(basename "${filename}");
    PATHTOFILE=$(dirname "${filename:2}");
    TARGETDIR="${MEDIA_DIR}${PATHTOFILE}";

    if [ ! -d "${TARGETDIR}" ]; then
        mkdir -p ${TARGETDIR};
    fi

    if [ -f "${TARGETDIR}/${BASEFILENAME}" ]; then
        continue
    fi

    guetzli --quality 84 --nomemlimit ${filename} ${TARGETDIR}/${BASEFILENAME} > /dev/null 2> /dev/null &
  done
  cd /root
}
function optimizePng {
  cd /root/${REPOSITORY_NAME}/Webclient/src/assets/
  MEDIA_DIR='/root/cache/assets/'
  for filename in $(find . -name "*.png"); do
    if [ $(echo ${filename} | grep "wow_icon" | wc -l) -eq 1 ] || [ ! -f "${filename}" ]; then
        continue
    fi

    while [ $(pgrep -c -P$$) -gt ${NUM_CORES} ]; do
        sleep 0.5;
    done

    BASEFILENAME=$(basename "${filename}");
    PATHTOFILE=$(dirname "${filename:2}");
    TARGETDIR="${MEDIA_DIR}${PATHTOFILE}";

    if [ ! -d "${TARGETDIR}" ]; then
        mkdir -p ${TARGETDIR};
    fi

    if [ -f "${TARGETDIR}/${BASEFILENAME}" ]; then
        continue
    fi

    zopflipng --iterations=5 --filters=2me --lossy_8bit --lossy_transparent -y ${filename} ${TARGETDIR}/${BASEFILENAME} > /dev/null 2> /dev/null &
  done
  cd /root
}
function convertToWebp {
  for filename in $(find /root/cache/assets/ -name "*.png") $(find /root/cache/assets/ -name "*.jpg") $(find /root/cache/assets/ -name "*.jpeg"); do
    if [ $(echo ${filename} | grep "wow_icon" | wc -l) -eq 1 ] || [ ! -f "${filename}" ]; then
        continue
    fi

    while [ $(pgrep -c -P$$) -gt ${NUM_CORES} ]; do
        sleep 0.5;
    done

    if [ -f "${filename}.webp" ]; then
        continue
    fi

    cwebp -q 30 ${filename} -o ${filename}.webp > /dev/null 2> /dev/null &
  done
}
function optimizeAssets {
  echo "Optimizing assets"
  mkdir -p /root/cache/assets &> /dev/null
  cleanAssetCache
  optimizeJpg
  optimizePng
  convertToWebp
}

function deployDatabase {
  echo "Deploying database"
  cd /root/${REPOSITORY_NAME}/Database
  bash merger.sh
  if [ -f "./merge.sql" ]; then
    systemctl start mysqld
    mysql -uroot -p${DB_PASSWORD} < merge.sql
    systemctl stop mysqld
    rm merge.sql
  fi
  cd /root
}

function buildWebclient {
  echo "Deploying webclient"
  cd /root/${REPOSITORY_NAME}/Webclient
  # rm -rf /root/${REPOSITORY_NAME}/Webclient/node_modules
  # rm /root/${REPOSITORY_NAME}/Webclient/package-lock.json
  npm install
  npm run-script build
  cd /root
}

function deployWebclient {
  cd /root/${REPOSITORY_NAME}/Webclient
  echo "Deploying webclient"
  rm -rf /var/www/html/*
  cp -r /root/${REPOSITORY_NAME}/Webclient/dist/Webclient/* /var/www/html/
  cd /root

  # Deploying optimized assets
  cp -r /root/cache/assets/* /var/www/html/assets/
}

function buildBackend {
  echo "Building backend"
  cd /root/${REPOSITORY_NAME}
  # rustup update
  # cargo clean
  # cargo update
  cargo build --release --jobs ${NUM_CORES}
  cd /root
}

function deployBackend {
  echo "Deploying Backend"
  cd /root/${REPOSITORY_NAME}
  cp /root/${REPOSITORY_NAME}/target/release/backend /home/${BACKEND_USER}/
  cp ./.env_prod /home/${BACKEND_USER}/.env
  DB_PASSWORD=$(cat /root/Keys/db_password)
  PATREON_TOKEN=$(cat /root/Keys/patreon_token)
  echo "" >> /home/${BACKEND_USER}/.env
  echo "ROCKET_DATABASES='{main={url=\""mysql://rpll:${DB_PASSWORD}@127.0.0.1/main\""}}'" >> /home/${BACKEND_USER}/.env
  echo "" >> /home/${BACKEND_USER}/.env
  echo "MYSQL_URL='mysql://rpll:${DB_PASSWORD}@127.0.0.1/main'" >> /home/${BACKEND_USER}/.env
  echo "PATREON_TOKEN='${PATREON_TOKEN}'" >> /home/${BACKEND_USER}/.env
  cd /root
}

function deployModelGenerator {
  pip install selenium
  pip install flask
  cp /root/${REPOSITORY_NAME}/ModelViewer/viewer/* /home/rpll/ModelViewer/viewer/
  cp /root/${REPOSITORY_NAME}/ModelViewer/model_generator.py /home/rpll/ModelViewer/
  chown -R rpll /home/rpll/ModelViewer
}

function deployAddons {
  cd /root/${REPOSITORY_NAME}/Addons
  rm /var/www/html/AdvancedVanillaCombatLog.zip
  rm /var/www/html/AdvancedVanillaCombatLog_Helper.zip
  rm /var/www/html/AdvancedTBCCombatLog.zip
  rm /var/www/html/AdvancedTBCCombatLog_Helper.zip
  rm /var/www/html/AdvancedWotLKCombatLog.zip
  rm /var/www/html/AdvancedWotLKCombatLog_Helper.zip
  rm -r /var/www/html/Addons
  zip -r AdvancedVanillaCombatLog.zip ./AdvancedVanillaCombatLog
  zip -r AdvancedVanillaCombatLog_Helper.zip ./AdvancedVanillaCombatLog_Helper
  zip -r AdvancedTBCCombatLog.zip ./AdvancedTBCCombatLog
  zip -r AdvancedTBCCombatLog_Helper.zip ./AdvancedTBCCombatLog_Helper
  zip -r AdvancedWotLKCombatLog.zip ./AdvancedWotLKCombatLog
  zip -r AdvancedWotLKCombatLog_Helper.zip ./AdvancedWotLKCombatLog_Helper
  mv AdvancedVanillaCombatLog.zip /var/www/html/
  mv AdvancedVanillaCombatLog_Helper.zip /var/www/html/
  mv AdvancedTBCCombatLog.zip /var/www/html/
  mv AdvancedTBCCombatLog_Helper.zip /var/www/html/
  mv AdvancedWotLKCombatLog.zip /var/www/html/
  mv AdvancedWotLKCombatLog_Helper.zip /var/www/html/
  cp -r External /var/www/html/Addons
}

function updateConfigs {
  # Postfix
  cp /root/${REPOSITORY_NAME}/Deploy/conf/virtual /etc/postfix/
  cp /root/${REPOSITORY_NAME}/Deploy/conf/main.cf /etc/postfix/
  postmap /etc/postfix/virtual

  # Mariadb
  cp /root/${REPOSITORY_NAME}/Deploy/conf/my.cnf /etc/

  # Nginx
  cp /root/${REPOSITORY_NAME}/Deploy/conf/nginx.conf /etc/nginx/

  # Grafana
  cp -rf /root/${REPOSITORY_NAME}/Deploy/conf/Grafana/provisioning/* /var/lib/grafana/provisioning/
  # Replacing discord webhook
  WEBHOOK_URL=$(cat /root/Keys/discord_webhook | sed -e 's/[\/&\:\.\_-]/\\&/g')
  sed -i -r "s/\{\{DISCORD_WEBHOOK\}\}/${WEBHOOK_URL}/g" /var/lib/grafana/provisioning/notifiers/discord.yml

  cp /root/${REPOSITORY_NAME}/Deploy/conf/Grafana/dashboards/* /var/lib/grafana/dashboards/

  # Prometheus
  cp /root/${REPOSITORY_NAME}/Deploy/conf/prometheus.yml /etc/prometheus/

  # SSH
  rm /home/${BACKEND_USER}/.ssh/authorized_keys
  touch /home/${BACKEND_USER}/.ssh/authorized_keys
  for filename in /root/${REPOSITORY_NAME}/Deploy/ssh/*.pub; do
    if [ ! -f "${filename}" ]; then
      continue
    fi
    cat ${filename} >> /home/${BACKEND_USER}/.ssh/authorized_keys
  done
}

function stopServices {
  echo "Stopping services"
  systemctl stop nginx
  systemctl stop mysqld
  systemctl stop postfix
  systemctl stop backend
  systemctl stop prometheus
  systemctl stop grafana
  systemctl stop model_generator
}

function startServices {
  echo "Starting services"
  systemctl start nginx
  systemctl start mysqld
  systemctl start postfix
  systemctl start backend
  systemctl start prometheus
  systemctl start grafana
  systemctl start model_generator
}

function waitForJobs {
  while [ $(jobs | grep Running | wc -l) -gt 0 ]; do
    sleep 0.5s
  done
}

function deploy {
  cd /root/${REPOSITORY_NAME}

  git stash
  GIT_RESPONSE=$(git pull)
  if [ "${GIT_RESPONSE}" == "Already up to date." ] && [ -z "${1}" ]; then
        exit;
  fi;

  cd /root

  pacman -Syu --noconfirm

  optimizeAssets &
  buildWebclient &
  buildBackend &
  waitForJobs

  stopServices
  certbot renew

  updateConfigs
  deployDatabase
  deployWebclient
  deployBackend
  deployModelGenerator
  deployAddons
  waitForJobs

  startServices
}

deploy ${1}
