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

owlJS Tests can be configured in JSON or MD files.

The easiest way of writting test is making a Markdown file. 

In the header of the file you can configure the properties of the Test itself, with 5 different properties, that can be shuffled in any position, *but keeping the specific markers to each property*.

``` md
# testName
+ testSubject
* testType
- testValue
> testInstructions

---
```

This header, when parsed into HTML will be turned in to:
- `h1` tag --> testName
- `li` tag --> testSubject, testType and testValue
- `blockqoute` tag --> testInstructions

The delimitation of the header is made by a `hr` tag or `---` markdown element.

After the `---` delimiter, individual questions can be written:

``` md
Test Header
---
Question 01
___
Question 02
___
Question 03
___
(...)
---
Question N
```

The type of the question defines the way it must be written in the .md file.

---

### questionType: 'single'

Questions of the 'single' type are standard in owlJS. They are used when is necessary to select a single option amoung many.

```md
In which country Alan Turing, considered the father of Computer Science, was born?

- USA
- Australia
- Germany
-- UK
- Belgium

```

In this type of question, each alternative is written in a separated line starting with `-` or `--` delimiter. Beyond the alternatives itself, the questionComment and questionValue properties can also be defined in the text:


```md
In which country Alan Turing, considered the father of Computer Science, was born?

-[C: Turing was born in Wilmslow, a very 'english' city name]
-[50]
- USA
- Australia
- Germany
-- UK
- Belgium

```

The `-[C: ...]` line defines the question comment.

The `-[50]` line defines the question value, in this case set to 50 points.

In 'single' questions, the standard question value is 1 point.

These structures can be used in *any type of question*. Although, when multiple comments or multiple values are defined in the text of the question, the last one defined will be used.

---

### questionType: 'multiple'

Questions of the 'multiple' are used when multiple options can be selected amoung the alternatives. In this case, each of them have a different key value.

``` md
What is the square root of -1?

-[1] -1 has no real sqrt
-[0] 0
-[0] -pi/2
-[2] i

```

The question above can have 2 right answers: the first or the last alternatives. But, considering that the question was 'What is the square root of -1' and not 'What is the *real* square root of -1', the last alternative (i) is a little bit more precise.

In this case, the question value will be defined as the highest value presented amoung the answer keys. Therefore, 2 points.

You can set the question value with the flag `-[questionValue]`, presented in the previous section. In this case, the value of each answer will be mapped to a range between 0 and questionValue.

``` md
What is the square root of -1?

-[10]
-[1] -1 has no real sqrt
-[0] 0
-[0] -pi/2
-[2] i

```

---

### questionType: 'choice'

'Choice' are the classic True or False questions. They also can be used to select multiple options amoung many, with the difference that each alternative can just have 2 values: 0 (or F) and 1 (or T).

``` md
Answer each alternative as True (T) or False(F).

-[F] Kant was born in Turkey
-[T] Nietzsche and Kant were born in the same country
-[F] Therefore, Nietzsche was born in Turkey

```

This question can be re-written as:

``` md
Answer each alternative as True (T) or False(F).

-[0] Kant was born in Turkey
-[1] Nietzsche and Kant were born in the same country
-[0] Therefore, Nietzsche was born in Turkey

```

When the `-[questionValue]` flag is set to a 'choice' question, the pontuation will be also mapped to a range between 0 and questionValue.

``` md
Answer each alternative as True (T) or False(F).

-[10]
-[C: Do you remember that any question can have comments? And, by the way, this one has a 10-score pontuation.]
-[F] Kant was born in Turkey
-[T] Nietzsche and Kant were born in the same country
-[F] Therefore, Nietzsche was born in Turkey

```

---

### questionType: 'completeKey'

The questions of the type 'completeKey' are used when is necessary to analise alternatives and compare it to others. (SOON)

---

### questionType: 'complete'

(SOON)

---


### questionType: 'fill'

(SOON)

---

### questionType: 'short'

(SOON)

---

### questionType: 'long'

(SOON)