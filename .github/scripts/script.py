import json

with open("poesias.json", "r") as f:
    poesias = json.load(f)

ultima_poesia = poesias[-1]

ultima_poesia_markdown = f"""
## Última Poesía

### {ultima_poesia['titulo']}

{ultima_poesia['texto']}
"""

with open("README.md", "r") as f:
    readme_content = f.read()

inicio_seccion = readme_content.find("## Última Poesía")
fin_seccion = readme_content.find("---", inicio_seccion)
nuevo_readme_content = (
    readme_content[:inicio_seccion].rstrip()
    + "\n"
    + ultima_poesia_markdown
    + readme_content[fin_seccion:]
)

with open("README.md", "w") as f:
    f.write(nuevo_readme_content)

print("README actualizado con la última poesía.")
