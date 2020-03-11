# photoeditordemo
Steps to install:
--In the command prompt/terminal:
1- Run 'Yarn install' in project directory

2- Run 'cd ios && pod install', using cocoapods 

3- Run 'pod update'

4- cd .. back to project directory 

5- Run 'react-native link'

6- Run 'react-native link react-native-photoeditorsdk'

# To test in development mode:
1- Make sure you have expo-cli installed globbaly with running 'Yarn global add expo-cli' in the command prompt/terminal
2- Run 'expo start' in project directory, this will start the metro bundler to serve the JS code
3- Open the android folder in the project's directory in android studio and run the project in an emulator or a connected phone
# To build the .apk:
1- Run 'expo publish' in the command prompt/terminal, make sure you have an expo account so that the JS code can be served to the release built .apk
2- Open the 'Build" option in the App menu bar at the top for Android studio
3- Choose 'Generate Signed Bundle/Apk'
4- Choose 'APK'
5- Choose a signed certificate/keystore file to sign the .apk, press next
6- Choose 'release' for Build Variants and choose 'V2 (Fill APK signature)' for Signature Versions
7- Press finish and android studio will begin building the .apk, after it's done the file will be in the android folder in:
../photoEditor_demo/android/app/release/app-release.apk 
8- Transfer the .apk to an android phone and install it
# if you don't have signing certificate expo can make one for you:
1- run 'expo credentials:manager' in the command prompt/terminal
2- Choose android
3- Answer Yes
4- Choose Update Upload Keystore
5- Choose 'Let expo handle the process', it will genereate an upload keystore for you.
6- Choose 'Go back to experince overview'
7- Choose 'Download keystore from the expo server', 
   it will download the .jks file in the project directory where you can choose it when generating a signed .apk.
8- Answer Yes, to display the Android Keystore credentials. which should show: Keystore password, Key alias, and Key password
Which can be enterd in Android studio when generating a signed APK

