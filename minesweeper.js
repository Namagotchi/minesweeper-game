document.addEventListener('DOMContentLoaded', () => 
{
    var size = 10
    var flags = 0
    var bombNum = 10
    var squares = []
    var isLost = false
    var grid = document.querySelector('.minefield')
    var flagsRemaining = document.querySelector('#remainingFlags')
    var result = document.querySelector('#result')

    function refreshPage()
    {
        window.location.reload();
    }
    var sec = 0;
    function pad(val) 
    { 
        return val > 9 ? val : "0" + val; 
    }
    setInterval(function()
    {
        document.getElementById("seconds").innerHTML=pad(++sec%60);
        document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    }, 1000);
    
    
    function createMinefield() 
    {
        flagsRemaining.innerHTML = bombNum
    
        var bombArray = Array(bombNum).fill('bomb')
        var emptyArray = Array(size*size-bombNum).fill('valid')
        var gameArray = emptyArray.concat(bombArray)
        var shuffledArray = gameArray.sort(()=>Math.random()-0.5)
    
        for(let x = 0; x<size*size; x++) 
        {
            const square = document.createElement('div')
            square.setAttribute('id', x)
            grid.appendChild(square)
            squares.push(square)
            square.classList.add(shuffledArray[x])
        
    
    //For left clicking, or normal clicking
    square.addEventListener('click', function(e)
    {
        click(square)
    }
    )
    
    //For right clicking (adding the flag)
    square.oncontextmenu = function(e) 
        {
             e.preventDefault()
                addFlag(square)
        }
    }

    function changeSmiley()
    {
        document.getElementById("smiley");
    }

    document.getElementById("gameStart").addEventListener("click", function(){
        var timeleft = 0;
    
        var downloadTimer = setInterval(function function1(){
        document.getElementById("countUp").innerHTML = timeleft + "&nbsp";
    
        timeleft += 1;
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countUp").innerHTML = "You took too long."
        }
        }, 1000);
    
        console.log(countUp);
    });
    
    for (let i = 0; i<squares.length; i++) 
    {
        const leftBorder = (i % size === 0)
        const rightBorder = (i % size === size-1)
        var total = 0
    
    if (squares[i].classList.contains('valid')) 
    {
        if (i > 0 && !leftBorder && squares[i -1].classList.contains('bomb')) 
        total++
        if (i > 9 && !rightBorder && squares[i +1 -size].classList.contains('bomb')) 
        total++
        if (i > 15 && squares[i -size].classList.contains('bomb')) 
        total ++
        if (i > 18 && !leftBorder && squares[i -1 -size].classList.contains('bomb')) 
        total++
        if (i < 99 && !rightBorder && squares[i +1].classList.contains('bomb')) 
        total++
        if (i < 92 && !leftBorder && squares[i -1 +size].classList.contains('bomb')) 
        total++
        if (i < 84 && !rightBorder && squares[i +1 +size].classList.contains('bomb')) 
        total++
        if (i < 87 && squares[i +size].classList.contains('bomb')) 
        total++
        squares[i].setAttribute('data', total)
    }
    }
 }
    createMinefield()
    
    function addFlag(square) 
    {
        if (isLost) 
        return

        if (!square.classList.contains('checked') && (flags<bombNum)) 
        {
            if (!square.classList.contains('flag')) 
        {
            square.classList.add('flag')
            square.innerHTML = '🚩'
            flags++
            flagsRemaining.innerHTML = bombNum-flags
            checkForWin()
        } 
        else 
        {
            square.classList.remove('flag')
            square.innerHTML=''
            flags--
            flagsRemaining.innerHTML = bombNum-flags
    }
    }
    }
    
    function click(square) {
    let currentId = square.id
    if (isLost) 
        return
    if (square.classList.contains('checked') || square.classList.contains('flag')) 
        return
    if (square.classList.contains('bomb')) 
    {
        checkForLose(square)
    } 
    else 
    {
        let total = square.getAttribute('data')
        if (total !=0) 
        {
            square.classList.add('checked')
            if (total == 1) 
                square.classList.add('one')
            if (total == 2) 
                square.classList.add('two')
            if (total == 3) 
                square.classList.add('three')
            if (total == 4) 
                square.classList.add('four')
            square.innerHTML = total
            return
    }
    checkSquare(square, currentId)
    }
    square.classList.add('checked')
    }
    
    
    function checkSquare(square, currentId) 
    {
    var leftBorder = (currentId % size === 0)
    var rightBorder = (currentId % size === size-1)
    
    setTimeout(() => 
    {
        if (currentId > 0 && !leftBorder) 
        {
            const newId = squares[parseInt(currentId) -1].id
            const newSquare = document.getElementById(newId)
            click(newSquare)
        }
    if (currentId > 8 && !rightBorder) 
    {
        const newId = squares[parseInt(currentId) +1 -size].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
    }
    if (currentId > 10) 
    {
        const newId = squares[parseInt(currentId -size)].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
    }
    if (currentId > 12 && !leftBorder) 
    {
        const newId = squares[parseInt(currentId) -1 -size].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
    }
    if (currentId < 98 && !rightBorder) 
    {
        const newId = squares[parseInt(currentId) +1].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
    }
    if (currentId < 90 && !leftBorder)
    {
        const newId = squares[parseInt(currentId) -1 +size].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
    }
    if (currentId < 88 && !rightBorder)
    {
        const newId = squares[parseInt(currentId) +1 +size].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
    }
    if (currentId < 100) 
    {
        const newId = squares[parseInt(currentId) +size].id
        const newSquare = document.getElementById(newId)
        click(newSquare)
    }
    }, 10)
    }
    
    function checkForLose(square) 
    {
        result.innerHTML = 'You have lost the game. Please refresh.'
        isLost= true
        window.stop();
    
        squares.forEach(square => 
            {
                if (square.classList.contains('bomb')) //if the square has a bomb
                {
                    square.innerHTML = '💥'
                    square.classList.remove('bomb')
                    square.classList.add('checked')
            }
        })
    }
    
    function checkForWin() 
    {
        let match = 0
        for (let x = 0; x<squares.length; x++) 
        {
            if (squares[x].classList.contains('flag') && squares[x].classList.contains('bomb')) {
            match++
        }
    if (match == bombNum) 
    {
        result.innerHTML = 'You have won Minesweeper!'
        isLost = true
    }
    }
    }
    })

    function refreshPage()
    {
        window.location.reload();
    }
