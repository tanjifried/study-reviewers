// Original study explanations and practice questions; source videos remain on YouTube.
window.AUTOMATA_DATA = {
  "version": "d5cb88ae174d28ca",
  "compatibleVersions": [],
  "lessons": [
    {
      "id": "lesson-1",
      "number": 1,
      "title": "Introduction to Automata Theory",
      "videoId": "yPaUNLEyFxo",
      "duration": 609.8,
      "overview": "An introductory tour of automata theory: why abstract machine models are useful, how everyday devices illustrate stateful behavior, and how inputs, outputs, states, and broad machine families fit into the subject.",
      "objectives": [
        "Explain why computer scientists study abstract machine models.",
        "Use a thermostat and familiar devices to illustrate automatic behavior and states.",
        "Distinguish automaton (singular) from automata (plural).",
        "Describe automata theory as the study and analysis of abstract computational models.",
        "Identify input, output, and state as machine characteristics and name the four families introduced."
      ],
      "keyTerms": [
        {
          "term": "Automaton",
          "definition": "A formal model of a machine or computational process; automata is its plural."
        },
        {
          "term": "Automata theory",
          "definition": "A branch of computer science and mathematics that studies abstract models of computation and their behavior."
        },
        {
          "term": "Abstract machine",
          "definition": "A simplified formal model that captures relevant computational behavior without requiring every physical implementation detail."
        },
        {
          "term": "State",
          "definition": "A condition or configuration of a machine that summarizes information relevant to its behavior."
        },
        {
          "term": "Input",
          "definition": "A symbol or sequence of symbols supplied to a machine, typically drawn from a specified input alphabet."
        },
        {
          "term": "Output",
          "definition": "A symbol or sequence of symbols a machine produces, when that model defines output behavior."
        },
        {
          "term": "Discrete system",
          "definition": "A system modeled through distinct events or values, often with signals sampled at separate time points."
        },
        {
          "term": "Turing machine",
          "definition": "A highly general formal model of computation, introduced in this lesson as one of four machine families."
        }
      ],
      "segments": [
        {
          "id": "why-study",
          "start": 20.5,
          "end": 133.5,
          "title": "Why study automata?",
          "notes": [
            "Automata theory lets us reason systematically about what a machine does without first building or inspecting its hardware.",
            "A model helps explain how a system solves a problem and how an input can affect its behavior.",
            "The lecture connects this way of thinking to designing repeatable systems, including computers and aircraft autopilot systems."
          ],
          "speakerNotes": "Pag-aralan ang behavior ng machine kahit wala sa harap natin ang mismong hardware. Nakakatulong ang model sa pag-intindi kung paano nagiging output ang inputs at kung paano gumagawa ng repeatable actions ang isang system.",
          "visualDescription": "Slides titled “WHY WE STUDY AUTOMATA” show bullets about reasoning without hardware detail and understanding how machines solve problems, alongside pictures of computer, phone, industrial automation, and laboratory equipment.",
          "frames": [
            {
              "src": "frames/lesson-1/frame-0050.jpg",
              "seconds": 50,
              "width": 854,
              "height": 480,
              "caption": "0:50 · Why study automata?",
              "alt": "Source video frame at 0:50: Why study automata?"
            },
            {
              "src": "frames/lesson-1/frame-0095.jpg",
              "seconds": 95,
              "width": 854,
              "height": 480,
              "caption": "1:35 · Why study automata?",
              "alt": "Source video frame at 1:35: Why study automata?"
            }
          ]
        },
        {
          "id": "thermostat",
          "start": 133.5,
          "end": 212.03,
          "title": "A thermostat as a small state-based example",
          "notes": [
            "The thermostat example has two named states: on and off.",
            "It checks surrounding temperature and changes operation in response to a temperature condition.",
            "The example demonstrates how a simple model can describe behavior while larger computing systems may involve many more states and inputs."
          ],
          "speakerNotes": "Sa thermostat example, on at off ang dalawang states. Nagbabago ang operation depende sa temperature condition. Mas komplikado ang computer dahil mas marami ang inputs at posibleng states.",
          "visualDescription": "A thermostat slide shows an on/off control and the two-state idea; surrounding examples include a pendulum clock, missile guidance, and telephone networks.",
          "frames": [
            {
              "src": "frames/lesson-1/frame-0170.jpg",
              "seconds": 170,
              "width": 854,
              "height": 480,
              "caption": "2:50 · A thermostat as a small state-based example",
              "alt": "Source video frame at 2:50: A thermostat as a small state-based example"
            }
          ]
        },
        {
          "id": "automaton-elevator",
          "start": 212.03,
          "end": 326.51,
          "title": "Automaton, automata, and automatic devices",
          "notes": [
            "The word automata is presented as referring to self-acting or automatic machines; automaton is singular and automata plural.",
            "An elevator illustrates input and response: selecting a floor prompts the system to act toward that floor.",
            "The speaker also uses choosing a television channel, typing a character, and entering an ATM PIN to illustrate input-driven behavior.",
            "A formal automaton is a model of behavior; a physical elevator, TV, or ATM is a real system that may be modeled in many ways."
          ],
          "speakerNotes": "Automaton ang singular at automata ang plural. Ipinapakita ng elevator, TV at ATM examples kung paano may automatic na response sa isang input.",
          "visualDescription": "The slide gives the Greek-root/“self-acting” explanation and singular/plural labels. A photo of an elevator and a small state diagram appear, followed by images of automated devices.",
          "frames": [
            {
              "src": "frames/lesson-1/frame-0220.jpg",
              "seconds": 220,
              "width": 854,
              "height": 480,
              "caption": "3:40 · Automaton, automata, and automatic devices",
              "alt": "Source video frame at 3:40: Automaton, automata, and automatic devices"
            },
            {
              "src": "frames/lesson-1/frame-0245.jpg",
              "seconds": 245,
              "width": 854,
              "height": 480,
              "caption": "4:05 · Automaton, automata, and automatic devices",
              "alt": "Source video frame at 4:05: Automaton, automata, and automatic devices"
            },
            {
              "src": "frames/lesson-1/frame-0280.jpg",
              "seconds": 280,
              "width": 854,
              "height": 480,
              "caption": "4:40 · Automaton, automata, and automatic devices",
              "alt": "Source video frame at 4:40: Automaton, automata, and automatic devices"
            }
          ]
        },
        {
          "id": "theory-and-models",
          "start": 326.51,
          "end": 494.61,
          "title": "Automata theory and abstract machine models",
          "notes": [
            "Automata theory is introduced as a theoretical area of computer science and mathematics concerned with mathematical models of computation.",
            "Abstract models let us analyze how a system behaves without tying the reasoning to one physical implementation.",
            "The lecture describes a model in terms of inputs, outputs, and operations; it uses a banking-system model with deposit, withdrawal, and transfer operations.",
            "The Turing machine is introduced as a particularly general and powerful abstract model.",
            "The speaker distinguishes a model implemented in software (called a virtual machine in the slide) from a hardware implementation."
          ],
          "speakerNotes": "Ang automata theory ay tungkol sa abstract machine models. Sa model, puwedeng pag-aralan ang inputs, outputs at operations nang hindi kailangang isama ang lahat ng hardware details.",
          "visualDescription": "Slides define theory as study of abstract machines; a banking example lists deposit/withdraw/transfer. Later slides show large state-machine illustrations, a Turing-machine label, and “virtual machine” versus “machine” implementation labels.",
          "caution": "An abstract machine is a mathematical model, not necessarily a runnable software virtual machine. Also, hardware implementation does not by itself make an abstract model “a machine”; implementation and formal model are different levels.",
          "frames": [
            {
              "src": "frames/lesson-1/frame-0330.jpg",
              "seconds": 330,
              "width": 854,
              "height": 480,
              "caption": "5:30 · Automata theory and abstract machine models",
              "alt": "Source video frame at 5:30: Automata theory and abstract machine models"
            },
            {
              "src": "frames/lesson-1/frame-0385.jpg",
              "seconds": 385,
              "width": 854,
              "height": 480,
              "caption": "6:25 · Automata theory and abstract machine models",
              "alt": "Source video frame at 6:25: Automata theory and abstract machine models"
            },
            {
              "src": "frames/lesson-1/frame-0445.jpg",
              "seconds": 445,
              "width": 854,
              "height": 480,
              "caption": "7:25 · Automata theory and abstract machine models",
              "alt": "Source video frame at 7:25: Automata theory and abstract machine models"
            },
            {
              "src": "frames/lesson-1/frame-0475.jpg",
              "seconds": 475,
              "width": 854,
              "height": 480,
              "caption": "7:55 · Automata theory and abstract machine models",
              "alt": "Source video frame at 7:55: Automata theory and abstract machine models"
            }
          ]
        },
        {
          "id": "objective-discrete",
          "start": 494.61,
          "end": 515.9,
          "title": "The objective: describe and analyze discrete behavior",
          "notes": [
            "The stated objective is to develop methods for describing and analyzing the dynamic behavior of discrete systems.",
            "The slide mentions signals sampled periodically as one way such systems may be represented."
          ],
          "speakerNotes": "Layunin na magkaroon ng paraan para ilarawan at suriin ang pagbabago ng behavior ng discrete systems. Ang note na ito ay buod, hindi eksaktong salita ng speaker.",
          "visualDescription": "A slide titled “OBJECTIVE OF AUTOMATA THEORY” summarizes methods for describing and analyzing dynamic behavior of discrete systems with periodically sampled signals.",
          "frames": [
            {
              "src": "frames/lesson-1/frame-0500.jpg",
              "seconds": 500,
              "width": 854,
              "height": 480,
              "caption": "8:20 · The objective: describe and analyze discrete behavior",
              "alt": "Source video frame at 8:20: The objective: describe and analyze discrete behavior"
            }
          ]
        },
        {
          "id": "machine-characteristics",
          "start": 515.9,
          "end": 558.13,
          "title": "Inputs, outputs, and states",
          "notes": [
            "Inputs and outputs are described as sequences of symbols chosen from finite sets (alphabets).",
            "The state set depends on the particular machine model.",
            "A block diagram shows an input sequence entering an automaton and an output sequence leaving it, with states inside the machine.",
            "Treat these as common modeling dimensions, not a universal promise that every automaton produces an output sequence."
          ],
          "speakerNotes": "Tatlong characteristics ang ipinapakita: inputs, outputs at states. Ang kahulugan ng state ay nakadepende sa klase ng machine model na pinag-aaralan.",
          "visualDescription": "A “CHARACTERISTICS OF MACHINES” slide lists inputs, outputs, and states; a subsequent block diagram routes an input sequence through an automaton with internal states to an output sequence.",
          "caution": "The diagram is a broad machine-model picture. Many standard finite automata are acceptors: they classify an input string as accepted or rejected instead of emitting an arbitrary output string. Output behavior depends on the chosen model.",
          "frames": [
            {
              "src": "frames/lesson-1/frame-0526.jpg",
              "seconds": 526,
              "width": 854,
              "height": 480,
              "caption": "8:46 · Inputs, outputs, and states",
              "alt": "Source video frame at 8:46: Inputs, outputs, and states"
            },
            {
              "src": "frames/lesson-1/frame-0550.jpg",
              "seconds": 550,
              "width": 854,
              "height": 480,
              "caption": "9:10 · Inputs, outputs, and states",
              "alt": "Source video frame at 9:10: Inputs, outputs, and states"
            }
          ]
        },
        {
          "id": "four-families",
          "start": 558.13,
          "end": 609.8,
          "title": "Four major families of automata",
          "notes": [
            "The lesson names finite-state machines, pushdown automata, linear-bounded automata, and Turing machines.",
            "The closing narration presents them in an increasing-complexity hierarchy, from finite-state machines toward Turing machines.",
            "This is a first-pass orientation; later lessons are needed to compare their memory, computational power, and formal definitions."
          ],
          "speakerNotes": "Apat na families ang binanggit: finite-state machine, pushdown automata, linear-bounded automata at Turing machine. Ipinapakita sila bilang mas simple hanggang mas general na computational models.",
          "visualDescription": "A slide lists the four families in order and briefly highlights finite-state machine at the beginning and Turing machine at the end.",
          "caution": "“Complexity” here is an informal teaching shorthand. The formal distinctions are about computational resources and language-recognition power, not simply how complicated a physical machine looks.",
          "frames": [
            {
              "src": "frames/lesson-1/frame-0570.jpg",
              "seconds": 570,
              "width": 854,
              "height": 480,
              "caption": "9:30 · Four major families of automata",
              "alt": "Source video frame at 9:30: Four major families of automata"
            }
          ]
        }
      ],
      "recap": [
        "Automata theory uses abstract models to reason about computational behavior.",
        "A thermostat offers an intuitive two-state example; familiar devices also illustrate inputs followed by actions.",
        "Automaton is singular; automata is plural.",
        "Inputs, outputs (when applicable), and states help describe machine models.",
        "The introduction names four families: finite-state, pushdown, linear-bounded, and Turing machines."
      ],
      "commonMistakes": [
        "Treating the physical device as identical to its abstract model.",
        "Assuming every automaton emits an output sequence; some models only accept or reject strings.",
        "Using automata as a singular noun instead of automaton.",
        "Interpreting the four-family ordering as a complete formal account of their power."
      ],
      "questions": [
        {
          "id": "l1-q01",
          "prompt": "What is the main reason the lesson gives for studying automata?",
          "choices": [
            "To design hardware without using mathematics",
            "To reason systematically about machine behavior without needing its physical hardware details",
            "To replace all physical machines with software",
            "To memorize the names of computer components"
          ],
          "answer": 1,
          "explanation": "The opening motivation is to analyze what a machine does at an abstract level, without depending on access to its hardware.",
          "segmentId": "why-study"
        },
        {
          "id": "l1-q02",
          "prompt": "In the thermostat example, which two states does the lesson focus on?",
          "choices": [
            "Heating and cooling",
            "High and low temperature",
            "On and off",
            "Open and closed"
          ],
          "answer": 2,
          "explanation": "The example deliberately reduces the thermostat to two relevant states: on and off.",
          "segmentId": "thermostat"
        },
        {
          "id": "l1-q03",
          "prompt": "A user selects floor 5 in the elevator example. What role does that selection play in the illustration?",
          "choices": [
            "It is an input that prompts the elevator system to respond",
            "It is the elevator’s output alphabet",
            "It is a proof that elevators have only five states",
            "It is an implementation of a Turing machine"
          ],
          "answer": 0,
          "explanation": "The selected floor is the input; the elevator’s resulting action illustrates input-driven behavior.",
          "segmentId": "automaton-elevator"
        },
        {
          "id": "l1-q04-id",
          "kind": "identification",
          "prompt": "Study of abstract machines",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Automata theory",
          "acceptedAnswers": [
            "Automata theory",
            "theory of automata"
          ],
          "explanation": "This source wording identifies automata theory. Use the source frame to review it in context.",
          "segmentId": "theory-and-models",
          "sourceFrame": "frames/lesson-1/frame-0385.jpg",
          "sourceSeconds": 385
        },
        {
          "id": "l1-q05-id",
          "kind": "identification",
          "prompt": "model of a computer system",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Abstract machine",
          "acceptedAnswers": [
            "Abstract machine",
            "abstract machines"
          ],
          "explanation": "This source wording identifies abstract machine. Use the source frame to review it in context.",
          "segmentId": "theory-and-models",
          "sourceFrame": "frames/lesson-1/frame-0405.jpg",
          "sourceSeconds": 405
        },
        {
          "id": "l1-q06",
          "prompt": "Which set of banking operations is used to illustrate a modeled system?",
          "choices": [
            "Deposit, withdraw, and transfer",
            "Print, scan, and copy",
            "Search, sort, and compile",
            "Lock, unlock, and restart"
          ],
          "answer": 0,
          "explanation": "The speaker uses a banking-system model with deposit, withdrawal, and transfer as example operations.",
          "segmentId": "theory-and-models"
        },
        {
          "id": "l1-q07",
          "prompt": "Which description best matches the lesson’s stated objective for automata theory?",
          "choices": [
            "To build every machine from the same parts",
            "To make all signals continuous",
            "To classify devices by their physical size",
            "To develop methods to describe and analyze dynamic behavior of discrete systems"
          ],
          "answer": 3,
          "explanation": "The objective slide emphasizes describing and analyzing the dynamic behavior of discrete systems.",
          "segmentId": "objective-discrete"
        },
        {
          "id": "l1-q08",
          "prompt": "According to the lesson, what is true of input sequences?",
          "choices": [
            "They must contain words from natural language",
            "They are always a single number",
            "They are sequences chosen from a finite set of input symbols",
            "They are states emitted after processing"
          ],
          "answer": 2,
          "explanation": "The characteristics slide defines inputs as symbol sequences selected from a finite input set.",
          "segmentId": "machine-characteristics"
        },
        {
          "id": "l1-q09",
          "prompt": "Why should the output block in the lesson’s machine diagram be treated as model-dependent?",
          "choices": [
            "Outputs are only possible in physical machines",
            "Some automata models recognize or reject strings instead of emitting an output sequence",
            "An output is the same thing as a state",
            "The diagram proves every model uses the same output alphabet"
          ],
          "answer": 1,
          "explanation": "The diagram is a broad illustration; standard finite automata often accept or reject strings rather than emit general output sequences.",
          "segmentId": "machine-characteristics"
        },
        {
          "id": "l1-q10",
          "prompt": "Which item is not one of the three machine characteristics listed in the lesson?",
          "choices": [
            "Input",
            "Output",
            "State",
            "Clock speed"
          ],
          "answer": 3,
          "explanation": "The lesson lists input, output, and state. Clock speed is not one of those conceptual characteristics.",
          "segmentId": "machine-characteristics"
        },
        {
          "id": "l1-q11",
          "prompt": "Which list matches the four families named near the end of the video?",
          "choices": [
            "Finite-state, pushdown, linear-bounded, Turing",
            "Thermostat, elevator, ATM, telephone",
            "DFA, NFA, regular, context-free",
            "Input, output, process, operation"
          ],
          "answer": 0,
          "explanation": "The slide names finite-state machines, pushdown automata, linear-bounded automata, and Turing machines.",
          "segmentId": "four-families"
        },
        {
          "id": "l1-q12",
          "prompt": "What does the lesson’s simplest-to-most-complex ordering of the families chiefly provide?",
          "choices": [
            "A complete proof of how each machine works",
            "A first-pass orientation that later study must formalize",
            "A ranking of physical device prices",
            "A statement that each family has identical memory"
          ],
          "answer": 1,
          "explanation": "The hierarchy is presented as an introductory orientation. Formal comparisons require definitions and computational-resource analysis.",
          "segmentId": "four-families"
        },
        {
          "id": "l1-q13",
          "prompt": "A student says, “An automaton is the elevator itself.” Which correction best reflects the lesson?",
          "choices": [
            "An automaton is only the elevator’s control panel",
            "An automaton is always a human operator",
            "An automaton means the elevator’s destination floor",
            "An automaton is a model that can describe relevant elevator behavior; the physical elevator is the system being modeled"
          ],
          "answer": 3,
          "explanation": "The examples motivate modeling, but the formal automaton is the abstract model rather than the physical device itself.",
          "segmentId": "automaton-elevator"
        },
        {
          "id": "l1-q14-id",
          "kind": "identification",
          "prompt": "implemented in software",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Virtual machine",
          "acceptedAnswers": [
            "Virtual machine",
            "virtual machines"
          ],
          "explanation": "This source wording identifies virtual machine. Use the source frame to review it in context.",
          "segmentId": "theory-and-models",
          "sourceFrame": "frames/lesson-1/frame-0475.jpg",
          "sourceSeconds": 475
        },
        {
          "id": "l1-q15",
          "prompt": "Which statement about the thermostat example is the most careful interpretation?",
          "choices": [
            "Every real thermostat has exactly two possible internal configurations",
            "The lesson uses on/off as a simplified model of relevant thermostat states",
            "The example proves thermostats recognize strings",
            "A thermostat cannot react to a temperature condition"
          ],
          "answer": 1,
          "explanation": "The two-state presentation is pedagogical. Real thermostats may contain more modes and control details than the simplified example shows.",
          "segmentId": "thermostat"
        }
      ],
      "provenance": "Based on TeacherCat 4U’s Introduction video, reviewed with full-video samples and automatic transcription. English explanations, questions and Taglish speaker notes are newly written. Speaker notes are paraphrases, and timestamps locate topics approximately."
    },
    {
      "id": "lesson-2",
      "number": 2,
      "title": "Finite automata: states, symbols, DFA and NFA",
      "videoId": "cmx06k7XSno",
      "duration": 2266,
      "overview": "Turn the five-part definition into something you can read, trace, and classify. Then inspect the lecture’s DFA/NFA figures one state and input symbol at a time.",
      "objectives": [
        "Identify Q, Σ, δ, q₀ and F in a finite automaton.",
        "Trace an input through a finite-state machine.",
        "Distinguish a complete DFA from an NFA with genuine branching."
      ],
      "keyTerms": [
        {
          "term": "State",
          "definition": "A member of the finite set Q representing current machine memory."
        },
        {
          "term": "Alphabet",
          "definition": "The finite set Σ of input symbols."
        },
        {
          "term": "Transition function",
          "definition": "The rule δ for moving on an input symbol."
        },
        {
          "term": "DFA",
          "definition": "A deterministic finite automaton with one next state per state–symbol pair."
        },
        {
          "term": "NFA",
          "definition": "A finite automaton whose next-step relation can yield a set of possible states."
        },
        {
          "term": "Accepting state",
          "definition": "A state in F that makes a complete run accept."
        }
      ],
      "segments": [
        {
          "id": "recognize-patterns",
          "start": 43,
          "end": 254,
          "title": "A finite machine recognizes a pattern",
          "notes": [
            "A finite automaton has a fixed, finite collection of states. Each input symbol determines which transition can be taken. Its current state summarizes the information remembered about the input read so far.",
            "The opening example distinguishes accepting and rejecting outcomes. For language recognition, acceptance is decided after the entire input has been consumed—not merely when an accepting state is visited along the way."
          ],
          "speakerNotes": "Sa finite automaton, may states at rules ng paglipat depende sa input symbol. Binabasa ang string at sinusunod ang transitions para malaman kung accepted ang buong input.",
          "visualDescription": "The definition slide adds input-string, state-change, and accept/reject explanations next to a small transition graph.",
          "frames": [
            {
              "src": "frames/lesson-2/frame-0050.jpg",
              "seconds": 50,
              "width": 854,
              "height": 480,
              "caption": "0:50 · A finite machine recognizes a pattern",
              "alt": "Source video frame at 0:50: A finite machine recognizes a pattern"
            },
            {
              "src": "frames/lesson-2/frame-0100.jpg",
              "seconds": 100,
              "width": 854,
              "height": 480,
              "caption": "1:40 · A finite machine recognizes a pattern",
              "alt": "Source video frame at 1:40: A finite machine recognizes a pattern"
            }
          ]
        },
        {
          "id": "machine-features",
          "start": 254,
          "end": 285,
          "title": "Input, output, and internal state",
          "notes": [
            "The lecture briefly returns to the machine model: an input sequence enters the automaton, internal states change, and an output is produced by the modeled machine.",
            "For the DFA/NFA language recognizers studied next, focus on the final accept/reject result. Do not assume that every finite automaton in this course is a transducer that emits one output symbol per input symbol."
          ],
          "speakerNotes": "Ipinapakita ang input, output, states, state relation at output relation bilang mga bahagi ng model ng machine.",
          "visualDescription": "An input–automaton–output block diagram replaces the opening definition.",
          "frames": [
            {
              "src": "frames/lesson-2/frame-0260.jpg",
              "seconds": 260,
              "width": 854,
              "height": 480,
              "caption": "4:20 · Input, output, and internal state",
              "alt": "Source video frame at 4:20: Input, output, and internal state"
            }
          ]
        },
        {
          "id": "five-tuple",
          "start": 285,
          "end": 356,
          "title": "Read the five-part specification",
          "notes": [
            "Write a finite automaton as (Q, Σ, δ, q₀, F). Q is the finite set of states; Σ is the finite input alphabet; δ gives the transitions; q₀ is the initial state; F is the set of accepting states.",
            "Keep a set separate from an element: q₀ belongs to Q, whereas F is a subset of Q. A machine can have more than one accepting state even though it has one designated start state."
          ],
          "speakerNotes": "Ang five-tuple ay Q, sigma, delta, q-zero at F. Magkakaiba ang papel ng states, input symbols, transition function, initial state at final-state set.",
          "visualDescription": "The formula is revealed first, followed by the meaning of each symbol.",
          "frames": [
            {
              "src": "frames/lesson-2/frame-0290.jpg",
              "seconds": 290,
              "width": 854,
              "height": 480,
              "caption": "4:50 · Read the five-part specification",
              "alt": "Source video frame at 4:50: Read the five-part specification"
            },
            {
              "src": "frames/lesson-2/frame-0330.jpg",
              "seconds": 330,
              "width": 854,
              "height": 480,
              "caption": "5:30 · Read the five-part specification",
              "alt": "Source video frame at 5:30: Read the five-part specification"
            }
          ]
        },
        {
          "id": "tuple-example",
          "start": 356,
          "end": 645,
          "title": "Connect the tuple to an actual graph",
          "notes": [
            "The source labels its four states A, B, C, and D, its alphabet {0, 1}, its start A, and its accepting set {D}. Read the state names from nodes, not from arrow labels.",
            "The recreated figure preserves the visible square example: 0 changes between the top and bottom rows, and 1 changes between the left and right columns. A double circle marks D as accepting."
          ],
          "speakerNotes": "Sa example, Q ay A, B, C at D; ang input symbols ay 0 at 1; A ang simula at D ang final state. Gamitin ang arrows para basahin ang transition function.",
          "visualDescription": "A handwritten four-state automaton is placed beside the tuple definitions. The recreated figure turns the same transitions into a readable diagram.",
          "diagram": "l2-parity-square",
          "workedSteps": [
            "Start at A. On input 0, move to C.",
            "From C on input 1, move to D.",
            "The full string 01 ends in D, so it is accepted. A later symbol would still have to be consumed before deciding acceptance."
          ],
          "frames": [
            {
              "src": "frames/lesson-2/frame-0365.jpg",
              "seconds": 365,
              "width": 854,
              "height": 480,
              "caption": "6:05 · Connect the tuple to an actual graph",
              "alt": "Source video frame at 6:05: Connect the tuple to an actual graph"
            }
          ]
        },
        {
          "id": "tuple-table",
          "start": 645,
          "end": 790,
          "title": "Build the four-state transition table row by row",
          "notes": [
            "The source now translates the square graph into a table with columns 0 and 1. The table is a second representation of the same machine, not a different example.",
            "Use one row per current state: A gives [C,B], B gives [D,A], C gives [A,D], and D gives [B,C]. Every entry is a destination state, not an output symbol."
          ],
          "speakerNotes": "Sa table, ilagay ang A, B, C at D sa rows at 0 at 1 sa columns. Basahin ang arrows: A sa 0 ay C, A sa 1 ay B; sundan din ang transitions ng B, C at D.",
          "visualDescription": "The handwritten example develops into a state/input table while the speaker checks each row. The accessible full-video frame corroborates the table.",
          "diagram": "l2-parity-square",
          "workedSteps": [
            "About 11:14–11:45: read A on 0 as C and A on 1 as B.",
            "About 11:45–12:15: read B on 0 as D and B on 1 as A.",
            "About 12:15–12:44: read C on 0 as A and C on 1 as D.",
            "About 12:44–13:10: read D on 0 as B and D on 1 as C."
          ],
          "frames": [
            {
              "src": "frames/lesson-2/frame-0700.jpg",
              "seconds": 700,
              "width": 854,
              "height": 480,
              "caption": "11:40 · Build the four-state transition table row by row",
              "alt": "Source video frame at 11:40: Build the four-state transition table row by row"
            },
            {
              "src": "frames/lesson-2/frame-0740.jpg",
              "seconds": 740,
              "width": 854,
              "height": 480,
              "caption": "12:20 · Build the four-state transition table row by row",
              "alt": "Source video frame at 12:20: Build the four-state transition table row by row"
            },
            {
              "src": "frames/lesson-2/frame-0785.jpg",
              "seconds": 785,
              "width": 854,
              "height": 480,
              "caption": "13:05 · Build the four-state transition table row by row",
              "alt": "Source video frame at 13:05: Build the four-state transition table row by row"
            }
          ]
        },
        {
          "id": "input-tape",
          "start": 790,
          "end": 1084,
          "title": "The tape and the finite control",
          "notes": [
            "The input tape is drawn as a row of cells, with one input symbol per cell. A read head identifies the next symbol, while finite control stores the current state.",
            "The lesson reads the tape from left to right, one symbol at a time. The current state changes according to δ; the machine does not gain a new state for every extra character in the input."
          ],
          "speakerNotes": "Ang input tape ay may cells para sa symbols. Binabasa ng read head ang symbols pakaliwa-pakanan habang ang finite control ang sumusunod sa rules ng state transitions.",
          "visualDescription": "The tape/control schematic changes into a tape labeled with the example input a b a a b and a read-head pointer.",
          "frames": [
            {
              "src": "frames/lesson-2/frame-0800.jpg",
              "seconds": 800,
              "width": 854,
              "height": 480,
              "caption": "13:20 · The tape and the finite control",
              "alt": "Source video frame at 13:20: The tape and the finite control"
            },
            {
              "src": "frames/lesson-2/frame-0920.jpg",
              "seconds": 920,
              "width": 854,
              "height": 480,
              "caption": "15:20 · The tape and the finite control",
              "alt": "Source video frame at 15:20: The tape and the finite control"
            }
          ]
        },
        {
          "id": "dfa-and-nfa",
          "start": 1084,
          "end": 1494,
          "title": "Deterministic and nondeterministic choices",
          "notes": [
            "For a complete DFA, every state and every symbol in Σ have exactly one destination. There are no ε-transitions. One current state and the next symbol therefore determine a unique next state.",
            "An NFA transition returns a set of possible destinations. That set may be empty or have several members. A word is accepted when at least one complete path consumes the word and ends in an accepting state.",
            "The source presents DFA and NFA as two kinds of finite automata, then notes that every DFA can also be regarded as an NFA. To make classification questions unambiguous, these quizzes use “DFA” and “NFA but not DFA” as separate choices."
          ],
          "speakerNotes": "Sa DFA, unique ang susunod na state para sa isang state at symbol. Sa NFA, puwedeng maraming choices. Puwede ring ituring ang isang DFA bilang espesyal na NFA.",
          "visualDescription": "A branching classification chart is shown with small deterministic and nondeterministic transition examples; later bullet points compare the two.",
          "caution": "Convention: this pack uses complete DFAs. A partially drawn deterministic graph may omit an implicit rejecting sink. NFA definitions differ on whether ε-moves are included; ε-NFA is identified explicitly when needed.",
          "frames": [
            {
              "src": "frames/lesson-2/frame-1235.jpg",
              "seconds": 1235,
              "width": 854,
              "height": 480,
              "caption": "20:35 · Deterministic and nondeterministic choices",
              "alt": "Source video frame at 20:35: Deterministic and nondeterministic choices"
            },
            {
              "src": "frames/lesson-2/frame-1395.jpg",
              "seconds": 1395,
              "width": 854,
              "height": 480,
              "caption": "23:15 · Deterministic and nondeterministic choices",
              "alt": "Source video frame at 23:15: Deterministic and nondeterministic choices"
            }
          ]
        },
        {
          "id": "comparison",
          "start": 1494,
          "end": 1958,
          "title": "Compare the transition rules, not the drawing style",
          "notes": [
            "DFA means deterministic finite automaton; NFA means nondeterministic finite automaton. State count, curved arrows, and multiple final states do not by themselves identify nondeterminism.",
            "Check one state–symbol pair at a time. Different symbols leaving one state are normal in a DFA; the problem is two distinct destinations for the same symbol, or an ε-move."
          ],
          "speakerNotes": "Sa pag-compare, tingnan ang transitions at choices sa bawat input, hindi lang kung maraming bilog o arrows ang figure.",
          "visualDescription": "The comparison section introduces the names, a unique-versus-several-choices comparison, and then a gallery of six diagrams.",
          "frames": [
            {
              "src": "frames/lesson-2/frame-1505.jpg",
              "seconds": 1505,
              "width": 854,
              "height": 480,
              "caption": "25:05 · Compare the transition rules, not the drawing style",
              "alt": "Source video frame at 25:05: Compare the transition rules, not the drawing style"
            },
            {
              "src": "frames/lesson-2/frame-1700.jpg",
              "seconds": 1700,
              "width": 854,
              "height": 480,
              "caption": "28:20 · Compare the transition rules, not the drawing style",
              "alt": "Source video frame at 28:20: Compare the transition rules, not the drawing style"
            },
            {
              "src": "frames/lesson-2/frame-1815.jpg",
              "seconds": 1815,
              "width": 854,
              "height": 480,
              "caption": "30:15 · Compare the transition rules, not the drawing style",
              "alt": "Source video frame at 30:15: Compare the transition rules, not the drawing style"
            }
          ]
        },
        {
          "id": "gallery-branching",
          "start": 1982,
          "end": 2013,
          "title": "The first gallery figure branches on the same symbol",
          "notes": [
            "The enlarged first gallery graph begins at A and has two outgoing a-arrows, one toward B and one toward E. That single state–symbol pair is enough to show that the graph is not deterministic.",
            "Do not stop at counting all outgoing arrows: identify the labels and destinations. Several arrows with different labels can still be deterministic."
          ],
          "speakerNotes": "Sa unang malaking figure, dalawang a-transitions ang lumalabas sa A. Iyon ang mahalagang ebidensiya ng nondeterministic choice.",
          "visualDescription": "The gallery zooms into a six-state graph with two a-labeled branches from its start.",
          "frames": [
            {
              "src": "frames/lesson-2/frame-1990.jpg",
              "seconds": 1990,
              "width": 854,
              "height": 480,
              "caption": "33:10 · The first gallery figure branches on the same symbol",
              "alt": "Source video frame at 33:10: The first gallery figure branches on the same symbol"
            }
          ]
        },
        {
          "id": "gallery-dfa",
          "start": 2013,
          "end": 2047,
          "title": "A complete five-state DFA",
          "notes": [
            "In the next enlarged figure, q0 chooses q3 on 0 and q1 on 1. q3 loops on 1 and reaches accepting q4 on 0; q1 loops on 0 and reaches accepting q2 on 1.",
            "Both accepting states loop on 0 and 1. Every state has exactly one destination per input symbol, so this is a DFA. Two accepting states do not make it an NFA but not DFA."
          ],
          "speakerNotes": "Sa five-state figure, tig-iisa ang destination sa 0 at 1 sa bawat state. Ang q2 at q4 ay parehong final states; hindi iyon dahilan para maging nondeterministic.",
          "visualDescription": "A five-state blue diagram fills the screen around 33:41. It is recreated below.",
          "diagram": "l2-five-state-dfa",
          "frames": [
            {
              "src": "frames/lesson-2/frame-2023.jpg",
              "seconds": 2023,
              "width": 854,
              "height": 480,
              "caption": "33:43 · A complete five-state DFA",
              "alt": "Source video frame at 33:43: A complete five-state DFA"
            }
          ]
        },
        {
          "id": "gallery-nfa",
          "start": 2047,
          "end": 2097,
          "title": "A loop can compete with another edge",
          "notes": [
            "The next figure has a self-loop at q0 labeled 0,1, plus a 0-edge to q1 and a 1-edge to q2. For input 0 at q0, both staying at q0 and moving to q1 are possible.",
            "The accepting state is q3. A path may choose when to leave the loop, but it must consume every symbol of the word and finish in q3 to accept."
          ],
          "speakerNotes": "Sa q0, may loop sa 0 at 1 at may hiwalay pang arrows sa parehong symbols. Kaya may pagpipilian sa susunod na state.",
          "visualDescription": "The gallery enlarges the four-state purple NFA around 34:13, exposing overlapping labels on the start-state loop and outgoing edges.",
          "diagram": "l2-loop-nfa",
          "frames": [
            {
              "src": "frames/lesson-2/frame-2054.jpg",
              "seconds": 2054,
              "width": 854,
              "height": 480,
              "caption": "34:14 · A loop can compete with another edge",
              "alt": "Source video frame at 34:14: A loop can compete with another edge"
            }
          ]
        },
        {
          "id": "remaining-gallery",
          "start": 2097,
          "end": 2250,
          "title": "Use the same checklist on the remaining figures",
          "notes": [
            "The gallery continues with different alphabets and graph shapes. Check the alphabet, the start marker, the accepting markers, ε-edges, and each state–symbol destination set in that order.",
            "For a dense figure, write the transition table before classifying it. This prevents overlapping curves or repeated labels from hiding a nondeterministic choice."
          ],
          "speakerNotes": "Sa natitirang figures, ulitin ang pag-check sa bawat state at symbol. Mas madaling makita ang choices kung ilalagay muna sa transition table.",
          "visualDescription": "The final three gallery examples are enlarged in sequence before the closing animation.",
          "frames": [
            {
              "src": "frames/lesson-2/frame-2103.jpg",
              "seconds": 2103,
              "width": 854,
              "height": 480,
              "caption": "35:03 · Use the same checklist on the remaining figures",
              "alt": "Source video frame at 35:03: Use the same checklist on the remaining figures"
            },
            {
              "src": "frames/lesson-2/frame-2158.jpg",
              "seconds": 2158,
              "width": 854,
              "height": 480,
              "caption": "35:58 · Use the same checklist on the remaining figures",
              "alt": "Source video frame at 35:58: Use the same checklist on the remaining figures"
            },
            {
              "src": "frames/lesson-2/frame-2220.jpg",
              "seconds": 2220,
              "width": 854,
              "height": 480,
              "caption": "37:00 · Use the same checklist on the remaining figures",
              "alt": "Source video frame at 37:00: Use the same checklist on the remaining figures"
            }
          ]
        }
      ],
      "recap": [
        "Read node labels as states and edge labels as symbols.",
        "Acceptance is determined after the entire word is consumed.",
        "Classify transitions per state and per symbol.",
        "Multiple final states are allowed in both DFA and NFA."
      ],
      "commonMistakes": [
        "Calling a graph nondeterministic just because a state has several differently labeled arrows.",
        "Accepting a word immediately on visiting a final state with unread symbols.",
        "Treating a partially drawn graph as a complete DFA without stating the implicit sink convention."
      ],
      "questions": [
        {
          "id": "l2-q01-id",
          "kind": "identification",
          "prompt": "The simplest machine to recognize patterns.",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Finite automaton",
          "acceptedAnswers": [
            "Finite automaton",
            "finite automata",
            "FA"
          ],
          "explanation": "This source wording identifies finite automaton. Use the source frame to review it in context.",
          "segmentId": "recognize-patterns",
          "sourceFrame": "frames/lesson-2/frame-0050.jpg",
          "sourceSeconds": 50
        },
        {
          "id": "l2-q02",
          "prompt": "When does a finite automaton accept a word?",
          "choices": [
            "As soon as an accepting state is visited, even with unread input",
            "Whenever the start state has an outgoing arrow",
            "Whenever a transition is missing",
            "After consuming the entire word, a valid run ends in an accepting state"
          ],
          "answer": 3,
          "explanation": "Unread symbols must still be processed. For an NFA, at least one complete run must accept.",
          "segmentId": "recognize-patterns"
        },
        {
          "id": "l2-q03",
          "prompt": "In (Q, Σ, δ, q₀, F), which component is the input alphabet?",
          "choices": [
            "F",
            "q₀",
            "Σ",
            "Q"
          ],
          "answer": 2,
          "explanation": "Σ contains the symbols that can appear in input strings.",
          "segmentId": "five-tuple"
        },
        {
          "id": "l2-q04",
          "prompt": "Which statement correctly relates the start and accepting states to Q?",
          "choices": [
            "q₀ must belong to F",
            "q₀ ∈ Q and F ⊆ Q",
            "q₀ ⊆ Q and F ∈ Σ",
            "q₀ = Σ and F = δ"
          ],
          "answer": 1,
          "explanation": "The start is one state; the accepting states form a subset of the state set.",
          "segmentId": "five-tuple"
        },
        {
          "id": "l2-q05",
          "prompt": "In the recreated square example, which input takes A to accepting D?",
          "choices": [
            "01",
            "00",
            "11",
            "ε"
          ],
          "answer": 0,
          "explanation": "A goes to C on 0, then C goes to D on 1. A is not accepting, so ε is rejected.",
          "segmentId": "tuple-example",
          "diagram": "l2-parity-square"
        },
        {
          "id": "l2-q06",
          "prompt": "In the square example, where does input 11 leave a run that starts at A?",
          "choices": [
            "B",
            "C",
            "D",
            "A"
          ],
          "answer": 3,
          "explanation": "A goes to B on the first 1; B returns to A on the second 1.",
          "segmentId": "tuple-example",
          "diagram": "l2-parity-square"
        },
        {
          "id": "l2-q07",
          "prompt": "In the tape model, what does the finite control keep track of?",
          "choices": [
            "The full list of all possible programs",
            "Only the final output string",
            "The current state",
            "A separate state for every unread cell"
          ],
          "answer": 2,
          "explanation": "The finite control updates the current state as the read head consumes each symbol.",
          "segmentId": "input-tape"
        },
        {
          "id": "l2-q08-id",
          "kind": "identification",
          "prompt": "There is always a unique state to go next",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Deterministic finite automaton",
          "acceptedAnswers": [
            "Deterministic finite automaton",
            "DFA",
            "deterministic finite automata"
          ],
          "explanation": "This source wording identifies deterministic finite automaton. Use the source frame to review it in context.",
          "segmentId": "comparison",
          "sourceFrame": "frames/lesson-2/frame-1700.jpg",
          "sourceSeconds": 1700
        },
        {
          "id": "l2-q09",
          "prompt": "Which classification fits this five-state figure under the pack’s complete-DFA convention?",
          "choices": [
            "DFA",
            "NFA but not DFA",
            "ε-NFA because it has two final states",
            "Not a finite automaton because q4 has a loop"
          ],
          "answer": 0,
          "explanation": "Every state has one transition on 0 and one on 1, with no ε-edge.",
          "segmentId": "gallery-dfa",
          "diagram": "l2-five-state-dfa"
        },
        {
          "id": "l2-q10",
          "prompt": "What happens in the five-state DFA on input 10 from q0?",
          "choices": [
            "It ends at q2 and accepts",
            "It ends at q4 and accepts",
            "It follows two different paths",
            "It ends at q1 and rejects"
          ],
          "answer": 3,
          "explanation": "The 1 reaches q1; its 0-loop stays at nonaccepting q1.",
          "segmentId": "gallery-dfa",
          "diagram": "l2-five-state-dfa"
        },
        {
          "id": "l2-q11",
          "prompt": "Why is the four-state loop figure an NFA but not a DFA?",
          "choices": [
            "The alphabet has two symbols",
            "q1 has a curved incoming edge",
            "q0 has two destinations on input 0",
            "q3 is accepting"
          ],
          "answer": 2,
          "explanation": "The 0 on the q0 loop competes with the 0-edge to q1. There are also two choices on 1.",
          "segmentId": "gallery-nfa",
          "diagram": "l2-loop-nfa"
        },
        {
          "id": "l2-q12",
          "prompt": "For the loop NFA, which destination set is possible after reading a single 1 from q0?",
          "choices": [
            "∅",
            "{q0, q2}",
            "{q1, q3}",
            "{q3}"
          ],
          "answer": 1,
          "explanation": "The 1-loop keeps q0 active and the other 1-edge reaches q2.",
          "segmentId": "gallery-nfa",
          "diagram": "l2-loop-nfa"
        },
        {
          "id": "l2-q13",
          "prompt": "Which word is accepted by the loop NFA?",
          "choices": [
            "100",
            "01",
            "10",
            "ε"
          ],
          "answer": 0,
          "explanation": "One accepting run loops at q0 on 1, takes 0 to q1, then 0 to final q3.",
          "segmentId": "gallery-nfa",
          "diagram": "l2-loop-nfa"
        },
        {
          "id": "l2-q14-id",
          "kind": "identification",
          "prompt": "Several choices may exist for next state",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Nondeterministic finite automaton",
          "acceptedAnswers": [
            "Nondeterministic finite automaton",
            "NFA",
            "non-deterministic finite automaton",
            "nondeterministic finite automata"
          ],
          "explanation": "This source wording identifies nondeterministic finite automaton. Use the source frame to review it in context.",
          "segmentId": "comparison",
          "sourceFrame": "frames/lesson-2/frame-1700.jpg",
          "sourceSeconds": 1700
        },
        {
          "id": "l2-q15",
          "prompt": "A diagram omits all outgoing arrows from a rejecting state. What should you establish before calling it a complete DFA?",
          "choices": [
            "Whether the start state is named q0",
            "Whether the final state is on the right",
            "Whether the course assumes an implicit sink and how its missing transitions are completed",
            "Whether its states are drawn clockwise"
          ],
          "answer": 2,
          "explanation": "This pack makes the total-transition convention explicit; omitted rejecting behavior must not be mistaken for verified complete transitions.",
          "segmentId": "dfa-and-nfa"
        }
      ],
      "provenance": "Based on TeacherCat 4U’s Topic 2 video, inspected full-video frames and machine-assisted speech review. Explanations and questions are newly written; Taglish speaker notes are paraphrases, not a transcript. Source examples are recreated as labeled. Timestamp boundaries are navigation approximations, not word-level alignment."
    },
    {
      "id": "lesson-3",
      "number": 3,
      "title": "Transition diagrams and tables",
      "videoId": "adoZsRYd1Mw",
      "duration": 993,
      "overview": "Read the graph notation, translate edges into table cells, and trace the two different source examples without mixing up their languages.",
      "objectives": [
        "Identify start, accepting and transition notation.",
        "Translate between a diagram and its transition table.",
        "Trace and compare the two source DFA examples."
      ],
      "keyTerms": [
        {
          "term": "Transition diagram",
          "definition": "A directed graph of states and labeled transitions."
        },
        {
          "term": "Start marker",
          "definition": "An incoming arrow with no source node."
        },
        {
          "term": "Accepting marker",
          "definition": "A double circle in the diagram; a star beside a table row in this lesson."
        },
        {
          "term": "Self-loop",
          "definition": "A transition whose source and target are the same state."
        },
        {
          "term": "Transition table",
          "definition": "Rows of current states and columns of input symbols, with next-state entries."
        },
        {
          "term": "Sink state",
          "definition": "A state that retains the machine without a route to acceptance in the examples here."
        }
      ],
      "segments": [
        {
          "id": "diagram-notation",
          "start": 38,
          "end": 140,
          "title": "Read the notation before following the arrows",
          "notes": [
            "A transition diagram is a directed graph. Circles represent states; a labeled arrow records a transition; an incoming arrow with no source identifies the start; a double circle identifies an accepting state.",
            "An arrow labeled a from q to p means that reading a in state q can move the machine to p. A loop has the same source and destination."
          ],
          "speakerNotes": "Sa transition diagram, circles ang states at arrows ang transitions. Ang arrow na walang source ang simula; double circle ang final state.",
          "visualDescription": "The notation slide displays separate icons for a state, a labeled edge, a start arrow, a loop, and an accepting state.",
          "frames": [
            {
              "src": "frames/lesson-3/frame-0050.jpg",
              "seconds": 50,
              "width": 854,
              "height": 480,
              "caption": "0:50 · Read the notation before following the arrows",
              "alt": "Source video frame at 0:50: Read the notation before following the arrows"
            }
          ]
        },
        {
          "id": "read-an-edge",
          "start": 140,
          "end": 241,
          "title": "Translate an edge into δ notation",
          "notes": [
            "The diagram and the transition function express the same rule in different forms. A deterministic edge q —a→ p can be written δ(q,a)=p.",
            "Preserve arrow direction. The existence of q —a→ p does not imply p —a→ q. Several symbols on one edge abbreviate separate transitions with the same destination."
          ],
          "speakerNotes": "Kapag may arrow mula q papuntang p na may label a, iyon ang destination sa input a mula sa q. Huwag baligtarin ang direksiyon ng arrow.",
          "visualDescription": "The lecture stays on the notation slide while explaining states, edge labels, and the start/accepting markers.",
          "frames": [
            {
              "src": "frames/lesson-3/frame-0180.jpg",
              "seconds": 180,
              "width": 854,
              "height": 480,
              "caption": "3:00 · Translate an edge into δ notation",
              "alt": "Source video frame at 3:00: Translate an edge into δ notation"
            }
          ]
        },
        {
          "id": "starts-with-one",
          "start": 241,
          "end": 510,
          "title": "Example: strings that start with 1",
          "notes": [
            "The source example uses Σ={0,1}, starts in q0, moves to accepting q1 if the first input is 1, and moves to rejecting q2 if the first input is 0. At q1, both 0 and 1 loop back to q1.",
            "This machine remembers whether the first symbol was 1. Once that fact is established, the remaining suffix does not change acceptance. The empty word is rejected because q0 is not accepting.",
            "The source drawing leaves outgoing transitions at rejecting q2 unstated. Our recreated complete version adds 0/1 sink loops at q2; those editorial additions make its behavior explicit rather than claiming the source drew them."
          ],
          "speakerNotes": "Sa example, 1 dapat ang unang symbol para makarating sa final state. Kapag 0 ang una, mapupunta sa rejecting branch. Sa final state, puwedeng sundan ng 0 o 1.",
          "visualDescription": "The slide switches to the “starts with 1” example. The recreated figure makes the implicit rejecting behavior explicit.",
          "diagram": "l3-starts-one",
          "workedSteps": [
            "For 101: q0 —1→ q1 —0→ q1 —1→ q1, so accept.",
            "For 011: q0 —0→ q2; the completed sink loops retain q2, so reject.",
            "For ε: remain at q0, so reject."
          ],
          "caution": "Source clarification: the q2 loops in this recreation are an explicit completion of the source’s partially drawn DFA, not a recovered visual detail.",
          "frames": [
            {
              "src": "frames/lesson-3/frame-0300.jpg",
              "seconds": 300,
              "width": 854,
              "height": 480,
              "caption": "5:00 · Example: strings that start with 1",
              "alt": "Source video frame at 5:00: Example: strings that start with 1"
            }
          ]
        },
        {
          "id": "transition-table",
          "start": 510,
          "end": 532,
          "title": "A table is another view of the same transition rule",
          "notes": [
            "A transition table lists the destination for a given state and input symbol. To read δ(q,a), locate row q and column a; their intersection supplies the next state.",
            "Changing from diagram to table does not create a different automaton. Both representations must agree on states, alphabet, start state, accepting states, and every transition."
          ],
          "speakerNotes": "Ang transition table ay tabular form ng transition function. State at input symbol ang tinitingnan para malaman ang next state.",
          "visualDescription": "A new slide defines the table as a representation of the transition function.",
          "frames": [
            {
              "src": "frames/lesson-3/frame-0515.jpg",
              "seconds": 515,
              "width": 854,
              "height": 480,
              "caption": "8:35 · A table is another view of the same transition rule",
              "alt": "Source video frame at 8:35: A table is another view of the same transition rule"
            }
          ]
        },
        {
          "id": "rows-columns-markers",
          "start": 532,
          "end": 594,
          "title": "Rows, columns, and the start/final markers",
          "notes": [
            "Rows correspond to states; columns correspond to input symbols; each cell contains a destination. In a DFA, each cell contains one state. NFA tables use destination sets.",
            "The source uses → beside a row for the start state and * beside a row for an accepting state. A star in a table is a marker; it is not an additional input symbol."
          ],
          "speakerNotes": "Rows para sa states, columns para sa input symbols at entries para sa next state. Arrow ang start marker; star ang accept-state marker sa table.",
          "visualDescription": "The table-components slide lists row and column meanings plus the arrow/star notation.",
          "frames": [
            {
              "src": "frames/lesson-3/frame-0540.jpg",
              "seconds": 540,
              "width": 854,
              "height": 480,
              "caption": "9:00 · Rows, columns, and the start/final markers",
              "alt": "Source video frame at 9:00: Rows, columns, and the start/final markers"
            }
          ]
        },
        {
          "id": "worked-table",
          "start": 594,
          "end": 800,
          "title": "Work between the displayed DFA and its table",
          "notes": [
            "The later source example is a different DFA: q0 goes to q1 on 0 and q2 on 1; q1 returns to q0 on 0 and goes to q2 on 1; accepting q2 loops on either symbol.",
            "Its table therefore has rows q0:[q1,q2], q1:[q0,q2], q2:[q2,q2] under columns 0 and 1. This example accepts words containing at least one 1, including words that begin with 0.",
            "Do not carry the first example’s “starts with 1” language into this later graph. The change of transitions changes the recognized language."
          ],
          "speakerNotes": "Sa bagong example, basahin ang bawat row ayon sa 0 at 1. Mula q0, 0 ay q1 at 1 ay q2. Mula q1, 0 ay q0 at 1 ay q2; final ang q2 at may loop sa parehong input.",
          "visualDescription": "A new three-state graph appears above its completed transition table. The start row is marked →q0 and the accepting row *q2.",
          "diagram": "l3-source-table",
          "workedSteps": [
            "Read the q0 row: 0→q1 and 1→q2.",
            "Read the q1 row: 0→q0 and 1→q2.",
            "Read the q2 row: 0→q2 and 1→q2.",
            "Check 001: q0→q1→q0→q2. It ends accepting even though it starts with 0."
          ],
          "frames": [
            {
              "src": "frames/lesson-3/frame-0620.jpg",
              "seconds": 620,
              "width": 854,
              "height": 480,
              "caption": "10:20 · Work between the displayed DFA and its table",
              "alt": "Source video frame at 10:20: Work between the displayed DFA and its table"
            },
            {
              "src": "frames/lesson-3/frame-0675.jpg",
              "seconds": 675,
              "width": 854,
              "height": 480,
              "caption": "11:15 · Work between the displayed DFA and its table",
              "alt": "Source video frame at 11:15: Work between the displayed DFA and its table"
            },
            {
              "src": "frames/lesson-3/frame-0730.jpg",
              "seconds": 730,
              "width": 854,
              "height": 480,
              "caption": "12:10 · Work between the displayed DFA and its table",
              "alt": "Source video frame at 12:10: Work between the displayed DFA and its table"
            }
          ]
        },
        {
          "id": "cross-check",
          "start": 800,
          "end": 971,
          "title": "Verify a table against its graph",
          "notes": [
            "Compare every state–symbol pair, not just a few sample strings. For n states and an alphabet of k symbols, a complete DFA has n×k destination entries.",
            "Then trace a few short words to catch transcription errors. In the later example, all-zero words alternate q0 and q1 and reject; once a 1 reaches q2, every continuation stays accepting."
          ],
          "speakerNotes": "I-check ang bawat cell sa katumbas nitong arrow. Pagkatapos, subukan ang maikling strings para makita kung pareho ang trace sa table at diagram.",
          "visualDescription": "The lecture remains on the paired graph and table while explaining the correspondence before the closing animation.",
          "diagram": "l3-source-table",
          "frames": [
            {
              "src": "frames/lesson-3/frame-0840.jpg",
              "seconds": 840,
              "width": 854,
              "height": 480,
              "caption": "14:00 · Verify a table against its graph",
              "alt": "Source video frame at 14:00: Verify a table against its graph"
            }
          ]
        }
      ],
      "recap": [
        "Arrow direction gives source and destination.",
        "Read one table cell using one current state and one symbol.",
        "The two worked examples recognize different languages.",
        "Keep implicit sink completion clearly separate from what the source actually draws."
      ],
      "commonMistakes": [
        "Reading a transition backward.",
        "Treating the star beside a table row as an input symbol.",
        "Confusing “starts with 1” with “contains a 1”.",
        "Inventing omitted edges instead of stating a completion convention."
      ],
      "questions": [
        {
          "id": "l3-q01-id",
          "kind": "identification",
          "prompt": "a directed graph",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Transition diagram",
          "acceptedAnswers": [
            "Transition diagram",
            "state transition diagram"
          ],
          "explanation": "This source wording identifies transition diagram. Use the source frame to review it in context.",
          "segmentId": "diagram-notation",
          "sourceFrame": "frames/lesson-3/frame-0050.jpg",
          "sourceSeconds": 50
        },
        {
          "id": "l3-q02-id",
          "kind": "identification",
          "prompt": "there is an arrow with no source",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Start state",
          "acceptedAnswers": [
            "Start state",
            "initial state"
          ],
          "explanation": "This source wording identifies start state. Use the source frame to review it in context.",
          "segmentId": "diagram-notation",
          "sourceFrame": "frames/lesson-3/frame-0050.jpg",
          "sourceSeconds": 50
        },
        {
          "id": "l3-q03",
          "prompt": "An arrow from q to p is labeled a. Which rule does it express for a DFA?",
          "choices": [
            "δ(a,q)=p",
            "q and p must both accept",
            "δ(q,a)=p",
            "δ(p,a)=q"
          ],
          "answer": 2,
          "explanation": "The arrow’s source is the current state, its label is the input, and its target is the next state.",
          "segmentId": "read-an-edge"
        },
        {
          "id": "l3-q04",
          "prompt": "In the completed “starts with 1” example, which word is accepted?",
          "choices": [
            "ε",
            "101",
            "011",
            "00"
          ],
          "answer": 1,
          "explanation": "Its first 1 reaches q1; the suffix remains on q1’s 0/1 loops.",
          "segmentId": "starts-with-one",
          "diagram": "l3-starts-one"
        },
        {
          "id": "l3-q05",
          "prompt": "Why does the completed “starts with 1” DFA reject 011?",
          "choices": [
            "The first 0 reaches rejecting sink q2",
            "Every 1 returns to q0",
            "A word with two 1s is always rejected",
            "q1 is not accepting"
          ],
          "answer": 0,
          "explanation": "Once q2 is reached, the editorial sink completion keeps the run there on either symbol.",
          "segmentId": "starts-with-one",
          "diagram": "l3-starts-one"
        },
        {
          "id": "l3-q06",
          "prompt": "Why does the “starts with 1” DFA reject ε?",
          "choices": [
            "ε is the same word as 0",
            "Every DFA rejects ε",
            "There is no accepting state",
            "Its start q0 is not accepting"
          ],
          "answer": 3,
          "explanation": "With no symbols read, the run stays at q0. Some other DFAs can accept ε when their start is final.",
          "segmentId": "starts-with-one",
          "diagram": "l3-starts-one"
        },
        {
          "id": "l3-q07",
          "prompt": "Which statement describes the added q2 loops in this recreation?",
          "choices": [
            "They change all words beginning with 0 into accepted words",
            "They were two additional input alphabet symbols",
            "They explicitly complete rejecting behavior omitted from the source drawing",
            "They prove the source showed an ε-NFA"
          ],
          "answer": 2,
          "explanation": "The source’s q2 arrows were unstated; the completed diagram labels this editorial choice rather than inventing a source observation.",
          "segmentId": "starts-with-one",
          "diagram": "l3-starts-one"
        },
        {
          "id": "l3-q08-id",
          "kind": "identification",
          "prompt": "tabular representation of the transition function",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Transition table",
          "acceptedAnswers": [
            "Transition table"
          ],
          "explanation": "This source wording identifies transition table. Use the source frame to review it in context.",
          "segmentId": "transition-table",
          "sourceFrame": "frames/lesson-3/frame-0515.jpg",
          "sourceSeconds": 515
        },
        {
          "id": "l3-q09",
          "prompt": "In the source table example, what is δ(q1,0)?",
          "choices": [
            "q0",
            "q1",
            "q2",
            "∅"
          ],
          "answer": 0,
          "explanation": "Read the q1 row under column 0: it returns to q0.",
          "segmentId": "worked-table",
          "diagram": "l3-source-table"
        },
        {
          "id": "l3-q10",
          "prompt": "In the source table example, what is δ(q0,1)?",
          "choices": [
            "q0",
            "q1",
            "{q0,q1}",
            "q2"
          ],
          "answer": 3,
          "explanation": "The q0 row’s 1-column contains q2, the accepting state.",
          "segmentId": "worked-table",
          "diagram": "l3-source-table"
        },
        {
          "id": "l3-q11",
          "prompt": "Starting at q0, where does input 00 end in the later table example?",
          "choices": [
            "q2, so accept",
            "q2, so reject",
            "q0, so reject",
            "q1, so accept"
          ],
          "answer": 2,
          "explanation": "The first 0 reaches q1; the next 0 returns to nonaccepting q0.",
          "segmentId": "worked-table",
          "diagram": "l3-source-table"
        },
        {
          "id": "l3-q12",
          "prompt": "Which trace correctly reads 001 in the later table example?",
          "choices": [
            "q0 → q1 → q2 → q0",
            "q0 → q1 → q0 → q2",
            "q0 → q0 → q0 → q1",
            "q0 → q2 → q2 → q2"
          ],
          "answer": 1,
          "explanation": "Follow the 0, 0 and 1 columns in turn. The final state q2 accepts.",
          "segmentId": "worked-table",
          "diagram": "l3-source-table"
        },
        {
          "id": "l3-q13",
          "prompt": "Which language matches the later three-state table example?",
          "choices": [
            "Binary words containing at least one 1",
            "Binary words starting with 1 only",
            "Binary words with exactly one 0",
            "All binary words including ε"
          ],
          "answer": 0,
          "explanation": "Any 1 reaches q2; only-zero words remain between nonaccepting q0 and q1.",
          "segmentId": "cross-check",
          "diagram": "l3-source-table"
        },
        {
          "id": "l3-q14",
          "prompt": "A complete DFA has 3 states and 2 input symbols. How many destination cells does its table require?",
          "choices": [
            "2",
            "3",
            "9",
            "6"
          ],
          "answer": 3,
          "explanation": "There is one cell per state–symbol pair: 3×2=6. Start/final markers are not extra transition cells.",
          "segmentId": "cross-check"
        },
        {
          "id": "l3-q15",
          "prompt": "A proposed table changes δ(q1,0) to q2 while retaining the displayed graph. What is the issue?",
          "choices": [
            "Both representations still define the same transition function",
            "The graph has too many accepting states",
            "The table and diagram disagree on a transition",
            "The table is automatically correct because it has rows"
          ],
          "answer": 2,
          "explanation": "The displayed edge and original table give δ(q1,0)=q0. A changed entry defines different behavior.",
          "segmentId": "worked-table",
          "diagram": "l3-source-table"
        }
      ],
      "provenance": "Based on TeacherCat 4U’s Topic 3 full-video frames, including the graph/table at 10:20. Explanations and MCQs are original; speaker notes are timestamped Taglish paraphrases. The first diagram includes an explicitly labeled rejecting-sink completion. Source timing is approximate, and the two source examples are kept distinct."
    },
    {
      "id": "lesson-4",
      "number": 4,
      "title": "Epsilon-NFA to NFA: eliminating ε-transitions",
      "videoId": "cSnfySSBL7A",
      "duration": 2608,
      "overview": "Remove ε-transitions by following closure → symbol → closure. Recreate the lecture’s A/B/C worked example, update its final states correctly, and check a separate practice variation.",
      "objectives": [
        "Define ε-moves and epsilon closure.",
        "Apply closure around a consumed symbol using one stated convention.",
        "Preserve acceptance by marking states whose closure intersects the original finals.",
        "Check converted transitions and compare short-string behavior."
      ],
      "keyTerms": [
        {
          "term": "ε-transition",
          "definition": "A state change that consumes no input symbol."
        },
        {
          "term": "ε-closure E(q)",
          "definition": "q plus every state reachable from q through zero or more ε-edges."
        },
        {
          "term": "NFA",
          "definition": "An automaton whose state and input may permit zero, one, or several next states."
        },
        {
          "term": "ε-NFA",
          "definition": "An NFA that also permits ε-transitions."
        },
        {
          "term": "Acceptance preservation",
          "definition": "The converted state q is final exactly when E(q) intersects the original final set, under the chosen closure construction."
        }
      ],
      "segments": [
        {
          "id": "l4-s01",
          "start": 41,
          "end": 162,
          "title": "Locate ε-NFA among finite-state machines",
          "notes": [
            "The opening hierarchy distinguishes finite automata used for recognition from machines with explicit output, then separates DFA, NFA and ε-NFA.",
            "The conversion in this lesson removes ε-transitions while preserving the accepted language. It does not require the result to be deterministic."
          ],
          "speakerNotes": "Sa hierarchy, magkakaiba ang DFA, NFA at ε-NFA. Ang gagawin dito ay alisin ang ε-transitions para maging ordinary NFA.",
          "visualDescription": "The source shows a finite-state-machine family chart before introducing ε.",
          "frames": [
            {
              "src": "frames/lesson-4/frame-0050.jpg",
              "seconds": 50,
              "width": 854,
              "height": 480,
              "caption": "0:50 · Locate ε-NFA among finite-state machines",
              "alt": "Source video frame at 0:50: Locate ε-NFA among finite-state machines"
            }
          ]
        },
        {
          "id": "l4-s02",
          "start": 162,
          "end": 438,
          "title": "ε consumes no input symbol",
          "notes": [
            "ε denotes the empty word. An ε-edge changes the current state without advancing through an input character.",
            "Do not treat ε as a third alphabet symbol beside0 and 1. It is a transition that consumes zero symbols."
          ],
          "speakerNotes": "Ang epsilon ay empty string. Puwedeng lumipat sa state gamit ang epsilon nang walang binabasang input symbol.",
          "visualDescription": "The ε slide shows simple graphs and the meaning of the empty string.",
          "frames": [
            {
              "src": "frames/lesson-4/frame-0180.jpg",
              "seconds": 180,
              "width": 854,
              "height": 480,
              "caption": "3:00 · ε consumes no input symbol",
              "alt": "Source video frame at 3:00: ε consumes no input symbol"
            }
          ]
        },
        {
          "id": "l4-s03",
          "start": 438,
          "end": 925,
          "title": "Compute ε-closure, including the state itself",
          "notes": [
            "E(q) contains q and every state reachable from q by zero or more ε-edges. Follow only ε-edges during this step.",
            "The zero-step case matters: q always belongs to E(q), even when no ε-edge leaves it. Use a set so repeated reachable states appear only once."
          ],
          "speakerNotes": "Sa closure, isama lagi ang sarili mong state. Sundan lang ang epsilon transitions at huwag ulitin ang kaparehong member ng set.",
          "visualDescription": "The source introduces ε-moves and later emphasizes that every closure contains the state itself.",
          "frames": [
            {
              "src": "frames/lesson-4/frame-0450.jpg",
              "seconds": 450,
              "width": 854,
              "height": 480,
              "caption": "7:30 · Compute ε-closure, including the state itself",
              "alt": "Source video frame at 7:30: Compute ε-closure, including the state itself"
            },
            {
              "src": "frames/lesson-4/frame-0500.jpg",
              "seconds": 500,
              "width": 854,
              "height": 480,
              "caption": "8:20 · Compute ε-closure, including the state itself",
              "alt": "Source video frame at 8:20: Compute ε-closure, including the state itself"
            },
            {
              "src": "frames/lesson-4/frame-0600.jpg",
              "seconds": 600,
              "width": 854,
              "height": 480,
              "caption": "10:00 · Compute ε-closure, including the state itself",
              "alt": "Source video frame at 10:00: Compute ε-closure, including the state itself"
            },
            {
              "src": "frames/lesson-4/frame-0850.jpg",
              "seconds": 850,
              "width": 854,
              "height": 480,
              "caption": "14:10 · Compute ε-closure, including the state itself",
              "alt": "Source video frame at 14:10: Compute ε-closure, including the state itself"
            }
          ]
        },
        {
          "id": "l4-s04",
          "start": 925,
          "end": 1147,
          "title": "Separate conversion from determinization",
          "notes": [
            "An ordinary NFA can still have multiple destinations for one symbol. Removing ε-edges is a different task from turning an NFA into a DFA.",
            "We keep the same state names and input alphabet, replace the transition relation, and update accepting states when ε-reachability requires it."
          ],
          "speakerNotes": "Ang epsilon-NFA ay gagawing NFA, hindi agad DFA. Puwede pa ring set ang destination sa isang input.",
          "visualDescription": "The comparison slide puts an NFA and ε-NFA beside their transition mappings.",
          "frames": [
            {
              "src": "frames/lesson-4/frame-0930.jpg",
              "seconds": 930,
              "width": 854,
              "height": 480,
              "caption": "15:30 · Separate conversion from determinization",
              "alt": "Source video frame at 15:30: Separate conversion from determinization"
            }
          ]
        },
        {
          "id": "l4-s05",
          "start": 1147,
          "end": 1254,
          "title": "Use closure → symbol → closure",
          "notes": [
            "For each state q and input x, compute δ′(q,x)=E(⋃{δ(r,x):r∈E(q)}). First find the starting closure, then read exactly one symbol, then close the destinations.",
            "This convention includes ε-moves both before and after the symbol. Repeat it independently for every state and every alphabet symbol."
          ],
          "speakerNotes": "Ang proseso ay state, epsilon closure, input, tapos epsilon closure ulit. Gawin ito para sa bawat state at bawat input symbol.",
          "visualDescription": "The procedure slide gives way to the worked example and its closure–input–closure flow.",
          "frames": [
            {
              "src": "frames/lesson-4/frame-1160.jpg",
              "seconds": 1160,
              "width": 854,
              "height": 480,
              "caption": "19:20 · Use closure → symbol → closure",
              "alt": "Source video frame at 19:20: Use closure → symbol → closure"
            }
          ]
        },
        {
          "id": "l4-s06",
          "start": 1254,
          "end": 1411,
          "title": "Read the source example and prepare its table",
          "notes": [
            "The actual example starts at A, has final C, and contains ε-edges A→B→C. A loops on 0, B loops on 1, and C loops on both 0 and 1.",
            "Therefore E(A)={A,B,C}, E(B)={B,C}, and E(C)={C}. Begin a new table with rows A,B,C and columns 0,1."
          ],
          "speakerNotes": "Sa source example, A ang initial state at C ang final. May epsilon mula A sa B at mula B sa C. Ihanda ang rows na A,B,C at columns na0 at 1.",
          "visualDescription": "The blue source graph is shown beside the closure rule; the blank NFA table is introduced around 22:50.",
          "diagram": "l4-source-enfa",
          "frames": [
            {
              "src": "frames/lesson-4/frame-1270.jpg",
              "seconds": 1270,
              "width": 854,
              "height": 480,
              "caption": "21:10 · Read the source example and prepare its table",
              "alt": "Source video frame at 21:10: Read the source example and prepare its table"
            },
            {
              "src": "frames/lesson-4/frame-1380.jpg",
              "seconds": 1380,
              "width": 854,
              "height": 480,
              "caption": "23:00 · Read the source example and prepare its table",
              "alt": "Source video frame at 23:00: Read the source example and prepare its table"
            }
          ]
        },
        {
          "id": "l4-s07",
          "start": 1411,
          "end": 1700,
          "title": "Fill A’s two converted transitions",
          "notes": [
            "For A on 0: start from {A,B,C}; the 0-moves yield {A}∪∅∪{C}={A,C}; closing those destinations gives {A,B,C}.",
            "For A on 1: the 1-moves from the starting closure yield ∅∪{B}∪{C}={B,C}; their closure is still {B,C}."
          ],
          "speakerNotes": "Unahin ang closure ng A: A,B,C. Sa0, A at C ang may moves; pagkatapos ng closure, A,B,C ang sagot. Sa1, B at C ang destinations.",
          "visualDescription": "The instructor expands closure sets and symbol destinations while completing A’s row.",
          "diagram": "l4-source-enfa",
          "workedSteps": [
            "E(A)={A,B,C}.",
            "On0: {A}∪∅∪{C}={A,C}; E({A,C})={A,B,C}.",
            "On1: ∅∪{B}∪{C}={B,C}; E({B,C})={B,C}."
          ],
          "frames": [
            {
              "src": "frames/lesson-4/frame-1450.jpg",
              "seconds": 1450,
              "width": 854,
              "height": 480,
              "caption": "24:10 · Fill A’s two converted transitions",
              "alt": "Source video frame at 24:10: Fill A’s two converted transitions"
            },
            {
              "src": "frames/lesson-4/frame-1510.jpg",
              "seconds": 1510,
              "width": 854,
              "height": 480,
              "caption": "25:10 · Fill A’s two converted transitions",
              "alt": "Source video frame at 25:10: Fill A’s two converted transitions"
            },
            {
              "src": "frames/lesson-4/frame-1600.jpg",
              "seconds": 1600,
              "width": 854,
              "height": 480,
              "caption": "26:40 · Fill A’s two converted transitions",
              "alt": "Source video frame at 26:40: Fill A’s two converted transitions"
            },
            {
              "src": "frames/lesson-4/frame-1650.jpg",
              "seconds": 1650,
              "width": 854,
              "height": 480,
              "caption": "27:30 · Fill A’s two converted transitions",
              "alt": "Source video frame at 27:30: Fill A’s two converted transitions"
            }
          ]
        },
        {
          "id": "l4-s08",
          "start": 1700,
          "end": 1914,
          "title": "Finish the B and C rows",
          "notes": [
            "B starts from E(B)={B,C}. On0 only C contributes, giving {C}; on 1 the destinations are {B,C}.",
            "C has no outgoing ε-edge, so its closure is just itself and both symbols return to {C}.",
            "The completed table is A:[{A,B,C},{B,C}], B:[{C},{B,C}], C:[{C},{C}]."
          ],
          "speakerNotes": "Ulitin ang proseso kay B at C. Para kay B,0 ay C at 1 ay B,C. Para kay C, pareho lang na C ang destination sa0 at 1.",
          "visualDescription": "The remaining table cells are calculated before the lesson decides which rows are accepting.",
          "diagram": "l4-source-nfa",
          "frames": [
            {
              "src": "frames/lesson-4/frame-1715.jpg",
              "seconds": 1715,
              "width": 854,
              "height": 480,
              "caption": "28:35 · Finish the B and C rows",
              "alt": "Source video frame at 28:35: Finish the B and C rows"
            },
            {
              "src": "frames/lesson-4/frame-1810.jpg",
              "seconds": 1810,
              "width": 854,
              "height": 480,
              "caption": "30:10 · Finish the B and C rows",
              "alt": "Source video frame at 30:10: Finish the B and C rows"
            },
            {
              "src": "frames/lesson-4/frame-1880.jpg",
              "seconds": 1880,
              "width": 854,
              "height": 480,
              "caption": "31:20 · Finish the B and C rows",
              "alt": "Source video frame at 31:20: Finish the B and C rows"
            }
          ]
        },
        {
          "id": "l4-s09",
          "start": 1914,
          "end": 2038,
          "title": "Update accepting states: A, B, and C all accept",
          "notes": [
            "Mark q accepting when E(q) intersects the original final set {C}. A and B can both reach C using only ε; C is already final. The converted accepting set is therefore {A,B,C}.",
            "This preserves empty-word acceptance: the original start A can reach final C without consuming input, so converted start A must be accepting."
          ],
          "speakerNotes": "A at B ay makakarating sa original final C gamit lang ang epsilon. Kaya sa converted NFA, final na silang tatlo: A,B,C.",
          "visualDescription": "The table gains accepting markers beside all three state rows.",
          "diagram": "l4-source-nfa",
          "frames": [
            {
              "src": "frames/lesson-4/frame-1940.jpg",
              "seconds": 1940,
              "width": 854,
              "height": 480,
              "caption": "32:20 · Update accepting states: A, B, and C all accept",
              "alt": "Source video frame at 32:20: Update accepting states: A, B, and C all accept"
            },
            {
              "src": "frames/lesson-4/frame-2015.jpg",
              "seconds": 2015,
              "width": 854,
              "height": 480,
              "caption": "33:35 · Update accepting states: A, B, and C all accept",
              "alt": "Source video frame at 33:35: Update accepting states: A, B, and C all accept"
            }
          ]
        },
        {
          "id": "l4-s10",
          "start": 2038,
          "end": 2299,
          "title": "Draw the new NFA and combine repeated edges",
          "notes": [
            "Every destination in a table cell needs a corresponding edge. For A on 0, the destinations are A,B,C; for A on 1 they are B,C.",
            "When0 and 1 share the same source and target, combine their labels on one arrow. This cleans the drawing without changing the transition relation.",
            "The source’s C-loop label briefly reads1,1; the narration corrects it to0,1 and the table confirms both inputs return to C."
          ],
          "speakerNotes": "Iguhit ang lahat ng destinations sa table. Kapag pareho ang source at target ng arrows, puwedeng pagsamahin ang labels na0 at 1 para mas malinaw ang diagram.",
          "visualDescription": "The source draws the three final-state nodes, adds edges, then simplifies repeated arrows.",
          "diagram": "l4-source-nfa",
          "caution": "Editorial clarification: the recreated C loop is labeled0,1, following the table and the spoken correction rather than the duplicated label visible in one source frame.",
          "frames": [
            {
              "src": "frames/lesson-4/frame-2060.jpg",
              "seconds": 2060,
              "width": 854,
              "height": 480,
              "caption": "34:20 · Draw the new NFA and combine repeated edges",
              "alt": "Source video frame at 34:20: Draw the new NFA and combine repeated edges"
            },
            {
              "src": "frames/lesson-4/frame-2120.jpg",
              "seconds": 2120,
              "width": 854,
              "height": 480,
              "caption": "35:20 · Draw the new NFA and combine repeated edges",
              "alt": "Source video frame at 35:20: Draw the new NFA and combine repeated edges"
            },
            {
              "src": "frames/lesson-4/frame-2190.jpg",
              "seconds": 2190,
              "width": 854,
              "height": 480,
              "caption": "36:30 · Draw the new NFA and combine repeated edges",
              "alt": "Source video frame at 36:30: Draw the new NFA and combine repeated edges"
            },
            {
              "src": "frames/lesson-4/frame-2250.jpg",
              "seconds": 2250,
              "width": 854,
              "height": 480,
              "caption": "37:30 · Draw the new NFA and combine repeated edges",
              "alt": "Source video frame at 37:30: Draw the new NFA and combine repeated edges"
            }
          ]
        },
        {
          "id": "l4-practice",
          "start": 1254,
          "end": 1254,
          "title": "Practice variation: a shorter ε-NFA",
          "notes": [
            "This is a newly authored exercise, not the video’s machine. Start p0 has ε→p1; p1 has an a-loop and b→final p2.",
            "Its closure sets are E(p0)={p0,p1}, E(p1)={p1}, E(p2)={p2}. The converted p0 acquires p1’s a and b transitions, but p0 is not accepting because its closure does not contain p2."
          ],
          "speakerNotes": "Dagdag na practice variation ito, hindi sinabi o iginuhit na example sa video. I-apply ang parehong closure–input–closure procedure.",
          "visualDescription": "Original practice figure derived from the method, with a source link back to its explanation.",
          "diagram": "l4-practice-enfa",
          "frames": []
        }
      ],
      "recap": [
        "An ε-edge consumes nothing.",
        "Compute each epsilon closure, then follow each alphabet symbol from every state in that closure and close destinations.",
        "Make q accepting when E(q) intersects the original final set; this preserves empty-word acceptance."
      ],
      "commonMistakes": [
        "Treating ε as an input symbol.",
        "Forgetting the state itself in its epsilon closure.",
        "Following a symbol from q alone and ignoring other closure members.",
        "Using a different closure convention without changing the formula.",
        "Keeping only the old final states instead of closure-intersection finals.",
        "Assuming every NFA transition must have one destination."
      ],
      "questions": [
        {
          "id": "l4-q01",
          "prompt": "In the source ε-NFA, what is E(A)?",
          "choices": [
            "{A,B,C}",
            "{A}",
            "{B,C}",
            "{C}"
          ],
          "answer": 0,
          "explanation": "A reaches itself with zero ε-moves, then B and C using the two ε-edges.",
          "segmentId": "l4-s06",
          "diagram": "l4-source-enfa"
        },
        {
          "id": "l4-q02",
          "prompt": "In the source example, what is δ′(A,0) after closure →0→closure?",
          "choices": [
            "{A,C}",
            "{C}",
            "{A,B,C}",
            "∅"
          ],
          "answer": 2,
          "explanation": "The0-moves from E(A) yield {A,C}; closing A adds B and C, giving {A,B,C}.",
          "segmentId": "l4-s07",
          "diagram": "l4-source-enfa"
        },
        {
          "id": "l4-q03",
          "prompt": "In the source example, what is δ′(A,1)?",
          "choices": [
            "{A,B,C}",
            "{B,C}",
            "{C}",
            "∅"
          ],
          "answer": 1,
          "explanation": "Only B and C in E(A) have1-moves; their closures remain {B,C}.",
          "segmentId": "l4-s07",
          "diagram": "l4-source-enfa"
        },
        {
          "id": "l4-q04",
          "prompt": "Which states are accepting in the source’s converted NFA?",
          "choices": [
            "C only",
            "B and C only",
            "A only",
            "A, B and C"
          ],
          "answer": 3,
          "explanation": "Each state’s ε-closure contains original final C, so all three must accept.",
          "segmentId": "l4-s09",
          "diagram": "l4-source-nfa"
        },
        {
          "id": "l4-q05",
          "prompt": "Suppose a different ε-NFA has start r and ε-edge r→f, where f is final. Is empty input accepted?",
          "choices": [
            "No; one symbol must be consumed",
            "Only if r is final",
            "Only if f loops on ε",
            "Yes, because ε reaches f without consuming input"
          ],
          "answer": 3,
          "explanation": "The run can reach final f while consuming zero input symbols.",
          "segmentId": "l4-s08"
        },
        {
          "id": "l4-q06-id",
          "kind": "identification",
          "prompt": "stands for the empty string",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Epsilon",
          "acceptedAnswers": [
            "Epsilon",
            "ε",
            "epsilon symbol"
          ],
          "explanation": "This source wording identifies epsilon. Use the source frame to review it in context.",
          "segmentId": "l4-s02",
          "sourceFrame": "frames/lesson-4/frame-0180.jpg",
          "sourceSeconds": 180
        },
        {
          "id": "l4-q07-id",
          "kind": "identification",
          "prompt": "without consuming an input symbol",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Epsilon transition",
          "acceptedAnswers": [
            "Epsilon transition",
            "epsilon transitions",
            "ε-transition",
            "ε transition",
            "e-transition"
          ],
          "explanation": "This source wording identifies epsilon transition. Use the source frame to review it in context.",
          "segmentId": "l4-s03",
          "sourceFrame": "frames/lesson-4/frame-0450.jpg",
          "sourceSeconds": 450
        },
        {
          "id": "l4-q08",
          "prompt": "Which converted diagram is valid for the practice graph?",
          "choices": [
            "p0 -ε→ p1; p1 -a→ p1; p1 -b→ p2",
            "p0 -a→ p1; p0 -b→ p2; p1 -a→ p1; p1 -b→ p2",
            "p0 -b→ p1; p1 -a→ p2",
            "p0 -a→ p2 only"
          ],
          "answer": 1,
          "explanation": "Closure of p0 supplies p1’s symbol edges, but the converted diagram labels them a and b; no ε edge remains.",
          "segmentId": "l4-practice",
          "diagram": "l4-practice-nfa"
        },
        {
          "id": "l4-q09",
          "prompt": "What is δ′(B,0) in the source conversion?",
          "choices": [
            "{A}",
            "{B,C}",
            "{C}",
            "∅"
          ],
          "answer": 2,
          "explanation": "E(B)={B,C}; only C has a 0-edge, and E(C)={C}.",
          "segmentId": "l4-s08",
          "diagram": "l4-source-enfa"
        },
        {
          "id": "l4-q10",
          "prompt": "What should happen to a missing symbol destination from a state in an NFA?",
          "choices": [
            "Invent a destination at the start",
            "Keep the result empty; do not add an unsupported edge",
            "Mark the source final",
            "Add an ε-edge"
          ],
          "answer": 1,
          "explanation": "An empty transition set is valid for an NFA; conversion does not invent edges.",
          "segmentId": "l4-s07"
        },
        {
          "id": "l4-q11",
          "prompt": "A state q has ε-closure {q,f}, with f original-final. How is q treated after conversion?",
          "choices": [
            "Nonfinal because q is not f",
            "Final because its closure intersects the final set",
            "Final only when every closure member is final",
            "Delete q"
          ],
          "answer": 1,
          "explanation": "E(q)∩F is nonempty, so q must be accepting in the ε-free NFA.",
          "segmentId": "l4-s08"
        },
        {
          "id": "l4-q12",
          "prompt": "Why must converted start A accept ε in the source example?",
          "choices": [
            "The original A can reach final C using only ε-moves",
            "Every NFA accepts ε",
            "Every start state must be final",
            "The alphabet contains ε"
          ],
          "answer": 0,
          "explanation": "A→εB→εC consumes no input, so the original accepts ε. Equivalence requires the converted start to accept too.",
          "segmentId": "l4-s09",
          "diagram": "l4-source-nfa"
        },
        {
          "id": "l4-q13",
          "prompt": "For the converted practice NFA, what is the transition from p2 on a?",
          "choices": [
            "{p1}",
            "{p2}",
            "{p0}",
            "∅"
          ],
          "answer": 3,
          "explanation": "The original p2 has no symbol transitions and E(p2)={p2}, so the resulting set is empty.",
          "segmentId": "l4-practice",
          "diagram": "l4-practice-nfa"
        },
        {
          "id": "l4-q14-id",
          "kind": "identification",
          "prompt": "All the states that can be Reached … only by seeing ε symbol",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Epsilon closure",
          "acceptedAnswers": [
            "Epsilon closure",
            "ε-closure",
            "ε closure",
            "epsilon-closure"
          ],
          "explanation": "This source wording identifies epsilon closure. Use the source frame to review it in context.",
          "segmentId": "l4-s06",
          "sourceFrame": "frames/lesson-4/frame-1270.jpg",
          "sourceSeconds": 1270
        },
        {
          "id": "l4-q15",
          "prompt": "Which trace describes input “ab” from p0 in the practice source?",
          "choices": [
            "ε to p1, a-loop at p1, then b to final p2",
            "a to p0, then b to p1",
            "b to p2, then a to p2",
            "ε to p2, then b to p0"
          ],
          "answer": 0,
          "explanation": "Take the free move to p1, consume a on its loop, and consume b to final p2.",
          "segmentId": "l4-practice",
          "diagram": "l4-practice-enfa"
        }
      ],
      "provenance": "Full-video frames at 21:10 and 37:30 corroborated the source graph and completed table; local multilingual ASR corroborated closure calculations and the spoken0/1-loop correction around 37:00. Segment timing is approximate. All explanatory prose, questions and Taglish notes are newly written paraphrases. The shorter p0/p1/p2 machine is a labeled additional exercise."
    },
    {
      "id": "lesson-5",
      "number": 5,
      "title": "NFA to DFA: subset construction",
      "videoId": "sVm9AE-DD3Q",
      "duration": 1806,
      "overview": "Follow all three source examples: make missing behavior explicit, combine branching possibilities into subsets, and build the final five-state DFA from its transition table.",
      "objectives": [
        "Represent each DFA state as a set of NFA states.",
        "Compute each subset transition by unioning destinations for every alphabet symbol.",
        "Continue until all reachable subsets are processed.",
        "Mark subsets containing an NFA final state as accepting.",
        "Include and correctly loop the empty-set trap state when reachable/required."
      ],
      "keyTerms": [
        {
          "term": "NFA",
          "definition": "An automaton that can have several or no destinations for a state-symbol pair."
        },
        {
          "term": "Subset construction",
          "definition": "A conversion where each DFA state represents a set of NFA states."
        },
        {
          "term": "Reachable subset",
          "definition": "A subset reached from the start subset by some input string."
        },
        {
          "term": "Accepting subset",
          "definition": "A subset containing at least one accepting NFA state."
        },
        {
          "term": "Empty subset / trap state",
          "definition": "The set with no NFA states; each symbol maps it back to itself."
        }
      ],
      "segments": [
        {
          "id": "l5-s01",
          "start": 20,
          "end": 210,
          "title": "Conversion keeps the same language",
          "notes": [
            "An NFA and its equivalent DFA accept the same set of words. Their transition rules have different codomains: a DFA chooses one state, while an NFA may return a subset of states.",
            "Subset construction records all NFA possibilities after one input prefix inside a single DFA state. It does not choose an arbitrary branch and discard the others."
          ],
          "speakerNotes": "Ang target ay equivalent DFA: pareho pa rin ang accepted strings. Sa DFA, isang destination; sa NFA, set ng mga posibleng states.",
          "visualDescription": "The opening comparison displays the DFA/NFA transition mappings before the worked examples.",
          "frames": [
            {
              "src": "frames/lesson-5/frame-0090.jpg",
              "seconds": 90,
              "width": 854,
              "height": 480,
              "caption": "1:30 · Conversion keeps the same language",
              "alt": "Source video frame at 1:30: Conversion keeps the same language"
            }
          ]
        },
        {
          "id": "l5-s02",
          "start": 210,
          "end": 390,
          "title": "Example 1: read the NFA for words starting with 0",
          "notes": [
            "The first source example has start A, accepting B, a 0-edge A→B, and 0/1 loops at B. There is no 1-transition from A.",
            "Its NFA table is A:[{B},∅], B:[{B},{B}] under columns 0 and 1. It accepts 0 and any suffix after that first 0; ε and words beginning with 1 are rejected."
          ],
          "speakerNotes": "Sa unang example, 0 ang unang symbol para makapunta sa B. Final ang B at may loop sa 0 at 1. Walang destination mula A sa input 1.",
          "visualDescription": "At the checked 4:30–6:30 frames, the NFA and its table are introduced and filled.",
          "diagram": "l5-starts-zero-nfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-0270.jpg",
              "seconds": 270,
              "width": 854,
              "height": 480,
              "caption": "4:30 · Example 1: read the NFA for words starting with 0",
              "alt": "Source video frame at 4:30: Example 1: read the NFA for words starting with 0"
            },
            {
              "src": "frames/lesson-5/frame-0390.jpg",
              "seconds": 390,
              "width": 854,
              "height": 480,
              "caption": "6:30 · Example 1: read the NFA for words starting with 0",
              "alt": "Source video frame at 6:30: Example 1: read the NFA for words starting with 0"
            }
          ]
        },
        {
          "id": "l5-s03",
          "start": 390,
          "end": 510,
          "title": "Name the missing destination as a dead state",
          "notes": [
            "The DFA needs one destination for A on input 1. The source introduces C to represent the empty subset ∅. A therefore goes to B on 0 and C on 1.",
            "C is rejecting and returns to itself on both symbols: once no NFA path remains, reading more input cannot restore one."
          ],
          "speakerNotes": "Ang walang destination ay papalitan ng dead state C sa complete DFA. Mula A sa 1, C ang pupuntahan; ang C ay hindi final.",
          "visualDescription": "The NFA table and new DFA table appear side by side. At the checked 8:30 frame, the first DFA row includes the new C destination.",
          "diagram": "l5-starts-zero-dfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-0450.jpg",
              "seconds": 450,
              "width": 854,
              "height": 480,
              "caption": "7:30 · Name the missing destination as a dead state",
              "alt": "Source video frame at 7:30: Name the missing destination as a dead state"
            },
            {
              "src": "frames/lesson-5/frame-0510.jpg",
              "seconds": 510,
              "width": 854,
              "height": 480,
              "caption": "8:30 · Name the missing destination as a dead state",
              "alt": "Source video frame at 8:30: Name the missing destination as a dead state"
            }
          ]
        },
        {
          "id": "l5-s04",
          "start": 510,
          "end": 630,
          "title": "Complete the new row and draw the DFA",
          "notes": [
            "B still loops on 0 and 1. Add a C row with C in both columns, then draw the start arrow at A and accepting marker at B.",
            "The output has three states, but it recognizes exactly the first NFA’s language. Added state count is a consequence of making every transition explicit, not a change in the accepted words."
          ],
          "speakerNotes": "Kumpletuhin ang row ng B at ang dalawang self-loops ng C. Pareho pa rin ang language, pero may explicit na rejecting branch na ang DFA.",
          "visualDescription": "At checked 9:30 the C row is added; by 10:30–11:30 the DFA graph is drawn alongside the completed table.",
          "diagram": "l5-starts-zero-dfa",
          "workedSteps": [
            "A on 0→B, on 1→C.",
            "B on either symbol→B.",
            "C on either symbol→C.",
            "Only B is accepting."
          ],
          "frames": [
            {
              "src": "frames/lesson-5/frame-0570.jpg",
              "seconds": 570,
              "width": 854,
              "height": 480,
              "caption": "9:30 · Complete the new row and draw the DFA",
              "alt": "Source video frame at 9:30: Complete the new row and draw the DFA"
            },
            {
              "src": "frames/lesson-5/frame-0630.jpg",
              "seconds": 630,
              "width": 854,
              "height": 480,
              "caption": "10:30 · Complete the new row and draw the DFA",
              "alt": "Source video frame at 10:30: Complete the new row and draw the DFA"
            },
            {
              "src": "frames/lesson-5/frame-0690.jpg",
              "seconds": 690,
              "width": 854,
              "height": 480,
              "caption": "11:30 · Complete the new row and draw the DFA",
              "alt": "Source video frame at 11:30: Complete the new row and draw the DFA"
            }
          ]
        },
        {
          "id": "l5-s05",
          "start": 750,
          "end": 870,
          "title": "Example 2: one input can leave two possibilities",
          "notes": [
            "The second source NFA starts at A, which loops on 0 and 1. There is also a 1-edge A→B, and B is accepting with no outgoing edges.",
            "For input 1 from A, the destination set is {A,B}. Keeping the A possibility permits more input; the B possibility accepts when the word ends at that point. The NFA recognizes binary words ending in 1."
          ],
          "speakerNotes": "Sa pangalawang NFA, may loop sa A at may 1-arrow papunta sa final B. Kaya sa input 1, parehong A at B ang posibleng states.",
          "visualDescription": "The second example’s enlarged graph is visible in the checked 12:30 frame. The source briefly revisits the previous table before returning to this example.",
          "diagram": "l5-ends-one-nfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-0750.jpg",
              "seconds": 750,
              "width": 854,
              "height": 480,
              "caption": "12:30 · Example 2: one input can leave two possibilities",
              "alt": "Source video frame at 12:30: Example 2: one input can leave two possibilities"
            }
          ]
        },
        {
          "id": "l5-s06",
          "start": 870,
          "end": 990,
          "title": "Build the singleton and composite rows",
          "notes": [
            "Begin at subset {A}, displayed simply as A. Its 0-destination is {A}; its 1-destination is {A,B}, written AB as one DFA state.",
            "AB is a label for the subset {A,B}, not an input word and not a simultaneous choice between two DFA nodes."
          ],
          "speakerNotes": "Ang AB ay isang DFA state na kumakatawan sa set na A at B. Hindi ito dalawang sunod na input symbols.",
          "visualDescription": "The checked 14:30–16:30 frames show A’s NFA destination set and the new AB row in the DFA table.",
          "diagram": "l5-ends-one-dfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-0870.jpg",
              "seconds": 870,
              "width": 854,
              "height": 480,
              "caption": "14:30 · Build the singleton and composite rows",
              "alt": "Source video frame at 14:30: Build the singleton and composite rows"
            },
            {
              "src": "frames/lesson-5/frame-0930.jpg",
              "seconds": 930,
              "width": 854,
              "height": 480,
              "caption": "15:30 · Build the singleton and composite rows",
              "alt": "Source video frame at 15:30: Build the singleton and composite rows"
            }
          ]
        },
        {
          "id": "l5-s07",
          "start": 990,
          "end": 1170,
          "title": "Union the transitions of every subset member",
          "notes": [
            "From AB on 0, take δ(A,0)∪δ(B,0)={A}∪∅={A}. From AB on 1, take {A,B}∪∅={A,B}.",
            "AB is accepting because it contains original final state B. The two DFA states A and AB are enough; ∅ is not reachable in this example, so no new trap is required."
          ],
          "speakerNotes": "Para sa AB, pagsamahin ang destinations mula A at B. Sa 0, A ang sagot; sa 1, AB. Final ang AB dahil kasama ang final state B.",
          "visualDescription": "At checked 17:30 the source writes the union calculation; by 18:30 the two DFA rows are complete.",
          "diagram": "l5-ends-one-dfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-0990.jpg",
              "seconds": 990,
              "width": 854,
              "height": 480,
              "caption": "16:30 · Union the transitions of every subset member",
              "alt": "Source video frame at 16:30: Union the transitions of every subset member"
            },
            {
              "src": "frames/lesson-5/frame-1050.jpg",
              "seconds": 1050,
              "width": 854,
              "height": 480,
              "caption": "17:30 · Union the transitions of every subset member",
              "alt": "Source video frame at 17:30: Union the transitions of every subset member"
            },
            {
              "src": "frames/lesson-5/frame-1110.jpg",
              "seconds": 1110,
              "width": 854,
              "height": 480,
              "caption": "18:30 · Union the transitions of every subset member",
              "alt": "Source video frame at 18:30: Union the transitions of every subset member"
            }
          ]
        },
        {
          "id": "l5-s08",
          "start": 1170,
          "end": 1350,
          "title": "Example 3: reconstruct the input NFA from its tuple and table",
          "notes": [
            "The third source NFA uses Q={A,B,C}, Σ={a,b}, start A, and F={C}. Its rows are A:[{A,B},{C}], B:[{A},{B}], C:[∅,{A,B}].",
            "The NFA graph is built from those cells: A has an a-loop and an a-edge to B, A has b→C, B has a→A and a b-loop, and C has b-edges to A and B."
          ],
          "speakerNotes": "Sa third example, A ang start at C ang final. Basahin ang given table: A sa a ay A at B, A sa b ay C; B sa a ay A at sa b ay B; C sa a ay empty at sa b ay A at B.",
          "visualDescription": "The checked 19:30 frame introduces Example 3, 20:30 shows its tuple/table, and 21:30–22:30 progressively adds the graph’s edges.",
          "diagram": "l5-example-three-nfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-1230.jpg",
              "seconds": 1230,
              "width": 854,
              "height": 480,
              "caption": "20:30 · Example 3: reconstruct the input NFA from its tuple and table",
              "alt": "Source video frame at 20:30: Example 3: reconstruct the input NFA from its tuple and table"
            },
            {
              "src": "frames/lesson-5/frame-1290.jpg",
              "seconds": 1290,
              "width": 854,
              "height": 480,
              "caption": "21:30 · Example 3: reconstruct the input NFA from its tuple and table",
              "alt": "Source video frame at 21:30: Example 3: reconstruct the input NFA from its tuple and table"
            },
            {
              "src": "frames/lesson-5/frame-1350.jpg",
              "seconds": 1350,
              "width": 854,
              "height": 480,
              "caption": "22:30 · Example 3: reconstruct the input NFA from its tuple and table",
              "alt": "Source video frame at 22:30: Example 3: reconstruct the input NFA from its tuple and table"
            }
          ]
        },
        {
          "id": "l5-s09",
          "start": 1350,
          "end": 1470,
          "title": "Process A, then the newly discovered AB",
          "notes": [
            "The DFA row for singleton A is a→AB and b→C. AB is new, so add its row rather than leaving it as two separate states.",
            "AB on a gives {A,B}∪{A}={A,B}; AB on b gives {C}∪{B}={B,C}. This discovers another subset, BC."
          ],
          "speakerNotes": "Mula A, a ay AB at b ay C. Para sa bagong AB row, union ang gamitin: sa a ay AB; sa b ay BC.",
          "visualDescription": "At checked 23:30–24:30, the DFA table gains the A and AB rows while the unions are written below it.",
          "diagram": "l5-example-three-nfa",
          "workedSteps": [
            "Δ(A,a)=AB and Δ(A,b)=C.",
            "Δ(AB,a)=AB.",
            "Δ(AB,b)=BC; add BC as a new row."
          ],
          "frames": [
            {
              "src": "frames/lesson-5/frame-1410.jpg",
              "seconds": 1410,
              "width": 854,
              "height": 480,
              "caption": "23:30 · Process A, then the newly discovered AB",
              "alt": "Source video frame at 23:30: Process A, then the newly discovered AB"
            },
            {
              "src": "frames/lesson-5/frame-1470.jpg",
              "seconds": 1470,
              "width": 854,
              "height": 480,
              "caption": "24:30 · Process A, then the newly discovered AB",
              "alt": "Source video frame at 24:30: Process A, then the newly discovered AB"
            }
          ]
        },
        {
          "id": "l5-s10",
          "start": 1470,
          "end": 1590,
          "title": "Process BC and C without skipping empty sets",
          "notes": [
            "BC on a gives δ(B,a)∪δ(C,a)={A}∪∅={A}. BC on b gives {B}∪{A,B}={A,B}.",
            "C on a has no NFA destination, so the source assigns D to represent ∅. C on b gives AB. D therefore becomes a required reachable trap state."
          ],
          "speakerNotes": "Sa BC, a ay A at b ay AB. Sa C, walang a-destination kaya kailangan ng dead state D; sa b ay AB.",
          "visualDescription": "The checked 25:30 frame fills BC’s row; by 26:30 C’s a-transition introduces D.",
          "diagram": "l5-example-three-dfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-1530.jpg",
              "seconds": 1530,
              "width": 854,
              "height": 480,
              "caption": "25:30 · Process BC and C without skipping empty sets",
              "alt": "Source video frame at 25:30: Process BC and C without skipping empty sets"
            },
            {
              "src": "frames/lesson-5/frame-1590.jpg",
              "seconds": 1590,
              "width": 854,
              "height": 480,
              "caption": "26:30 · Process BC and C without skipping empty sets",
              "alt": "Source video frame at 26:30: Process BC and C without skipping empty sets"
            }
          ]
        },
        {
          "id": "l5-s11",
          "start": 1590,
          "end": 1710,
          "title": "Complete D and mark the accepting subsets",
          "notes": [
            "D loops on a and b. The five reachable DFA states are A, AB, BC, C, and D.",
            "Only C and BC contain original final state C, so only those two are accepting. AB contains B but not C and is not accepting in this third example. Final labels must be recomputed for each example."
          ],
          "speakerNotes": "Kumpletuhin ang D row gamit ang D sa parehong inputs. C at BC ang final dito, dahil C ang original final state sa third example.",
          "visualDescription": "The checked 27:30 frame has the full table; around 28:30 the source draws the nodes and accepting markers.",
          "diagram": "l5-example-three-dfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-1650.jpg",
              "seconds": 1650,
              "width": 854,
              "height": 480,
              "caption": "27:30 · Complete D and mark the accepting subsets",
              "alt": "Source video frame at 27:30: Complete D and mark the accepting subsets"
            },
            {
              "src": "frames/lesson-5/frame-1710.jpg",
              "seconds": 1710,
              "width": 854,
              "height": 480,
              "caption": "28:30 · Complete D and mark the accepting subsets",
              "alt": "Source video frame at 28:30: Complete D and mark the accepting subsets"
            }
          ]
        },
        {
          "id": "l5-s12",
          "start": 1710,
          "end": 1806,
          "title": "Draw the final DFA and cross-check its table",
          "notes": [
            "Translate each completed cell into one directed edge. The recreated figure includes all ten state–symbol transitions, including D’s two sink loops.",
            "Check ab: A→AB→BC, so accept. Check bb: A→C→AB, so reject. These traces use the same language as the original NFA, but the DFA has a unique run."
          ],
          "speakerNotes": "Pagkatapos makumpleto ang table, iguhit ang bawat transition at i-check ang accepting states. Gamitin ang parehong inputs para maikumpara ang NFA at DFA.",
          "visualDescription": "The checked 29:30 frame draws the final DFA from its table. The recreation completes every listed cell explicitly.",
          "diagram": "l5-example-three-dfa",
          "frames": [
            {
              "src": "frames/lesson-5/frame-1770.jpg",
              "seconds": 1770,
              "width": 854,
              "height": 480,
              "caption": "29:30 · Draw the final DFA and cross-check its table",
              "alt": "Source video frame at 29:30: Draw the final DFA and cross-check its table"
            }
          ]
        }
      ],
      "recap": [
        "A DFA state represents a reachable subset of NFA states.",
        "Union the transitions from every member, then add newly reached subsets.",
        "A subset is accepting if it contains any original accepting state.",
        "An empty subset is a rejecting sink when reachable.",
        "Recompute accepting subsets for each example; the original final state may change."
      ],
      "commonMistakes": [
        "Following only one branch from a subset.",
        "Confusing a DFA subset node with one NFA state.",
        "Forgetting to process newly discovered subsets.",
        "Marking a subset final only when all members are final.",
        "Dropping a reachable empty subset from a complete DFA.",
        "Leaving an edge absent where a complete DFA requires a trap transition."
      ],
      "questions": [
        {
          "id": "l5-q01-id",
          "kind": "identification",
          "prompt": "δ = Q × Σ → Q",
          "definitionLabel": "Preserved source notation",
          "answer": "Deterministic finite automaton",
          "acceptedAnswers": [
            "Deterministic finite automaton",
            "DFA",
            "deterministic finite automata"
          ],
          "explanation": "This source wording identifies deterministic finite automaton. Use the source frame to review it in context.",
          "segmentId": "l5-s01",
          "sourceFrame": "frames/lesson-5/frame-0090.jpg",
          "sourceSeconds": 90
        },
        {
          "id": "l5-q02",
          "prompt": "In Source Example 1, what is the NFA destination from A on 1?",
          "choices": [
            "{A}",
            "{B}",
            "{A,B}",
            "∅"
          ],
          "answer": 3,
          "explanation": "A has a 0-edge to B, but no 1-edge.",
          "segmentId": "l5-s02",
          "diagram": "l5-starts-zero-nfa"
        },
        {
          "id": "l5-q03",
          "prompt": "Why is state C added in Source Example 1’s DFA?",
          "choices": [
            "To accept words beginning with 1",
            "To replace the start state",
            "To represent the empty destination set and complete missing transitions",
            "To make B nonaccepting"
          ],
          "answer": 2,
          "explanation": "C names the empty subset and loops on both symbols.",
          "segmentId": "l5-s03",
          "diagram": "l5-starts-zero-dfa"
        },
        {
          "id": "l5-q04",
          "prompt": "Which word is accepted by Source Example 1’s completed DFA?",
          "choices": [
            "11",
            "010",
            "100",
            "ε"
          ],
          "answer": 1,
          "explanation": "The first 0 reaches B and all later symbols loop there.",
          "segmentId": "l5-s04",
          "diagram": "l5-starts-zero-dfa"
        },
        {
          "id": "l5-q05",
          "prompt": "Why is the second source NFA not a DFA?",
          "choices": [
            "A has two destinations on symbol 1",
            "It has only one final state",
            "Its alphabet is binary",
            "B has no self-loop on 0"
          ],
          "answer": 0,
          "explanation": "The 1-loop keeps A while the 1-edge reaches B, giving {A,B}.",
          "segmentId": "l5-s05",
          "diagram": "l5-ends-one-nfa"
        },
        {
          "id": "l5-q06",
          "prompt": "In Source Example 2, what is Δ({A},1)?",
          "choices": [
            "{A}",
            "{B}",
            "∅",
            "{A,B}"
          ],
          "answer": 3,
          "explanation": "Union every 1-destination from A: the loop gives A and the other edge gives B.",
          "segmentId": "l5-s06",
          "diagram": "l5-ends-one-nfa"
        },
        {
          "id": "l5-q07",
          "prompt": "In Source Example 2, what is Δ({A,B},0)?",
          "choices": [
            "{B}",
            "∅",
            "{A}",
            "{A,B}"
          ],
          "answer": 2,
          "explanation": "δ(A,0)={A}; δ(B,0)=∅; their union is {A}.",
          "segmentId": "l5-s07",
          "diagram": "l5-ends-one-nfa"
        },
        {
          "id": "l5-q08-id",
          "kind": "identification",
          "prompt": "δ = Q × Σ → 2^Q",
          "definitionLabel": "Preserved source notation",
          "answer": "Nondeterministic finite automaton",
          "acceptedAnswers": [
            "Nondeterministic finite automaton",
            "NFA",
            "non-deterministic finite automaton",
            "nondeterministic finite automata"
          ],
          "explanation": "This source wording identifies nondeterministic finite automaton. Use the source frame to review it in context.",
          "segmentId": "l5-s01",
          "sourceFrame": "frames/lesson-5/frame-0090.jpg",
          "sourceSeconds": 90
        },
        {
          "id": "l5-q09",
          "prompt": "In Source Example 3, what is Δ(AB,b)?",
          "choices": [
            "BC",
            "AB",
            "A",
            "D"
          ],
          "answer": 0,
          "explanation": "Union δ(A,b)={C} with δ(B,b)={B} to obtain {B,C}.",
          "segmentId": "l5-s09",
          "diagram": "l5-example-three-nfa"
        },
        {
          "id": "l5-q10",
          "prompt": "In Source Example 3, what is Δ(BC,a)?",
          "choices": [
            "BC",
            "AB",
            "D",
            "A"
          ],
          "answer": 3,
          "explanation": "δ(B,a)={A} and δ(C,a)=∅, so the union is {A}.",
          "segmentId": "l5-s10",
          "diagram": "l5-example-three-nfa"
        },
        {
          "id": "l5-q11",
          "prompt": "Which DFA states are accepting in Source Example 3?",
          "choices": [
            "A and AB",
            "Every state except D",
            "C and BC",
            "B and AB"
          ],
          "answer": 2,
          "explanation": "The original final set is {C}; exactly the reachable subsets containing C are accepting.",
          "segmentId": "l5-s11",
          "diagram": "l5-example-three-dfa"
        },
        {
          "id": "l5-q12",
          "prompt": "In Source Example 3, where does D go on input b?",
          "choices": [
            "C",
            "D",
            "A",
            "AB"
          ],
          "answer": 1,
          "explanation": "D represents ∅, so no symbol can produce a nonempty destination set.",
          "segmentId": "l5-s11",
          "diagram": "l5-example-three-dfa"
        },
        {
          "id": "l5-q13",
          "prompt": "How many reachable DFA states does Source Example 3 produce before minimization?",
          "choices": [
            "5",
            "3",
            "4",
            "8"
          ],
          "answer": 0,
          "explanation": "The worklist discovers A, AB, BC, C and the empty subset D; it does not need all 2³ possible subsets.",
          "segmentId": "l5-s11",
          "diagram": "l5-example-three-dfa"
        },
        {
          "id": "l5-q14-id",
          "kind": "identification",
          "prompt": "AB = A ∪ B",
          "definitionLabel": "Preserved source notation",
          "answer": "Union",
          "acceptedAnswers": [
            "Union",
            "union method",
            "set union"
          ],
          "explanation": "The ∪ symbol is set union. In subset construction, the destinations contributed by each member are combined using this operation.",
          "segmentId": "l5-s07",
          "sourceFrame": "frames/lesson-5/frame-1050.jpg",
          "sourceSeconds": 1050
        },
        {
          "id": "l5-q15",
          "prompt": "Starting at A in Source Example 3’s DFA, what happens on ab?",
          "choices": [
            "A→C→D; reject",
            "A→BC→A; accept",
            "A→AB→BC; accept",
            "A→AB→AB; reject"
          ],
          "answer": 2,
          "explanation": "The a-column sends A to AB and the b-column sends AB to accepting BC.",
          "segmentId": "l5-s12",
          "diagram": "l5-example-three-dfa"
        }
      ],
      "provenance": "Reconstructed from readable full-video samples at 60-second intervals (sample centers 0:30, 1:30, …, 29:30), with additional table/graph checks. Segment links are approximate navigation points, not exact word boundaries. English explanations, Taglish paraphrases and questions are newly written. Source diagrams are recreated; no original video or full transcript is hosted."
    },
    {
      "id": "lesson-6",
      "number": 6,
      "title": "DFA Minimization",
      "videoId": "3PP21tlIKsE",
      "duration": 2319,
      "overview": "Learn how to find the smallest DFA for the same language. The lesson introduces state equivalence, refines candidate groups using transitions, and works through two examples. A DFA is already minimal only when its reachable states are pairwise distinguishable.",
      "objectives": [
        "Explain why equivalent states can be merged without changing the language.",
        "Start partition refinement by separating accepting from non-accepting states.",
        "Use transition destinations and distinguishing suffixes to refine a partition.",
        "Reconstruct the two source examples and verify their minimized forms.",
        "Distinguish removing unreachable states from merging equivalent reachable states."
      ],
      "keyTerms": [
        {
          "term": "DFA minimization",
          "definition": "Constructing a smallest-state DFA that recognizes the same language as the original."
        },
        {
          "term": "Equivalent states",
          "definition": "States are equivalent when every possible continuation is accepted from both or rejected from both."
        },
        {
          "term": "Distinguishing suffix",
          "definition": "A continuation that makes one of two states accept and the other reject; it proves the states are not equivalent."
        },
        {
          "term": "Partition refinement",
          "definition": "Repeatedly split state groups when a symbol sends members into different groups, until no group can be split."
        },
        {
          "term": "Reachable state",
          "definition": "A state that can be reached from the start state by reading some string, including the empty string."
        },
        {
          "term": "Empty word (ε)",
          "definition": "The string with no symbols. Starting there leaves the machine at its start state, so it is accepted exactly when the start state is accepting."
        }
      ],
      "segments": [
        {
          "id": "l6-s01",
          "start": 20,
          "end": 116,
          "title": "Goal: reduce states while preserving the language",
          "notes": [
            "The lecturer introduces DFA minimization and describes the aim as reducing state count while retaining the same recognized behavior.",
            "The lesson uses a procedure and presents transition tables and diagrams."
          ],
          "speakerNotes": "Ang minimization ay pagbawas ng states habang pareho pa rin ang accepted language. Hahanapin kung aling states ang puwedeng pagsamahin.",
          "visualDescription": "Opening title and motivation, followed by the topic title.",
          "diagram": "",
          "workedSteps": [],
          "frames": [
            {
              "src": "frames/lesson-6/frame-0040.jpg",
              "seconds": 40,
              "width": 854,
              "height": 480,
              "caption": "0:40 · Goal: reduce states while preserving the language",
              "alt": "Source video frame at 0:40: Goal: reduce states while preserving the language"
            }
          ]
        },
        {
          "id": "l6-s02",
          "start": 185,
          "end": 500,
          "title": "Equivalent states have identical future answers",
          "notes": [
            "Compare two states by asking what happens after each possible continuation.",
            "If every continuation leads to the same accept/reject result from both states, they are equivalent.",
            "One matching transition is not enough: the test must hold for every string, including the empty word."
          ],
          "speakerNotes": "Sa Taglish: Magkapareho ang dalawang state kung pareho ang magiging accept o reject nila para sa bawat posibleng kasunod na input. Hindi sapat ang magkaparehong label o isang test lang.",
          "visualDescription": "The lecture introduces equivalence with a cartoon and state sketches; the early sketch labels are not used as a source example.",
          "diagram": "",
          "workedSteps": [
            "For ε, check whether the states themselves are accepting.",
            "For each symbol and then longer suffixes, compare the states reached.",
            "A suffix that produces different acceptance is a witness that they are distinguishable."
          ],
          "frames": [
            {
              "src": "frames/lesson-6/frame-0240.jpg",
              "seconds": 240,
              "width": 854,
              "height": 480,
              "caption": "4:00 · Equivalent states have identical future answers",
              "alt": "Source video frame at 4:00: Equivalent states have identical future answers"
            },
            {
              "src": "frames/lesson-6/frame-0390.jpg",
              "seconds": 390,
              "width": 854,
              "height": 480,
              "caption": "6:30 · Equivalent states have identical future answers",
              "alt": "Source video frame at 6:30: Equivalent states have identical future answers"
            }
          ]
        },
        {
          "id": "l6-s03",
          "start": 500,
          "end": 594,
          "title": "Example 1: read the five-state DFA",
          "notes": [
            "At about 08:30 the video shows states A, B, C, D, E; A is the start and E is accepting.",
            "The visible diagram and table agree: A goes to B on 0 and C on 1; B goes to B/D; C goes to B/C; D goes to B/E; E goes to B/C for inputs 0/1.",
            "All five states are reachable from A."
          ],
          "speakerNotes": "Sa unang example, A ang start at E ang final. Basahin muna ang table para makita ang destination sa bawat0 at 1 bago maghanap ng equivalent states.",
          "visualDescription": "A five-state diagram labeled Example 1: DFA Minimization, with E double-circled.",
          "diagram": "l6-source-example-1",
          "workedSteps": [
            "A: 0→B, 1→C",
            "B: 0→B, 1→D",
            "C: 0→B, 1→C",
            "D: 0→B, 1→E",
            "E: 0→B, 1→C"
          ],
          "frames": [
            {
              "src": "frames/lesson-6/frame-0510.jpg",
              "seconds": 510,
              "width": 854,
              "height": 480,
              "caption": "8:30 · Example 1: read the five-state DFA",
              "alt": "Source video frame at 8:30: Example 1: read the five-state DFA"
            }
          ]
        },
        {
          "id": "l6-s04",
          "start": 594,
          "end": 1422,
          "title": "Example 1: prove A and C equivalent",
          "notes": [
            "A and C are both non-accepting. Their 0 transitions both go to B.",
            "Their 1 transitions go to C and C; since A and C are being considered as one class, these destinations are in that same class.",
            "Thus A and C have the same acceptance behavior for all continuations and can be merged."
          ],
          "speakerNotes": "Sa source example, ang only merge ay A at C. Hindi kailangan manghula mula sa hugis: tingnan ang transition table at kung saang equivalence class napupunta ang bawat symbol.",
          "visualDescription": "The source separates final/nonfinal states, refines {A,B,C,D} into {A,B,C} and {D}, then separates B from A/C. By the checked 20:00 frame, the stable partition and converted table are visible.",
          "diagram": "l6-source-example-1",
          "workedSteps": [
            "Initial split: {A,B,C,D} | {E}.",
            "After one-symbol refinement: {A,B,C} | {D} | {E}; D alone reaches accepting E on 1.",
            "Next refinement: {A,C} | {B} | {D} | {E}; B differs because its 1-transition reaches the D class.",
            "The next refinement is unchanged. Construct AC,B,D,E, with start AC and accepting E."
          ],
          "frames": [
            {
              "src": "frames/lesson-6/frame-0610.jpg",
              "seconds": 610,
              "width": 854,
              "height": 480,
              "caption": "10:10 · Example 1: prove A and C equivalent",
              "alt": "Source video frame at 10:10: Example 1: prove A and C equivalent"
            },
            {
              "src": "frames/lesson-6/frame-0710.jpg",
              "seconds": 710,
              "width": 854,
              "height": 480,
              "caption": "11:50 · Example 1: prove A and C equivalent",
              "alt": "Source video frame at 11:50: Example 1: prove A and C equivalent"
            },
            {
              "src": "frames/lesson-6/frame-0900.jpg",
              "seconds": 900,
              "width": 854,
              "height": 480,
              "caption": "15:00 · Example 1: prove A and C equivalent",
              "alt": "Source video frame at 15:00: Example 1: prove A and C equivalent"
            },
            {
              "src": "frames/lesson-6/frame-1050.jpg",
              "seconds": 1050,
              "width": 854,
              "height": 480,
              "caption": "17:30 · Example 1: prove A and C equivalent",
              "alt": "Source video frame at 17:30: Example 1: prove A and C equivalent"
            },
            {
              "src": "frames/lesson-6/frame-1200.jpg",
              "seconds": 1200,
              "width": 854,
              "height": 480,
              "caption": "20:00 · Example 1: prove A and C equivalent",
              "alt": "Source video frame at 20:00: Example 1: prove A and C equivalent"
            },
            {
              "src": "frames/lesson-6/frame-1370.jpg",
              "seconds": 1370,
              "width": 854,
              "height": 480,
              "caption": "22:50 · Example 1: prove A and C equivalent",
              "alt": "Source video frame at 22:50: Example 1: prove A and C equivalent"
            }
          ]
        },
        {
          "id": "l6-s05",
          "start": 1422,
          "end": 1550,
          "title": "Second example: initial partition",
          "notes": [
            "At about 23:40 a complete transition table for q0 through q7 appears. q0 is the start and q2 is the only accepting state. q3 and q7 are unreachable from q0.",
            "The first partition is {q2} versus {q0,q1,q3,q4,q5,q6,q7}. The empty word already distinguishes q2 from every nonfinal state.",
            "The first refinement groups nonfinal states by the classes reached on 0 and 1."
          ],
          "speakerNotes": "Sa unang hati, isama ang empty string: kapag nasa accepting state na, tanggap ang ε; kapag nonfinal, reject ang ε. Kaya hindi puwedeng mapunta ang q2 sa group ng iba.",
          "visualDescription": "Readable table with columns 0 and 1; q0 start, q2 double-marked accepting.",
          "diagram": "l6-source-example-2",
          "workedSteps": [
            "q0: 0→q1, 1→q5",
            "q1: 0→q6, 1→q2",
            "q2: 0→q0, 1→q2",
            "q3: 0→q2, 1→q6",
            "q4: 0→q1, 1→q5",
            "q5: 0→q2, 1→q6",
            "q6: 0→q6, 1→q4",
            "q7: 0→q6, 1→q2"
          ],
          "frames": [
            {
              "src": "frames/lesson-6/frame-1440.jpg",
              "seconds": 1440,
              "width": 854,
              "height": 480,
              "caption": "24:00 · Second example: initial partition",
              "alt": "Source video frame at 24:00: Second example: initial partition"
            }
          ]
        },
        {
          "id": "l6-s06",
          "start": 1550,
          "end": 1900,
          "title": "Second example: refine by destination classes",
          "notes": [
            "The displayed first refinement is {q0,q4,q6}, {q1,q7}, {q3,q5}, {q2}.",
            "q0 and q4 share both destination patterns. q1 and q7 share both destinations. q3 and q5 share both destinations. q3 and q7 themselves are unreachable from the start, although the source includes them while refining the full table.",
            "q6 splits from q0/q4 because on 0 it stays in the q6 class while q0/q4 go to q1/q7; on 1 it goes to q4."
          ],
          "speakerNotes": "Ihambing ang group na pinupuntahan ng bawat state sa0 at 1. Kapag magkaiba ang destination groups, kailangan pang hatiin ang block.",
          "visualDescription": "The slide shows the initial split, then the displayed 1-equivalence row and the beginning of the next refinement.",
          "diagram": "l6-source-example-2",
          "workedSteps": [
            "Round 0: {q2} | {q0,q1,q3,q4,q5,q6,q7}.",
            "Round 1: {q0,q4,q6} | {q1,q7} | {q3,q5} | {q2}.",
            "Compare destination-group pairs for each symbol to decide whether a block must split."
          ],
          "frames": [
            {
              "src": "frames/lesson-6/frame-1600.jpg",
              "seconds": 1600,
              "width": 854,
              "height": 480,
              "caption": "26:40 · Second example: refine by destination classes",
              "alt": "Source video frame at 26:40: Second example: refine by destination classes"
            },
            {
              "src": "frames/lesson-6/frame-1680.jpg",
              "seconds": 1680,
              "width": 854,
              "height": 480,
              "caption": "28:00 · Second example: refine by destination classes",
              "alt": "Source video frame at 28:00: Second example: refine by destination classes"
            },
            {
              "src": "frames/lesson-6/frame-1800.jpg",
              "seconds": 1800,
              "width": 854,
              "height": 480,
              "caption": "30:00 · Second example: refine by destination classes",
              "alt": "Source video frame at 30:00: Second example: refine by destination classes"
            }
          ]
        },
        {
          "id": "l6-s07",
          "start": 1900,
          "end": 2304,
          "title": "Second example: final partition and minimized table",
          "notes": [
            "The video displays the final classes {q0,q4}, {q6}, {q1,q7}, {q3,q5}, {q2}.",
            "The accepting class is {q2}; the start class is {q0,q4}.",
            "The video groups the full table into five classes. q3 and q7 are unreachable from q0; removing them first leaves six reachable states, then q0 and q4 merge, also yielding a five-state minimal reachable DFA."
          ],
          "speakerNotes": "Sa final partition, gumawa ng isang state para sa bawat group at i-map ang0 at1 sa destination groups. Ang groups ay q0/q4, q6, q1/q7, q3/q5 at q2.",
          "visualDescription": "The source table shows five final classes and begins a quotient transition table; q3 and q7 are not reachable from q0.",
          "diagram": "l6-source-example-2",
          "workedSteps": [
            "The displayed full-table grouping is {q0,q4}, {q6}, {q1,q7}, {q3,q5}, {q2}.",
            "From q0, only q0, q1, q2, q4, q5, q6 are reachable; q3 and q7 are unreachable.",
            "After deleting q3 and q7, q0 and q4 remain equivalent; merging them leaves five reachable quotient states.",
            "The source quotient transitions are consistent because unreachable q3/q7 share the same destination behavior as q5/q1 respectively."
          ],
          "caution": "Additional reachability check: q3 and q7 are unreachable from q0. Removing them first and merging the reachable equivalent pair q0/q4 gives the same five-state minimal result. This check is an editorial clarification of the source’s full-table refinement.",
          "frames": [
            {
              "src": "frames/lesson-6/frame-1900.jpg",
              "seconds": 1900,
              "width": 854,
              "height": 480,
              "caption": "31:40 · Second example: final partition and minimized table",
              "alt": "Source video frame at 31:40: Second example: final partition and minimized table"
            },
            {
              "src": "frames/lesson-6/frame-2020.jpg",
              "seconds": 2020,
              "width": 854,
              "height": 480,
              "caption": "33:40 · Second example: final partition and minimized table",
              "alt": "Source video frame at 33:40: Second example: final partition and minimized table"
            },
            {
              "src": "frames/lesson-6/frame-2150.jpg",
              "seconds": 2150,
              "width": 854,
              "height": 480,
              "caption": "35:50 · Second example: final partition and minimized table",
              "alt": "Source video frame at 35:50: Second example: final partition and minimized table"
            },
            {
              "src": "frames/lesson-6/frame-2270.jpg",
              "seconds": 2270,
              "width": 854,
              "height": 480,
              "caption": "37:50 · Second example: final partition and minimized table",
              "alt": "Source video frame at 37:50: Second example: final partition and minimized table"
            }
          ]
        },
        {
          "id": "l6-s08",
          "start": 500,
          "end": 500,
          "title": "Can a DFA be minimized further?",
          "notes": [
            "A DFA can always be minimized; the important question is whether minimization can reduce its state count.",
            "A reachable DFA is minimal exactly when every pair of distinct states is distinguishable.",
            "If an equivalent reachable pair exists, merge it. If a state is unreachable, remove it first; that is not an equivalence merge."
          ],
          "speakerNotes": "Dagdag na paliwanag: alisin muna ang unreachable states, saka tingnan kung may equivalent na reachable pair. Kapag wala nang ganoong pair, minimal na ang DFA.",
          "visualDescription": "The second worked example ends with a minimized DFA and the lesson summarizes the result.",
          "diagram": "",
          "workedSteps": [
            "Reachability asks whether the start can get to a state.",
            "Equivalence asks whether two reachable states have identical future language behavior.",
            "Do not conflate deleting unreachable states with merging equivalent states."
          ],
          "caution": "Additional explanation or practice, separate from the source examples. The time link points to the related source procedure, not to this newly authored exercise.",
          "frames": []
        },
        {
          "id": "l6-s09",
          "start": 500,
          "end": 500,
          "title": "A reliable refinement routine",
          "notes": [
            "Begin by removing unreachable states if the task asks for a minimal DFA.",
            "Split the remaining states into accepting and non-accepting groups.",
            "Repeatedly split groups when some symbol leads members to different current groups. Stop at a fixed point."
          ],
          "speakerNotes": "Buod ng routine: unang hati ay final at nonfinal. I-refine gamit ang destination groups hanggang wala nang bagong split.",
          "visualDescription": "Summary transition from the worked table toward the minimized result.",
          "diagram": "",
          "workedSteps": [
            "Compute states reachable from the start.",
            "Partition by acceptance, which includes testing ε.",
            "For each block, compare the destination block for every alphabet symbol.",
            "Repeat until the partition no longer changes, then build one state per block."
          ],
          "caution": "Additional explanation or practice, separate from the source examples. The time link points to the related source procedure, not to this newly authored exercise.",
          "frames": []
        },
        {
          "id": "l6-s10",
          "start": 500,
          "end": 500,
          "title": "Practice: a DFA that does shrink",
          "notes": [
            "New practice variation (not a source-video example): states p and r have matching transition patterns and are both nonfinal.",
            "The diagram is a complete DFA over {0,1}; p and r are equivalent.",
            "Merging p and r gives a two-state DFA with the same language."
          ],
          "speakerNotes": "Bagong practice variation ito, hindi video example. Tingnan sa diagram kung may magkaparehong future behavior na puwedeng pagsamahin.",
          "visualDescription": "Practice diagram l6-practice-reducible.",
          "diagram": "l6-practice-reducible",
          "workedSteps": [
            "Start partition: {f} | {p,r}.",
            "From p and r, 0 stays in the nonfinal block and 1 goes to f.",
            "They remain together; quotient has two states."
          ],
          "caution": "Additional explanation or practice, separate from the source examples. The time link points to the related source procedure, not to this newly authored exercise.",
          "frames": []
        },
        {
          "id": "l6-s11",
          "start": 500,
          "end": 500,
          "title": "Practice: a minimal DFA",
          "notes": [
            "New practice variation: a two-state parity DFA over {0,1}.",
            "On 0 it switches between states; on 1 it stays put. Only even-parity state e accepts.",
            "The states are distinguishable by ε because one accepts and one rejects, so no merge is possible."
          ],
          "speakerNotes": "Bagong practice variation ito. Ang accepting at rejecting states ay distinguished na ng empty string kaya hindi basta puwedeng pagsamahin.",
          "visualDescription": "Practice diagram l6-practice-minimal.",
          "diagram": "l6-practice-minimal",
          "workedSteps": [
            "ε distinguishes e from o.",
            "Both states are reachable from e.",
            "Two states are necessary and sufficient."
          ],
          "caution": "Additional explanation or practice, separate from the source examples. The time link points to the related source procedure, not to this newly authored exercise.",
          "frames": []
        },
        {
          "id": "l6-s12",
          "start": 500,
          "end": 500,
          "title": "Practice: unreachable is not equivalent",
          "notes": [
            "New practice variation: a one-symbol DFA has a reachable nonfinal start state p and an unreachable accepting state u.",
            "Remove u because no input from p can reach it. This removes an unreachable state; it does not merge equivalent reachable states.",
            "The resulting one-state DFA is minimal for the empty language."
          ],
          "speakerNotes": "Bagong practice variation ito. Walang path mula sa start papunta sa u, kaya reachability cleanup ang pagtanggal dito, hindi equivalent-state merge.",
          "visualDescription": "Practice diagram l6-practice-unreachable.",
          "diagram": "l6-practice-unreachable",
          "workedSteps": [
            "Reachable set from p is {p}.",
            "Delete u.",
            "There is only one reachable state, so no two reachable states remain to merge."
          ],
          "caution": "Additional explanation or practice, separate from the source examples. The time link points to the related source procedure, not to this newly authored exercise.",
          "frames": []
        }
      ],
      "recap": [
        "Equivalent means the same accept/reject answer for every continuation.",
        "The empty word ε creates the first split: accepting versus non-accepting.",
        "Refine groups when any symbol leads members to different groups.",
        "Merge only states that stay equivalent through all future behavior.",
        "Remove unreachable states separately from equivalence-based merging.",
        "A minimized DFA may still have multiple states; “minimal” means no further reduction preserves the language."
      ],
      "commonMistakes": [
        "Treating matching transitions on one symbol as proof of equivalence.",
        "Forgetting that ε distinguishes an accepting state from a non-accepting state.",
        "Starting with a guessed partition instead of acceptance classes.",
        "Merging two states whose transitions lead to different equivalence classes.",
        "Calling an unreachable-state deletion an equivalence merge.",
        "Assuming that every DFA can be reduced to fewer states; some are already minimal."
      ],
      "questions": [
        {
          "id": "l6-q01",
          "prompt": "Can the source Example 1 DFA be reduced further?",
          "choices": [
            "Yes. Merge A and C to get four states.",
            "Yes. Merge B and D to get four states.",
            "No. All five states are distinguishable.",
            "Yes. Delete E because it is accepting."
          ],
          "answer": 0,
          "explanation": "A and C are both nonaccepting; on 0 they both go to B and on 1 they go to the A/C class. The other states are distinguishable.",
          "segmentId": "l6-s04",
          "diagram": "l6-source-example-1"
        },
        {
          "id": "l6-q02",
          "prompt": "In Example 1, what distinguishes D from B?",
          "choices": [
            "The empty word ε.",
            "Suffix 1: D goes to accepting E, while B goes to nonaccepting D.",
            "Suffix 0: both go to B.",
            "They are equivalent."
          ],
          "answer": 1,
          "explanation": "The suffix 1 yields different acceptance: from D it reaches E, from B it reaches D.",
          "segmentId": "l6-s04",
          "diagram": "l6-source-example-1"
        },
        {
          "id": "l6-q03",
          "prompt": "What is the first partition for source Example 2?",
          "choices": [
            "{q0} | all others",
            "All states in one block",
            "{q0,q4} | {q1,q7} | {q3,q5} | {q6} | {q2}",
            "{q2} | {q0,q1,q3,q4,q5,q6,q7}"
          ],
          "answer": 3,
          "explanation": "q2 is the sole accepting state. The empty word accepts from q2 and rejects from every other state.",
          "segmentId": "l6-s05",
          "diagram": "l6-source-example-2"
        },
        {
          "id": "l6-q04",
          "prompt": "After the first transition-based refinement in Example 2, which partition is shown?",
          "choices": [
            "{q0,q4,q6} | {q1,q7} | {q3,q5} | {q2}",
            "{q0,q4} | {q6} | {q1,q7} | {q3,q5} | {q2}",
            "{q0,q1,q3,q4,q5,q6,q7} | {q2}",
            "{q0,q4,q6,q1,q7} | {q3,q5} | {q2}"
          ],
          "answer": 0,
          "explanation": "The video shows q0,q4,q6 grouped first, before q6 is split in the next refinement.",
          "segmentId": "l6-s06",
          "diagram": "l6-source-example-2"
        },
        {
          "id": "l6-q05",
          "prompt": "What is the final number of states for source Example 2?",
          "choices": [
            "8",
            "4",
            "2",
            "5"
          ],
          "answer": 3,
          "explanation": "The final partition has five classes: {q0,q4}, {q6}, {q1,q7}, {q3,q5}, and {q2}.",
          "segmentId": "l6-s07",
          "diagram": "l6-source-example-2"
        },
        {
          "id": "l6-q06",
          "prompt": "In source Example 2, which suffix distinguishes q6 from q0?",
          "choices": [
            "01",
            "0",
            "ε",
            "1"
          ],
          "answer": 0,
          "explanation": "From q0,01 reaches q1 then accepting q2. From q6,01 reaches q6 then nonaccepting q4. A single0 only reaches two nonfinal states and is not enough.",
          "segmentId": "l6-s06",
          "diagram": "l6-source-example-2"
        },
        {
          "id": "l6-q07",
          "prompt": "Why is q2 separated at the beginning of Example 2?",
          "choices": [
            "It is the start state.",
            "Its outgoing transitions are incomplete.",
            "The empty word is accepted from q2 but rejected from nonfinal states.",
            "It cannot reach any state."
          ],
          "answer": 2,
          "explanation": "q2 alone is accepting, so ε distinguishes it immediately.",
          "segmentId": "l6-s05",
          "diagram": "l6-source-example-2"
        },
        {
          "id": "l6-q08",
          "prompt": "For the reducible practice figure, can the DFA be minimized to fewer states?",
          "choices": [
            "No, because it has a start state.",
            "Yes, merge p and r; the quotient has two states.",
            "Yes, delete f.",
            "No, because p and r are both nonfinal."
          ],
          "answer": 1,
          "explanation": "p and r share the same transitions by class: 0 to their own nonfinal class, 1 to f. They are equivalent.",
          "segmentId": "l6-s10",
          "diagram": "l6-practice-reducible"
        },
        {
          "id": "l6-q09",
          "prompt": "In the reducible practice figure, what distinguishes p from f?",
          "choices": [
            "ε; f accepts while p does not.",
            "Suffix 0; both stay in their own states.",
            "Suffix 1; both go to f.",
            "Nothing; they are equivalent."
          ],
          "answer": 0,
          "explanation": "The empty word is accepted at f and rejected at p.",
          "segmentId": "l6-s10",
          "diagram": "l6-practice-reducible"
        },
        {
          "id": "l6-q10",
          "prompt": "Is the two-state practice figure reducible to one state?",
          "choices": [
            "Yes, merge e and o.",
            "Yes, because both states have complete transitions.",
            "No; ε distinguishes the accepting e from rejecting o.",
            "No; unreachable states remain."
          ],
          "answer": 2,
          "explanation": "Both states are reachable, and ε immediately distinguishes acceptance. The two-state DFA is minimal.",
          "segmentId": "l6-s11",
          "diagram": "l6-practice-minimal"
        },
        {
          "id": "l6-q11",
          "prompt": "What should be done to u in the unreachable-state practice figure?",
          "choices": [
            "Merge u with p as equivalent.",
            "Remove u as unreachable; do not call it a merge.",
            "Keep it because it is accepting.",
            "Change p to accepting."
          ],
          "answer": 1,
          "explanation": "No path from the start p reaches u. It is removed by reachability analysis, independently of merging equivalent states.",
          "segmentId": "l6-s12",
          "diagram": "l6-practice-unreachable"
        },
        {
          "id": "l6-q12-id",
          "kind": "identification",
          "prompt": "reducing the number of states from given FA.",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "DFA minimization",
          "acceptedAnswers": [
            "DFA minimization",
            "minimization",
            "minimization of DFA",
            "finite automaton minimization"
          ],
          "explanation": "This source wording identifies dfa minimization. Use the source frame to review it in context.",
          "segmentId": "l6-s01",
          "sourceFrame": "frames/lesson-6/frame-0095.jpg",
          "sourceSeconds": 95
        },
        {
          "id": "l6-q13-id",
          "kind": "identification",
          "prompt": "δ(A,X) → F and δ(B,X) → F OR δ(A,X) ↛ F and δ(B,X) ↛ F",
          "definitionLabel": "Preserved source notation",
          "answer": "Equivalent states",
          "acceptedAnswers": [
            "Equivalent states",
            "state equivalence",
            "equivalence",
            "equivalent"
          ],
          "explanation": "The source compares acceptance from the two states for an arbitrary continuation X. Equivalent states give the same accept/reject result for every continuation, including ε.",
          "segmentId": "l6-s02",
          "sourceFrame": "frames/lesson-6/frame-0260.jpg",
          "sourceSeconds": 260
        },
        {
          "id": "l6-q14-id",
          "kind": "identification",
          "prompt": "minimum number of states possible.",
          "definitionLabel": "Preserved source definition (excerpt)",
          "answer": "Minimal DFA",
          "acceptedAnswers": [
            "Minimal DFA",
            "minimal deterministic finite automaton",
            "minimum DFA"
          ],
          "explanation": "This source wording identifies minimal dfa. Use the source frame to review it in context.",
          "segmentId": "l6-s01",
          "sourceFrame": "frames/lesson-6/frame-0095.jpg",
          "sourceSeconds": 95
        },
        {
          "id": "l6-q15",
          "prompt": "Which action correctly builds the minimized DFA from final classes?",
          "choices": [
            "Make one state per class; mark the start and accepting classes and map transitions by class.",
            "Keep all original states and erase labels.",
            "Make every class accepting.",
            "Choose transitions from only one arbitrary member even if class members disagree."
          ],
          "answer": 0,
          "explanation": "Each equivalence class becomes one quotient state. Stable refinement ensures each member induces the same transition between classes.",
          "segmentId": "l6-s07"
        }
      ],
      "provenance": "The two source machines and transition tables were checked in readable full-video frames (8:30,10:10,11:50,15:00,20:00,24:00,28:00 and 31:40), with English automatic captions as secondary evidence. Original English explanations, Taglish paraphrases and practice questions are separate from verbatim speech. Additional exercises are labeled; their time links return to the related source procedure. Exact word-level alignment is not claimed."
    }
  ],
  "diagrams": {
    "l2-parity-square": {
      "src": "diagrams/l2-parity-square.svg",
      "title": "Four-state tuple example — source recreation",
      "description": "Four-state tuple example — source recreation. Start: A. Accepting: D. See the adjacent transition table for every edge.",
      "provenance": "Recreated from Topic 2 full-video frame at 06:20; no source image is republished.",
      "table": {
        "states": [
          "A",
          "B",
          "C",
          "D"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "A",
        "accept": [
          "D"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "C",
              "B"
            ]
          },
          {
            "state": "B",
            "targets": [
              "D",
              "A"
            ]
          },
          {
            "state": "C",
            "targets": [
              "A",
              "D"
            ]
          },
          {
            "state": "* D",
            "targets": [
              "B",
              "C"
            ]
          }
        ]
      }
    },
    "l2-five-state-dfa": {
      "src": "diagrams/l2-five-state-dfa.svg",
      "title": "Five-state DFA — source gallery recreation",
      "description": "Five-state DFA — source gallery recreation. Start: q0. Accepting: q2, q4. See the adjacent transition table for every edge.",
      "provenance": "Recreated from Topic 2 full-video frame at 33:43. All state/symbol pairs are explicit.",
      "table": {
        "states": [
          "q0",
          "q1",
          "q2",
          "q3",
          "q4"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "q0",
        "accept": [
          "q2",
          "q4"
        ],
        "rows": [
          {
            "state": "→ q0",
            "targets": [
              "q3",
              "q1"
            ]
          },
          {
            "state": "q1",
            "targets": [
              "q1",
              "q2"
            ]
          },
          {
            "state": "* q2",
            "targets": [
              "q2",
              "q2"
            ]
          },
          {
            "state": "q3",
            "targets": [
              "q4",
              "q3"
            ]
          },
          {
            "state": "* q4",
            "targets": [
              "q4",
              "q4"
            ]
          }
        ]
      }
    },
    "l2-loop-nfa": {
      "src": "diagrams/l2-loop-nfa.svg",
      "title": "Loop and branching NFA — source gallery recreation",
      "description": "Loop and branching NFA — source gallery recreation. Start: q0. Accepting: q3. See the adjacent transition table for every edge.",
      "provenance": "Recreated from Topic 2 full-video frame at 34:14. Missing NFA transition entries mean the empty set.",
      "table": {
        "states": [
          "q0",
          "q1",
          "q2",
          "q3"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "q0",
        "accept": [
          "q3"
        ],
        "rows": [
          {
            "state": "→ q0",
            "targets": [
              "{q0, q1}",
              "{q0, q2}"
            ]
          },
          {
            "state": "q1",
            "targets": [
              "q3",
              "∅"
            ]
          },
          {
            "state": "q2",
            "targets": [
              "∅",
              "q3"
            ]
          },
          {
            "state": "* q3",
            "targets": [
              "∅",
              "∅"
            ]
          }
        ]
      }
    },
    "l3-starts-one": {
      "src": "diagrams/l3-starts-one.svg",
      "title": "Starts with 1 — source example with explicit sink completion",
      "description": "Starts with 1 — source example with explicit sink completion. Start: q0. Accepting: q1. See the adjacent transition table for every edge.",
      "provenance": "Based on Topic 3 at 05:00. Editorial addition:0/1 self-loops at rejecting q2 complete the partial source drawing.",
      "table": {
        "states": [
          "q0",
          "q1",
          "q2"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "q0",
        "accept": [
          "q1"
        ],
        "rows": [
          {
            "state": "→ q0",
            "targets": [
              "q2",
              "q1"
            ]
          },
          {
            "state": "* q1",
            "targets": [
              "q1",
              "q1"
            ]
          },
          {
            "state": "q2",
            "targets": [
              "q2",
              "q2"
            ]
          }
        ]
      }
    },
    "l3-source-table": {
      "src": "diagrams/l3-source-table.svg",
      "title": "Contains a 1 — source graph/table recreation",
      "description": "Contains a 1 — source graph/table recreation. Start: q0. Accepting: q2. See the adjacent transition table for every edge.",
      "provenance": "Recreated from Topic 3 full-video frame at 10:20, cross-checked against all six table cells.",
      "table": {
        "states": [
          "q0",
          "q1",
          "q2"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "q0",
        "accept": [
          "q2"
        ],
        "rows": [
          {
            "state": "→ q0",
            "targets": [
              "q1",
              "q2"
            ]
          },
          {
            "state": "q1",
            "targets": [
              "q0",
              "q2"
            ]
          },
          {
            "state": "* q2",
            "targets": [
              "q2",
              "q2"
            ]
          }
        ]
      }
    },
    "l4-practice-enfa": {
      "src": "diagrams/l4-practice-enfa.svg",
      "title": "New practice ε-NFA (not the video example)",
      "description": "New practice ε-NFA (not the video example). Start: p0. Accepting: p2. See the adjacent transition table for every edge.",
      "provenance": "Original practice variation for instruction; not reconstructed from video. Every edge was specified in lesson text.",
      "table": {
        "states": [
          "p0",
          "p1",
          "p2"
        ],
        "alphabet": [
          "a",
          "b",
          "ε"
        ],
        "start": "p0",
        "accept": [
          "p2"
        ],
        "rows": [
          {
            "state": "→ p0",
            "targets": [
              "∅",
              "∅",
              "{p1}"
            ]
          },
          {
            "state": "p1",
            "targets": [
              "p1",
              "p2",
              "∅"
            ]
          },
          {
            "state": "* p2",
            "targets": [
              "∅",
              "∅",
              "∅"
            ]
          }
        ]
      }
    },
    "l4-practice-nfa": {
      "src": "diagrams/l4-practice-nfa.svg",
      "title": "Converted practice NFA with ε eliminated",
      "description": "Converted practice NFA with ε eliminated. Start: p0. Accepting: p2. See the adjacent transition table for every edge.",
      "provenance": "Derived from l4-practice-enfa by δ′(q,x)=E(⋃_{r∈E(q)}δ(r,x)); accept iff E(q) intersects {p2}. No ε edge is present.",
      "table": {
        "states": [
          "p0",
          "p1",
          "p2"
        ],
        "alphabet": [
          "a",
          "b"
        ],
        "start": "p0",
        "accept": [
          "p2"
        ],
        "rows": [
          {
            "state": "→ p0",
            "targets": [
              "p1",
              "p2"
            ]
          },
          {
            "state": "p1",
            "targets": [
              "p1",
              "p2"
            ]
          },
          {
            "state": "* p2",
            "targets": [
              "∅",
              "∅"
            ]
          }
        ]
      }
    },
    "l5-starts-zero-nfa": {
      "src": "diagrams/l5-starts-zero-nfa.svg",
      "title": "Source Example 1: starts with 0 — NFA",
      "description": "Source Example 1: starts with 0 — NFA. Start: A. Accepting: B. See the adjacent transition table for every edge.",
      "provenance": "Recreated from readable full-video samples of TeacherCat 4U’s NFA→DFA worked examples. Composite labels represent subsets; D or C is the named empty-set state where indicated.",
      "table": {
        "states": [
          "A",
          "B"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "A",
        "accept": [
          "B"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "B",
              "∅"
            ]
          },
          {
            "state": "* B",
            "targets": [
              "B",
              "B"
            ]
          }
        ]
      }
    },
    "l5-starts-zero-dfa": {
      "src": "diagrams/l5-starts-zero-dfa.svg",
      "title": "Source Example 1: completed DFA (C is ∅)",
      "description": "Source Example 1: completed DFA (C is ∅). Start: A. Accepting: B. See the adjacent transition table for every edge.",
      "provenance": "Recreated from readable full-video samples of TeacherCat 4U’s NFA→DFA worked examples. Composite labels represent subsets; D or C is the named empty-set state where indicated.",
      "table": {
        "states": [
          "A",
          "B",
          "C"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "A",
        "accept": [
          "B"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "B",
              "C"
            ]
          },
          {
            "state": "* B",
            "targets": [
              "B",
              "B"
            ]
          },
          {
            "state": "C",
            "targets": [
              "C",
              "C"
            ]
          }
        ]
      }
    },
    "l5-ends-one-nfa": {
      "src": "diagrams/l5-ends-one-nfa.svg",
      "title": "Source Example 2: ends with 1 — NFA",
      "description": "Source Example 2: ends with 1 — NFA. Start: A. Accepting: B. See the adjacent transition table for every edge.",
      "provenance": "Recreated from readable full-video samples of TeacherCat 4U’s NFA→DFA worked examples. Composite labels represent subsets; D or C is the named empty-set state where indicated.",
      "table": {
        "states": [
          "A",
          "B"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "A",
        "accept": [
          "B"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "A",
              "{A, B}"
            ]
          },
          {
            "state": "* B",
            "targets": [
              "∅",
              "∅"
            ]
          }
        ]
      }
    },
    "l5-ends-one-dfa": {
      "src": "diagrams/l5-ends-one-dfa.svg",
      "title": "Source Example 2: subset DFA (AB means {A,B})",
      "description": "Source Example 2: subset DFA (AB means {A,B}). Start: A. Accepting: AB. See the adjacent transition table for every edge.",
      "provenance": "Recreated from readable full-video samples of TeacherCat 4U’s NFA→DFA worked examples. Composite labels represent subsets; D or C is the named empty-set state where indicated.",
      "table": {
        "states": [
          "A",
          "AB"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "A",
        "accept": [
          "AB"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "A",
              "AB"
            ]
          },
          {
            "state": "* AB",
            "targets": [
              "A",
              "AB"
            ]
          }
        ]
      }
    },
    "l5-example-three-nfa": {
      "src": "diagrams/l5-example-three-nfa.svg",
      "title": "Source Example 3: three-state NFA",
      "description": "Source Example 3: three-state NFA. Start: A. Accepting: C. See the adjacent transition table for every edge.",
      "provenance": "Recreated from readable full-video samples of TeacherCat 4U’s NFA→DFA worked examples. Composite labels represent subsets; D or C is the named empty-set state where indicated.",
      "table": {
        "states": [
          "A",
          "B",
          "C"
        ],
        "alphabet": [
          "a",
          "b"
        ],
        "start": "A",
        "accept": [
          "C"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "{A, B}",
              "C"
            ]
          },
          {
            "state": "B",
            "targets": [
              "A",
              "B"
            ]
          },
          {
            "state": "* C",
            "targets": [
              "∅",
              "{A, B}"
            ]
          }
        ]
      }
    },
    "l5-example-three-dfa": {
      "src": "diagrams/l5-example-three-dfa.svg",
      "title": "Source Example 3: subset DFA (D is ∅)",
      "description": "Source Example 3: subset DFA (D is ∅). Start: A. Accepting: BC, C. See the adjacent transition table for every edge.",
      "provenance": "Recreated from readable full-video samples of TeacherCat 4U’s NFA→DFA worked examples. Composite labels represent subsets; D or C is the named empty-set state where indicated.",
      "table": {
        "states": [
          "A",
          "AB",
          "BC",
          "C",
          "D"
        ],
        "alphabet": [
          "a",
          "b"
        ],
        "start": "A",
        "accept": [
          "BC",
          "C"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "AB",
              "C"
            ]
          },
          {
            "state": "AB",
            "targets": [
              "AB",
              "BC"
            ]
          },
          {
            "state": "* BC",
            "targets": [
              "A",
              "AB"
            ]
          },
          {
            "state": "* C",
            "targets": [
              "D",
              "AB"
            ]
          },
          {
            "state": "D",
            "targets": [
              "D",
              "D"
            ]
          }
        ]
      }
    },
    "l4-source-enfa": {
      "src": "diagrams/l4-source-enfa.svg",
      "title": "Source ε-NFA: A →ε B →ε C",
      "description": "Source ε-NFA: A →ε B →ε C. Start: A. Accepting: C. See the adjacent transition table for every edge.",
      "provenance": "Recreated from the full-video source example at 21:10: A has 0-loop, B has 1-loop, C has 0/1-loop, and ε connects A→B→C.",
      "table": {
        "states": [
          "A",
          "B",
          "C"
        ],
        "alphabet": [
          "0",
          "1",
          "ε"
        ],
        "start": "A",
        "accept": [
          "C"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "A",
              "∅",
              "{B}"
            ]
          },
          {
            "state": "B",
            "targets": [
              "∅",
              "B",
              "{C}"
            ]
          },
          {
            "state": "* C",
            "targets": [
              "C",
              "C",
              "∅"
            ]
          }
        ]
      }
    },
    "l4-source-nfa": {
      "src": "diagrams/l4-source-nfa.svg",
      "title": "Source converted NFA: all three states accepting",
      "description": "Source converted NFA: all three states accepting. Start: A. Accepting: A, B, C. See the adjacent transition table for every edge.",
      "provenance": "Recreated from the completed source table at 37:30. The source graph’s duplicated1,1 loop text at C is corrected to0,1, as the narrator clarifies around 37:00 and the table confirms.",
      "table": {
        "states": [
          "A",
          "B",
          "C"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "A",
        "accept": [
          "A",
          "B",
          "C"
        ],
        "rows": [
          {
            "state": "→ * A",
            "targets": [
              "{A, B, C}",
              "{B, C}"
            ]
          },
          {
            "state": "* B",
            "targets": [
              "C",
              "{B, C}"
            ]
          },
          {
            "state": "* C",
            "targets": [
              "C",
              "C"
            ]
          }
        ]
      }
    },
    "l6-practice-reducible": {
      "src": "diagrams/l6-practice-reducible.svg",
      "title": "Original practice: reducible",
      "description": "Original practice: reducible. Start: p. Accepting: f. See the adjacent transition table for every edge.",
      "provenance": "Original practice variation, not a video example. Both p and r are reachable, nonfinal and equivalent; either 0 toggles between them, and 1 reaches accepting sink f.",
      "table": {
        "states": [
          "p",
          "r",
          "f"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "p",
        "accept": [
          "f"
        ],
        "rows": [
          {
            "state": "→ p",
            "targets": [
              "r",
              "f"
            ]
          },
          {
            "state": "r",
            "targets": [
              "p",
              "f"
            ]
          },
          {
            "state": "* f",
            "targets": [
              "f",
              "f"
            ]
          }
        ]
      }
    },
    "l6-practice-minimal": {
      "src": "diagrams/l6-practice-minimal.svg",
      "title": "Original practice: minimal",
      "description": "Original practice: minimal. Start: e. Accepting: e. See the adjacent transition table for every edge.",
      "provenance": "Constructed practice variation; not copied from the source video. Complete reachable two-state parity DFA; ε distinguishes the states.",
      "table": {
        "states": [
          "e",
          "o"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "e",
        "accept": [
          "e"
        ],
        "rows": [
          {
            "state": "→ * e",
            "targets": [
              "o",
              "e"
            ]
          },
          {
            "state": "o",
            "targets": [
              "e",
              "o"
            ]
          }
        ]
      }
    },
    "l6-practice-unreachable": {
      "src": "diagrams/l6-practice-unreachable.svg",
      "title": "Original practice: unreachable",
      "description": "Original practice: unreachable. Start: p. Accepting: u. See the adjacent transition table for every edge.",
      "provenance": "Constructed practice variation; not copied from the source video. u is unreachable; removing it is not merging equivalent reachable states.",
      "table": {
        "states": [
          "p",
          "u"
        ],
        "alphabet": [
          "0"
        ],
        "start": "p",
        "accept": [
          "u"
        ],
        "rows": [
          {
            "state": "→ p",
            "targets": [
              "p"
            ]
          },
          {
            "state": "* u",
            "targets": [
              "u"
            ]
          }
        ]
      }
    },
    "l6-source-example-1": {
      "src": "diagrams/l6-source-example-1.svg",
      "title": "Source minimization example 1",
      "description": "Source minimization example 1. Start: A. Accepting: E. See the adjacent transition table for every edge.",
      "provenance": "Transcribed from readable source-video diagram/table near 08:30 and corroborated by the before/after slide near 23:40.",
      "table": {
        "states": [
          "A",
          "B",
          "C",
          "D",
          "E"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "A",
        "accept": [
          "E"
        ],
        "rows": [
          {
            "state": "→ A",
            "targets": [
              "B",
              "C"
            ]
          },
          {
            "state": "B",
            "targets": [
              "B",
              "D"
            ]
          },
          {
            "state": "C",
            "targets": [
              "B",
              "C"
            ]
          },
          {
            "state": "D",
            "targets": [
              "B",
              "E"
            ]
          },
          {
            "state": "* E",
            "targets": [
              "B",
              "C"
            ]
          }
        ]
      }
    },
    "l6-source-example-2": {
      "src": "diagrams/l6-source-example-2.svg",
      "title": "Source minimization example 2",
      "description": "Source minimization example 2. Start: q0. Accepting: q2. See the adjacent transition table for every edge.",
      "provenance": "Transcribed from readable source-video transition table around 23:40 and corroborated by refinement frames through about 35:00.",
      "table": {
        "states": [
          "q0",
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7"
        ],
        "alphabet": [
          "0",
          "1"
        ],
        "start": "q0",
        "accept": [
          "q2"
        ],
        "rows": [
          {
            "state": "→ q0",
            "targets": [
              "q1",
              "q5"
            ]
          },
          {
            "state": "q1",
            "targets": [
              "q6",
              "q2"
            ]
          },
          {
            "state": "* q2",
            "targets": [
              "q0",
              "q2"
            ]
          },
          {
            "state": "q3",
            "targets": [
              "q2",
              "q6"
            ]
          },
          {
            "state": "q4",
            "targets": [
              "q1",
              "q5"
            ]
          },
          {
            "state": "q5",
            "targets": [
              "q2",
              "q6"
            ]
          },
          {
            "state": "q6",
            "targets": [
              "q6",
              "q4"
            ]
          },
          {
            "state": "q7",
            "targets": [
              "q6",
              "q2"
            ]
          }
        ]
      }
    }
  }
};
