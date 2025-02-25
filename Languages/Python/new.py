for number in range(5,21):
    print(number)


for number in range(5):
 print(number*number)


for number in range(5):
 print(number*number)

for num in range(5,11):
    print(num+number)

count = 0
for number in range(1,5):
    count = count + number
print(count)


def string_length(string):
    count = 0
    for letter in string:
        count += 1
    return count

print(string_length('hello'))

def last_letter(string):
    return string[-1]

print(last_letter('hello'))
print(last_letter('rahul'))


def bigger_guy(num1, num2):
  if num1 > num2:
    return num1
  else:
    return num2

print(bigger_guy(55,43))
print(bigger_guy(55,77))


def biggest_guy(num1,num2,num3):
    return bigger_guy(bigger_guy(num1, num2), num3)

print(biggest_guy(57,74,82))
print(biggest_guy(98,87,82))
print(biggest_guy(57,78,67))


def choice_to_number(choice):
  return {'Usain': 1, 'Me': 2, 'Qazi': 3}[choice]

def number_to_choice(number):
  return {1: 'Usain', 2: 'Me', 3: 'Qazi'}[number]


print(choice_to_number('Me'))
print(number_to_choice(1))

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

squared_numbers = []

for number in numbers:
  squared_numbers.append(number ** 2)

print(squared_numbers)


numbers = [1, 5, 2, 6, 3, 28, 27, 54, 3]  # ==> 129

result = 0

for number in numbers:
  result = result + number

print(result)
