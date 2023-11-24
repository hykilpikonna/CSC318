from pathlib import Path

if __name__ == '__main__':
    svg = (Path(__file__).parent / 'langs.svg').read_text()

    # Find and extract all sub-SVGs
    for i, s in enumerate(svg.split('<svg')):
        if i <= 1:
            continue
        s = '<svg' + s
        s = s.split('</svg>')[0] + '</svg>'

        # Find <title> and extract language name
        try:
            title = s.split('<title>')[1].split('</title>')[0]
            print(title)
            Path(f'lang').mkdir(exist_ok=True)
            Path(f'lang/{title}.svg').write_text(s)
        except IndexError:
            print('No title found')
