import sys, pygame
import matplotlib.pyplot as plt
import numpy as np
import wave
import os
import playsound

pygame.init()
dir = os.path.abspath("ShootingStars.wav")
print(dir)
#playsound("F:\GitHub\CS30\Python 3D Library\ShootingStars.wav")
s = pygame.mixer.Sound("F:\GitHub\CS30\Python 3D Library\ShootingStars.wav")
s.play()
size = width, height = 640, 480
speed = [2, 2]
black = 255, 255, 255

screen = pygame.display.set_mode(size)

ball = pygame.image.load("ball.jpg")
ballrect = ball.get_rect()

while 1:
    for event in pygame.event.get():
        if event.type == pygame.QUIT: sys.exit()

    ballrect = ballrect.move(speed)
    if ballrect.left < 0 or ballrect.right > width + 100:
        speed[0] = -speed[0]
    if ballrect.top < 0 or ballrect.bottom > height + 100:
        speed[1] = -speed[1]

    screen.fill(black)
    screen.blit(ball, ballrect)
    pygame.display.flip()
