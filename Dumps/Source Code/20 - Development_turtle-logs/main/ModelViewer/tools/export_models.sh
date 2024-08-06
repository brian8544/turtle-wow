while IFS= read -r line
do
    wget -O "./mo3/${line}.mo3" https://wow.zamimg.com/modelviewer/live/mo3/${line}.mo3 &

    numJobs=$(jobs | wc -l)
    while [ "${numJobs}" -gt "10" ]; do
        sleep 0.1s
        numJobs=$(jobs | wc -l)
    done;
done < model_files.csv
