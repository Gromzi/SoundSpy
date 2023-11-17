import os
import numpy as np
import glob
import random
import shutil
import matplotlib.pyplot as plt
import IPython.display as display
import librosa
import librosa.display
import imageio
from pydub import AudioSegment
import sys
import time

start = time.time()


DURATION = 20.0
TARGET_SAMPLE_RATE = 22050
FILE = sys.argv[0]

file_test = r'recordings\recording_9 to 5.wav'


def convert(filename: str, from_format: str, to_format: str):
    raw_audio = AudioSegment.from_file(
        f"{filename}+{from_format}", format=from_format)
    raw_audio.export(f"{filename}+{to_format}", format=to_format)


if file_test[:-3] == 'mp3':
    convert(file_test, 'mp3', 'wav')
elif file_test[:-3] == 'm4a':
    convert(file_test, 'm4a', 'wav')
else:
    pass

y, sr = librosa.load(file_test)
y_resampled = librosa.resample(y, sr, TARGET_SAMPLE_RATE)
if librosa.get_duration(y=y, sr=sr) > DURATION:
    start_time = max(0, librosa.get_duration(y=y, sr=sr) / 2 - DURATION / 2)
    end_time = start_time + DURATION
    y = y[int(start_time * sr):int(end_time * sr)]
S = librosa.feature.melspectrogram(y=y, sr=sr)
S_DB = librosa.amplitude_to_db(S, ref=np.max)
plt.figure(figsize=(4, 3))
librosa.display.specshow(S_DB, sr=sr, hop_length=512)
plt.tick_params(left=False, right=False, labelleft=False,
                labelbottom=False, bottom=False)
plt.savefig("spectogram.png", bbox_inches='tight', pad_inches=0)

end = time.time()
print(end - start)
