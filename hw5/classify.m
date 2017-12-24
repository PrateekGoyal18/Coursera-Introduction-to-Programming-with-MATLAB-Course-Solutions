function c = classify(x)
[row, col] = size(x);
if row == 0 || col == 0 % any dim == 0 -> empty
c = -1;
elseif row == 1 && col == 1 % both dim == 1 -> scalar
c = 0;
elseif row == 1 || col == 1 % none of the above, but one dim == 1 -> vector
c = 1;
else
c = 2;
end
end