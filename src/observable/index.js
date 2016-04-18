import Rx from 'rx';
import $ from 'jquery';

export default function main() {
  $('#app').html(`
      <div>
        <div>static data, array [1,2,3,4]</div>
        <pre>Rx.Observable.range(1, 4)</pre>
        <button id="btn1">emit data</button> 
        <div id="text1"></div>
        <br>
      <div>
        <div>Time sequence, per 1000ms, take 5</div>
        <pre>Rx.Observable.timer(0, 1000)).take(5)</pre>
        <button id="btn2">emit data</button> 
        <div id="text2"></div>
      </div>
       <div>
        <div>from Promise</div>
        <pre> 
  var promise1 = new Promise(resolve => {
    setTimeout(()=> {
      resolve('100ms later');
    }, 100);
  });
  
  var promise2 = new Promise(resolve => {
    setTimeout(()=> {
      resolve('0ms later');
    }, 0);
  });
  
  Rx.Observable.from([promise1, promise2])
  </pre>
        <button id="btn3">emit data</button> 
        <div id="text3"></div>
      </div>
`);


  var button = document.querySelector('#btn1');
  var clickStream = Rx.Observable.fromEvent(button, 'click');

  clickStream.take(1).flatMap(()=> Rx.Observable.range(1, 4)).subscribe((i)=> {
    $('#text1').append(`--- ${i}`);
  }, null, ()=> {
    $('#text1').append('--- X ');
  });

  /* ================ */

  var button = document.querySelector('#btn2');
  var clickStream = Rx.Observable.fromEvent(button, 'click');

  clickStream.take(1).flatMap(()=> Rx.Observable.timer(0, 1000)).take(5).subscribe((i)=> {
    $('#text2').append(`--- ${i}`);
  }, null, ()=> {
    $('#text2').append('--- X');
  });

  /* ================ */

  var promise1 = new Promise(resolve => {
    setTimeout(()=> {
      resolve('100ms later');
    }, 100);
  });

  var promise2 = new Promise(resolve => {
    setTimeout(()=> {
      resolve('0ms later');
    }, 0);
  });

  // var promise3 = new Promise((resolve, reject) => {
  //   setTimeout(()=> {
  //     reject('error at 50ms later');
  //   }, 0);
  // });

  Rx.Observable.fromEvent($('#btn3'), 'click').take(1).flatMap(
    ()=> Rx.Observable.from([promise1,promise2]).flatMap(p=>p)
  ).subscribe((val)=> {
    $('#text3').append(`--- ${val} `);
  }, err=> {
    $('#text3').append(`<span style="color: red">--- ${err}</span>`);
  }, ()=> {
    $('#text3').append('--- X');
  });
};