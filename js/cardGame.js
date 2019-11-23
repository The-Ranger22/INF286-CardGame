/*
//TODO: Scoring System
//TODO: Highlight selected card
 */
/** This is the array that contains the main deck (52)*/
var deck=[
    'AC','2C','3C','4C','5C','6C','7C','8C','9C','10C','JC','QC','KC',
    'AD','2D','3D','4D','5D','6D','7D','8D','9D','10D','JD','QD','KD',
    'AH','2H','3H','4H','5H','6H','7H','8H','9H','10H','JH','QH','KH',
    'AS','2S','3S','4S','5S','6S','7S','8S','9S','10S','JS','QS','KS'];
/** The two decks containing a subset of X cards */
var deck1=[];
var deck2=[];
/** The arrays that contain the cards that have been matched */
var deckMatched=[];
/** Variables that contain the value of the card picked from each deck. */
var deck1flipped='';
var deck2flipped='';
/** Variables that identify the 2 divs for the decks */
var deck1div=document.getElementById('deck1');
var deck2div=document.getElementById('deck2');
/** Time keeping */
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer;



/**
 * Initialize a new game
 */
function startGame(){
    /** Start timer */

    /** Get the difficulty of the game (affects how many cards are displayed) */
    var element=document.getElementById('difficulty');
    var value=element.options[element.selectedIndex].value;
    console.log(value);

    /** Initialize the board */
    initializeBoard();
    /** Shuffle the deck*/
    deck=shuffle(deck);
    /** Populate the 2 decks */
    for(i=0;i<value;i++){
        deck1.push(deck[i]);
        deck2.push(deck[i]);
    }
    console.log(deck1);
    console.log(deck2);
    /** Shuffle deck2 */
    shuffle(deck2);

    for(i=0;i<value;i++){
        /** Create the image elements */
        card1='<div class="col-3 mb-2 text-center border"><img class="card" data-card="' +deck1[i] +'" src="img/red_back.png" style="width:100%" /></div>';
        card2='<div class="col-3 mb-2 text-center border"><img class="card" data-card="' +deck2[i] +'" src="img/yellow_back.png" style="width:100%" /></div>';
        /** Add images to the 2 decks */
        deck1div.innerHTML+=card1;
        deck2div.innerHTML+=card2;
    }
}
function initializeBoard(){
    stopTimer();
    resetTimer();
    /** Clear the content of the divs that gold the 2 decks*/
    deck1div.innerHTML='';
    deck2div.innerHTML='';
    /** Clear the content of the 2 decks */
    deck1=[];
    deck2=[];
    /** Clear the cards that have been matched */
    deckMatched=[];
    /** Clear the variables that contain the cards that have been flipped */
    deck1flipped='';
    deck2flipped='';

    startTimer();
}

/** When the user clicks on deck1 */
deck1div.addEventListener('click',function(event){
    /** If the user clicks outside a card, don't do anything */
    if(event.target.getAttribute('data-card')==undefined) return;
    /** Checks if card has been matched already */
    if(deckMatched.includes(event.target.getAttribute('data-card'))){return;}
    /** get the value of the card and set it to flipped */
    deck1flipped=event.target.getAttribute('data-card');
    console.log("deck1flipped - "+deck1flipped);
    console.log("deck2flipped - "+deck2flipped);
    /** Flip all the cards */
    flipUnmatchedCards('deck1','red_back');
    /** Flip the selected cards */
    event.target.src='img/'+event.target.getAttribute('data-card')+'.png';

    if(deck2flipped.length>0){
        compareCards(event.target.getAttribute('data-card'));
    }
    console.log(event.target.getAttribute('data-card'));
});
/** When the user clicks on deck2 */
deck2div.addEventListener('click',function(event){
    /** If the user clicks outside a card, don't do anything */
    if(event.target.getAttribute('data-card')==undefined) return;
    /** Checks if card has been matched already */
    if(deckMatched.includes(event.target.getAttribute('data-card'))){return;}
    /** get the value of the card and set it to flipped */
    deck2flipped=event.target.getAttribute('data-card');
    console.log("deck1flipped - "+deck1flipped);
    console.log("deck2flipped - "+deck2flipped);
    /** Flip all the cards */
    flipUnmatchedCards('deck2', 'yellow_back');
    /** Flip the selected cards */
    event.target.src='img/'+event.target.getAttribute('data-card')+'.png';
    if(deck1flipped.length>0){
        compareCards(event.target.getAttribute('data-card'));
    }
    console.log(event.target.getAttribute('data-card'));
});
function compareCards(cardVal){
    if(deck2flipped==deck1flipped){
        /** We have a match */
        /** add the cards into the matched array.*/
        deckMatched.push(cardVal);

        /** Clear the flipped cards*/
        deck1flipped='';
        deck2flipped='';
        console.log(deckMatched);
        checkEndgame();
    }else{
        //return; //Debug
        /**We don't have a match*/
        console.log("deck2div - not a match")
        setTimeout(function(){deck1flipped='';
            deck2flipped='';
            flipUnmatchedCards('deck1','red_back');
            flipUnmatchedCards('deck2','yellow_back');},500);
    }
}
function flipUnmatchedCards(deck,back=''){
    /**Select one of the two decks*/
    var deck=document.getElementById(deck);
    /** Select all the cards in the deck */
    var cards = deck.getElementsByClassName('card');
    var currentCard;
    /** Flip all the cards*/
    for(i=0;i<cards.length;i++){
        /**Get value of the card */
        currentCard=cards[i].getAttribute('data-card');
        /** Check if the card has been matched so that we don't flip it */
        if(deck=='deck1'){
            if(!deckMatched.includes(currentCard)) cards[i].src='img/'+back+'.png';
        }else{
            if(!deckMatched.includes(currentCard)) cards[i].src='img/'+back+'.png';
        }
    }
}
function shuffle(array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}
/** Check if the game is over */
function checkEndgame(){
    setTimeout(function(){
        if(deck1.length==deckMatched.length){
            stopTimer();
            alert('You won!')}}, 3000)}
function grayOutMatched(){}
//TODO: Show cards briefly at the start before flipping them down face
//TODO: Scoring System
//TODO: Highlight selected card
function highlightSelected(){}
/** Timer to show how long the player has taken */
function startTimer() {
    timer = setInterval(countTime, 1000);
} //Starts the timer
function countTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
} //Keeps track of the seconds
function stopTimer(){
    clearInterval(timer);
} //Stops the timer
function resetTimer(){
    totalSeconds = 0;
} //Resets the value of the timer to 0
function pad(val){
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
//TODO: Add matches per minute
//TODO: Gray out cards that have been matched