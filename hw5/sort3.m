function row = sort3(a, b, c)
if a>=b && a>=c
    if b>=c
        row = [c b a];
    elseif b<=c 
        row = [b c a];
    end
elseif b>=a && b>=c 
    if a>=c
        row = [c a b];
    elseif a<=c
        row = [a c b];
    end
elseif c>=a && c>=b 
    if a>=b
        row = [b a c];
    elseif a<=b
        row = [a b c];
    end
end