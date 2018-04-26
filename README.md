# Adventurer Simulator
#### An incremental & idle mobile game developed for Android.

This project is written using the react-native framework.

## Running

To run on Android:
---
You'll need an Adnroid emulator running, or a device in developer mode connected to your computer.

Change the sdk.dir location to your SDK location found in `./android/local.properties`

```
npm install
react-native run-android
```

To run on iOS (untested):
---
iOS is also supported by react-native, but will not be tested as development continues.
```
npm install
react-native run-ios
```

## Building (Unsigned)

If you want to skip the dev setup, you can run
```
build-unsigned.sh
```
from terminal, to build an .apk.

Unsigned builds can be made from windows by following the same commands except using:
```
gradlew assembleRelease
```
in the android directory.