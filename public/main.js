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
    list.add(generateElement(items[i]));
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
      } else if (parentElement.className.includes('delete-task')){
        parentGrid.remove([item], {removeElements: true});
      } else {
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

function setPlusListener() {
  $('.plus').click(function(e){
     // add an item to the Someday column
     addItemsToList(columnGrids[2], ["seven"]);
  });
}

$(document).ready(function() {
  activateLists();
  //  first add the TODAY items
  addItemsToList(columnGrids[0], ["one", "two", "three"]);
  //  now add the SOMEDAY items
  addItemsToList(columnGrids[2], ["four", "five", "six"]);
  setPlusListener();
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
