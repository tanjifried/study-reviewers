/*
 * Deeper instructional material for Areas 1 and 2.
 * Load this file after area1.js and area2.js. Only lesson sections and
 * reference lists are changed; questions and their scoring data are retained.
 */
(function () {
  const deepContent = {
    'a1-1': {
      sections: [
        {
          heading: 'Read values by type before you calculate',
          body: `<p>A variable name does not have a permanently declared type: the value currently bound to the name has a type. Use <code>type(value)</code> to inspect the exact type, and <code>isinstance(value, T)</code> when asking whether a value is an instance of a type or its subclass. For this exam’s common scalar types, <code>int</code> represents whole numbers, <code>float</code> represents approximate decimal numbers, <code>str</code> represents text, and <code>bool</code> represents <code>True</code> or <code>False</code>. <code>None</code> is a separate singleton used for “no value”; its type is <code>NoneType</code>.</p>
<pre><code>whole = 18
decimal = 18.0
flag = True
print(type(whole).__name__, type(decimal).__name__)
print(whole == decimal, type(whole) is type(decimal))
print(isinstance(flag, int), type(flag) is int)</code></pre>
<p>Output:</p><pre><code>int float
True False
True False</code></pre>
<p><code>18</code> and <code>18.0</code> compare numerically equal, but their types differ. A subtle Python rule is that <code>bool</code> is a subclass of <code>int</code>, so <code>isinstance(True, int)</code> is true even though <code>type(True) is int</code> is false. For a strict exact-type question, use <code>type(x) is T</code>; for typical polymorphic checks, prefer <code>isinstance</code>.</p>`
        },
        {
          heading: 'Convert deliberately and predict the result',
          body: `<p><code>int(x)</code>, <code>float(x)</code>, <code>str(x)</code>, and <code>bool(x)</code> construct values of the requested type when the input is compatible. Conversion is a new value; it does not rewrite the original. <code>int(6.8)</code> truncates toward zero, so it is <code>6</code>; <code>int(-6.8)</code> is <code>-6</code>, not <code>-7</code>. This differs from <code>math.floor(-6.8)</code>, which is <code>-7</code>. Text parsing has its own rules: <code>int("42")</code> works, but <code>int("4.2")</code> raises <code>ValueError</code>. Parse decimal text with <code>float</code> if the fractional part matters.</p>
<pre><code>raw = "3.75"
amount = float(raw)
whole = int(amount)
label = str(whole)
print(amount, whole, label, type(label).__name__)</code></pre>
<p>Output: <code>3.75 3 3 str</code>. The stages are: parse text into a float, truncate that float into an integer, then format the integer as text. Avoid adding unlike values directly: <code>"3" + 3</code> raises <code>TypeError</code>; choose either numeric addition (<code>int("3") + 3</code> gives <code>6</code>) or text concatenation (<code>"3" + str(3)</code> gives <code>"33"</code>).</p>
<p>Truth conversion depends on emptiness or numeric zero, not on whether text looks like zero. <code>bool("")</code>, <code>bool([])</code>, <code>bool(0)</code>, and <code>bool(None)</code> are false; <code>bool("0")</code>, <code>bool("False")</code>, and <code>bool([0])</code> are true because those strings and that list are nonempty. When an exact state matters, compare explicitly instead of relying on truthiness.</p>`
        },
        {
          heading: 'Division, floor division, and remainder',
          body: `<p>For numeric operands, <code>/</code> performs true division and returns a float: <code>4 / 2</code> is <code>2.0</code>. <code>//</code> floors the quotient (rounds down toward negative infinity), and <code>%</code> supplies a remainder consistent with that quotient. With integer operands these commonly produce integer results. Trace negative values carefully because truncation and floor are different.</p>
<pre><code>print(7 / 3, 7 // 3, 7 % 3)
print(-7 // 3, -7 % 3)
print((-7 // 3) * 3 + (-7 % 3))</code></pre>
<p>Output:</p><pre><code>2.3333333333333335 2 1
-3 2
-7</code></pre>
<p>The governing check is <code>x == (x // y) * y + (x % y)</code> for these integer examples. Since <code>-7 / 3</code> is about <code>-2.33</code>, flooring gives <code>-3</code>; the matching remainder is <code>2</code>. Exam method: determine whether the question asks for a decimal quotient, a floored quotient, or the remainder; then check the division identity.</p>`
        }
      ],
      sources: [
        ['W3Schools: Python data types', 'https://www.w3schools.com/python/python_datatypes.asp'],
        ['W3Schools: Python casting', 'https://www.w3schools.com/python/python_casting.asp'],
        ['Python docs: numeric types', 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex'],
        ['Python docs: built-in functions', 'https://docs.python.org/3/library/functions.html#int'],
        ['Python docs: truth-value testing', 'https://docs.python.org/3/library/stdtypes.html#truth-value-testing']
      ]
    },
    'a1-2': {
      sections: [
        {
          heading: 'Strings: index, slice, and search safely',
          body: `<p>A string is an immutable sequence of text characters. Python has no separate single-character type: <code>"A"</code> is a string of length one. Positions start at zero; for a string of length <code>n</code>, valid positive indexes are <code>0</code> through <code>n - 1</code>, while <code>-1</code> means the last character. An out-of-range direct index raises <code>IndexError</code>.</p>
<p>A slice <code>s[start:stop:step]</code> selects positions beginning at <code>start</code>, then advances by <code>step</code>, stopping before <code>stop</code>. Omitting start or stop uses a direction-dependent sequence boundary. Slicing is forgiving when a bound is beyond the string length; unlike direct indexing, it does not raise an index error. A negative step walks backward.</p>
<pre><code>word = "planet"
print(word[1], word[-1])
print(word[1:5:2])
print(word[:3], word[::-1])
print("net" in word)</code></pre>
<p>Output:</p><pre><code>l t
ln
pla tenalp
True</code></pre>
<p>Trace a slice by writing the indexed characters first: for <code>"abcdef"[1:5:2]</code>, visit index 1 (<code>b</code>), then index 3 (<code>d</code>); index 5 is the excluded stop, so the result is <code>"bd"</code>. Methods such as <code>lower()</code>, <code>strip()</code>, and <code>replace()</code> return new strings. Save the result if needed: <code>name.lower()</code> does not mutate <code>name</code>. Attempting <code>name[0] = "a"</code> fails because strings are immutable.</p>`
        },
        {
          heading: 'Lists: change items and understand method results',
          body: `<p>A list is an ordered, mutable sequence. Indexing and slicing follow the same zero-based, stop-exclusive rules as strings. Direct assignment such as <code>scores[1] = 10</code> replaces an existing item. Slice assignment can replace a range. Lists can contain mixed values, though using consistent element types makes comparisons and sorting easier to reason about.</p>
<p>Distinguish the common methods by what they add, remove, return, and change in place:</p>
<ul><li><code>append(x)</code> adds exactly one item; passing a list adds that list as one nested item.</li><li><code>extend(iterable)</code> adds each item from the iterable.</li><li><code>insert(i, x)</code> places an item before the current item at index <code>i</code>.</li><li><code>remove(x)</code> removes the first matching value; <code>pop(i)</code> removes and returns an item (default: the last).</li><li><code>sort()</code> sorts in place and returns <code>None</code>; <code>reverse()</code> reverses in place and returns <code>None</code>.</li></ul>
<pre><code>items = [4, 7]
items.append([9, 10])
print(items)
items = [4, 7]
items.extend([9, 10])
removed = items.pop(1)
print(items, removed)
values = [3, 1, 2]
result = values.sort()
print(values, result)</code></pre>
<p>Output:</p><pre><code>[4, 7, [9, 10]]
[4, 9, 10] 7
[1, 2, 3] None</code></pre>
<p>Exam pitfall: assigning <code>result = values.sort()</code> does not put the sorted list in <code>result</code>. Use <code>values.sort()</code> and then use <code>values</code>, or use <code>sorted(values)</code> when a new sorted list is wanted. <code>min(values)</code> and <code>max(values)</code> return the smallest and largest comparable elements; they do not modify the list.</p>`
        },
        {
          heading: 'Build, merge, and reverse sequences',
          body: `<p><code>left + right</code> concatenates two lists into a new list. It does not mutate either input. Use <code>extend</code> when the intent is to add another iterable to an existing list. Slices such as <code>values[1:]</code> and <code>values[::-1]</code> also produce new outer lists. They are shallow copies: if an element is itself a mutable list, both outer lists can still refer to that same inner object.</p>
<pre><code>a = [8, 3]
b = [5, 1]
merged = a + b
print(merged, min(merged), max(merged))
print(merged[::-1], merged)
merged[1:3] = [30]
print(merged)</code></pre>
<p>Output:</p><pre><code>[8, 3, 5, 1] 1 8
[1, 5, 3, 8] [8, 3, 5, 1]
[8, 30, 1]</code></pre>
<p>For exam tracing, keep a small state table after every mutating operation: note the list before the call, whether it changes, the method’s returned value, and the list afterward. This prevents confusing <code>append</code> with <code>extend</code>, <code>pop</code> with <code>remove</code>, or <code>sort</code> with <code>sorted</code>.</p>`
        }
      ],
      sources: [
        ['W3Schools: Python strings', 'https://www.w3schools.com/python/python_strings.asp'],
        ['W3Schools: string slicing', 'https://www.w3schools.com/python/python_strings_slicing.asp'],
        ['W3Schools: list methods', 'https://www.w3schools.com/python/python_lists_methods.asp'],
        ['W3Schools: sorting lists', 'https://www.w3schools.com/python/python_lists_sort.asp'],
        ['Python docs: common sequence operations', 'https://docs.python.org/3/library/stdtypes.html#common-sequence-operations'],
        ['Python docs: mutable sequence types', 'https://docs.python.org/3/library/stdtypes.html#mutable-sequence-types']
      ]
    },
    'a1-3': {
      sections: [
        {
          heading: 'Trace arithmetic and operator precedence',
          body: `<p>Precedence determines which operator groups first; parentheses make the intended grouping explicit. For the operators in this course, exponentiation binds tightly, then unary signs and multiplication/division/floor-division/remainder, then addition/subtraction, then comparisons and membership/identity checks, then <code>not</code>, <code>and</code>, and <code>or</code>. Operators at a shared level usually group left to right, but exponentiation groups right to left. Unary minus is less tightly bound than exponentiation.</p>
<pre><code>print(2 + 3 * 4)
print(2 ** 3 ** 2)
print(-2 ** 2, (-2) ** 2)</code></pre>
<p>Output:</p><pre><code>14
512
-4 4</code></pre>
<p>Read the second expression as <code>2 ** (3 ** 2)</code>, or <code>2 ** 9</code>. Read <code>-2 ** 2</code> as <code>-(2 ** 2)</code>. In exam work, annotate parentheses around each operation you resolve, then evaluate; do not guess from visual left-to-right order alone.</p>`
        },
        {
          heading: 'Comparisons, Boolean logic, and short-circuiting',
          body: `<p>Comparisons such as <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;</code>, and <code>&gt;=</code> produce Boolean results. Chained comparisons are allowed: <code>0 &lt;= score &lt;= 100</code> means both comparisons must hold. <code>and</code> requires both sides to be truthy, <code>or</code> needs one truthy side, and <code>not</code> negates truth. Python evaluates left to right with short-circuiting: a false left operand of <code>and</code> skips the right side; a true left operand of <code>or</code> skips the right side. The <code>and</code>/<code>or</code> operators return an operand, not necessarily a Boolean.</p>
<pre><code>items = []
print(bool(items) and items[0] == "ready")
print("ready" and 3)
print(0 &lt; 72 &lt;= 100)</code></pre>
<p>Output:</p><pre><code>False
3
True</code></pre>
<p>The first expression is safe: the empty list is false, so Python never evaluates <code>items[0]</code>. In the second, the nonempty string is truthy, so <code>and</code> returns its right operand, <code>3</code>. Use parentheses to show intent in compound conditions; do not use <code>is</code> to compare ordinary values.</p>`
        },
        {
          heading: 'Assignment, identity, and membership',
          body: `<p><code>=</code> binds a name to a value; it is not an equality test. Augmented assignment such as <code>+=</code>, <code>-=</code>, <code>/=</code>, <code>//=</code>, <code>%=</code>, and <code>**=</code> performs an operation and assigns the result back. For immutable numbers this typically binds the name to a resulting value. For mutable objects, an in-place update may be observable through another reference.</p>
<p>Use <code>==</code> to ask whether values compare equal. Use <code>is</code> to ask whether two references are the very same object; the common intended use is <code>value is None</code>. Do not rely on identity for integers or strings, because implementation interning is not a value-comparison guarantee. <code>in</code> tests containment: for a list it checks for an equal item; for a string it checks for a substring.</p>
<pre><code>count = 5
count += 2
print(count == 7)
value = None
print(value is None)
print("py" in "python", 4 in [2, 4, 6])</code></pre>
<p>Output:</p><pre><code>True
True
True True</code></pre>
<p>Exam checklist: identify assignment versus comparison, track augmented updates, choose equality for matching values and identity for singleton/object sameness, and determine what container is searched by <code>in</code>.</p>`
        }
      ],
      sources: [
        ['W3Schools: Python operators', 'https://www.w3schools.com/python/python_operators.asp'],
        ['W3Schools: operator precedence', 'https://www.w3schools.com/python/python_operators_precedence.asp'],
        ['Python docs: expressions and precedence', 'https://docs.python.org/3/reference/expressions.html#operator-precedence'],
        ['Python docs: assignment statements', 'https://docs.python.org/3/reference/simple_stmts.html#assignment-statements'],
        ['Python docs: Boolean operations and comparisons', 'https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not']
      ]
    },
    'a2-1': {
      sections: [
        {
          heading: 'Choose a branch and order conditions carefully',
          body: `<p>An <code>if</code>/<code>elif</code>/<code>else</code> chain selects at most one suite. Python tests the <code>if</code> first; if false, it tests each <code>elif</code> in order and executes the first true suite. <code>else</code> runs only when every preceding condition is false. A colon begins each suite, and consistent indentation defines exactly which statements belong to it. A plain <code>if</code> is different: separate <code>if</code> statements can all run.</p>
<pre><code>score = 95
if score &gt;= 90:
    grade = "A"
elif score &gt;= 60:
    grade = "Pass"
else:
    grade = "Retry"
print(grade)</code></pre>
<p>Output: <code>A</code>. If the broad <code>score &gt;= 60</code> check came first, 95 would match it and never reach the A branch. Put the most specific/highest threshold first when ranges overlap. For boundary phrases, translate words precisely: “at least” is <code>&gt;=</code>, “greater than” is <code>&gt;</code>, and inclusive ranges use inclusive comparisons at both ends.</p>
<p>For a three-way numeric classification, test negative, then zero, then the remaining positive case. Walk through a boundary value (such as exactly zero, 60, or 90) to make sure it enters the intended branch. Missing <code>else</code> is legal, but a variable assigned only in some branches may be undefined later.</p>`
        },
        {
          heading: 'Combine conditions without changing the rule',
          body: `<p>Use <code>and</code> when every requirement must hold, <code>or</code> when any alternative is sufficient, and <code>not</code> to reverse a condition. Chained comparisons express intervals cleanly, for example <code>13 &lt;= age &lt;= 19</code>. Parentheses help readers and prevent precedence surprises when combining comparisons and logical operators. Python short-circuits: it skips the right side of <code>and</code> when the left is false and skips the right side of <code>or</code> when the left is true.</p>
<pre><code>items = []
if items and items[0] == "ok":
    print("first item is ok")
else:
    print("empty or first item differs")

active = True
age = 20
print(active and (age &gt;= 18))</code></pre>
<p>Output:</p><pre><code>empty or first item differs
True</code></pre>
<p>The empty list is false, so the indexing operation is skipped safely. Translate a sentence into logical pieces before coding: “inactive or under 18” becomes <code>(not active) or age &lt; 18</code>; “member and spends more than 100” becomes <code>member and total &gt; 100</code>. Avoid changing “either” to <code>and</code> or “both” to <code>or</code>. Use explicit comparisons when a specific value (such as numeric zero) matters rather than treating all false-like values as equivalent.</p>`
        },
        {
          heading: 'Exam trace for conditionals',
          body: `<p>For a code-tracing question, make a compact table with each condition in source order and its true/false result. Stop evaluating the chain after the first true branch; then execute only that indented suite and any later statements outside the chain. For compound conditions, evaluate parentheses first and apply short-circuiting. For a coding question, first define the cases (including boundaries), order overlapping cases deliberately, and decide whether a fallback <code>else</code> is required.</p>
<pre><code>points = 10
if points &gt; 10:
    badge = "gold"
elif points &gt;= 10:
    badge = "silver"
else:
    badge = "bronze"
print(badge)</code></pre>
<p>Trace: <code>10 &gt; 10</code> is false; <code>10 &gt;= 10</code> is true, so the result is <code>silver</code>. This catches a common inclusive-versus-strict boundary error.</p>`
        }
      ],
      sources: [
        ['W3Schools: if, elif, and else', 'https://www.w3schools.com/python/python_if_else.asp'],
        ['W3Schools: Python operators and logical operators', 'https://www.w3schools.com/python/python_operators.asp'],
        ['Python tutorial: if statements', 'https://docs.python.org/3/tutorial/controlflow.html#if-statements'],
        ['Python docs: Boolean operations', 'https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not'],
        ['Python docs: comparisons', 'https://docs.python.org/3/library/stdtypes.html#comparisons']
      ]
    },
    'a2-2': {
      sections: [
        {
          heading: 'Choose while, for, and range for the job',
          body: `<p>A <code>while</code> loop checks its condition before each pass and repeats while it is true. Make progress toward the condition becoming false on every intended path; otherwise the loop can run forever. A <code>for</code> loop obtains each item from an iterable such as a list, string, or range, making it the natural choice when visiting supplied items or a known series of values.</p>
<p><code>range(stop)</code> starts at zero and excludes stop. <code>range(start, stop, step)</code> includes start, advances by step, and stops before the boundary. The default step is 1; a descending range needs a negative step.</p>
<pre><code>count = 3
while count &gt; 0:
    print(count)
    count -= 1
for n in range(2, 6):
    print(n)</code></pre>
<p>Output:</p><pre><code>3
2
1
2
3
4
5</code></pre>
<p>Before tracing, list the values generated by <code>range</code> or write the while-state after each update. For <code>range(5, 2, -1)</code>, the values are 5, 4, 3; 2 is excluded. If a loop has a counter, track whether it updates before or after <code>print</code> and the next condition check.</p>`
        },
        {
          heading: 'Use break, continue, and pass precisely',
          body: `<p><code>break</code> exits the nearest enclosing loop immediately. <code>continue</code> skips the remainder of the current pass and proceeds to the next iteration. <code>pass</code> performs no operation; it is a placeholder when syntax requires a statement. They are not interchangeable.</p>
<pre><code>for n in range(5):
    if n == 2:
        continue
    if n == 4:
        break
    print(n)
print("done")</code></pre>
<p>Output:</p><pre><code>0
1
3
done</code></pre>
<p>At 2, the print is skipped but the loop continues. At 4, the loop ends before printing it, then execution resumes after the loop. A <code>break</code> inside a nested loop exits only that inner/nearest loop; outer iterations continue unless their own logic ends them. If a loop condition or body contains a compound condition, trace its short-circuit behavior just as you would in an <code>if</code>.</p>`
        },
        {
          heading: 'Count nested iterations and avoid common traps',
          body: `<p>For nested loops, the inner loop completes for each outer-loop value unless control flow changes it. With <code>range(2)</code> outside and <code>range(3)</code> inside, there are normally <code>2 × 3 = 6</code> body executions. Write the pairs in order when asked for output; if the inner loop breaks, restart it for the next outer value.</p>
<pre><code>for row in range(2):
    for col in range(3):
        if col == 2:
            break
        print(row, col)</code></pre>
<p>Output:</p><pre><code>0 0
0 1
1 0
1 1</code></pre>
<p>Common errors include forgetting to update a while-loop counter, assuming <code>range</code> includes its stop, placing an increment after a <code>continue</code> so it never runs for that path, and believing an inner <code>break</code> exits every loop. Exam technique: identify the loop being affected, mark the exact point where control jumps, and list printed/appended effects only when execution reaches those statements. A <code>for</code> loop that consumes its iterable normally ends without exposing <code>StopIteration</code> to ordinary loop-body code.</p>`
        }
      ],
      sources: [
        ['W3Schools: while loops, break, and continue', 'https://www.w3schools.com/python/python_while_loops.asp'],
        ['W3Schools: for loops and range', 'https://www.w3schools.com/python/python_for_loops.asp'],
        ['Python tutorial: for, range, break, continue, and pass', 'https://docs.python.org/3/tutorial/controlflow.html#for-statements'],
        ['Python tutorial: break and continue', 'https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements'],
        ['Python reference: while statement', 'https://docs.python.org/3/reference/compound_stmts.html#the-while-statement']
      ]
    }
  };

  for (const [id, content] of Object.entries(deepContent)) {
    const lesson = window.LESSONS.find((item) => item.id === id);
    if (!lesson) throw new Error(`Cannot deepen missing lesson: ${id}`);
    lesson.sections = content.sections;
    const existing = new Set((lesson.sources || []).map((source) => source.url));
    lesson.sources = [...(lesson.sources || [])];
    for (const [label, url] of content.sources) {
      if (!existing.has(url)) lesson.sources.push({ label, url });
    }
  }
})();
