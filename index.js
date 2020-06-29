let score = 0;
let questionIndex = 0;

function renderWelcomeMessage() {
    $('#question-text').html(
        `<p>
            Are you smarter than a Werewolf? Test your knowledge of the most 
            infamous monsters from The X-Files!
        </p>`
    );
    $('button').html('Start');
    $('button').attr('id','start-button');
}

function startQuiz() {
    updateStats();
    score = 0;
    questionIndex = -1;
    nextQuestion();
}

function nextQuestion() {
    questionIndex++;
    // Check that we're not at the end of the quiz
    if (questionIndex >= QUESTIONS.length) {
        renderResults();
    } else {
        updateStats();
        $('#question-text').html(generateQuestionHTML());
        $('button').html('Submit');
        $('button').attr('id','submit-button');
    }

}

function submitAnswer() {
    // Make sure an answer is checked
    console.log($("input[name='answers']:checked").val());
    if (!$('input[name="answers"]:checked').val()) {
        alert(`Please choose an answer.`);
        return;
    }
    
    // Evaluate if the answer is correct
    var correct = $('input[name="answers"]:checked').val() === QUESTIONS[questionIndex].correct_answer;

    // Render explanation
    $('#question-text').html(generateAnswerHTML(correct));
    $('button').html('Next');
    $('button').attr('id','next-button');

    // Update stats
    if (correct) score++;
    updateStats();
}

function updateStats() {
    $('#stats').attr('style','');
    $('#question-number').html(`Question: ${questionIndex+1}/${QUESTIONS.length}`);
    $('#score').html(`Score: ${score}`)
}

function renderResults() {
    $('#question-text').html(generateResultHTML());
    $('button').html('Restart');
    $('button').attr('id','start-button');
}

function generateQuestionHTML() {
    question = QUESTIONS[questionIndex];
    return `<p>${question.question}</p>` +
        question.answers.map(a => 
        `<input type="radio" name="answers" value="${a}" required>
        <label for="${a}">${a}</label><br>`).join('');
}

function generateAnswerHTML(correct) {
    question = QUESTIONS[questionIndex];
    return `<p>
        ${correct ? 'Correct!' : 'Incorrect!'} 
        </p>
        <p>
            ${question.explanation}
        </p>`;
}

function generateResultHTML() {
    return `<p>
        Great job! You got ${score} out of ${QUESTIONS.length} questions correct. Want to try again?
        </p>`;
}


function handleButtonClick() {
    $('button').click(function(event) {
        event.preventDefault();
        
        if (event.target.id === 'start-button') {
            startQuiz();
        } else if (event.target.id === 'submit-button') {
            submitAnswer();
        } else if (event.target.id === 'next-button') {
            nextQuestion();
        }
    });
}


function initialize() {
    renderWelcomeMessage();
    handleButtonClick();
}

$(initialize());


const QUESTIONS = [
    {
        question: `The 1997 episode 'The Postmodern Prometheus' was inspired by Mary
        Shelley's Frankenstein. In this episode, The Great Mutato (a parallel to
        Frankenstein's Monster) was a megafan of which pop superstar?`,
        answers: [
            `Mariah Carey`,
            `Whitney Houston`,
            `Cher`,
            `Madonna`,
        ],
        correct_answer: `Cher`,
        explanation: `The Great Mutato was a megafan of CHER. In the final
        scene of the episode, Mulder and Scully take him to see her in concert.
        In real life she was invited to film this scene, but was unavailable.`
    },
    {
        question: `The season six episode 'Drive' was written by Vince Gilligan, 
        who went on to create and produce Breaking Bad a decade later. Who was the
        guest star in this episode, whose riveting performance led Gilligan to cast
        him in Breaking Bad years later?`,
        answers: [
            `Bob Odenkirk`,
            `Aaron Paul`,
            `Dean Norris`,
            `Bryan Cranston`,
        ],
        correct_answer: `Bryan Cranston`,
        explanation: `The complex antihero in Drive (and in Breaking Bad) was 
        played by BRYAN CRANSTON. Gilligan described Cranston's talent:
        "We had this villain, and we needed the audience to feel bad for him when 
        he died. Bryan alone was the only actor who could do that, who could pull 
        off that trick. And it is a trick. I have no idea how he does it."`,
    },
    {
        question: `In the 1998 episode "Bad Blood," Scully and Mulder recount
        the story of discovering a town of Vampires in rural Texas. Mulder points
        out that despite vampire legends from around the world having differing traits,
        they have what common vulnerability?`,
        answers: [
            `They cannot see themselves in mirrors`,
            `They are burned by holy water`,
            `They are obsessive compulsive`,
            `They can be stopped with silver bullets`,
        ],
        correct_answer: `They are obsessive compulsive`,
        explanation: `According to Mulder, vampires around the world ARE
        OBSESSIVE COMPULSIVE. He and Scully use this to their advantage, scattering
        seeds and tying knots to keep the vampires busy and unable to chase them.`,
    },
    {
        question: `Widely considered to be the best episode of the X-Files ever aired,
        "Clyde Bruckman's Final Repose" won two Emmys. Guest Star Peter Boyle played
        a man who can predict anyone's death. What was his profession?`,
        answers: [
            `Life Insurance Salesman`,
            `Priest`,
            `Tarot Card Reader`,
            `Homicide Detective`,
        ],
        correct_answer: `Life Insurance Salesman`,
        explanation: `Clyde Bruckman was a LIFE INSURANCE SALESMEN. Peter Boyle won
        an Emmy for Outstanding Guest Actor in a Drama Series for his role as Clyde.`,
    },
    {
        question: `In 'Arcadia,' Scully and Mulder move into a gated community to
        investigate the disapearance of several neighbors. As it turns out, the
        culprit is the president of the homeowners' association, who has
        summoned what type of monster (in this case, made of trash)?`,
        answers: [
            `Golem`,
            `Goblin`,
            `Tulpa`,
            `Takwin`,
        ],
        correct_answer: `Tulpa`,
        explanation: `The monster of Arcadia was a TULPA. The HOA used him to eliminate
        residents who didn't conform to the community's strict rules and regualations.`,
    },
    {
        question: `What band got its name from a Season 1 episode of the X-Files
        about genetic experimentation and cloning?`,
        answers: [
            `Third Eye Blind`,
            `Beastie Boys`,
            `Sonic Youth`,
            `Eve 6`,
        ],
        correct_answer: `Eve 6`,
        explanation: `EVE 6 is named after a character in the 1993 episode 'Eve'.`,
    },
    {
        question: `In the 1993 episode 'Ice,' a team of researchers in Alaska
        unearth a parasitic, mind-controlling worm. In the climax, a Toxicologist
        named Dr. Da Silva tries to infect Mulder before the others realize that
        Da Silva is infected and controlled by the parasite. What guest star, 
        now a felon, played Dr. Da Silva?`,
        answers: [
            `Courtney Love`,
            `Felicity Huffman`,
            `Mark Wahlberg`,
            `Christian Slater`,
        ],
        correct_answer: `Felicity Huffman`,
        explanation: `While all of these actors have been convicted of felonies,
        FELICITY HUFFMAN played Dr. Da Silva.`,
    },
]