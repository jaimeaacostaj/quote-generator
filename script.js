const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote(){
    showLoadingSpinner();
    const apiUrl = 'https://calixe.calixe.com/includes/test/index.php';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === ''){
            authorText.innerText = "Unknown";    
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');    
        }else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
        throw new Error('oops');

    } catch(error){
        getQuote();
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
//loading();