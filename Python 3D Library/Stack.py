import urllib
import scipy.io.wavfile
import pydub
import numpy as np


#read wav file
rate,audData=scipy.io.wavfile.read(r"C:\Users\Null\Documents\GitHub\CS30\Python 3D Library\ShootingStars.wav")

print(rate)
print(audData)

#if stereo grab both channels
channel1=audData[:,0] #left

