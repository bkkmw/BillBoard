import chardet

with open('./ratings_noh.csv', 'rb') as f:
    result = chardet.detect(f.read())

print(result['encoding'])