function out = dial(in_char)
abc = ['()+-' , setdiff('A':'Z','QZ')];
d = ['#*' , '0':'9',' '];
if all(ismember(in_char,[abc,d]))
    ii = ['    ',sprintf('%d',kron(2:9,[1 1 1])) ];
    [lo idx] = ismember(in_char,abc);
    out = in_char;
    out(lo) = ii(idx(lo));
else
    out = [];
end
end