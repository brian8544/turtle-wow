if [ ! -f "/var/lib/mysql/db_patch_count" ]; then
  echo "-1" > /var/lib/mysql/db_patch_count
fi
COUNT=$(cat /var/lib/mysql/db_patch_count)
COUNT=$(expr ${COUNT} + 0)

if [ -f "/var/lib/mysql/merge.sql" ]; then
  rm /var/lib/mysql/merge.sql
fi
for filename in ./patches/*.zip; do
  if [ ! -f "${filename}" ]; then
    continue
  fi

  FILE=${filename:10}
  VERSION=$(expr ${FILE:0:5} + 0)

  if (( ${VERSION} > ${COUNT} )); then
    unzip ${filename}
    cat ${filename:10:-4}.sql >> /var/lib/mysql/merge.sql
    echo "" >> /var/lib/mysql/merge.sql
    echo ${VERSION} > /var/lib/mysql/db_patch_count
    rm ${filename:10:-4}.sql
  fi
done