function  [mt, s] = mtable(n, m)
mt = (1:n)'*(1:m);
s = sum(mt(:));
end