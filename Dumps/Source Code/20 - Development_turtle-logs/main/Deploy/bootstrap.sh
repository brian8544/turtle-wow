HOST_USER='root'
HOST_IP='78.46.41.90'

unzip ./Keys.zip

scp -r ./Keys ${HOST_USER}@${HOST_IP}:/${HOST_USER}/
scp -r ./init.sh ${HOST_USER}@${HOST_IP}:/${HOST_USER}/

ssh ${HOST_USER}@${HOST_IP} "bash init.sh && rm init.sh && rm ~/Keys/ovh.ini"
