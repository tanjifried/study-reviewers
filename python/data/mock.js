window.MOCK = {
 "title": "Mock exam",
 "questions": [
  {
   "id": "mock-q01",
   "set": "A",
   "number": 1,
   "objective": "2.2",
   "topic": "while loop with break",
   "kind": "input",
   "images": [
    "mock-images/chat-1.jpg"
   ],
   "prompt": "<p>Review the following code segment:</p><pre><code>product = 2\nn = 5\nwhile (n != 0):\n    product *= n\n    print (product)\n    n -= 1\n    if n == 3:\n        break</code></pre><p>How many lines of output does the code print?</p><p>Enter the number as an integer here:</p>",
   "parts": [
    {
     "label": "Enter the number as an integer",
     "input": true,
     "answer": [
      "2"
     ]
    }
   ],
   "explanation": "<p>The loop prints <code>10</code> on the first pass (n becomes 4), prints <code>40</code> on the second pass, then n becomes 3 and <code>break</code> ends the loop before a third print. Two lines are printed.</p>",
   "lesson": "<h4>Step 1: trace each pass</h4><pre><code>start      product=2  n=5\npass 1:    product=2*5=10   print 10   n=4   n==3? no\npass 2:    product=10*4=40  print 40   n=3   n==3? yes -&gt; break\n(loop ends; nothing else prints)</code></pre><p>The <code>break</code> is checked <em>after</em> the print and the decrement, so the pass that makes n equal 3 still prints.</p><h4>Why the other counts are wrong</h4><ul><li><strong>3 or more</strong>: you would need to ignore the <code>break</code>; it fires as soon as n reaches 3.</li><li><strong>5</strong>: that would be the count without the <code>if n == 3</code> test (n = 5, 4, 3, 2, 1 gives five prints).</li><li><strong>1</strong>: the decrement happens after the print, so the loop body has already run twice before n == 3 is true.</li></ul><p><strong>Exam tip:</strong> Write a small trace table (n, product, printed?) and apply <code>break</code> only at the line where it sits.</p>"
  },
  {
   "id": "mock-q02",
   "set": "A",
   "number": 2,
   "objective": "1.2",
   "topic": "String slicing",
   "kind": "drag",
   "images": [
    "mock-images/chat-2.jpg"
   ],
   "prompt": "<p>You need to identify the results of performing various slicing operations on the following sequence structure:</p><pre><code>alph = \"abcdefghijklmnopqrstuvwxyz\"</code></pre><p>Move the appropriate results from the list on the left to the correct slicing operations on the right. You may use each result once, more than once, or not at all.</p><p>Note: You will receive partial credit for each correct match.</p>",
   "bank": [
    "def",
    "abcdef",
    "cde",
    "defg",
    "cdef",
    "abcde"
   ],
   "parts": [
    {
     "label": "alph[3:6]",
     "options": [
      "def",
      "abcdef",
      "cde",
      "defg",
      "cdef",
      "abcde"
     ],
     "answer": 0
    },
    {
     "label": "alph[:6]",
     "options": [
      "def",
      "abcdef",
      "cde",
      "defg",
      "cdef",
      "abcde"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>A slice <code>[start:stop]</code> includes <code>start</code> and stops before <code>stop</code>. <code>alph[3:6]</code> takes indexes 3, 4, 5 which is <code>def</code>; <code>alph[:6]</code> starts at 0 and takes indexes 0 to 5, <code>abcdef</code>.</p>",
   "lesson": "<h4>Step 1: number the characters</h4><pre><code>index: 0 1 2 3 4 5 6\nchar : a b c d e f g</code></pre><h4>Step 2: apply start (inclusive) and stop (exclusive)</h4><pre><code>alph[3:6]  -&gt; indexes 3,4,5 -&gt; \"def\"\nalph[:6]   -&gt; indexes 0..5   -&gt; \"abcdef\"   (missing start means 0)</code></pre><h4>Why the other results are wrong</h4><ul><li><code>cde</code> / <code>cdef</code> start at index 2: that would be <code>alph[2:5]</code> / <code>alph[2:6]</code>.</li><li><code>defg</code> includes index 6: that would be <code>alph[3:7]</code>.</li><li><code>abcde</code> stops one early: that is <code>alph[:5]</code>.</li></ul><p><strong>Exam tip:</strong> Length of <code>s[a:b]</code> is <code>b - a</code>. <code>[3:6]</code> gives 3 characters, <code>[:6]</code> gives 6.</p>"
  },
  {
   "id": "mock-q03",
   "set": "A",
   "number": 3,
   "objective": "4.2",
   "topic": "Function defaults and return",
   "kind": "tf",
   "images": [
    "mock-images/chat-3.jpg"
   ],
   "prompt": "<p>For each statement about the following function, select True or False.</p><pre><code>def grosspay(hours=40,rate=25,pieces=0,piecerate=0,salary=0):\n    overtime=0\n    if pieces &gt; 0:\n        return pieces * piecerate\n    if salary &gt; 0:\n        pass\n    if hours &gt; 40:\n        overtime = (hours-40) * (1.5 * rate)\n        return overtime + (40 * rate)</code></pre>",
   "parts": [
    {
     "label": "A function call of <code>grosspay()</code> will create a syntax error.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    },
    {
     "label": "A function call of <code>grosspay(salary=50000)</code> will return nothing.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "A function call of <code>grosspay(pieces=500, piecerate=4)</code> will return a result of 2000.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>Every parameter has a default, so <code>grosspay()</code> is a legal call (False). With the defaults <code>hours</code> is 40, so <code>hours &gt; 40</code> is false and no <code>return</code> runs: the function returns <code>None</code> (True). <code>500 * 4</code> is 2000 (True).</p>",
   "lesson": "<h4>Step 1: run each call through the function</h4><pre><code>grosspay()                         hours=40 -&gt; pieces&gt;0? no; salary&gt;0? no; hours&gt;40? no -&gt; falls off the end -&gt; None\ngrosspay(salary=50000)             salary&gt;0 -&gt; pass (does nothing); hours&gt;40? no -&gt; None\ngrosspay(pieces=500, piecerate=4)  pieces&gt;0 -&gt; return 500*4 -&gt; 2000</code></pre><p>Verified by running the code: the first two calls print <code>None</code>, the third prints <code>2000</code>.</p><h4>Why the statements come out this way</h4><ul><li>1 is <strong>False</strong>: all five parameters have defaults, so zero arguments is valid. Nothing is a syntax error.</li><li>2 is <strong>True</strong>: <code>pass</code> is a no-op, it does not return. A function with no executed <code>return</code> returns <code>None</code>.</li><li>3 is <strong>True</strong>: the first <code>if</code> returns before any overtime logic.</li></ul><p><strong>Exam tip:</strong> A function that reaches its end without <code>return</code> gives <code>None</code>; \"returns nothing\" means <code>None</code>.</p>",
   "caution": "On screen the first code line wrapped as <code>def</code> / <code>grosspay(...)</code> on two lines; treated as one line <code>def grosspay(...)</code> (a literal line break there would make statement 1 True). The code panel was scrollable; assumed nothing follows the last visible line."
  },
  {
   "id": "mock-q04",
   "set": "A",
   "number": 4,
   "objective": "1.3",
   "topic": "Operator precedence",
   "kind": "mc",
   "images": [
    "mock-images/chat-4.jpg"
   ],
   "prompt": "<p>A friend asks you to refactor and document the following Python code:</p><pre><code>value1 = 9\nvalue2 = 4\n\nanswer = (value1 % value2 * 10) // 2.0 ** 3.0 + value2</code></pre><p>You run the code.</p><p>What is the result?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "The value 5.0 is displayed.",
      "The value 5.667 is displayed.",
      "A syntax error occurs.",
      "The value 129 is displayed."
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>Evaluate the parentheses first: <code>9 % 4 * 10</code> is <code>1 * 10 = 10</code>. Then <code>**</code> beats <code>//</code>: <code>2.0 ** 3.0 = 8.0</code>. <code>10 // 8.0 = 1.0</code> (a float because one operand is a float), and <code>1.0 + 4 = 5.0</code>.</p>",
   "lesson": "<h4>Step 1: apply precedence</h4><pre><code>(9 % 4 * 10)         -&gt; % and * same level, left to right: (1 * 10) = 10\n2.0 ** 3.0           -&gt; 8.0            (** binds tighter than // and +)\n10 // 8.0            -&gt; 1.0            (floor division with a float gives a float)\n1.0 + 4              -&gt; 5.0</code></pre><h4>Why the other answers are wrong</h4><ul><li><strong>5.667</strong>: that would need true division <code>/</code> not <code>//</code>.</li><li><strong>Syntax error</strong>: the expression is valid; mixing int and float is fine.</li><li><strong>129</strong>: results from doing <code>10 // 2.0</code> first then <code>** 3.0</code> (wrong order): <code>5.0 ** 3 = 125, + 4 = 129</code>.</li></ul><p><strong>Exam tip:</strong> <code>**</code> first, then <code>* / // %</code> left to right, then <code>+ -</code>; any float operand makes the result a float.</p>"
  },
  {
   "id": "mock-q05",
   "set": "A",
   "number": 5,
   "objective": "3.2",
   "topic": "input() function",
   "kind": "mc",
   "images": [
    "mock-images/chat-5.jpg"
   ],
   "prompt": "<p>What does the following statement do?</p><pre><code>data = input()</code></pre>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "Allows a user to enter text in the console",
      "Displays a message box that allows user input",
      "Displays all input peripheral devices on the computer",
      "Creates an HTML input element"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p><code>input()</code> pauses the program, reads one line the user types in the console, and returns it as a string stored in <code>data</code>. It never opens a message box or builds HTML.</p>",
   "lesson": "<h4>Step 1: what happens at run time</h4><pre><code>data = input()      # program waits at the console prompt\n# user types:  42   and presses Enter\n# data == \"42\"       (always a str, even if digits)</code></pre><h4>Why the other options are wrong</h4><ul><li>A message box is a GUI feature (e.g. tkinter), not part of plain <code>input()</code>.</li><li>Listing input peripherals is an operating-system task, unrelated to this function.</li><li>\"HTML input element\" belongs to web pages, not Python console programs.</li></ul><p><strong>Exam tip:</strong> <code>input()</code> = console text in, always returns <code>str</code>; wrap with <code>int()</code> or <code>float()</code> to calculate.</p>"
  },
  {
   "id": "mock-q06",
   "set": "A",
   "number": 6,
   "objective": "1.1",
   "topic": "type() of literals",
   "kind": "drag",
   "images": [
    "mock-images/chat-6.jpg"
   ],
   "prompt": "<p>You need to identify the data types of various type operations.</p><p>Move the appropriate data types from the list on the left to the correct type operations on the right. You may use each data type once, more than once, or not at all.</p><p>Note: You will receive partial credit for each correct match.</p>",
   "bank": [
    "int",
    "float",
    "str",
    "bool"
   ],
   "parts": [
    {
     "label": "type(+1E10)",
     "options": [
      "int",
      "float",
      "str",
      "bool"
     ],
     "answer": 1
    },
    {
     "label": "type(5.0)",
     "options": [
      "int",
      "float",
      "str",
      "bool"
     ],
     "answer": 1
    },
    {
     "label": "type(\"True\")",
     "options": [
      "int",
      "float",
      "str",
      "bool"
     ],
     "answer": 2
    },
    {
     "label": "type(False)",
     "options": [
      "int",
      "float",
      "str",
      "bool"
     ],
     "answer": 3
    }
   ],
   "explanation": "<p>Any number written with an exponent (<code>1E10</code>) or a decimal point (<code>5.0</code>) is a <code>float</code>; the unary <code>+</code> does not change that. Quotes make a <code>str</code> even when the text is <code>True</code>; the bare keyword <code>False</code> is a <code>bool</code>.</p>",
   "lesson": "<h4>Step 1: classify each literal</h4><pre><code>+1E10    -&gt; float   (scientific notation is always float, even though 1E10 looks whole)\n5.0      -&gt; float   (has a decimal point)\n\"True\"   -&gt; str     (in quotes)\nFalse    -&gt; bool    (keyword, no quotes)</code></pre><h4>Common wrong picks</h4><ul><li><code>int</code> for <code>+1E10</code>: only digits with no <code>.</code> or <code>E</code> are ints.</li><li><code>bool</code> for <code>\"True\"</code>: the quotes make it text.</li></ul><p><strong>Exam tip:</strong> <code>E</code> or <code>.</code> in a number literal means <code>float</code>; quotes mean <code>str</code>.</p>"
  },
  {
   "id": "mock-q08",
   "set": "A",
   "number": 8,
   "objective": "5.1",
   "topic": "input() returns str (TypeError)",
   "kind": "tf",
   "images": [
    "mock-images/drive-IMG_1083.jpg",
    "mock-images/setb-18.jpg"
   ],
   "prompt": "<p>The following function calculates the value of an expression that uses an exponent. Line numbers are included for reference only.</p><pre><code>01 def calc_power(a, b):\n02     return a**b\n03 base = input(\"Enter the number for the base: \")\n04 exponent = input(\"Enter the number for the exponent: \")\n05 result = calc_power(base, exponent)\n06 print(\"The result is \" + result)</code></pre><p>For each statement, select True or False.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "parts": [
    {
     "label": "The code will generate an error in line 03 and line 04.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    },
    {
     "label": "The code will generate an error in line 02 and line 05.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "The code will correctly output data to the console.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p><code>input()</code> always returns strings, so lines 03 and 04 work. Line 05 calls <code>calc_power</code> with two strings and line 02 tries <code>\"2\" ** \"3\"</code>, which raises <code>TypeError</code>; the traceback names line 02 and line 05. Nothing is printed.</p>",
   "lesson": "<h4>Step 1: types after each line</h4><pre><code>03 base     = \"2\"          (str)\n04 exponent = \"3\"          (str)\n05 calc_power(\"2\", \"3\")    -&gt; line 02: \"2\" ** \"3\"\nTypeError: unsupported operand type(s) for ** or pow(): 'str' and 'str'</code></pre><p>Verified by running the code with inputs 2 and 3.</p><h4>Why each statement is True or False</h4><ul><li>1 is <strong>False</strong>: <code>input()</code> itself is fine on lines 03-04.</li><li>2 is <strong>True</strong>: the error is raised inside the function (line 02) when called from line 05.</li><li>3 is <strong>False</strong>: the program stops at line 05, so line 06 never prints (and even with numbers, <code>\"text\" + int</code> would fail).</li></ul><p><strong>Exam tip:</strong> Convert with <code>int(input(...))</code> before arithmetic; <code>input()</code> alone is always <code>str</code>.</p>",
   "caution": "Statement 2 assumes \"generate an error in line 02 and line 05\" is read as the lines shown in the traceback (the failing line 02 and its call on line 05). No on-screen selection was visible.",
   "alsoIn": "Set B · Q19"
  },
  {
   "id": "mock-q09",
   "set": "A",
   "number": 9,
   "objective": "3.2",
   "topic": "str.format() indexes",
   "kind": "mc",
   "images": [
    "mock-images/drive-IMG_1085.jpg"
   ],
   "prompt": "<p>Review the following code:</p><pre><code>x = \"oranges\"\ny = \"apples\"\nz = \"bananas\"\ndata = \"{1} and {0} and {2}\"\nprint(data.format(z, y, x))</code></pre><p>What is the output of the <code>print</code> statement?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "apples and bananas and oranges",
      "bananas and oranges and apples",
      "apples and oranges and bananas",
      "oranges and apples and bananas"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>The numbers in <code>{}</code> are positions in the <code>format()</code> argument list: 0 is <code>z</code> (bananas), 1 is <code>y</code> (apples), 2 is <code>x</code> (oranges). <code>\"{1} and {0} and {2}\"</code> becomes <code>apples and bananas and oranges</code>.</p>",
   "lesson": "<h4>Step 1: list the arguments by index</h4><pre><code>data.format(z, y, x)\n  index 0 -&gt; z -&gt; \"bananas\"\n  index 1 -&gt; y -&gt; \"apples\"\n  index 2 -&gt; x -&gt; \"oranges\"\n\"{1} and {0} and {2}\" -&gt; \"apples\" and \"bananas\" and \"oranges\"</code></pre><h4>Why the other options are wrong</h4><ul><li>They mix up the index-to-variable mapping, usually by reading the variable names <code>x, y, z</code> instead of the argument order <code>z, y, x</code>.</li><li><code>bananas and oranges and apples</code> would be <code>{0} and {2} and {1}</code>.</li></ul><p><strong>Exam tip:</strong> Map <code>{n}</code> to the n-th argument of <code>format()</code>, counting from 0, never to the variable names.</p>"
  },
  {
   "id": "mock-q10",
   "set": "A",
   "number": 10,
   "objective": "2.2",
   "topic": "Guessing loop with break",
   "kind": "drag",
   "images": [
    "mock-images/drive-IMG_1086.jpg"
   ],
   "prompt": "<p>You are creating a Python program that will let a user guess a number from 1 to 10. The user is allowed up to three guesses. If the user guesses the correct number, the program must stop asking for guesses.</p><p>Complete the code by moving the appropriate code segments from the list on the left to the correct locations on the right. You may use each code segment once, more than once, or not at all.</p><p>Assume <code>target</code> holds the secret number and <code>chance = 0</code> is set earlier in the program.</p><pre><code>print (\"Guess an integer from 1 to 10. You will ha...\n[Segment 1]\n    guess = int(input(\"Guess an integer: \"))\n    if guess &gt; target:\n        print (\"Guess is too high\")\n    elif guess &lt; target:\n        print (\"Guess is too low\")\n    else:\n        print (\"Guess is just right!\")\n        [Segment 2]\n    [Segment 3]</code></pre>",
   "bank": [
    "break",
    "chance = 2",
    "while chance < 3",
    "while chance <= 3:",
    "chance += 1",
    "pass",
    "while chance < 3:"
   ],
   "parts": [
    {
     "label": "Segment 1 (loop header)",
     "options": [
      "break",
      "chance = 2",
      "while chance < 3",
      "while chance <= 3:",
      "chance += 1",
      "pass",
      "while chance < 3:"
     ],
     "answer": 6
    },
    {
     "label": "Segment 2 (inside else, after the \"just right\" print)",
     "options": [
      "break",
      "chance = 2",
      "while chance < 3",
      "while chance <= 3:",
      "chance += 1",
      "pass",
      "while chance < 3:"
     ],
     "answer": 0
    },
    {
     "label": "Segment 3 (end of the loop body)",
     "options": [
      "break",
      "chance = 2",
      "while chance < 3",
      "while chance <= 3:",
      "chance += 1",
      "pass",
      "while chance < 3:"
     ],
     "answer": 4
    }
   ],
   "explanation": "<p>Three guesses with <code>chance</code> starting at 0 means <code>while chance &lt; 3:</code> (with a colon). A correct guess must stop the loop, so <code>break</code> goes in the <code>else</code> branch. <code>chance += 1</code> at the end of the body counts each wrong guess.</p>",
   "lesson": "<h4>Step 1: choose the header</h4><pre><code>chance = 0\nwhile chance &lt; 3:     # runs for chance = 0, 1, 2  -&gt; exactly 3 guesses</code></pre><h4>Step 2: stop on a correct guess, otherwise count the guess</h4><pre><code>    else:\n        print (\"Guess is just right!\")\n        break          # correct -&gt; leave the loop\n    chance += 1        # only reached after a wrong guess</code></pre><p>Verified: with target 7 and guesses 3, 7 the loop prints \"too low\", \"just right!\" and stops; with four wrong guesses it asks exactly three times.</p><h4>Why the other segments are wrong</h4><ul><li><code>while chance &lt; 3</code> has no colon: syntax error.</li><li><code>while chance &lt;= 3:</code> allows four guesses when <code>chance</code> starts at 0.</li><li><code>chance = 2</code> would leave only one guess and is an assignment, not a loop header.</li><li><code>pass</code> does nothing, so the loop would never stop on a correct guess.</li></ul><p><strong>Exam tip:</strong> The loop condition limits the guesses; <code>break</code> handles early success; the counter must change inside the loop.</p>",
   "reconstructed": "Only part of the answer area was visible: the code above the first print (target, chance initialisation) was scrolled off, indentation was approximated, and which slot is which was inferred from the slot positions.",
   "caution": "Assumes chance is initialised to 0 above the visible code (then \"while chance < 3:\" gives three guesses). If it started at 1, \"while chance <= 3:\" would be the intended header."
  },
  {
   "id": "mock-q11",
   "set": "A",
   "number": 11,
   "objective": "2.1",
   "topic": "if / else branching",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1087.jpg"
   ],
   "prompt": "<p>You develop a Python application for your company.</p><p>You need to complete the code so that the <code>print</code> statements are accurate.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p>",
   "template": "numList = [1, 2, 3, 4, 5]\nalphaList = [\"a\", \"b\", \"c\", \"d\", \"e\"]\n{{0}}\n    print(\"The values in numList are equal to alphaList\")\n{{1}}\n    print(\"The values in numList are not equal to alphaList\")",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "if numList = alphaList :",
      "if numList == alphaList :",
      "elif numList == alphaList :",
      "if numList == alphaList"
     ],
     "answer": 1
    },
    {
     "label": "Drop-down 2",
     "options": [
      "else:",
      "elif",
      "elseif"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>Comparison needs <code>==</code> (a single <code>=</code> is assignment), and the block header needs a colon. The alternative branch is <code>else:</code>, which takes no condition; <code>elif</code> needs one and <code>elseif</code> does not exist in Python.</p>",
   "lesson": "<h4>Step 1: compare the lists</h4><pre><code>numList   = [1, 2, 3, 4, 5]\nalphaList = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nnumList == alphaList   -&gt; False     # the print under \"if\" is skipped\n-&gt; else branch runs: \"...are not equal to alphaList\"</code></pre><h4>Why the wrong options fail</h4><ul><li><code>if numList = alphaList :</code>: SyntaxError, assignment is not allowed in a condition.</li><li><code>elif ...</code> cannot start an if chain; <code>elif</code> must follow an <code>if</code>.</li><li>A header without a colon is a SyntaxError.</li><li><code>elif</code> alone (no condition) and <code>elseif</code> are invalid.</li></ul><p><strong>Exam tip:</strong> <code>if</code>/<code>elif</code> take a condition; <code>else</code> takes none; every header ends with <code>:</code>.</p>",
   "reconstructed": "Drop-down 1 list was never opened (only its selected text \"if numList == alphaList :\" was visible); its three other options are invented distractors. Drop-down 2 options else:, elif, elseif were visible (first one partly hidden)."
  },
  {
   "id": "mock-q12",
   "set": "A",
   "number": 12,
   "objective": "1.3",
   "topic": "Order of operations",
   "kind": "drag",
   "images": [
    "mock-images/drive-IMG_1088.jpg"
   ],
   "prompt": "<p>You are writing a Python application that includes multiple operations on the same line of code. You need to determine the correct order of operations.</p><p>Move the type of operation from the list on the left to the correct locations on the right, with the type of operation that will be performed first at the top and the type of operation that will be performed last at the bottom.</p><p>Note: You will receive partial credit for each correct response.</p>",
   "bank": [
    "Addition and Subtraction",
    "And",
    "Exponents",
    "Multiplication and Division",
    "Parentheses",
    "Unary positive, negative"
   ],
   "parts": [
    {
     "label": "Performed first",
     "options": [
      "Addition and Subtraction",
      "And",
      "Exponents",
      "Multiplication and Division",
      "Parentheses",
      "Unary positive, negative"
     ],
     "answer": 4
    },
    {
     "label": "Second",
     "options": [
      "Addition and Subtraction",
      "And",
      "Exponents",
      "Multiplication and Division",
      "Parentheses",
      "Unary positive, negative"
     ],
     "answer": 2
    },
    {
     "label": "Third",
     "options": [
      "Addition and Subtraction",
      "And",
      "Exponents",
      "Multiplication and Division",
      "Parentheses",
      "Unary positive, negative"
     ],
     "answer": 5
    },
    {
     "label": "Fourth",
     "options": [
      "Addition and Subtraction",
      "And",
      "Exponents",
      "Multiplication and Division",
      "Parentheses",
      "Unary positive, negative"
     ],
     "answer": 3
    },
    {
     "label": "Fifth",
     "options": [
      "Addition and Subtraction",
      "And",
      "Exponents",
      "Multiplication and Division",
      "Parentheses",
      "Unary positive, negative"
     ],
     "answer": 0
    },
    {
     "label": "Performed last",
     "options": [
      "Addition and Subtraction",
      "And",
      "Exponents",
      "Multiplication and Division",
      "Parentheses",
      "Unary positive, negative"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>Python evaluates: parentheses, then exponents, then unary positive/negative, then multiplication/division, then addition/subtraction, and finally the logical <code>and</code> (comparisons and <code>not</code> sit between arithmetic and <code>and</code>).</p>",
   "lesson": "<h4>Step 1: write the table top to bottom</h4><pre><code>1  ( )                      Parentheses\n2  **                       Exponents\n3  +x  -x                   Unary positive, negative\n4  *  /  //  %              Multiplication and Division\n5  +  -                     Addition and Subtraction\n6  and                      And (lowest of these)</code></pre><h4>Common wrong placements</h4><ul><li>Unary after multiplication: remember <code>-2 ** 2</code> is <code>-4</code> because <code>**</code> goes first, but <code>-2 * 3</code> negates 2 first.</li><li><code>and</code> is last because logical operators are below arithmetic and comparisons.</li></ul><p><strong>Exam tip:</strong> PEMDAS plus unary between E and MD, and logic last: P, E, unary, MD, AS, and.</p>",
   "reconstructed": "Wording of the last bank item was clipped on screen (\"Unary positive, ne...\") and is written as \"Unary positive, negative\". The on-screen answer area was only partly filled (Parentheses, Exponents, Multiplication and Division, Addition and Subtraction), so the full six-slot order is from the verified Python precedence table."
  },
  {
   "id": "mock-q13",
   "set": "A",
   "number": 13,
   "objective": "4.2",
   "topic": "Default arguments and scope",
   "kind": "tf",
   "images": [
    "mock-images/drive-IMG_1089.jpg",
    "mock-images/setb-28.jpg"
   ],
   "prompt": "<p>You are writing a function that increments the player score in a game.</p><p>The function has the following requirements:</p><ul><li>If no value is specified for <code>points</code>, then points start at one.</li><li>If <code>bonus</code> is <code>True</code>, then <code>points</code> must be doubled.</li></ul><p>You write the following code. Line numbers are included for reference only.</p><pre><code>01 def increment_score(score, bonus, points):\n02     if bonus == True:\n03         points = points * 2\n04     score = score + points\n05     return score\n06 points = 5\n07 score = 10\n08 new_score = increment_score(score, True, points)</code></pre><p>For each statement, select True or False.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "parts": [
    {
     "label": "To meet the requirements, you must change line 01 to: <code>def increment_score(score, bonus, points = 1):</code>",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "If you do not change line 01 and the function is called with only two parameters, an error occurs.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "Line 03 will also modify the value of the variable <code>points</code> declared at line 06.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>A default value <code>points = 1</code> (placed after the required parameters) satisfies the first requirement. Without a default, calling with two parameters raises <code>TypeError: missing 1 required positional argument</code>. Inside the function, <code>points</code> is a local name, so line 03 does <em>not</em> change the global <code>points</code> (it stays 5).</p>",
   "lesson": "<h4>Step 1: test each statement</h4><pre><code>def increment_score(score, bonus, points = 1): ...   # valid: default parameter last\nincrement_score(10, True)    -&gt; points=1 -&gt; doubled 2 -&gt; 12\nincrement_score(10, False)   -&gt; 11\n\n# original line 01, two arguments:\nincrement_score(10, True)    -&gt; TypeError: missing 1 required positional argument: 'points'\n\npoints = 5; increment_score(10, True, points)\n# inside the function: points = points * 2 rebinds a LOCAL variable\nprint(points)  -&gt; 5          # the global is unchanged</code></pre><p>Verified by running each variant: the call returns 20 and the global <code>points</code> is still 5.</p><h4>Why each statement is True or False</h4><ul><li>1 is <strong>True</strong>: <code>points = 1</code> makes the argument optional and starts points at one.</li><li>2 is <strong>True</strong>: without a default, two parameters leave <code>points</code> missing.</li><li>3 is <strong>False</strong>: line 03 rebinds a local variable; the variable on line 06 is unchanged.</li></ul><p><strong>Exam tip:</strong> A default makes an argument optional; assigning to a parameter name inside a function never changes the caller's variable (for ints/strings).</p>",
   "alsoIn": "Set B · Q7"
  },
  {
   "id": "mock-q14",
   "set": "A",
   "number": 14,
   "objective": "6.1",
   "topic": "os module import",
   "kind": "mc",
   "images": [
    "mock-images/drive-IMG_1090.jpg"
   ],
   "prompt": "<p>You write the following function to read a data file and print each line of the file. Line numbers are included for reference only.</p><pre><code>01 def read_file(file):\n02   line = None\n03   if os.path.isfile(file):\n04     data = open(file,'r')\n05     for line in data:\n06       print(line)</code></pre><p>When you run the program, you receive an error on line 03.</p><p>What is causing the error?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "The <code>isfile</code> method does not accept one parameter.",
      "The <code>path</code> method does not exist in the <code>os</code> object.",
      "You need to import the <code>os</code> library.",
      "The <code>isfile</code> method does not exist in the <code>path</code> object."
     ],
     "answer": 2
    }
   ],
   "explanation": "<p>The code uses <code>os.path.isfile</code> but never runs <code>import os</code>, so line 03 raises <code>NameError: name 'os' is not defined</code>. <code>os.path.isfile(file)</code> itself is valid with one argument.</p>",
   "lesson": "<h4>Step 1: read the error location</h4><pre><code>03   if os.path.isfile(file):   # first use of the name \"os\"\nNameError: name 'os' is not defined   # a module must be imported before use</code></pre><p>Fix: add <code>import os</code> at the top.</p><h4>Why the other options are wrong</h4><ul><li><code>os.path.isfile(path)</code> takes exactly one argument.</li><li><code>os.path</code> exists and <code>isfile</code> is a function in it (also <code>exists</code>, <code>isdir</code>).</li></ul><p><strong>Exam tip:</strong> <code>NameError</code> on a module name = missing <code>import</code>.</p>",
   "caution": "A fifth, empty option box was visible below the four answers; treated as a rendering artifact."
  },
  {
   "id": "mock-q16",
   "set": "A",
   "number": 16,
   "objective": "4.1",
   "topic": "Comments in Python",
   "kind": "tf",
   "images": [
    "mock-images/drive-IMG_1091.jpg"
   ],
   "prompt": "<p>You create the following Python function to calculate the power of a number. Line numbers are included for reference only.</p><pre><code>01 # The calc_power function calculates exponents\n02 # x is the base\n03 # y is the exponent\n04 # The value of x raised to the y power is returned\n05 def calc_power(x, y):\n06     comment = \"# Return the value\"\n07     return x ** y # raise x to the y power</code></pre><p>For each statement, select True or False.</p>",
   "parts": [
    {
     "label": "Python will not check the syntax of lines 01 through 04.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "The pound sign (#) is optional for lines 02 and 03.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    },
    {
     "label": "The string in line 06 will be interpreted as a comment.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    },
    {
     "label": "Line 07 contains an inline comment.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>Everything after <code>#</code> is ignored by the interpreter, so the comment lines are not syntax-checked (True). Without <code>#</code> those lines would be code (so the # is required: False). A <code>#</code> inside a string literal is just text (False). On line 07 the part after the code is an inline comment (True).</p>",
   "lesson": "<h4>Step 1: classify each line</h4><pre><code>01-04  start with #          -&gt; comments, skipped by Python\n06     \"# Return the value\"  -&gt; a string literal assigned to comment, NOT a comment\n07     return x ** y # raise x to the y power\n                             -&gt; code, then an inline comment after #</code></pre><h4>Why each answer</h4><ul><li>1 True: comment text may be anything, e.g. \"The value of x raised to...\" is not valid Python but is never parsed.</li><li>2 False: remove the <code>#</code> and Python would try to run \"x is the base\" and raise <code>SyntaxError</code>.</li><li>3 False: a <code>#</code> inside quotes belongs to the string.</li><li>4 True: code followed by <code>#...</code> on the same line is an inline comment.</li></ul><p><strong>Exam tip:</strong> <code>#</code> starts a comment only outside of a string; it runs to the end of the line.</p>",
   "caution": "The photo showed selections True, False, False and nothing for statement 4; these match the verified answers for the first three."
  },
  {
   "id": "mock-q17",
   "set": "A",
   "number": 17,
   "objective": "3.2",
   "topic": "Formatted comma output",
   "kind": "multi",
   "images": [
    "mock-images/drive-IMG_1092.jpg",
    "mock-images/setb-11.jpg"
   ],
   "prompt": "<p>You are creating an eCommerce script that accepts input from the user and outputs the data in a comma-delimited format.</p><p>You write the following code to accept input:</p><pre><code>item = input(\"Enter the item name: \")\nsales = int(input(\"Enter the quantity: \"))</code></pre><p>The output must meet the following requirements:</p><ul><li>Enclose strings in double quotes.</li><li>Do not enclose numbers in quotes or other characters.</li><li>Separate items by commas.</li></ul><p>You need to complete the code to meet the requirements.</p><p>Which two code segments could you use? Each correct answer presents a complete solution. (Choose 2.)</p><p>Note: You will receive partial credit for each correct answer.</p>",
   "parts": [
    {
     "label": "Choose two.",
     "options": [
      "print(\"{0},{1}\".format(item, sales))",
      "print('\"{0}\",{1}'.format(item, sales))",
      "print(item + ',' + sales)",
      "print('\"' + item + '\",' , sales)"
     ],
     "answer": [
      1,
      3
     ],
     "multi": true
    }
   ],
   "explanation": "<p>Option B builds <code>\"apple\",5</code> with <code>format</code>. Option D prints the quoted item with a comma, then the number as a separate argument (print adds a space between arguments), giving <code>\"apple\", 5</code>. Option A never adds the double quotes, and option C fails because <code>sales</code> is an int.</p>",
   "lesson": "<h4>Step 1: run each option with item = \"apple\", sales = 5</h4><pre><code>A  print(\"{0},{1}\".format(item, sales))     -&gt; apple,5        (no double quotes)\nB  print('\"{0}\",{1}'.format(item, sales))   -&gt; \"apple\",5\nC  print(item + ',' + sales)               -&gt; TypeError: can only concatenate str (not \"int\") to str\nD  print('\"' + item + '\",' , sales)         -&gt; \"apple\", 5</code></pre><p>All four were run in Python 3 to confirm these results.</p><h4>Why A and C fail</h4><ul><li>A: strings must be enclosed in double quotes, but the format has none.</li><li>C: <code>str + int</code> is a <code>TypeError</code>; you would need <code>str(sales)</code>.</li></ul><p><strong>Exam tip:</strong> Check each requirement against the real output: quotes only on strings, commas between, no quotes on the number, and no type clash.</p>",
   "caution": "Option D prints a space after the comma (print's default sep). It is accepted because the requirements do not forbid spaces. Option text now taken from the clear Set B photo.",
   "alsoIn": "Set B · Q25"
  },
  {
   "id": "mock-q18",
   "set": "A",
   "number": 18,
   "objective": "2.1",
   "topic": "Nested if / elif / else",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1094.jpg",
    "mock-images/drive-IMG_1093.jpg",
    "mock-images/drive-IMG_1095.jpg"
   ],
   "prompt": "<p>You are creating a function to calculate admission fees (<code>admission_fee</code>) based on the following rules:</p><ul><li>Anyone under age 5 = free admission</li><li>Anyone age 5 or older who is in school = $10</li><li>Anyone age 5 to 17 who is not in school = $20</li><li>Anyone older than age 17 who is not in school = $50</li></ul><p><code>rate</code> represents the price in dollars.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p>",
   "template": "def admission_fee(age, school):\n    rate = 0\n    {{0}}\n        rate = 10\n    {{1}}\n        {{2}}\n            rate = 20\n        else:\n            rate = 50\n    return rate",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "if age >= 5 and school == True:",
      "if age >= 5 and school == False:",
      "elif age >= 5 and school == True:"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 2",
     "options": [
      "elif age >= 5 and school == False:",
      "else age >= 5 and school == False:",
      "elif age >= 5 and school == True:"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 3",
     "options": [
      "if age >= 5 and school == True:",
      "if age >= 5 and school == False:",
      "if age <=17:"
     ],
     "answer": 2
    }
   ],
   "explanation": "<p>Start with <code>rate = 0</code> (under 5 is free). Drop-down 1 handles in-school ages 5+; drop-down 2 (<code>elif ... == False</code>) handles everyone 5+ who is not in school; drop-down 3 splits that group with <code>if age &lt;=17:</code> (rate 20) and <code>else:</code> (rate 50).</p>",
   "lesson": "<h4>Step 1: build the chain</h4><pre><code>rate = 0\nif age &gt;= 5 and school == True:        # DD1\n    rate = 10\nelif age &gt;= 5 and school == False:     # DD2  (else has no condition!)\n    if age &lt;= 17:                      # DD3  (nested test)\n        rate = 20\n    else:\n        rate = 50\nreturn rate</code></pre><p>Verified by running: ages 4 -> 0, (10, not in school) -> 20, (17, no) -> 20, (18, no) -> 50, (40, in school) -> 10.</p><h4>Why the other options fail</h4><ul><li><code>else age >= 5 and ...:</code> is a SyntaxError because <code>else</code> takes no condition.</li><li><code>elif ... == True</code> in drop-down 2 repeats the first test and never reaches out-of-school people.</li><li>In drop-down 3, repeating an <code>age >= 5</code> test does not separate 5-17 from 18+.</li></ul><p><strong>Exam tip:</strong> <code>else</code> has no condition; split sub-cases with a nested <code>if</code> / <code>else</code>.</p>",
   "reconstructed": "Drop-down 1 list was never opened (only its selected text was visible), so options 2 and 3 are invented. The line \"rate = 50\" under else: and its indentation were hidden behind an open list and are inferred. Options for drop-downs 2 and 3 were read from photos 1093 and 1095."
  },
  {
   "id": "mock-q19",
   "set": "A",
   "number": 19,
   "objective": "2.2",
   "topic": "for loop counting",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1096.jpg"
   ],
   "prompt": "<p>A game development company needs a way to find the number of words in a list that contain a specific letter.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "def count_letter(letter, word_list):\n    count = 0\n    for {{0}}\n        if {{1}}\n            count += 1\n    return count\n\n# word_list is populated by the readWords() function. Code not shown.\nword_list = readWords()\n\nletter = input(\"Which letter would you like to count\")\nletter_count = count_letter(letter, word_list)\nprint(\"There are: \", letter_count, \" words that contain \", letter)",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "letter in word_list:",
      "word in word_list:",
      "word in letter:",
      "word_list in word:"
     ],
     "answer": 1
    },
    {
     "label": "Drop-down 2",
     "options": [
      "word in letter:",
      "letter in word:",
      "letter == word:",
      "word_list in letter:"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>Loop over each <code>word</code> in <code>word_list</code>, and count the word when the letter appears in it. <code>letter in word</code> is True when the letter is a substring of the word.</p>",
   "lesson": "<h4>Step 1: trace with letter = \"a\"</h4><pre><code>for word in word_list:       # word = \"apple\", \"banana\", \"cherry\", \"kiwi\"\n    if letter in word:       # \"a\" in \"apple\" True, \"banana\" True, \"cherry\" False, \"kiwi\" False\n        count += 1\nreturn count                 # 2</code></pre><h4>Why the other options fail</h4><ul><li><code>word in letter</code> asks whether the whole word is inside a one-letter string: almost always False.</li><li><code>letter in word_list</code> / <code>for letter in word_list</code> loops over the wrong thing (and compares to whole words).</li><li><code>letter == word</code> only matches one-letter words equal to the letter.</li></ul><p><strong>Exam tip:</strong> <code>x in y</code> reads \"x is inside y\": needle first, haystack second.</p>",
   "reconstructed": "Neither drop-down list was opened in the photos (drop-down 1 only showed its selected text \"word in word_list:\"). All wrong options are invented distractors."
  },
  {
   "id": "mock-q20",
   "set": "A",
   "number": 20,
   "objective": "5.1",
   "topic": "Fix syntax errors in while loop",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1097.jpg"
   ],
   "prompt": "<p>You find errors while evaluating the following code. Line numbers are included for reference only.</p><pre><code>01 numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n02 index = 0\n03 while (index &lt; 10)\n04     print(numbers[index])\n05\n06     if numbers(index) = 6\n07         break\n08     else :\n09         index += 1</code></pre><p>You need to correct the code at line 03 and line 06.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p>",
   "template": "Which code segment should you use at line 03? {{0}}\nWhich code segment should you use at line 06? {{1}}",
   "parts": [
    {
     "label": "Which code segment should you use at line 03?",
     "options": [
      "while (index < 10) :",
      "while [index < 10]",
      "while (index < 5) :",
      "while [index < 5]"
     ],
     "answer": 0
    },
    {
     "label": "Which code segment should you use at line 06?",
     "options": [
      "if numbers(index) == 6:",
      "if numbers[index] = 6:",
      "if numbers[index] == 6:",
      "if numbers(index) = 6:"
     ],
     "answer": 2
    }
   ],
   "explanation": "<p>Line 03 is missing its colon, so it must be <code>while (index &lt; 10) :</code> (parentheses are legal; square brackets build a list). Line 06 has two errors: elements are read with square brackets <code>numbers[index]</code>, and a comparison needs <code>==</code>, not <code>=</code>.</p>",
   "lesson": "<h4>Step 1: spot each defect</h4><pre><code>03 while (index &lt; 10)       -&gt; missing \":\"                      SyntaxError\n06 if numbers(index) = 6    -&gt; () calls a list; = assigns        TypeError / SyntaxError\nfixed:\n03 while (index &lt; 10) :\n06 if numbers[index] == 6:</code></pre><p>Verified: the corrected code prints 0 to 6 and stops at the break.</p><h4>Why the other options are wrong</h4><ul><li><code>while [index &lt; 10]</code>: a non-empty list is always truthy, so the condition never tests anything.</li><li><code>index &lt; 5</code> stops after index 4, so the 6 is never reached and printing stops too early.</li><li><code>numbers(index)</code>: <code>TypeError: 'list' object is not callable</code>.</li><li><code>numbers[index] = 6</code>: assignment in a condition is a SyntaxError.</li></ul><p><strong>Exam tip:</strong> Conditions need a trailing colon, brackets for indexing, and <code>==</code> for equality.</p>",
   "reconstructed": "The list for line 06 was hidden behind the open line-03 list and never seen; its four options are invented. The line-03 list (4 options) was read from the photo. Line 05 is blank in the original."
  },
  {
   "id": "mock-q21",
   "set": "A",
   "number": 21,
   "objective": "2.2",
   "topic": "Reverse string with while",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1098.jpg"
   ],
   "prompt": "<p>A coworker wrote a program that inputs names into a database. Unfortunately, the program reversed the letters in each name.</p><p>You need to write a Python function that outputs the characters in a name in the correct order.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "#Function reverses characters in a string.\n#returns new string in reversed order.\n\ndef reverse_name(backward_name):\n    forward_name = \"\"\n    length = {{0}}\n    while length >= 0:\n        forward_name += {{1}}\n        length = length-1\n    return forward_name\n\nprint(reverse_name(\"nohtyp\"))",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "len(backward_name)",
      "len(backward_name) - 1",
      "len(backward_name) + 1",
      "backward_name.length"
     ],
     "answer": 1
    },
    {
     "label": "Drop-down 2",
     "options": [
      "backward_name[length - 1]",
      "backward_name[length]",
      "backward_name[-length]",
      "backward_name(length)"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>Valid indexes of a string run from 0 to <code>len - 1</code>, so start <code>length</code> at <code>len(backward_name) - 1</code>, then append <code>backward_name[length]</code> while counting down to 0. For <code>\"nohtyp\"</code> this builds <code>python</code>.</p>",
   "lesson": "<h4>Step 1: trace \"nohtyp\" (length of the string is 6)</h4><pre><code>length = 6 - 1 = 5\nlength=5 -&gt; backward_name[5] = \"p\"   forward = \"p\"\nlength=4 -&gt; \"y\"  -&gt; \"py\"\nlength=3 -&gt; \"t\"  -&gt; \"pyt\"\nlength=2 -&gt; \"h\"  -&gt; \"pyth\"\nlength=1 -&gt; \"o\"  -&gt; \"pytho\"\nlength=0 -&gt; \"n\"  -&gt; \"python\"\nlength=-1 -&gt; loop ends (length &gt;= 0 is False)</code></pre><p>Verified: the combination prints <code>python</code>.</p><h4>Why the other options fail</h4><ul><li><code>len(backward_name)</code>: starts at index 6 which is out of range: <code>IndexError</code>.</li><li><code>backward_name[length - 1]</code>: shifts every index, giving <code>ythonp</code>.</li><li><code>backward_name.length</code> / <code>backward_name(length)</code>: strings have no <code>.length</code> and are not callable.</li></ul><p><strong>Exam tip:</strong> Last index = <code>len(s) - 1</code>. A <code>while length >= 0</code> loop pairs with <code>s[length]</code>.</p>",
   "reconstructed": "Neither drop-down list was opened in the photo; all options (correct and wrong) are inferred from the code. Only the surrounding code is as shown on screen."
  },
  {
   "id": "mock-q22",
   "set": "A",
   "number": 22,
   "objective": "3.1",
   "topic": "Append to a file",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1099.jpg"
   ],
   "prompt": "<p>A company needs help updating their file system. You must create a simple file-manipulation program that performs the following actions:</p><ul><li>Creates a file using the specified name.</li><li>Appends the phrase <code>\"End of listing\"</code> to the file.</li></ul><p>You need to complete the code to meet the requirements.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "import os\nfile = {{0}}\n{{1}}(\"End of listing\")\nfile.close()",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "open('myFile.txt', 'r')",
      "open('myFile.txt', 'w')",
      "open('myFile.txt', 'a')",
      "open('myFile.txt', 'x')"
     ],
     "answer": 2
    },
    {
     "label": "Drop-down 2",
     "options": [
      "append",
      "file.add",
      "file.write",
      "write"
     ],
     "answer": 2
    }
   ],
   "explanation": "<p>Mode <code>'a'</code> creates the file if it is missing and appends to the end if it exists. Text is written with the file object's <code>write</code> method: <code>file.write(...)</code>. File objects have no <code>append</code> or <code>add</code> methods.</p>",
   "lesson": "<h4>Step 1: pick the mode</h4><pre><code>'r'  read only, FileNotFoundError if missing\n'w'  create or TRUNCATE (erases old content)\n'a'  create if missing, add to the end     &lt;- required here\n'x'  create, but FileExistsError if it exists</code></pre><h4>Step 2: pick the method</h4><pre><code>file = open('myFile.txt', 'a')\nfile.write(\"End of listing\")   # file object method\nfile.close()</code></pre><p>Verified: <code>file.add</code> and <code>file.append</code> raise <code>AttributeError</code>; bare <code>write(...)</code> raises <code>NameError</code>.</p><p><strong>Exam tip:</strong> Writing text = <code>fileobject.write(text)</code>; creating or appending = mode <code>'a'</code>.</p>",
   "reconstructed": "Drop-down 1 list was never opened (only its selected text open('myFile.txt', 'a') was visible); its other options are invented. Drop-down 2 list (append, file.add, file.write, write) was visible. A hidden last line (starts with \"file\", assumed file.close()) was partly covered by the open list."
  },
  {
   "id": "mock-q23",
   "set": "A",
   "number": 23,
   "objective": "5.2",
   "topic": "try / except / finally rules",
   "kind": "tf",
   "images": [
    "mock-images/drive-IMG_1100.jpg",
    "mock-images/setb-15.jpg"
   ],
   "prompt": "<p>For each statement about <code>try</code> statements, select <strong>True</strong> or <strong>False</strong>.</p>",
   "parts": [
    {
     "label": "A <code>try</code> statement can have one or more <code>except</code> clauses.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "A <code>try</code> statement can have a <code>finally</code> clause without an <code>except</code> clause.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "A <code>try</code> statement can have a <code>finally</code> clause and an <code>except</code> clause.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "A <code>try</code> statement can have one or more <code>finally</code> clauses.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>A <code>try</code> needs at least one <code>except</code> or a <code>finally</code>. It may have many <code>except</code> clauses and may combine <code>except</code> with <code>finally</code>, but it can have only <strong>one</strong> <code>finally</code>.</p>",
   "lesson": "<h4>Step 1: shapes that are legal</h4><pre><code>try: ...                      try: ...                       try: ...\nexcept ValueError: ...        finally: ...                   except ValueError: ...\nexcept TypeError: ...                                        finally: ...\n(one or more except)          (finally alone)                (except + finally)</code></pre><h4>Step 2: the illegal shape</h4><pre><code>try: ...\nfinally: ...\nfinally: ...        # SyntaxError: invalid syntax  (only one finally allowed)</code></pre><p>Verified by compiling each shape in Python 3.</p><p><strong>Exam tip:</strong> Many <code>except</code>s are fine, <code>finally</code> is at most one; <code>try</code> alone is invalid.</p>",
   "alsoIn": "Set B · Q22"
  },
  {
   "id": "mock-q24",
   "set": "A",
   "number": 24,
   "objective": "4.2",
   "topic": "Function definitions",
   "kind": "multi",
   "images": [
    "mock-images/drive-IMG_1101.jpg"
   ],
   "prompt": "<p>A bicycle company is creating a program that allows customers to log the number of miles biked. The program will send messages based on how many miles the customer logs.</p><p>You write the following Python code. Line numbers are included for reference only.</p><pre><code>01\n02     name = input(\"What is your name? \")\n03     return name\n04\n05     calories = miles * calories_per_mile\n06     return calories\n07 distance = int(input(\"How many miles did you bike thi...\n08 burn_rate = 50\n09 biker = get_name()\n10 calories_burned = calc_calories(distance, burn_rate)\n11 print(biker, \", you burned about \", calories_burned, ...</code></pre><p>You need to define the two required functions.</p><p>Which two code segments should you use for line 01 and line 04? Each correct answer presents part of the solution. (Choose 2.)</p>",
   "parts": [
    {
     "label": "Choose two.",
     "options": [
      "01 def get_name():",
      "01 def get_name(biker):",
      "01 def get_name(name):",
      "04 def calc_calories():",
      "04 def calc_calories(miles, burn_rate):",
      "04 def calc_calories(miles, calories_per_mile):"
     ],
     "answer": [
      0,
      5
     ],
     "multi": true
    }
   ],
   "explanation": "<p><code>get_name()</code> is called with no arguments (line 09), so its definition takes none. <code>calc_calories</code> is called with two arguments (line 10) and its body uses <code>miles</code> and <code>calories_per_mile</code>, so those must be its parameter names.</p>",
   "lesson": "<h4>Step 1: match calls to definitions</h4><pre><code>09  biker = get_name()                         -&gt; def get_name():              (0 params)\n10  calc_calories(distance, burn_rate)         -&gt; 2 arguments needed\n05  calories = miles * calories_per_mile       -&gt; parameter names: miles, calories_per_mile</code></pre><p>Verified: only <code>def get_name():</code> plus <code>def calc_calories(miles, calories_per_mile):</code> runs correctly.</p><h4>Why the others fail</h4><ul><li><code>get_name(biker)</code> / <code>get_name(name)</code>: the call passes nothing: <code>TypeError: missing 1 required positional argument</code>.</li><li><code>calc_calories()</code>: <code>TypeError: takes 0 positional arguments but 2 were given</code>.</li><li><code>calc_calories(miles, burn_rate)</code>: the body uses <code>calories_per_mile</code>, which is undefined there: <code>NameError</code>.</li></ul><p><strong>Exam tip:</strong> Parameter count must match the call, and parameter names must match the names used inside the body.</p>",
   "reconstructed": "Lines 07 and 11 were cut off at the right edge of the code panel; they are shown with \"...\" where text was cut. Line 01 and 04 content is hidden by design (that is what the question asks)."
  },
  {
   "id": "mock-q25",
   "set": "A",
   "number": 25,
   "objective": "2.1",
   "topic": "Digit count with if/elif",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1103.jpg"
   ],
   "prompt": "<p>You are writing a Python program to determine if a number (<code>num</code>) the user inputs is one, two, or more than two digits (<code>digits</code>).</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p>",
   "template": "num = int(input(\"Enter a number with 1 or 2 digits: \"))\ndigits = \"0\"\n{{0}}\n    digits = \"1\"\n{{1}}\n    digits = \"2\"\n{{2}}\n    digits = \">2\"\nprint(digits + \" digits.\")",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "if num > -10 or num < 10:",
      "if num > -10 and num < 10:",
      "if num >= -10 and num <= 10:",
      "if num > 0 and num < 10:"
     ],
     "answer": 1
    },
    {
     "label": "Drop-down 2",
     "options": [
      "elif num > -100 and num < 100:",
      "elif num > -100 or num < 100:",
      "elif num >= -100 and num <= 100:",
      "elif num > 10 and num < 100:"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 3",
     "options": [
      "elif:",
      "else:",
      "else num > 100:",
      "else if:"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>One digit means <code>-10 &lt; num &lt; 10</code> (negatives count too); two digits means <code>-100 &lt; num &lt; 100</code> and not already one digit; <code>else:</code> catches the rest. Using <code>and</code> keeps the range tight, and the strict <code>&lt;</code>/<code>&gt;</code> exclude 10 and 100.</p>",
   "lesson": "<h4>Step 1: test boundary values</h4><pre><code>num =   9  -&gt; if  (-10&lt;num&lt;10)      -&gt; \"1\"\nnum =  -9  -&gt;                      -&gt; \"1\"\nnum =  10  -&gt; elif (-100&lt;num&lt;100)  -&gt; \"2\"     (10 is not &lt; 10, so it is two digits)\nnum = -99  -&gt;                      -&gt; \"2\"\nnum = 100  -&gt; else                 -&gt; \"&gt;2\"</code></pre><p>Verified by running all of these inputs.</p><h4>Why the other options fail</h4><ul><li><code>or</code> makes the test always true for any number.</li><li><code>&lt;= 10</code> would classify 10 as one digit; <code>&lt;= 100</code> would classify 100 as two.</li><li><code>num > 0 and num < 10</code> ignores negative single digits like -5.</li><li><code>else</code> cannot have a condition and <code>elif:</code> without one is a SyntaxError.</li></ul><p><strong>Exam tip:</strong> Use <code>and</code> for ranges, and test boundary values (9, 10, 99, 100, and negatives).</p>",
   "reconstructed": "Only the selected values were visible (if num > -10 and num < 10:, elif num > -100 and num < 100:, else:); none of the three lists was opened, so every distractor is invented.",
   "caution": "On screen all three selections were already the correct ones (matches the verified answers)."
  },
  {
   "id": "mock-q26",
   "set": "A",
   "number": 26,
   "objective": "5.2",
   "topic": "Handle ValueError",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1104.jpg"
   ],
   "prompt": "<p>You are creating a program that accepts user input. The program must cast the input into an integer, and properly handle the error if it cannot do so.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p>",
   "template": "while True:\n    {{0}}\n        x = int(input(\"Please enter a number: \"))\n        break\n    {{1}} ValueError:\n        print(\"Not a valid number.  Try again...\")",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "if:",
      "try:",
      "else:",
      "finally:"
     ],
     "answer": 1
    },
    {
     "label": "Drop-down 2",
     "options": [
      "catch",
      "except",
      "error",
      "finally"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>Put the risky <code>int(input(...))</code> inside <code>try:</code> and handle the failure with <code>except ValueError:</code>. On success <code>break</code> leaves the <code>while True</code> loop; on failure the message prints and the loop asks again.</p>",
   "lesson": "<h4>Step 1: trace with inputs \"abc\", then \"7\"</h4><pre><code>while True:\n    try:\n        x = int(input(\"Please enter a number: \"))   # \"abc\" -&gt; ValueError\n        break                                       # skipped on error\n    except ValueError:\n        print(\"Not a valid number.  Try again...\")  # printed, loop repeats\n# second pass: \"7\" -&gt; x = 7 -&gt; break</code></pre><p>Verified with inputs abc, 4.5, 7: two error messages, then x = 7.</p><h4>Why the other options fail</h4><ul><li><code>catch</code> is not a Python keyword (it is Java/C#).</li><li><code>if:</code>, <code>else:</code> and <code>finally:</code> cannot catch an exception by type.</li></ul><p><strong>Exam tip:</strong> <code>try</code> / <code>except ExceptionType:</code>; <code>int(\"abc\")</code> raises <code>ValueError</code>.</p>",
   "reconstructed": "Neither drop-down list was opened in the photo (both empty); all options are invented. The code around them is as shown."
  },
  {
   "id": "mock-q28",
   "set": "A",
   "number": 28,
   "objective": "2.1",
   "topic": "if / elif with compound conditions",
   "kind": "mc",
   "images": [
    "mock-images/drive-IMG_1105.jpg"
   ],
   "prompt": "<p>You write the following code to determine a student's final grade based on their current grade (<code>grade</code>) and rank (<code>rank</code>):</p><pre><code>grade = 76\nrank = 3\n\nif grade &gt; 80 and rank &gt;= 3:\n    grade += 10\nelif grade &gt;= 70 and rank &gt; 3:\n    grade += 5\nelse:\n    grade -= 5\n\nprint(grade)</code></pre><p>What value will print?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "71",
      "76",
      "81",
      "86"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p><code>grade &gt; 80</code> is False (76), so the <code>if</code> is skipped. In the <code>elif</code>, <code>grade &gt;= 70</code> is True but <code>rank &gt; 3</code> is False (rank is 3), so the whole <code>and</code> is False. The <code>else</code> runs: <code>76 - 5 = 71</code>.</p>",
   "lesson": "<h4>Step 1: evaluate each condition</h4><pre><code>grade = 76, rank = 3\nif   76 &gt; 80 and 3 &gt;= 3  -&gt; False and True  -&gt; False\nelif 76 &gt;= 70 and 3 &gt; 3  -&gt; True  and False -&gt; False\nelse                      -&gt; grade = 76 - 5 = 71</code></pre><h4>Why the other values are wrong</h4><ul><li><strong>81</strong>: you read <code>rank &gt; 3</code> as <code>&gt;=</code>; then the elif would add 5.</li><li><strong>86</strong>: you took the first branch (+10), but 76 is not above 80.</li><li><strong>76</strong>: no branch leaves grade unchanged; the <code>else</code> always subtracts 5.</li></ul><p><strong>Exam tip:</strong> Read <code>&gt;</code> vs <code>&gt;=</code> literally; one false part makes an <code>and</code> false.</p>"
  },
  {
   "id": "mock-q29",
   "set": "A",
   "number": 29,
   "objective": "6.2",
   "topic": "random.randrange / randint bounds",
   "kind": "multi",
   "images": [
    "mock-images/drive-IMG_1106.jpg"
   ],
   "prompt": "<p>You work on a team that is developing a game.</p><p>You need to write code that generates a random number that meets the following requirements:</p><ul><li>The number is a multiple of 5.</li><li>The lowest number is 5.</li><li>The highest number is 100.</li></ul><p>Which two code segments will meet the requirements? Each correct answer presents a complete solution. (Choose 2.)</p><p>Note: You will receive partial credit for each correct answer.</p>",
   "parts": [
    {
     "label": "Choose two.",
     "options": [
      "from random import randrange; print(randrange(0, 100, 5))",
      "from random import randint; print(randint(0, 20) * 5)",
      "from random import randrange; print(randrange(5, 105, 5))",
      "from random import randint; print(randint(1, 20) * 5)"
     ],
     "answer": [
      2,
      3
     ],
     "multi": true
    }
   ],
   "explanation": "<p><code>randrange(start, stop, step)</code> excludes <code>stop</code>, so <code>randrange(5, 105, 5)</code> gives 5, 10, ..., 100. <code>randint(a, b)</code> includes both ends, so <code>randint(1, 20) * 5</code> gives 5 to 100. The other two can produce 0.</p>",
   "lesson": "<h4>Step 1: list each range</h4><pre><code>A randrange(0, 100, 5)   -&gt; 0, 5, ..., 95        (can be 0, never 100)\nB randint(0, 20) * 5     -&gt; 0, 5, ..., 100       (can be 0)\nC randrange(5, 105, 5)   -&gt; 5, 10, ..., 100      &lt;- correct\nD randint(1, 20) * 5     -&gt; 5, 10, ..., 100      &lt;- correct</code></pre><p>Verified by sampling 20,000 values per option: A min 0 / max 95, B min 0, C and D min 5 / max 100.</p><p><strong>Exam tip:</strong> <code>randrange</code> stops <em>before</em> stop; <code>randint</code> includes both bounds.</p>",
   "caution": "In the real exam each option is two lines (the import, then the print); they are joined with \"; \" here because option text is shown on one line."
  },
  {
   "id": "mock-q30",
   "set": "A",
   "number": 30,
   "objective": "4.1",
   "topic": "Python comments",
   "kind": "mc",
   "images": [
    "mock-images/drive-IMG_1107.jpg"
   ],
   "prompt": "<p>You develop a Python application for your company.</p><p>You want to add notes to your code so other team members will understand it.</p><p>What should you do?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "Place the notes within <!-- and --> in any code segment.",
      "Place the notes after // on any line.",
      "Place the notes within /* and */ in any code segment.",
      "Place the notes after # on any line."
     ],
     "answer": 3
    }
   ],
   "explanation": "<p>Python has one comment syntax: <code>#</code> followed by the note, to the end of the line. <code>&lt;!-- --&gt;</code> is HTML, <code>//</code> is C-family/JavaScript, and <code>/* */</code> is C/Java; none of these are comments in Python.</p>",
   "lesson": "<h4>Step 1: what Python does with each</h4><pre><code># good note             -&gt; comment, ignored\n// note                   -&gt; SyntaxError\n/* note */                -&gt; SyntaxError\n&lt;!-- note --&gt;             -&gt; SyntaxError</code></pre><p><strong>Exam tip:</strong> Python comments: <code>#</code> only. Triple-quoted strings are docstrings/strings, not comments.</p>"
  },
  {
   "id": "mock-q31",
   "set": "A",
   "number": 31,
   "objective": "5.3",
   "topic": "unittest assertIsInstance",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1108.jpg"
   ],
   "prompt": "<p>You need to test whether an object is an instance of a specific class.</p><p>How should you set up the unit test?</p><p>Complete the code by selecting the correct option from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "{{0}} unittest\nclass TestIsInstance({{1}}):\n    def {{2}}\n        {{3}}\n\nif __name__ == '__main__':\n    unittest.main()",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "import",
      "from",
      "include",
      "using"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 2",
     "options": [
      "unittest.Test",
      "unittest.TestCase",
      "TestCase",
      "unittest.main"
     ],
     "answer": 1
    },
    {
     "label": "Drop-down 3",
     "options": [
      "isinstance_test(self):",
      "test_isinstance():",
      "test_isinstance(self):",
      "check_isinstance(self):"
     ],
     "answer": 2
    },
    {
     "label": "Drop-down 4",
     "options": [
      "self.assertInstance(3.14, float)",
      "self.assertIsInstance(3.14, float)",
      "self.assertIs(3.14, float)",
      "self.assertEqual(3.14, float)"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>A test class derives from <code>unittest.TestCase</code>. Its test method must be named <code>test_...</code> and take <code>self</code>. The assertion for class membership is <code>assertIsInstance(obj, cls)</code>. The <code>if __name__ == '__main__': unittest.main()</code> block runs the tests.</p>",
   "lesson": "<h4>Step 1: assemble and run</h4><pre><code>import unittest\nclass TestIsInstance(unittest.TestCase):\n    def test_isinstance(self):\n        self.assertIsInstance(3.14, float)\nif __name__ == '__main__':\n    unittest.main()\n# Ran 1 test ... OK</code></pre><p>Verified: this runs one test and passes; a method named <code>isinstance_test</code> runs 0 tests; <code>assertInstance</code> does not exist.</p><h4>Why the other options fail</h4><ul><li>Method names that do not start with <code>test</code> are skipped by the loader (0 tests run).</li><li><code>test_isinstance()</code> without <code>self</code> breaks when called as a method.</li><li><code>assertIs</code> and <code>assertEqual</code> compare identity/equality, they do not check class membership.</li><li><code>from</code>/<code>include</code>/<code>using</code> are not valid here.</li></ul><p><strong>Exam tip:</strong> <code>unittest.TestCase</code> + <code>test_*</code> methods + <code>assertIsInstance(obj, cls)</code>.</p>",
   "reconstructed": "Only the first drop-down showed a selected value (\"import\"); no list was opened. The three other lists (and the class under test, 3.14/float) are invented from the standard unittest pattern."
  },
  {
   "id": "mock-q32",
   "set": "A",
   "number": 32,
   "objective": "2.2",
   "topic": "Prime numbers with loops",
   "kind": "drag",
   "images": [
    "mock-images/drive-IMG_1109.jpg"
   ],
   "prompt": "<p>You are building a Python program that displays all prime numbers from 2 to 100. (A prime number is any number that is divisible only by itself and 1.)</p><p>Complete the code by moving the appropriate code segments from the list on the left to the correct locations on the right.</p><p>Note: You will receive partial credit for each correct code placement.</p><pre><code>[Segment 1]\n[Segment 2]\n    [Segment 3]\n    for i in range(2, p):\n        if p % i == 0:\n            is_prime = False\n            [Segment 4]\n    if is_prime == True:\n        print(p)\n    [Segment 5]</code></pre>",
   "bank": [
    "break",
    "continue",
    "p = p + 1",
    "p = 2",
    "is_prime = True",
    "while p <= 100:"
   ],
   "parts": [
    {
     "label": "Segment 1 (start of program)",
     "options": [
      "break",
      "continue",
      "p = p + 1",
      "p = 2",
      "is_prime = True",
      "while p <= 100:"
     ],
     "answer": 3
    },
    {
     "label": "Segment 2 (outer loop header)",
     "options": [
      "break",
      "continue",
      "p = p + 1",
      "p = 2",
      "is_prime = True",
      "while p <= 100:"
     ],
     "answer": 5
    },
    {
     "label": "Segment 3 (reset flag for each p)",
     "options": [
      "break",
      "continue",
      "p = p + 1",
      "p = 2",
      "is_prime = True",
      "while p <= 100:"
     ],
     "answer": 4
    },
    {
     "label": "Segment 4 (after is_prime = False)",
     "options": [
      "break",
      "continue",
      "p = p + 1",
      "p = 2",
      "is_prime = True",
      "while p <= 100:"
     ],
     "answer": 0
    },
    {
     "label": "Segment 5 (end of the outer loop)",
     "options": [
      "break",
      "continue",
      "p = p + 1",
      "p = 2",
      "is_prime = True",
      "while p <= 100:"
     ],
     "answer": 2
    }
   ],
   "explanation": "<p>Start at <code>p = 2</code>, loop <code>while p &lt;= 100:</code>, reset <code>is_prime = True</code> for each p, and when a divisor is found set the flag False and <code>break</code> out of the inner loop. Finally increase <code>p</code> at the end of the outer loop so it terminates.</p>",
   "lesson": "<h4>Step 1: assemble</h4><pre><code>p = 2\nwhile p &lt;= 100:\n    is_prime = True              # reset for each candidate\n    for i in range(2, p):\n        if p % i == 0:\n            is_prime = False\n            break                # stop checking once a divisor is found\n    if is_prime == True:\n        print(p)\n    p = p + 1                    # without this the loop never ends</code></pre><p>Verified: prints the 25 primes 2, 3, 5, ... 97.</p><h4>Why the other segments are wrong</h4><ul><li><code>continue</code> and <code>pass</code> in the inner loop give the same primes but waste work; <code>break</code> is the intended exit.</li><li><code>is_prime = True</code> must be inside the while body, otherwise one composite number marks all later numbers non-prime.</li><li>Missing <code>p = p + 1</code> would loop forever.</li></ul><p><strong>Exam tip:</strong> Initialise outside the loop, reset flags inside, update the loop variable at the bottom.</p>",
   "reconstructed": "The two upper slots (p = 2 and while p <= 100:) were scrolled out of view or partly hidden in the photo and are inferred from the code-segment bank and standard prime-finding structure; the bank list may have had more hidden tiles.",
   "caution": "break, continue and pass in Segment 4 all produce the same output (primes 2-97); break is the intended answer because it stops the inner loop early."
  },
  {
   "id": "mock-q35",
   "set": "A",
   "number": 35,
   "objective": "6.2",
   "topic": "random module functions",
   "kind": "dropdown",
   "images": [
    "mock-images/drive-IMG_1110.jpg",
    "mock-images/drive-IMG_1111.jpg"
   ],
   "prompt": "<p>You are writing a program to randomly assign rooms (<code>room_number</code>) and team-building groups (<code>group</code>) for a company retreat.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "room_number=1\ngroupList=[\"Ropes\",\"Rafting\",\"Obstacle\",\"Wellness\"]\ncount=0\nprint(\"Welcome to CompanyPro's Team-Building Weekend!\")\nname=input(\"Please enter your name (q to quit)? \")\nwhile name.lower() != 'q' and count < 50:\n    while room_number in roomsAssigned:\n        {{0}}\n    print(f\"{name}, your room number is {room_number}\")\n    roomsAssigned.append(room_number)\n    {{1}}\n    print(f\"{name}, you are in the {group} group this afternoon.\")\n    count+=1\n    name=input(\"Please enter your name (q to quit)? \")",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "room_number=random(1,50)",
      "room_number=random.randint(1,50)",
      "room_number=random.shuffle(1,50)",
      "room_number=random.random(1,50)"
     ],
     "answer": 1
    },
    {
     "label": "Drop-down 2",
     "options": [
      "group = random.choice(groupList)",
      "group = random.randrange(groupList)",
      "group = random.shuffle(groupList)",
      "group = random.sample(groupList)"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p><code>random.randint(1,50)</code> returns a random integer from 1 to 50 inclusive, the right call for a room number. <code>random.choice(groupList)</code> returns one random element of the list.</p>",
   "lesson": "<h4>Step 1: check each function</h4><pre><code>random.randint(1, 50)     -&gt; int 1..50 (both ends)         OK\nrandom(1, 50)             -&gt; TypeError: 'module' object is not callable\nrandom.shuffle(1, 50)     -&gt; TypeError (takes one list, shuffles it in place)\nrandom.random(1, 50)      -&gt; TypeError (takes no arguments, returns 0.0 &lt;= x &lt; 1.0)\n\nrandom.choice(groupList)  -&gt; one element, e.g. \"Rafting\"       OK\nrandom.randrange(groupList) -&gt; TypeError (needs ints)\nrandom.shuffle(groupList) -&gt; returns None (group would be None)\nrandom.sample(groupList)  -&gt; TypeError (missing the count k)</code></pre><p>All eight lines were run to confirm these results.</p><p><strong>Exam tip:</strong> <code>randint(a, b)</code> inclusive ints; <code>choice(seq)</code> one item; <code>shuffle(list)</code> in place and returns <code>None</code>; <code>sample(seq, k)</code> needs <code>k</code>.</p>",
   "reconstructed": "The two option lists were read from photos 1110 and 1111. The print text before \"group this afternoon.\" and the line count+=1 were partly hidden behind the open lists and are inferred.",
   "caution": "The visible code starts at room_number=1 and never shows import random or roomsAssigned = []; both are assumed to exist above the visible part."
  },
  {
   "id": "mock-b-q05",
   "set": "B",
   "number": 5,
   "objective": "2.1",
   "topic": "Safe division guard clauses",
   "kind": "dropdown",
   "images": [
    "mock-images/setb-31.jpg"
   ],
   "prompt": "<p>You are writing a function to perform safe division of numbers.</p><p>You need to ensure that a denominator and numerator are passed to the function and that the denominator is not zero.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p>",
   "template": "def safe_divide(numerator, denominator):\n    {{0}}\n        print(\"A required value is missing.\")\n    {{1}}\n        print(\"The denominator is zero.\")\n    else:\n        return numerator / denominator",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "if numerator is None or denominator is None:",
      "if numerator is None and denominator is None:",
      "if numerator = None or denominator = None:",
      "if numerator is None or denominator == 0:"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 2",
     "options": [
      "elif denominator == 0:",
      "if denominator == 0:",
      "elif denominator = 0:",
      "else denominator == 0:"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>The first test catches a missing value with <code>is None</code> joined by <code>or</code> (either one missing is enough). The second test must be <code>elif</code> so it only runs when both values exist, and it needs the comparison <code>==</code>, not <code>=</code>. The final <code>else</code> then divides safely.</p>",
   "lesson": "<h4>Step 1: run the finished function</h4><pre><code>def safe_divide(numerator, denominator):\n    if numerator is None or denominator is None:\n        print(\"A required value is missing.\")\n    elif denominator == 0:\n        print(\"The denominator is zero.\")\n    else:\n        return numerator / denominator\n\nsafe_divide(1, 2)     # 0.5\nsafe_divide(None, 2)  # A required value is missing.\nsafe_divide(1, 0)     # The denominator is zero.\nsafe_divide(0, 5)     # 0.0   (a zero numerator is fine)</code></pre><p>Verified by running each call.</p><h4>Why the wrong options fail</h4><ul><li><code>... and ...</code>: with <code>(None, 2)</code> the test is False, so the code reaches <code>None / 2</code> and raises <code>TypeError</code>.</li><li><code>numerator = None or ...</code>: <code>=</code> is assignment, a <code>SyntaxError</code> inside a condition.</li><li><code>... or denominator == 0</code> in the first line: a zero denominator would print the \"missing\" message, not the \"zero\" message.</li><li><code>if denominator == 0:</code> instead of <code>elif</code>: a missing value no longer stops the code, so the <code>else</code> still runs <code>None / 2</code> and crashes.</li><li><code>else denominator == 0:</code>: <code>else</code> takes no condition.</li></ul><p><strong>Exam tip:</strong> In an <code>if / elif / else</code> chain every guard after the first must be <code>elif</code>, conditions use <code>==</code> / <code>is</code>, and only <code>else</code> has no condition.</p>",
   "reconstructed": "Neither drop-down list was opened in the photo; every option (correct and wrong) is inferred from the code and the requirements. The code around the drop-downs is as shown (indentation read from the positions on screen)."
  },
  {
   "id": "mock-b-q06",
   "set": "B",
   "number": 6,
   "objective": "5.3",
   "topic": "unittest assert methods",
   "kind": "select",
   "images": [
    "mock-images/setb-30.jpg"
   ],
   "prompt": "<p>Complete the statements about <code>assert</code> methods by selecting the correct option from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "parts": [
    {
     "label": "To test that the value of variables <code>a</code> and <code>b</code> are the same, use:",
     "options": [
      "assertEqual(a, b)",
      "assertTrue(x)",
      "assertIs(a, b)",
      "assertIn(a, b)"
     ],
     "answer": 0
    },
    {
     "label": "To test that the objects <code>a</code> and <code>b</code> are the same, use:",
     "options": [
      "assertEqual(a, b)",
      "assertTrue(x)",
      "assertIs(a, b)",
      "assertIn(a, b)"
     ],
     "answer": 2
    },
    {
     "label": "To test whether a value exists in a list, use:",
     "options": [
      "assertEqual(a, b)",
      "assertTrue(x)",
      "assertIs(a, b)",
      "assertIn(a, b)"
     ],
     "answer": 3
    }
   ],
   "explanation": "<p><code>assertEqual(a, b)</code> checks <code>a == b</code> (same value). <code>assertIs(a, b)</code> checks <code>a is b</code> (the very same object). <code>assertIn(a, b)</code> checks <code>a in b</code> (membership).</p>",
   "lesson": "<h4>Step 1: match each wording to the comparison it describes</h4><pre><code>a = [1, 2]; b = [1, 2]; c = a\nassertEqual(a, b)   # passes: a == b is True  (same VALUE)\nassertIs(a, b)      # FAILS : \"[1, 2] is not [1, 2]\"  (two different objects)\nassertIs(a, c)      # passes: c is the same object as a\nassertIn(2, a)      # passes: 2 in a\nassertTrue(x)       # passes only if bool(x) is True</code></pre><p>All five calls were run with <code>unittest.TestCase</code>; the <code>assertIs</code> call on two equal but separate lists fails.</p><h4>Why the other methods fail</h4><ul><li><code>assertTrue(x)</code> takes one value and tests its truthiness; it never compares two variables.</li><li>For \"same objects\" <code>assertEqual</code> is too weak: equal values are not necessarily the same object.</li><li>For \"exists in a list\" <code>assertEqual</code> would compare the whole list to the value.</li></ul><p><strong>Exam tip:</strong> same value = <code>assertEqual</code> (<code>==</code>), same object = <code>assertIs</code> (<code>is</code>), membership = <code>assertIn</code> (<code>in</code>).</p>",
   "reconstructed": "Only the first drop-down list was opened (it showed the four methods). The lists for the other two drop-downs were hidden behind it and are assumed to offer the same four methods."
  },
  {
   "id": "mock-b-q08",
   "set": "B",
   "number": 8,
   "objective": "1.3",
   "topic": "Truncating division",
   "kind": "multi",
   "images": [
    "mock-images/setb-27.jpg"
   ],
   "prompt": "<p>A bank must generate a report that shows the average balance for all customers each day. The report must truncate the decimal portion of the balance.</p><p>Which two code segments achieve the goal? Each correct answer presents a complete solution. (Choose 2.)</p>",
   "parts": [
    {
     "label": "Choose two.",
     "options": [
      "average_balance = total_deposits**number_of_customers",
      "average_balance = int(total_deposits/number_of_customers)",
      "average_balance = float(total_deposits//number_of_customers)",
      "average_balance = total_deposits//number_of_customers"
     ],
     "answer": [
      1,
      3
     ],
     "multi": true
    }
   ],
   "explanation": "<p><code>int(a / b)</code> divides normally and then drops the decimal part, and <code>a // b</code> is floor division, which returns a whole number. <code>**</code> is the power operator, and <code>float(...)</code> turns the result back into a float with a decimal part.</p>",
   "lesson": "<h4>Step 1: try each option with total_deposits = 1005 and number_of_customers = 4</h4><pre><code>A  1005 ** 4          -&gt; 1020150500625   (power, not an average)\nB  int(1005 / 4)      -&gt; 251             (251.25 truncated)\nC  float(1005 // 4)   -&gt; 251.0           (still shows a decimal part)\nD  1005 // 4          -&gt; 251</code></pre><p>All four were run in Python 3.</p><h4>Why the wrong options fail</h4><ul><li>A: <code>**</code> raises to a power; it is not division.</li><li>C: <code>//</code> floors, but <code>float()</code> puts a <code>.0</code> back, so the value is not a truncated whole number.</li></ul><p><strong>Exam tip:</strong> Truncate with <code>int(a / b)</code> or <code>a // b</code>. For negative values they differ: <code>int(-1005 / 4)</code> is -251 but <code>-1005 // 4</code> is -252 (floor rounds down).</p>"
  },
  {
   "id": "mock-b-q09",
   "set": "B",
   "number": 9,
   "objective": "3.1",
   "topic": "File mode w+",
   "kind": "mc",
   "images": [
    "mock-images/setb-26.jpg"
   ],
   "prompt": "<p>You are developing a Python application for your school. The application must read and write data to a text file. If the file does not exist, the application must create it. If the file contains content, the application must delete the content.</p><p>Which code segment should you use?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "open(\"local_data\", \"r\")",
      "open(\"local_data\", \"w\")",
      "open(\"local_data\", \"w+\")",
      "open(\"local_data\", \"r+\")"
     ],
     "answer": 2
    }
   ],
   "explanation": "<p><code>\"w+\"</code> opens for reading and writing, creates a missing file and truncates (empties) an existing one. <code>\"w\"</code> also creates and truncates but cannot read; <code>\"r\"</code> and <code>\"r+\"</code> need the file to exist and <code>\"r+\"</code> keeps the old content.</p>",
   "lesson": "<h4>Step 1: test each mode on an existing file (\"old\") and on a missing file</h4><pre><code>mode  existing file (\"old\")           missing file\n\"r\"   read \"old\"; write -&gt; error       FileNotFoundError\n\"w\"   truncated; read -&gt; error         created\n\"w+\"  truncated; read and write OK     created        &lt;- all three requirements\n\"r+\"  read \"old\"; write OK (kept)      FileNotFoundError</code></pre><p>Each mode was run in a temporary folder to produce this table.</p><h4>Why the wrong options fail</h4><ul><li><code>\"r\"</code>: read only and the file must exist.</li><li><code>\"w\"</code>: creates and deletes content but cannot read (<code>UnsupportedOperation</code>).</li><li><code>\"r+\"</code>: reads and writes but does not create the file and does not delete existing content.</li></ul><p><strong>Exam tip:</strong> \"read and write, create, delete content\" = <code>w+</code>; \"read and write, must exist, keep content\" = <code>r+</code>; \"add to the end\" = <code>a</code>.</p>"
  },
  {
   "id": "mock-b-q10",
   "set": "B",
   "number": 10,
   "objective": "3.2",
   "topic": "Formatted table with str.format()",
   "kind": "drag",
   "images": [
    "mock-images/setb-25.jpg"
   ],
   "prompt": "<p>You are writing a function to read a data file and print the results as a formatted table. You write code to read a line of data into a list named <code>fields</code>.</p><p>The printout must be formatted to meet the following requirements:</p><ul><li>Fruit name (<code>fields[0]</code>): Left-aligned in a column 10 spaces wide.</li><li>Weight (<code>fields[1]</code>): Right-aligned in a column 5 spaces wide with one digit after the decimal point.</li><li>Price (<code>fields[2]</code>): Right-aligned in a column 7 spaces wide with two digits after the decimal point.</li></ul><p>The following shows a one-line sample of the output:</p><pre><code>Oranges     5.6   1.33</code></pre><p>Complete the code by moving the appropriate code segments from the list on the left to the correct locations on the right.</p><pre><code>print(\"[Slot 1][Slot 2][Slot 3]\".format(fields[0], eval(fields[1]), ...</code></pre>",
   "bank": [
    "{10:0}",
    "{5:1f}",
    "{7:2f}",
    "{2:7.2f}",
    "{1:5.1f}",
    "{0:10}"
   ],
   "parts": [
    {
     "label": "Slot 1 (first field in the format string)",
     "options": [
      "{10:0}",
      "{5:1f}",
      "{7:2f}",
      "{2:7.2f}",
      "{1:5.1f}",
      "{0:10}"
     ],
     "answer": 5
    },
    {
     "label": "Slot 2 (second field)",
     "options": [
      "{10:0}",
      "{5:1f}",
      "{7:2f}",
      "{2:7.2f}",
      "{1:5.1f}",
      "{0:10}"
     ],
     "answer": 4
    },
    {
     "label": "Slot 3 (third field)",
     "options": [
      "{10:0}",
      "{5:1f}",
      "{7:2f}",
      "{2:7.2f}",
      "{1:5.1f}",
      "{0:10}"
     ],
     "answer": 3
    }
   ],
   "explanation": "<p>A replacement field is <code>{index:width.precision type}</code>. The name is argument 0 and is a string, so <code>{0:10}</code> (strings are left-aligned by default). The weight is argument 1: <code>{1:5.1f}</code> (width 5, one decimal, numbers right-aligned). The price is argument 2: <code>{2:7.2f}</code>.</p>",
   "lesson": "<h4>Step 1: read each tile as index : width . decimals type</h4><pre><code>{0:10}     argument 0, width 10                 -&gt; \"Oranges   \"\n{1:5.1f}   argument 1, width 5, 1 decimal, float -&gt; \"  5.6\"\n{2:7.2f}   argument 2, width 7, 2 decimals, float -&gt; \"   1.33\"</code></pre><h4>Step 2: run the finished line</h4><pre><code>fields = [\"Oranges\", \"5.6\", \"1.33\"]\nprint(\"{0:10}{1:5.1f}{2:7.2f}\".format(fields[0], eval(fields[1]), eval(fields[2])))\nOranges     5.6   1.33</code></pre><p>Verified by running it. <code>{10:0}</code>, <code>{5:1f}</code> and <code>{7:2f}</code> each raise <code>IndexError</code> because the format call has no argument 10, 5 or 7.</p><h4>Why the other tiles fail</h4><ul><li><code>{10:0}</code>, <code>{5:1f}</code>, <code>{7:2f}</code>: the number before the colon is the argument <em>index</em>, not the width. There are only three arguments (0, 1, 2).</li><li>A <code>2</code> in <code>{2:7.2f}</code> is the index; <code>{1:5.1f}</code> is the weight, not the price.</li></ul><p><strong>Exam tip:</strong> Before the colon = which argument; after it = width, then <code>.decimals</code>, then the type (<code>f</code> float). Strings left-align, numbers right-align by default.</p>",
   "caution": "The code line ran past the right edge of the panel, so everything after eval(fields[1]), was never visible; the third argument is assumed to be fields[2] (eval(fields[2])). The sample output spacing is as produced by the correct answer."
  },
  {
   "id": "mock-b-q11",
   "set": "B",
   "number": 11,
   "objective": "2.1",
   "topic": "Letter grade if / elif chain",
   "kind": "dropdown",
   "images": [
    "mock-images/setb-24.jpg"
   ],
   "prompt": "<p>You are designing a decision structure to convert student's numeric grades (<code>grade</code>) to letter grades (<code>letter_grade</code>). The program must assign letter grades as specified in the following table.</p><table><thead><tr><th>Percentage range</th><th>Letter grade</th></tr></thead><tbody><tr><td>90 through 100</td><td>A</td></tr><tr><td>80 through 89</td><td>B</td></tr><tr><td>70 through 79</td><td>C</td></tr><tr><td>65 through 69</td><td>D</td></tr><tr><td>0 through 64</td><td>F</td></tr></tbody></table><p>Complete the code by selecting the correct code segment from each drop-down list.</p>",
   "template": "#Letter Grade Converter\ngrade = int(input(\"Enter a numeric grade\"))\n{{0}}\n    letter_grade = 'A'\n{{1}}\n    letter_grade = 'B'\n{{2}}\n    letter_grade = 'C'",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "if grade >= 90:",
      "if grade > 90:",
      "if grade <= 90:",
      "if grade == 90:"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 2",
     "options": [
      "elif grade >= 80:",
      "if grade >= 80:",
      "elif grade > 80:",
      "else grade >= 80:"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 3",
     "options": [
      "elif grade >= 70:",
      "if grade >= 70:",
      "elif grade > 70:",
      "else grade >= 70:"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>Test from the highest range down and use <code>&gt;=</code> with the lowest grade of each band: <code>if grade &gt;= 90</code>, then <code>elif grade &gt;= 80</code>, then <code>elif grade &gt;= 70</code>. Because each <code>elif</code> only runs when the earlier tests failed, the upper bound of each band is already handled.</p>",
   "lesson": "<h4>Step 1: run the chain on the boundary values</h4><pre><code>def conv(grade):\n    if grade &gt;= 90: return 'A'\n    elif grade &gt;= 80: return 'B'\n    elif grade &gt;= 70: return 'C'\n    ...\n100 A   90 A   89 B   80 B   79 C   70 C</code></pre><p>Verified by running the complete chain (with 65 for D and an <code>else</code> for F) on 100, 90, 89, 80, 79, 70, 69, 65, 64 and 0.</p><h4>Why the wrong options fail</h4><ul><li><code>&gt; 90</code> / <code>&gt; 80</code> / <code>&gt; 70</code>: the boundary grade (90, 80, 70) falls into the band below.</li><li><code>&lt;= 90</code>, <code>== 90</code>: wrong direction or only one value.</li><li>A second <code>if</code> instead of <code>elif</code> starts a new test, so 95 gets \"A\" and is then overwritten with \"B\".</li><li><code>else grade &gt;= 80:</code>: <code>else</code> never takes a condition.</li></ul><p><strong>Exam tip:</strong> Descending ranges: <code>if</code> then <code>elif</code>, test the lowest value of each band with <code>&gt;=</code>.</p>",
   "reconstructed": "The three drop-down lists were never opened; every option is inferred from the grade table. The answer pane scrolled and the lines after letter_grade = 'C' (the D and F branches) were never visible, so they are not shown.",
   "caution": "The third assignment was blurry in the photo; it is read as letter_grade = 'C'."
  },
  {
   "id": "mock-b-q13",
   "set": "B",
   "number": 13,
   "objective": "6.2",
   "topic": "random.randint vs randrange bounds",
   "kind": "multi",
   "images": [
    "mock-images/setb-23.jpg"
   ],
   "prompt": "<p>You are writing code to generate a random integer with a minimum value of 5 and a maximum value of 11.</p><p>Which two functions should you use? Each correct answer presents a complete solution. (Choose 2.)</p>",
   "parts": [
    {
     "label": "Choose two.",
     "options": [
      "random.randrange(5, 11, 1)",
      "random.randint(5, 11)",
      "random.randrange(5, 12, 1)",
      "random.randint(5, 12)"
     ],
     "answer": [
      1,
      2
     ],
     "multi": true
    }
   ],
   "explanation": "<p><code>randint(a, b)</code> includes both ends, so <code>randint(5, 11)</code> gives 5 to 11. <code>randrange(start, stop, step)</code> excludes <code>stop</code>, so you need <code>stop = 12</code>: <code>randrange(5, 12, 1)</code>.</p>",
   "lesson": "<h4>Step 1: sample each option 20,000 times</h4><pre><code>A  random.randrange(5, 11, 1)   -&gt; min 5, max 10   (11 never appears)\nB  random.randint(5, 11)        -&gt; min 5, max 11   &lt;- correct\nC  random.randrange(5, 12, 1)   -&gt; min 5, max 11   &lt;- correct\nD  random.randint(5, 12)        -&gt; min 5, max 12   (12 is too big)</code></pre><h4>Why the wrong options fail</h4><ul><li>A: <code>randrange</code> stops before 11, so the maximum is 10.</li><li>D: <code>randint</code> includes 12, one above the allowed maximum.</li></ul><p><strong>Exam tip:</strong> <code>randint</code> includes both bounds; <code>randrange</code> excludes the stop value (like <code>range</code>).</p>"
  },
  {
   "id": "mock-b-q14",
   "set": "B",
   "number": 14,
   "objective": "6.2",
   "topic": "math.fabs and math.floor",
   "kind": "multi",
   "images": [
    "mock-images/setb-22.jpg"
   ],
   "prompt": "<p>You are creating a function that manipulates a number passed into the function as a <code>float</code> value. The function must perform the following tasks:</p><ul><li>Take the absolute value of the <code>float</code>.</li><li>Remove any decimal points after the integer.</li></ul><p>Which two math functions should you use? Each correct answer is part of the solution. (Choose 2.)</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "parts": [
    {
     "label": "Choose two.",
     "options": [
      "math.fmod(x)",
      "math.floor(x)",
      "math.frexp(x)",
      "math.fabs(x)"
     ],
     "answer": [
      1,
      3
     ],
     "multi": true
    }
   ],
   "explanation": "<p><code>math.fabs(x)</code> returns the absolute value as a float, and <code>math.floor(x)</code> removes the decimals. Applied to the absolute (non-negative) value, <code>floor</code> simply cuts off the fraction.</p>",
   "lesson": "<h4>Step 1: apply the two functions to x = -7.8</h4><pre><code>math.fabs(-7.8)               -&gt; 7.8        (absolute value)\nmath.floor(math.fabs(-7.8))   -&gt; 7          (decimals removed)\nmath.fmod(-7.8)               -&gt; TypeError: fmod expected 2 arguments, got 1\nmath.frexp(-7.8)              -&gt; (-0.975, 3)  (mantissa and exponent, not what we want)</code></pre><p>All four calls were run in Python 3.</p><h4>Why the wrong options fail</h4><ul><li><code>math.fmod</code> needs two arguments (a remainder function).</li><li><code>math.frexp</code> splits a number into mantissa and exponent.</li></ul><p><strong>Exam tip:</strong> <code>fabs</code> = absolute value (float), <code>floor</code> rounds down, <code>trunc</code> drops the fraction toward zero (<code>math.trunc(-7.8)</code> is -7, <code>math.floor(-7.8)</code> is -8).</p>"
  },
  {
   "id": "mock-b-q15",
   "set": "B",
   "number": 15,
   "objective": "1.2",
   "topic": "List slicing with negative stop",
   "kind": "multi",
   "images": [
    "mock-images/setb-21.jpg"
   ],
   "prompt": "<p>You develop a Python application for your company.</p><p>A list named <code>employees</code> contains 200 employee names, the last five being company management. You need to slice the list to display all employees excluding management.</p><p>Which two code segments should you use? Each correct answer presents a complete solution. (Choose 2.)</p>",
   "parts": [
    {
     "label": "Choose two.",
     "options": [
      "employees[1:-4]",
      "employees[1:-5]",
      "employees[0:-4]",
      "employees[0:-5]",
      "employees[:-5]"
     ],
     "answer": [
      3,
      4
     ],
     "multi": true
    }
   ],
   "explanation": "<p>A negative stop counts from the end and is excluded: <code>[:-5]</code> keeps everything except the last five. A missing start is the same as <code>0</code>, so <code>[0:-5]</code> and <code>[:-5]</code> are identical. <code>[1:...]</code> would skip the first employee, and <code>-4</code> would keep one manager.</p>",
   "lesson": "<h4>Step 1: slice a list of 200 names (index 0 to 199)</h4><pre><code>employees[1:-4]   -&gt; 195 items, starts at index 1 (skips the first), ends at 195 (keeps a manager)\nemployees[1:-5]   -&gt; 194 items, skips the first employee\nemployees[0:-4]   -&gt; 196 items, includes one manager (index 195)\nemployees[0:-5]   -&gt; 195 items, index 0..194   &lt;- correct\nemployees[:-5]    -&gt; 195 items, index 0..194   &lt;- correct</code></pre><p>Checked in Python: only <code>[0:-5]</code> and <code>[:-5]</code> equal the first 195 names.</p><h4>Why the wrong options fail</h4><ul><li><code>[1:...]</code>: starts at index 1, dropping the first employee.</li><li><code>[...:-4]</code>: stops one item later, so the last manager is still included.</li></ul><p><strong>Exam tip:</strong> Remove the last <em>n</em> items with <code>[:-n]</code>; the stop index is excluded, and a missing start means 0.</p>"
  },
  {
   "id": "mock-b-q17",
   "set": "B",
   "number": 17,
   "objective": "4.1",
   "topic": "Documenting code with comments",
   "kind": "mc",
   "images": [
    "mock-images/setb-20.jpg"
   ],
   "prompt": "<p>A bank is migrating their legacy bank transaction code to Python.</p><p>The bank hires you to document the migrated code.</p><p>Which documentation syntax is correct?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "' Returns the current balance of the bank account\ndef get_balance():\n    return balance",
      "def get_balance():\n    # Returns the current balance of the bank account\n    return balance",
      "// Returns the current balance of the bank account\ndef get_balance():\n    return balance",
      "def get_balance():\n    /* Returns the current balance of the bank account\n*/\n    return balance"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>Python comments start with <code>#</code> and run to the end of the line. A leading <code>'</code>, <code>//</code> or <code>/* ... */</code> belongs to other languages (VBA/older BASIC, C/Java/JavaScript) and is a syntax error in Python.</p>",
   "lesson": "<h4>Step 1: compile each option</h4><pre><code>A  ' Returns the current ...      -&gt; SyntaxError (unterminated string literal)\nB  # Returns the current ...      -&gt; comment, function is valid        &lt;- correct\nC  // Returns the current ...     -&gt; SyntaxError\nD  /* Returns the current ... */  -&gt; SyntaxError</code></pre><p>Each option was compiled with Python 3 to confirm.</p><h4>Why the wrong options fail</h4><ul><li>A: a single quote starts a string, it does not make a comment.</li><li>C: <code>//</code> is floor division in Python, not a comment.</li><li>D: <code>/* ... */</code> is C-style block comment syntax.</li></ul><p><strong>Exam tip:</strong> Comment = <code>#</code>. (A docstring is a triple-quoted string as the first statement in the function, e.g. <code>\"\"\"Returns the balance\"\"\"</code>.)</p>",
   "caution": "Option D's closing */ sat on its own line at the left edge."
  },
  {
   "id": "mock-b-q18",
   "set": "B",
   "number": 18,
   "objective": "4.2",
   "topic": "Positional, keyword and default arguments",
   "kind": "tf",
   "images": [
    "mock-images/setb-19.jpg"
   ],
   "prompt": "<p>Review the following program. Line numbers are for reference only.</p><pre><code>01 def petStore(category, species, breed = \"none\"):\n02     print(f\"\\nYou have selected an animal from the {ca...\n03     if breed == \"none\":\n04         print(f\"The {category} you selected is a {spec...\n05     else:\n06         print(f\"The {category} you selected is a {spec...\n07\n08 category = input(\"Enter dog, cat, or bird:\")\n09 species = input(\"Enter species:\")\n10 if category == \"dog\" or category == \"cat\":\n11     breed = input(\"Enter breed:\")\n12     petStore(category, species, breed)\n13 else:\n14     petStore(category,species)\n15 petStore(breed=\"Maltese\",species=\"Canine\", category=\"c...\n16 petStore(\"bird\",species=\"Scarlet Macaw\")</code></pre><p>For each statement about the program, select True or False.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "parts": [
    {
     "label": "The function returns a value.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    },
    {
     "label": "The function calls at lines 12 and 15 are valid.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "The function calls at lines 14 and 16 will result in an error.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p>The function only prints; it has no <code>return</code>, so it returns <code>None</code>. Line 12 passes all three values by position and line 15 passes all three by keyword (order does not matter), so both are valid. Lines 14 and 16 omit only <code>breed</code>, which has the default <code>\"none\"</code>, so neither raises an error.</p>",
   "lesson": "<h4>Step 1: check each call against the signature</h4><pre><code>def petStore(category, species, breed=\"none\")   # breed is optional\n\n12  petStore(category, species, breed)                       OK  (3 positional)\n14  petStore(category, species)                              OK  (breed defaults to \"none\")\n15  petStore(breed=\"Maltese\", species=\"Canine\", category=..) OK  (keywords, any order)\n16  petStore(\"bird\", species=\"Scarlet Macaw\")                OK  (1 positional, then keyword)\n\nresult = petStore(...)   # prints, then result is None  -&gt; returns nothing</code></pre><p>Verified by running the program with <code>python3 -I</code> for the dog path and the bird path (inputs fed through stdin) with line 15 completed as <code>category=\"cat\"</code>.</p><h4>Why each statement is True or False</h4><ul><li>1 is <strong>False</strong>: a function without <code>return</code> gives back <code>None</code>.</li><li>2 is <strong>True</strong>: positional and all-keyword calls are both legal.</li><li>3 is <strong>False</strong>: <code>breed</code> has a default; a positional argument may be followed by keyword arguments.</li></ul><p><strong>Exam tip:</strong> An error needs a missing required argument, an unknown keyword, or a positional argument after a keyword argument.</p>",
   "caution": "The ends of lines 02, 04, 06 and 15 were cut off on screen (shown as \"...\"); line 15 is assumed to finish with category=\"cat\" or similar, and the print text is irrelevant to the answers. The False column header was also half hidden."
  },
  {
   "id": "mock-b-q20",
   "set": "B",
   "number": 20,
   "objective": "2.2",
   "topic": "while + for with a QUIT sentinel",
   "kind": "dropdown",
   "images": [
    "mock-images/setb-17.jpg"
   ],
   "prompt": "<p>You are writing code to meet the following requirements:</p><ul><li>Allow users to repeatedly enter words.</li><li>Output the number of characters in each word.</li></ul><p>Complete the code by selecting the correct option from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "x = \"Hello\"\n{{0}} x != \"QUIT\":\n    num = 0\n    {{1}} char {{2}} x:\n        num += 1\n    print(num)\n    x = input(\"Enter a new word or QUIT to exit: \")",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "while",
      "for",
      "if",
      "until"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 2",
     "options": [
      "for",
      "while",
      "if",
      "in"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 3",
     "options": [
      "in",
      "of",
      "on",
      "is"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>Repeating until the user types QUIT needs a <code>while</code> loop (unknown number of repeats). Counting every character of the word is a <code>for char in x:</code> loop.</p>",
   "lesson": "<h4>Step 1: trace the finished loop with the inputs Hi, abcd, QUIT</h4><pre><code>x = \"Hello\"\nwhile x != \"QUIT\":        # repeats until the word is QUIT\n    num = 0\n    for char in x:        # one pass per character\n        num += 1\n    print(num)\n    x = input(\"Enter a new word or QUIT to exit: \")\n\nHello -&gt; 5     Hi -&gt; 2     abcd -&gt; 4     QUIT -&gt; loop ends</code></pre><p>Verified by running it with those three inputs: it printed 5, 2, 4.</p><h4>Why the wrong options fail</h4><ul><li><code>for x != \"QUIT\":</code>: a <code>for</code> loop needs <code>for item in iterable:</code>, not a condition.</li><li><code>if</code>: runs once, so the user could enter only one word.</li><li><code>until</code>: Python has no <code>until</code> loop.</li><li><code>char of x</code>, <code>char on x</code>, <code>char is x</code>: only <code>in</code> belongs in a <code>for</code> header.</li></ul><p><strong>Exam tip:</strong> <code>while condition:</code> repeats while the condition is True; <code>for item in sequence:</code> walks a sequence; a string is a sequence of characters.</p>",
   "reconstructed": "None of the three drop-down lists was opened; all options (correct and wrong) are inferred from the code. Indentation was read from the positions on screen."
  },
  {
   "id": "mock-b-q21",
   "set": "B",
   "number": 21,
   "objective": "2.2",
   "topic": "while loop that escapes with break",
   "kind": "dropdown",
   "images": [
    "mock-images/setb-16.jpg"
   ],
   "prompt": "<p>You are developing a Python program for an online product distribution company.</p><p>The program must iterate through a list of products (<code>productIdList</code>) and escape when it finds a specific product ID.</p><p>Complete the code by selecting the correct code segment from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "productIdList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nindex = 0\n{{0}} (index < 10) :\n    print(productIdList[index])\n    if productIdList[index] == 6 :\n        {{1}}\n    else :\n        {{2}}",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "while",
      "for",
      "if",
      "def"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 2",
     "options": [
      "break",
      "continue",
      "pass",
      "index += 1"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 3",
     "options": [
      "index += 1",
      "break",
      "continue",
      "pass"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>The condition <code>(index &lt; 10) :</code> follows a <code>while</code>. When the ID is 6, <code>break</code> escapes the loop. Otherwise <code>index += 1</code> moves on to the next product; without it the loop would print the same item forever.</p>",
   "lesson": "<h4>Step 1: trace the loop</h4><pre><code>productIdList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nindex = 0\nwhile (index &lt; 10) :\n    print(productIdList[index])\n    if productIdList[index] == 6 :\n        break\n    else :\n        index += 1\n\nprints 0 1 2 3 4 5 6   then break -&gt; 7, 8, 9 are never printed</code></pre><p>Verified by running it: the output is 0 to 6.</p><h4>Why the wrong options fail</h4><ul><li>Drop-down 1 <code>for</code>/<code>if</code>/<code>def</code>: <code>for</code> needs <code>in</code>, <code>if</code> runs only once, <code>def</code> defines a function.</li><li>Drop-down 2 <code>continue</code>: skips to the next pass but never escapes; <code>pass</code> does nothing.</li><li>Drop-down 3 <code>break</code>: would stop on the first non-6 value; <code>continue</code>/<code>pass</code> never change <code>index</code>, so the loop never ends.</li></ul><p><strong>Exam tip:</strong> <code>break</code> = escape the loop. A <code>while</code> loop must change its variable inside the body.</p>",
   "reconstructed": "None of the three drop-down lists was opened; every option is inferred from the code and the requirement to \"escape\". Code and indentation are as shown."
  },
  {
   "id": "mock-b-q23",
   "set": "B",
   "number": 23,
   "objective": "6.1",
   "topic": "sys.argv indexing",
   "kind": "mc",
   "images": [
    "mock-images/setb-14.jpg"
   ],
   "prompt": "<p>The <code>Script.py</code> file contains the following code:</p><pre><code>import sys\nprint(sys.argv[2])</code></pre><p>You run the following command:</p><pre><code>python Script.py Cheese Bacon Bread</code></pre><p>What is the output of the command?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "Bacon",
      "Cheese",
      "Script.py",
      "Bread"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p><code>sys.argv</code> is the list of command-line arguments. Index 0 is the script name, then the arguments in order: index 1 is <code>Cheese</code>, index 2 is <code>Bacon</code>, index 3 is <code>Bread</code>.</p>",
   "lesson": "<h4>Step 1: build the list</h4><pre><code>python Script.py Cheese Bacon Bread\nsys.argv = ['Script.py', 'Cheese', 'Bacon', 'Bread']\nindex        0            1         2        3\nprint(sys.argv[2])  -&gt;  Bacon</code></pre><p>Verified by running a script with these arguments with <code>python3 -I Script.py Cheese Bacon Bread</code>, which printed <code>Bacon</code>. With too few arguments <code>sys.argv[2]</code> raises <code>IndexError</code>.</p><h4>Why the wrong options fail</h4><ul><li><code>Cheese</code>: that is <code>sys.argv[1]</code>.</li><li><code>Script.py</code>: that is <code>sys.argv[0]</code>.</li><li><code>Bread</code>: that is <code>sys.argv[3]</code>.</li></ul><p><strong>Exam tip:</strong> Index 0 is the script itself, the first real argument is index 1. All items are strings.</p>"
  },
  {
   "id": "mock-b-q24",
   "set": "B",
   "number": 24,
   "objective": "4.2",
   "topic": "Calling a function with the right arguments",
   "kind": "multi",
   "images": [
    "mock-images/setb-13.jpg"
   ],
   "prompt": "<p>Students are attending an activity night at their school. The following function tells students where to go for their activities:</p><pre><code>def roomAssignment(student, year):\n    \"\"\"Assign rooms to students\"\"\"\n    if year == 1:\n        print(f\"\\n{student.title()}, please report to ro...\n    elif year == 2:\n        print(f\"\\n{student.title()}, please report to ro...\n    elif year == 3:\n        print(f\"\\n{student.title()}, please report to roo...\n    elif year == 4:\n        print(f\"\\n{student.title()}, please report to roo...\n    elif year == 5:\n        print(f\"\\n{student.title()}, please report to roo...\n    else:\n        print(f\"\\n{student.title()}, please report to roo...</code></pre><p>Which two code segments can be used to call the function? (Choose 2.) Each correct code segment is a complete solution.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "parts": [
    {
     "label": "Choose two.",
     "options": [
      "name = input(\"What is your name?\")\ngrade=0\nwhile grade not in (1,2,3,4,5,6):\n    grade = int(input(\"What grade are you in (1-6)?\"))\nroomAssignment(name,year=grade)",
      "name = input(\"What is your name?\")\ngrade=0\nwhile grade not in (1,2,3,4,5,6):\n    grade = int(input(\"What grade are you in (1-6)?\"))\nroomAssignment(student,year)",
      "roomAssignment(\"Sherlock Sassafrass\",4)",
      "roomAssignment(year=6,name=\"Minnie George\")"
     ],
     "answer": [
      0,
      2
     ],
     "multi": true
    }
   ],
   "explanation": "<p>The parameters are named <code>student</code> and <code>year</code>. Option A passes <code>name</code> by position and <code>year</code> by keyword, and option C passes two positional values. Option B uses variables that were never defined (<code>student</code>, <code>year</code>), and option D uses a keyword <code>name</code> that does not exist.</p>",
   "lesson": "<h4>Step 1: match each call to the signature roomAssignment(student, year)</h4><pre><code>A  roomAssignment(name, year=grade)               OK   (positional + valid keyword)\nB  roomAssignment(student, year)                 NameError: name 'student' is not defined\nC  roomAssignment(\"Sherlock Sassafrass\", 4)      OK   (two positional values)\nD  roomAssignment(year=6, name=\"Minnie George\")  TypeError: roomAssignment() got an unexpected keyword argument 'name'</code></pre><p>Verified by defining the function and running each call.</p><h4>Why the wrong options fail</h4><ul><li>B: the loop builds <code>name</code> and <code>grade</code>, but the call uses <code>student</code> and <code>year</code>, which do not exist as variables.</li><li>D: keyword arguments must use the <em>parameter</em> names; there is no <code>name</code> parameter.</li></ul><p><strong>Exam tip:</strong> A call can mix positional then keyword arguments, but a keyword must match a parameter name exactly. Variable names in the caller are unrelated to parameter names.</p>",
   "caution": "The right-hand part of the print lines (after \"please report to ro...\") was cut off on screen and is shown as \"...\". The photo wrapped \"(1-6)?\" across two lines; it is read as one string."
  },
  {
   "id": "mock-b-q26",
   "set": "B",
   "number": 26,
   "objective": "2.2",
   "topic": "Nested loops: range bounds",
   "kind": "fill",
   "images": [
    "mock-images/setb-09.jpg"
   ],
   "prompt": "<p>You are writing code to create an E shape from asterisks. You need to print five lines of code, with four asterisks each on the first, third, and fifth lines and one asterisk each on the second and fourth lines, as shown.</p><pre><code>****\n*\n****\n*\n****</code></pre><p>Complete the code by typing the correct numbers in the boxes. Enter each number as an integer.</p><p>Note: You will receive partial credit for each correct entry.</p>",
   "template": "result_str=\"\"\nfor row in range(1,{{0}}):\n    for column in range(1,{{1}}):\n        if (row==1 or row==3 or row==5):\n            result_str=result_str+\"*\"\n        elif column==1:\n            result_str=result_str+\"*\"\n    result_str=result_str+\"\\n\"\nprint(result_str)",
   "parts": [
    {
     "label": "Box 1",
     "input": true,
     "answer": [
      "6"
     ]
    },
    {
     "label": "Box 2",
     "input": true,
     "answer": [
      "5"
     ]
    }
   ],
   "explanation": "<p>Five lines means <code>row</code> takes the values 1 to 5, so the stop value is 6 (<code>range(1, 6)</code>). Four columns means <code>column</code> takes 1 to 4, so the stop value is 5 (<code>range(1, 5)</code> is 1, 2, 3, 4).</p>",
   "lesson": "<h4>Step 1: stop value = last wanted value + 1</h4><pre><code>range(1, 6)  -&gt; 1, 2, 3, 4, 5   (5 rows)\nrange(1, 5)  -&gt; 1, 2, 3, 4      (4 columns)</code></pre><h4>Step 2: run the finished code</h4><pre><code>rows 1, 3, 5: every column adds \"*\"            -&gt; ****\nrows 2, 4   : only column == 1 adds \"*\"        -&gt; *\n****\n*\n****\n*\n****</code></pre><p>Verified by running every box pair: (6, 5) prints the E; (5, 4) prints only 3 asterisks per line, (6, 4) also 3, and (5, 5) gives only four lines.</p><h4>Common wrong entries</h4><ul><li>Box 1 = 5: only four rows, the last <code>****</code> is missing.</li><li>Box 2 = 4: columns 1 to 3, so each full line has three asterisks.</li></ul><p><strong>Exam tip:</strong> <code>range(1, n)</code> never reaches <code>n</code>. To get <em>k</em> passes starting at 1, the stop is <code>k + 1</code>.</p>"
  },
  {
   "id": "mock-b-q27",
   "set": "B",
   "number": 27,
   "objective": "5.1",
   "topic": "Debugging an average calculation",
   "kind": "dropdown",
   "images": [
    "mock-images/setb-08.jpg"
   ],
   "prompt": "<p>A company asks you to debug some code that is causing problems with their payroll. They ask you to find the source of the payroll errors.</p><p>The following variables have been declared:</p><pre><code>employee_pay = [15000, 120000, 35000, 45000]\ncount = 0\nsum = 0</code></pre><p>There are two errors in the following code:</p><pre><code>for index in range(0, len(employee_pay)-1)):\n    count += 1\n    sum += employee_pay[index]\naverage = sum//count\nprint(\"The total payroll is:\", sum )\nprint(\"The average salary is:\", average)</code></pre><p>Which code should you use to fix the errors?</p><p>To answer, select the appropriate code segments in the answer area.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "for index in range{{0}}\n    count += 1\n    sum += employee_pay[index]\naverage = {{1}}\nprint(\"The total payroll is:\", sum )\nprint(\"The average salary is:\", average)",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "(0, len(employee_pay)):",
      "(0, len(employee_pay)-1):",
      "(0, len(employee_pay)+1):",
      "(1, len(employee_pay)):"
     ],
     "answer": 0
    },
    {
     "label": "Drop-down 2",
     "options": [
      "sum/count",
      "sum//count",
      "sum%count",
      "sum*count"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p><code>range(0, len(employee_pay)-1)</code> stops one index too early, so the last salary is never added (and the count is 3 instead of 4); the stop value must be <code>len(employee_pay)</code>. The average should use true division <code>/</code>; <code>//</code> throws away the fraction.</p>",
   "lesson": "<h4>Step 1: compare the buggy and fixed loops</h4><pre><code>buggy:  range(0, len(employee_pay)-1)  -&gt; index 0, 1, 2   (45000 is skipped)\n        sum = 170000   count = 3\nfixed:  range(0, len(employee_pay))    -&gt; index 0, 1, 2, 3\n        sum = 215000   count = 4   average = 215000 / 4 = 53750.0</code></pre><p>Verified by running both versions. With these particular numbers <code>215000 // 4</code> is also 53750, but <code>//</code> truncates in general (for example <code>1005 // 4</code> is 251, while <code>1005 / 4</code> is 251.25), so true division is the correct fix.</p><h4>Why the wrong options fail</h4><ul><li><code>(0, len(employee_pay)-1):</code> keeps the off-by-one error.</li><li><code>(0, len(employee_pay)+1):</code> reaches index 4 and raises <code>IndexError</code>.</li><li><code>(1, len(employee_pay)):</code> skips the first salary.</li><li><code>sum%count</code> is the remainder; <code>sum*count</code> multiplies.</li></ul><p><strong>Exam tip:</strong> <code>range(0, len(items))</code> visits every index; <code>-1</code> drops the last one. Averages use <code>/</code>.</p>",
   "reconstructed": "Neither drop-down list was opened, so all options (correct and wrong) are inferred from the code; the two errors were identified as the off-by-one range stop and the // division.",
   "caution": "The original code on screen reads range(0, len(employee_pay)-1)): with one closing parenthesis too many; it is reproduced exactly as shown. The answer area in the exam shows \"for index in range\" followed directly by the first drop-down."
  },
  {
   "id": "mock-b-q28",
   "set": "B",
   "number": 28,
   "objective": "5.1",
   "topic": "Dictionary keys vs input() string",
   "kind": "select",
   "images": [
    "mock-images/setb-07.jpg"
   ],
   "prompt": "<p>You create the following program to locate a conference room and display the room name. Line numbers are included for reference only.</p><pre><code>01 rooms = {1: 'Foyer', 2: 'Conference Room'}\n02 room = input('Enter the room number: ')\n03 if not room in rooms:\n04     print('Room does not exist.')\n05 else:\n06     print(\"The room name is \" + rooms[room])</code></pre><p>Colleagues report that the program output is <code>Room does not exist.</code> when the value 1 or 2 is entered.</p><p>You need to troubleshoot the program. Evaluate the code and answer the questions by selecting the correct option from each drop-down list.</p>",
   "parts": [
    {
     "label": "Which two data types are stored in the <code>rooms</code> dictionary at line 01?",
     "options": [
      "int and str",
      "str and str",
      "int and int",
      "str and int"
     ],
     "answer": 0
    },
    {
     "label": "What is the data type of <code>room</code> at line 02?",
     "options": [
      "str",
      "int",
      "float",
      "bool"
     ],
     "answer": 0
    },
    {
     "label": "Why does line 03 fail to find the rooms?",
     "options": [
      "The keys are int but room is a str, so \"1\" is not the key 1",
      "The in operator cannot be used with a dictionary",
      "not room in rooms is invalid syntax",
      "Dictionary keys must be strings"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>The dictionary keys are the integers 1 and 2 and the values are strings. <code>input()</code> always returns a string, so typing 1 gives <code>\"1\"</code>. The key <code>1</code> and the string <code>\"1\"</code> are different values, so <code>room in rooms</code> is False.</p>",
   "lesson": "<h4>Step 1: types at each line</h4><pre><code>01 rooms = {1: 'Foyer', 2: 'Conference Room'}    keys: int, int    values: str, str  -&gt; \"int and str\"\n02 room = input(...)   typed 1                   room = \"1\"        type str\n03 \"1\" in rooms        -&gt; False   (the keys are the ints 1 and 2)\n   1   in rooms        -&gt; True\n   int(\"1\") in rooms  -&gt; True</code></pre><p>Verified by running the program with <code>python3 -I</code> and the input <code>1</code>: it prints <code>Room does not exist.</code> and <code>type(room)</code> is <code>str</code>.</p><h4>Why the other reasons are wrong</h4><ul><li><code>in</code> works on dictionaries: it tests the keys.</li><li><code>not room in rooms</code> is valid and means <code>not (room in rooms)</code>.</li><li>Dictionary keys can be ints, strings, tuples; they only need to be hashable and must match type to be found.</li></ul><p><strong>Exam tip:</strong> Fix it with <code>room = int(input(...))</code>. Whenever <code>input()</code> feeds a lookup or arithmetic, convert the type first.</p>",
   "reconstructed": "None of the three drop-down lists was opened; all options (correct and wrong) are inferred from the code. The last sentence of the instruction pane was cut off at the bottom of the scroll area; \"You need to troubleshoot the program. Evaluate the code and answer the questions by selecting the correct option from...\" is partly read and completed with the standard Pearson wording."
  },
  {
   "id": "mock-b-q29",
   "set": "B",
   "number": 29,
   "objective": "6.1",
   "topic": "datetime date and weekday",
   "kind": "select",
   "images": [
    "mock-images/setb-06.jpg"
   ],
   "prompt": "<p>You are writing a program to display special offers for My Healthy Eats Delivery. Line numbers are for reference only.</p><pre><code>01 import datetime\n02 dailySpecials=(\"Spaghetti\",\"Macaroni &amp; Cheese\",\"Meatl...\n03 weekendSpecials=(\"Lobster\",\"Prime Rib\",\"Parmesan-Crus...\n04\n05\n06 print(\"My Healthy Eats Delivery\")\n07 if today == \"Friday\" or today ==\"Saturday\" or today =...\n08     print(\"The weekend specials include:\")\n09     for item in weekendSpecials:\n10         print(item)\n11 else:\n12     print(\"The weekday specials include: \")\n13     for item in dailySpecials:\n14         print(item)\n15\n16 print(f\"Pricing specials change in {daysLeft} days\")</code></pre><p>Complete the code in lines 04, 05, and 15 by selecting the correct option from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "parts": [
    {
     "label": "In line 04, retrieve the current date.",
     "options": [
      "current_date = datetime.date.today()",
      "current_date = datetime.today()",
      "current_date = datetime.now()",
      "current_date = datetime.date()"
     ],
     "answer": 0
    },
    {
     "label": "In line 05, retrieve the weekday.",
     "options": [
      "today = current_date.strftime(\"%A\")",
      "today = current_date.weekday()",
      "today = current_date.day",
      "today = current_date.strftime(\"%a\")"
     ],
     "answer": 0
    },
    {
     "label": "In line 15, calculate the number of days left in the week.",
     "options": [
      "daysLeft = 6 - current_date.weekday()",
      "daysLeft = current_date.weekday() - 6",
      "daysLeft = 7 - current_date.day",
      "daysLeft = 6 + current_date.weekday()"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p><code>datetime.date.today()</code> returns today's date. <code>strftime(\"%A\")</code> turns it into the full weekday name, which is what line 07 compares with <code>\"Friday\"</code>. <code>weekday()</code> counts Monday = 0 to Sunday = 6, so the days left after today are <code>6 - weekday()</code>.</p>",
   "lesson": "<h4>Step 1: try the calls on a known date (Friday 20 Nov 2026)</h4><pre><code>d = datetime.date(2026, 11, 20)\nd.strftime(\"%A\")   -&gt; 'Friday'     (full name, matches \"Friday\")\nd.strftime(\"%a\")   -&gt; 'Fri'        (abbreviation, would never equal \"Friday\")\nd.weekday()        -&gt; 4            (Mon=0 ... Sun=6, an int, not a name)\n6 - d.weekday()    -&gt; 2            (Sat and Sun remain)\ndatetime.today()   -&gt; AttributeError: module 'datetime' has no attribute 'today'</code></pre><p>Verified by running each call. Because the program does <code>import datetime</code>, the class is reached as <code>datetime.date.today()</code> or <code>datetime.datetime.now()</code>.</p><h4>Why the wrong options fail</h4><ul><li><code>datetime.today()</code> / <code>datetime.now()</code>: those are class methods; the module itself has no <code>today</code> or <code>now</code>.</li><li><code>weekday()</code> and <code>.day</code>: return ints, so <code>today == \"Friday\"</code> is never True.</li><li><code>\"%a\"</code> gives <code>Fri</code>, not <code>Friday</code>.</li><li><code>weekday() - 6</code> is negative; <code>6 + weekday()</code> grows with the day.</li></ul><p><strong>Exam tip:</strong> <code>%A</code> = full weekday name, <code>%a</code> = short, <code>weekday()</code> = number with Monday = 0.</p>",
   "reconstructed": "None of the three drop-down lists was opened; all options are inferred from the code and the instructions (including the variable name current_date, which was not visible). Lines 02, 03 and 07 ran past the edge of the code panel and are shown with \"...\" where text was cut off."
  },
  {
   "id": "mock-b-q30",
   "set": "B",
   "number": 30,
   "objective": "3.2",
   "topic": "Reading input into a variable",
   "kind": "mc",
   "images": [
    "mock-images/setb-05.jpg"
   ],
   "prompt": "<p>You are developing a Python application for your company.</p><p>You need to accept input from the user and print that information to the user's screen.</p><p>You start with the following code. Line numbers are included for reference only.</p><pre><code>01 print(\"What is your name?\")\n02\n03 print(name)</code></pre><p>Which code should you write at line 02?</p>",
   "parts": [
    {
     "label": "Select one answer",
     "options": [
      "name = input",
      "name = input()",
      "input(\"name\")",
      "input(name)"
     ],
     "answer": 1
    }
   ],
   "explanation": "<p><code>input()</code> must be <em>called</em> (with parentheses) and its result stored in <code>name</code>, because line 03 prints <code>name</code>.</p>",
   "lesson": "<h4>Step 1: run each option and then print(name)</h4><pre><code>name = input      -&gt; name is the function object itself: prints &lt;built-in function input&gt;\nname = input()    -&gt; waits for typing; name holds the text   &lt;- correct\ninput(\"name\")     -&gt; asks with the prompt \"name\", but the answer is discarded -&gt; NameError on name\ninput(name)       -&gt; NameError: name 'name' is not defined (used before it exists)</code></pre><p>Verified by running each option with <code>python3 -I</code>.</p><h4>Why the wrong options fail</h4><ul><li>No parentheses means no call, only a reference to the function.</li><li>Without <code>name =</code> the value typed in is thrown away.</li></ul><p><strong>Exam tip:</strong> <code>variable = input(\"prompt\")</code>; the argument is only the prompt text, and the result is always a string.</p>"
  },
  {
   "id": "mock-b-q32",
   "set": "B",
   "number": 32,
   "objective": "1.3",
   "topic": "is vs ==",
   "kind": "select",
   "images": [
    "mock-images/setb-04.jpg"
   ],
   "prompt": "<p>You are developing a Python application for your company. You write the following code:</p><pre><code>numList = [1, 2, 3, 4, 5]\nalphaList = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nprint(numList is alphaList)\nprint(numList == alphaList)\nnumList = alphaList\nprint(numList is alphaList)\nprint(numList == alphaList)</code></pre><p>Evaluate the code and answer the questions by selecting the correct option from each drop-down list.</p>",
   "parts": [
    {
     "label": "What is displayed after the first print?",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    },
    {
     "label": "What is displayed after the second print?",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    },
    {
     "label": "What is displayed after the third print?",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "What is displayed after the fourth print?",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p><code>is</code> tests whether two names refer to the same object; <code>==</code> tests whether the values are equal. At first the lists are different objects with different contents (False, False). After <code>numList = alphaList</code> both names point to one object (True, True).</p>",
   "lesson": "<h4>Step 1: trace the four prints</h4><pre><code>numList   = [1, 2, 3, 4, 5]\nalphaList = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nnumList is alphaList     -&gt; False   (two different list objects)\nnumList == alphaList     -&gt; False   (different contents)\nnumList = alphaList      # numList now refers to the same object as alphaList\nnumList is alphaList     -&gt; True\nnumList == alphaList     -&gt; True</code></pre><p>Verified by running the code: False, False, True, True.</p><h4>Why the other answers fail</h4><ul><li>Print 1 and 2 as True: that needs the same object or equal contents.</li><li>Print 2 would be True for two separate but equal lists (<code>[1,2] == [1,2]</code>), but <code>is</code> would still be False for them.</li></ul><p><strong>Exam tip:</strong> Assignment copies the <em>reference</em>, not the list. <code>a = b</code> makes <code>a is b</code> True; <code>==</code> compares values only.</p>",
   "reconstructed": "The four drop-down lists were closed in the photo; their options are assumed to be True and False."
  },
  {
   "id": "mock-b-q33",
   "set": "B",
   "number": 33,
   "objective": "5.2",
   "topic": "try / except / finally structure",
   "kind": "drag",
   "images": [
    "mock-images/setb-03.jpg"
   ],
   "prompt": "<p>You need to write code that performs the following tasks:</p><ul><li>Call the <code>process()</code> function.</li><li>If the <code>process()</code> function throws an error, call the <code>logError()</code> function.</li><li>Always call the <code>displayResult()</code> function after calling the <code>process()</code> function.</li></ul><p>Complete the code by moving the appropriate code segments from the list on the left to the correct locations on the right. You may use each code segment once, more than once, or not at all.</p>",
   "bank": [
    "assert:",
    "except:",
    "finally:",
    "raise:",
    "try:"
   ],
   "parts": [
    {
     "label": "Line before <code>process()</code>",
     "options": [
      "assert:",
      "except:",
      "finally:",
      "raise:",
      "try:"
     ],
     "answer": 4
    },
    {
     "label": "Line before <code>logError()</code>",
     "options": [
      "assert:",
      "except:",
      "finally:",
      "raise:",
      "try:"
     ],
     "answer": 1
    },
    {
     "label": "Line before <code>displayResult()</code>",
     "options": [
      "assert:",
      "except:",
      "finally:",
      "raise:",
      "try:"
     ],
     "answer": 2
    }
   ],
   "explanation": "<p><code>try:</code> wraps the risky call, <code>except:</code> runs only if it raises an error, and <code>finally:</code> always runs, error or not.</p>",
   "lesson": "<h4>Step 1: build the structure</h4><pre><code>try:\n    process()\nexcept:\n    logError()\nfinally:\n    displayResult()</code></pre><h4>Step 2: check both outcomes</h4><pre><code>process() succeeds  -&gt; (except skipped)  -&gt; displayResult()\nprocess() raises    -&gt; logError()        -&gt; displayResult()</code></pre><p>Verified by running it with a <code>process()</code> that raises an error: the output was the log line, then the display line.</p><h4>Why the other segments fail</h4><ul><li><code>assert:</code> is a statement (<code>assert condition</code>), not a clause, and it cannot take a colon alone.</li><li><code>raise:</code>: <code>raise</code> throws an exception, it does not catch one, and has no colon form.</li></ul><p><strong>Exam tip:</strong> <code>try</code> = attempt, <code>except</code> = on error, <code>finally</code> = always. Only these three are clause keywords.</p>"
  },
  {
   "id": "mock-b-q34",
   "set": "B",
   "number": 34,
   "objective": "3.1",
   "topic": "File append mode",
   "kind": "tf",
   "images": [
    "mock-images/setb-02.jpg"
   ],
   "prompt": "<p>Review the following code segment:</p><pre><code>f = open(\"python.txt\", \"a\")\nf.write(\"This is a line of text.\")\nf.close()</code></pre><p>For each statement about the code segment, select True or False.</p>",
   "parts": [
    {
     "label": "A file named <code>python.txt</code> is created if it does not exist.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    },
    {
     "label": "The data in the file will be overwritten.",
     "options": [
      "True",
      "False"
     ],
     "answer": 1
    },
    {
     "label": "Other code can open the file after this code runs.",
     "options": [
      "True",
      "False"
     ],
     "answer": 0
    }
   ],
   "explanation": "<p>Mode <code>\"a\"</code> appends: it creates the file when missing and adds the text at the end without erasing what is there. <code>f.close()</code> releases the file, so other code can open it afterwards.</p>",
   "lesson": "<h4>Step 1: run the code twice in an empty folder</h4><pre><code>open(\"python.txt\", \"a\") ... write(\"This is a line of text.\") ... close()\nfile did not exist before -&gt; now exists                      (statement 1 True)\nrun again with write(\"Second\")\nfile content: This is a line of text.Second                  (old data kept, statement 2 False)\nthe file is closed -&gt; open(\"python.txt\") works afterwards     (statement 3 True)</code></pre><p>Verified in a temporary directory.</p><h4>Why each statement is True or False</h4><ul><li>1 True: <code>a</code> creates a missing file (so does <code>w</code>); <code>r</code> would raise <code>FileNotFoundError</code>.</li><li>2 False: overwriting is what <code>\"w\"</code> does.</li><li>3 True: after <code>close()</code> the file is free. (Forgetting <code>close()</code> keeps it open; <code>with open(...)</code> closes it automatically.)</li></ul><p><strong>Exam tip:</strong> <code>w</code> = erase and write, <code>a</code> = add to the end, <code>r</code> = read only, must exist.</p>"
  },
  {
   "id": "mock-b-q35",
   "set": "B",
   "number": 35,
   "objective": "3.1",
   "topic": "Checking that a file exists",
   "kind": "dropdown",
   "images": [
    "mock-images/setb-01.jpg"
   ],
   "prompt": "<p>A company needs help updating their file system. You must create a simple file-manipulation program that performs the following actions:</p><ul><li>Checks to see whether a file exists.</li><li>If the file exists, displays its contents.</li></ul><p>Complete the code by selecting the correct code segment from each drop-down list.</p><p>Note: You will receive partial credit for each correct selection.</p>",
   "template": "import os\nif {{0}}",
   "parts": [
    {
     "label": "Drop-down 1",
     "options": [
      "isfile('myFile.txt'):",
      "os.exist('myFile.txt'):",
      "os.find('myFile.txt'):",
      "os.path.isfile('myFile.txt'):"
     ],
     "answer": 3
    }
   ],
   "explanation": "<p>The check is <code>os.path.isfile(...)</code>: <code>isfile</code> lives in <code>os.path</code>, so it must be called with that prefix after <code>import os</code>.</p>",
   "lesson": "<h4>Step 1: test each option</h4><pre><code>import os\nos.path.isfile('myFile.txt')   -&gt; False if missing, True if the file exists   &lt;- correct\nisfile('myFile.txt')           -&gt; NameError: name 'isfile' is not defined\nos.exist('myFile.txt')         -&gt; AttributeError: module 'os' has no attribute 'exist'\nos.find('myFile.txt')          -&gt; AttributeError: module 'os' has no attribute 'find'</code></pre><p>Each call was run in Python 3 (with a temporary file created and removed).</p><h4>Why the wrong options fail</h4><ul><li><code>isfile(...)</code>: not imported by <code>import os</code>.</li><li><code>os.exist</code> and <code>os.find</code>: those functions do not exist. The real ones are <code>os.path.exists()</code> (file or folder) and <code>os.path.isfile()</code> (a regular file).</li></ul><p><strong>Exam tip:</strong> <code>os.path.isfile(p)</code> / <code>os.path.exists(p)</code> / <code>os.path.isdir(p)</code>. A missing <code>import os</code> is a NameError.</p>",
   "caution": "The drop-down list was open in the photo and all four options were readable, but the code below the \"if\" line was hidden behind the list, so only \"import os\" and the \"if\" line are shown."
  }
 ],
 "cheatsheet": [
  {
   "heading": "Operator precedence (high to low)",
   "html": "<table><thead><tr><th>Level</th><th>Operators</th><th>Notes</th></tr></thead><tbody><tr><td>1</td><td><code>( )</code></td><td>parentheses first</td></tr><tr><td>2</td><td><code>**</code></td><td>right-associative: <code>2**3**2 = 512</code>; <code>-2**2 = -4</code>; <code>2**-1 = 0.5</code></td></tr><tr><td>3</td><td><code>+x  -x</code> (unary)</td><td>binds looser than <code>**</code> on its left</td></tr><tr><td>4</td><td><code>*  /  //  %</code></td><td>left to right; <code>//</code> and <code>%</code> floor: <code>-7//2 = -4</code>, <code>-7%2 = 1</code></td></tr><tr><td>5</td><td><code>+  -</code></td><td>left to right</td></tr><tr><td>6</td><td><code>== != &lt; &gt; &lt;= &gt;= is in</code></td><td>chains: <code>1 &lt; 2 &lt; 3</code> is True</td></tr><tr><td>7</td><td><code>not</code></td><td></td></tr><tr><td>8</td><td><code>and</code></td><td>then <code>or</code> (lowest): <code>True or False and False</code> is True</td></tr></tbody></table><pre><code>9 % 4 * 10 // 2.0 ** 3.0 + 4   # 5.0  (float operand makes // return float)\n7 // 2 = 3   7 / 2 = 3.5   7.5 // 2 = 3.0</code></pre><p>Truncate vs floor: <code>int(1005/4)</code> and <code>1005//4</code> are both 251, but <code>int(-1005/4)</code> is -251 while <code>-1005//4</code> is -252. <code>float(1005//4)</code> is <code>251.0</code> (still has a decimal part).</p>"
  },
  {
   "heading": "Slicing and indexing",
   "html": "<p><code>s[start:stop:step]</code>: start included, stop excluded, missing start = 0, missing stop = end. Length of <code>s[a:b]</code> is <code>b-a</code>.</p><pre><code>alph = \"abcdefghijklmnopqrstuvwxyz\"\nalph[3:6]   # 'def'        alph[:6]    # 'abcdef'\nalph[-3:]   # 'xyz'        alph[::-1][:3] # 'zyx'\nalph[::5]   # 'afkpuz'     alph[3:6:2] # 'df'\nalph[20:100] # 'uvwxyz' (slices never raise)   alph[5:2] # ''\nalph[100]   # IndexError (indexing does)</code></pre><ul><li>Strings and tuples are immutable; lists can be changed.</li><li><code>s[-1]</code> is the last item.</li></ul><pre><code>emp = list(range(200))\nemp[:-5]    # first 195 items (drops the last five); same as emp[0:-5]\nemp[1:-5]   # also skips the first item     emp[0:-4] # keeps one extra item\nemp[-3:]    # last three</code></pre><p>A negative stop counts from the end and is excluded.</p>"
  },
  {
   "heading": "type() of literals",
   "html": "<table><thead><tr><th>Expression</th><th>type</th></tr></thead><tbody><tr><td><code>5</code>, <code>2**2</code>, <code>int(\"5\")</code>, <code>4//2</code>, <code>3+True</code></td><td>int</td></tr><tr><td><code>5.0</code>, <code>1E10</code>, <code>+1E10</code>, <code>1e-3</code>, <code>5/5</code>, <code>4.0//2</code>, <code>2**-1</code></td><td>float</td></tr><tr><td><code>\"True\"</code>, <code>\"5\"</code>, <code>input()</code> result</td><td>str</td></tr><tr><td><code>True</code>, <code>False</code>, <code>5 == 5.0</code></td><td>bool</td></tr><tr><td><code>None</code> / <code>[]</code> / <code>()</code> / <code>{}</code> / <code>{1}</code></td><td>NoneType / list / tuple / dict / set</td></tr></tbody></table><p>Conversions: <code>int(3.9)=3</code>, <code>int(-3.9)=-3</code>, <code>int(\"3.5\")</code> is a ValueError, <code>bool(\"False\")</code> is True.</p><p>Dictionary keys must match by type: with <code>rooms = {1: \"Foyer\"}</code>, <code>1 in rooms</code> is True but <code>\"1\" in rooms</code> is False. <code>input()</code> returns <code>str</code>, so use <code>int(input())</code> before looking up an int key.</p>"
  },
  {
   "heading": "Truthiness",
   "html": "<p>Falsy: <code>0, 0.0, \"\", [], (), {}, set(), None, False</code>. Everything else is truthy, including <code>\"0\"</code>, <code>\"False\"</code>, <code>[0]</code> and <code>[index &lt; 10]</code>.</p><pre><code>0 or \"x\"      # \"x\"   (or returns first truthy operand)\n\"a\" and \"b\"   # \"b\"   (and returns first falsy, else last)\n[] or [1]     # [1]</code></pre><h4><code>is</code> vs <code>==</code></h4><pre><code>a = [1, 2]; b = [1, 2]; c = a\na == b   # True   (equal values)\na is b   # False  (two different objects)\na is c   # True   (same object; \"c = a\" copies the reference)</code></pre>"
  },
  {
   "heading": "Strings, formatting and print()",
   "html": "<pre><code>\"hello world\".title()   # 'Hello World'   \" hi \".strip() # 'hi'\n\"a,b\".split(\",\")        # ['a','b']        \"-\".join([\"a\",\"b\"]) # 'a-b'\n\"abc\".find(\"z\")         # -1               \"abc\".index(\"z\")    # ValueError\n\"abca\".count(\"a\")       # 2                \"abc\".replace(\"b\",\"X\") # 'aXc'\n\"ab\" * 2                # 'abab'           \"a\" + 1             # TypeError\nx = 3.14159; n = 42\nf\"{x:.2f}\" # 3.14   f\"{n:&gt;6}\" # '    42'   f\"{n:06}\" # 000042   f\"{1234567:,}\" # 1,234,567\n\"{1} and {0}\".format(\"a\",\"b\")   # 'b and a'  (index = argument position)\nprint(\"a\",\"b\",sep=\"-\")  # a-b       print(\"a\",end=\"!\")  # no newline</code></pre><ul><li><code>print(a, b)</code> puts a space between arguments (default <code>sep=\" \"</code>).</li><li><code>input()</code> always returns <code>str</code>.</li></ul><pre><code>\"{0:10}{1:5.1f}{2:7.2f}\".format(\"Oranges\", 5.6, 1.33)   # 'Oranges     5.6   1.33'\n# {index:width.decimals type}  index = which argument; strings left-align, numbers right-align\n\"{:&lt;10}|{:&gt;5.1f}\".format(\"ab\", 5.6)   # explicit alignment</code></pre><p>The number before the colon is the argument index, not the width (<code>{10:0}</code> is an IndexError with three arguments).</p>"
  },
  {
   "heading": "range()",
   "html": "<pre><code>list(range(5))        # [0,1,2,3,4]      stop is excluded\nlist(range(2,5))      # [2,3,4]\nlist(range(5,0,-1))   # [5,4,3,2,1]\nlist(range(1,10,3))   # [1,4,7]\nlist(range(0)) , list(range(5,2)) , list(range(0,10,-1))   # all []\nrange(0,5,0)          # ValueError (step 0)\nlen(range(3,10)) = 7  # stop - start</code></pre><pre><code>for row in range(1, 6):        # rows 1..5   (stop = last + 1)\n    for column in range(1, 5): # columns 1..4\n        ...</code></pre><p>Nested loops: the inner loop restarts for every outer pass; stop values are excluded.</p>"
  },
  {
   "heading": "Loops: break, continue, else, pass",
   "html": "<pre><code>for i in range(3):\n    if i == 1: break\nelse:\n    print(\"only if the loop did NOT break\")   # not printed here\nfor i in range(5):\n    if i % 2: continue      # skip odd i\n    print(i)                # 0 2 4\nwhile cond: ...             # while-else also exists\npass                        # does nothing (placeholder)</code></pre><ul><li><code>break</code> leaves only the innermost loop.</li><li>A counter must change inside a <code>while</code> or it never ends.</li></ul><pre><code>index = 0\nwhile index &lt; 10:           # unknown repeat count -&gt; while\n    if ids[index] == 6: break\n    else: index += 1       # without this the loop never ends\nfor char in word: ...      # for needs \"in\"; no until loop in Python</code></pre>"
  },
  {
   "heading": "Functions",
   "html": "<pre><code>def f(a, b=2, c=3): return a, b, c\nf(1)            # (1,2,3)        f(1, c=9)  # (1,2,9)   f(b=5, a=0) # (0,5,3)\nf()             # TypeError: missing required argument\ndef k(a=1, b): ...   # SyntaxError: non-default after default\ndef g(): pass\ng()             # None   (no return executed -&gt; None)\ndef h(x): x = x*2     # rebinds a LOCAL name; caller's variable unchanged</code></pre><ul><li>Call signature: argument count and names must match the definition.</li><li>A function must be defined before it is called.</li><li><code>pass</code> does not return a value.</li></ul><pre><code>def pet(category, species, breed=\"none\"): ...\npet(\"dog\", \"lab\", \"rex\")                       # positional\npet(breed=\"Maltese\", species=\"x\", category=\"c\")# keywords, any order\npet(\"bird\", species=\"macaw\")                   # positional then keyword: OK\npet(year=6, name=\"x\")                          # TypeError: unexpected keyword (names must match)</code></pre><p>A function with no <code>return</code> returns <code>None</code>. Caller variable names do not need to match parameter names, but they must exist.</p>"
  },
  {
   "heading": "File open modes and with",
   "html": "<table><thead><tr><th>Mode</th><th>Meaning</th></tr></thead><tbody><tr><td><code>r</code></td><td>read; FileNotFoundError if missing</td></tr><tr><td><code>w</code></td><td>write; creates, TRUNCATES existing content</td></tr><tr><td><code>a</code></td><td>append; creates if missing</td></tr><tr><td><code>x</code></td><td>create; FileExistsError if it exists</td></tr><tr><td><code>r+</code></td><td>read and write, must exist, no truncation</td></tr></tbody></table><pre><code>with open(\"f.txt\", \"a\") as file:    # closes automatically\n    file.write(\"End of listing\")\nopen(...).read() / .readline() / .readlines() ; for line in file: ...\nimport os; os.path.isfile(p) / os.path.exists(p) / os.path.isdir(p) ; os.remove(p)</code></pre><ul><li>No <code>file.append()</code> or <code>file.add()</code>: use <code>file.write()</code>.</li><li>Using <code>os</code> without <code>import os</code> is a NameError.</li></ul><table><thead><tr><th>Mode</th><th>Meaning</th></tr></thead><tbody><tr><td><code>w+</code></td><td>read and write, creates, TRUNCATES existing content</td></tr></tbody></table><p><code>a</code> creates a missing file and keeps old data (writes at the end); after <code>f.close()</code> other code can open the file. <code>os.path.isfile(p)</code> is True only for an existing file; <code>os.path.exists(p)</code> is True for files and folders; <code>os.exist</code> and <code>os.find</code> do not exist.</p>"
  },
  {
   "heading": "try / except / else / finally",
   "html": "<pre><code>try:      risky()\nexcept ZeroDivisionError:  ...      # one or more except clauses, specific before general\nelse:     ...                       # only if NO exception\nfinally:  ...                       # ALWAYS runs (even with return); only ONE allowed\n# try needs at least one except or a finally\n# order printed for 10/2: try, else, finally   for 10/0: try, except, finally</code></pre><table><thead><tr><th>Call</th><th>Error</th></tr></thead><tbody><tr><td><code>1/0</code></td><td>ZeroDivisionError</td></tr><tr><td><code>int(\"a\")</code>, <code>int(\"3.5\")</code></td><td>ValueError</td></tr><tr><td><code>[1][5]</code></td><td>IndexError</td></tr><tr><td><code>{}[\"k\"]</code></td><td>KeyError</td></tr><tr><td>undefined name</td><td>NameError</td></tr><tr><td><code>\"a\"+1</code></td><td>TypeError</td></tr><tr><td><code>open(\"missing\")</code></td><td>FileNotFoundError</td></tr><tr><td><code>\"a\".foo</code></td><td>AttributeError</td></tr></tbody></table><p>Python has <code>except</code>, not <code>catch</code>. Syntax errors are found before the program runs.</p><p>Pattern for \"call process(), log on error, always display\": <code>try:</code> / <code>except:</code> / <code>finally:</code>. <code>assert</code> and <code>raise</code> are not clauses of a try statement.</p>"
  },
  {
   "heading": "unittest",
   "html": "<pre><code>import unittest\nclass TestIsInstance(unittest.TestCase):     # derive from TestCase\n    def test_isinstance(self):                # name must start with test\n        self.assertIsInstance(3.14, float)\nif __name__ == '__main__':\n    unittest.main()</code></pre><table><thead><tr><th>Method</th><th>Checks</th></tr></thead><tbody><tr><td><code>assertEqual(a, b)</code></td><td>a == b</td></tr><tr><td><code>assertTrue(x)</code></td><td>bool(x) is True</td></tr><tr><td><code>assertIs(a, b)</code></td><td>a is b (same object)</td></tr><tr><td><code>assertIn(a, b)</code></td><td>a in b</td></tr><tr><td><code>assertIsInstance(obj, cls)</code></td><td>isinstance(obj, cls)</td></tr><tr><td><code>assertRaises(Err)</code></td><td>Err is raised</td></tr></tbody></table><p><code>assertEqual(a, b)</code> = same value (<code>==</code>); <code>assertIs(a, b)</code> = same object (<code>is</code>: two equal lists fail); <code>assertIn(a, b)</code> = membership.</p>"
  },
  {
   "heading": "random, math, datetime, os, sys",
   "html": "<table><thead><tr><th>Call</th><th>Result</th></tr></thead><tbody><tr><td><code>randint(a, b)</code></td><td>int a..b, BOTH ends included</td></tr><tr><td><code>randrange(a, b, step)</code></td><td>a up to but NOT b; <code>randrange(5,105,5)</code> = 5..100</td></tr><tr><td><code>random()</code></td><td>float 0.0 &lt;= x &lt; 1.0, takes no arguments</td></tr><tr><td><code>choice(seq)</code></td><td>one element</td></tr><tr><td><code>shuffle(lst)</code></td><td>in place, returns None</td></tr><tr><td><code>sample(seq, k)</code></td><td>list of k items; k required</td></tr></tbody></table><pre><code>import math\nmath.ceil(-1.5) # -1   math.floor(-1.5) # -2   math.trunc(-1.5) # -1   round(2.5) # 2 (banker's)\nmath.sqrt(16) # 4.0    math.isqrt(17) # 4      math.pow(2,3) # 8.0     math.fabs(-3) # 3.0\nmath.fmod(-7,3) # -1.0 (but -7 % 3 == 2)      math.pi    math.nan    math.isnan(math.nan) # True\ndatetime.datetime.now()   .strftime(\"%Y-%m-%d %H:%M\")   date.weekday()  # Monday = 0\nsys.argv  # list of command-line arguments, argv[0] is the script</code></pre><pre><code>random.randint(5, 11)        # 5..11 both included     random.randrange(5, 12, 1) # same range\nmath.floor(math.fabs(-7.8))  # 7    math.trunc(-7.8) # -7    math.fmod needs 2 arguments\nimport datetime\nd = datetime.date.today()    # also datetime.datetime.now(); datetime.today() on the module is an AttributeError\nd.strftime(\"%A\")             # 'Friday' (full name)   \"%a\" -&gt; 'Fri'\nd.weekday()                  # Monday = 0 ... Sunday = 6   -&gt; days left after today: 6 - d.weekday()\n# python Script.py Cheese Bacon Bread\nsys.argv                     # ['Script.py', 'Cheese', 'Bacon', 'Bread']  -&gt; argv[2] is 'Bacon'; too few arguments: IndexError</code></pre>"
  },
  {
   "heading": "Comments, docstrings, documentation",
   "html": "<ul><li>Comment = <code>#</code> to end of line (also inline after code). Never <code>//</code>, <code>/* */</code> or <code>&lt;!-- --&gt;</code>.</li><li>A <code>#</code> inside a string is just text.</li><li>Python does not syntax-check comment text.</li><li>Docstring: a string literal as the first statement of a function/module/class; read with <code>help()</code> or <code>pydoc</code>.</li><li>Indent blocks consistently (4 spaces).</li></ul><p>Documentation inside a function: <code>\"\"\"docstring\"\"\"</code> as the first statement or a <code># comment</code> line. A leading <code>'</code> (VBA style) is an unterminated string: SyntaxError.</p>"
  },
  {
   "heading": "Mistakes to avoid",
   "html": "<ul><li>(Set A Q1) a <code>break</code> placed after <code>print</code> and the decrement still lets the final pass print; trace, do not guess.</li><li>(Set A Q2) slice stop is excluded: <code>alph[3:6]</code> is <code>def</code>, not <code>cdef</code>.</li><li>(Set A Q3) with default arguments nothing returns, so the result is <code>None</code>; <code>pass</code> is not a return.</li><li>(Set A Q4) <code>**</code> before <code>//</code>, and a float operand makes <code>//</code> give <code>5.0</code>.</li><li>(Set A Q5) <code>input()</code> reads console text; it does not open a box or HTML.</li><li>(Set A Q6) <code>1E10</code> is a float, <code>\"True\"</code> is a str.</li><li>(Set A Q8 · Set B Q19) <code>input()</code> returns str, so <code>**</code> on it raises TypeError in the function.</li><li>(Set A Q9) <code>{n}</code> is the n-th argument of <code>format()</code>, not a variable name.</li><li>(Set A Q10) a loop header needs its colon, and <code>break</code> belongs in the success branch.</li><li>(Set A Q11) the alternative branch is <code>else:</code>; <code>elseif</code> does not exist and <code>=</code> is not <code>==</code>.</li><li>(Set A Q12) unary +/- sits between <code>**</code> and <code>* /</code>; <code>and</code> is last.</li><li>(Set A Q13 · Set B Q7) a default parameter makes an argument optional; assigning to a parameter does not change the caller's variable.</li><li>(Set A Q14) NameError on <code>os</code> means a missing <code>import os</code>.</li><li>(Set A Q16) <code>#</code> is required for comments and a <code>#</code> inside quotes is not one.</li><li>(Set A Q17 · Set B Q25) <code>str + int</code> is a TypeError, and no-quote output fails the requirement.</li><li>(Set A Q18) <code>else</code> takes no condition; split sub-ranges with a nested <code>if</code>.</li><li>(Set A Q19) <code>letter in word</code> (needle first), not <code>word in letter</code>.</li><li>(Set A Q20) missing colon, <code>=</code> vs <code>==</code>, and <code>numbers[index]</code> not <code>numbers(index)</code>.</li><li>(Set A Q21) the last index is <code>len(s) - 1</code>, otherwise IndexError.</li><li>(Set A Q22) mode <code>a</code> appends, <code>w</code> erases; the method is <code>file.write</code>.</li><li>(Set A Q23 · Set B Q22) a try statement may have many except clauses but only one finally.</li><li>(Set A Q24) parameter count and names must match the call and the body.</li><li>(Set A Q25) test negatives and boundaries, and use <code>and</code> not <code>or</code>.</li><li>(Set A Q26) use <code>except ValueError:</code>, not <code>catch</code>.</li><li>(Set A Q28) <code>rank &gt; 3</code> with rank 3 is False; read <code>&gt;</code> vs <code>&gt;=</code> literally.</li><li>(Set A Q29) <code>randrange</code> excludes stop, <code>randint</code> includes it; 0 must not be possible.</li><li>(Set A Q30) Python comments use <code>#</code> only.</li><li>(Set A Q31) test methods must start with <code>test</code> and the class derives from <code>unittest.TestCase</code>.</li><li>(Set A Q32) update the loop variable (<code>p = p + 1</code>) or the while loop never ends.</li><li>(Set A Q35) <code>shuffle</code> returns None and <code>sample</code> needs k; use <code>randint</code> and <code>choice</code>.</li><li>(Set B Q5) an extra guard after the first must be <code>elif</code>, compare with <code>==</code> / <code>is None</code>, and <code>else</code> takes no condition.</li><li>(Set B Q6) same value = <code>assertEqual</code>, same object = <code>assertIs</code>, membership = <code>assertIn</code>.</li><li>(Set B Q8) <code>**</code> is a power; truncate with <code>int(a / b)</code> or <code>a // b</code>, and <code>float(...)</code> brings the decimal back.</li><li>(Set B Q9) create + read/write + erase content is <code>w+</code>; <code>r+</code> needs the file and keeps content, <code>w</code> cannot read.</li><li>(Set B Q10) in <code>{0:10}</code> the number before the colon is the argument index, not the width.</li><li>(Set B Q11) use <code>&gt;=</code> with the lowest value of each band and <code>elif</code> (a second <code>if</code> overwrites the result).</li><li>(Set B Q13) <code>randint</code> includes both ends; <code>randrange</code> excludes the stop, so 5..11 is <code>randrange(5, 12)</code>.</li><li>(Set B Q14) <code>fabs</code> + <code>floor</code>; <code>fmod</code> needs two arguments and <code>frexp</code> splits mantissa and exponent.</li><li>(Set B Q15) <code>[:-5]</code> and <code>[0:-5]</code> drop the last five; a start of 1 skips the first item, <code>-4</code> keeps one extra.</li><li>(Set B Q17) a comment is <code>#</code>, never <code>'</code>, <code>//</code> or <code>/* */</code>.</li><li>(Set B Q18) a default parameter makes an argument optional; a function without <code>return</code> returns <code>None</code>; positional then keyword is legal.</li><li>(Set B Q20) repeat until QUIT is a <code>while</code> loop; <code>for char in x</code> needs the word <code>in</code>.</li><li>(Set B Q21) <code>break</code> escapes the loop, and a <code>while</code> loop still needs <code>index += 1</code> in the other branch.</li><li>(Set B Q24) keyword names must match the parameter names; variables used in a call must be defined.</li><li>(Set B Q26) range stop is excluded: five rows are <code>range(1, 6)</code>, four columns <code>range(1, 5)</code>.</li><li>(Set B Q27) <code>range(0, len(x)-1)</code> misses the last item, and averages need <code>/</code> not <code>//</code>.</li><li>(Set B Q28) <code>input()</code> returns <code>str</code>, so <code>\"1\"</code> is not the dict key <code>1</code>; convert with <code>int()</code>.</li><li>(Set B Q29) <code>datetime.date.today()</code> (not <code>datetime.today()</code>); <code>%A</code> is the full weekday name and <code>weekday()</code> counts from Monday = 0.</li><li>(Set B Q30) <code>name = input()</code> needs the parentheses and the assignment.</li><li>(Set B Q32) <code>is</code> tests identity, <code>==</code> tests value; <code>a = b</code> makes both True for lists.</li><li>(Set B Q33) <code>try:</code> / <code>except:</code> / <code>finally:</code>; <code>assert</code> and <code>raise</code> are not clauses.</li><li>(Set B Q34) mode <code>a</code> creates the file and keeps existing data; <code>w</code> overwrites.</li><li>(Set B Q35) <code>os.path.isfile(...)</code>; <code>os.exist</code> and <code>os.find</code> do not exist.</li><li>(Set B Q23) <code>sys.argv[0]</code> is the script name, so <code>argv[2]</code> is the second argument.</li></ul>"
  }
 ]
};
