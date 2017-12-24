function num = letter_counter(filename)
%Input filename is a text file
%Output num is a number of letters
s=0;
fid = fopen(filename,'rt');
if fid < 0
    num=-1;
    return;
end
oneline = fgets(fid);
while ischar(oneline)
    l=isletter(oneline);
    s=s+sum(l);
    fprintf('%s',oneline) % display one line
    oneline = fgets(fid);
end
num=s;
fprintf('\n');
fclose(fid);