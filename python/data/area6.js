window.LESSONS.push({
 id:'a6-1', area:6, title:'Files, paths, the operating system, and the command line', objectives:['6.1','6.2','6.3'],
 sections:[
  {heading:'The built-in modules',body:`<p>Python's standard library provides modules for common tasks. <code>io</code> supplies tools for working with streams (including in-memory text and binary streams); <code>os</code> provides operating-system interfaces; <code>os.path</code> provides path-manipulation functions; and <code>sys</code> exposes interpreter and process information. Importing <code>os</code> also makes its <code>path</code> submodule available.</p><pre><code>import io, os, sys
from os import path

stream = io.StringIO()
stream.write("draft")
stream.seek(0)
print(stream.read())
print(os.getcwd())
print(sys.argv[0])</code></pre><p><code>sys.argv</code> is a list of command-line strings: element zero conventionally names the script, and subsequent elements are arguments. Convert numeric arguments explicitly, for example <code>count = int(sys.argv[1])</code>. A missing argument causes <code>IndexError</code>; validate argument count before indexing. <code>input()</code> reads a line from standard input and returns text; it is distinct from command-line arguments.</p>`},
  {heading:'File operations and paths',body:`<p>Use <code>open(path, mode, encoding=...)</code>, preferably with a <code>with</code> block so the file closes even if an exception occurs. Common modes: <code>"r"</code> read existing text; <code>"w"</code> create or truncate; <code>"a"</code> append or create; <code>"x"</code> create exclusively; add <code>"b"</code> for bytes. Text mode decodes/encodes strings; binary mode reads/writes bytes.</p><pre><code>with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("one\\ntwo\\n")
with open("notes.txt", encoding="utf-8") as f:
    lines = f.readlines()

os.getcwd()                 # current working directory
os.listdir(".")            # names in a directory
os.mkdir("archive")        # create one directory
os.remove("old.txt")        # remove a file
os.rename("a.txt", "b.txt")

os.path.join("data", "input.txt")
os.path.basename("data/input.txt")
os.path.dirname("data/input.txt")
os.path.splitext("report.csv")</code></pre><p>Use <code>os.path.join</code> rather than manually concatenating separators. Paths are interpreted relative to the current working directory unless absolute. <code>exists</code>, <code>isfile</code>, and <code>isdir</code> answer different questions. Path operations do not guarantee that a target exists, and checks can become stale if the filesystem changes.</p>`}
 ],
 sources:[{label:'io — Core tools for working with streams',url:'https://docs.python.org/3/library/io.html'},{label:'os — Miscellaneous operating system interfaces',url:'https://docs.python.org/3/library/os.html'},{label:'os.path — Common pathname manipulations',url:'https://docs.python.org/3/library/os.path.html'},{label:'sys — System-specific parameters and functions',url:'https://docs.python.org/3/library/sys.html'},{label:'Built-in open()',url:'https://docs.python.org/3/library/functions.html#open'}],
 questions:[
...[
['What does <code>io.StringIO()</code> create?',['An in-memory text stream','A file on disk','A bytes-only socket','A process argument list'],0,'StringIO stores text in memory behind a file-like interface. It supports stream operations without creating a filesystem file.'],
['After <code>s=io.StringIO(); s.write("abc"); s.seek(0); s.read()</code>, what is returned?',['"abc"','""','3','An exception'],0,'Writing advances the cursor to the end. Seeking to offset zero rewinds it, so read returns the stored text.'],
['Which mode opens a text file for appending while preserving existing contents?',['"a"','"w"','"x"','"r"'],0,'Append mode writes at the end and creates the file if absent. Write mode truncates an existing file.'],
['A program must read raw image bytes. Which mode is appropriate?',['"rb"','"r"','"rt"','"w"'],0,'The b flag selects binary mode, so reads return bytes without text decoding.'],
['Why is <code>with open(...)</code> preferred for ordinary file access?',['It closes the file when the block exits','It makes every write atomic','It prevents all I/O errors','It changes relative paths to absolute paths'],0,'The context manager reliably closes the file upon leaving the block, including when an exception occurs. It does not remove ordinary I/O errors.'],
['What happens when <code>open("missing.txt", "r")</code> targets a nonexistent file?',['It normally raises FileNotFoundError','It silently creates an empty file','It returns None','It raises SyntaxError'],0,'Read mode expects an existing file. FileNotFoundError is the typical result if the path cannot be found.'],
['Which mode creates a file only if the name does not already exist?',['"x"','"w"','"a"','"r"'],0,'Exclusive creation mode x fails if the target already exists, helping avoid accidental overwrite.'],
['Given <code>sys.argv == ["tool.py", "7", "fast"]</code>, what is <code>sys.argv[1]</code>?',['The string "7"','The integer 7','The string "tool.py"','The string "fast"'],0,'argv elements are strings. Element zero is conventionally the script name; the first supplied argument is element one.'],
['A script runs as <code>python app.py 12</code>. Which expression obtains the number twelve?',['int(sys.argv[1])','sys.argv[0]','int(sys.argv[0])','sys.argv[2]'],0,'The first user argument is argv[1], and explicit int conversion is needed because argv entries are text.'],
['What is a robust first step before reading <code>sys.argv[1]</code>?',['Check that enough arguments were supplied','Assume argv[1] is always present','Call os.getcwd()','Convert argv[0] to int'],0,'Argument-count validation prevents IndexError when the caller omits a required argument.'],
['What does <code>os.getcwd()</code> return?',['The process current working directory','The directory containing every Python installation','The current script source code','A list of command-line arguments'],0,'getcwd reports the process current working directory, which controls interpretation of relative paths.'],
['What does <code>os.listdir(".")</code> return?',['Names of entries in the current directory','File contents for every file','Only directories as absolute paths','The current directory as a string'],0,'listdir returns entry names for the specified directory; it does not read file contents.'],
['Which expression composes a portable path from a directory and filename?',['os.path.join("data", "input.txt")','"data" + "/" + "input.txt"','os.path.basename("data", "input.txt")','sys.path("data", "input.txt")'],0,'join applies the platform path conventions and avoids assuming a particular separator.'],
['For <code>p="/work/data.csv"</code>, what does <code>os.path.basename(p)</code> produce?',['"data.csv"','"/work"','".csv"','"/work/data.csv"'],0,'basename extracts the final path component, here the filename.'],
['For <code>p="/work/data.csv"</code>, what does <code>os.path.dirname(p)</code> produce?',['"/work"','"data.csv"','"csv"','"/"'],0,'dirname returns the directory portion of the path.'],
['What does <code>os.path.splitext("report.csv")</code> return?',['("report", ".csv")','("report.csv", "")','(".report", ".csv")','("report", "csv")'],0,'splitext splits at the final extension separator and retains the dot in the extension.'],
['Which check asks whether <code>p</code> names a regular file?',['os.path.isfile(p)','os.path.isdir(p)','os.path.join(p)','os.path.basename(p)'],0,'isfile tests for a file. isdir tests for a directory; neither constructs a new path.'],
['A directory already exists and should not be created again. What is a useful precondition?',['os.path.isdir(name)','os.path.isfile(name)','os.path.splitext(name)','os.path.basename(name)'],0,'isdir tests whether the path currently refers to a directory. A check can still race with later filesystem changes.'],
['Which operation removes a file named <code>temp.txt</code>?',['os.remove("temp.txt")','os.mkdir("temp.txt")','os.getcwd("temp.txt")','os.path.dirname("temp.txt")'],0,'os.remove removes a file path. It does not remove a directory tree.'],
['Complete the safe read: open UTF-8 text, then collect all lines.',['with open(p, encoding="utf-8") as f: lines = f.readlines()','with open(p, "wb") as f: lines = f.readlines()','with open(p, "w") as f: lines = f.readlines()','with open(p, "x") as f: lines = f.readlines()'],0,'The default mode is read text, and specifying UTF-8 makes decoding explicit. readlines returns a list of text lines.'],
['When a user executes <code>python scan.py alpha beta</code>, which code gets both supplied words?',['sys.argv[1:]','sys.argv[:1]','sys.argv[0:1]','sys.argv[2:3]'],0,'Slicing from index one skips the script-name entry and preserves every supplied argument.'],
['You need to store two text lines. Which body writes a newline between them?',['f.write("first\\nsecond\\n")','f.write(b"first\\nsecond")','f.read("first\\nsecond")','f.seek("first\\nsecond")'],0,'Text mode accepts str, and newline characters mark line breaks. Binary data would require bytes and a binary-mode file.'],
['Which statement about <code>os.path.exists(p)</code> is accurate?',['It reports whether the path currently exists','It guarantees the next open will succeed','It reports only regular files','It creates the path if absent'],0,'exists is a current existence check. Permissions, races, and later changes mean it cannot guarantee a future operation.'],
['A path may be relative. What determines its base directory when used by open?',['The process current working directory','The Python documentation directory','The directory of sys.argv[0] in every case','The user home directory in every case'],0,'Relative paths are interpreted relative to the current working directory, which may differ from the script location.'],
['Which operation renames a file from old to new?',['os.rename(old, new)','os.remove(old, new)','os.listdir(old, new)','os.path.splitext(old, new)'],0,'os.rename takes source and destination paths. Whether replacement is allowed can depend on platform and target state.'],
['What does <code>f.read()</code> usually return from a text file?',['A str','A list of filenames','An int file descriptor','A bytes object in every mode'],0,'Text-mode reads decode data and return str. Binary mode returns bytes.'],
['What does opening a file in <code>"w"</code> mode do to an existing file?',['Truncates it before writing','Appends after its old contents','Fails if it exists','Reads without modifying'],0,'Write mode creates or truncates the target. Use append mode when old contents should remain.'],
['A file should be created without overwriting a prior report. Which choice is safest?',['Open with "x" and handle FileExistsError','Open with "w"','Open with "a" and assume empty','Open with "r" then write'],0,'Exclusive creation refuses an existing path. The caller should handle FileExistsError when collision is possible.'],
['Which claim about <code>input()</code> and <code>sys.argv</code> is correct?',['input reads standard input; argv holds command-line strings','They are identical interfaces','input returns a list of command-line arguments','argv reads a line typed after the program starts'],0,'input obtains a line interactively from standard input. argv captures arguments supplied when launching the process.'],
['Build a path for a file called <code>log.txt</code> inside a variable directory <code>folder</code>.',['os.path.join(folder, "log.txt")','os.path.basename(folder, "log.txt")','os.getcwd(folder, "log.txt")','folder.split("log.txt")'],0,'os.path.join is the path composition function; it handles separators according to the host platform.']
].map((x,i)=>({id:'a6-1-q'+(i+1),objective:['6.1','6.2','6.3'][i%3],prompt:x[0],parts:[{label:'Choose the best answer',options:x[1],answer:x[2]}],explanation:'<p>'+x[3]+'</p>'})),
 {id:'a6-1-q31',objective:'6.2',prompt:'<p>Complete the code to append UTF-8 text to <code>events.txt</code>, then write a line.</p>',parts:[{label:'Choose the mode',options:['"a"','"w"','"rb"','"x"'],answer:0},{label:'Choose the context-managed call',options:['with open("events.txt", mode, encoding="utf-8") as f: f.write("ready\\n")','open("events.txt", "rb").write("ready")','os.path.join("events.txt", mode)','sys.argv.append("ready")'],answer:0}],explanation:'<p>Append mode preserves earlier text, while the encoding applies to text I/O. A with block closes the handle; the newline is written as text.</p>'},
 ]
});
window.LESSONS.push({
 id:'a6-2',area:6,title:'Math, dates, and random choices',objectives:['6.4','6.5','6.6'],
 sections:[
 {heading:'Math functions and constants',body:`<p>Import <code>math</code> for mathematical functions and constants. <code>fabs(x)</code> returns a floating-point absolute value. <code>ceil</code> rounds toward positive infinity; <code>floor</code> toward negative infinity; and <code>trunc</code> discards the fractional part toward zero. These differ for negative values.</p><pre><code>import math
math.ceil(2.1)       # 3
math.floor(-2.1)     # -3
math.trunc(-2.1)     # -2
math.fmod(7.0, 3.0)  # 1.0
math.frexp(8.0)      # (0.5, 4)
math.sqrt(81)        # 9.0
math.isqrt(81)       # 9
math.pow(2, 3)       # 8.0
math.pi              # circle constant</code></pre><p><code>fmod(x, y)</code> computes a floating-point remainder with the sign of x (unlike the % operator in some negative cases). <code>frexp(x)</code> returns mantissa and exponent such that x = mantissa × 2**exponent. <code>nan</code> is a not-a-number value; compare it with <code>math.isnan(x)</code>, because NaN is not equal to itself. <code>sqrt</code> accepts nonnegative real values; <code>isqrt</code> gives the floor of the exact integer square root for nonnegative integers.</p>`},
 {heading:'Datetime formatting and weekday',body:`<p>The <code>datetime</code> module provides date and time objects. <code>datetime.now()</code> returns the current local date and time as a datetime object (with no timezone attached by default). Its value changes from call to call. Use <code>strftime</code> to format it using directives such as <code>%Y</code> (four-digit year), <code>%m</code> (month), <code>%d</code> (day), <code>%H</code> (24-hour), <code>%M</code> (minute), and <code>%A</code> (weekday name).</p><pre><code>from datetime import datetime
now = datetime.now()
label = now.strftime("%Y-%m-%d %H:%M")
weekday_index = now.weekday()  # Monday 0 ... Sunday 6</code></pre><p><code>weekday()</code> returns an integer: Monday is 0 and Sunday is 6. Do not confuse it with <code>isoweekday()</code>, where Monday is 1 and Sunday is 7. A formatting string is a template; it does not change the underlying datetime.</p>`},
 {heading:'Random numbers and selections',body:`<p>The <code>random</code> module generates pseudo-random values. <code>random()</code> returns a float in the half-open interval [0.0, 1.0). <code>randrange(start, stop[, step])</code> chooses from the corresponding range; the stop is excluded. <code>randint(a, b)</code> includes both endpoints. <code>choice(seq)</code> selects one element, <code>sample(population, k)</code> selects k distinct elements without replacement, and <code>shuffle(list)</code> reorders a mutable sequence in place and returns <code>None</code>.</p><pre><code>import random
r = random.random()                 # 0.0 <= r < 1.0
n = random.randrange(2, 8)          # 2 through 7
m = random.randint(2, 8)            # 2 through 8
one = random.choice(["red", "blue"])
picks = random.sample(range(10), 3) # distinct values
cards = ["A", "K", "Q"]
result = random.shuffle(cards)      # cards changes; result is None</code></pre><p>Random outputs vary, so reason about ranges and guarantees rather than a particular draw. For repeatable experiments, a seeded <code>random.Random(seed)</code> instance provides reproducibility in a given Python implementation/version context; do not use this module for security-sensitive tokens.</p>`}
 ],
 sources:[{label:'math — Mathematical functions',url:'https://docs.python.org/3/library/math.html'},{label:'datetime — Basic date and time types',url:'https://docs.python.org/3/library/datetime.html'},{label:'random — Generate pseudo-random numbers',url:'https://docs.python.org/3/library/random.html'}],
 questions:[
...[
['What is <code>math.fabs(-3)</code>?',['3.0','-3','3','-3.0'],0,'fabs returns the absolute value as a float, so the value is 3.0.'],
['What is <code>math.ceil(-2.3)</code>?',['-2','-3','2','3'],0,'Ceil rounds toward positive infinity; -2 is greater than -2.3 and is the next integer upward.'],
['What is <code>math.floor(-2.3)</code>?',['-3','-2','3','2'],0,'Floor rounds toward negative infinity, giving -3 for -2.3.'],
['What is <code>math.trunc(-2.9)</code>?',['-2','-3','2','3'],0,'trunc discards the fractional part toward zero, which yields -2 for a negative input.'],
['What is <code>math.fmod(7.0, 3.0)</code>?',['1.0','2.0','2.333...','0.0'],0,'Seven divided by three leaves a remainder of one; fmod returns a floating-point result.'],
['Which description fits <code>math.frexp(8.0)</code>?',['(0.5, 4), with x = m × 2**e','(8.0, 0)','(4, 2), with x = m + e','(1.0, 8)'],0,'frexp decomposes a finite value into a mantissa and exponent. Here 8 = 0.5 × 2**4.'],
['What is <code>math.sqrt(49)</code>?',['7.0','7','-7.0','2401'],0,'sqrt computes the nonnegative square root and returns a floating-point number.'],
['What is <code>math.isqrt(27)</code>?',['5','5.2','6','7'],0,'isqrt returns floor(sqrt(n)) for nonnegative integers. Since sqrt(27) is between 5 and 6, the result is 5.'],
['What is <code>math.pow(2, 5)</code>?',['32.0','10','25','-32'],0,'math.pow computes x raised to y and returns a float for ordinary numeric inputs.'],
['Which constant is the circle ratio of circumference to diameter?',['math.pi','math.nan','math.epsilon','math.sqrt'],0,'math.pi is the standard floating-point approximation of π.'],
['How should a program test whether <code>x</code> is NaN?',['math.isnan(x)','x == math.nan','x is math.nan','math.isfinite(x) == False'],0,'NaN does not compare equal to itself, so use the dedicated isnan predicate. isfinite also accepts infinities.'],
['What is <code>math.nan == math.nan</code>?',['False','True','None','An exception'],0,'By IEEE floating-point semantics, NaN is unequal to every value, including itself.'],
['Which input to <code>math.sqrt</code> raises a domain error for real-valued use?',['-1','0','9','0.25'],0,'The real square root is undefined for a negative argument, so math.sqrt(-1) raises ValueError.'],
['Which correctly contrasts floor and trunc for -4.8?',['floor is -5; trunc is -4','floor is -4; trunc is -5','both are -4','both are -5'],0,'Floor moves down toward negative infinity, whereas trunc moves toward zero. Negative values expose the difference.'],
['For a date that is Monday, what does <code>date.weekday()</code> return?',['0','1','6','7'],0,'weekday numbers Monday as zero and Sunday as six.'],
['Which call formats a datetime as a four-digit year, hyphen, month, hyphen, day?',['dt.strftime("%Y-%m-%d")','dt.strftime("%y-%M-%D")','dt.weekday("%Y-%m-%d")','dt.strftime("Y-m-d")'],0,'strftime interprets percent directives: %Y year, %m month, %d day. Literal letters without % are printed literally.'],
['What kind of value does <code>datetime.now()</code> return?',['A datetime object for the current local date and time','A formatted string only','An integer weekday','A random timestamp'],0,'now constructs a datetime object. Call strftime separately when a formatted string is needed.'],
['If <code>d.weekday()</code> is 6, which day is it?',['Sunday','Saturday','Monday','Tuesday'],0,'The weekday convention is Monday=0 through Sunday=6.'],
['What range can <code>random.random()</code> produce?',['0.0 inclusive to 1.0 exclusive','1.0 inclusive to 2.0 exclusive','Only integers 0 or 1','Any real number'],0,'random() returns a float in [0.0, 1.0), so zero is possible and one is excluded.'],
['What integers can <code>random.randrange(3, 7)</code> select?',['3, 4, 5, or 6','3 through 7 inclusive','4, 5, 6, or 7','Only 3 or 7'],0,'randrange follows range semantics: the start is included and stop is excluded.'],
['Can <code>random.randint(3, 7)</code> return 7?',['Yes; both endpoints are included','No; the upper endpoint is excluded','Only when seeded','Never'],0,'randint(a, b) is inclusive at both ends, unlike randrange(a, b+1) in appearance.'],
['Which operation chooses one item from a sequence?',['random.choice(seq)','random.sample(seq, 1)','random.shuffle(seq)','random.random(seq)'],0,'choice selects and returns one element. sample returns a list; shuffle mutates a list.'],
['A quiz draws 4 distinct names from a list. Which function matches?',['random.sample(names, 4)','random.choice(names)','random.shuffle(names)','random.randint(0, 4)'],0,'sample selects k unique elements without replacement and returns them in a new list.'],
['What does <code>random.shuffle(cards)</code> return?',['None; it changes cards in place','A new shuffled list','The first card','The number of swaps'],0,'shuffle mutates the supplied mutable sequence and returns None. Assigning its return value loses the list reference.'],
['What is guaranteed about <code>random.sample(["a","b","c"], 2)</code>?',['It returns two distinct selected elements','It always returns ["a", "b"]','It mutates the input list','It can return three elements'],0,'sample returns the requested number of unique selections; the particular order and values vary.'],
['You need a random integer from 1 through 6 like a die. Which is correct?',['random.randint(1, 6)','random.randrange(1, 6)','int(random.random() * 6)','random.choice(1, 6)'],0,'randint includes both limits. randrange(1, 6) would stop at five.'],
['A program needs a random even integer from 2, 4, 6, 8. Which call is suitable?',['random.randrange(2, 10, 2)','random.randrange(2, 8, 2)','random.randint(2, 8, 2)','random.choice(2, 4, 6, 8)'],0,'randrange accepts start, exclusive stop, and step. A stop of 10 includes 8 in the stepped sequence.'],
['What does <code>dt.strftime("%A")</code> produce?',['The weekday name','The weekday number from 0 to 6','The month number','The timezone object'],0,'%A formats the full weekday name according to the active locale. weekday() is the method for a numeric index.'],
['Which is the correct formatting directive for minutes in a 24-hour time string?',['%M','%m','%H','%S'],0,'%M is minutes; lowercase %m is month, %H is hour, and %S is seconds.'],
['Which statement about using <code>random</code> for passwords is sound?',['It is a pseudo-random utility, not intended for security-sensitive secrets','Every result is cryptographically secure','choice always selects unpredictable secrets','Seeding makes it secure'],0,'The random module is designed for simulation and general purposes, not cryptographic security. Use secrets for security-sensitive choices.']
].map((x,i)=>({id:'a6-2-q'+(i+1),objective:['6.4','6.5','6.6'][i%3],prompt:x[0],parts:[{label:'Choose the best answer',options:x[1],answer:x[2]}],explanation:'<p>'+x[3]+'</p>'})),
 {id:'a6-2-q31',objective:'6.4',prompt:'<p>Complete both expressions for a circle of radius <code>r</code>, using circumference 2πr and area πr².</p>',parts:[{label:'Select the constant',options:['math.pi','math.nan','math.e','math.inf'],answer:0},{label:'Select the area expression',options:['math.pi * r ** 2','2 * math.pi * r','math.sqrt(r)','math.floor(math.pi)'],answer:0}],explanation:'<p>math.pi supplies π. The circumference formula is 2πr and the area formula is π multiplied by r squared; exponentiation binds before multiplication.</p>'},
 ]
});
