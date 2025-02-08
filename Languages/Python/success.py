import turtle

def draw_circle(turtle, color, size, x, y):
  turtle.penup()
  turtle.color(color)
  turtle.fillcolor(color)
  turtle.goto(x,y)
  turtle.pendown()
  turtle.begin_fill()
  turtle.circle(size)
  turtle.end_fill()
# Create a turtle named Tommy:
tommy = turtle.Turtle()
tommy.shape("turtle")
tommy.speed(7)

# Draw three circles:
draw_circle(tommy, "green", 50, 0, 0)

# Write a little message:
tommy.penup()
tommy.goto(0,-50)
tommy.color("green")
tommy.write("Correct, great job!", None, "center", "16pt bold")
tommy.goto(0,-80)