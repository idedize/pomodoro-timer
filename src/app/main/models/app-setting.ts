export class AppPreferences {
    static secondsInMinute: number = 60;

    pomodoro: number = 25 * AppPreferences.secondsInMinute;
    short: number = 5 * AppPreferences.secondsInMinute;
    long: number = 15 * AppPreferences.secondsInMinute;
}