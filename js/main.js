// start the game 
document.querySelector(".control-button span").onclick = function() {

    "use strict";

    let myName = document.querySelector(".name span");

    // enter your name to start 
    let yourName = prompt("What is your name ? ");

    if (yourName == null || yourName == "") {

        myName.innerHTML = "Unknown";
    } else {
        myName.innerHTML = yourName;
    }
    // remove control button 
    document.querySelector('.control-button').remove();
};
// set duration to flip 

let duration = 1000;

// select container of blocks 

let ContainerOfBlocks = document.querySelector(".memory-game-blocks");

// convert blocks to array 

let blocks = Array.from(ContainerOfBlocks.children);

// make range array 

let OrderRange = Array.from(Array(blocks.length).keys());

// SHUFFLE order range

shuffle(OrderRange);

blocks.forEach((block, index) => {
    // add css property to game block
    block.style.order = OrderRange[index];

    // rotate blocks with click
    block.addEventListener('click', function() {
        flippedBlock(block);
    });
});

// flippedBlock function 
function flippedBlock(selectedBlock) {
    // add class flipped to selected block 
    selectedBlock.classList.add('is-flipped');

    // cllect all flipped cards
    let allFlippedBlocks = blocks.filter(flippblock => flippblock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {

        // stopClicking function 
        stopClicking();

        // check matched function 
        checkMatched(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// stop clicking function 
function stopClicking() {

    // add class no clicking
    ContainerOfBlocks.classList.add('no-clicking');

    // set duration 

    setTimeout(() => {
        ContainerOfBlocks.classList.remove('no-clicking');

    }, duration);

}

// check matched function 

function checkMatched(firstblock, secondblock) {


    if (firstblock.dataset.imgs === secondblock.dataset.imgs) {
        // remove class is-flipped
        firstblock.classList.remove('is-flipped');
        secondblock.classList.remove('is-flipped');

        // add class has-matched
        firstblock.classList.add('has-matched');
        secondblock.classList.add('has-matched');

        document.getElementById('right').play();
    } else {
        // number of wrong tries 
        let triesElement = document.querySelector(".tries span");
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstblock.classList.remove('is-flipped');
            secondblock.classList.remove('is-flipped');

        }, duration);

        document.getElementById('wrong').play();
    }
}

// shuffle function 

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;

        //save currunt element 

        temp = array[current];

        // Current Element = Random Element

        array[current] = array[random];

        // Random Element = Element From Stash

        array[random] = temp;

    }
    return array;
}