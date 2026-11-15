# Study reviewers

Three study packs in one mobile-friendly static website:

- Python: 13 lessons, 302 original practice questions, randomized quizzes, and a 40-question final.
- Software Engineering: 10 lessons with slides, explanations, cheat sheets, quizzes, and a final.
- Information Assurance and Security: Authentication and Avalanche Effect only.

Website: https://tanjifried.github.io/study-reviewers/

The repository is private. The deployed GitHub Pages website is public.

## Use

Open `index.html`, choose a subject, and start a lesson or quiz. Progress is stored separately for each subject in the current browser on the current device. It does not sync across devices. Previous progress from local files belongs to a different browser origin and does not automatically transfer to the hosted website.

The downloadable website works offline when its complete files are kept together. Online reference links require internet access. The hosted version does not currently install or cache itself as an offline app.

## Deployment

Push to `main` to validate local links, prepare `_site`, and deploy through GitHub Actions. No build dependencies or server are required. To prepare the same artifact locally:

```sh
python3 scripts/prepare_site.py
```

Only runtime HTML, CSS, JavaScript, PDFs, and slide images are published. Original PowerPoints, authoring files, and reference screenshots stay in the repository.

The copies here were combined from the completed local study packs. Their lesson content and question banks are retained. This is independent study material, not an official Pearson product.
