cd $(dirname "$0")
source ./../configuration.sh

for template in ${_WEBCLIENT_TEMPLATE_FILES[@]}; do
  TARGET_NAME=$(echo "${template}" | sed -e "s/\_template//g")
  SOURCE_PATH="./../${template}"
  TARGET_PATH="./../${TARGET_NAME}"

  cat "${SOURCE_PATH}" > "${TARGET_PATH}"
  for var in ${!WEBCLIENT_@}; do
    sed -i -r "s/\{\{${var}\}\}/${!var}/g" ${TARGET_PATH}
  done

done

if [ ! -d "./../src/assets/wow_icon" ]; then
    unzip -o ./../src/assets/wow_icon.zip -d ./../src/assets/
fi
