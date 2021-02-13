ball = int(input('Введите тестовый балл: '))

if (ball >= 90):
  print('A')
else:
  if (ball >= 80):
    print('B')
  else:
    if (ball >= 70):
      print('C')
    else:
      if (ball >= 60):
        print('D')
      else:
        print('F')
