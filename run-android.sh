chmod 777 ./destroy-android-run.sh
./destroy-android-run.sh
react-native log-android &> log.out &
echo "kill -9" $! >| ./destroy-android-run.sh
react-native run-android &> runner.out &
echo "kill -9" $! >> ./destroy-android-run.sh
react-devtools