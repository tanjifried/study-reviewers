"""Build a static Pages artifact and validate local HTML references.

Only browser assets are deployed; authoring scripts, PPT originals, question-style
reference screenshots, and QA files stay in the private repository.
"""
from html.parser import HTMLParser
from pathlib import Path
import shutil
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '_site'
PACKS = ('python', 'software-engineering', 'information-security', 'automata')
ASSETS = {'.html', '.css', '.js', '.jpg', '.jpeg', '.png', '.svg', '.webp', '.pdf', '.afjson'}
EXCLUDED = {'build', 'tests', 'source-text', 'sample-images', 'lessons'}


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for attr in ('href', 'src'):
            if attrs.get(attr):
                self.refs.append(attrs[attr])


def prepare():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    shutil.copy2(ROOT / 'index.html', OUT / 'index.html')
    shutil.copytree(ROOT / 'assets', OUT / 'assets')
    for pack in PACKS:
        for source in (ROOT / pack).rglob('*'):
            relative = source.relative_to(ROOT / pack)
            if source.is_file() and source.suffix in ASSETS and not EXCLUDED.intersection(relative.parts):
                target = OUT / pack / relative
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(source, target)
    (OUT / '.nojekyll').touch()

    pages = {}
    for path in OUT.rglob('*.html'):
        parser = References()
        parser.feed(path.read_text())
        pages[path] = parser
    errors = []
    for path, parser in pages.items():
        for ref in parser.refs:
            url = urlsplit(ref)
            if url.scheme or url.netloc or ref.startswith('#'):
                continue
            if url.path.startswith('/'):
                errors.append(f'{path.relative_to(OUT)}: root-relative link {ref}')
                continue
            target = (path.parent / unquote(url.path)).resolve()
            if target.is_dir():
                target = target / 'index.html'
            if not target.is_relative_to(OUT.resolve()) or not target.exists():
                errors.append(f'{path.relative_to(OUT)}: missing {ref}')
            elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
                # Python uses hash routing rather than element IDs.
                if target != OUT / 'python' / 'index.html':
                    errors.append(f'{path.relative_to(OUT)}: missing anchor {ref}')
    if errors:
        raise SystemExit('\n'.join(errors))
    print(f'Prepared {len(pages)} pages; all local HTML references resolve.')


if __name__ == '__main__':
    prepare()
