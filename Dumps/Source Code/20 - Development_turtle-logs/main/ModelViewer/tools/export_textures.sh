while IFS= read -r line
do
    if [ ! -f "./textures/${line}.png" ]; then
        wget -O "./textures/${line}.png" https://wow.zamimg.com/modelviewer/live/textures/${line}.png &
    fi


    numJobs=$(jobs | wc -l)
    while [ "${numJobs}" -gt "10" ]; do
        sleep 0.1s
        numJobs=$(jobs | wc -l)
    done;
done < texture_file_data.csv
