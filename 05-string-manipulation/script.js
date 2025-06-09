document.addEventListener('DOMContentLoaded' , () =>{
    const textAreaElement  = document.querySelector('#inputStr')
    const operationsElement = document.querySelector('#operations')
    const buttonElement = document.querySelector('#find')
    const outputElement = document.getElementById('output')

    // Add input event listener for real-time character count
    textAreaElement.addEventListener('input' , () =>{
        const charCount = textAreaElement.value.length;
        const feedback = document.getElementById('charCount') || createElement('charCount');
        feedback.textContent = `Characters: ${charCount}`;
    })

    // Create and append elements
    function createElement(id) {
        const element = document.createElement('div');
        element.id = id;
        element.className = 'feedback-text';
        textAreaElement.parentNode.insertBefore(element, textAreaElement.nextSibling);
        return element;
    }

    // Add transition class when operation changes
    operationsElement.addEventListener('change' , () =>{
        outputElement.classList.add('fade-out');
        setTimeout(() => {
            outputElement.innerHTML = '<p class="placeholder-text">Result will appear here...</p>';
            outputElement.classList.remove('fade-out');
        } , 300);
    })

    buttonElement.addEventListener('click' , () =>{
        const textArea = textAreaElement.value.trim();
        const operations = operationsElement.value.trim()
        
        // Add loading state
        buttonElement.disabled = true;
        buttonElement.innerHTML = '<span class="loading-spinner"></span>';
        
        setTimeout(() => {
            validateText(textArea , operations );
            buttonElement.disabled = false;
            buttonElement.textContent = 'Process';
        } , 500);
    })

    const validateText = (textArea , operations) =>{
        if(!textArea){
            showError('Please enter some text to process');
            return;
        }else if(operations === ""){
            showError('Please select an operation');
            return;
        }else{
            getOperation(operations , textArea);
        }
    }

    const showError = (message) => {
        outputElement.innerHTML = `
            <div class="error-message">
                <span class="error-icon">⚠️</span>
                <p>${message}</p>
            </div>
        `;
        outputElement.classList.add('shake');
        setTimeout(() => outputElement.classList.remove('shake') , 500);
    }

    const getOperation = (operations , textArea )=> {
        switch (operations) {
            case 'palindrome':
                findPalindrome(textArea);
                break;
            case 'vowelCount':
                countVowels(textArea);
                break;
            case 'revStr':
                reverseString(textArea);
                break;
            case 'length':
                findLength(textArea);
                break;
            case 'findstr':
                findWord(textArea);
                break;
            case 'reverseSentence':
                reverseSentence(textArea);
                break;
            case 'caseConvert':
                showCaseOptions(textArea);
                break;
            case 'removeSpaces':
                removeExtraSpaces(textArea);
                break;
            case 'charFreq':
                characterFrequency(textArea);
                break;
            case 'wordFreq':
                wordFrequency(textArea);
                break;
            case 'textStats':
                textStatistics(textArea);
                break;
            default:
                alert('Unknown operation');
        }
    }

    const findPalindrome = (textArea) => {
        let reversed = textArea.split('').reverse().join('');
        if (reversed === textArea) {
            display(`
                <div class="success-result">
                    <span class="result-icon">✨</span>
                    <h3>It's a Palindrome!</h3>
                    <div class="result-details">
                        <p>Original text: <span class="highlight">${textArea}</span></p>
                        <p>Reversed text: <span class="highlight">${reversed}</span></p>
                    </div>
                </div>
            `);
        } else {
            display(`
                <div class="error-result">
                    <span class="result-icon">❌</span>
                    <h3>Not a Palindrome</h3>
                    <div class="result-details">
                        <p>Original text: <span class="highlight">${textArea}</span></p>
                        <p>Reversed text: <span class="muted">${reversed}</span></p>
                    </div>
                </div>
            `);
        }
    };

    const countVowels = (textArea) => {
    let count = 0;
    let textIndex = [];
    const lowerCaseStr = textArea.toLowerCase();
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    for (let i = 0; i < textArea.length; i++) {
        if (vowels.includes(lowerCaseStr[i])) {
            textIndex.push(i);
            count++;
        }
    }

    if (count !== 0) {
        vowelsFormatter(count, textIndex, textArea);
    } else {
        vowelsFormatter(count);
    }
};


const reverseSentence = (textArea) => {
    let reverseArr = textArea.split(' ');
    let left = 0;
    let right = reverseArr.length - 1;
    while (left < right) {
        [reverseArr[left], reverseArr[right]] = [reverseArr[right], reverseArr[left]];
        left += 1;
        right -= 1;
    }
    display(`
        <div class="success-result">
            <span class="result-icon">🔄</span>
            <h3>Sentence Reversed!</h3>
            <div class="result-details">
                <p>Original: <span class="highlight">${textArea}</span></p>
                <p>Reversed: <span class="highlight">${reverseArr.join(' ')}</span></p>
            </div>
        </div>
    `);
};
const reverseString = (textArea) => {
    const reversed = textArea.split('').reverse().join('');
    display(`
        <div class="success-result">
            <span class="result-icon">🔄</span>
            <h3>Text Reversed!</h3>
            <div class="result-details">
                <p>Original: <span class="highlight">${textArea}</span></p>
                <p>Reversed: <span class="highlight">${reversed}</span></p>
            </div>
        </div>
    `);
};

const findLength = (textArea) => {
    display(`
        <div class="success-result">
            <span class="result-icon">📏</span>
            <h3>Text Length</h3>
            <div class="result-details">
                <p>Characters: <span class="highlight">${textArea.length}</span></p>
                <p>Words: <span class="highlight">${textArea.trim().split(/\s+/).length}</span></p>
            </div>
        </div>
    `);
};

const findWord = (textArea) => {
    const word = prompt('Enter word to find:');
    if (!word) return;
    
    const index = textArea.indexOf(word);
    if (index !== -1) {
        const highlightedText = textArea.replace(
            new RegExp(word, 'g'),
            `<span class="search-highlight">${word}</span>`
        );
        display(`
            <div class="success-result">
                <span class="result-icon">🔍</span>
                <h3>Word Found!</h3>
                <div class="result-details">
                    <p>First occurrence at index: <span class="highlight">${index}</span></p>
                    <div class="formatted-text">${highlightedText}</div>
                </div>
            </div>
        `);
    } else {
        display(`
            <div class="error-result">
                <span class="result-icon">🚫</span>
                <h3>Word Not Found</h3>
                <p>The word "${word}" was not found in the text.</p>
            </div>
        `);
    }
};
const vowelsFormatter = (count , textIndex , textArea) =>{
    if(count>0){
        let result ='';
        for(let i = 0 ; i < textArea.length ; i++){
            if(textIndex.includes(i)){
                result += `<span class="vowel-highlight">${textArea[i]}</span>`;
            }else{
                result += textArea[i];
            }
        }
        display(`
            <div class="success-result">
                <span class="result-icon">🎯</span>
                <h3>Vowels Found!</h3>
                <div class="result-details">
                    <p>Total vowels: <span class="highlight">${count}</span></p>
                    <div class="formatted-text">${result}</div>
                </div>
            </div>
        `);
    } else {
        display(false);
    }
}

const display = (content) => {
    outputElement.classList.add('fade-out');
    
    setTimeout(() => {
        if (content === false) {
            outputElement.innerHTML = `
                <div class="error-result">
                    <span class="result-icon">😔</span>
                    <h3>No Results Found</h3>
                    <p>Try with different text or operation.</p>
                </div>`;
        } else {
            outputElement.innerHTML = content;
        }
        
        outputElement.classList.remove('fade-out');
        outputElement.classList.add('fade-in');
        
        // Scroll to result
        outputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } , 300);
};

const showCaseOptions = (textArea) => {
    const uppercase = textArea.toUpperCase();
    const lowercase = textArea.toLowerCase();
    const titleCase = textArea.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    display(`
        <div class="success-result">
            <span class="result-icon">🔤</span>
            <h3>Case Conversions</h3>
            <div class="result-details">
                <div class="case-group">
                    <h4>UPPERCASE</h4>
                    <div class="formatted-text">${uppercase}</div>
                </div>
                <div class="case-group">
                    <h4>lowercase</h4>
                    <div class="formatted-text">${lowercase}</div>
                </div>
                <div class="case-group">
                    <h4>Title Case</h4>
                    <div class="formatted-text">${titleCase}</div>
                </div>
            </div>
        </div>
    `);
};

const removeExtraSpaces = (textArea) => {
    const cleaned = textArea.replace(/\s+/g, ' ').trim();
    const spacesSaved = textArea.length - cleaned.length;

    display(`
        <div class="success-result">
            <span class="result-icon">✨</span>
            <h3>Extra Spaces Removed</h3>
            <div class="result-details">
                <p>Spaces removed: <span class="highlight">${spacesSaved}</span></p>
                <p>Original length: <span class="highlight">${textArea.length}</span></p>
                <p>New length: <span class="highlight">${cleaned.length}</span></p>
                <div class="formatted-text">${cleaned}</div>
            </div>
        </div>
    `);
};

const characterFrequency = (textArea) => {
    const freq = {};
    [...textArea].forEach(char => {
        freq[char] = (freq[char] || 0) + 1;
    });

    const sortedChars = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([char, count]) => `
            <div class="freq-item">
                <span class="char">${char === ' ' ? '␣' : char}</span>
                <div class="freq-bar" style="--freq: ${(count / textArea.length) * 100}%">
                    <span class="count">${count}</span>
                </div>
            </div>
        `).join('');

    display(`
        <div class="success-result">
            <span class="result-icon">📊</span>
            <h3>Character Frequency</h3>
            <div class="result-details">
                <div class="freq-container">
                    ${sortedChars}
                </div>
            </div>
        </div>
    `);
};

const wordFrequency = (textArea) => {
    const words = textArea.toLowerCase().match(/\b\w+\b/g) || [];
    const freq = {};
    words.forEach(word => {
        freq[word] = (freq[word] || 0) + 1;
    });

    const sortedWords = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([word, count]) => `
            <div class="freq-item">
                <span class="word">${word}</span>
                <div class="freq-bar" style="--freq: ${(count / words.length) * 100}%">
                    <span class="count">${count}</span>
                </div>
            </div>
        `).join('');

    display(`
        <div class="success-result">
            <span class="result-icon">📝</span>
            <h3>Word Frequency</h3>
            <div class="result-details">
                <p>Total unique words: <span class="highlight">${Object.keys(freq).length}</span></p>
                <div class="freq-container">
                    ${sortedWords}
                </div>
            </div>
        </div>
    `);
};

const textStatistics = (textArea) => {
    const charCount = textArea.length;
    const wordCount = (textArea.match(/\b\w+\b/g) || []).length;
    const sentenceCount = (textArea.match(/[.!?]+/g) || []).length;
    const paragraphCount = textArea.split(/\n\s*\n/).length;
    const avgWordLength = wordCount > 0 
        ? (textArea.match(/\b\w+\b/g) || []).join('').length / wordCount 
        : 0;

    display(`
        <div class="success-result">
            <span class="result-icon">📊</span>
            <h3>Text Statistics</h3>
            <div class="result-details">
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Characters</span>
                        <span class="stat-value">${charCount}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Words</span>
                        <span class="stat-value">${wordCount}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Sentences</span>
                        <span class="stat-value">${sentenceCount}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Paragraphs</span>
                        <span class="stat-value">${paragraphCount}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Avg Word Length</span>
                        <span class="stat-value">${avgWordLength.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    `);
};
})