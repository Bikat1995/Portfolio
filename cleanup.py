content = open('index.html', encoding='utf-8').read()

# Find the start of the leftover old projects block (right after the new </section>)
marker_start = '        <!-- 5. Contact Section -->'

# Find the second occurrence of the contact section marker - there should only be one
# The leftover content is between lines ~531 and ~702

# Simpler: find the stray articles that come right after </section> of the new projects section
lines = content.split('\n')

in_remove = False
out_lines = []
skip_count = 0

# After the new projects section ends (</section>), skip old stray content until "<!-- 5. Contact"
found_new_projects_end = False

for i, line in enumerate(lines):
    stripped = line.strip()
    
    # Detect end of new projects section
    if not found_new_projects_end and stripped == '</section>' and i > 500:
        # Check if next non-empty lines are stray old content
        found_new_projects_end = True
        out_lines.append(line)
        continue
    
    if found_new_projects_end and not in_remove:
        if stripped.startswith('<article') or stripped == '':
            # Start skipping stray old content
            if stripped.startswith('<article'):
                in_remove = True
                continue
        else:
            found_new_projects_end = False  # Reset, wasn't stray
    
    if in_remove:
        if '<!-- 5. Contact Section -->' in line:
            in_remove = False
            out_lines.append(line)
        continue
    
    out_lines.append(line)

open('index.html', 'w', encoding='utf-8').write('\n'.join(out_lines))
print('Done. Total lines:', len(out_lines))
