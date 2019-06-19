# owlJS

owl is a JavaScript library (in progress) developed to build virtual and printable academic tests.

The main goal of the project is build a free and easy-to-use front-end tool able to generate, open, edit, publish and 
correct assessments.

---


## What is a Test?

In owlJS every test is considered an object (bellow in JSON format) with specific attributes and methods.


``` json
myTest = {
  testName: 'myTestName',
  testSubject: 'myTestSubject',
  testValue: 'myTestValue',
  testInstructions: 'My test can have instructions that can be showed to the students',
  testType: null,
  testQuestion: null
}
```

The basic attributes of a Test object are its name, subject, value and instruction.

The type of the test is based in the perspective of learning as a 3-step process based on:

1. Students pre-knowledges (skills, capabilites, strengths and weaknesses) --> Diagnostic Test
2. Set or individual topics covered during the classes --> Formative Test
3. The completion of the learning process --> Summative Test

The test questions are also defined as objects. In this perspective, a Test object contains an array of Question 
objects. These questions can be indiviually acessed, modified, answered, and even shuffled and raffled to create 
personalized tests to each student.

---

## What is a Question?

Ironically, that was not a Question. At least not in the perspective addopted here.

A owlJS Question is also and object (bellow in JSON format) with its own attributes and methods.


``` json
myQuestion = {
  questionText: 'myQuestionText',
  questionValue: 'myQuestionValue',
  questionComment: 'This is a specif comment to that question',
  questionType: 'myQuestionType',

  questionAnswers: [],
  questionKeys: []  
}
```

The basic attributes of a question are its text, value and comment. Beyond these are also the Answers and the Type.

owlJS have 8 different types of Question. Each of them have unique uses, although all have the same properties.

1. Single --> Multiple-choice with just one selection = 1 right answer. Just one item can have the right answer.
2. Multiple --> Multiple-choice with multiple selection. Each item can have a different pontuation and a different 
level of accuracy.
3. Choice --> True or False question.
4. Complete --> Each alternative have a blank space (__) in front of it to be completed freely or according to rules. 
Generic True/False question.
5. Fill --> Fill blank spaces in a text.
6. Short --> Short answers. Will be turned in to a `input text` HTML element when rendered;
7. Long --> Long answer. Will be turned in to a `textarea` HTML element when rendered.

---

## How to use

(SOON...)
