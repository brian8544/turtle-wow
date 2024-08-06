MYSQL_UP=$(ps aux | grep mysql | wc -l)
if [ "${MYSQL_UP}" -le 1 ]; then
        exit
fi

DB_PASSWORD=$(cat /root/Keys/db_password)
OFFSET=$(($(cat /root/DB_BACKUPS/current_offset)))
LOG_1_PREV=${OFFSET}
LOG_1_NEXT=$((OFFSET + 1))
LOG_2_PREV=$((OFFSET + 6))
LOG_2_NEXT=$((OFFSET + 7))
LOG_3_PREV=$((OFFSET + 13))
LOG_3_NEXT=$((OFFSET + 14))

if (( OFFSET == 6 )); then
  echo "1" > /root/DB_BACKUPS/current_offset
else
  echo "$((OFFSET + 1))" > /root/DB_BACKUPS/current_offset
fi

mv /root/DB_BACKUPS/Backup_${LOG_3_PREV}.zip /root/DB_BACKUPS/Backup_${LOG_3_NEXT}.zip
mv /root/DB_BACKUPS/Backup_${LOG_2_PREV}.zip /root/DB_BACKUPS/Backup_${LOG_2_NEXT}.zip
mv /root/DB_BACKUPS/Backup_${LOG_1_PREV}.zip /root/DB_BACKUPS/Backup_${LOG_1_NEXT}.zip

echo "Dumping database..."
mariabackup --backup --target-dir /root/DB_BACKUPS/Backup_1 --user=root --password=${DB_PASSWORD}

echo "Zipping the dump..."
zip -r /root/DB_BACKUPS/Backup_1.zip /root/DB_BACKUPS/Backup_1

echo "Removing unzipped files..."
rm -rf /root/DB_BACKUPS/Backup_1

echo "DONE!"