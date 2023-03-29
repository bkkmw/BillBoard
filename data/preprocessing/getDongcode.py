f = open('./input.txt', 'r', encoding='utf-8-sig', newline='')
f2 = open('./output.txt', 'w', encoding='utf-8-sig', newline='')
lines = f.readline().split(')')
for line in lines:
    a = line.split(',')
    f2.write("(" + a[5] +"," + a[2] + "," + a[3] + "," + a[4] + "," + a[6] + "," + a[7] + "),")

f.close()
f2.close()
