import re

def process_html(filename="c:/Users/HP/Desktop/portf/index.html"):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Dictionary of search strings and their replacements for Dark Mode conversions
    # Format: {'class-to-find': 'light-mode-class dark:class-to-find'}
    
    # We want to replace specific background, text, and border classes.
    replacements = {
        # Backgrounds
        'bg-darkbase': 'bg-white dark:bg-darkbase',
        'bg-slate-900': 'bg-white dark:bg-slate-900',
        'bg-slate-800': 'bg-slate-100 dark:bg-slate-800',
        'bg-slate-800/50': 'bg-slate-200/50 dark:bg-slate-800/50',
        'bg-slate-800/60': 'bg-slate-200/60 dark:bg-slate-800/60',
        'bg-brand-900/30': 'bg-brand-100/50 dark:bg-brand-900/30',
        'bg-teal-900/30': 'bg-teal-100/50 dark:bg-teal-900/30',
        
        # Texts
        'text-white': 'text-slate-900 dark:text-white',
        'text-slate-100': 'text-slate-800 dark:text-slate-100',
        'text-slate-200': 'text-slate-700 dark:text-slate-200',
        'text-slate-300': 'text-slate-600 dark:text-slate-300',
        'text-slate-400': 'text-slate-500 dark:text-slate-400',
        'text-brand-400': 'text-brand-600 dark:text-brand-400',
        'text-teal-400': 'text-teal-700 dark:text-teal-400',
        
        # Borders
        'border-slate-800': 'border-slate-200 dark:border-slate-800',
        'border-slate-800/50': 'border-slate-200/50 dark:border-slate-800/50',
        'border-slate-800/60': 'border-slate-200/60 dark:border-slate-800/60',
        'border-slate-700': 'border-slate-300 dark:border-slate-700',
        'border-slate-700/50': 'border-slate-300/50 dark:border-slate-700/50',
        'border-teal-800/50': 'border-teal-200/50 dark:border-teal-800/50',
        
        # specific hovers
        'hover:text-white': 'hover:text-brand-600 dark:hover:text-white',
        'group-hover:text-white': 'group-hover:text-brand-600 dark:group-hover:text-white',
    }

    # Iterate and replace. We use word boundaries to avoid partial matches
    for old_class, new_class in replacements.items():
        # Using a regex to replace classes. We need to ensure we don't accidentally replace a class
        # that already has a 'dark:' prefix, or replace parts of larger words.
        # Negative lookbehind to ensure no 'dark:' or '-' before.
        # Negative lookahead to ensure no '-' after.
        # (Wait, tailwind classes can have colons like hover:text-white, regex \b doesn't match on colons well)
        
        # A safer approach for Tailwind is splitting by 'class="' and parsing.
        pass

    # Actually, a simpler regex looking for class="..." blocks is safer:
    def replace_classes(match):
        class_str = match.group(1)
        classes = class_str.split()
        new_classes = []
        for cls in classes:
            if cls in replacements and not any(c.endswith(':' + cls) for c in classes):
                new_classes.append(replacements[cls])
            else:
                new_classes.append(cls)
        # return unique preserving order roughly
        seen = set()
        final_classes = []
        for c in ' '.join(new_classes).split():
            if c not in seen:
                seen.add(c)
                final_classes.append(c)
                
        return 'class="' + ' '.join(final_classes) + '"'

    updated_content = re.sub(r'class="([^"]*)"', replace_classes, content)

    # Manual fixes for specific components
    # 1. Selection color
    updated_content = updated_content.replace('selection:text-white', 'selection:text-white dark:selection:text-white')
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(updated_content)
        
    print("Done formatting classes!")

if __name__ == "__main__":
    process_html()
