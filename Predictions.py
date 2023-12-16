import torch
from torchvision import transforms as tt
from Klasy_Modeli import MusicGenrePretrainedDenseNet201
from PIL import Image
import json
import time
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
import uuid

start = time.time()

DURATION = 30.0
TARGET_SAMPLE_RATE = 22050
FILE = sys.argv[0]

file_test = r'song_tracks\classical.00063.wav'


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

spectrogram_name = str(uuid.uuid4())
plt.savefig(f"{spectrogram_name}.png", bbox_inches='tight', pad_inches=0)


transform = tt.Compose([
    tt.ToTensor()
])

top_n = 5

class_labels = {
    0: 'blues',
    1: 'classical',
    2: 'country',
    3: 'disco',
    4: 'hiphop',
    5: 'jazz',
    6: 'metal',
    7: 'pop',
    8: 'reggae',
    9: 'rock'
}

image_path = f'{spectrogram_name}.png'
input_image = Image.open(image_path)
image_check = transform(input_image)
image_rgb = input_image.convert("RGB")
input_data = transform(image_rgb).unsqueeze(0)

checkpoint = torch.load(r'models\best_DenseNet_201_checkpoint_best.pth')
model_state_dict = checkpoint['model_state_dict']
loaded_model = MusicGenrePretrainedDenseNet201()
loaded_model.load_state_dict(model_state_dict)
loaded_model.eval()


with torch.no_grad():
    predictions = loaded_model(input_data)
    probabilities = torch.nn.functional.softmax(predictions, dim=1)

    top_n_probabilities, top_n_indices = torch.topk(
        probabilities, top_n, dim=1)

    predictions_dict = {}

    for prob, idx in zip(top_n_probabilities[0], top_n_indices[0]):
        predicted_class_index = idx.item()
        predicted_class_label = class_labels[predicted_class_index]
        probability = prob.item()

        '{:f}'.format(probability)
        probability = probability * 100
        predictions_dict[predicted_class_label] = round(probability, 4)

    # Save predictions as JSON
    output_json_path = 'predictions.json'
    with open(output_json_path, 'w') as json_file:
        json.dump(predictions_dict, json_file)

    pretty_json = json.dumps(predictions_dict, indent=4)
    print(pretty_json)

end = time.time()
print("Total time:", end - start)
