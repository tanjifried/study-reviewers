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
Program implementation|The SDLC phase that transforms theoretical designs and algorithms into functional, executable code.|3|Program implementation ends with a theoretical design and does not produce executable code.
Coding|Translating software designs, flowcharts, and pseudocode into instructions in a programming language.|5|Coding is the process of preparing user manuals instead of executable instructions.
Syntax|The structural rules or grammar that determine whether programming statements are valid.|6|Syntax determines a program's intended meaning rather than its structural validity.
Semantics|The meaning and logical execution of code, including what its operations do.|6|Syntactically valid code is guaranteed to have the intended semantics.
Modular programming|Organizing code into independent functions, classes, or modules to support reuse, maintainability, and scalability.|7|Modular programming requires all responsibilities to be placed in one indivisible function.
Version control systems|Tools such as Git and SVN that track source changes and support collaboration, rollback, and conflict resolution.|8|Version control stores only the newest code and discards project history.
Debugging|Systematically locating and resolving software defects, using execution traces, variable inspection, or debuggers.|9|Debugging means documenting a defect without investigating its root cause.
Software testing|Executing software systematically to find errors and verify that it meets specified requirements.|10|Software testing only checks whether source code has attractive formatting.
Unit testing|Verifying individual components or functions in isolation, such as a calculate_tax function.|11|Unit testing requires the entire application and all external services to be tested together.
Integration testing|Validating interfaces and interactions between combined modules, such as a login UI, authentication service, and database.|11|Integration testing ignores how modules communicate with one another.
System testing|Evaluating the whole integrated system against requirements through realistic scenarios.|12|System testing examines only one isolated helper function.
Acceptance testing / UAT|End-users or clients validating that software meets business needs and is acceptable for deployment.|12|Acceptance testing is exclusively a compiler's check of syntax.
Test-driven development|Writing tests before production code and following the Red-Green-Refactor cycle.|13|In test-driven development, tests are written only after the whole product has shipped.
Program documentation|Written material or illustrations explaining software operation or use for developers, users, and maintainers.|14|Program documentation is intended to help only the original author.
Internal documentation|Developer-facing material such as code comments, API documentation, and design specifications.|15|Internal documentation primarily consists of installation guides written for end-users.
External documentation|User-facing material such as user manuals, installation guides, and FAQs.|15|External documentation is restricted to private implementation notes for maintainers.
Documentation benefits|Better maintainability, easier onboarding, lower support costs, and improved user experience.|16|Comprehensive documentation makes developer onboarding harder by removing useful knowledge.
Iterative implementation|Coding, testing, and documentation repeatedly informing one another rather than operating as isolated tasks.|4|Coding, testing, and documentation never influence one another during implementation.
''')
lesson('2 System Architecture Design and Evaluation.pptx','System Architecture','Structure, quality attributes, and evaluation','''
System architecture|The foundational organization of components, their relationships, and principles guiding system design and evolution.|3|System architecture describes only visual colors and has no effect on system behavior.
Components|Functional architectural units such as a database, microservice, or user interface.|4|An API call is a functional component rather than a communication pathway in the slide's terminology.
Connectors|Communication pathways between components, such as API calls or message queues.|4|Connectors are the written business goals and never describe communication.
Configurations|The arrangement of architectural components and connectors.|4|Configurations describe only an individual developer's coding style.
Monolithic architecture|A single unified codebase and deployment unit, often simpler initially but harder to scale and maintain as complexity grows.|5|A monolithic application always deploys each of its components independently.
Microservices architecture|Small, independent, loosely coupled services that support separate development, deployment, and scaling.|6|Microservices eliminate the complexity of distributed monitoring and data consistency.
Layered architecture|A separation into horizontal layers such as presentation, business logic, and data access.|7|Layered architecture mixes presentation, business logic, and data access into one undifferentiated responsibility.
Architectural style|A high-level structural organization with a system vocabulary and constraints, such as client-server or peer-to-peer.|8|An architectural style is a specific source-code formatting convention.
Architectural pattern|A reusable solution to a recurring architectural design problem, such as MVC or Broker.|8|Architectural patterns cannot be reused across recurring design problems.
Response time|The time taken for a system to react, such as a website responding to a request.|9|Response time measures the number of transactions processed per second.
Throughput|The amount of data or number of transactions processed per unit of time.|9|Throughput is the delay in transferring one piece of data, independent of processing volume.
Latency|Delay in data transfer, such as network lag.|9|Latency is the number of services deployed in an application.
Authentication|Verifying a user's identity.|10|Authentication determines which resources an already identified user is permitted to access.
Authorization|Granting appropriate access rights to a user.|10|Authorization is simply proving identity and never concerns permissions.
Data integrity|Protection against unauthorized modification of data.|10|Data integrity means allowing unauthorized changes as long as data stays private.
Confidentiality|Protecting sensitive information from unauthorized disclosure, for example through encryption.|10|Confidentiality means publishing sensitive information for unrestricted access.
Scalability|The capacity to handle increasing workload or demand without unacceptable performance degradation.|11|Scalability describes only how easy it is to edit source code.
Horizontal scaling|Adding more servers or instances to handle increased demand.|11|Horizontal scaling means upgrading the processor in the same single server.
Vertical scaling|Upgrading the hardware resources of an existing server.|11|Vertical scaling means adding more separate servers rather than upgrading an existing one.
Maintainability|The ease of modifying, updating, or repairing a system, supported by modularity, clear code, and documentation.|11|Maintainability improves when code and design are made harder to understand.
Reliability|The probability that a system performs its intended function without failure over a specified period.|12|Reliability is unrelated to whether the system fails during operation.
Availability|The proportion of time a system is operational and accessible to users.|12|A system with frequent failures can never have high availability, even if recovery is very fast.
Architectural trade-off|A compromise where improving one quality attribute can reduce another, such as encryption overhead affecting performance.|13|Every architectural improvement necessarily improves all quality attributes equally.
Microservices operational complexity|Independent services introduce challenges including service discovery, distributed transactions, monitoring, and data consistency.|14|Independent services remove all need for distributed monitoring and service discovery.
ATAM|The Architecture Trade-off Analysis Method: a structured, scenario-based evaluation of quality goals, risks, and trade-offs with stakeholder participation.|15|ATAM is a code formatter that excludes stakeholders and quality attribute scenarios.
Architectural Decision Record / ADR|A historical record of an important architectural choice, capturing context, options, and rationale.|16|An ADR records a decision without its context or rationale.
Architectural evolution|Continual adaptation of architecture to changing requirements, technology, and business strategy.|17|Once chosen, architecture should never be re-evaluated when requirements change.
''')
lesson('3 Coding Standards and Best Practices.pptx','Coding Standards','Readable, maintainable code','''
Readable code|Code with consistent formatting, descriptive names, and clear flow that is easier to understand and maintain.|3|Readable code relies on inconsistent indentation and ambiguous names.
Coding standards|Agreed rules for code formatting and structure, including indentation, line length, and comment style.|5|Coding standards require every developer to use unrelated formatting conventions.
PascalCase|A naming form exemplified by MyClass, used for classes in the lesson.|6|MyClass is the lesson's example of snake_case.
camelCase|A naming form exemplified by myVariable, used for variables or functions in the lesson.|6|myVariable is written in PascalCase because its first letter is uppercase.
snake_case|A naming form using lowercase words separated by underscores, such as my_variable.|6|snake_case joins words without underscores and capitalizes every word.
DRY|Don't Repeat Yourself: minimize duplicated logic by consolidating shared behavior into reusable abstractions.|8|DRY recommends copying the same logic into every module to simplify future updates.
KISS|Favor the simplest viable solution and avoid unnecessary complexity or over-engineering.|9|KISS recommends adding unnecessary classes and methods to a simple calculation.
YAGNI|You Ain't Gonna Need It: implement functionality when required instead of building speculative features.|10|YAGNI recommends building all imagined future features immediately.
Premature optimization|Performance tuning before actual bottlenecks are identified, potentially adding complexity without useful benefit.|10|Premature optimization begins only after measured bottlenecks have been confirmed.
Why-focused comments|Comments explaining design decisions, assumptions, and trade-offs rather than merely repeating obvious code.|11|Useful comments should only restate exactly what each obvious statement already says.
Self-documenting code|Code whose meaningful names and clear structure communicate intent and reduce the need for redundant comments.|11|Self-documenting code depends on vague names such as doStuff to explain intent.
PEP 8|A Python style guide emphasizing readability, including four-space indentation and a 79-character code line limit in the slides.|12|The slides describe PEP 8 as a JavaScript guide requiring semicolons.
StandardJS|A JavaScript style convention described in the slides as using consistent spacing and no semicolons.|12|The slides describe StandardJS as a Java style guide for member ordering.
Google Java Style Guide|A Java style guide covering conventions such as bracing and member ordering.|12|Google's Java Style Guide is presented as a Python indentation standard.
Descriptive naming|Names such as customer_id or calculate_average_score that convey data meaning or a function's action.|13|Names such as doStuff always communicate more intent than calculate_average_score.
Long method smell|A method with excessive length or responsibilities that may benefit from extraction into smaller focused functions.|14|A long method with many responsibilities should always be expanded further instead of decomposed.
Duplicate code smell|Repeated logic in multiple places that can cause inconsistent changes and should be consolidated where appropriate.|14|Duplicate code follows DRY because the same logic is maintained in several places.
Large class smell|A class with excessive responsibilities that may need decomposition into smaller cohesive classes.|14|A large class with many unrelated responsibilities necessarily has a single clear purpose.
Technical debt|Accumulated code-quality problems that increase future maintenance effort, debugging time, and development costs.|15|Bad code has no effect on future maintenance costs or delivery schedules.
''')
lesson('4 Principles of Teamwork in Software Engineering.pptx','Teamwork: Project Success','Shared goals, communication, and delivery','''
Multidisciplinary collaboration|Combining skills such as UX design and cybersecurity to solve complex software problems comprehensively.|4|Modern software projects benefit only from coding skills and never from other disciplines.
Shared vision|A common understanding of project purpose and desired outcomes that aligns priorities and reduces scope creep and rework.|5|A shared vision encourages every member to pursue unrelated project goals.
Scrum and Kanban|Agile frameworks supporting iterative planning, collaboration, adaptation, and rapid feedback.|6|Scrum and Kanban eliminate the need to respond to changing requirements.
Clear role definition|Explicit responsibilities that prevent duplicated effort and gaps in work coverage.|7|Leaving roles unclear reliably prevents duplicated effort and missed work.
Product Owner responsibilities|Defining product vision and prioritizing the backlog.|7|The Product Owner's primary role is administering build servers instead of defining product priorities.
Scrum Master responsibilities|Facilitating the process and removing impediments.|7|The Scrum Master's primary responsibility is choosing all business priorities instead of facilitating the process.
Developer responsibilities|Building, testing, and delivering a software increment.|7|Developers are responsible only for discussing ideas and never for testing or delivery.
Risk assessment and mitigation|Proactively identifying technical, operational, or business challenges and planning ways to reduce their impact.|8|Risk mitigation begins by ignoring potential problems until they cause project failure.
Transparent communication|Open channels that support shared understanding, quick problem resolution, and informed decisions.|9|Transparent communication works by withholding progress and problems from teammates.
Daily stand-up|A brief synchronous meeting to share progress, surface impediments, and align immediate plans.|10|A daily stand-up is primarily an extended meeting for unrelated topics with no synchronization goal.
Asynchronous communication|Discussion and documentation without requiring simultaneous participation, using wikis, email, pull requests, or issue trackers.|11|Asynchronous communication requires every participant to respond at exactly the same time.
Active listening|Fully concentrating, understanding, responding, and remembering to reduce misinterpretations and build trust.|12|Active listening means preparing a rebuttal while ignoring the speaker's perspective.
Constructive feedback|Specific, actionable input about behavior or work that supports improvement rather than attacking personal traits.|12|Constructive feedback should target a person's character rather than a changeable behavior.
Conflict resolution|Addressing issues early, listening to perspectives, focusing on problems, and seeking common ground.|13|Effective conflict resolution delays issues and encourages personal attacks.
Version control collaboration|Tracking revision history and supporting concurrent work, merging, and integration.|14|Version control prevents teammates from developing concurrently.
Task management tools|Tools such as Jira, Trello, and Asana for assigning tasks, tracking progress, and supporting accountability.|15|Jira, Trello, and Asana are presented only as programming-language compilers.
CI/CD pipelines|Automation of build, test, and deployment stages to support rapid, reliable delivery and reduce integration difficulties.|16|CI/CD means avoiding automated tests and performing no integration until a project's end.
CI/CD tool examples|Jenkins, GitLab CI, and GitHub Actions are examples of delivery-pipeline tooling in the lesson.|16|The slides identify user manuals as the main tools for running CI/CD pipelines.
''')
lesson('5 Agile Teams An Overview.pptx','Agile Teams: Overview','Roles, ownership, and incremental value','''
Iterative development|Delivering and refining work in repeated cycles so teams can adapt quickly to feedback and change.|3|Iterative development requires ignoring all feedback until a single final delivery.
Self-organizing team|A team that manages its own work and decides how best to achieve Sprint Goals.|14|A self-organizing team cannot decide how to organize its own tasks.
Cross-functional team|A team collectively possessing the skills needed to turn backlog items into a shippable increment with fewer external dependencies.|15|Cross-functional means every member must have exactly the same single specialty.
Product Owner accountability|Singular accountability for maximizing delivered product value through effective backlog management and clear goals.|5|Product value is maximized by a Product Owner who avoids backlog management.
Product Backlog Items / PBIs|Clearly articulated work items that the Product Owner refines, prioritizes, and makes transparent.|6|PBIs should remain hidden from stakeholders to preserve backlog transparency.
Stakeholder engagement|The Product Owner linking customer and business needs to clear product goals for the Development Team.|7|The Product Owner should avoid stakeholder input when translating business needs.
Iterative backlog refinement|Continuously adjusting the backlog using feedback and changing market or stakeholder needs.|8|The backlog must never change after its initial creation, even when stakeholder needs evolve.
Scrum Master servant-leadership|Enabling the team through facilitation, coaching, impediment removal, and protection from distractions.|9|Servant-leadership requires the Scrum Master to prevent team self-organization.
Scrum event facilitation|Helping scheduled Scrum events remain productive, positive, timeboxed, and transparent.|10|Scrum event facilitation means encouraging unbounded meetings without a purpose.
Impediment removal|Addressing technical hurdles or organizational conflicts that obstruct the team's progress.|11|An impediment is useful only if the Scrum Master leaves it unresolved.
Agile coaching|Helping the team, Product Owner, and organization understand self-organization and continuous improvement.|12|Agile coaching is restricted to teaching syntax and excludes organizational practices.
Development Team delivery|Collective responsibility for a potentially releasable, Done product increment at each Sprint's end.|13|The Development Team is accountable only for individual activity and never for the resulting increment.
Functional increments|Working product additions delivered continuously through the team's managed tasks and workflow.|14|A functional increment is only a plan and contains no working product.
Role synergy|The Product Owner guides value, developers handle execution and quality, and the Scrum Master supports facilitation and flow.|16|Role synergy requires the Scrum Master to replace developers as the sole builder of every increment.
''')
lesson('6. Software Testing Fundamentals.pptx','Software Testing','Terminology, approaches, and test design','''
Testing imperative|Protecting software quality, reliability, and user satisfaction while reducing the risk of costly or dangerous failures.|3|Testing has no relevance to user satisfaction, financial risk, or reliability.
Error|A human mistake, such as misunderstanding requirements or typing an incorrect formula.|4|An error is defined in the slides as the observed runtime result rather than a human mistake.
Defect / bug|A flaw in software resulting from a human error.|4|A defect is the human action itself and never a flaw in code.
Failure|An observable incorrect behavior when a defect manifests during execution.|4|A failure is any typo that has never affected execution, rather than observable incorrect behavior.
Test case|An identified test with a description, setup, steps, expected result, actual result, and pass/fail outcome.|5|A complete test case needs no expected result against which actual behavior can be compared.
Test plan|A project-wide testing strategy defining scope, objectives, resources, schedule, and entry/exit criteria.|6|A test plan is merely a single test input and has no scope or schedule.
Test suite|A logical collection of related test cases organized for particular testing objectives.|6|A test suite is a collection of unrelated source-code fonts rather than test cases.
Quality assurance / QA|Proactive, process-focused defect prevention throughout the SDLC through standards and activities such as reviews.|7|QA is described as exclusively reactive inspection of a completed product.
Quality control / QC|Product-focused identification of defects and verification that outputs meet requirements, including system testing and UAT.|7|QC is described as excluding product testing and defect detection.
White-box testing|Testing with full knowledge of internal code and structure, focusing on paths, loops, and coverage.|8|White-box testing requires the tester to have no knowledge of internal logic.
Code coverage|A measure of which code has been executed by tests, used in the lesson's white-box testing discussion.|8|Code coverage measures how many users prefer the visual design, rather than executed code.
Black-box testing|Evaluating inputs, outputs, and behavior against requirements without access to internal code.|9|Black-box testing requires complete access to every internal code path.
Gray-box testing|A hybrid approach using partial internal knowledge, such as database schemas, to guide tests.|10|Gray-box testing requires either zero internal knowledge or complete source knowledge, with no middle ground.
Unit testing|Testing individual components in isolation, typically by developers using frameworks such as JUnit or NUnit.|11|Unit testing starts by evaluating the complete integrated application as one unit.
Integration testing|Verifying interfaces and interactions between combined units, such as authentication and database modules.|12|Integration testing deliberately avoids checking module interfaces.
System testing|Testing the entire integrated system against requirements in a production-like environment.|13|System testing is limited to the implementation details of one isolated function.
Acceptance testing / UAT|End-users validating fitness for business use and readiness for deployment.|14|Acceptance testing replaces end-user needs with formatting preferences alone.
Non-functional testing|Evaluating operational qualities such as performance, security, usability, reliability, and maintainability.|15|Non-functional testing is concerned only with whether one specific business function returns the right value.
Performance testing|Assessing operational characteristics such as speed and scalability.|15|Performance testing is defined as checking only variable naming conventions.
Security testing|Evaluating vulnerabilities as an operational quality of software.|15|Security testing is defined as measuring only screen color contrast.
Usability testing|Evaluating ease of use as a non-functional quality.|15|Usability testing is concerned only with processor speed rather than ease of use.
Test preconditions|Setup requirements that must hold before executing a test, such as an existing user with a valid email.|16|Test preconditions describe only what happens after the test has finished.
Expected result|The predicted correct outcome used to judge actual behavior, such as a successful password update and subsequent login.|16|The expected result is whatever behavior happens, even when it violates the requirement.
Modern tester role|Growing beyond defect detection into quality advocacy, automation, and continuous improvement in Agile and DevOps.|17|The lesson frames modern testers as having no role in automation or continuous improvement.
''')
lesson('1 Principles of Teamwork in Software Engineering.pptx','Teamwork: People & Planning','Respect, responsibility, and W5HH','''
Teamwork necessity|Collaboration addressing software complexity, technological change, and diverse stakeholder requirements.|3|Modern project complexity makes collaboration unnecessary.
Respectful environment|Kindness and mutual respect that support psychological safety, valued voices, and cohesion.|4|Mutual respect reduces psychological safety by making every voice less valued.
Responsibility over blame|Constructive ownership of issues and system improvement instead of personal fault or assumed malicious intent.|5|Responsibility over blame means concentrating on personal fault rather than improving the system.
Team cohesion|Mutual trust and psychological safety that reduce conflict and support collective problem-solving.|6|Cohesion depends on mistrust and discouraging shared problem-solving.
Effective communication|Clear information exchange and feedback that reduce misunderstandings, rework, and decision delays.|6|Effective communication increases rework by withholding shared understanding.
Individual competence|Technical proficiency in coding, algorithms, and system design that supports quality team contributions.|7|Individual competence means technical proficiency has no effect on team output.
Achievement-driven orientation|Initiative, ownership, and a proactive focus on delivering results and value.|7|Achievement-driven orientation means avoiding initiative and responsibility for outcomes.
W5HH: What|The planning question that establishes scope, features, and deliverables.|8|In W5HH, What establishes only the project's deadlines.
W5HH: Why|The planning question that explains project goals and value.|8|In W5HH, Why specifies only the location where work happens.
W5HH: When|The planning question that establishes timelines, milestones, and deadlines.|8|In W5HH, When specifies only which people are responsible.
W5HH: Who and Where|Planning questions identifying people or responsibilities and where work is organized.|8|Who and Where are the W5HH questions for defining only project value and deadlines.
W5HH: How and How Much|Planning questions covering execution approach and resource or cost requirements.|8|How and How Much exclude execution and resource planning.
Common team challenges|Unclear roles, weak conflict resolution, misaligned skills, and poor communication channels.|9|Unclear roles and poor communication are described as guarantees of effective teamwork.
Empathy and patience|Active listening and avoiding assumptions of negative intent to build trust and mutual understanding.|10|Empathy requires assuming malicious intent before listening to a teammate.
Continuous learning and adaptation|Ongoing improvement in response to rapid, frequent, complex, and diverse changes in software work.|11|Effective teamwork requires refusing to learn when technologies and project needs change.
''')
lesson('2 Agile Teams Collaborative Innovation.pptx','Agile: Collaborative Innovation','What, how, and the process','''
Agile approach|Iterative development with rapid cycles, collaboration, and continuous improvement.|3|Agile is described as a strictly linear sequence with no iteration.
Waterfall contrast|Traditional linear, sequential development phases contrasted with Agile's repeated cycles.|3|The slides describe Waterfall as the same iterative approach as Agile.
Product Owner|The role maximizing product value and representing stakeholder needs through Product Backlog management.|4|The Product Owner's principal responsibility is facilitating Scrum events instead of maximizing product value.
Product Backlog prioritization|Ordering product work to reflect business and customer value and guide development direction.|5|Product Backlog prioritization should ignore customer and business needs.
User stories and acceptance criteria|Clear descriptions of needed work and conditions of acceptance defined by the Product Owner in this lesson.|6|The lesson says the Product Owner should avoid defining user stories and acceptance criteria.
Stakeholder alignment|Product Owner engagement that connects development efforts to market and stakeholder needs.|6|Stakeholder alignment means keeping market needs separate from product decisions.
Scrum Master|A servant-leader who facilitates Scrum, removes impediments, and coaches Agile principles.|7|The Scrum Master is primarily responsible for choosing all product features and their business value.
Scrum rules and values|Process principles supported by the Scrum Master through facilitation and coaching.|8|The Scrum Master's process role excludes helping the team uphold Scrum rules and values.
Self-organization|Team ownership of how to plan and execute work rather than relying on imposed task-by-task control.|9|A self-organizing team is prohibited from collaboratively planning its work.
Cross-functionality|A combination of professional skills within the Development Team needed to build a complete product increment.|9|Cross-functionality means the team may possess only one narrow skill and cannot combine specialties.
Potentially releasable increment|A quality product addition that the Development Team is responsible for delivering each Sprint.|9|The Development Team is responsible only for untested ideas rather than a product increment.
Collective technical ownership|Developers jointly designing, building, integrating, and testing work while owning technical excellence and delivery.|10|Collective ownership means quality belongs to nobody and testing is unnecessary.
What / How / Process role mapping|The Product Owner guides what and value, developers determine how to build, and the Scrum Master facilitates the process.|11|The slides map product value solely to developers and implementation solely to the Scrum Master.
''')
lesson('3 Synergy in Software Development Teams.pptx','Team Synergy','Knowledge sharing and collective outcomes','''
Team synergy|Diverse individual contributions combining into stronger collective outcomes through collaboration.|3|Synergy means keeping every contribution isolated so collective outcomes cannot emerge.
Collaborative efficiency and innovation|Working together to resolve problems faster and use diverse perspectives to produce creative solutions.|4|The lesson says innovation improves by eliminating diverse perspectives.
Code reviews|Peer evaluation that finds defects early and provides constructive learning opportunities.|5|Code reviews are intended to delay defect discovery until after deployment.
Collective ownership|Shared responsibility and knowledge that support robust software and continuous improvement.|5|Collective ownership restricts knowledge of each component to exactly one person.
Expressing differences|Openly sharing varied viewpoints and challenging assumptions to reveal flaws and improve solutions.|6|Expressing differences means suppressing alternative viewpoints to avoid examining assumptions.
Co-creation|Jointly constructing solutions and knowledge instead of developing entirely in individual silos.|6|Co-creation means each person works alone and never shares solution knowledge.
Mutual alignment|A shared understanding of goals, scope, and progress that reduces misunderstandings and improves coordination.|7|Mutual alignment requires team members to disagree about project goals and progress.
Comprehensive documentation|Accessible comments, design specifications, API references, and guides that preserve institutional knowledge and aid onboarding.|7|Documentation preserves knowledge by making it inaccessible to new team members.
Formal knowledge sharing|Planned sessions such as workshops, presentations, internal tech talks, and lunch-and-learn events.|8|A scheduled technical workshop is classified as spontaneous informal sharing in the lesson.
Informal knowledge sharing|Ad-hoc support through quick chats, pair programming, and questions in communication channels.|8|Informal sharing always requires a formal scheduled presentation and agenda.
Trello|A collaboration tool using Kanban boards for visual task and progress management.|9|Trello is presented as a compiler rather than a visual task-management tool.
Asana|A project and task management tool with varied views, resource planning, and workflow automation.|9|Asana is described only as a tool for running programming-language syntax checks.
Jira|An agile development tool specializing in issue tracking, workflow customization, and reporting.|9|Jira is presented as an image editor with no issue-tracking function.
Open communication|Transparent dialogue that builds trust, clarifies expectations, and prevents misunderstandings.|10|Open communication requires concealing expectations and avoiding transparent dialogue.
Distributed team challenges|Time-zone communication delays, cultural differences, cohesion difficulties, and knowledge silos.|11|Working across time zones guarantees that communication latency and knowledge silos disappear.
Distributed team strategies|Structured agendas, virtual channels, asynchronous updates, team-building, and transparent documentation.|11|Distributed teams should solve communication delays by abandoning documentation and virtual channels.
''')
lesson('4 GitHub Collaborative Development.pptx','GitHub Collaboration','Version control, branches, and pull requests','''
GitHub|A collaborative software-development platform that hosts Git repositories and supports community participation and review.|3|GitHub is described as a platform with no version-control or collaboration features.
Version control system|A system tracking and managing file changes over time with revision history, collaboration, and recovery.|4|A version control system records no past versions and cannot support recovery.
Git|The distributed version-control system underlying the repositories hosted by GitHub.|4|Git and GitHub are both defined as the same hosted website rather than a VCS and hosting platform.
Revision history and rollback|Recorded modifications that allow teams to inspect changes and restore a previous stable state.|5|Rollback requires permanently discarding all stable historical states.
Distributed repository copy|A full local repository copy supporting offline work and resilient recovery in Git's distributed model.|6|Git's distributed model requires a network connection for every local commit.
Branching|Creating independent development lines to isolate features or fixes from the stable main branch.|7|Creating a feature branch automatically replaces the main branch's files with unfinished work.
Create feature branch|The workflow step that starts a separate line from main, such as feature/auth.|8|The illustrated workflow starts by merging unreviewed work before creating a branch.
Develop and commit locally|Making changes and recording them as commits on the feature branch before pushing to the remote.|8|A local commit necessarily publishes the work to GitHub immediately.
Push to remote|Sending local branch commits to a remote repository while keeping feature work separate from main until integration.|8|Pushing a feature branch automatically merges it into main.
Pull request|A proposal to merge changes into a target branch, initiating review and discussion before integration.|9|A pull request bypasses code review and instantly guarantees integration.
Base and compare branches|The pull-request selections identifying the target branch and the branch containing proposed changes.|10|The base branch is always the branch containing proposed changes rather than the target branch.
PR title and description|Clear explanatory details that communicate the purpose and content of proposed changes to reviewers.|10|A pull request should omit descriptions so reviewers must infer all intent from the title alone.
Constructive code review|Collaborators examining proposed changes and offering improvements before integration.|11|Code review should focus on personal attacks instead of improvements to the code.
Automated PR checks|CI/CD tests run on proposed work to help validate changes before merging.|11|The lesson's pull-request workflow excludes automated testing before merge.
Merge conflict resolution|Reconciling incompatible changes as part of preparing proposed work for approval and integration.|11|Merge conflicts can always be ignored without reconciling the incompatible edits.
Merging|Integrating approved changes from a feature branch into the target branch.|11|Merging means downloading a repository without integrating any branch changes.
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
