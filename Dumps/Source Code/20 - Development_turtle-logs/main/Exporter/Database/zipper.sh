cd ./patches
for filename in *.sql; do
  if [ ! -f ${filename::-4}.zip ]; then
	  zip "${filename::-4}.zip" "${filename}";
	fi
done
