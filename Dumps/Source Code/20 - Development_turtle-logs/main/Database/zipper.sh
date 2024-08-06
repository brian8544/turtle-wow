cd ./patches
for filename in *.sql; do
  if [ ! -f ${filename::-4}.zip ]; then
	  gzip "${filename}";
	fi
done
