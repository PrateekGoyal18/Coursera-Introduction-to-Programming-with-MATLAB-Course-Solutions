function [result] = replace_me(v,a,b,c)
    if nargin == 3
        c = b;
    end
    if nargin == 2
        c = 0;
        b = 0;
    end
    result = v;
    equ = result == a;
    result = num2cell(result);
    result(equ) = {[b c]};
    result = [result{:}];