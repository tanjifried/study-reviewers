/* Load after area1.js ... area6.js and before app.js. Enriches lesson teaching only. */
(() => {
  const lesson = id => window.LESSONS.find(item => item.id === id);
  const replace = (id, sections, sources) => {
    const item = lesson(id);
    if (!item) return;
    item.sections = sections;
    item.sources = [...item.sources, ...sources];
  };

  replace('a3-1', [
    {heading:'Choose a mode by predicting its effect', body:`<p><code>open(path, mode, encoding=...)</code> creates a file object, which tracks the open stream and its current position. The default is <code>"r"</code>, read text: the path must already exist. The four modes most likely to be contrasted on an exam are <code>r</code> (read), <code>w</code> (write after truncating an existing file), <code>a</code> (append, creating a missing file), and <code>x</code> (create only; fail if it exists). Thus <code>w</code> and <code>a</code> can both create a missing file, but only <code>w</code> destroys prior contents.</p><p>Mode modifiers refine the operation: <code>b</code> selects binary data such as image bytes; <code>t</code> means text and is the default; <code>+</code> requests reading and writing. For example, <code>r+</code> opens an existing file without truncating it, while <code>w+</code> truncates and then permits reading and writing. Binary streams read and write <code>bytes</code>, so do not pass <code>encoding</code> with a binary mode. Text files are decoded to strings; specify an encoding such as UTF-8 when the file format is known.</p><pre><code>with open("report.txt", "w", encoding="utf-8") as f:
    count = f.write("Ada: 92\\n")
print(count)
# 8</code></pre><p><code>write</code> writes exactly the supplied string, including only the newline characters you explicitly include. It returns the number of text characters written (not necessarily UTF-8 bytes). In contrast, <code>print(value, file=f)</code> formats the value and adds its configured ending, which defaults to a newline.</p><p><strong>Exam trace:</strong> ask what the file contained before the call, whether the path exists, and where the next write goes. If old contents must survive, eliminate <code>w</code>; if duplicates must be prevented, choose <code>x</code>; if the file must exist already, <code>r</code> is the matching choice. An <code>x</code> attempt against an existing path raises <code>FileExistsError</code>, and opening a missing path in <code>r</code> raises <code>FileNotFoundError</code>.</p>`},
    {heading:'Read using the cursor; close using a context manager', body:`<p>Reading advances the file cursor. <code>read()</code> consumes the remainder; <code>read(n)</code> returns up to <code>n</code> characters in text mode or bytes in binary mode. <code>readline()</code> consumes one line and usually includes its ending newline. At end-of-file, a text <code>read()</code> or <code>readline()</code> returns <code>""</code>; a blank line is different because it is <code>"\\n"</code>.</p><pre><code>from io import StringIO
f = StringIO("red\\nblue\\n")
print(repr(f.read(4)))
print(repr(f.readline()))
print(repr(f.read()))
# 'red\\n'
# 'blue\\n'
# ''</code></pre><p>For a large file, iterate over the file object rather than loading every line at once. <code>rstrip()</code> removes trailing whitespace (including line endings); use it only when that whitespace is not meaningful.</p><pre><code>with open("scores.txt", encoding="utf-8") as f:
    for line in f:
        print(line.rstrip())</code></pre><p>The <code>with</code> statement closes the file on normal exit and when an exception leaves the block. This flushes buffered writes and releases the resource. A variable can still refer to the file object afterward, but attempting I/O on that closed object raises <code>ValueError</code>. If not using <code>with</code>, call <code>close()</code> in a reliable cleanup path.</p><p><strong>Common traps:</strong> reading twice does not restart at the beginning; the second read starts at the advanced cursor. <code>write("hello")</code> does not add a newline. Text mode can translate line endings, so binary files must use <code>b</code>. Appending directs writes to the end even if you tried to seek elsewhere.</p>`}
  ], [
    {label:'W3Schools: Python File Open',url:'https://www.w3schools.com/python/python_file_handling.asp'},
    {label:'W3Schools: Python File Write',url:'https://www.w3schools.com/python/python_file_write.asp'},
    {label:'Python Tutorial: Reading and Writing Files',url:'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files'},
    {label:'Built-in open()',url:'https://docs.python.org/3/library/functions.html#open'},
    {label:'File Objects',url:'https://docs.python.org/3/library/io.html#io.TextIOBase'}
  ]);

  replace('a3-2', [
    {heading:'Check paths and remove files with error awareness', body:`<p><code>os.path.exists(path)</code> asks whether a path currently names something that exists. <code>os.path.isfile(path)</code> is narrower: it tests for a regular file, so it does not treat a directory as the requested file. Import <code>os</code> before using these calls:</p><pre><code>import os
path = "draft.txt"
if os.path.isfile(path):
    os.remove(path)</code></pre><p><code>os.remove(path)</code> (also named <code>os.unlink</code>) removes a file. It can fail because the path vanished, permissions disallow removal, or the path names a directory. A preceding existence test is not a guarantee: another process or user can change the filesystem between the test and removal. Write code to handle the operation's possible exception when that failure matters.</p><p><strong>Exam distinction:</strong> <code>exists</code> answers “is there an entry here?”; <code>isfile</code> answers “is this a regular file?”; <code>remove</code> performs an action and may raise. Do not confuse a check with deletion, and remember that deletion is not reversible from the program's point of view.</p>`},
    {heading:'Console input and output: strings, separators, endings, formatting', body:`<p><code>input(prompt)</code> displays the prompt (without adding its own newline) and returns the entered line as a string, with the trailing newline removed. It never infers a number: <code>int(input("Count: "))</code> converts the text to an integer, and malformed input raises <code>ValueError</code>. For robust interactive programs, catch that error and ask again rather than assuming every response is valid.</p><p><code>print(*objects, sep=" ", end="\\n", file=...)</code> converts objects to display text, joins multiple values with <code>sep</code>, and appends <code>end</code>. These are output controls; they do not change the original values.</p><pre><code>name = "Mina"
score = 92
print("Student", name, sep=": ")
print(f"Score: {score}")
print("Loading", end="...")
# Student: Mina
# Score: 92
# Loading...</code></pre><p>F-strings place expressions inside braces: <code>f"{score + 1}"</code>. A colon introduces a format specifier, for instance <code>f"{3.5:.2f}"</code> produces <code>3.50</code>. The value remains numeric outside the formatted string. The older <code>str.format()</code> method uses replacement fields: <code>"Score: {}".format(score)</code> and <code>"{:.2f}".format(3.5)</code> produce the corresponding text.</p><p><strong>Trace questions:</strong> track printed output separately from return values. <code>print</code> displays; it returns <code>None</code>. Predict spaces from <code>sep</code> and line breaks from <code>end</code>, rather than assuming each call always ends a line.</p>`},
    {heading:'Command-line arguments arrive as strings', body:`<p><code>sys.argv</code> is a list supplied by the command that launched the program. Element zero is the script name; elements from index one onward are argument strings. Check the list length before indexing, and explicitly convert numeric arguments.</p><pre><code># python greet.py Ada
import sys
if len(sys.argv) &gt; 1:
    name = sys.argv[1]
    print(f"Hello, {name}!")
# Hello, Ada!</code></pre><p>At launch, the shell separates tokens according to its quoting rules; Python exposes those tokens as strings. It does not turn <code>"17"</code> into integer <code>17</code>. Use <code>int(sys.argv[1])</code> for integer work, handling missing or invalid values as needed. For more complex interfaces, <code>argparse</code> supplies option parsing, usage help, and validation.</p><p><strong>Exam trap:</strong> forgetting index zero shifts every argument. If the example launches <code>python tool.py 12</code>, then <code>sys.argv[1]</code> is <code>"12"</code>, not the program name and not an integer.</p>`}
  ], [
    {label:'W3Schools: Python File Handling',url:'https://www.w3schools.com/python/python_file_handling.asp'},
    {label:'W3Schools: Python User Input',url:'https://www.w3schools.com/python/python_user_input.asp'},
    {label:'W3Schools: Python Output / print()',url:'https://www.w3schools.com/python/ref_func_print.asp'},
    {label:'W3Schools: Python String Formatting',url:'https://www.w3schools.com/python/python_string_formatting.asp'},
    {label:'Python Built-in Functions: input() and print()',url:'https://docs.python.org/3/library/functions.html#input'},
    {label:'Formatted string literals',url:'https://docs.python.org/3/reference/lexical_analysis.html#f-strings'},
    {label:'sys.argv',url:'https://docs.python.org/3/library/sys.html#sys.argv'},
    {label:'argparse tutorial',url:'https://docs.python.org/3/howto/argparse.html'},
    {label:'os.path — common pathname manipulations',url:'https://docs.python.org/3/library/os.path.html'},
    {label:'os.remove()',url:'https://docs.python.org/3/library/os.html#os.remove'}
  ]);

  replace('a4-1', [
    {heading:'Indentation defines suites; whitespace makes code readable', body:`<p>Python uses indentation to determine which statements belong to an <em>suite</em> after headers such as <code>if</code>, <code>for</code>, <code>def</code>, and <code>with</code>. The colon starts the suite; a consistent deeper indentation begins it, and returning to the header's indentation ends it. Four spaces per level is the standard convention. Use spaces consistently instead of mixing tabs and spaces.</p><pre><code>active = True
if active:
    print("open")
    print("ready")
print("end")
# open
# ready
# end</code></pre><p>The final print is outside the <code>if</code> because it is dedented. Indentation therefore changes execution, not just appearance. A mismatched suite commonly causes <code>IndentationError</code> or <code>TabError</code>; align statements that should share a block. Blank lines and spaces around operators improve scanning but do not create a block.</p><p><strong>Read code by indentation columns:</strong> mark each header, then group the following statements at the next indentation level until the block dedents. For nested conditions or loops, one additional level belongs to the inner suite. When asked what runs, do not infer grouping from visual proximity alone.</p>`},
    {heading:'Comments explain; docstrings become object documentation', body:`<p>A <code>#</code> outside a string begins a comment through the end of the physical line. The interpreter ignores it; a hash inside quotes is ordinary string content. Keep comments useful by explaining intent or a non-obvious constraint rather than repeating the code.</p><pre><code>limit = 5  # maximum retries
text = "# this hash is data"</code></pre><p>A docstring is a string literal in the first statement position of a module, class, or function body. It is retained as documentation (for example, <code>lookup.__doc__</code>) and can be displayed by help tools. A comment is not a docstring. A string after an earlier executable statement is not the docstring either.</p><pre><code>def convert(seconds):
    """Return seconds converted to minutes."""
    return seconds / 60
print(convert.__doc__)
print(convert(90))
# Return seconds converted to minutes.
# 1.5</code></pre><p>For readable documentation, summarize the purpose and behavior, then clarify meaningful inputs, output, and exceptional conditions when useful. A concise, accurate docstring makes the contract easier to discover and review.</p>`},
    {heading:'Use pydoc to inspect and generate help', body:`<p>Python's <code>pydoc</code> reads a module's objects and their documentation strings to present help. From a terminal, <code>python -m pydoc json</code> displays help for an importable module. In an interactive session, <code>help(str)</code> requests help on an object; <code>help()</code> starts the interactive help browser. The generated content comes from docstrings and object metadata, not ordinary <code>#</code> comments.</p><pre><code>"""Small demonstration module."""
def twice(value):
    """Return value multiplied by two."""
    return value * 2</code></pre><p>Saving this as an importable module makes its module and function descriptions available to help tools. Document the actual behavior: “returns” differs from “prints,” and a function's description should not claim a conversion in the opposite direction. Exam questions often test both placement (first statement) and retrieval (<code>__doc__</code> or <code>pydoc</code>).</p>`}
  ], [
    {label:'W3Schools: Python Comments',url:'https://www.w3schools.com/python/python_comments.asp'},
    {label:'Python Tutorial: An Informal Introduction (indentation and comments)',url:'https://docs.python.org/3/tutorial/introduction.html'},
    {label:'Python Tutorial: Defining Functions (docstrings)',url:'https://docs.python.org/3/tutorial/controlflow.html#defining-functions'},
    {label:'pydoc — Documentation generator and online help system',url:'https://docs.python.org/3/library/pydoc.html'},
    {label:'PEP 8 — Style Guide for Python Code',url:'https://peps.python.org/pep-0008/'}
  ]);

  replace('a4-2', [
    {heading:'Define functions and read their call signatures', body:`<p><code>def</code> introduces a named function. The header contains the function name, parameter list in parentheses, and a colon; its body is an indented suite. Defining a function creates it, while calling it runs the body.</p><pre><code>def volume(width, height, depth):
    return width * height * depth
print(volume(2, 3, 4))
# 24</code></pre><p>Parameters are the names in the definition; arguments are the values supplied by a call. Positional arguments bind in order: <code>volume(2, 3, 4)</code> binds width=2, height=3, depth=4. Keyword arguments bind by name and can be written in another order: <code>volume(depth=4, width=2, height=3)</code>. Positional arguments must precede keyword arguments in a mixed call, and a parameter cannot be assigned twice. Missing required values, extra positional values, unknown keywords, or duplicate assignments typically raise <code>TypeError</code>.</p><p>A default marks an optional parameter, for example <code>def scale(value, factor=3):</code>. Calls <code>scale(5)</code> and <code>scale(5, 4)</code> return 15 and 20. In an ordinary parameter list, required parameters come before defaulted parameters: <code>def f(required, optional=1):</code> is valid, while <code>def f(optional=1, required):</code> is not.</p><p><strong>Exam method:</strong> annotate each parameter with the value it receives before calculating the body. For <code>subtract(b=2, a=9)</code>, names determine binding, so <code>a</code> is 9 and <code>b</code> is 2; result is 7. Do not assume textual argument order controls keyword binding.</p>`},
    {heading:'Default values are created at definition time', body:`<p>Python evaluates each default expression once, when execution reaches the <code>def</code> statement. A later call that omits that argument reuses the resulting object. Immutable defaults such as numbers and strings are usually appropriate, but a mutable default list or dictionary persists changes across calls.</p><pre><code>def collect(value, data=[]):
    data.append(value)
    return data
print(collect(1))
print(collect(2))
# [1]
# [1, 2]</code></pre><p>Both calls mutate the same list. When each omitted call should start fresh, use <code>None</code> as a sentinel and allocate inside the function:</p><pre><code>def collect(value, data=None):
    if data is None:
        data = []
    data.append(value)
    return data
print(collect(1))
print(collect(2))
# [1]
# [2]</code></pre><p>Passing a list explicitly still uses that supplied list. In exam traces, remember the object is shared only when the call omits the parameter; do not treat the default expression as if it were re-run on every call.</p>`},
    {heading:'Return, print, and pass have different jobs', body:`<p><code>return expression</code> ends the current call and gives the expression's value to the caller. A bare <code>return</code>, or reaching the end of the body, returns <code>None</code>. By contrast, <code>print()</code> displays output but does not make that output the function's result.</p><pre><code>def announce():
    print("ready")
result = announce()
print(result)
# ready
# None</code></pre><p>Use <code>return</code> when a caller needs to store, compare, or combine a computed result: <code>average = (a + b) / 2</code> inside the function must be returned if callers need to use it. Execution stops at the first return reached; later statements in that call are not run.</p><p><code>pass</code> is a syntactically valid no-operation statement. It fills a required suite while doing nothing; it does not return a value, exit a function, skip a loop iteration, or print anything. A function containing only <code>pass</code> reaches its end and therefore returns <code>None</code>. Use <code>continue</code> for skipping to the next loop iteration, not <code>pass</code>.</p><p><strong>Trace order:</strong> follow conditions, identify the first executed <code>return</code>, and distinguish displayed lines from the value assigned by the call. For a no-return function, include <code>None</code> if the call result is printed or stored.</p>`}
  ], [
    {label:'W3Schools: Python Function Arguments',url:'https://www.w3schools.com/python/python_arguments.asp'},
    {label:'W3Schools: Python Function Return Value',url:'https://www.w3schools.com/python/python_functions.asp'},
    {label:'Python Tutorial: Defining Functions and Default Argument Values',url:'https://docs.python.org/3/tutorial/controlflow.html#defining-functions'},
    {label:'Python Language Reference: Function definitions',url:'https://docs.python.org/3/reference/compound_stmts.html#function-definitions'},
    {label:'Python Language Reference: The return statement',url:'https://docs.python.org/3/reference/simple_stmts.html#the-return-statement'},
    {label:'Python Language Reference: The pass statement',url:'https://docs.python.org/3/reference/simple_stmts.html#the-pass-statement'}
  ]);
})();
