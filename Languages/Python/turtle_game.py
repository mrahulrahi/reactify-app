import turtle
my_turtle = turtle.Turtle()
# square
def square(length , angle):
    for i in range(4):
        my_turtle.forward(length)
        my_turtle.left(angle)

for i in range(32):
    my_turtle.color("blue")
    square(100, 90)
    my_turtle.left(11)

for i in range(32):
    my_turtle.color("green")
    square(100, 90)
    my_turtle.left(11)    

for i in range(32):
    my_turtle.color("red")
    square(100, 90)
    my_turtle.left(11)   

for i in range(32):
    my_turtle.color("yellow")
    square(100, 90)
    my_turtle.left(11)   

    