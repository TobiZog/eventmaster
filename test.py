import math

matrikel_nr = 10019865
geloest = 1234567654321
key = 2937
code = 0

for i in range(13):
  code += math.pow(10, i) * 3

  print(code)
  print((code + matrikel_nr) * 237)