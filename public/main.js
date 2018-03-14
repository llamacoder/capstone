// Note the construction below - converts the NodeList returned
// from querySelectorAll to an array.  NodeList does not have
// all the methods that Array has...
var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
var columnGrids = [];
var boardGrid;

function generateElement(itemText) {
    var itemElem = document.createElement('div');
    var htmlString = '<div class="board-item">' + `<div class="board-item-content">${itemText}</div>` + '</div>';
    itemElem.innerHTML = htmlString;
    return itemElem.firstChild;
  }

function addItemsToList(list, items) {
  for (let i = 0; i < items.length; i++) {
    list.add(generateElement(items[i]), {index: 0});
  }
}

function activateLists() {

  // Define the column grids so we can drag those
  // items around.
  itemContainers.forEach(function(container) {

    // Instantiate column grid.
    var grid = new Muuri(container, {
      items: '.board-item',
      layoutDuration: 400,
      layoutEasing: 'ease',
      dragEnabled: true,
      dragSort: function() {
        return columnGrids;
      },
      dragSortInterval: 0,
      dragContainer: document.body,
      dragReleaseDuration: 400,
      dragReleaseEasing: 'ease'
    }).on('dragStart', function(item) {
      // Let's set fixed widht/height to the dragged item
      // so that it does not stretch unwillingly when
      // it's appended to the document body for the
      // duration of the drag.
      item.getElement().style.width = item.getWidth() + 'px';
      item.getElement().style.height = item.getHeight() + 'px';
    }).on('dragReleaseEnd', function(item) {
      let parentGrid = item.getGrid();
      let parentElement = parentGrid.getElement();
      if (parentElement.className.includes('task-finished')) {
        parentGrid.remove([item], {removeElements: true});
        updateBGAfterSuccess();
      } else if (parentElement.className.includes('delete-task')){
        parentGrid.remove([item], {removeElements: true});
      } else {
        clearBG();
        // Parent grid is today or someday, so
        // let's remove the fixed width/height from the
        // dragged item now that it is back in a grid
        // column and can freely adjust to it's
        // surroundings.
        item.getElement().style.width = '';
        item.getElement().style.height = '';
        // Just in case, let's refresh the dimensions of all items
        // in case dragging the item caused some other items to
        // be different size.
        columnGrids.forEach(function(grid) {
          grid.refreshItems();
        });
      }
    }).on('layoutStart', function() {
      // Let's keep the board grid up to date with the
      // dimensions changes of column grids.
      boardGrid.refreshItems().layout();
    });

    // Add the column grid reference to the column grids
    // array, so we can access it later on.
    columnGrids.push(grid);

  });

  // Instantiate the board grid so we can drag those
  // columns around.
  boardGrid = new Muuri('.board', {
    layoutDuration: 400,
    layoutEasing: 'ease',
    dragEnabled: false,
    dragSortInterval: 0,
    dragStartPredicate: {
      handle: '.board-column-header'
    },
    dragReleaseDuration: 400,
    dragReleaseEasing: 'ease'
  });
}

function updateBGAfterSuccess() {
  let list = columnGrids[0];
  let numChildren = list.getElement().childElementCount;
  if (numChildren === 0) {
    let num = Math.floor((Math.random() * 10) + 1);
    $('#excite-image').attr('src', `./images/goodjob${num}.jpeg`);
    $('#modalExcitement').modal('open');
  }
}

function clearBG() {
  let list = columnGrids[0];
    let ele = list.getElement();
    ele.style.backgroundImage = '';
}

function setupListeners() {
  $('.save-btn').click(handleSaveClick)
  $('.cancel-btn').click(handleCancelClick)
  $('.plus').click(handleNewClick);
  $('.trello-btn').click(handleTrelloClick);
}

function handleNewClick(event) {
  $('#task').val('')
  $('#modal1').modal('open');
}

function handleCancelClick(event) {
  $('#modal1').modal('close');
}

function handleSaveClick(event) {
  let newTask = $('#task').val();
  if (newTask) {
    let arr = [];
    arr.unshift(newTask);
    addItemsToList(columnGrids[2], arr);
  }
  $('#modal1').modal('close');
}

function handleTrelloClick(event) {
  alert("Coming Soon!");
}


$(document).ready(function() {
  activateLists();
  //  first add the TODAY items
  addItemsToList(columnGrids[0], ["one", "two", "three"]);
  //  now add the SOMEDAY items
  addItemsToList(columnGrids[2], ["four", "five", "six"]);
  setupListeners();
  $('.modal').modal();
})

var TODAY_ITEMS = [
  {
    itemText: "Take out the trash",
    listPriority: 0,
    itemID: 545
  }, {
    itemText: "Finish capstone",
    listPriority: 1,
    itemID: 543
  }, {
    itemText: "Pay the bills",
    listPriority: 2,
    itemID: 549
  }
]
var SOMEDAY_ITEMS = [
  {
    itemText: "Wash the dog",
    listPriority: 0,
    itemID: 5454
  }, {
    itemText: "Wash the cat before the dog gets a rash and gets in the garbage",
    listPriority: 1,
    itemID: 5464
  }, {
    itemText: "Wash the horse",
    listPriority: 2,
    itemID: 5456
  }
]





var pieces = 70,
    speed = 1,
    pieceW = 30,
    pieceH = 30;


for (var i = pieces - 1; i >= 0; i--) {
  $('#popup').prepend('<div class="piece" style="width:'+pieceW+'px; height:'+pieceH+'px"></div>');
};

function breakGlass(from){
  if (from === "reverse"){
    $('.piece').each(function(){
      TweenLite.to($(this), speed, {x:0, y:0, rotationX:0, rotationY:0, opacity: 1, z: 0});
      TweenLite.to($('#popup h1'),0.2,{opacity:1, delay: speed});
    });
    return;
  }

  if(!from){
    TweenLite.to($('#popup h1'),0.2,{opacity:0});
  } else {
    TweenLite.from($('#popup h1'),0.5,{opacity:0, delay: speed});
  }

  $('.piece').each(function(){
    var distX = getRandomArbitrary(-250, 250),
        distY = getRandomArbitrary(-250, 250),
        rotY  = getRandomArbitrary(-720, 720),
        rotX  = getRandomArbitrary(-720, 720),
        z = getRandomArbitrary(-500, 500);

    if(!from){
      TweenLite.to($(this), speed, {x:distX, y:distY, rotationX:rotX, rotationY:rotY, opacity: 0, z: z});
    } else {
      TweenLite.from($(this), speed, {x:distX, y:distY, rotationX:rotX, rotationY:rotY, opacity: 0, z: z});
    }
  });
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


$('.piece, h1').click(function(){
  breakGlass();
});
$('.reverse').click(function(){
  breakGlass('reverse');
});

breakGlass(true);
