import requests
import json
import csv

csv.field_size_limit(2147483647)
with open('1.csv', newline='', encoding='UTF-8') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    f = open('boardgameInfo.csv', 'a', encoding='utf-8-sig', newline='')
    wr = csv.writer(f)
    for row in spamreader:
        if row[1] == 'primary':
            continue
        url="https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAf2enE9XgsAz8IhTOdRx3TI-EZ0C8QDs8&type=video&maxResults=1&regionCode=KR&q=board+game+"+row[1]+"+instruction"
        response = requests.get(url)
        wr.writerow([row[0],row[1],row[2],row[3],"https://www.youtube.com/embed/"+response.json()['items'][0]['id']['videoId'],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],row[12],row[13],row[14],row[15],row[16],row[17],row[18],row[19],row[20],row[21],row[22],row[23]])
    f.close()