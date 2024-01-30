# SoundSet
**SoundSet** (I changed the name after creating the repo ;)) is a Shazam-inspired cross-platform application that predicts genres based on a recording or an uploaded file. It will be available on Android and web (and maybe iOS if I ever buy a MAC).
I was responsible for writing the frontend of this app. I used the new **Expo Router** for routing, **React Hook Form** for handling forms and validation and **Zustand** for state management.

## App functionality
The app allows the user to record the audio or send an audio file. The file is then send to the backend, which runs an ML script with a trained model. The predicted results are sent back to the app, and are displayed in a modal. The app saves the prediction result to the "history" view. The data is saved locally (or on the server, if the user decides to create an account). If the user has an account, they can modify their username and avatar image. 

## Link to site
Web - https://soundset.webitup.pl/

The Android version wasn't published to the app store. If you want to test it out, you'll have to clone the repo, then run `npm i` and `npm start`. Scan the QR code in the console using the **Expo Go** app. You can try running the iOS version, but I'm like 90% sure it won't work ;)

## Frontend Tech Stack
- React Native + Expo
- Typescript
- Expo Router
- React Hook Form
- Zustand

## A few screenshots of the app
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/82f3fa54-67cb-4071-ba0b-eb8fe0371000" alt="screen1" width="300" /> 
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/1b9b5357-f92a-4d22-b834-0211d0588bf3" alt="screen2" width="300" /> 
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/1184e734-c016-422f-8dd9-495104bd8f09" alt="screen3" width="300" /> 
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/66904d92-7390-45d1-b53c-0993e12852c0" alt="screen12" width="300" />
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/6480da22-4c51-4512-9f3c-4a8c20a85f5c" alt="screen14" width="300" />
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/c491785b-475b-4c5e-9ed3-f931443ed869" alt="screen4" width="300" /> 
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/71c16c76-c23b-4772-85a7-74f55c30f1ed" alt="screen5" width="300" /> 
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/0c73d83c-0632-42f0-aa08-f8cb0d348542" alt="screen9" width="300" />
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/ec0c225f-d3a5-4fce-a6c6-55b07fbf013d" alt="screen10" width="300" />
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/470606ab-609b-458d-bbd2-56a6665abdfe" alt="screen11" width="300" />
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/f414e27d-4e85-437d-84ca-ceb6b3d418e8" alt="screen13" width="300" />
<img src="https://github.com/Gromzi/SoundSpy/assets/54584700/288743fa-c31c-4c3e-bb88-c6543b504ad0" alt="screen15" width="300" />
