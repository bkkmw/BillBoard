a = [[],[],[]]
a[1] = ['1','35','45','75']
a[2] = ['0.5','0.7','3.2','101']
a[0] = [0,0,0,0]
result = [[i] for i in range(len(a)) in zip(*a)]
print(result)