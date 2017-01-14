module.exports = (index => {
  const colours = {
    1: '#9CFF9C',
    2: '#31FF00',
    3: '#31CF00',
    4: '#FFFF00',
    5: '#FFCF00',
    6: '#FF9A00',
    7: '#FF6464',
    8: '#FF0000',
    9: '#990000',
    10: '#CE30FF'
  }

  

  const createItem = (colours, position) => {
    let width = 75;
    if(position === 10) {
      width = width * 3;
    }

    let xOffset = 50;
    let y = 100;
    let barHeight = 25; 

    return {
      colour: {
        width: width,
        height: barHeight,
        x: xOffset + (75 * (position - 1)),
        y: y,
        type: 'rectangle',
        name: 'Scale item ' + position,
        fill: colours[position]
      },
      label: {
        type: 'text',
        text: position.toString(),
        x: xOffset + (75 * (position - 1)) + (width / 2),
        y: y + (barHeight + 5),
        fill: '#000000',
        fontSize: 20,
        textAnchor: 'middle',
        fontFamily: 'Helvetica'
      }
    };
  }

  let config = {
    // title: {
    //   name: 'Location',
    //   type: 'text',
    //   x: 30,
    //   y: 30,
    //   fill: '#333',
    //   text: 'Air Quality at London Teddington Bush Park',
    //   fontSize: 2,
    //   fontFamily: 'Helvetica',
    //   get lineHeight() {
    //     return this.fontSize * 1.2;
    //   },
    //   editable: {
    //     text: true
    //   }
    // },
  };

  let i = 1,
      items;
  while(i <= 10) {
    items = createItem(colours, i); 
    config = Object.assign({}, config, {['scale' + i]: items.colour}, {['label' + i]: items.label});

    i = i+1;
  }

  const triangleScale = 5;
  const triangleRotate = 180;
  const triangleTranslate = {
    x: 50 + ( 75 * ( index - 1 ) ) + parseInt(( 75 / 2 ).toFixed(0)),
    y: 75
  };

  console.log(`scale(${triangleScale}) rotate(${triangleRotate}) translate(${(triangleTranslate.x / triangleScale).toFixed(0) * -1} ${(triangleTranslate.y / triangleScale).toFixed(0) * -1})`);

  config.triangle = {
    type: 'path',
    name: 'Triangle',
    d: 'M0,-3.464l-4,6.928h8Z',
    fill: '#333',
    transform: `scale(${triangleScale}) rotate(${triangleRotate}) translate(${(triangleTranslate.x / triangleScale).toFixed(0) * -1} ${(triangleTranslate.y / triangleScale).toFixed(0) * -1})`
  }

  let locationTextAnchor = 'middle';
  let locationX = triangleTranslate.x;
  if(index <= 3) {
    locationTextAnchor = 'start';
    locationX = triangleTranslate.x - parseInt(( 75 / 2 ).toFixed(0));
  } else if(index >= 7) {
    locationTextAnchor = 'end';
    locationX = triangleTranslate.x + parseInt(( 75 / 2 ).toFixed(0));
  }

  config.location = {
    type: 'text',
    name: 'Location',
    text: 'London Teddington Bushy Park',
    x: locationX,
    y: triangleTranslate.y - 40,
    fontSize: 16,
    fill: '#333',
    textAnchor: locationTextAnchor
  }

  return config;
})(1);
