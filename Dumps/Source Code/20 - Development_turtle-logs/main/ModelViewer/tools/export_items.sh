
delimiter=,
while IFS= read -r line
do
    array=();
    s=$line$delimiter;
    while [[ $s ]]; do
        array+=( "${s%%"$delimiter"*}" );
        s=${s#*"$delimiter"};
    done;

    if [ ! -d "./meta/armor/${array[2]}" ]; then
        mkdir -p "./meta/armor/${array[2]}";
    fi
    
    echo "Exporting ${array[0]}";
    curl -H "Access-Control-Request-Method: GET" -H "Origin: https://www.wowhead.com" https://wow.zamimg.com/modelviewer/live/meta/armor/${array[2]}/${array[1]}.json > "./meta/armor/${array[2]}/${array[1]}.json" &

    curl -H "Access-Control-Request-Method: GET" -H "Origin: https://www.wowhead.com" https://wow.zamimg.com/modelviewer/live/meta/item/${array[1]}.json > "./meta/item/${array[1]}.json" &

    numJobs=$(jobs | wc -l)
    echo "NUM JOBS: ${numJobs}";
    while [ "${numJobs}" -gt "10" ]; do
        sleep 0.1s
        numJobs=$(jobs | wc -l)
    done;
done < items.csv
