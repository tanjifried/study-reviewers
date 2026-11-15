from pathlib import Path
import json, random
ROOT=Path(__file__).resolve().parent.parent
lessons=[]
def lesson(file,title,subtitle,rows):
    concepts=[]
    for row in rows.strip().split('\n'):
        term,definition,slide,falsehood=row.split('|')
        concepts.append(dict(term=term,definition=definition,slide=int(slide),falsehood=falsehood))
    lessons.append(dict(id='lesson-'+str(len(lessons)+1),file=file,title=title,subtitle=subtitle,concepts=concepts))
lesson('1 Introduction to Program Implementation.pptx','Program Implementation','From design to working software', '''
Program implementation|The critical SDLC phase where theoretical designs and algorithms are transformed into functional, executable code.|3|Program implementation ends with a theoretical design and does not produce executable code.
Coding|The step where detailed software designs, flowcharts, and pseudocode are translated into a specific programming language.|5|Coding translates software designs, flowcharts, and pseudocode into documentation rather than a programming language.
Syntax|The structural rules of a programming language, dictating how statements must be written to be valid.|6|Syntax defines what a program does when executed, rather than how statements must be written to be valid.
Semantics|The meaning and logical execution of code, determining what a program does when executed.|6|Syntactically valid code is guaranteed to have the intended semantics.
Modular programming|Structuring code into independent units like functions, classes, or modules to enhance maintainability and scalability.|7|Modular programming requires all responsibilities to be placed in one indivisible function.
Version control systems|Systems like Git and SVN that manage source-code changes, enable collaboration and rollbacks, and facilitate conflict resolution.|8|Version control stores only the newest code and discards project history.
Debugging|The systematic process of locating and resolving bugs or defects in software.|9|Debugging is the process of introducing defects into software rather than locating and resolving them.
Software testing|The systematic process of executing a program to find errors and verify it meets specified requirements.|10|Software testing only checks whether source code has attractive formatting.
Unit testing|Verifying individual software components or functions in isolation.|11|Unit testing requires the entire application and all external services to be tested together.
Integration testing|Validating interfaces and interactions between software units when combined.|11|Integration testing ignores how modules communicate with one another.
System testing|Evaluating the entire integrated software system against specified requirements.|12|System testing examines only one isolated helper function.
Acceptance testing / UAT|End-users or clients validating the system against business needs and determining readiness for deployment.|12|Acceptance testing is exclusively a compiler's check of syntax.
Test-driven development|Tests written before code, using the Red-Green-Refactor cycle.|13|In test-driven development, tests are written only after the whole product has shipped.
Program documentation|Written materials or illustrations that detail how software functions or how to use it.|14|Program documentation is intended to help only the original author.
Internal documentation|Documentation serving developers and maintainers, including code comments, API documentation, and design specifications.|15|Internal documentation primarily consists of installation guides written for end-users.
External documentation|Documentation targeting end-users and stakeholders, including user manuals, installation guides, and FAQs.|15|External documentation targets developers and maintainers instead of end-users and stakeholders.
Documentation benefits|Enhanced code maintainability and scalability, streamlined developer onboarding, and reduced support and maintenance costs.|16|Comprehensive documentation makes developer onboarding harder by removing useful knowledge.
Iterative implementation|Coding, testing, and documentation are phases that constantly inform each other.|4|Coding, testing, and documentation never influence one another during implementation.
''')
lesson('2 System Architecture Design and Evaluation.pptx','System Architecture','Structure, quality attributes, and evaluation','''
System architecture|The foundational organization of a system, defining its components, their interrelationships, and the guiding principles for its design and evolution.|3|System architecture describes only visual colors and has no effect on system behavior.
Components|Functional units, such as a database, microservice, or UI.|4|Components are communication pathways between functional units.
Connectors|Communication pathways, such as API calls or message queues.|4|Connectors are functional units such as databases and user interfaces.
Configurations|The arrangement of components and connectors.|4|Configurations are the individual components without their arrangement or connectors.
Monolithic architecture|A style integrating all system components into a single, unified codebase and deployment unit.|5|A monolithic application always deploys each of its components independently.
Microservices architecture|An architecture decomposing applications into small, independent, loosely coupled services that support independent development, deployment, and scaling.|6|Microservices eliminate the complexity of distributed monitoring and data consistency.
Layered architecture|A style organizing systems into distinct horizontal layers like Presentation, Business Logic, and Data Access.|7|Layered architecture mixes presentation, business logic, and data access into one undifferentiated responsibility.
Architectural style|A fundamental, high-level structural organization defining a system's vocabulary and constraints.|8|An architectural style is a specific source-code formatting rule rather than a high-level structural organization.
Architectural pattern|A reusable solution to a recurring design problem within a specific architectural style.|8|Architectural patterns cannot be reused across recurring design problems.
Response time|Time for system reaction, such as a website load.|9|Response time measures the number of transactions processed per second.
Throughput|Data processed per unit time, such as transactions per second.|9|Throughput is the delay in transferring one piece of data, independent of processing volume.
Latency|Delay in data transfer, such as network lag.|9|Latency is the data processed per unit time rather than the delay in data transfer.
Authentication|Verifying user identity reliably.|10|Authentication determines which resources an already identified user is permitted to access.
Authorization|Granting appropriate access rights.|10|Authorization is simply proving identity and never concerns permissions.
Data integrity|Preventing unauthorized modification of data.|10|Data integrity means allowing unauthorized changes as long as data stays private.
Confidentiality|Protecting sensitive information, for example through encryption.|10|Confidentiality means publishing sensitive information for unrestricted access.
Scalability|A system's capacity to effectively manage an expanding workload or increased demand.|11|Scalability measures the ease of modifying, updating, or repairing a system.
Horizontal scaling|Adding more servers to manage an expanding workload.|11|Horizontal scaling means upgrading the processor in the same single server.
Vertical scaling|Upgrading existing hardware to manage an expanding workload.|11|Vertical scaling means adding more separate servers rather than upgrading an existing one.
Maintainability|The ease with which a system can be modified, updated, or repaired.|11|Maintainability measures the capacity to manage an expanding workload rather than the ease of modifying a system.
Reliability|The probability a system performs its intended function without failure over a specified period.|12|Reliability is unrelated to whether the system fails during operation.
Availability|The proportion of time a system is operational and accessible to users.|12|A system with frequent failures can never have high availability, even if recovery is very fast.
Architectural trade-off|Optimizing one quality attribute while compromising another, such as security through encryption affecting performance.|13|Every architectural improvement necessarily improves all quality attributes equally.
Microservices operational complexity|Complexity in distributed transactions and monitoring, including challenges in service discovery and data consistency.|14|Independent services remove all need for distributed monitoring and service discovery.
ATAM|The Architecture Trade-off Analysis Method: a structured, scenario-based evaluation of quality attribute goals, risks, and trade-offs involving stakeholders.|15|ATAM evaluates architecture without engaging stakeholders or assessing quality attribute goals.
Architectural Decision Record / ADR|A historical record of a significant architectural decision, capturing context, options, and rationale.|16|An ADR records a decision without its context or rationale.
Architectural evolution|Continual evolution due to changing requirements, technological advancements, and business strategic shifts.|17|Once chosen, architecture should never be re-evaluated when requirements change.
''')
lesson('3 Coding Standards and Best Practices.pptx','Coding Standards','Readable, maintainable code','''
Readable code|Code with clear indentation, descriptive variable names, concise comments, and logical flow that facilitates understanding and maintenance.|3|Readable code relies on inconsistent indentation and ambiguous names.
Coding standards|Agreed-upon rules for code formatting and structure, including indentation, line length, and comment style.|5|Coding standards are unrelated rules with inconsistent indentation and comment styles.
PascalCase|A naming convention used for classes, exemplified by MyClass.|6|MyClass is the lesson's example of snake_case.
camelCase|A naming convention used for variables or functions, exemplified by myVariable.|6|myVariable is written in PascalCase because its first letter is uppercase.
snake_case|A naming convention used for variables or functions, exemplified by my_variable.|6|snake_case joins words without underscores and capitalizes every word.
DRY|Encapsulate repetitive logic within a single, reusable function or abstract common behaviors to avoid repetition.|8|DRY recommends copying the same logic into every module to simplify future updates.
KISS|The simplest viable solution, minimizing unnecessary complexity and over-engineering.|9|KISS recommends adding unnecessary classes and methods to a simple calculation.
YAGNI|You Ain't Gonna Need It: avoid adding functionality until it is absolutely necessary, deferring speculative future features.|10|YAGNI recommends building all imagined future features immediately.
Premature optimization|Optimizing code for performance before identifying actual bottlenecks, often introducing complexity without significant benefit.|10|Premature optimization begins only after measured bottlenecks have been confirmed.
Why-focused comments|Comments explaining why code exists and documenting design decisions, assumptions, and trade-offs.|11|Useful comments should only restate exactly what each obvious statement already says.
Self-documenting code|Code with clear naming that avoids redundant comments and communicates intent.|11|Self-documenting code depends on vague names such as doStuff to explain intent.
PEP 8|A Python guide prioritizing readability and maintainability, with four-space indentation and a 79-character line length.|12|The slides describe PEP 8 as a JavaScript guide requiring semicolons.
StandardJS|A JavaScript style convention enforcing no semicolons and consistent spacing.|12|StandardJS is a JavaScript convention that requires semicolons in every statement.
Google Java Style Guide|A Java guide covering bracing styles and ordering of members.|12|Google's Java Style Guide is presented as a Python indentation standard.
Descriptive naming|Meaningful variable names and function names that clearly state their action and object.|13|Names such as doStuff always communicate more intent than calculate_average_score.
Long method smell|A method whose length indicates multiple responsibilities, suggesting extraction of smaller, focused functions.|14|A long method with many responsibilities should always be expanded further instead of decomposed.
Duplicate code smell|Identical code blocks appearing in various places, suggesting consolidation into reusable functions or classes.|14|Duplicate code follows DRY because the same logic is maintained in several places.
Large class smell|A class with excessive responsibilities that can be decomposed into smaller, cohesive classes.|14|A large class with many unrelated responsibilities necessarily has a single clear purpose.
Technical debt|Accumulated problems from bad code that hinder future development and increase maintenance burden and costs.|15|Bad code has no effect on future maintenance costs or delivery schedules.
''')
lesson('4 Principles of Teamwork in Software Engineering.pptx','Teamwork: Project Success','Shared goals, communication, and delivery','''
Multidisciplinary collaboration|Integrating diverse skill sets, from UX design to cybersecurity, to solve complex problems comprehensively.|4|Modern software projects benefit only from coding skills and never from other disciplines.
Shared vision|A shared understanding of the project's core purpose, objectives, and desired outcomes, aligning efforts and preventing scope creep and rework.|5|A shared vision encourages every member to pursue unrelated project goals.
Scrum and Kanban|Agile frameworks providing structured, iterative approaches that emphasize collaboration, adaptation, and rapid feedback loops.|6|Scrum and Kanban eliminate the need to respond to changing requirements.
Clear role definition|Clear roles that prevent effort duplication and coverage gaps.|7|Leaving roles unclear reliably prevents duplicated effort and missed work.
Product Owner responsibilities|Defines vision and prioritizes the backlog.|7|The Product Owner's primary role is administering build servers instead of defining product priorities.
Scrum Master responsibilities|Facilitates the process and removes impediments.|7|The Scrum Master's primary responsibility is choosing all business priorities instead of facilitating the process.
Developer responsibilities|Build, test, and deliver a software increment.|7|Developers are responsible only for discussing ideas and never for testing or delivery.
Risk assessment and mitigation|Identifying potential technical, operational, or business challenges and devising mitigation plans to minimize adverse impacts.|8|Risk mitigation begins by ignoring potential problems until they cause project failure.
Transparent communication|Channels fostering shared understanding, rapid problem identification and resolution, and informed decision-making.|9|Transparent communication works by withholding progress and problems from teammates.
Daily stand-up|A brief, focused synchronous meeting to discuss recent progress, identify impediments, and align on immediate plans.|10|A daily stand-up is primarily an extended meeting for unrelated topics with no synchronization goal.
Asynchronous communication|Detailed discussions without real-time constraints, including wikis, pull requests, email, and issue trackers.|11|Asynchronous communication requires every participant to respond at exactly the same time.
Active listening|Fully concentrating, comprehending, responding, and remembering to minimize misinterpretations and build trust.|12|Active listening means preparing a rebuttal while ignoring the speaker's perspective.
Constructive feedback|Specific, actionable insights focusing on behaviors rather than personal traits.|12|Constructive feedback should target a person's character rather than a changeable behavior.
Conflict resolution|Addressing issues early, focusing on problems, listening to perspectives, and seeking common ground.|13|Effective conflict resolution delays issues and encourages personal attacks.
Version control collaboration|Concurrent development and collaboration, tracking changes and history, and facilitating code merging and integration.|14|Version control prevents teammates from developing concurrently.
Task management tools|Tools such as Jira, Trello, and Asana to assign, track, and monitor tasks and visualize team progress.|15|Jira, Trello, and Asana are described as tools for hiding tasks and team progress.
CI/CD pipelines|Pipelines that automate build, test, and deployment stages to streamline workflows and minimize integration challenges.|16|CI/CD means avoiding automated tests and performing no integration until a project's end.
CI/CD tool examples|Jenkins, GitLab CI, and GitHub Actions, examples of tools for continuous integration and deployment.|16|Jenkins, GitLab CI, and GitHub Actions are described as tools for avoiding automated delivery pipelines.
''')
lesson('5 Agile Teams An Overview.pptx','Agile Teams: Overview','Roles, ownership, and incremental value','''
Iterative development|Repeated development that helps teams adapt rapidly to change and deliver value incrementally.|3|Iterative development requires ignoring all feedback until a single final delivery.
Self-organizing team|A team whose members manage their own tasks and workflow and decide how to best achieve Sprint Goals.|14|A self-organizing team cannot decide how to organize its own tasks.
Cross-functional team|A team collectively possessing the diverse skills required to independently transform Product Backlog items into a valuable, shippable Increment.|15|Cross-functional means every member must have exactly the same single specialty.
Product Owner accountability|Singular accountability for maximizing the value of the product through effective Product Backlog management and clear product goals.|5|Product value is maximized by a Product Owner who avoids backlog management.
Product Backlog Items / PBIs|Clearly articulated items that the Product Owner prioritizes for maximum value delivery and makes transparent and accessible.|6|PBIs should remain hidden from stakeholders to preserve backlog transparency.
Stakeholder engagement|The Product Owner linking stakeholders and the Development Team, translating complex needs into clear product goals.|7|The Product Owner should avoid stakeholder input when translating business needs.
Iterative backlog refinement|Continuously refining the Product Backlog and integrating feedback to adapt to market shifts and evolving stakeholder requirements.|8|The backlog must never change after its initial creation, even when stakeholder needs evolve.
Scrum Master servant-leadership|Facilitating Scrum, removing impediments, shielding the team from distractions, and coaching Agile principles.|9|Servant-leadership requires the Scrum Master to prevent team self-organization.
Scrum event facilitation|Ensuring Scrum events occur as scheduled and guiding productive, positive, timeboxed discussions.|10|Scrum event facilitation means encouraging unbounded meetings without a purpose.
Impediment removal|Identifying and eliminating technical hurdles and organizational conflicts that hinder the Development Team’s progress.|11|An impediment is useful only if the Scrum Master leaves it unresolved.
Agile coaching|Coaching the Development Team, Product Owner, and organization in Agile values like self-organization and continuous improvement.|12|Agile coaching is restricted to teaching syntax and excludes organizational practices.
Development Team delivery|Collective responsibility for delivering a potentially releasable Increment of Done product at the end of each Sprint.|13|The Development Team is accountable only for individual activity and never for the resulting increment.
Functional increments|Functional product increments delivered continuously through the team’s managed tasks and workflow.|14|A functional increment is only a plan and contains no working product.
Role synergy|The Product Owner guides vision and value, the Development Team executes with quality, and the Scrum Master facilitates flow.|16|Role synergy requires the Scrum Master to replace developers as the sole builder of every increment.
''')
lesson('6. Software Testing Fundamentals.pptx','Software Testing','Terminology, approaches, and test design','''
Testing imperative|Testing ensures quality, reliability, and user satisfaction while preventing potentially catastrophic failures.|3|Testing has no relevance to user satisfaction, financial risk, or reliability.
Error|A human mistake, like misunderstanding requirements or making a typo.|4|An error is defined in the slides as the observed runtime result rather than a human mistake.
Defect / bug|A flaw in the code resulting from an error.|4|A defect is the human action itself and never a flaw in code.
Failure|The observable manifestation of a defect during execution.|4|A failure is any typo that has never affected execution, rather than observable incorrect behavior.
Test case|A unique ID, clear description, setup conditions, step-by-step actions, predicted outcomes, actual results, and pass/fail.|5|A complete test case needs no expected result against which actual behavior can be compared.
Test plan|A comprehensive document detailing the testing strategy, including scope, objectives, resources, schedule, and entry/exit criteria.|6|A test plan is merely a single test input and has no scope or schedule.
Test suite|A logical collection of related test cases designed for specific testing objectives.|6|A test suite is a collection of unrelated source-code fonts rather than test cases.
Quality assurance / QA|A proactive process focused on preventing defects throughout the SDLC by establishing processes and standards.|7|QA is described as exclusively reactive inspection of a completed product.
Quality control / QC|A reactive process focused on identifying defects in the completed product and verifying outputs meet requirements.|7|QC is described as excluding product testing and defect detection.
White-box testing|Testing with full knowledge of internal structure and code, focusing on code coverage, paths, and loops.|8|White-box testing requires the tester to have no knowledge of internal logic.
Code coverage|Measuring executed lines of code as part of white-box testing.|8|Code coverage measures how many users prefer the visual design, rather than executed code.
Black-box testing|Assessing functionality from an external perspective without access to internal code, focusing on inputs, outputs, and system behavior.|9|Black-box testing requires complete access to every internal code path.
Gray-box testing|A hybrid approach using partial knowledge of internal structures, such as database schemas or architecture.|10|Gray-box testing requires either zero internal knowledge or complete source knowledge, with no middle ground.
Unit testing|Verifying individual software components or functions in isolation.|11|Unit testing starts by evaluating the complete integrated application as one unit.
Integration testing|Validating interfaces and interactions between software units when combined.|12|Integration testing deliberately avoids checking module interfaces.
System testing|Evaluating the entire integrated software system against specified requirements.|13|System testing is limited to the implementation details of one isolated function.
Acceptance testing / UAT|End-users or clients validating the system against business needs and determining readiness for deployment.|14|Acceptance testing replaces end-user needs with formatting preferences alone.
Non-functional testing|Evaluating software's operational characteristics, including performance, security, usability, reliability, and maintainability.|15|Non-functional testing is concerned only with whether one specific business function returns the right value.
Performance testing|Evaluating operational characteristics such as speed and scalability.|15|Performance testing evaluates neither speed nor scalability.
Security testing|Evaluating vulnerabilities as a non-functional characteristic.|15|Security testing excludes evaluation of vulnerabilities.
Usability testing|Evaluating ease of use as a non-functional characteristic.|15|Usability testing is concerned only with processor speed rather than ease of use.
Test preconditions|Conditions required before a test, such as an existing user with a valid email.|16|Test preconditions describe only what happens after the test has finished.
Expected result|The predicted outcome, such as a successfully updated password and login with the new password.|16|The expected result is whatever behavior happens, even when it violates the requirement.
Modern tester role|Proactive quality advocacy, automation, and continuous improvement alongside defect detection in Agile and DevOps.|17|The lesson frames modern testers as having no role in automation or continuous improvement.
''')
lesson('1 Principles of Teamwork in Software Engineering.pptx','Teamwork: People & Planning','Respect, responsibility, and W5HH','''
Teamwork necessity|Teamwork addressing project complexity, rapid technological evolution, and diverse stakeholder requirements.|3|Modern project complexity makes collaboration unnecessary.
Respectful environment|Kindness and mutual respect that enhance collaboration, psychological safety, and team cohesion.|4|Mutual respect reduces psychological safety by making every voice less valued.
Responsibility over blame|Assigning responsibility for issues and focusing on system improvements and process refinement rather than personal fault.|5|Responsibility over blame means concentrating on personal fault rather than improving the system.
Team cohesion|Psychological safety and mutual trust that reduce conflicts and enhance collective problem-solving.|6|Cohesion depends on mistrust and discouraging shared problem-solving.
Effective communication|Clear information exchange and shared understanding that minimize misunderstandings, reduce rework, and accelerate decisions.|6|Effective communication increases rework by withholding shared understanding.
Individual competence|Technical proficiency in coding, algorithms, and system design that ensures quality contributions.|7|Individual competence means technical proficiency has no effect on team output.
Achievement-driven orientation|A proactive drive for results involving initiative, ownership, and a focus on delivering value.|7|Achievement-driven orientation means avoiding initiative and responsibility for outcomes.
W5HH: What|Define scope, features, and deliverables.|8|In W5HH, What establishes only the project's deadlines.
W5HH: Why|Articulate project goals and value.|8|In W5HH, Why specifies only the location where work happens.
W5HH: When|Establish timelines, milestones, and deadlines.|8|In W5HH, When specifies only which people are responsible.
W5HH: Who and Where|Planning questions concerning resource allocation and execution: the people involved and where work is organized.|8|Who and Where are the W5HH questions for defining only project value and deadlines.
W5HH: How and How Much|Planning questions concerning resource allocation and execution: the approach and resources or costs.|8|How and How Much exclude execution and resource planning.
Common team challenges|Unclear roles and responsibilities, ineffective conflict resolution, misaligned skills, and poor communication channels.|9|Unclear roles and poor communication are described as guarantees of effective teamwork.
Empathy and patience|Actively listening and refraining from attributing negative intent to build trust and mutual understanding.|10|Empathy requires assuming malicious intent before listening to a teammate.
Continuous learning and adaptation|Ongoing learning and adaptation to the speed, frequency, complexity, and diversity of changes in software development.|11|Effective teamwork requires refusing to learn when technologies and project needs change.
''')
lesson('2 Agile Teams Collaborative Innovation.pptx','Agile: Collaborative Innovation','What, how, and the process','''
Agile approach|A dynamic, iterative project management approach emphasizing rapid development cycles, continuous improvement, and strong team collaboration.|3|Agile is described as a strictly linear sequence with no iteration.
Waterfall contrast|Traditional linear, sequential phases contrasted with Agile’s iterative development cycles.|3|The slides describe Waterfall as the same iterative approach as Agile.
Product Owner|The role maximizing product value by managing the Product Backlog and representing stakeholder needs.|4|The Product Owner's principal responsibility is facilitating Scrum events instead of maximizing product value.
Product Backlog prioritization|Defining and prioritizing the product backlog to maximize product value and bridge stakeholder needs with development.|5|Product Backlog prioritization should ignore customer and business needs.
User stories and acceptance criteria|Clear user stories and acceptance criteria defined by the Product Owner.|6|The lesson says the Product Owner should avoid defining user stories and acceptance criteria.
Stakeholder alignment|Engaging stakeholders for alignment and ensuring market needs are met.|6|Stakeholder alignment means keeping market needs separate from product decisions.
Scrum Master|A servant-leader facilitating Scrum, removing impediments, and coaching the team and organization.|7|The Scrum Master is primarily responsible for choosing all product features and their business value.
Scrum rules and values|Rules and values whose observance the Scrum Master supports while facilitating Scrum events.|8|The Scrum Master's process role excludes helping the team uphold Scrum rules and values.
Self-organization|The Development Team organizing its own work and collaborating to build the solution.|9|A self-organizing team is prohibited from collaboratively planning its work.
Cross-functionality|The Development Team comprising professionals with diverse skills who collaborate to build the solution.|9|Cross-functionality means the team may possess only one narrow skill and cannot combine specialties.
Potentially releasable increment|The product increment the Development Team is responsible for delivering each Sprint.|9|The Development Team is responsible only for untested ideas rather than a product increment.
Collective technical ownership|The Development Team collectively owning technical excellence and delivery while designing, building, integrating, and testing increments.|10|Collective ownership means quality belongs to nobody and testing is unnecessary.
What / How / Process role mapping|The Product Owner defines vision and value, the Development Team builds the product, and the Scrum Master facilitates and coaches.|11|The slides map product value solely to developers and implementation solely to the Scrum Master.
''')
lesson('3 Synergy in Software Development Teams.pptx','Team Synergy','Knowledge sharing and collective outcomes','''
Team synergy|Diverse individual contributions coalescing into powerful collective outcomes through collaboration.|3|Synergy means keeping every contribution isolated so collective outcomes cannot emerge.
Collaborative efficiency and innovation|Rapid problem identification and resolution, diverse perspectives, and creative solutions.|4|The lesson says innovation improves by eliminating diverse perspectives.
Code reviews|Peer reviews enabling early defect identification and constructive feedback that enhances developer skills.|5|Code reviews are intended to delay defect discovery until after deployment.
Collective ownership|Shared knowledge and collective ownership fostering continuous improvement and robust software.|5|Collective ownership restricts knowledge of each component to exactly one person.
Expressing differences|Openly sharing varied perspectives and challenging assumptions to identify potential flaws and refine solutions.|6|Expressing differences means suppressing alternative viewpoints to avoid examining assumptions.
Co-creation|The collaborative development of solutions, with knowledge jointly constructed and shared instead of kept in individual silos.|6|Co-creation means each person works alone and never shares solution knowledge.
Mutual alignment|A common understanding of project goals, scope, and progress that minimizes misunderstandings and enhances collaborative efficiency.|7|Mutual alignment requires team members to disagree about project goals and progress.
Comprehensive documentation|Code comments, design specifications, API references, and user guides that preserve institutional knowledge and facilitate information transfer.|7|Documentation preserves knowledge by making it inaccessible to new team members.
Formal knowledge sharing|Structured, planned sessions such as presentations, workshops, lunch-and-learn events, and internal tech talks.|8|A scheduled technical workshop is classified as spontaneous informal sharing in the lesson.
Informal knowledge sharing|Spontaneous, ad-hoc interactions such as quick chats, pair programming, or questions in team communication channels.|8|Informal sharing always requires a formal scheduled presentation and agenda.
Trello|A tool using Kanban boards for visual task management and tracking progress and task assignments.|9|Trello uses Kanban boards to obscure task assignments and progress.
Asana|A project and task management tool with varied views, resource allocation, and workflow automation.|9|Asana is described as project management without resource allocation or workflow automation.
Jira|A tool designed for agile software development, issue tracking, workflow customization, and reporting.|9|Jira is designed for agile development but excludes issue tracking.
Open communication|Transparent dialogue that builds trust, clarifies expectations, and prevents misunderstandings.|10|Open communication requires concealing expectations and avoiding transparent dialogue.
Distributed team challenges|Communication latency across time zones, cultural nuances, difficulty maintaining cohesion, and knowledge silos.|11|Working across time zones guarantees that communication latency and knowledge silos disappear.
Distributed team strategies|Structured meeting agendas, virtual communication channels, asynchronous updates, team-building, and transparent documentation.|11|Distributed teams should solve communication delays by abandoning documentation and virtual channels.
''')
lesson('4 GitHub Collaborative Development.pptx','GitHub Collaboration','Version control, branches, and pull requests','''
GitHub|A collaborative software development platform integrating version control with a community for open-source and professional projects.|3|GitHub is described as a platform with no version-control or collaboration features.
Version control system|A system tracking and managing changes to files over time, ensuring revision history and enabling collaboration and recovery.|4|Version control systems track file changes without preserving a revision history.
Git|A distributed version control system that GitHub uses for the repositories it hosts.|4|Git and GitHub are both defined as the same hosted website rather than a VCS and hosting platform.
Revision history and rollback|Tracking code modifications and restoring a previous stable state.|5|Rollback requires permanently discarding all stable historical states.
Distributed repository copy|A full local copy that enables offline work and robust backups under Git’s distributed architecture.|6|Git's distributed model requires a network connection for every local commit.
Branching|Creating independent development lines from the main codebase to isolate work on features or bug fixes.|7|Creating a feature branch automatically replaces the main branch's files with unfinished work.
Create feature branch|Branch from main, for example feature/auth, to isolate development.|8|Create a feature branch by merging it into main rather than branching from main.
Develop and commit locally|Make changes and commit frequently to the new branch.|8|A local commit necessarily publishes the work to GitHub immediately.
Push to remote|Push the branch to GitHub, where its changes remain isolated.|8|Pushing a branch to GitHub merges its changes into main automatically.
Pull request|A formal proposal to merge changes from a feature branch into a main branch, initiating code review and discussion.|9|A pull request bypasses code review and instantly guarantees integration.
Base and compare branches|The branch selections made when defining pull request details, identifying the target and proposed changes.|10|The base branch is always the branch containing proposed changes rather than the target branch.
PR title and description|A clear title and detailed description of changes provided when creating a pull request.|10|A pull request should omit descriptions so reviewers must infer all intent from the title alone.
Constructive code review|Team members providing constructive feedback and suggesting improvements on proposed changes.|11|Code review should focus on personal attacks instead of improvements to the code.
Automated PR checks|CI/CD pipelines running tests on proposed changes before approval and integration.|11|The lesson's pull-request workflow excludes automated testing before merge.
Merge conflict resolution|Resolving merge conflicts before approval in the pull request workflow.|11|Merge conflicts can always be ignored without reconciling the incompatible edits.
Merging|Integrating the new code into the target branch after approval.|11|Merging means downloading a repository without integrating any branch changes.
''')

rng=random.Random(461)
for l in lessons:
    qs=[]
    for i,c in enumerate(l['concepts']):
        others=[x for x in l['concepts'] if x!=c]
        wrong=rng.sample(others,3)
        if i%2==0:
            prompt='Which term best matches this description? '+c['definition']
            options=[c['term']]+[x['term'] for x in wrong]
        else:
            prompt='Which statement best describes '+c['term']+'?'
            options=[c['definition']]+[x['definition'] for x in wrong]
        correct=options[0];rng.shuffle(options)
        base=dict(lesson=l['id'],concept=c['term'],explanation=c['term']+': '+c['definition'],slide=c['slide'])
        qs.append(dict(base,id=l['id']+'-c'+str(i)+'-mc',kind='mc',prompt=prompt,options=options,answer=options.index(correct)))
        truth=i%2==0
        qs.append(dict(base,id=l['id']+'-c'+str(i)+'-tf',kind='tf',prompt=c['term']+': '+c['definition'] if truth else c['falsehood'],options=['True','False'],answer=0 if truth else 1))
    l['questions']=qs
(ROOT/'build'/'question-bank.json').write_text(json.dumps(lessons,ensure_ascii=False,indent=2))
print([(l['title'],len(l['concepts']),len(l['questions'])) for l in lessons])
print('TOTAL',sum(len(l['questions']) for l in lessons))

(ROOT/'quiz.html').write_text((ROOT/'build/template.html').read_text().replace('__DATA__',json.dumps(lessons,ensure_ascii=False).replace('</','<\\/')))
