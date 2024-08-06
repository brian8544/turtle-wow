SCRIPT_PATH=$(dirname "${0}")
POSSIBLE_TEMPLATES=("component" "module" "service")

TEMPLATE=${1}
TARGET_PATH=${2}
NAME_SNAKE_CASE=${3}

if [[ "${TEMPLATE}" == "--help" ]]; then
  echo "generate.sh <TEMPLATE> <PATH> <NAME>"
  echo "<NAME> needs to be in snake case!"
  echo "Supported templates are:"
  for template in ${POSSIBLE_TEMPLATES[@]}; do
    echo "- ${template}"
  done
  exit
fi

if [[ ! " ${POSSIBLE_TEMPLATES[@]} " =~ " ${TEMPLATE} " ]]; then
  echo "The template ${TEMPLATE} is not supported!"
  echo "Supported templates are:"
  for template in ${POSSIBLE_TEMPLATES[@]}; do
    echo "- ${template}"
  done
  exit
fi

if [[ -z ${TARGET_PATH} ]]; then
  echo "Path is empty!"
  exit
fi
if [[ "${TARGET_PATH: -1}" != "/" ]]; then
  TARGET_PATH="${TARGET_PATH}/"
fi
if [[ ! -d ${TARGET_PATH} ]]; then
  echo "The path does not point to a valid directory"
  exit
fi

if [[ -z ${NAME_SNAKE_CASE} ]]; then
  echo "Name is empty!"
  exit
fi

# Converting the snake case name to pascal case
NAME_PASCAL_CASE=""
NAME_SNAKE_CASE_LOWER=${NAME_SNAKE_CASE,,}
for word in ${NAME_SNAKE_CASE//_/ }; do
  NAME_PASCAL_CASE=${NAME_PASCAL_CASE}${word^}
done

# Finally defining the creation scripts
function createComponent {
  # Check if creation directory does not yet exist
  NEW_DIR_PATH=${1}${NAME_SNAKE_CASE_LOWER}
  if [[ -d ${NEW_DIR_PATH} ]]; then
    echo "The path ${NEW_DIR_PATH} already exists!"
    exit
  fi

  # Creating files
  mkdir ${NEW_DIR_PATH}
  cp "${SCRIPT_PATH}/template/component/component.TEMPLATE" "${NEW_DIR_PATH}/${NAME_SNAKE_CASE_LOWER}.ts"
  touch "${NEW_DIR_PATH}/${NAME_SNAKE_CASE_LOWER}.scss"
  touch "${NEW_DIR_PATH}/${NAME_SNAKE_CASE_LOWER}.html"

  # Replacing template content
  sed -i -r "s/\{\{NAME_SNAKE_CASE_LOWER\}\}/${NAME_SNAKE_CASE_LOWER}/g" "${NEW_DIR_PATH}/${NAME_SNAKE_CASE_LOWER}.ts"
  sed -i -r "s/\{\{NAME_PASCAL_CASE\}\}/${NAME_PASCAL_CASE}/g" "${NEW_DIR_PATH}/${NAME_SNAKE_CASE_LOWER}.ts"
}

function createModule {
  # Check if creation directory does not yet exist
  NEW_DIR_PATH=${1}${NAME_SNAKE_CASE_LOWER}
  if [[ -d ${NEW_DIR_PATH} ]]; then
    echo "The path ${NEW_DIR_PATH} already exists!"
    exit
  fi

  # Creating structure and files
  mkdir -p "${NEW_DIR_PATH}/component"
  cp "${SCRIPT_PATH}/template/module/module.TEMPLATE" "${NEW_DIR_PATH}/module.ts"
  cp "${SCRIPT_PATH}/template/module/routing.TEMPLATE" "${NEW_DIR_PATH}/routing.ts"

  # Replacing template content
  sed -i -r "s/\{\{NAME_SNAKE_CASE_LOWER\}\}/${NAME_SNAKE_CASE_LOWER}/g" "${NEW_DIR_PATH}/module.ts"
  sed -i -r "s/\{\{NAME_PASCAL_CASE\}\}/${NAME_PASCAL_CASE}/g" "${NEW_DIR_PATH}/module.ts"
  sed -i -r "s/\{\{NAME_SNAKE_CASE_LOWER\}\}/${NAME_SNAKE_CASE_LOWER}/g" "${NEW_DIR_PATH}/routing.ts"
  sed -i -r "s/\{\{NAME_PASCAL_CASE\}\}/${NAME_PASCAL_CASE}/g" "${NEW_DIR_PATH}/routing.ts"

  # We would overwrite the environment variables otherwise
  createComponent "${NEW_DIR_PATH}/component/"
}

function createService {
  NEW_DIR_PATH=${1}
  cp "${SCRIPT_PATH}/template/service/service.TEMPLATE" "${NEW_DIR_PATH}/${NAME_SNAKE_CASE_LOWER}.ts"
  sed -i -r "s/\{\{NAME_PASCAL_CASE\}\}/${NAME_PASCAL_CASE}/g" "${NEW_DIR_PATH}/${NAME_SNAKE_CASE_LOWER}.ts"
}

if [[ "${TEMPLATE}" == "component" ]]; then
  echo "Creating component!"
  createComponent "${TARGET_PATH}"
elif [[ "${TEMPLATE}" == "module" ]]; then
  echo "Creating module!"
  createModule "${TARGET_PATH}"
elif [[ "${TEMPLATE}" == "service" ]]; then
  echo "Creating service!"
  createService "${TARGET_PATH}"
fi
