import io

with open("output.txt") as f1, open("left.txt") as f2:
    lines1 = f1.readlines()
    lines2 = f2.readlines()
for line1 in lines1:    
    for line2 in lines2:
        if (len(line1.split('/'))>1):
            if str(line1.split('/')[4].split('?')[0]) == str(line2.split('/')[4].split('?')[0]):
                lines1.remove(line1)
                lines2.remove(line2)

            
with io.open("newOutput.txt", "w", encoding='utf-8') as f1, io.open("newLeft.txt", "w", encoding='utf-8') as f2:
    f1.writelines(lines1)
    f2.writelines(lines2)

