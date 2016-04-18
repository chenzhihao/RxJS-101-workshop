import fetch from 'isomorphic-fetch';

import clickTimeCounting from './clickCouting/index';
clickTimeCounting();

import observable from './observable/index';
observable();
//
//
// let mockedResponse = function () {
//   let time = 0;
//   return delay=> {
//     return new Promise(function (resolve) {
//       setTimeout(()=>resolve(delay), delay);
//     });
//   };
// };
//
// mockedResponse = mockedResponse();
//
// // let clickButtonStream = Rx.Observable.fromEvent($('#start'), 'click').startWith('yo');
// let clickButtonStream = Rx.Observable.fromEvent($('#start'), 'click');
//
//
// // clickButtonStream = clickButtonStream.flatMap(()=> {
// //   let offset = Math.floor(Math.random() * 500);
// //   return Rx.Observable.just(`https://api.github.com/users?since=${offset}`);
// // }).flatMap(requestUrl=>fetch(requestUrl).then(res=>res.json())).subscribe(
// //   next => {
// //     console.log(next);
// //     $('body').append(next.toString());
// //   }
// // );
//

