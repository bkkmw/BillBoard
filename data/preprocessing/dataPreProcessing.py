import csv
import re
from googletrans import Translator

csv.field_size_limit(2147483647)
translator = Translator()
translator.raise_Exception = True
with open('games_detailed_info.csv', newline='', encoding='UTF-8') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    f = open('boardgameInfo.csv', 'a', encoding='utf-8-sig', newline='')
    wr = csv.writer(f)
    for row in spamreader:
        # if(row[0] == '' or int(row[0]) <= 21340):
        #     continue
        description = row[7]
        description = re.sub("&[^&;]+;", "", description)
        description = re.sub(" +", " ", description)
        if description is not None and len(description) != 0:
            translated = ""
            while(len(description) >= 5000):
                idx = description[:5000].rfind(".")
                d1 = description[:idx + 1]
                description = description[idx + 1:]
                translated += translator.translate(d1, src="en", dest="ko").text
            translated += translator.translate(description, src="en", dest="ko").text
        wr.writerow([row[2],row[5],row[3],row[4],translated,row[8],row[9],row[10],row[15],row[16],row[17],row[26],row[27],row[29],row[39],row[40],row[30],row[31],row[43],row[44],row[45],row[46],row[47],row[48]])
    f.close()