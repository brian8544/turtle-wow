if [ ! -f "./db_patch_count" ]; then
  echo "-1" > ./db_patch_count
fi
COUNT=$(cat ./db_patch_count)
COUNT=$(expr ${COUNT} + 0)

if [ -f "./merge.sql" ]; then
  rm ./merge.sql
fi
for filename in ./patches/*.gz; do
  if [ ! -f "${filename}" ]; then
    continue
  fi

  FILE=${filename:10}
  VERSION=$(expr ${FILE:0:5} + 0)

  if (( ${VERSION} > ${COUNT} )); then
    gzip -dc ${filename} >> merge.sql
    echo "" >> merge.sql
    echo ${VERSION} > ./db_patch_count
  fi
done