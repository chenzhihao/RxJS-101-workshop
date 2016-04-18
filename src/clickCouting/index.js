import Rx from 'rx';
import $ from 'jquery';

export default function main() {
  $('#app').html(`
      <div>
        <button id="btn">button</button>
        <div id="text"></div>
      </div>`);


  var button = document.querySelector('#btn');
  var clickStream = Rx.Observable.fromEvent(button, 'click');

  var countedClickStream = clickStream.buffer(clickStream.debounce(400))
    .map(function (list) {
      return list.length;
    });

  const multipleClickStream = countedClickStream.filter(x => {
    return x >= 2;
  });

  const singleClickStream = countedClickStream.filter(x => {
    return x === 1;
  });

  multipleClickStream.subscribe(times => $('#text').html(`<div style="color:red">${times} times clicked</div>`));
  singleClickStream.subscribe(times => $('#text').text(`${times} time clicked`));


 Rx.Observable.merge(multipleClickStream, singleClickStream).debounce(200).delay(1000).subscribe(()=> {
    $('#text').text('');
  });
};

