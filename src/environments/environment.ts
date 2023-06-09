// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyBmg_k9y0V4yuksJcjc08rkWDJz-Bmdy6U",
    authDomain: "fir-course-4cf83.firebaseapp.com",
    projectId: "fir-course-4cf83",
    storageBucket: "fir-course-4cf83.appspot.com",
    messagingSenderId: "957845199440",
    appId: "1:957845199440:web:cf5662b94e9c3f196b8f55"
  },
  api: {

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
