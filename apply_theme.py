import re

def replace_colors(html_content):
    # Text colors
    html_content = html_content.replace('text-[#1A1D20]', 'text-[#4A4A4A]')
    html_content = html_content.replace('text-[#2B68FF]', 'text-[#6D8196]')
    html_content = html_content.replace('text-[#737B86]', 'text-[#6D8196]')
    html_content = html_content.replace('text-[#FFFFFF]', 'text-[#FFFFE3]')
    html_content = html_content.replace('text-[#A0AAB7]', 'text-[#6D8196]')
    html_content = html_content.replace('text-white', 'text-[#FFFFE3]')
    
    # Background colors
    html_content = html_content.replace('bg-[#FFFFFF]', 'bg-[#FFFFE3]')
    html_content = html_content.replace('bg-white', 'bg-[#FFFFE3]')
    html_content = html_content.replace('bg-[#F9FBFF]', 'bg-[#CBCBCB]')
    html_content = html_content.replace('bg-[#F0F4FF]', 'bg-[#CBCBCB]')
    html_content = html_content.replace('bg-[#E4ECFF]', 'bg-[#CBCBCB]')
    html_content = html_content.replace('bg-[#2B68FF]', 'bg-[#6D8196]')
    
    # Border colors
    html_content = html_content.replace('border-[#E4ECFF]', 'border-[#CBCBCB]')
    html_content = html_content.replace('border-[#C4D6FF]', 'border-[#6D8196]')
    html_content = html_content.replace('border-[#2B68FF]', 'border-[#6D8196]')
    
    # Hover states
    html_content = html_content.replace('hover:text-[#2B68FF]', 'hover:text-[#6D8196]')
    html_content = html_content.replace('hover:text-[#FFFFFF]', 'hover:text-[#FFFFE3]')
    html_content = html_content.replace('hover:text-white', 'hover:text-[#FFFFE3]')
    
    html_content = html_content.replace('hover:bg-blue-700', 'hover:bg-[#4A4A4A]')
    html_content = html_content.replace('hover:bg-[#F0F4FF]', 'hover:bg-[#CBCBCB]')
    html_content = html_content.replace('hover:bg-[#F9FBFF]', 'hover:bg-[#CBCBCB]')
    html_content = html_content.replace('hover:bg-[#2B68FF]', 'hover:bg-[#6D8196]')
    
    html_content = html_content.replace('hover:border-[#2B68FF]', 'hover:border-[#6D8196]')
    
    # Shadows and Rings
    html_content = html_content.replace('focus:border-[#2B68FF]', 'focus:border-[#6D8196]')
    html_content = html_content.replace('focus:ring-[#2B68FF]', 'focus:ring-[#6D8196]')
    html_content = html_content.replace('shadow-[0_4px_20px_-4px_rgba(43,104,255,0.05)]', 'shadow-[0_4px_20px_-4px_rgba(109,129,150,0.15)]')
    
    # Specific elements
    html_content = html_content.replace('bg-auroracyan', 'bg-[#6D8196]')
    
    return html_content

if __name__ == "__main__":
    with open("index.html", "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = replace_colors(content)
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Theme applied successfully.")
