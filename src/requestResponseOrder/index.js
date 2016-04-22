import Rx from 'rx';
import $ from 'jquery';

export default function main() {
  $('#app').html(`
      <div>
        <button id="btn">button</button>
        <div id="text"></div>
        
        <pre>Request</pre>
        <div id="request">
        </div>
        
        <pre>Response</pre>
        <div id="response"></div>
      </div>`);

  function request(i) {
    return new Promise((resolve, reject)=> {
      $('#request').append(`<span>${i} -> </span>`);
      setTimeout(()=> {
        $('#response').append(`<span style="color: red">${i} -> </span>`);
        resolve(i);
      }, Math.random() * 3000);
    });
  }

  let button = document.querySelector('#btn');
  let clickStream = Rx.Observable.fromEvent(button, 'click');

  let i = 0;
  clickStream.map(e => {
    return request(++i);
  //  http://reactivex.io/documentation/operators/flatmap.html
  }).concatMap(res=>res).subscribe(res => {
    $('#text').html(`<div>${res}</div>`);
  });
};
