document.addEventListener('DOMContentLoaded', () => {
    // DOM element references
    const textAreaElement = document.querySelector('#inputStr');
    const operationsElement = document.querySelector('#operations');
    const buttonElement = document.querySelector('#find');
    const outputElement = document.getElementById('output');

    // Modal elements for 'Find Word'
    const findWordModal = document.getElementById('findWordModal');
    const wordToFindInput = document.getElementById('wordToFind');
    const confirmFindWordBtn = document.getElementById('confirmFindWord');
    const cancelFindWordBtn = document.getElementById('cancelFindWord');

    let currentTextAreaValue = ''; // Store the text area value for modal operations

    // Real-time character count update
    textAreaElement.addEventListener('input', () => {
        const charCount = textAreaElement.value.length;
        // Get or create the character count feedback element
        const feedback = document.getElementById('charCount') || createElement('charCount', textAreaElement);
        feedback.textContent = `Characters: ${charCount}`;
    });

    /**
     * Creates a new DOM element and inserts it after a reference element.
     * @param {string} id - The ID for the new element.
     * @param {HTMLElement} referenceElement - The element after which the new element will be inserted.
     * @returns {HTMLElement} The newly created element.
     */
    function createElement(id, referenceElement) {
        const element = document.createElement('div');
        element.id = id;
        element.className = 'feedback-text';
        referenceElement.parentNode.insertBefore(element, referenceElement.nextSibling);
        return element;
    }

    // Event listener for operation selection change
    operationsElement.addEventListener('change', () => {
        // Add fade-out class for animation
        outputElement.classList.add('fade-out');
        // After animation, clear content and remove fade-out class
        setTimeout(() => {
            outputElement.innerHTML = '<p class="placeholder-text">Result will appear here...</p>';
            outputElement.classList.remove('fade-out');
        }, 300); // Matches the CSS transition duration
    });

    /**
     * Displays an error message in the output area with a shake animation.
     * @param {string} message - The error message to display.
     */
    const showError = (message) => {
        outputElement.innerHTML = `
            <div class="error-message">
                <span class="error-icon">⚠️</span>
                <p>${message}</p>
            </div>
        `;
        outputElement.classList.add('shake'); // Add shake animation
        setTimeout(() => outputElement.classList.remove('shake'), 500); // Remove after animation
    };

    /**
     * Displays content in the output area with fade-out/fade-in animation.
     * If content is empty, displays a "No Results Found" message.
     * @param {string} content - The HTML string content to display.
     */
    const display = (content) => {
        outputElement.classList.add('fade-out'); // Start fade-out animation
        setTimeout(() => {
            outputElement.innerHTML = content || `
                <div class="error-result">
                    <span class="result-icon">😔</span>
                    <h3>No Results Found</h3>
                    <p>Try with different text or operation.</p>
                </div>`;
            outputElement.classList.remove('fade-out'); // Remove fade-out
            outputElement.classList.add('fade-in'); // Add fade-in
            // Scroll to the output for better visibility on smaller screens
            outputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300); // Matches CSS transition duration
    };

    // --- Start of moved function definitions (THIS IS THE FIX) ---

    /**
     * Checks if the given text is a palindrome (reads the same forwards and backwards).
     * Ignores non-alphanumeric characters and case for the check, but displays original.
     * @param {string} textArea - The text to check.
     */
    const findPalindrome = (textArea) => {
        // Clean text for palindrome check (remove non-alphanumeric, convert to lowercase)
        const cleanedText = textArea.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversedCleaned = cleanedText.split('').reverse().join('');

        if (cleanedText === reversedCleaned && cleanedText.length > 0) {
            display(`
                <div class="success-result">
                    <span class="result-icon">✨</span>
                    <h3>It's a Palindrome!</h3>
                    <div class="result-details">
                        <p>Original text: <span class="highlight">${textArea}</span></p>
                        <p>Cleaned for check: <span class="highlight">${cleanedText}</span></p>
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
                        <p>Cleaned for check: <span class="highlight">${cleanedText}</span></p>
                        <p>Reversed cleaned: <span class="muted">${reversedCleaned}</span></p>
                    </div>
                </div>
            `);
        }
    };

    /**
     * Counts the number of vowels in the given text and lists their indices.
     * @param {string} textArea - The text to analyze.
     */
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
        vowelsFormatter(count, textIndex); // Call formatter to display result
    };

    /**
     * Formats and displays the vowel count and indices.
     * @param {number} count - The total number of vowels.
     * @param {number[]} textIndex - An array of indices where vowels were found.
     */
    const vowelsFormatter = (count, textIndex = []) => {
        if (count === 0) {
            display(`
                <div class="error-result">
                    <span class="result-icon">😶</span>
                    <h3>No Vowels Found</h3>
                    <p>This text contains no vowels.</p>
                </div>
            `);
        } else {
            display(`
                <div class="success-result">
                    <span class="result-icon">🔡</span>
                    <h3>Vowel Analysis</h3>
                    <div class="result-details">
                        <p>Total Vowels: <span class="highlight">${count}</span></p>
                        <p>Indexes: <span class="highlight">${textIndex.join(', ')}</span></p>
                    </div>
                </div>
            `);
        }
    };

    /**
     * Reverses the order of words in a sentence.
     * @param {string} textArea - The sentence to reverse.
     */
    const reverseSentence = (textArea) => {
        // Split by spaces, reverse array, then join back with spaces
        const words = textArea.split(' ').reverse().join(' ');
        display(`
            <div class="success-result">
                <span class="result-icon">🔄</span>
                <h3>Sentence Reversed!</h3>
                <div class="result-details">
                    <p>Original: <span class="highlight">${textArea}</span></p>
                    <p>Reversed: <span class="highlight">${words}</span></p>
                </div>
            </div>
        `);
    };

    /**
     * Reverses the order of characters in a string.
     * @param {string} textArea - The string to reverse.
     */
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

    /**
     * Calculates and displays the length of the text in characters and words.
     * @param {string} textArea - The text to analyze.
     */
    const findLength = (textArea) => {
        const words = textArea.trim().split(/\s+/).filter(word => word.length > 0); // Filter out empty strings from split
        display(`
            <div class="success-result">
                <span class="result-icon">📏</span>
                <h3>Text Length</h3>
                <p>Characters (including spaces): <span class="highlight">${textArea.length}</span></p>
                <p>Words: <span class="highlight">${words.length}</span></p>
            </div>
        `);
    };

    /**
     * Opens the 'Find Word' modal.
     * @param {string} textArea - The text from the input area.
     */
    const openFindWordModal = (textArea) => {
        wordToFindInput.value = ''; // Clear previous input
        findWordModal.classList.add('show'); // Show the modal
        wordToFindInput.focus(); // Focus on the input field
    };

    /**
     * Performs the actual word finding and displays the result.
     * @param {string} textArea - The main text to search within.
     * @param {string} word - The word to find.
     */
    const performFindWord = (textArea, word) => {
        // Using a global case-insensitive regex for highlighting
        const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = [...textArea.matchAll(regex)];

        if (matches.length > 0) {
            let highlightedText = textArea;
            // Replace all occurrences with highlighted span
            highlightedText = highlightedText.replace(regex, (match) => `<span class="search-highlight">${match}</span>`);

            display(`
                <div class="success-result">
                    <span class="result-icon">🔍</span>
                    <h3>Word Found!</h3>
                    <p>Found <span class="highlight">${matches.length}</span> instance(s) of "<span class="highlight">${word}</span>".</p>
                    <div class="result-details mt-2">
                        <p>First occurrence at index: <span class="highlight">${matches[0].index}</span></p>
                        <p>All indices: <span class="highlight">${matches.map(m => m.index).join(', ')}</span></p>
                    </div>
                    <h4 class="font-semibold text-gray-700 mt-4 mb-2">Text with Highlights:</h4>
                    <div class="formatted-text">${highlightedText}</div>
                </div>
            `);
        } else {
            display(`
                <div class="error-result">
                    <span class="result-icon">🚫</span>
                    <h3>Not Found</h3>
                    <p>The word "<span class="highlight">${word}</span>" was not found in the text.</p>
                </div>
            `);
        }
    };


    /**
     * Provides detailed statistics about the text (lines, sentences, words, characters).
     * @param {string} textArea - The text to analyze.
     */
    const textStatistics = (textArea) => {
        const lines = textArea.split('\n').length;
        // Split by common sentence terminators, then filter out empty strings
        const sentences = textArea.split(/[.!?]+/).filter(Boolean).length;
        const words = textArea.trim().split(/\s+/).filter(Boolean).length;
        const characters = textArea.length;

        display(`
            <div class="success-result">
                <span class="result-icon">📊</span>
                <h3>Text Statistics</h3>
                <p>Lines: <span class="highlight">${lines}</span></p>
                <p>Sentences: <span class="highlight">${sentences}</span></p>
                <p>Words: <span class="highlight">${words}</span></p>
                <p>Characters (including spaces): <span class="highlight">${characters}</span></p>
            </div>
        `);
    };

    /**
     * Calculates and displays the frequency of each character (ignoring spaces).
     * @param {string} textArea - The text to analyze.
     */
    const characterFrequency = (textArea) => {
        const freq = {};
        // Iterate over characters, ignoring whitespace
        for (const char of textArea.replace(/\s/g, '')) {
            freq[char] = (freq[char] || 0) + 1;
        }
        // Create HTML content from the frequency map
        const content = Object.entries(freq).map(([char, count]) =>
            `<p><span class="highlight">${char}</span>: ${count}</p>`
        ).join('');

        if (Object.keys(freq).length === 0) {
             display(`
                <div class="error-result">
                    <span class="result-icon">🚫</span>
                    <h3>No Characters Found</h3>
                    <p>The input text contains no countable characters (only spaces or empty).</p>
                </div>
            `);
        } else {
            display(`
                <div class="success-result">
                    <span class="result-icon">🔠</span>
                    <h3>Character Frequency</h3>
                    <div class="result-details">${content}</div>
                </div>
            `);
        }
    };

    /**
     * Calculates and displays the frequency of each word.
     * @param {string} textArea - The text to analyze.
     */
    const wordFrequency = (textArea) => {
        // Extract words using regex, convert to lowercase
        const words = textArea.toLowerCase().match(/\b\w+\b/g) || [];
        const freq = {};
        words.forEach(word => freq[word] = (freq[word] || 0) + 1); // Increment count for each word
        // Create HTML content from the frequency map
        const content = Object.entries(freq).map(([word, count]) =>
            `<p><span class="highlight">${word}</span>: ${count}</p>`
        ).join('');

        if (words.length === 0) {
            display(`
                <div class="error-result">
                    <span class="result-icon">🚫</span>
                    <h3>No Words Found</h3>
                    <p>The input text contains no recognizable words.</p>
                </div>
            `);
        } else {
            display(`
                <div class="success-result">
                    <span class="result-icon">📚</span>
                    <h3>Word Frequency</h3>
                    <div class="result-details">${content}</div>
                </div>
            `);
        }
    };

    /**
     * Removes extra spaces from the text, replacing multiple spaces with a single space
     * and trimming leading/trailing spaces.
     * @param {string} textArea - The text to clean.
     */
    const removeExtraSpaces = (textArea) => {
        const cleaned = textArea.replace(/\s+/g, ' ').trim();
        display(`
            <div class="success-result">
                <span class="result-icon">🚿</span>
                <h3>Extra Spaces Removed</h3>
                <p><span class="highlight">${cleaned}</span></p>
            </div>
        `);
    };

    /**
     * Displays the text in uppercase, lowercase, and title case.
     * @param {string} textArea - The text to convert.
     */
    const showCaseOptions = (textArea) => {
        display(`
            <div class="success-result">
                <span class="result-icon">🔤</span>
                <h3>Case Options</h3>
                <p>Uppercase: <span class="highlight">${textArea.toUpperCase()}</span></p>
                <p>Lowercase: <span class="highlight">${textArea.toLowerCase()}</span></p>
                <p>Title Case: <span class="highlight">${
                    // Convert to title case: capitalize first letter of each word
                    textArea.replace(/\w\S*/g, (w) =>
                        w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
                    )
                }</span></p>
            </div>
        `);
    };

    /**
     * Removes leading and trailing whitespace from the text.
     * @param {string} textArea - The text to trim.
     */
    const trimText = (textArea) => {
        const trimmed = textArea.trim();
        display(`
            <div class="success-result">
                <span class="result-icon">✂️</span>
                <h3>Trimmed Text</h3>
                <p><span class="highlight">${trimmed}</span></p>
            </div>
        `);
    };

    /**
     * Removes all special characters (non-alphanumeric and non-whitespace) from the text.
     * @param {string} textArea - The text to clean.
     */
    const removeSpecialCharacters = (textArea) => {
        const cleaned = textArea.replace(/[^a-zA-Z0-9\s]/g, ''); // Keep letters, numbers, and spaces
        display(`
            <div class="success-result">
                <span class="result-icon">🧹</span>
                <h3>Special Characters Removed</h3>
                <p><span class="highlight">${cleaned}</span></p>
            </div>
        `);
    };

    // --- End of moved function definitions ---

    // Now, define operationsMap and getOperation AFTER all functions are defined
    const operationsMap = {
        length: findLength,
        textStats: textStatistics,
        findstr: openFindWordModal,
        palindrome: findPalindrome,
        revStr: reverseString,
        reverseSentence: reverseSentence,
        vowelCount: countVowels,
        charFreq: characterFrequency,
        wordFreq: wordFrequency,
        removeSpaces: removeExtraSpaces,
        caseConvert: showCaseOptions,
        trimText: trimText,
        removeSpecialChars: removeSpecialCharacters
    };

    /**
     * Calls the appropriate function based on the selected operation.
     * @param {string} operation - The selected operation key.
     * @param {string} textArea - The text from the input area.
     */
    const getOperation = (operation, textArea) => {
        const operationFunc = operationsMap[operation];
        if (operationFunc) {
            operationFunc(textArea); // Execute the function
        } else {
            // Fallback for unknown operations (should not happen with valid dropdown)
            display(`
                <div class="error-result">
                    <span class="result-icon">⚠️</span>
                    <h3>Unknown Operation</h3>
                    <p>Please select a valid operation from the list.</p>
                </div>
            `);
        }
    };

    // Main button click handler (this part remains largely the same, but now calls
    // getOperation after it's defined)
    buttonElement.addEventListener('click', () => {
        const textArea = textAreaElement.value.trim();
        const operation = operationsElement.value;

        // Input validation checks
        if (!textArea) {
            display(`
                <div class="error-result">
                    <span class="result-icon">⚠️</span>
                    <h3>Input Required</h3>
                    <p>Please enter some text to analyze.</p>
                </div>
            `);
            return; // Stop execution if no text
        }

        if (!operation) {
            display(`
                <div class="error-result">
                    <span class="result-icon">⚠️</span>
                    <h3>Operation Required</h3>
                    <p>Please select an operation from the dropdown menu.</p>
                </div>
            `);
            return; // Stop execution if no operation selected
        }

        // Disable button and show loading spinner during processing
        buttonElement.disabled = true;
        buttonElement.innerHTML = '<span class="loading-spinner"></span>';

        currentTextAreaValue = textArea; // Store for modal use

        // Simulate processing time with a timeout
        setTimeout(() => {
            try {
                // Call the appropriate operation function
                getOperation(operation, textArea);
            } catch (error) {
                // Display generic error message if an unexpected error occurs
                showError('An error occurred while processing your request.');
                console.error('Processing error:', error); // Log error for debugging
            } finally {
                // Re-enable button and restore text after processing
                buttonElement.disabled = false;
                buttonElement.textContent = 'Analyze Text';
            }
        }, 500); // 500ms delay for demonstration
    });

    const closeFindWordModal = () => {
        findWordModal.classList.remove('show'); // Hide the modal
    };

    // Event listener for 'Find' button inside the modal
    confirmFindWordBtn.addEventListener('click', () => {
        const word = wordToFindInput.value.trim();
        closeFindWordModal(); // Close modal immediately

        if (!word) {
            display(`
                <div class="error-result">
                    <span class="result-icon">⚠️</span>
                    <h3>Word Not Provided</h3>
                    <p>Please enter a word to find.</p>
                </div>
            `);
            return;
        }
        // Perform the find operation using the stored text area value
        performFindWord(currentTextAreaValue, word);
    });

    // Event listener for 'Cancel' button inside the modal
    cancelFindWordBtn.addEventListener('click', () => {
        closeFindWordModal(); // Just close the modal
    });

    // Allow pressing Enter in the modal's input to trigger find
    wordToFindInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmFindWordBtn.click();
        }
    });

}); // End of DOMContentLoaded